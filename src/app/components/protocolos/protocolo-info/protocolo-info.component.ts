import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtocoloService } from '../../../services/protocolo.service';
import { Protocolo } from '../../../models/protocolo';
import { DatePipe, NgClass } from '@angular/common';
import { StatusProtocoloService } from '../../../services/utility/status-protocolo.service';
import { StatusInfoProtocoloService } from '../../../services/utility/status-info-protocolo.service';
import { ConsultasOdontologicasListComponent } from "../../consultasOdontologicas/consultas-odontologicas-list/consultas-odontologicas-list.component";
import { TestesListComponent } from "../../testes/testes-list/testes-list.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protocolo-info',
  standalone: true,
  imports: [DatePipe, NgClass, ConsultasOdontologicasListComponent, TestesListComponent],
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

  encerrar(protocolo: Protocolo){
    Swal.fire({
      title: 'Realmente deseja encerrar o protocolo de ' + protocolo.paciente.nome + '?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.protocoloService.encerrar(protocolo.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.router.navigate(['/admin/protocolos']);
            //this.findAll();
          },
          error: (erro) => {
            
            Swal.fire('Erro!',erro.error,'error');
          },
        });
      }
    });
  }

}
