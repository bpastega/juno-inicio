import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { Usuario } from '../../auth/usuario';
import ApexCharts from 'apexcharts';
import { LoginService } from '../../auth/login.service';
import { TesteRapidoService } from '../../services/teste-rapido.service';
import { firstValueFrom, forkJoin, lastValueFrom } from 'rxjs';

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

  loginService = inject(LoginService);
  testeRapidoService = inject(TesteRapidoService);

  constructor() {
    this.usuario = this.loginService.getUsuarioLogado();
    
  }

  async ngAfterViewInit(): Promise<void> {
    // Wait for the data to be loaded before proceeding
    this.usuario = this.loginService.getUsuarioLogado();
    await this.countAllTestesRapidos();
  
    // Render the charts after the data has been loaded
    this.renderChart('chart1', 'donut', 'Consultas Odontológicas', [50, 20, 30], ['Inativo', 'Ativo', 'Pendente']);
    this.renderChart('chart2', 'donut', 'Pré-natal', [25, 50, 25], ['Inativo', 'Ativo', 'Pendente']);
    this.renderChart('chart3', 'donut', 'Testes Rápidos', [this.testeRapidoSangue, this.testeRapidoUrina, this.testeRapidoCompleto, this.testeRapidoGenerico], ['Hemograma', 'Urina', 'Completo', 'Genérico']);
    // this.renderChart('chartResumo', 'donut', 'Distribuição', [50, 30, 20], ['Ativo', 'Inativo', 'Pendente']);
  }
  

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
    
}
