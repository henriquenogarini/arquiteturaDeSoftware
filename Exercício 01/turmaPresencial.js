class turmaPresencial extends turma{

    constructor(codigo, nota, frequencia){
        super(codigo,nota);
        this.frequencia = frequencia;
    }

    calcularAprovacao(){
        if(frequencia > 75){
            return true;
        }
        else{return false;}
    }
}
