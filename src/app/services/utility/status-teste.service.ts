import { Injectable } from '@angular/core';
import { TesteRapido } from '../../models/teste-rapido';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root'
})
export class StatusTesteService {

  /*NOMES : hemograma // urocultura*/

  /*Renderiza os diferentes testes rápidos em formatos e cores correspondentes*/
  renderStatusTeste(testeRapido: TesteRapido): string {

    /*CASO A: SANGUE E URINA*/
    if (testeRapido.exameSangue == true && testeRapido.exameUrina == true) {
      return "badge badge-success rounded-pill d-inline";
    }

    /*CASO B: SÓ SANGUE*/
    else if (testeRapido.exameSangue == true && testeRapido.exameUrina == false) {
      return "badge badge-danger rounded-pill d-inline";
    }

    /*CASO C: SÓ URINA*/
    else if (testeRapido.exameSangue == false && testeRapido.exameUrina == true) {
      return "badge badge-warning text-dark d-inline";
    }

    /*CASO D: EXAME DE NADA*/
    else if (testeRapido.exameSangue == false && testeRapido.exameUrina == false) {
      return "badge badge-light text-dark d-inline";
    }

    else { //Nunca vai chegar nesse caso
      return "";
    }

  }

  /*Atribui strings correspondentes aos valores booleanos de um status pré-natal*/
  listStatusTeste(testeRapido: TesteRapido): string {
    /*CASO A: SANGUE E URINA*/
    if (testeRapido.exameSangue == true && testeRapido.exameUrina == true) {
      return "Hemograma e Urocultura";
    }

    /*CASO B: SÓ SANGUE*/
    else if (testeRapido.exameSangue == true && testeRapido.exameUrina == false) {
      return "Hemograma";
    }

    /*CASO C: SÓ URINA*/
    else if (testeRapido.exameSangue == false && testeRapido.exameUrina == true) {
      return "Urocultura";
    }

    /*CASO D: EXAME DE NADA*/
    else if (testeRapido.exameSangue == false && testeRapido.exameUrina == false) {
      return "N/A"
    }

    else { //Nunca vai chegar nesse caso
      return "";
    }

  }

}
