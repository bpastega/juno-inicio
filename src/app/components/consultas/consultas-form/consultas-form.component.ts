import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from '../../../models/consulta';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './consultas-form.component.html',
  styleUrl: './consultas-form.component.scss'
})
export class ConsultasFormComponent {

  modalRef!: MdbModalRef<any>; 

  router = inject(Router);
  rotaAtivada = inject(ActivatedRoute);

  tituloComponente: string = "Nova Consulta";

  consultaService = inject(ConsultaService);

  @Input() consulta: Consulta = new Consulta();
  @Output() retorno = new EventEmitter();

  constructor(){

  }

  cadastrar() {
    if (this.consulta.paciente.id) {
      this.consultaService.save(this.consulta).subscribe({
        next: mensagem => {
          this.retorno.emit(mensagem);
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
      });
    } 
  } 

  atualizar(){
    this.consultaService.update(this.consulta).subscribe({
      next: mensagem =>{
        
        this.retorno.emit(mensagem);

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
    });
  }

}
