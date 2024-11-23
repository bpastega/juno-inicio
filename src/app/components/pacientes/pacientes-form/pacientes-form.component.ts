import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { PacienteService } from '../../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../models/paciente';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Endereco } from '../../../models/endereco';
import Swal from 'sweetalert2';

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

  cadastrar(){
    if(this.paciente.protocolos && this.paciente.protocolos.length>0){
      this.paciente.statusPreNatal = true;
    }


    this.pacienteService.save(this.paciente).subscribe({
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

  atualizar(){
    this.pacienteService.update(this.paciente).subscribe({
      next: mensagem =>{
        
        this.retorno.emit(mensagem);

      },error: erro => {
        let mensagemErro = "Erro desconhecido";
    
        if (erro.status === 403) {
            mensagemErro = "Você não tem permissão para realizar essa operação.";
        }
    
        if (erro.error) {
            try {
                // interpreta o erro como JSON se for uma string
                const errorResponse = typeof erro.error === 'string' ? JSON.parse(erro.error) : erro.error;
    
                // concatena todas as mensagens de erro
                mensagemErro = Object.values(errorResponse).join(', ');
            } catch (e) {
                mensagemErro = erro.message || "Erro desconhecido no formato da resposta.";
            }
        }
    
        console.error("Erro no serviço:", erro);  // Mostra mais detalhes do erro
        Swal.fire(mensagemErro);
    }
    });
  }

  

}
