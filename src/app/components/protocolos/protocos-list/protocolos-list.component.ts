import { Component, inject } from '@angular/core';
import { Protocolo } from '../../../models/protocolo';
import { ProtocoloService } from '../../../services/protocolo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-protocolos-list',
  standalone: true,
  imports: [],
  templateUrl: './protocolos-list.component.html',
  styleUrl: './protocolos-list.component.scss'
})
export class ProtocosListComponent {


  lista: Protocolo[] = [];

  pesquisa: string = '';

  protocoloService = inject(ProtocoloService);

  constructor(){
    this.findAll();
  }

  findAll(){
    this.protocoloService.findAll().subscribe({
      next: lista =>{
        this.lista=lista;
      },
      error: erro =>{
        Swal.fire('Erro',erro.error,'error');
       // alert("Errooo!!")//alterar aqui futuramente para exibir o erro do back
      }
    })
  }

}
