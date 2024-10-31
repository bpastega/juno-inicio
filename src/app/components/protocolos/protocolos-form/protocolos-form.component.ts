import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ProtocoloService } from '../../../services/protocolo.service';
import { Protocolo } from '../../../models/protocolo';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protocolos-form',
  standalone: true,
  imports: [MdbFormsModule,FormsModule],
  templateUrl: './protocolos-form.component.html',
  styleUrl: './protocolos-form.component.scss'
})
export class ProtocolosFormComponent {


  modalRef!: MdbModalRef<any>; //a referencia da modal aberta para ser fechada

  router = inject(Router);
  rotaAtivada = inject(ActivatedRoute);

  tituloComponente: string = "Novo protocolo";

  protocoloService = inject(ProtocoloService);

  @Input() protocolo: Protocolo = new Protocolo();
  @Output() retorno = new EventEmitter();
  

  constructor(){}

  cadastrar() {
    // verififico se o ID está definido no body evitando erro de paciente null no banco
    if (this.protocolo.paciente.id) {
      this.protocoloService.save(this.protocolo).subscribe({
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
    } else {
      alert('O ID do paciente é necessário.');
    }
  } 
  atualizar(){
    this.protocoloService.update(this.protocolo).subscribe({
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
