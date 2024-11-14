import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { Usuario } from '../../auth/usuario';
import ApexCharts from 'apexcharts'
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit{
  dataAtual: Date = new Date();
  usuario!: Usuario;

  loginService = inject(LoginService);


  constructor(){
    this.usuario = this.loginService.getUsuarioLogado();
  }

  ngAfterViewInit(): void {
    this.chart();  
  }

  chart(){
  var options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();

  }
}
