import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { Usuario } from '../../auth/usuario';
import ApexCharts from 'apexcharts';
import { LoginService } from '../../auth/login.service';

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

  loginService = inject(LoginService);

  constructor() {
    this.usuario = this.loginService.getUsuarioLogado();
  }

  ngAfterViewInit(): void {
    // renderiza os graficos
    this.renderChart('chart1', 'donut', 'Consultas Odontológicas', [50, 20, 30], ['Inativo', 'Ativo', 'Pendente']);
    this.renderChart('chart2', 'donut', 'Pré-natal', [25, 50, 25], ['Inativo', 'Ativo', 'Pendente']);
    this.renderChart('chart3', 'donut', 'Testes Rápidos', [20, 30, 50], ['Inativo', 'Ativo', 'Pendente']);
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
}
