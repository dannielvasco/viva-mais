var ditados = document.querySelector('#ditados');
var asterisk = document.querySelector(".ditados span");
var h3 = document.querySelector(".ditados h3");


function sortearDitados() {
    var items = ["A primeira e melhor vitória é conquistar-se a si mesmo",
        "Nós somos o que fazemos repetidamente, a excelência não é um feito, é sim um hábito.",
        "Acredite em si mesmo e tudo será possível.",
        "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
        "A persistência é o caminho do êxito.",
        "Seja a mudança que você deseja ver no mundo.",
        "Acredite em si mesmo e você será imparável.",
        "Cada dia é uma nova oportunidade para brilhar.",
        "Se você pode sonhar, pode realizar.",
        "A persistência leva ao sucesso.",
        "A jornada mais longa começa com um único passo.",
        "Sua determinação é sua maior força."]; //https://www.portalinsights.com.br/perguntas-frequentes/qual-a-melhor-frase-para-status

    var indiceAleatorio = Math.floor(Math.random() * items.length);
    var itemAleatorio = items[indiceAleatorio];

    let info = JSON.parse(localStorage.getItem("info")) || [];
    let nome = localStorage.getItem("nome");

    ditados.innerText = itemAleatorio;

    // if (info.length === 0) {
    //     ditados.innerText = itemAleatorio;
    // } else {
    //     ditados.innerText = "Olá " + `${nome}` + ". " + itemAleatorio;
    // };
}

sortearDitados();

function ditadosTransition() {
    ditados.style.transform = "translateX(200%)";
    ditados.style.transition = "all 2s";
}

ditadosTransition();

function ditadosChange() {
    return sortearDitados();
}

document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll(".sidebar-btn");
    const icone = document.querySelectorAll(".btn-icon");
    const botoesLinks = document.querySelectorAll(".btn-li");

    const iconesOriginais = Array.from(icone).map(icon => icon.textContent.trim());

    botoes.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            const botaoLink = botoesLinks[index];
            const botaoBg = botoes[index];
            const icones = icone[index];

            if (botaoLink.classList.contains('ativo')) {
                botaoLink.classList.remove('ativo');
                botaoBg.classList.remove('selecionado');
                icones.textContent = iconesOriginais[index];
            } else {
                botoes.forEach(btn => btn.classList.remove('ativo'));
                botoesLinks.forEach(link => link.classList.remove('ativo'));
                icone.forEach(icon => icon.textContent = iconesOriginais[Array.from(icone).indexOf(icon)]);

                botaoLink.classList.add('ativo');
                botaoBg.classList.add('selecionado');
                icones.textContent = "close";
            }
        });
    });
});


function calcularIMC(event) {
    event.preventDefault();
    var form = document.querySelector("#form");

    var peso = form.peso.value;
    var altura = form.altura.value.replace(',', '.');
    var imc = (peso / (altura * altura)).toFixed(2);

    var resultadoIMC = document.querySelector("#resultado-imc");
    resultadoIMC.textContent = imc;
}

var data = new Date()
var dataBR = data.toLocaleString('pt-br', { dateStyle: 'short' });
// var dataBR = data.toLocaleString('pt-br', { dateStyle: 'short' }) + ' | ' + "Horas: " + data.toLocaleTimeString(); DATA + HORAS Descartado
var imcData = document.getElementById('imc-data');

var dataHistorico = dataBR; // Eu concerteza não questionei minha insanidade com esse CARVALHO aqui.

function calculaImc(event) {
    event.preventDefault();
    var form = document.querySelector("#calcular-imc");
    var dataBR = new Date().toLocaleString('pt-br', { dateStyle: 'short' });
    var imcData = document.getElementById('imc-data');

    var nome = form.nome.value;
    var idade = form.idade.value;
    var peso = form.peso.value.replace(',', '.');
    var altura = form.altura.value.replace(',', '.');
    var imc = (peso / (altura * altura)).toFixed(2);

    var resultadoIMC = document.querySelector(".resultado-do-imc");
    var resultado = document.querySelector(".resultado");
    var classificacao = document.querySelector(".classificacao-do-imc");
    var resultadoIMCDenovo = document.querySelector(".resultado-denovo");
    resultadoIMC.textContent = imc;
    resultadoIMCDenovo.textContent = "Seu IMC é de: " + imc + "!";


    localStorage.setItem("nome", nome);
    localStorage.setItem("idade", idade);
    localStorage.setItem("altura", altura);
    localStorage.setItem("peso", peso);
    localStorage.setItem("imc", imc);
    localStorage.setItem("imcData", dataBR);


    let imcInfoNovo = document.getElementById('imc-calc-novo').innerText = "Cálculo de IMC: " + imc;
    imcInfoNovo;

    let MostrarNomeNovo = document.getElementById('imc-nome-novo').innerText = "Nome: " + nome;
    let MostrarIdadeNova = document.getElementById('imc-idade-novo').innerText = "Idade: " + idade;
    MostrarNomeNovo;
    MostrarIdadeNova;


    let AlturaNova = document.getElementById('imc-altura-novo').innerText = "Altura: " + altura + " metros";
    let PesoNovo = document.getElementById('imc-peso-novo').innerText = "Peso: " + peso + " kg";
    AlturaNova;
    PesoNovo;


    let imcDataNovo = document.getElementById('imc-data-novo').innerText = "Data: " + dataBR;
    imcDataNovo;



    if (peso == "" || null) {
        resultadoIMC.textContent = "Coloque um valor válido!"
        resultadoIMCDenovo.textContent = "Coloque seu peso"
    } else if (altura == "" || null) {
        resultadoIMC.textContent = "Coloque um valor válido!"
        resultadoIMCDenovo.textContent = "Coloque sua altura"
    }

    // var valorMaximo = 300;

    // if (peso > valorMaximo) {
    //     resultadoIMC.textContent = "Valor máximo ultrapassado"
    //     resultadoIMCDenovo.textContent = "Limite de 300kg"
    // }

    resultado.style.backgroundColor = corBgImc(imc);
    classificacao.textContent = classificacaoImc(imc);
    // classificacao.style.color = classificacaoCor(imc);
    // classificacao.style.borderBottom = classificacaoCorBorda(imc);

    let modificacoes = { nome, idade, peso, altura, imcData, imc, dataHistorico };

    let info = JSON.parse(localStorage.getItem("info")) || [];

    info.push(modificacoes);

    localStorage.setItem("info", JSON.stringify(info));

    info;
}

document.addEventListener('click', () => {
    const altura = document.getElementById('altura');
    const peso = document.getElementById('peso');

    altura.addEventListener('input', () => {
        let valor = altura.value.replace(/\D/g, '');
        if (valor.length > 2) {
            valor = valor.slice(0, -2) + ',' + valor.slice(-2);
        }
        altura.value = valor;
    });

    peso.addEventListener('input', () => {
        let valorPeso = peso.value.replace(/\D/g, '');
        if (valorPeso.length >= 3) {
            valorPeso = valorPeso.slice(0, -1) + ',' + valorPeso.slice(-1);
        }
        peso.value = valorPeso;
    });

    peso.addEventListener('input', function () {
        const numeroVirgula = /^[0-9]*,?[0-9]*$/;
        const mensagemErro = document.querySelector('.mensagemErro');
        const valorPeso = this.value;

        if (!numeroVirgula.test(valorPeso)) {
            mensagemErro.textContent = 'Por favor, insira apenas números e vírgulas.';
            this.value = valorPeso.slice(0, -1);
        } else {
            mensagemErro.textContent = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.input-padrao');

    inputs.forEach(function (foco) {
        foco.addEventListener('focus', function () {
            this.classList.add('focado');
        });

        foco.addEventListener('change', function () {
            this.classList.remove('focado');
        });

        foco.addEventListener('blur', function () {
            this.classList.remove('focado');
        });
    });
});


// var botaoImc = document.querySelector(".enviar"); // Envio Antigo
// botaoImc.addEventListener('click', calculaImc) // Pula a vereficação do formulário, Envio Antigo


function salvarInfo(event) {
    if (!event.target.checkValidity()) {
        event.preventDefault();
        event.target.reportValidity();
        return false;
    }

    calculaImc(event);

    return false;
}

document.querySelector('.enviar').addEventListener('submit', salvarInfo);


function corBgImc(imc) {
    var cor = "";

    if (imc < 16) {
        cor = "purple";
    }
    if (imc > 16 && imc <= 16.9) {
        cor = "red";
    }
    if (imc >= 17 && imc <= 18.5) {
        cor = "#FFB74D";
    }
    if (imc >= 18.5 && imc <= 24.9) {
        cor = "#27CF72";
    }
    if (imc >= 25 && imc <= 29.9) {
        cor = "#F4C430";
    }
    if (imc >= 30 && imc <= 34.9) {
        cor = "#FFB74D";
    }
    if (imc >= 35 && imc <= 39.9) {
        cor = "red";
    }
    if (imc >= 40) {
        cor = "purple";
    }
    return cor;
}

function classificacaoImc(imc) {
    var classificacao = "";

    if (imc < 16) {
        classificacao = "Abaixo do Peso Grau III (Grave)";
    }
    if (imc > 16 && imc <= 16.9) {
        classificacao = "Abaixo do Peso Grau II (Moderado)";
    }
    if (imc >= 17 && imc <= 18.4) {
        classificacao = "Abaixo do Peso Grau I (Leve)"
    }
    if (imc >= 18.5 && imc <= 24.9) {
        classificacao = "Peso Normal"
    }
    if (imc >= 25 && imc <= 29.9) {
        classificacao = "Sobrepeso"
    }
    if (imc >= 30 && imc <= 34.9) {
        classificacao = "Obesidade Grau I"
    }
    if (imc >= 35 && imc <= 39.9) {
        classificacao = "Obesidade Grau II"
    }
    if (imc >= 40) {
        classificacao = "Obesidade Grau III"
    }
    return classificacao;
}

function classificacaoCor(imc) {
    var classificacaoCor = "";

    if (imc < 16) {
        classificacaoCor = "yellow";
    }
    if (imc > 16 && imc <= 16.9) {
        classificacaoCor = "#6A5ACD";
    }
    if (imc >= 17 && imc <= 18.4) {
        classificacaoCor = "green";
    }
    if (imc >= 18.5 && imc <= 24.9) {
        classificacaoCor = "white";
    }
    if (imc >= 25 && imc <= 29.9) {
        classificacaoCor = "red";
    }
    if (imc >= 30 && imc <= 34.9) {
        classificacaoCor = "green";
    }
    if (imc >= 35 && imc <= 39.9) {
        classificacaoCor = "#6A5ACD";
    }
    if (imc >= 40) {
        classificacaoCor = "yellow";
    }
    return classificacaoCor;
}

function classificacaoCorBorda(imc) {
    var classificacaoCorBorda = "";

    if (imc < 16) {
        classificacaoCorBorda = "4px solid yellow";
    }
    if (imc > 16 && imc <= 16.9) {
        classificacaoCorBorda = "4px solid #6A5ACD";
    }
    if (imc >= 17 && imc <= 18.4) {
        classificacaoCorBorda = "4px solid green";
    }
    if (imc >= 18.5 && imc <= 24.9) {
        classificacaoCorBorda = "4px solid white";
    }
    if (imc >= 25 && imc <= 29.9) {
        classificacaoCorBorda = "4px solid red";
    }
    if (imc >= 30 && imc <= 34.9) {
        classificacaoCorBorda = "4px solid green";
    }
    if (imc >= 35 && imc <= 39.9) {
        classificacaoCorBorda = "4px solid #6A5ACD";
    }
    if (imc >= 40) {
        classificacaoCorBorda = "4px solid yellow";
    }
    return classificacaoCorBorda;
}


function carregarInfo() {
    let nome = localStorage.getItem("nome");
    let idade = localStorage.getItem("idade");
    let peso = localStorage.getItem("peso");
    let altura = localStorage.getItem("altura");
    let imc = localStorage.getItem("imc");
    let imcData = localStorage.getItem("imcData");
    if (nome && idade && peso && altura && imc && imcData) {
        document.getElementById("imc-nome").innerText = `Nome: ${nome}`;
        document.getElementById("imc-idade").innerText = `Idade: ${idade}`;
        document.getElementById("imc-peso").innerText = `Peso: ${peso} kg`;
        document.getElementById("imc-altura").innerText = `Altura: ${altura} metros`;
        document.getElementById("imc-calc").innerText = `Último Cálculo de IMC: ${imc}`;
        document.getElementById("imc-data").innerText = `Última Data: ${imcData}`;
    }
}

//carregarInfo();

function carregarConteudo() {
    let info = JSON.parse(localStorage.getItem("info")) || [];

    info;
}

function exibirInfo() {



    let info = JSON.parse(localStorage.getItem("info")) || [];

    let container = document.getElementById("historico-todo");
    container.innerText = "";

    if (info.length === 0) {
        let semDados = document.createElement("div");
        semDados.className = "sem-dados";
        semDados.innerHTML = `Nenhum dado disponível no momento. <br> Preencha os campos do <a
          href="#calcular-imc">formulário acima</a> primeiro <br><br> ༼ つ ◕_◕ ༽つ💚.`;
        container.appendChild(semDados);
    } else {

        info.forEach((modificacoes, index) => {
            let mostrarHistorico = document.createElement("div");
            mostrarHistorico.className = "modificacoes";
            mostrarHistorico.innerText = `Data: ${modificacoes.dataHistorico}`;



            mostrarHistorico.addEventListener("click", () => carregarTodoHistorico(modificacoes));

            let deleteButton = document.createElement("button");
            deleteButton.className = "delete-button material-symbols-outlined bin";
            deleteButton.innerText = "delete_forever";

            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                deletarEntrada(index);
            });

            mostrarHistorico.appendChild(deleteButton);

            container.appendChild(mostrarHistorico);
        });
    }
}

function deletarEntrada(index) {
    let info = JSON.parse(localStorage.getItem("info")) || [];
    info.splice(index, 1);
    localStorage.setItem("info", JSON.stringify(info));
    exibirInfo();
}


function carregarTodoHistorico(modificacoes) {
    var nome = document.querySelector("#imc-nome-all");
    var data = document.querySelector("#imc-data-all");
    var imc = document.querySelector("#imc-calc-all");
    var idade = document.querySelector("#imc-idade-all");
    var peso = document.querySelector("#imc-peso-all");
    var altura = document.querySelector("#imc-altura-all");

    nome.innerText = `Nome: ${modificacoes.nome}`
    idade.innerText = `Idade: ${modificacoes.idade}`
    peso.innerText = `Peso: ${modificacoes.peso} kg`
    altura.innerText = `Altura: ${modificacoes.altura} metros`
    data.innerText = `Data: ${modificacoes.dataHistorico}`
    imc.innerText = `Cálculo de IMC: ${modificacoes.imc}`
}

function toggleHistorico() {
    let historicoDiv = document.getElementById("historico-todo");


    if (historicoDiv.style.display === "none" || historicoDiv.style.display === "") {
        historicoDiv.style.display = "block";
    } else {
        historicoDiv.style.display = "none";
    }

}

function toggleVisivel() {
    let titulo = document.querySelector("#historico-ultimo");
    let historicoDiv = document.getElementById("historico-todo");

    if (historicoDiv.style.display === "none" || historicoDiv.style.display === "") {
        titulo.style.visibility = "visible";
    } else {
        titulo.style.visibility = "hidden";
    }
}

let toggleButton = document.querySelector(".button");
toggleButton.addEventListener("click", toggleHistorico);
toggleButton.addEventListener("click", toggleVisivel);


window.onload = function () {
    carregarConteudo();
    carregarInfo();
};