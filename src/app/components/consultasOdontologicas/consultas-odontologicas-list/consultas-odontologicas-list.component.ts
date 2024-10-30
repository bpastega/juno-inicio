import { Component, inject, Input } from '@angular/core';
import { ConsultaOdontologica } from '../../../models/consulta-odontologica';
import { ConsultaOdontologicaService } from '../../../services/consulta-odontologica.service';
import { Protocolo } from '../../../models/protocolo';
import { ProtocoloService } from '../../../services/protocolo.service';
import { Paciente } from '../../../models/paciente';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultas-odontologicas-list',
  standalone: true,
  imports: [],
  templateUrl: './consultas-odontologicas-list.component.html',
  styleUrl: './consultas-odontologicas-list.component.scss'
})
export class ConsultasOdontologicasListComponent {
  lista: ConsultaOdontologica[] = [];

  /*Lista de Protocolos que estarão ligados às consultas odontológicas*/ 
  listaProtocolo: Protocolo[] = [];

  rotaAtivada = inject(ActivatedRoute);

  consultaOdontologicaService = inject(ConsultaOdontologicaService);
  protocoloService = inject(ProtocoloService);

  @Input() modoLeitura!: boolean;
  @Input() modoPacienteUnico!: boolean;

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

    this.consultaOdontologicaService.findAll().subscribe({ /*Dentro do back, o findAll retorna APENAS candidatos ativos. Por isso, não se faz necessário realizar essa filtragem no front.*/ 
      next: consultas => { //quando o back retornar o que se espera
        this.lista = consultas;
      },
      error: erro => { //quando ocorrer qualquer erro (badrequest, exceptions..)
        alert("Erro");
      }
    });

  }

  listAllPaciente(id: number){
    this.consultaOdontologicaService.findAllByPacienteId(id).subscribe({
      next: lista =>{
        this.lista = lista;
      },
      error: erro =>{
        alert("Erro");
      }
    })
  }


}
