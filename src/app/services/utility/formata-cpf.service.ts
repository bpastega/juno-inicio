import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormataCPFService {

  formataCpf(cpf: string): string {
    if(!cpf){ //caso o cpf seja nulo, será retornada uma string vazia
      return "";
    }
    else{
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  }
}
