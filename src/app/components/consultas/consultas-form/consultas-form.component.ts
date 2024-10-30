import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from '../../../models/consulta';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

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
          alert('Erro ao criar!');
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
        alert('Erro ao atualizar');
      }
    });
  }

}
