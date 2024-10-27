import { Injectable } from '@angular/core';
import { Protocolo } from '../../models/protocolo';

@Injectable({
  providedIn: 'root'
})
export class StatusInfoProtocoloService {

  listDataEncerramento(protocolo: Protocolo): string{
    if(protocolo.dataEncerramento){
      return ""+protocolo.dataEncerramento;
    }

    else if(!protocolo.dataEncerramento){
      return " - ";
    }

    else{ //Nunca vai chegar nesse caso
      return "";
    }
  }
}
