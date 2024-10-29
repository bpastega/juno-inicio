import { Component, inject, Input } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Consulta } from '../../../models/consulta';
import { ConsultaService } from '../../../services/consulta.service';
import { DatePipe, NgClass } from '@angular/common';
import { StatusPacienteService } from '../../../services/utility/status-paciente.service';
import { Paciente } from '../../../models/paciente';

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
  statusPacienteService = inject(StatusPacienteService);

  @Input() modoLeitura: boolean = true;
  @Input() modoPacienteUnico: boolean = false;
  @Input() paciente!: Paciente; //seleciona o paciente, caso modoPacienteUnico seja true

  constructor(){
    if(!this.modoPacienteUnico){ //caso mostrar protocolos de todos os pacientes
      this.findAll();
    }

    else{
      this.lista = this.paciente.consultas; //TESTAR ESSE TRECHO!!!
    }
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
