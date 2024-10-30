import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConsultaOdontologica } from '../models/consulta-odontologica';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaOdontologicaService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/consultaOdontologica";

  constructor() { }

  findAll(): Observable<ConsultaOdontologica[]>{
    return this.http.get<ConsultaOdontologica[]>(this.API+"/findAll");
  }

  save(consultaOdontologica: ConsultaOdontologica):Observable<string>{
    return this.http.post<string>(this.API+'/save', consultaOdontologica, {responseType: 'text' as 'json'})
  }
  update(consultaOdontologica: ConsultaOdontologica):Observable<string>{
    return this.http.put<string>(this.API+'/update/'+consultaOdontologica.id, consultaOdontologica, {responseType: 'text' as 'json'})
  }

  encerrar(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<ConsultaOdontologica>{
    return this.http.get<ConsultaOdontologica>(this.API+"/findById/"+id);
  }

  findAllByPacienteId(id: number): Observable<ConsultaOdontologica[]>{
    return this.http.get<ConsultaOdontologica[]>(this.API+"/findAllByPacienteId/"+id);
  }

}
