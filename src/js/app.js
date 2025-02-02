// regex para validação
const regexTexto = /^[a-zA-Z\s]*$/;
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexTelefone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const regexDigito = /^\d+$/;

const formularioPrincipal = document.getElementById('cv-form');
const tipoValido = {
    TEXTO: 'texto',
    TEXTO_EMP: 'texto_emp',
    EMAIL: 'email',
    DIGITO: 'digito',
    TELEFONE: 'telefone',
    QUALQUER: 'qualquer',
}

let primeiroNomeElem = formularioPrincipal.primeiroNome,
    nomeDoMeioElem = formularioPrincipal.nomeDoMeio,
    ultimoNomeElem = formularioPrincipal.ultimoNome,
    imagemElem = formularioPrincipal.imagem,
    cargoElem = formularioPrincipal.cargo,
    enderecoElem = formularioPrincipal.endereco,
    emailElem = formularioPrincipal.email,
    telefoneElem = formularioPrincipal.telefone,
    resumoElem = formularioPrincipal.resumo;

let nomeDsp = document.getElementById('nomeCompleto_dsp'),
    imagemDsp = document.getElementById('imagem_dsp'),
    telefoneDsp = document.getElementById('telefone_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    enderecoDsp = document.getElementById('endereco_dsp'),
    cargoDsp = document.getElementById('cargo_dsp'),
    resumoDsp = document.getElementById('resumo_dsp'),
    projetosDsp = document.getElementById('projetos_dsp'),
    conquistasDsp = document.getElementById('conquistas_dsp'),
    habilidadesDsp = document.getElementById('habilidades_dsp'),
    educacoesDsp = document.getElementById('educacao_dsp'),
    experienciasDsp = document.getElementById('experiencias_dsp');

const obterValores = (atributos, ...listasDeNodos) => {
    let contagemAtributos = listasDeNodos.length;
    let contagemDados = listasDeNodos[0].length;
    let arrTempDados = [];

    // o primeiro loop lida com o número de repetidores
    for(let i = 0; i < contagemDados; i++){
        let objDados = {};  //Objeto para os dados

        for(let j = 0; j < contagemAtributos; j++){

            objDados[`${atributos[j]}`] = listasDeNodos[j][i].value;
        }
        arrTempDados.push(objDados);
    }

    return arrTempDados;
}

const obterEntradasUsuario = () => {


    let conquistasTituloElem = document.querySelectorAll('.conquista_titulo'),
    conquistasDescricaoElem = document.querySelectorAll('.conquista_descricao');


    let expTituloElem = document.querySelectorAll('.exp_titulo'),
    expOrganizacaoElem = document.querySelectorAll('.exp_empresa'),
    expLocalizacaoElem = document.querySelectorAll('.exp_local'),
    expDataInicioElem = document.querySelectorAll('.exp_inicio'),
    expDataFimElem = document.querySelectorAll('.exp_fim'),
    expDescricaoElem = document.querySelectorAll('.exp_descricao');


    let eduEscolaElem = document.querySelectorAll('.escola_educacao'),
    eduGrauElem = document.querySelectorAll('.grau_educacao'),
    eduCidadeElem = document.querySelectorAll('.educacao_cidade'),
    eduDataInicioElem = document.querySelectorAll('.educacao_inicio'),
    eduDataFormaturaElem = document.querySelectorAll('.educacao_fim'),
    eduDescricaoElem = document.querySelectorAll('.educacao_descricao');

    let projTituloElem = document.querySelectorAll('.projeto_nome'),
    projLinkElem = document.querySelectorAll('.projeto_link'),
    projDescricaoElem = document.querySelectorAll('.projeto_descricao');

    let habilidadeElem = document.querySelectorAll('.habilidades');


    primeiroNomeElem.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.TEXTO, 'Primeiro Nome'));
    nomeDoMeioElem.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.TEXTO_EMP, 'Nome do Meio'));
    ultimoNomeElem.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.TEXTO, 'Último Nome'));
    telefoneElem.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.TELEFONE, 'Número de Telefone'));
    enderecoElem.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Endereço'));
    emailElem.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.EMAIL, 'Email'));
    cargoElem.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.TEXTO, 'Cargo'));

    conquistasTituloElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Título')));
    conquistasDescricaoElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Descrição')));
    expTituloElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Título')));
    expOrganizacaoElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Organização')));
    expLocalizacaoElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Localização')));
    expDataInicioElem.forEach(item => item.addEventListener('blur', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Data de Início')));
    expDataFimElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Data de Fim')));
    expDescricaoElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Descrição')));
    eduEscolaElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Escola')));
    eduGrauElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Grau')));
    eduCidadeElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Cidade')));
    eduDataInicioElem.forEach(item => item.addEventListener('blur', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Data de Início')));
    eduDataFormaturaElem.forEach(item => item.addEventListener('blur', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Data de Formatura')));
    eduDescricaoElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Descrição')));
    projTituloElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Título')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Link')));
    projDescricaoElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Descrição')));
    habilidadeElem.forEach(item => item.addEventListener('keyup', (e) => validarDadosFormulario(e.target, tipoValido.QUALQUER, 'Habilidade')));

    return {
        primeiroNome: primeiroNomeElem.value,
        nomeDoMeio: nomeDoMeioElem.value,
        ultimoNome: ultimoNomeElem.value,
        cargo: cargoElem.value,
        endereco: enderecoElem.value,
        email: emailElem.value,
        telefone: telefoneElem.value,
        resumo: resumoElem.value,
        conquistas: obterValores(['conquista_titulo', 'conquista_descricao'], conquistasTituloElem, conquistasDescricaoElem),
        experiencias: obterValores(['exp_titulo', 'exp_titulo', 'exp_local', 'exp_inicio', 'exp_fim', 'exp_descricao'], expTituloElem, expOrganizacaoElem, expLocalizacaoElem, expDataInicioElem, expDataFimElem, expDescricaoElem),
        educacoes: obterValores(['escola_educacao', 'grau_educacao', 'educacao_cidade', 'educacao_inicio', 'educacao_fim', 'educacao_descricao'], eduEscolaElem, eduGrauElem, eduCidadeElem, eduDataInicioElem, eduDataFormaturaElem, eduDescricaoElem),
        projetos: obterValores(['projeto_nome', 'projeto_link', 'projeto_descricao'], projTituloElem, projLinkElem, projDescricaoElem),
        habilidades: obterValores(['habilidades'], habilidadeElem)
    }
};

function validarDadosFormulario(elem, tipoElem, nomeElem){
    if(tipoElem == tipoValido.TEXTO){
        if(!regexTexto.test(elem.value) || elem.value.trim().length == 0) adicionarErro(elem, nomeElem);
        else removerErro(elem);
    }

    if(tipoElem == tipoValido.TEXTO_EMP){
        if(!regexTexto.test(elem.value)) adicionarErro(elem, nomeElem);
        else removerErro(elem);
    }

    if(tipoElem == tipoValido.EMAIL){
        if(!regexEmail.test(elem.value) || elem.value.trim().length == 0) adicionarErro(elem, nomeElem);
        else removerErro(elem);
    }

    if(tipoElem == tipoValido.TELEFONE){
        if(!regexTelefone.test(elem.value) || elem.value.trim().length == 0) adicionarErro(elem, nomeElem);
        else removerErro(elem);
    }

    if(tipoElem == tipoValido.QUALQUER){
        if(elem.value.trim().length == 0) adicionarErro(elem, nomeElem);
        else removerErro(elem);
    }
}

function adicionarErro(formElem, formElemNome){
    formElem.nextElementSibling.innerHTML = `${formElemNome} é inválido`;
}

function removerErro(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

const mostrarDadosLista = (dadosLista, containerLista) => {
    containerLista.innerHTML = "";
    dadosLista.forEach(itemLista => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for(const chave in itemLista){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${itemLista[chave]}`;
            subItemElem.style.marginRight = "10px";
            itemElem.appendChild(subItemElem);
        }

        containerLista.appendChild(itemElem);
    })
}

const mostrarCV = (dadosUsuario) => {
    nomeDsp.innerHTML = dadosUsuario.primeiroNome + " " + dadosUsuario.nomeDoMeio + " " + dadosUsuario.ultimoNome;
    telefoneDsp.innerHTML = dadosUsuario.telefone;
    enderecoDsp.innerHTML = dadosUsuario.endereco;
    emailDsp.innerHTML = dadosUsuario.email;
    cargoDsp.innerHTML = dadosUsuario.cargo;
    resumoDsp.innerHTML = dadosUsuario.resumo;
    mostrarDadosLista(dadosUsuario.projetos, projetosDsp);
    mostrarDadosLista(dadosUsuario.conquistas, conquistasDsp);
    mostrarDadosLista(dadosUsuario.habilidades, habilidadesDsp);
    mostrarDadosLista(dadosUsuario.educacoes, educacoesDsp);
    mostrarDadosLista(dadosUsuario.experiencias, experienciasDsp);
}


const gerarCV = () => {
    let dadosUsuario = obterEntradasUsuario();
    mostrarCV(dadosUsuario);
    console.log(dadosUsuario);
}

function visualizarImagem(){
    let oLeitor = new FileReader();
    oLeitor.readAsDataURL(imagemElem.files[0]);
    oLeitor.onload = function(eventoLeitura){
        imagemDsp.src = eventoLeitura.target.result;
    }
}


function BaixarCV(){
    window.print();
}
