import { Component } from '@angular/core';
import { ConsultasOdontologicasListComponent } from "../consultasOdontologicas/consultas-odontologicas-list/consultas-odontologicas-list.component";
import { TestesListComponent } from "../testes/testes-list/testes-list.component";
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-exames',
  standalone: true,
  imports: [ConsultasOdontologicasListComponent, TestesListComponent, MdbFormsModule, FormsModule, MdbModalModule],
  templateUrl: './exames.component.html',
  styleUrl: './exames.component.scss'
})
export class ExamesComponent {
  

}
