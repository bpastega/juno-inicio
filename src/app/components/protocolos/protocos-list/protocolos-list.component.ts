import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Protocolo } from '../../../models/protocolo';
import { ProtocoloService } from '../../../services/protocolo.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { StatusProtocoloService } from '../../../services/utility/status-protocolo.service';
import { ProtocolosFormComponent } from "../protocolos-form/protocolos-form.component";
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Paciente } from '../../../models/paciente';
import { Router } from '@angular/router';


@Component({
  selector: 'app-protocolos-list',
  standalone: true,
  imports: [FormsModule, NgClass, ProtocolosFormComponent, MdbModalModule],
  templateUrl: './protocolos-list.component.html',
  styleUrl: './protocolos-list.component.scss'
})
export class ProtocosListComponent {

  
  modalService = inject(MdbModalService); // responsável por abrir as modais
  @ViewChild('modalProtocoloForm') modalProtocoloForm!: TemplateRef<any>; //enxergar o template da modal q tá no html
  modalRef!: MdbModalRef<any>; //a referencia da modal aberta para ser fechada

  lista: Protocolo[] = [];

  pesquisa: string = '';

  protocoloService = inject(ProtocoloService);
  statusProtocoloService = inject(StatusProtocoloService)
  protocoloEdit!: Protocolo;

  router = inject(Router);


  constructor(){
    this.findAll();
  }

  navigateToInfo(id: number) {
    this.router.navigate(['/admin/protocolos/info', id]);
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


  retornoForm(mensagem: string) {
    //acionado quando houver um evento salvar ou editar do FORM que está aberto na modal

      this.modalRef.close(); //fecha a moodal

    Swal.fire({
      title: mensagem,
      icon: 'success',
    });

    this.findAll(); //atualiza e recarrega a lista
  }
}
