
export async function buscarTipoVeiculo(tipoVeiculo) {
    try {
        const resposta = await fetch(`https://fipe.parallelum.com.br/api/v2/${tipoVeiculo}/brands`);
        const info = await resposta.json();

        if (resposta.status == 200) {
            return info;
        } else {
            alert(info.message);
        }
    } catch (e) {
        alert('Servidor fora do ar!!!')
    }
};

export async function buscarMarcaVeiculo(tipoVeiculo, codigoMarca) {
    try {
        const resposta = await fetch(`https://fipe.parallelum.com.br/api/v2/${tipoVeiculo}/brands/${codigoMarca}/models`);
        const info = await resposta.json();

        if (resposta.status == 200) {
            return info;
        } else {
            alert(info.message);
        }
    } catch (e) {
        alert('Servidor fora do ar!!!')
    }
}

export async function buscarAnoVeiculo(tipoVeiculo, codigoMarca, codigoModelo) {
    try {
        const resposta = await fetch(`https://fipe.parallelum.com.br/api/v2/${tipoVeiculo}/brands/${codigoMarca}/models/${codigoModelo}/years`);
        const info = await resposta.json();

        if (resposta.status == 200) {
            return info;
        } else {
            alert(info.message);
        }
    } catch (e) {
        alert('Servidor fora do ar!!!')
    }
}

export async function buscarInfoVeiculo(tipoVeiculo, codigoMarca, codigoModelo, codigoAno) {
    try {
        const resposta = await fetch(`https://fipe.parallelum.com.br/api/v2/${tipoVeiculo}/brands/${codigoMarca}/models/${codigoModelo}/years/${codigoAno}`);
        const info = await resposta.json();

        if (resposta.status == 200) {
            return info;
        } else {
            alert(info.message);
        }
    } catch (e) {
        alert('Servidor fora do ar!!!')
    }
}