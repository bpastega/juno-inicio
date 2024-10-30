import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConsultaOdontologicaService } from '../../../services/consulta-odontologica.service';
import { ConsultaOdontologica } from '../../../models/consulta-odontologica';

@Component({
  selector: 'app-consultas-odontologicas-form',
  standalone: true,
  imports: [],
  templateUrl: './consultas-odontologicas-form.component.html',
  styleUrl: './consultas-odontologicas-form.component.scss',
})
export class ConsultasOdontologicasFormComponent {
  modalRef!: MdbModalRef<any>;

  consultaOdontologicaService = inject(ConsultaOdontologicaService);

  @Input() consultaOdontologica: ConsultaOdontologica =
    new ConsultaOdontologica();
  @Output() retorno = new EventEmitter();

  constructor() {}

  cadastrar() {
    if (this.consultaOdontologica.protocoloPreNatal.id) {
      this.consultaOdontologicaService.save(this.consultaOdontologica).subscribe({
        next: mensagem => {
          this.retorno.emit(mensagem);
        },
        error: erro => {
          alert('Erro ao criar!');
        }
      });
    } 
  } 

}
