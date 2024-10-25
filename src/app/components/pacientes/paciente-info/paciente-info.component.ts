import { Component, inject } from "@angular/core";
import { Paciente } from "../../../models/paciente";
import { PacienteService } from "../../../services/paciente.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormataCPFService } from "../../../services/utility/formata-cpf.service";
import { DatePipe, NgClass } from "@angular/common";
import { StatusPacienteService } from "../../../services/utility/status-paciente.service";


@Component({
  selector: 'app-paciente-info',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './paciente-info.component.html',
  styleUrl: './paciente-info.component.scss'
})

export class PacienteInfoComponent {
  pacienteEncontrado!: Paciente;

  /*Injections*/
  pacienteService = inject(PacienteService);
  rotaAtivada = inject(ActivatedRoute);
  router = inject(Router);
  formataCPFService = inject(FormataCPFService);
  statusPacienteService = inject(StatusPacienteService);
  
  constructor(){
    let id = this.rotaAtivada.snapshot.params['id'];

    this.findById(id);
  }

  findById(id: number){
    
    this.pacienteService.findById(id).subscribe({
      next: paciente => {
        this.pacienteEncontrado = paciente;
      },
      error: erro => {
        alert('Paciente não encontrado'); //TODO: SWEET ALERT 
      }
    })

  }

}
