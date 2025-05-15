import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { Usuario } from '../../auth/usuario';
import ApexCharts from 'apexcharts';
import { LoginService } from '../../auth/login.service';
import { TesteRapidoService } from '../../services/teste-rapido.service';
import { first, firstValueFrom, forkJoin, lastValueFrom } from 'rxjs';
import { PacienteService } from '../../services/paciente.service';
import { ProtocoloService } from '../../services/protocolo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  dataAtual: Date = new Date();
  usuario!: Usuario;

  testeRapidoSangue!: number;
  testeRapidoUrina!: number;
  testeRapidoCompleto!: number;
  testeRapidoGenerico!: number;

  pacientesAtivos!: number;
  pacientesInativos!: number;

  protocolosAtivos!: number;
  protocolosInativos!: number;

  loginService = inject(LoginService);
  testeRapidoService = inject(TesteRapidoService);
  pacienteService = inject(PacienteService);
  protocoloService = inject(ProtocoloService);
  private router = inject(Router);

  constructor() {
    this.usuario = this.loginService.getUsuarioLogado();
    
  }
  

  async ngAfterViewInit(): Promise<void> {
    const token = this.loginService.getToken();
    if (token) {
      const decoded = this.loginService.jwtDecode() ?? { exp: 0 }; // Trate null/undefined
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) {
        console.error('Token expirado. Faça login novamente.');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return;
      }
      console.log('Token válido:', decoded);
    } else {
      console.error('Nenhum token encontrado. Faça login.');
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = this.loginService.getUsuarioLogado();
    await this.countAllTestesRapidos();
    await this.countAllPacientes();
    await this.countAllProtocolos();

    this.renderChart('chart1', 'donut', 'Status de Pacientes', [this.pacientesAtivos, this.pacientesInativos], ['Ativo', 'Inativo']);
    this.renderChart('chart2', 'donut', 'Status de Protocolos', [this.protocolosAtivos, this.protocolosInativos], ['Ativo', 'Inativo']);
    this.renderChart('chart3', 'donut', 'Tipos de Testes Rápidos', [this.testeRapidoSangue, this.testeRapidoUrina, this.testeRapidoCompleto, this.testeRapidoGenerico], ['Hemograma', 'Urina', 'Completo', 'Genérico']);
  }

  // async ngAfterViewInit(): Promise<void> {
  //   // Wait for the data to be loaded before proceeding
  //   this.usuario = this.loginService.getUsuarioLogado();




    
  //   await this.countAllTestesRapidos();
  //   await this.countAllPacientes();
  //   await this.countAllProtocolos();
  
  //   // Render the charts after the data has been loaded
  //   this.renderChart('chart1', 'donut', 'Status de Pacientes', [this.pacientesAtivos, this.pacientesInativos], ['Ativo', 'Inativo']);
  //   this.renderChart('chart2', 'donut', 'Status de Protocolos', [this.protocolosAtivos, this.protocolosInativos], ['Ativo', 'Inativo']);
  //   this.renderChart('chart3', 'donut', 'Tipos de Testes Rápidos', [this.testeRapidoSangue, this.testeRapidoUrina, this.testeRapidoCompleto, this.testeRapidoGenerico], ['Hemograma', 'Urina', 'Completo', 'Genérico']);
  //   // this.renderChart('chartResumo', 'donut', 'Distribuição', [50, 30, 20], ['Ativo', 'Inativo', 'Pendente']);
  // }
  

  /**
   * direto do apexcharts
   * @param elementId id
   * @param chartType qual o tipo do grafico (line, bar, area, donut, etc.)
   * @param seriesName nome
   * @param data dados do grafico
   * @param categories suas categorias
   */
  renderChart(elementId: string, chartType: string, seriesName: string, data: number[], categories: string[]): void {
    const options = {
      chart: {
        type: chartType,
        height: '100%',
      },
      series: data,
      labels: categories,
      title: {
        text: seriesName,
        align: 'center',
      },
      legend: {
        position: 'bottom',
      },
    };

    const chart = new ApexCharts(document.querySelector(`#${elementId}`), options);
    chart.render();
  }

    async countAllTestesRapidos() {
      try {
        this.testeRapidoSangue = await firstValueFrom(this.testeRapidoService.countAllByExameSangue());
        this.testeRapidoUrina = await firstValueFrom(this.testeRapidoService.countAllByExameUrina());
        this.testeRapidoCompleto = await firstValueFrom(this.testeRapidoService.countAllByExameCompleto());
        this.testeRapidoGenerico = await firstValueFrom(this.testeRapidoService.countAllByExameGenerico());
    
        console.log('Data loaded successfully');
      } catch (err) {
        console.error('Error occurred while fetching data:', err);
        this.testeRapidoSangue = 0;
        this.testeRapidoUrina = 0;
        this.testeRapidoCompleto = 0;
        this.testeRapidoGenerico = 0;
      }
    }

    async countAllPacientes() {
      try {
        this.pacientesAtivos = await firstValueFrom(this.pacienteService.countAllPacientesAtivos());
        this.pacientesInativos = await firstValueFrom(this.pacienteService.countAllPacientesInativos())
        console.log('Data loaded successfully');
      } catch (err) {
        console.error('Error occurred while fetching data:', err);
        this.pacientesAtivos = 0;
        this.pacientesInativos = 0;
      }
    }

    async countAllProtocolos(){
      try{
        this.protocolosAtivos = await firstValueFrom(this.protocoloService.countAllProtocolosAtivos());
        this.protocolosInativos = await firstValueFrom(this.protocoloService.countAllProtocolosInativos());
      } catch (err){
        console.error('Error occurred while fetching data:', err);
        this.protocolosAtivos = 0;
        this.protocolosInativos = 0;
      }
    }
    
}
