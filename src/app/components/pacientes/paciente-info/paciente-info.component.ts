import { Component, inject, TemplateRef, ViewChild } from "@angular/core";
import { Paciente } from "../../../models/paciente";
import { PacienteService } from "../../../services/paciente.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormataCPFService } from "../../../services/utility/formata-cpf.service";
import { DatePipe, NgClass } from "@angular/common";
import { StatusPacienteService } from "../../../services/utility/status-paciente.service";
import { Endereco } from "../../../models/endereco";
import Swal from "sweetalert2";
import { Protocolo } from "../../../models/protocolo";
import { ProtocoloService } from "../../../services/protocolo.service";
import { MdbModalModule, MdbModalRef, MdbModalService } from "mdb-angular-ui-kit/modal";
import { ProtocolosFormComponent } from "../../protocolos/protocolos-form/protocolos-form.component";
import { StatusProtocoloService } from "../../../services/utility/status-protocolo.service";

// para usar icones nos botoes:
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PacientesFormComponent } from "../pacientes-form/pacientes-form.component";
import { ProtocosListComponent } from "../../protocolos/protocos-list/protocolos-list.component";
import { ExamesComponent } from "../../exames/exames.component";



@Component({
  selector: 'app-paciente-info',
  standalone: true,
  imports: [DatePipe, NgClass, ProtocolosFormComponent, MdbModalModule, FontAwesomeModule, PacientesFormComponent, ProtocosListComponent, ExamesComponent],
  templateUrl: './paciente-info.component.html',
  styleUrl: './paciente-info.component.scss'
})

export class PacienteInfoComponent {

  //para uso de icones nos botões
  faEdit = faEdit;
  faTrash = faTrash;

  /*Quando o trecho abaixo está presente, a tela de detalhes não renderiza - minha teoria é de que pacientes-list ter a mesma modal está causando conflitos*/

  /*modalService = inject(MdbModalService); // responsável por abrir as modais
  @ViewChild('modalPacientesForm') modalPacientesForm!: TemplateRef<any>; //enxergar o template da modal q tá no html
  modalRef!: MdbModalRef<any>; //a referencia da modal aberta para ser fechada*/
  
  // configuração da modal que contem o form de protocolo

  modalService = inject(MdbModalService); // responsável por abrir as modais
  @ViewChild('modalProtocoloForm') modalProtocoloForm!: TemplateRef<any>; //enxergar o template da modal q tá no html
  @ViewChild('modalPacientesForm') modalPacientesForm!: TemplateRef<any>; //enxergar o template da modal q tá no html

  modalRef!: MdbModalRef<any>; //a referencia da modal aberta para ser fechada


  // configuração de protocolo
  protocoloService = inject(ProtocoloService);
  statusProtocoloService = inject(StatusProtocoloService)
  protocoloEdit!: Protocolo;

  pacienteEncontrado!: Paciente;
  pacienteEndereco!: Endereco;
  pacienteProtocoloAtivo: Protocolo | null = null;

  // pacienteProtocoloAtivo!: Protocolo;

  protocolosPaciente: Protocolo[] = [];
  protocolosAtivos: Protocolo[] = [];


  /*Injections*/
  formataCPFService = inject(FormataCPFService);
  statusPacienteService = inject(StatusPacienteService);
  //protocoloService = inject(ProtocoloService);
  pacienteService = inject(PacienteService);

  rotaAtivada = inject(ActivatedRoute);
  router = inject(Router);

  pacienteEdit!: Paciente; //esse objeto será utilizado para transportar o paciente clicado no botão editar


  
  
  constructor(){
    let id = this.rotaAtivada.snapshot.params['id'];

    this.findById(id);
  }

  findById(id: number){
    
    this.pacienteService.findById(id).subscribe({
      next: paciente => {
        this.pacienteEncontrado = paciente;
        this.pacienteEndereco = paciente.endereco;

        // lógica para encontrar o protocolo ativo
        this.pacienteProtocoloAtivo = paciente.protocolos.find(
          (protocolo) => this.statusProtocoloService.isAtivo(protocolo)
        ) ?? null;
        
      },
      error: erro => {
        alert('Paciente não encontrado'); //TODO: SWEET ALERT 
      }
    })

  }


  deletarById(paciente: Paciente){
    Swal.fire({
      title: 'Confirme a deleção do paciente ' + paciente.nome + '.',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.delete(paciente.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.router.navigate(['/admin/pacientes']);//assim que é deletado o paciente da tela atual, o usuário retornará à página anterior
          },
          error: (erro) => {
            
            Swal.fire('Erro!',erro.error,'error');
          },
        });
      }
    });

    /* CONFIGURAÇÃO DO PROTOCOLO */
  }

  /*retornoForm(mensagem: string) {
    //acionado quando houver um evento salvar ou editar do FORM que está aberto na modal

      this.modalRef.close(); //fecha a moodal

    Swal.fire({
      title: mensagem,
      icon: 'success',
    });

    //this.findAll(); //atualiza e recarrega a lista
  }*/


    cadastrarProtocolo(pacienteEncontradoID: number){
      this.protocoloEdit = new Protocolo();
      //talvez pegar o id do paciente?
      this.protocoloEdit.paciente = {id: pacienteEncontradoID} as Paciente;
      this.modalRef = this.modalService.open(this.modalProtocoloForm);
    }

    editarProtocolo(protocolo: Protocolo) {
      this.protocoloEdit = Object.assign({}, protocolo); //cria um clone do objeto para evitar edição automática
      this.modalRef = this.modalService.open(this.modalProtocoloForm);
    }


    encerrarProtocolo(protocolo: Protocolo){
      Swal.fire({
        title: 'Realmente deseja encerrar o protocolo de ' + protocolo.paciente.nome + '?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.protocoloService.encerrar(protocolo.id).subscribe({
            next: (mensagem) => {
              Swal.fire(mensagem, '', 'success');
             // necessario listar? this.findAll();
            },
            error: (erro) => {
              
              Swal.fire('Erro!',erro.error,'error');
            },
          });
        }
      });
    }


    retornoForm(mensagem: string) {
      //acionado quando houver um evento salvar ou editar do FORM que está aberto na modal
  
        this.modalRef.close(); //fecha a moodal
  
      Swal.fire({
        title: mensagem,
        icon: 'success',
      });
  
    }

    

    //determinaA se o pacienteProtocoloAtivo está presente
    isEncerrarButtonDisabled(): boolean {
      return !this.pacienteProtocoloAtivo;
    }

    /*verifica se pacienteProtocoloAtivo não é null ANTES de passar para o método encerrarProtocolo. */
    encerrarProtocoloAtivo(): void {
      if (this.pacienteProtocoloAtivo) {
        this.encerrarProtocolo(this.pacienteProtocoloAtivo);
      }
    


        }    
      // lógica para editar paciente

      editarPaciente(paciente: Paciente) {
        this.pacienteEdit = Object.assign({}, paciente); //cria um clone do objeto para evitar edição automática
        this.modalRef = this.modalService.open(this.modalPacientesForm);
      }
      
      }



/*Nosso objetivo aqui é encontrar o protocolo ativo de determinado paciente*/
/*encontrarProtocoloAtivo(paciente: Paciente){

this.protocoloService.findByPacienteNome(paciente.nome).subscribe({ //procura os protocolos com o nome daquele paciente
    next: (protocolosEncontrados) =>{
      this.protocolosPaciente = protocolosEncontrados; //armazena os protocolos do paciente

      this.protocoloService.findByAtivo().subscribe({ //procura os protocolos ativos
        next: (protocolosAtivosEncontrados) =>{
          this.protocolosAtivos = protocolosAtivosEncontrados; //armazena os protocolos ativos encontrados
        },

        error: (erro) => {
          Swal.fire('Erro!',erro.error,'error'); 
        },
      }); 
    }, 
    
    error: (erro) => {
      Swal.fire('Erro!',erro.error,'error');
    },
})
   
}*/


/*NÃO FUNCIONA

encontrarProtocoloAtivo(paciente: Paciente) {
  this.protocoloService.findByPacienteNome(paciente.nome).subscribe({ //percorre todos protocolos daquele paciente
    next: protocolosEncontrados => {
      this.protocolosAtivos = protocolosEncontrados.filter(protocolo => protocolo.statusProtocolo == true); // filtra 

      alert(this.protocolosAtivos.length);
      
    },
    error: erro => {
      Swal.fire('Erro!', erro.error, 'error');
    }
  });
}*/ 