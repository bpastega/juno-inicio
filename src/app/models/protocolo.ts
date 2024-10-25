import { ConsultaOdontologica } from "./consulta-odontologica";
import { Paciente } from "./paciente";
import { TesteRapido } from "./teste-rapido";

export class Protocolo {
    id!: number;
    paciente!: Paciente;
    testesRapidos: TesteRapido[] = [];
    consultasOdontologica: ConsultaOdontologica[] = [];
    dataAbertura!: Date;
    aberturaAprovada!: boolean;
    dataEncerramento!: Date;
    statusProtocolo!: boolean;
    dum!: Date;
    dpp!: Date;
}
