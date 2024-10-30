import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TesteRapidoService } from '../../../services/teste-rapido.service';
import { TesteRapido } from '../../../models/teste-rapido';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testes-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './testes-form.component.html',
  styleUrl: './testes-form.component.scss'
})
export class TestesFormComponent {

  
  modalRef!: MdbModalRef<any>; 

  router = inject(Router);
  rotaAtivada = inject(ActivatedRoute);

  testeService = inject(TesteRapidoService);

  tituloComponente: string = "Novo Teste Rápido";

  testeRapidoService = inject(TesteRapidoService);

  @Input() teste: TesteRapido = new TesteRapido();
  @Output() retorno = new EventEmitter();
  
  constructor(){

  }

  cadastrar(){
    if (this.teste.protocoloPreNatal.id) {
      this.testeService.save(this.teste).subscribe({
        next: mensagem => {
          this.retorno.emit(mensagem);
        },
        error: erro => {
          alert('Erro ao criar!');
        }
      });
    } 
  }

  atualizar(){
    this.testeService.update(this.teste).subscribe({
      next: mensagem =>{
        
        this.retorno.emit(mensagem);

      },
      error: erro =>{
        alert('Erro ao atualizar');
      }
    });
  }
}
