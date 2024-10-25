import { Injectable } from '@angular/core';
import { Paciente } from '../../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class StatusPacienteService {

  /*Renderiza o status do paciente em formatos e cores diferentes*/ 
  renderStatusPaciente(paciente: Paciente): string{
    if(paciente.statusPreNatal == true){
      return "badge badge-success rounded-pill d-inline";
    }

    else if(paciente.statusPreNatal == false){
      return "badge badge-danger rounded-pill d-inline";
    }

    else{ //Nunca vai chegar nesse caso
      return "";
    }

  }

  /*Atribui strings correspondentes aos valores booleanos de um status pré-natal*/ 
  listStatusPaciente(paciente: Paciente): string{
    if(paciente.statusPreNatal == true){
      return "Ativo";
    }

    else if(paciente.statusPreNatal == false){
      return "Inativo";
    }

    else{ //Nunca vai chegar nesse caso
      return "";
    }
  }

  /*Renderiza o botão do Protocolo Atual em formatos e cores diferentes*/ 
  renderProtocoloAtual(paciente: Paciente){
    if(paciente.statusPreNatal == true){
      return "btn btn-link btn-sm btn-rounded";
    }
    
    else if (paciente.statusPreNatal == false){
      return "btn btn-link btn-sm btn-rounded inactive-button"
    }

    else{
      return "";
    }
  }

  listProtocoloAtual(paciente: Paciente){
    if(paciente.statusPreNatal == true){
      return "Protocolo Atual";
    }

    else if (paciente.statusPreNatal == false){
      return "Protocolo Indisponível";
    }
    else{
      return "";
    }
  }
}
