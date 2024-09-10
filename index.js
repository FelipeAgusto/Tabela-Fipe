import { buscarTipoVeiculo, buscarMarcaVeiculo, buscarAnoVeiculo, buscarInfoVeiculo } from "./sistema.js";

// busca o conteúdo do localStorage
let historico = JSON.parse(localStorage.getItem('historico')) || [];

async function buscarDados(tipoDado) {
    const marcaVeiculo = document.getElementById('marcaVeiculo').value;
    const tipoVeiculo = document.getElementById('tipoVeiculo').value;
    const modeloVeiculo = document.getElementById('modeloVeiculo').value;
    const anoVeiculo = document.getElementById('anoVeiculo').value;

    if (tipoDado === 'tipo') {
        if (tipoVeiculo != "") {
            const tipoVeiculoResposta = await buscarTipoVeiculo(tipoVeiculo);
            if (tipoVeiculoResposta) {
                selecionarOpcao('marcaVeiculo', tipoVeiculoResposta);
            }
        } else {
            selecionarOpcao('marcaVeiculo', "");
        }
    }
    if (tipoDado === 'marca') {
        if (marcaVeiculo != "") {
            const marcaVeiculoResposta = await buscarMarcaVeiculo(tipoVeiculo, marcaVeiculo);
            if (marcaVeiculoResposta) {
                selecionarOpcao('modeloVeiculo', marcaVeiculoResposta)
            }
        } else {
            selecionarOpcao('modeloVeiculo', "");
            selecionarOpcao('anoVeiculo', "");
        }

    }
    if (tipoDado === 'ano') {
        if (modeloVeiculo != "") {
            const modeloVeiculoResposta = await buscarAnoVeiculo(tipoVeiculo, marcaVeiculo, modeloVeiculo);
            if (modeloVeiculoResposta) {
                selecionarOpcao('anoVeiculo', modeloVeiculoResposta);
            }
        } else {
            selecionarOpcao('anoVeiculo', "");
        }
    }
}


//buscar o tipo de veículo.
const selectTipo = document.getElementById('tipoVeiculo');
selectTipo.addEventListener('change', () => {
    buscarDados('tipo');
});

//buscar a marca do veículo.
const selectMarca = document.getElementById('marcaVeiculo');
selectMarca.addEventListener('change', () => {
    buscarDados('marca');
});

//buscar o ano do veículo.
const selectModelo = document.getElementById('modeloVeiculo');
selectModelo.addEventListener('change', () => {
    buscarDados('ano');
});


// Função para preencher um elemento select com as opções fornecidas
function selecionarOpcao(id, opcoes) {
    const selecionar = document.getElementById(id);
    if (opcoes != "") {
        selecionar.innerHTML = '<option value="">-- Escolha --</option>'; // Adiciona uma opção padrão para instruir o usuário
        opcoes.forEach(option => {
            const opt = document.createElement('option'); // Cria um novo elemento option
            opt.value = option.code; // Define o valor da opção
            opt.textContent = option.name; // Define o texto da opção
            selecionar.appendChild(opt); // Adiciona a opção ao elemento select
        })
    } else {
        selecionar.innerHTML = '<option value="">-- Escolha --</option>';
    }
}


// Adiciona um evento que será acionado quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM que serão usados nas interações do formulário
    const tipoVeiculo = document.getElementById('tipoVeiculo');
    const detalhesVeiculo = document.getElementById('detalhesVeiculo');
    const marcaVeiculo = document.getElementById('marcaVeiculo');
    const modeloVeiculo = document.getElementById('modeloVeiculo');
    const anoVeiculo = document.getElementById('anoVeiculo');
    const resultado = document.getElementById('resultado');
    const btnConsultar = document.getElementById('consultar');
    const infoVeiculo = document.getElementById('infoVeiculo');
    const btnNovaPesquisa = document.getElementById('novaPesquisa');
    const favoritos = document.getElementById('favoritos');
    const guardarFavoritos = document.getElementById('guardarFavoritos');


    // Adiciona um evento que será acionado quando o valor do tipo de veículo mudar
    tipoVeiculo.addEventListener('change', () => {
        const selecionarTipo = tipoVeiculo.value;

        // Se um tipo de veículo for selecionado, mostra a seção de detalhes e preenche as opções de marca e ano
        if (selecionarTipo) {
            detalhesVeiculo.classList.remove('hidden');
        } else {
            // Caso contrário, oculta a seção de detalhes e o resultado
            detalhesVeiculo.classList.add('hidden');
            resultado.classList.add('hidden');
        }
    });

    // Adiciona um evento que será acionado quando o botão de consultar for clicado
    btnConsultar.addEventListener('click', async () => {

        const tipo = tipoVeiculo.value;
        const marca = marcaVeiculo.value;
        const modelo = modeloVeiculo.value;
        const ano = anoVeiculo.value;
        console.log(tipo, marca, modelo, ano)
        const infoRecebida = await buscarInfoVeiculo(tipo, marca, modelo, ano);

        // Verifica se todos os campos estão preenchidos
        if (tipo && marca && modelo && ano) {
            // Exibe uma mensagem com as informações selecionadas
            infoVeiculo.textContent = `Mês de referência ${infoRecebida.referenceMonth},
                                       Marca ${infoRecebida.brand},
                                       Modelo ${infoRecebida.model}, 
                                       Ano ${infoRecebida.modelYear},
                                       Valor ${infoRecebida.price}.`;
            resultado.classList.remove('hidden'); // Mostra o resultado
        } else {
            // Exibe uma mensagem de erro se algum campo estiver vazio
            infoVeiculo.textContent = 'Por favor, preencha todos os campos.';
            resultado.classList.remove('hidden'); // Mostra o resultado mesmo em caso de erro
        }

        //Se o historico estiver cheio ()
        if (historico.length == 3) {
            historico.splice(0, 1);
        }

        const historicoObjeto = { model: infoRecebida.model, modelYear: infoRecebida.modelYear, tipo: tipo, marca: marca, modelo: modelo, ano: ano };
        historico.push(historicoObjeto);
        const historicoJson = JSON.stringify(historico);
        localStorage.setItem("historico", historicoJson);
        atualizarHistorico();
    });

    //adiconando textos ao histórico.
    function atualizarHistorico() {
        if (historico.length > 0) {
            let conteudo = ""
            const localInfo = JSON.parse(localStorage.getItem('historico'));
            const listaHistorico = document.getElementById("listaHistorico");
            listaHistorico.innerHTML = "";
            localInfo.forEach(element => {
                const texto = `<li id="historico1"><spam class="historico" data-tipo=${element.tipo} data-codmarca=${element.marca} data-codmodelo=${element.modelo} data-codano=${element.ano} >Modelo:${element.model}<br> Ano:${element.modelYear}
                </spam></li>`;
                conteudo = conteudo + texto;
            });
            listaHistorico.innerHTML = conteudo;
        }
    }
    //Ao carregar a página, o histórico é atualizado.
    atualizarHistorico();

    // Atualiza a página para uma nova pesquisa
    btnNovaPesquisa.addEventListener('click', () => {
        location.reload();
    });

    // Adiciona um evento para guardar a consulta em favoritos
    guardarFavoritos.addEventListener('click', () => {
        var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (favoritos.length >= 3) {
            alert("A Seção de favoritos está cheia. Por favor remova um ou mais itens.")
        } else {
            const tipo = tipoVeiculo.value;
            const marca = marcaVeiculo.value;
            const modelo = modeloVeiculo.value;
            const ano = anoVeiculo.value;

            if (tipo && marca && modelo && ano) {
                const favorito = { tipo: tipo, marca: marca, modelo: modelo, ano: ano };
                favoritos.push(favorito);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                alert('Consulta salva nos favoritos!');
                atualizarDesejos();
            } else {
                alert('Por favor, preencha todos os campos antes de guardar nos favoritos.');
            }
        }
    });

    // função para exibir a lista de favoritos
    async function atualizarDesejos() {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (favoritos.length > 0) {
            let conteudo = "";
            const localInfo = JSON.parse(localStorage.getItem('favoritos'));
            const listaFavoritos = document.getElementById("listaFavoritos");
            listaFavoritos.innerHTML = "";
            for (const veiculo of localInfo) {
                const veiculoLista = await buscarInfoVeiculo(veiculo.tipo, veiculo.marca, veiculo.modelo, veiculo.ano);

                //montando a lista.
                const texto = `<li id=${veiculoLista.index}>Modelo: ${veiculoLista.model}<br> Ano: ${veiculoLista.modelYear}.
                <br> Valor: ${veiculoLista.price}<br> <button class="btnRemover" data-Set=${veiculo.modelo}>REMOVER</button> </li>`;

                conteudo = conteudo + texto;
            }
            listaFavoritos.innerHTML = conteudo;
        }
        const btnRemover = document.querySelectorAll(".btnRemover");
        adicionaCliks(btnRemover);
    }
    atualizarDesejos();

    // remove um favorito do localStorage.
    function removeFavorito(codVeiculo) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos'));
        console.log(favoritos)
        const removeIndex = favoritos.findIndex((favorito) => favorito.modelo == codVeiculo);
        favoritos.splice(removeIndex, 1)
        console.log(favoritos);
        localStorage.clear('favoritos');
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        atualizarDesejos();
    }

    //criando os cliques para cada botão remover
    function adicionaCliks(botoes) {
        for (const botao of botoes) {
            botao.addEventListener('click', () => {
                const codVeiculo = botao.getAttribute('data-Set');
                removeFavorito(codVeiculo)
            })
        }
    };

    //Adiciona os botões à cada componente da lista.
    const btnHistorico = document.querySelectorAll(".historico");
    for (const element of btnHistorico) {
        element.addEventListener('click', async () => {
            let tipo = element.getAttribute('data-tipo');
            let codMarca = element.getAttribute('data-codmarca');
            let codModelo = element.getAttribute('data-codmodelo');
            let codAno = element.getAttribute('data-codano');
            console.log(tipo, codMarca, codModelo, codAno)

            let infoRecebida = await buscarInfoVeiculo(tipo, codMarca, codModelo, codAno);
            console.log(infoRecebida);

            const selecionarTipo = tipoVeiculo.value;

            // Se um tipo de veículo for selecionado, mostra a seção de detalhes e preenche as opções de marca e ano
            if (element) {
                detalhesVeiculo.classList.remove('hidden');
            } else {
                // Caso contrário, oculta a seção de detalhes e o resultado
                detalhesVeiculo.classList.add('hidden');
                resultado.classList.add('hidden');
            }
            
            tipoVeiculo.value = tipo;
            marcaVeiculo.value = codMarca;
            modeloVeiculo.value = codModelo;
            anoVeiculo.value = codAno;

        })
    }
})




