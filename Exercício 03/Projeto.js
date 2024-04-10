//Nome: Henrique Cesar Nogarini de Carvalho
// RA: 2102374

// Definição da classe Contato, com criação do constructor
class Contato {
    constructor(nome, telefone, email) {
      this.nome = nome;
      this.telefone = telefone;
      this.email = email;
    }
  }
  
  // Implementação do padrão Singleton
  // O Singleton foi utilizado para prover que todos os componentes da aplicação manipulem a mesma lista de contatos 
  // não havendo inconsistências.
  class GerenciadorContatos {
    constructor() {
      if (!GerenciadorContatos.instance) {
        this.contatos = [];
        GerenciadorContatos.instance = this;
      }
      return GerenciadorContatos.instance;
    }
  
    adicionarContato(contato) {
      this.contatos.push(contato);
      this.notificar();
    }
  
    removerContato(contato) {
      const index = this.contatos.findIndex(c => c === contato);
      if (index !== -1) {
        this.contatos.splice(index, 1);
        this.notificar();
      }
    }
  
    listarContatos() {
      return this.contatos;
    }
  
    notificar() {
      ContatoObserver.update(this.contatos);
    }
  }
  
  // Implementação do padrão Strategy
  // Este padrão permite que o algoritmo seja encapsulado em diferentes classes, permitindo assim uma
  // substituição mais fácil, sem alterar o código cliente , fazendo isso de forma modular.
  class BuscaContatos {
    constructor() {
      this.strategy = null;
    }
  
    setStrategy(strategy) {
      this.strategy = strategy;
    }
  
    buscar(contatos, termo) {
      if (!this.strategy) {
        throw new Error("Estratégia de busca não definida.");
      }
      return this.strategy.buscar(contatos, termo);
    }
  }
  
  // Buscas
  class BuscaPorNome {
    buscar(contatos, termo) {
      return contatos.filter(contato => contato.nome.toLowerCase().includes(termo.toLowerCase()));
    }
  }
  
  class BuscaPorTelefone {
    buscar(contatos, termo) {
      return contatos.filter(contato => contato.telefone.includes(termo));
    }
  }
  
  class BuscaPorEmail {
    buscar(contatos, termo) {
      return contatos.filter(contato => contato.email.includes(termo));
    }
  }
  
  // Implementação do padrão Observer
  // O padrão Observer foi escolhido para notificar a interface automaticamente em caso de alteração
  // no estado do outro objeto.
  class ContatoObserver {
    static update(contatos) {
      console.log("Contatos atualizados:", contatos);
    }
  }
  
  // Interface para interação do sistema
  const gerenciador = new GerenciadorContatos();
  const buscaContatos = new BuscaContatos();
  
  gerenciador.adicionarContato(new Contato("Henrique", "17997122517", "henrique@email.com"));
  gerenciador.adicionarContato(new Contato("Marcos", "43996344736", "marcos@gmail.com"));
  
  console.log("Contatos:", gerenciador.listarContatos());
  
  const termoBusca = "Henrique";
  buscaContatos.setStrategy(new BuscaPorNome());
  const resultadosBusca = buscaContatos.buscar(gerenciador.listarContatos(), termoBusca);
  console.log(`Resultado da busca por "${termoBusca}":`, resultadosBusca);