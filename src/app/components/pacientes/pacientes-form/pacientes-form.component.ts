import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { PacienteService } from '../../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../models/paciente';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Endereco } from '../../../models/endereco';

@Component({
  selector: 'app-pacientes-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './pacientes-form.component.html',
  styleUrl: './pacientes-form.component.scss'
})
export class PacientesFormComponent {

  modalRef!: MdbModalRef<any>; //a referencia da modal aberta para ser fechada

  router = inject(Router);
  rotaAtivada = inject(ActivatedRoute);
  
  tituloComponente: string = "Novo paciente";

  pacienteService = inject(PacienteService);

  @Input() paciente: Paciente = new Paciente(new Endereco());

 // endereco: Endereco = new Endereco; //tentando adicionar o endereço ao PACIENTE

  @Output() retorno = new EventEmitter();

  /* -> para refatoraçao caso faça a modal dentro de modal
   @Input() paciente: Paciente = new Paciente();
  @Output() retorno = new EventEmitter();
  */

  constructor(){
    this.paciente.endereco= new Endereco();
    let id = this.rotaAtivada.snapshot.params['id'];
    if(id > 0){
      //this.modoNovo = false; //
      this.tituloComponente = "Editar paciente";   //se o id for maior que 0 entao o paciente JÁ existe no banco, entao editamos.
      this.findById(id);
  
    }
  }


  findById(id: number){
    
    this.pacienteService.findById(id).subscribe({
      next: pacienteAUX => {
        this.paciente = pacienteAUX;
        if(this.paciente.endereco==null){
          this.paciente.endereco=new Endereco();
        }

      },
      error: erro => {
        alert('Deu erro');
      }
    })

  }

  cadastrar(){
    if(this.paciente.protocolos && this.paciente.protocolos.length>0){
      this.paciente.statusPreNatal = true;
    }


    this.pacienteService.save(this.paciente).subscribe({
      next: mensagem => {

        this.retorno.emit(mensagem);

      },
      error: erro => {
        alert('Deu erro');
      }
    });

  }

  atualizar(){
    this.pacienteService.update(this.paciente).subscribe({
      next: mensagem =>{
        
        this.retorno.emit(mensagem);

      },
      error: erro =>{
        alert('Deu erro');
      }
    });
  }

  

}
