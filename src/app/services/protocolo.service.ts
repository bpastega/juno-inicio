import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Protocolo } from '../models/protocolo';

@Injectable({
  providedIn: 'root'
})
export class ProtocoloService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/protocolo";

  constructor() { }

  findAll(): Observable<Protocolo[]>{
    return this.http.get<Protocolo[]>(this.API+"/findAll");
  }

  save(protocolo: Protocolo):Observable<string>{
    return this.http.post<string>(this.API+'/save', protocolo, {responseType: 'text' as 'json'})
  }
  update(protocolo: Protocolo):Observable<string>{
    return this.http.put<string>(this.API+'/update',protocolo.id,  {responseType: 'text' as 'json'})
  }

  encerrar(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/encerrar/"+id, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Protocolo>{
    return this.http.get<Protocolo>(this.API+"/findById/"+id);
  }

   // FILTROS ADICIONADOS

   findByPacienteNome(nome: string): Observable<Protocolo[]> {
    return this.http.get<Protocolo[]>(this.API + "/findByPacienteNome/" + nome);
  }

  findByAtivo(): Observable<Protocolo[]> {
    return this.http.get<Protocolo[]>(this.API + "/findByAtivo");
  }

  findByInativo(): Observable<Protocolo[]> {
    return this.http.get<Protocolo[]>(this.API + "/findByInativo");
  }

  findAtivoByIdPaciente(idPaciente: number): Observable<Protocolo>{
    return this.http.get<Protocolo>(this.API+"/findAtivoByIdPaciente/"+idPaciente);
  }

  /*Dashboard*/
  countAllProtocolosAtivos(): Observable<number>{
    return this.http.get<number>(this.API+'/countAllProtocolosAtivos');
  }

  countAllProtocolosInativos(): Observable<number>{
    return this.http.get<number>(this.API+'/countAllProtocolosInativos');
  }

}
