import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
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

  @Input() modoPacienteUnico: boolean = false;
  @Input() paciente!: Paciente; //seleciona o paciente, caso modoPacienteUnico seja true

  constructor(){
    if(!this.modoPacienteUnico){ //caso mostrar protocolos de todos os pacientes
      this.findAll();
    }

    else{
      this.lista = this.paciente.protocolos; //TESTAR ESSE TRECHO!!!

    }
    
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
        Swal.fire('Digite o nome do paciente!', erro.error, 'error');
      },
    });
  }

  findByAtivo(){
    this.protocoloService.findByAtivo().subscribe({
      next: (lista)=>{
        this.lista=lista;
      },
      error: (erro)=>{
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
      },
    });
  }

  findByInativo(){
    this.protocoloService.findByInativo().subscribe({
      next: (lista)=>{
        this.lista=lista;
      },
      error: (erro)=>{
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


  // para configuração das tabs de exibiçao MODOPACIENTEUNICO
  // TODO possivelmente retirar e substituir por filtragem no BACKEND
  ngOnInit() {
    this.protocoloService.findAll().subscribe((protocolos) => {
      // filtra apenas os protocolos do paciente encontrado
      this.lista = protocolos.filter(
        (protocolo) => protocolo.paciente.id === this.paciente.id
      );
    });
  }
}
