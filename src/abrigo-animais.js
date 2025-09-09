class AbrigoAnimais {

  static ANIMAIS = {
    'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
    'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
    'Fofo': { tipo: 'cão', brinquedos: ['BOLA', 'RATO', 'LASER'] },
    'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
    'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
    'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
    'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
  };

  static BRINQUEDOS_VALIDOS = new Set([
    'RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'
  ]);

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = this._processarBrinquedos(brinquedosPessoa1);
    const brinquedos2 = this._processarBrinquedos(brinquedosPessoa2);
    const animaisParaAdocao = this._processarAnimais(ordemAnimais);

    const validacao = this._validarEntradas(animaisParaAdocao, brinquedos1, brinquedos2);
    if (validacao.erro) {
      return validacao;
    }

    const adocaoContagem = { 'pessoa 1': 0, 'pessoa 2': 0 };
    const resultados = [];

    for (const animal of animaisParaAdocao) {
      const aptoPessoa1 = this._verificarAptidao(
        animal.nome,
        brinquedos1,
        adocaoContagem['pessoa 1'],
        adocaoContagem['pessoa 2'] > 0
      );

      const aptoPessoa2 = this._verificarAptidao(
        animal.nome,
        brinquedos2,
        adocaoContagem['pessoa 2'],
        adocaoContagem['pessoa 1'] > 0
      );

      if (aptoPessoa1 && aptoPessoa2) {
        resultados.push(`${animal.nome} - abrigo`);
      } else if (aptoPessoa1) {
        resultados.push(`${animal.nome} - pessoa 1`);
        adocaoContagem['pessoa 1']++;
      } else if (aptoPessoa2) {
        resultados.push(`${animal.nome} - pessoa 2`);
        adocaoContagem['pessoa 2']++;
      } else {
        resultados.push(`${animal.nome} - abrigo`);
      }
    }

    resultados.sort();
    return { lista: resultados };
  }

  // --- Métodos Privados de Lógica e Validação ---

  _processarBrinquedos(brinquedosString) {
    return brinquedosString.split(',').map(b => b.trim().toUpperCase());
  }

  _processarAnimais(animaisString) {
    const nomes = animaisString.split(',').map(n => n.trim());
    const animais = [];
    for (const nome of nomes) {
      const animalData = AbrigoAnimais.ANIMAIS[nome];
      if (animalData) {
        animais.push({ nome, ...animalData });
      } else {
        animais.push({ nome });
      }
    }
    return animais;
  }

  _validarEntradas(animais, brinquedos1, brinquedos2) {
    const animaisValidos = new Set(Object.keys(AbrigoAnimais.ANIMAIS));
    const animaisUnicos = new Set();
    
    for (const animal of animais) {
      if (!animaisValidos.has(animal.nome)) return { erro: 'Animal inválido' };
      if (animaisUnicos.has(animal.nome)) return { erro: 'Animal inválido' };
      animaisUnicos.add(animal.nome);
    }
    
    const validarBrinquedos = (brinquedos) => {
      const brinquedosUnicos = new Set();
      for (const brinquedo of brinquedos) {
        if (!AbrigoAnimais.BRINQUEDOS_VALIDOS.has(brinquedo)) return { erro: 'Brinquedo inválido' };
        if (brinquedosUnicos.has(brinquedo)) return { erro: 'Brinquedo inválido' };
        brinquedosUnicos.add(brinquedo);
      }
      return {};
    };

    let resultado = validarBrinquedos(brinquedos1);
    if (resultado.erro) return resultado;
    resultado = validarBrinquedos(brinquedos2);
    if (resultado.erro) return resultado;
    
    return {};
  }

  _verificarAptidao(nomeAnimal, brinquedosPessoa, adocaoAtual, outraAdocaoExistente) {
    if (adocaoAtual >= 3) return false;

    const animalData = AbrigoAnimais.ANIMAIS[nomeAnimal];
    if (!animalData) return false;

    if (animalData.tipo === 'gato') {
      return this._aptidaoGato(animalData.brinquedos, brinquedosPessoa);
    }
    if (nomeAnimal === 'Loco') {
      return this._aptidaoLoco(animalData.brinquedos, brinquedosPessoa, outraAdocaoExistente);
    }
    return this._aptidaoPadrao(animalData.brinquedos, brinquedosPessoa);
  }

  _aptidaoGato(brinquedosGato, brinquedosPessoa) {
    if (brinquedosGato.length !== brinquedosPessoa.length) return false;
    return brinquedosGato.every((brinquedo, index) => brinquedo === brinquedosPessoa[index]);
  }

  _aptidaoLoco(brinquedosLoco, brinquedosPessoa, outraAdocaoExistente) {
    if (!outraAdocaoExistente) return false;
    const brinquedosPessoaSet = new Set(brinquedosPessoa);
    return brinquedosLoco.every(brinquedo => brinquedosPessoaSet.has(brinquedo));
  }

  _aptidaoPadrao(brinquedosAnimal, brinquedosPessoa) {
    let indiceAnimal = 0;
    for (const brinquedoPessoa of brinquedosPessoa) {
      if (indiceAnimal < brinquedosAnimal.length && brinquedoPessoa === brinquedosAnimal[indiceAnimal]) {
        indiceAnimal++;
      }
    }
    return indiceAnimal === brinquedosAnimal.length;
  }
}

export { AbrigoAnimais as AbrigoAnimais };