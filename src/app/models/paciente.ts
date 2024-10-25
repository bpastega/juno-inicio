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

    statusPreNatal!: boolean; /*TODO: potencialmente alterar para que o default seja false, fazendo com que o pré natal seja 
    inicializado com esse status até que seja determinado o contrário.*/
    endereco!: Endereco;
    protocolos!: Protocolo[];

   /*constructor(id:number, nome:string, cpf:string, email:string, dataNascimento:Date, tipoSanguineo:string){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.tipoSanguineo = tipoSanguineo;
    }*/
}
