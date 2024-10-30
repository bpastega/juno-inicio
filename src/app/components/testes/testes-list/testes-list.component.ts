import { Component, inject, Input, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TesteRapido } from '../../../models/teste-rapido';
import { TesteRapidoService } from '../../../services/teste-rapido.service';
import { StatusTesteService } from '../../../services/utility/status-teste.service';
import { NgClass } from '@angular/common';
import { Paciente } from '../../../models/paciente';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TestesFormComponent } from "../testes-form/testes-form.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testes-list',
  standalone: true,
  imports: [NgClass, TestesFormComponent],
  templateUrl: './testes-list.component.html',
  styleUrl: './testes-list.component.scss'
})
export class TestesListComponent {
  lista: TesteRapido[] = [];
  testeEdit!: TesteRapido;

  rotaAtivada = inject(ActivatedRoute);
  router = inject(Router);

  testeRapidoService = inject(TesteRapidoService);
  statusTesteService = inject(StatusTesteService);

  modalService = inject(MdbModalService); // responsável por abrir as modais
  @ViewChild('modalTestesRapidosForm') modalTestesRapidosForm!: TemplateRef<any>; //enxergar o template da modal q tá no html

  modalRef!: MdbModalRef<any>;

  @Input() modoLeitura!: boolean;
  @Input() modoPacienteUnico!: boolean;

  ngOnChanges(changes: SimpleChanges) { //verifica mudanças no input modoPacienteUnico
    if (changes['modoPacienteUnico'] && this.modoPacienteUnico) {
      const id = this.rotaAtivada.snapshot.params['id'];
      this.listAllPaciente(id);
    } else {
      this.listAll();
    }
  }

  /*constructor(){

    if(this.modoPacienteUnico == true){
      let id = this.rotaAtivada.snapshot.params['id'];
      this.listAllPaciente(id);
    }

    else{
      this.listAll();
    }
    
  }*/

  listAll(){ 

    this.testeRapidoService.findAll().subscribe({  
      next: testes => { //quando o back retornar o que se espera
        this.lista = testes;
      },
      error: erro => { //quando ocorrer qualquer erro (badrequest, exceptions..)
        alert("Erro");
      }
    });

  }

  listAllPaciente(id: number){
    this.testeRapidoService.findAllByPacienteId(id).subscribe({
      next: lista =>{
        this.lista = lista;
      },
      error: erro =>{
        alert("Erro aqui!!");
      }
    })
  }

  editarTesteRapido(testeRapido: TesteRapido) {
    this.testeEdit = Object.assign({}, testeRapido); //cria um clone do objeto para evitar edição automática
    this.modalRef = this.modalService.open(this.modalTestesRapidosForm);
  }

  deletarById(id: number){
    Swal.fire({
      title: 'Confirme a deleção do Teste Rápido.',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.testeRapidoService.encerrar(id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            //adicionar um refresh
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

  }


}
