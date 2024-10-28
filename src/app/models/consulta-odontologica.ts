import { Protocolo } from "./protocolo";

export class ConsultaOdontologica {
    id!: number;
    dataAtendimento!: Date;
    descricao!: string;
    protocoloPreNatal!: Protocolo;
}
