import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Consulta } from '../../../models/consulta';
import { ConsultaService } from '../../../services/consulta.service';
import { DatePipe, NgClass } from '@angular/common';
import { StatusPacienteService } from '../../../services/utility/status-paciente.service';
import { Paciente } from '../../../models/paciente';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConsultasFormComponent } from "../consultas-form/consultas-form.component";
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-consultas-list',
  standalone: true,
  imports: [DatePipe, NgClass, ConsultasFormComponent, MdbFormsModule, FormsModule, MdbModalModule],
  templateUrl: './consultas-list.component.html',
  styleUrl: './consultas-list.component.scss'
})
export class ConsultasListComponent {

  lista: Consulta[] = [];

  consultaEdit!: Consulta;

  /*Injections*/
  pacienteService = inject(PacienteService); //será usado para filtrar consulta com base no nome do paciente
  consultaService = inject(ConsultaService);
  statusPacienteService = inject(StatusPacienteService);

  modalService = inject(MdbModalService); // responsável por abrir as modais
  @ViewChild('modalConsultasForm') modalConsultasForm!: TemplateRef<any>; //enxergar o template da modal q tá no html

  modalRef!: MdbModalRef<any>;

  @Input() modoLeitura: boolean = true;
  @Input() modoPacienteUnico: boolean = false;
  @Input() paciente!: Paciente; //seleciona o paciente, caso modoPacienteUnico seja true

  constructor(){
    if(!this.modoPacienteUnico){ //caso mostrar protocolos de todos os pacientes
      this.findAll();
    }

    else{
      this.lista = this.paciente.consultas; //TESTAR ESSE TRECHO!!!
    }
  }

  findAll(){
    this.consultaService.findAll().subscribe({
      next: lista=>{
        this.lista=lista;
      },
      error: erro =>{
       // Swal.fire('Erro',erro.error,'error');
       // alert('Errooooo!!')//futuramente adicionar sweetalert2
       console.log(erro);
      }
    })
    
  }

  editarConsulta(consulta: Consulta) {
    this.consultaEdit = Object.assign({}, consulta); //cria um clone do objeto para evitar edição automática
    this.modalRef = this.modalService.open(this.modalConsultasForm);
  }

  deletarById(id: number){
    Swal.fire({
      title: 'Confirme a deleção da Consulta.',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.consultaService.encerrar(id).subscribe({
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
