import { Component, inject, Input } from '@angular/core';
import { TesteRapido } from '../../../models/teste-rapido';
import { TesteRapidoService } from '../../../services/teste-rapido.service';
import { StatusTesteService } from '../../../services/utility/status-teste.service';
import { NgClass } from '@angular/common';
import { Paciente } from '../../../models/paciente';

@Component({
  selector: 'app-testes-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './testes-list.component.html',
  styleUrl: './testes-list.component.scss'
})
export class TestesListComponent {
  lista: TesteRapido[] = [];

  testeRapidoService = inject(TesteRapidoService);
  statusTesteService = inject(StatusTesteService);

  @Input() modoLeitura: boolean = true;
  @Input() modoPacienteUnico: boolean = false;
  @Input() paciente!: Paciente; //seleciona o paciente, caso modoPacienteUnico seja true

  constructor(){
    /*TODO: IMPLEMENTAR UMA MANEIRA DE PEGAR TODOS OS TESTES RÁPIDOS COM BASE NO PACIENTE*/ 
      this.listAll();
  }

  listAll(){ 

    this.testeRapidoService.findAll().subscribe({  
      next: lista => { //quando o back retornar o que se espera
        this.lista = lista;
      },
      error: erro => { //quando ocorrer qualquer erro (badrequest, exceptions..)
        alert("Erro");
      }
    });

  }

}
