import { Component, inject } from '@angular/core';
import { Protocolo } from '../../../models/protocolo';
import { ProtocoloService } from '../../../services/protocolo.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { StatusPacienteService } from '../../../services/utility/status-paciente.service';
import { NgClass } from '@angular/common';
import { StatusProtocoloService } from '../../../services/utility/status-protocolo.service';


@Component({
  selector: 'app-protocolos-list',
  standalone: true,
  imports: [FormsModule,NgClass],
  templateUrl: './protocolos-list.component.html',
  styleUrl: './protocolos-list.component.scss'
})
export class ProtocosListComponent {


  lista: Protocolo[] = [];

  pesquisa: string = '';

  protocoloService = inject(ProtocoloService);

  statusProtocoloService = inject(StatusProtocoloService)


  constructor(){
    this.findAll();
  }

  findAll(){
    this.protocoloService.findAll().subscribe({
      next: lista =>{
        this.lista=lista;
      },
      error: erro =>{
        Swal.fire('Erro',erro.error,'error');
       // alert("Errooo!!")//alterar aqui futuramente para exibir o erro do back
      }
    })
  }
  //filtro de busca de PROTOCOLO pelo nome do paciente.

  findByPacienteNome(){
    this.protocoloService.findByPacienteNome(this.pesquisa).subscribe({
      next: (lista)=>{
        this.lista=lista;
      },
      error: (erro)=>{
        Swal.fire('Erro', erro.error,'error');
      },
    });
  }

  findByAtivo(){
    this.protocoloService.findByAtivo().subscribe({
      next: (lista)=>{
        this.lista=lista;
      },
      error: (erro)=>{
        Swal.fire('Erro', erro.error,'error');
      },
    });
  }

  findByInativo(){
    this.protocoloService.findByInativo().subscribe({
      next: (lista)=>{
        this.lista=lista;
      },
      error: (erro)=>{
        Swal.fire('Erro', erro.error,'error');
      },
    });
  }


  encerrar(protocolo: Protocolo){
    Swal.fire({
      title: 'Realmente deseja encerrar o protocolo de ' + protocolo.paciente.nome + '?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.protocoloService.encerrar(protocolo.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            
            Swal.fire('Erro!',erro.error,'error');
          },
        });
      }
    });
  }
}
