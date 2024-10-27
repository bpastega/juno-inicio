import { Component } from '@angular/core';
import { ConsultasOdontologicasListComponent } from "../consultasOdontologicas/consultas-odontologicas-list/consultas-odontologicas-list.component";
import { TestesListComponent } from "../testes/testes-list/testes-list.component";

@Component({
  selector: 'app-exames',
  standalone: true,
  imports: [ConsultasOdontologicasListComponent, TestesListComponent],
  templateUrl: './exames.component.html',
  styleUrl: './exames.component.scss'
})
export class ExamesComponent {

}
