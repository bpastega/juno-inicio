import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/paciente";


  constructor() { 
    
  }

  findAll(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.API+"/findAll");
  }

  save(paciente: Paciente):Observable<string>{
    return this.http.post<string>(this.API+'/save', paciente, {responseType: 'text' as 'json'})
  }
  update(paciente: Paciente):Observable<string>{
    return this.http.put<string>(this.API+'/update',paciente.id,  {responseType: 'text' as 'json'})
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Paciente>{
    return this.http.get<Paciente>(this.API+"/findById/"+id);
  }
    // FILTROS ADICIONADOS

  findByNome(nome: string): Observable<Paciente[]> {
      return this.http.get<Paciente[]>(this.API + "/findByNome/" + nome);
    }
  
  findByCidade(cidade: string): Observable<Paciente[]> {
      return this.http.get<Paciente[]>(this.API + "/findByCidade/" + cidade);
    }
  
}
