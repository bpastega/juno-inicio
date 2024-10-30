import { Component, inject, Input } from '@angular/core';
import { TesteRapido } from '../../../models/teste-rapido';
import { TesteRapidoService } from '../../../services/teste-rapido.service';
import { StatusTesteService } from '../../../services/utility/status-teste.service';
import { NgClass } from '@angular/common';
import { Paciente } from '../../../models/paciente';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testes-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './testes-list.component.html',
  styleUrl: './testes-list.component.scss'
})
export class TestesListComponent {
  lista: TesteRapido[] = [];

  rotaAtivada = inject(ActivatedRoute);

  testeRapidoService = inject(TesteRapidoService);
  statusTesteService = inject(StatusTesteService);

  @Input() modoLeitura: boolean = false;
  @Input() modoPacienteUnico: boolean = true;

  constructor(){

    if(this.modoPacienteUnico == true){
      let id = this.rotaAtivada.snapshot.params['id'];
      this.listAllPaciente(id);
    }

    else{
      this.listAll();
    }
    
  }

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

}
