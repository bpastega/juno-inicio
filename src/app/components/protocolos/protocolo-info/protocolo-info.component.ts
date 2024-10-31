import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtocoloService } from '../../../services/protocolo.service';
import { Protocolo } from '../../../models/protocolo';
import { DatePipe, NgClass } from '@angular/common';
import { StatusProtocoloService } from '../../../services/utility/status-protocolo.service';
import { StatusInfoProtocoloService } from '../../../services/utility/status-info-protocolo.service';
import { ConsultasOdontologicasListComponent } from "../../consultasOdontologicas/consultas-odontologicas-list/consultas-odontologicas-list.component";
import { TestesListComponent } from "../../testes/testes-list/testes-list.component";
import Swal from 'sweetalert2';
// para usar icones nos botoes:
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConsultasFormComponent } from "../../consultas/consultas-form/consultas-form.component";
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Consulta } from '../../../models/consulta';
import { Paciente } from '../../../models/paciente';
import { TestesFormComponent } from "../../testes/testes-form/testes-form.component";
import { TesteRapido } from '../../../models/teste-rapido';
import { ConsultasOdontologicasFormComponent } from '../../consultasOdontologicas/consultas-odontologicas-form/consultas-odontologicas-form.component';
import { ConsultaOdontologica } from '../../../models/consulta-odontologica';

@Component({
  selector: 'app-protocolo-info',
  standalone: true,
  imports: [DatePipe, NgClass, FontAwesomeModule, ConsultasOdontologicasListComponent, TestesListComponent, ConsultasOdontologicasFormComponent, ConsultasFormComponent, MdbModalModule, TestesFormComponent],
  templateUrl: './protocolo-info.component.html',
  styleUrl: './protocolo-info.component.scss'
})
export class ProtocoloInfoComponent {

  
  //para uso de icones nos botões
  faEdit = faEdit;
  faTrash = faTrash;

  // configuração modal form consultas

  modalService = inject(MdbModalService); // responsável por abrir as modais
  @ViewChild('modalConsultasForm') modalConsultasForm!: TemplateRef<any>
  @ViewChild('modalTestesForm') modalTestesForm!: TemplateRef<any>
  @ViewChild('modalConsultasOdontologicasForm') modalConsultasOdontologicasForm!: TemplateRef<any>

  modalRef!: MdbModalRef<any>; 

  consultaEdit!: Consulta;
  testeEdit!: TesteRapido;
  consultaOdontologicaEdit!: ConsultaOdontologica;
  

  protocoloEncontrado!: Protocolo;
  listaProtocolos: Protocolo[] = [];


  //Injections
  rotaAtivada = inject(ActivatedRoute);
  router = inject(Router);

  protocoloService = inject(ProtocoloService);
  statusProtocoloService = inject(StatusProtocoloService);
  statusInfoProtocoloService = inject(StatusInfoProtocoloService);

  constructor(){
    let id = this.rotaAtivada.snapshot.params['id'];

    this.findById(id);

  }



  findById(id: number){
    
    this.protocoloService.findById(id).subscribe({
      next: protocolo => {
        this.protocoloEncontrado = protocolo;
        //this.pacienteEndereco = paciente.endereco;
      },
      error: erro => {
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

  encerrar(protocolo: Protocolo){
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
            this.findById(protocolo.id); // recarrega o protocolo para atualização
            this.router.navigate(['/admin/protocolos']);
               
          },
          error: (erro) => {
            
            Swal.fire('Erro!',erro.error,'error');
          },
        });
      }
    });
  }

  novaConsulta(pacienteEncontradoID: number){
    this.consultaEdit = new Consulta();

    this.consultaEdit.paciente = {id: pacienteEncontradoID} as Paciente;
    this.modalRef = this.modalService.open(this.modalConsultasForm);

  }

  novoTesteRapido(protocoloEncontradoID: number){
    this.testeEdit = new TesteRapido();

    this.testeEdit.protocoloPreNatal = {id: protocoloEncontradoID} as Protocolo;
    this.modalRef = this.modalService.open(this.modalTestesForm);
  }

  novaConsultaOdontologica(protocoloEncontradoID: number){
    this.consultaOdontologicaEdit = new ConsultaOdontologica;

    this.consultaOdontologicaEdit.protocoloPreNatal = {id: protocoloEncontradoID} as Protocolo;

    this.modalRef = this.modalService.open(this.modalConsultasOdontologicasForm);

  }

  retornoForm(mensagem: string) {
    //acionado quando houver um evento salvar ou editar do FORM que está aberto na modal

      this.modalRef.close(); //fecha a moodal

    Swal.fire({
      title: mensagem,
      icon: 'success',
    });
  
  }


}
