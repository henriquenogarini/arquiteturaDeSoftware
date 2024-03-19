class turma extends Aluno{
    constructor(codigo,nota){
        this.codigo = codigo;
        this.nota = nota;
    }
    calcularAprovacao(){
        if(nota >= 6){
            return true;
        }
        else{return false;}
    }
}