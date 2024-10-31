import { Component, inject, LOCALE_ID, TemplateRef, ViewChild } from '@angular/core';
import { Paciente } from '../../../models/paciente';
import { Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { ImagemService } from '../../../services/imagem.service';
import { DatePipe, NgClass, registerLocaleData } from '@angular/common';
import Swal from 'sweetalert2';
//Teste 
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import localePT from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { PacientesFormComponent } from "../pacientes-form/pacientes-form.component";
import { FormataCPFService } from '../../../services/utility/formata-cpf.service';
import { StatusPacienteService } from '../../../services/utility/status-paciente.service';
import { Endereco } from '../../../models/endereco';
import { ProtocoloService } from '../../../services/protocolo.service';
import { Protocolo } from '../../../models/protocolo';

registerLocaleData(localePT);

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [RouterLink, DatePipe, FormsModule, PacientesFormComponent,MdbModalModule, NgClass],
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.scss'
})
export class PacientesListComponent {

  modalService = inject(MdbModalService); // responsável por abrir as modais
  @ViewChild('modalPacientesForm') modalPacientesForm!: TemplateRef<any>; //enxergar o template da modal q tá no html
  modalRef!: MdbModalRef<any>; //a referencia da modal aberta para ser fechada

  lista: Paciente[] = [];

  pesquisa: string = '';

  protocoloRedirect!: Protocolo;
  pacienteEdit!: Paciente; //esse objeto será utilizado para transportar o paciente clicado no botão editar

  /*Injeta o Service, semelhante ao Autowired*/ 
  pacienteService = inject(PacienteService);
  imagemService = inject(ImagemService);
  formataCPFService = inject(FormataCPFService);
  statusPacienteService = inject(StatusPacienteService);
  protocoloService = inject(ProtocoloService);

  router = inject(Router);

  constructor(){
    // this.lista.push(new Paciente(123, 'Amélia Santos', '543.707.590-13', 'ameliasantos@gmail.com', new Date(1995, 11, 17), "A+" ));
   this.findAll();
  }

    navigateToDetalhes(paciente: Paciente){ 

      this.protocoloService.findAtivoByIdPaciente(paciente.id).subscribe({
        next: (protocolo) => {
          this.router.navigate(['/admin/protocolos/info/'+protocolo.id]);
        },
        error: (erro) => {
          Swal.fire('Erro',erro.error,'error');
        },
      });

    }

    navigateToInfo(id: number) {
      this.router.navigate(['/admin/pacientes/info', id]);
    }

    findAll(){
      this.pacienteService.findAll().subscribe({
        next: lista=>{
          this.lista=lista;
        },
        error: erro =>{
          let mensagemErro = "Erro desconhecido";

          if (erro.error) {
              try {
                  // interpreto o erro como JSON se for string
                  const errorResponse = typeof erro.error === 'string' ? JSON.parse(erro.error) : erro.error;
      
                  // aqui estou concatendo todas as mensagens dos campos de erro separando por virgulas
                  mensagemErro = Object.values(errorResponse).join(', ');
              } catch (e) {
                  mensagemErro = erro.message || "Erro desconhecido no formato da resposta.";
              }
          }
      
          
          Swal.fire(mensagemErro);
        }
      })
      
    }
  
    findByNome() {
      this.pacienteService.findByNome(this.pesquisa).subscribe({
        next: (lista) => {
          this.lista = lista;
        },
        error: (erro) => {
          Swal.fire('Digite um nome!', erro.error, 'error'); 
        },
      });
    }

    cadastrar(){
      //implementar a lógica de abertura de modal APÓS criar o formulario de paciente
     
     this.pacienteEdit= new Paciente(new Endereco());
     this.modalRef = this.modalService.open(this.modalPacientesForm);
    }

    editar(paciente: Paciente) {
      this.pacienteEdit = Object.assign({}, paciente); //cria um clone do objeto para evitar edição automática
      this.modalRef = this.modalService.open(this.modalPacientesForm);
    }

    retornoForm(mensagem: string) {
      //acionado quando houver um evento salvar ou editar do FORM que está aberto na modal
  
        this.modalRef.close(); //fecha a moodal
  
      Swal.fire({
        title: mensagem,
        icon: 'success',
      });
  
      this.findAll(); //atualiza e recarrega a lista
    }

    /* TRECHOS TOFU - REALOCAR!!!
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
              this.findAll();
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

    this.findAll(); //atualiza e recarrega a lista
  }*/

}

  
/*https://stackoverflow.com/questions/8152426/how-can-i-calculate-the-number-of-years-between-two-dates -- UTF-8 
  verificaMaioridade(paciente:Paciente, dataAtual = new Date()){
      const diferencaAnos = dataAtual.getFullYear() - paciente.dataNascimento.getFullYear();
      const diferencaMeses = dataAtual.getMonth() - paciente.dataNascimento.getMonth();
      const diferencaDias = dataAtual.getDate() - paciente.dataNascimento.getDate();
    
      const doNotSubtractOne = diferencaMeses > 0 || (diferencaMeses === 0 && diferencaDias >= 0);
      var anosTotais = doNotSubtractOne ? diferencaAnos : diferencaAnos - 1;

      if(anosTotais<18){
        return "Menor de Idade"
      }

      else{
        return "Maior de Idade";
      }
    }*/