import { Injectable } from '@angular/core';
import { Protocolo } from '../../models/protocolo';

@Injectable({
  providedIn: 'root'
})
export class StatusProtocoloService {

  /*Renderiza o status do paciente em formatos e cores diferentes*/ 
  renderStatusProtocolo(protocolo: Protocolo): string{
    if(protocolo.statusProtocolo == true){
      return "badge badge-success rounded-pill d-inline";
    }

    else if(protocolo.statusProtocolo == false){
      return "badge badge-danger rounded-pill d-inline";
    }

    else{ //Nunca vai chegar nesse caso
      return "";
    }

  }

  /*Atribui strings correspondentes aos valores booleanos de um status pré-natal*/ 
  listStatusProtocolo(protocolo: Protocolo): string{
    if(protocolo.statusProtocolo == true){
      return "Ativo";
    }

    else if(protocolo.statusProtocolo == false){
      return "Inativo";
    }

    else{ //Nunca vai chegar nesse caso
      return "";
    }
  }

  /* verifica se o status é ativo */
  isAtivo(protocolo: Protocolo): boolean {
    return protocolo.statusProtocolo == true; //true ativo
  }

  
}
