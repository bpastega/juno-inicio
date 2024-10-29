import { Component, inject, Input } from '@angular/core';
import { ConsultaOdontologica } from '../../../models/consulta-odontologica';
import { ConsultaOdontologicaService } from '../../../services/consulta-odontologica.service';
import { Protocolo } from '../../../models/protocolo';
import { ProtocoloService } from '../../../services/protocolo.service';

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

  consultaOdontologicaService = inject(ConsultaOdontologicaService);
  protocoloService = inject(ProtocoloService);

  @Input() modoLeitura: boolean = true;

  constructor(){
    this.listAll();
  }

  listAll(){ 

    this.consultaOdontologicaService.findAll().subscribe({ /*Dentro do back, o findAll retorna APENAS candidatos ativos. Por isso, não se faz necessário realizar essa filtragem no front.*/ 
      next: lista => { //quando o back retornar o que se espera
        this.lista = lista;
      },
      error: erro => { //quando ocorrer qualquer erro (badrequest, exceptions..)
        alert("Erro");
      }
    });

  }


}
