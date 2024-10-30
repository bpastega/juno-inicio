import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { ConsultaOdontologica } from '../../../models/consulta-odontologica';
import { ConsultaOdontologicaService } from '../../../services/consulta-odontologica.service';
import { Protocolo } from '../../../models/protocolo';
import { ProtocoloService } from '../../../services/protocolo.service';
import { Paciente } from '../../../models/paciente';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Consulta } from '../../../models/consulta';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConsultasOdontologicasFormComponent } from "../consultas-odontologicas-form/consultas-odontologicas-form.component";

@Component({
  selector: 'app-consultas-odontologicas-list',
  standalone: true,
  imports: [ConsultasOdontologicasFormComponent],
  templateUrl: './consultas-odontologicas-list.component.html',
  styleUrl: './consultas-odontologicas-list.component.scss'
})
export class ConsultasOdontologicasListComponent {
  lista: ConsultaOdontologica[] = [];

  /*Lista de Protocolos que estarão ligados às consultas odontológicas*/ 
  listaProtocolo: Protocolo[] = [];
  consultaEdit!: ConsultaOdontologica;

  rotaAtivada = inject(ActivatedRoute);
  router = inject(Router);

  consultaOdontologicaService = inject(ConsultaOdontologicaService);
  protocoloService = inject(ProtocoloService);

  modalService = inject(MdbModalService); // responsável por abrir as modais
  @ViewChild('modalConsultasOdontologicasForm') modalConsultasOdontologicasForm!: TemplateRef<any>; //enxergar o template da modal q tá no html

  modalRef!: MdbModalRef<any>;

  @Input() modoLeitura!: boolean;
  @Input() modoPacienteUnico!: boolean;

  constructor(){
    if(this.modoPacienteUnico == true){
      let id = this.rotaAtivada.snapshot.params['id'];
      this.listAllPaciente(id);
    }

    else{
      this.listAll();
    }
  }

  listAll(){ 

    this.consultaOdontologicaService.findAll().subscribe({ /*Dentro do back, o findAll retorna APENAS candidatos ativos. Por isso, não se faz necessário realizar essa filtragem no front.*/ 
      next: consultas => { //quando o back retornar o que se espera
        this.lista = consultas;
      },
      error: erro => { //quando ocorrer qualquer erro (badrequest, exceptions..)
        alert("Erro");
      }
    });

  }

  listAllPaciente(id: number){
    this.consultaOdontologicaService.findAllByPacienteId(id).subscribe({
      next: lista =>{
        this.lista = lista;
      },
      error: erro =>{
        alert("Erro");
      }
    })
  }

  editarConsultaOdontologica(consultaOdontologica: ConsultaOdontologica) {
    this.consultaEdit = Object.assign({}, consultaOdontologica); //cria um clone do objeto para evitar edição automática
    this.modalRef = this.modalService.open(this.modalConsultasOdontologicasForm);
  }

  deletarById(id: number){
    Swal.fire({
      title: 'Confirme a deleção da Consulta Odontológica.',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.consultaOdontologicaService.encerrar(id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            //adicionar um refresh
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

}
