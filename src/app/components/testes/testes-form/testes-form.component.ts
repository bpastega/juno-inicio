import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TesteRapidoService } from '../../../services/teste-rapido.service';
import { TesteRapido } from '../../../models/teste-rapido';

@Component({
  selector: 'app-testes-form',
  standalone: true,
  imports: [],
  templateUrl: './testes-form.component.html',
  styleUrl: './testes-form.component.scss'
})
export class TestesFormComponent {

  
  modalRef!: MdbModalRef<any>; 

  testeService = inject(TesteRapidoService);

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
}
