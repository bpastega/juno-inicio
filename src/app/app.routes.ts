import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { PacientesListComponent } from './components/pacientes/pacientes-list/pacientes-list.component';
import { PacientesFormComponent } from './components/pacientes/pacientes-form/pacientes-form.component';

export const routes: Routes = [
	/*Dentro da vídeoaula 'Curso - Spring Boot e Angular | 11 - Angular 17: Layout com Material Design PARTE 1 (front-end)' 
	a barra fixa se refere à navbar superior. No nosso caso, optamos por trabalhar com uma barra lateral.*/ 
    
	
	{path:"", redirectTo:"login", pathMatch:'full'},
	{path:"login", component: LoginComponent}, //não terá menu embutido

	{path: "admin", component:PrincipalComponent, children: [ //todos os paths incluídos aqui terão o menu fixo embutido
		{path:"pacientes", component:PacientesListComponent},
		{path:"pacientes/cadastrar", component:PacientesFormComponent},
		{path:"pacientes/editar/:id", component:PacientesFormComponent},
		
	]}
];
