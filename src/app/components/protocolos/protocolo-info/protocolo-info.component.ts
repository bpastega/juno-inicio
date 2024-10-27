import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtocoloService } from '../../../services/protocolo.service';
import { Protocolo } from '../../../models/protocolo';
import { DatePipe, NgClass } from '@angular/common';
import { StatusProtocoloService } from '../../../services/utility/status-protocolo.service';
import { StatusInfoProtocoloService } from '../../../services/utility/status-info-protocolo.service';

@Component({
  selector: 'app-protocolo-info',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './protocolo-info.component.html',
  styleUrl: './protocolo-info.component.scss'
})
export class ProtocoloInfoComponent {

  protocoloEncontrado!: Protocolo;


  //Injections
  rotaAtivada = inject(ActivatedRoute);
  router = inject(Router);

  protocoloService = inject(ProtocoloService);
  statusProtocoloService = inject(StatusProtocoloService);
  statusInfoProtocoloService = inject(StatusInfoProtocoloService);

  constructor(){
    let id = this.rotaAtivada.snapshot.params['id'];

    this.findById(id);
  }

  findById(id: number){
    
    this.protocoloService.findById(id).subscribe({
      next: protocolo => {
        this.protocoloEncontrado = protocolo;
        //this.pacienteEndereco = paciente.endereco;
      },
      error: erro => {
        alert('Protocolo não encontrado'); //TODO: SWEET ALERT 
      }
    })

  }

}
