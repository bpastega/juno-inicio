import { Component, inject } from '@angular/core';
import { TesteRapido } from '../../../models/teste-rapido';
import { TesteRapidoService } from '../../../services/teste-rapido.service';
import { StatusTesteService } from '../../../services/utility/status-teste.service';
import { NgClass } from '@angular/common';

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

  constructor(){
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
