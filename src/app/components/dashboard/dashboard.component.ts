import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../auth/usuario';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dataAtual: Date = new Date();
  usuario!: Usuario;

  constructor(){
    
  }


}
