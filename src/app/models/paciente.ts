import { Consulta } from "./consulta";
import { Endereco } from "./endereco";
import { Protocolo } from "./protocolo";

export class Paciente {
    id!: number;
    nome!: string;
    cpf!: string;
    email!: string; 
    // TypeScript Date Object: https://www.javatpoint.com/typescript-date-object
    dataNascimento!: Date;
    tipoSanguineo!: string;

    statusPreNatal: boolean = false; /*TODO: potencialmente alterar para que o default seja false, fazendo com que o pré natal seja 
    inicializado com esse status até que seja determinado o contrário.*/

    telefone!: string;
    endereco!: Endereco;
    protocolos!: Protocolo[];

    //após alteração no back
    consultas!: Consulta[];

   constructor(endereco:Endereco){
        this.endereco=endereco;
    }
}
