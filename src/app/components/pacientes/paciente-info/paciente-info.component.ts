import { Component, inject } from "@angular/core";
import { Paciente } from "../../../models/paciente";
import { PacienteService } from "../../../services/paciente.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormataCPFService } from "../../../services/utility/formata-cpf.service";
import { DatePipe, NgClass } from "@angular/common";
import { StatusPacienteService } from "../../../services/utility/status-paciente.service";
import { Endereco } from "../../../models/endereco";
import Swal from "sweetalert2";
import { Protocolo } from "../../../models/protocolo";
import { ProtocoloService } from "../../../services/protocolo.service";


@Component({
  selector: 'app-paciente-info',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './paciente-info.component.html',
  styleUrl: './paciente-info.component.scss'
})

export class PacienteInfoComponent {
  pacienteEncontrado!: Paciente;
  pacienteEndereco!: Endereco;
  pacienteProtocoloAtivo!: Protocolo;

  protocolosPaciente: Protocolo[] = [];
  protocolosAtivos: Protocolo[] = [];


  /*Injections*/
  formataCPFService = inject(FormataCPFService);
  statusPacienteService = inject(StatusPacienteService);
  protocoloService = inject(ProtocoloService);
  pacienteService = inject(PacienteService);

  rotaAtivada = inject(ActivatedRoute);
  router = inject(Router);

  
  
  constructor(){
    let id = this.rotaAtivada.snapshot.params['id'];

    this.findById(id);
  }

  findById(id: number){
    
    this.pacienteService.findById(id).subscribe({
      next: paciente => {
        this.pacienteEncontrado = paciente;
        this.pacienteEndereco = paciente.endereco;
      },
      error: erro => {
        alert('Paciente não encontrado'); //TODO: SWEET ALERT 
      }
    })

  }

  /*NÃO FUNCIONA*/
  encontrarProtocoloAtivo(paciente: Paciente) {
    this.protocoloService.findByPacienteNome(paciente.nome).subscribe({ //percorre todos protocolos daquele paciente
      next: protocolosEncontrados => {
        this.protocolosAtivos = protocolosEncontrados.filter(protocolo => protocolo.statusProtocolo == true); // filtra 

        alert(this.protocolosAtivos.length);
        
      },
      error: erro => {
        Swal.fire('Erro!', erro.error, 'error');
      }
    });
  }
  
  /*Nosso objetivo aqui é encontrar o protocolo ativo de determinado paciente*/
  /*encontrarProtocoloAtivo(paciente: Paciente){
  
  this.protocoloService.findByPacienteNome(paciente.nome).subscribe({ //procura os protocolos com o nome daquele paciente
      next: (protocolosEncontrados) =>{
        this.protocolosPaciente = protocolosEncontrados; //armazena os protocolos do paciente

        this.protocoloService.findByAtivo().subscribe({ //procura os protocolos ativos
          next: (protocolosAtivosEncontrados) =>{
            this.protocolosAtivos = protocolosAtivosEncontrados; //armazena os protocolos ativos encontrados
          },

          error: (erro) => {
            Swal.fire('Erro!',erro.error,'error'); 
          },
        }); 
      }, 
      
      error: (erro) => {
        Swal.fire('Erro!',erro.error,'error');
      },
  })
     
  }*/

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
