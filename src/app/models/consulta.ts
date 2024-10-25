import { Paciente } from "./paciente";
import { Protocolo } from "./protocolo";

export class Consulta {
    id!: number;
    dataConsulta!: Date;
    paciente!: Paciente;
    protocolo!: Protocolo;
    descricao!: string;
    
}
