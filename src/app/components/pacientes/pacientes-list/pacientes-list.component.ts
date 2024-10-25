import { Component, inject, LOCALE_ID } from '@angular/core';
import { Paciente } from '../../../models/paciente';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { ImagemService } from '../../../services/imagem.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import Swal from 'sweetalert2';
//Teste 
import localePT from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';

registerLocaleData(localePT);

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [RouterLink, DatePipe,FormsModule],
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.scss'
})
export class PacientesListComponent {
  lista: Paciente[] = [];

  pesquisa: string = '';

  /*Injeta o Service, semelhante ao Autowired*/ 
  pacienteService = inject(PacienteService);
  imagemService = inject(ImagemService);

  constructor(){
    // this.lista.push(new Paciente(123, 'Amélia Santos', '543.707.590-13', 'ameliasantos@gmail.com', new Date(1995, 11, 17), "A+" ));
   this.findAll();
  }

  /*https://stackoverflow.com/questions/8152426/how-can-i-calculate-the-number-of-years-between-two-dates -- UTF-8 
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
    }*/

    findAll(){
      this.pacienteService.findAll().subscribe({
        next: lista=>{
          this.lista=lista;
        },
        error: erro =>{
          alert('Errooooo!!')//futuramente adicionar sweetalert2
        }
      })
      
    }
  
    findByNome() {
      this.pacienteService.findByNome(this.pesquisa).subscribe({
        next: (lista) => {
          this.lista = lista;
        },
        error: (erro) => {
          alert('Deu erro');
        },
      });
    }

    deletarById(paciente: Paciente){
      Swal.fire({
        title: 'Tem certeza que deseja deletar o paciente ' + paciente.nome + '?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.pacienteService.delete(paciente.id).subscribe({
            next: (mensagem) => {
              Swal.fire(mensagem, '', 'success');
              this.findAll();
            },
            error: (erro) => {
              alert('Deu erro');
            },
          });
        }
      });
    }

    cadastrar(){
      //implementar a lógica de abertura de modal APÓS criar o formulario de paciente
      /*
      this.pacienteEdit = new Paciente();
      this.modalRef = this.modalService.open(this.modalPacientesForm);
      */
    }

}

  
