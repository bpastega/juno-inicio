import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { PacientesListComponent } from './components/pacientes/pacientes-list/pacientes-list.component';
import { PacientesFormComponent } from './components/pacientes/pacientes-form/pacientes-form.component';
import { ProtocosListComponent } from './components/protocolos/protocos-list/protocolos-list.component';
import { PacienteInfoComponent } from './components/pacientes/paciente-info/paciente-info.component';
import { ConsultasListComponent } from './components/consultas/consultas-list/consultas-list.component';
import { ExamesComponent } from './components/exames/exames.component';
import { TestesListComponent } from './components/testes/testes-list/testes-list.component';
import { ConsultasOdontologicasListComponent } from './components/consultasOdontologicas/consultas-odontologicas-list/consultas-odontologicas-list.component';
import { ProtocoloInfoComponent } from './components/protocolos/protocolo-info/protocolo-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
	/*Dentro da vídeoaula 'Curso - Spring Boot e Angular | 11 - Angular 17: Layout com Material Design PARTE 1 (front-end)' 
	a barra fixa se refere à navbar superior. No nosso caso, optamos por trabalhar com uma barra lateral.*/ 
    
	
	{path:"", redirectTo:"login", pathMatch:'full'},
	{path:"login", component: LoginComponent}, //não terá menu embutido

	{path: "admin", component:PrincipalComponent, children: [ //todos os paths incluídos aqui terão o menu fixo embutido
		{path: "dashboard", component: DashboardComponent},
		{path:"pacientes", component:PacientesListComponent},
		{path:"pacientes/info/:id", component: PacienteInfoComponent},
		{path:"pacientes/cadastrar", component:PacientesFormComponent}, 
		{path:"pacientes/editar/:id", component:PacientesFormComponent},


		{path:"protocolos", component: ProtocosListComponent}, //para visualizar os protocolos
		{path:"protocolos/info/:id", component: ProtocoloInfoComponent},

		{path:"consultas", component:ConsultasListComponent},

		{path: "exames", component:ExamesComponent}, //temporariamente não usaremos, mas o objetivo final é eliminar as 2 rotas abaixo por meio deste
			{path: "odonto", component:ConsultasOdontologicasListComponent},
			{path: "testes", component:TestesListComponent}

		
	]}
];
