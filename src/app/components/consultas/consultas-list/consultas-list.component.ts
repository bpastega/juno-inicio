import { Component, inject, Input, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-consultas-list',
  standalone: true,
  imports: [DatePipe, NgClass, ConsultasFormComponent, MdbFormsModule, FormsModule, MdbModalModule],
  templateUrl: './consultas-list.component.html',
  styleUrl: './consultas-list.component.scss'
})
export class ConsultasListComponent {

  loginService = inject(LoginService);

  lista: Consulta[] = [];

  consultaEdit!: Consulta;

  /*Injections*/
  pacienteService = inject(PacienteService); //será usado para filtrar consulta com base no nome do paciente
  consultaService = inject(ConsultaService);
  statusPacienteService = inject(StatusPacienteService);

  rotaAtivada = inject(ActivatedRoute);
  router = inject(Router);

  modalService = inject(MdbModalService); // responsável por abrir as modais
  @ViewChild('modalConsultasForm') modalConsultasForm!: TemplateRef<any>; //enxergar o template da modal q tá no html

  modalRef!: MdbModalRef<any>;

  @Input() modoLeitura: boolean = true;
  @Input() modoPacienteUnico: boolean = false;

  ngOnChanges(changes: SimpleChanges) { //verifica mudanças no input modoPacienteUnico
    if (changes['modoPacienteUnico'] && this.modoPacienteUnico) {
      const id = this.rotaAtivada.snapshot.params['id'];
      this.findAllPaciente(id);
    } else {
      this.findAll();
    }
  }

  constructor(){
    if(this.modoPacienteUnico == false){
      this.findAll();
    }

    else if(this.modoPacienteUnico == true){
      const id = this.rotaAtivada.snapshot.params['id'];
      this.findAllPaciente(id);
    }
    else{
      const id = this.rotaAtivada.snapshot.params['id'];
      this.findAllPaciente(id);
    }
  }

  findAll(){
    this.consultaService.findAll().subscribe({
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

  findAllPaciente(id: number){
    this.consultaService.findAllByPacienteId(id).subscribe({
      next: lista =>{
        this.lista = lista;
      },
      error: erro =>{
        alert("Erro aqui!");
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
