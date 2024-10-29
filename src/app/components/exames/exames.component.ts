import { Component } from '@angular/core';
import { ConsultasOdontologicasListComponent } from "../consultasOdontologicas/consultas-odontologicas-list/consultas-odontologicas-list.component";
import { TestesListComponent } from "../testes/testes-list/testes-list.component";
import { ProtocosListComponent } from "../protocolos/protocos-list/protocolos-list.component";
import { ConsultasListComponent } from "../consultas/consultas-list/consultas-list.component";

@Component({
  selector: 'app-exames',
  standalone: true,
  imports: [ConsultasOdontologicasListComponent, TestesListComponent, ProtocosListComponent, ConsultasListComponent],
  templateUrl: './exames.component.html',
  styleUrl: './exames.component.scss'
})
export class ExamesComponent {

}
