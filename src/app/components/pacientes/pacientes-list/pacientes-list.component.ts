import { Component, inject, LOCALE_ID } from '@angular/core';
import { Paciente } from '../../../models/paciente';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { ImagemService } from '../../../services/imagem.service';
import { DatePipe, registerLocaleData } from '@angular/common';
//Teste 
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.scss'
})
export class PacientesListComponent {
  lista: Paciente[] = [];

  /*Injeta o Service, semelhante ao Autowired*/ 
  pacienteService = inject(PacienteService);
  imagemService = inject(ImagemService);

  constructor(){
    this.lista.push(new Paciente(123, 'Amélia Santos', '543.707.590-13', 'ameliasantos@gmail.com', new Date(1995, 11, 17), "A+" ));
    this.lista.push(new Paciente(124, 'Maria Oliveira', '312.579.140-57', 'mariaoliveira@hotmail.com', new Date(2009, 5, 22), "O-"));
    this.lista.push(new Paciente(125, 'Juliana Costa', '431.532.100-12', 'julianacosta@yahoo.com', new Date(1988, 2, 14), "B+"));
    this.lista.push(new Paciente(126, 'Carla Silva', '252.604.310-73', 'carlasilva@gmail.com', new Date(1985, 7, 9), "AB-"));
    this.lista.push(new Paciente(127, 'Fernanda Lima', '605.577.210-83', 'fernandalima@gmail.com', new Date(2014, 4, 19), "A+"));
    this.lista.push(new Paciente(128, 'Patrícia Santos', '352.388.640-60', 'patriciasantos@outlook.com', new Date(1993, 9, 12), "O+"));
    this.lista.push(new Paciente(129, 'Luciana Ferreira', '069.784.630-00', 'lucianaferreira@hotmail.com', new Date(1990, 11, 30), "B-"));
  }

  /*https://stackoverflow.com/questions/8152426/how-can-i-calculate-the-number-of-years-between-two-dates -- UTF-8*/ 
  verificaMaioridade(paciente:Paciente, dataAtual = new Date()){
      const diferencaAnos = dataAtual.getFullYear() - paciente.dataNascimento.getFullYear();
      const diferencaMeses = dataAtual.getMonth() - paciente.dataNascimento.getMonth();
      const diferencaDias = dataAtual.getDate() - paciente.dataNascimento.getDate();
    
      const doNotSubtractOne = diferencaMeses > 0 || (diferencaMeses === 0 && diferencaDias >= 0);
      var anosTotais = doNotSubtractOne ? diferencaAnos : diferencaAnos - 1;

      if(anosTotais<18){
        return "Menor de Idade"
      }

      else{
        return "Maior de Idade";
      }
    }

    findAll(){
      /*Semelhante a um try-catch*/
      
      /*AULA 16/10:: this.pacienteService.findAll().subscribe({
          next: todosPacientes =>{
              this.lista = todosPacientes;

          },

          error: erro =>{
              alert("Deu erro");

          }
      })*/
      
    }
  
}

  
