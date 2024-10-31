import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConsultaOdontologicaService } from '../../../services/consulta-odontologica.service';
import { ConsultaOdontologica } from '../../../models/consulta-odontologica';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas-odontologicas-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './consultas-odontologicas-form.component.html',
  styleUrl: './consultas-odontologicas-form.component.scss',
})
export class ConsultasOdontologicasFormComponent {
  modalRef!: MdbModalRef<any>;

  router = inject(Router);
  rotaAtivada = inject(ActivatedRoute);

  tituloComponente: string = "Nova Consulta Odontológica";

  consultaOdontologicaService = inject(ConsultaOdontologicaService);

  @Input() consultaOdontologica: ConsultaOdontologica = new ConsultaOdontologica();
  @Output() retorno = new EventEmitter();

  constructor() {}

  cadastrar() {
    if (this.consultaOdontologica.protocoloPreNatal.id) {
      this.consultaOdontologicaService.save(this.consultaOdontologica).subscribe({
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
    this.consultaOdontologicaService.update(this.consultaOdontologica).subscribe({
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
