import { Component, inject } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Consulta } from '../../../models/consulta';
import { ConsultaService } from '../../../services/consulta.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-consultas-list',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './consultas-list.component.html',
  styleUrl: './consultas-list.component.scss'
})
export class ConsultasListComponent {

  lista: Consulta[] = [];

  /*Injections*/
  pacienteService = inject(PacienteService); //será usado para filtrar consulta com base no nome do paciente
  consultaService = inject(ConsultaService);

  constructor(){
    this.findAll();
  }

  findAll(){
    this.consultaService.findAll().subscribe({
      next: lista=>{
        this.lista=lista;
      },
      error: erro =>{
       // Swal.fire('Erro',erro.error,'error');
       // alert('Errooooo!!')//futuramente adicionar sweetalert2
       console.log(erro);
      }
    })
    
  }

}
