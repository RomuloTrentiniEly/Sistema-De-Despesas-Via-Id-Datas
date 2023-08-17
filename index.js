
var gastos = []
var vendas = []

// Função para adicionar produtos, gastos, datas e valores
function Adicionar() {
    let res = document.getElementById('res');
    let id = document.getElementById('id').value;
    let NomeProduto = document.getElementById('nomeProduto').value;
    let gasto = document.getElementById('gasto');
    let venda = document.getElementById('venda');
    let Valor = document.getElementById('Valor').value;
    let valorInteiro = parseInt(Valor);
    let data = document.getElementById('data').value;

    if (gasto.checked) {
        let juntar = { id, NomeProduto, valorInteiro, data };
        gastos.push(juntar);
    } else if (venda.checked) {
        let guardar = { id, NomeProduto, valorInteiro, data };
        vendas.push(guardar);
    }

    setTimeout(function() {
      res.innerHTML = '';
  }, 3000);
    res.innerHTML += `Cadastrado com Sucesso`;
    // Limpando os campos
    document.getElementById('nomeProduto').value = '';
    document.getElementById('id').value = '';
    gasto.checked = false;
    venda.checked = false;
    document.getElementById('Valor').value = '';
    
    
}

// Função para consultar através de datas
function Consultar() {
   let resConsulta = document.getElementById('ResConsulta');
    let DataIni = document.getElementById('DataInicial').value;
    let DataFin = document.getElementById('DataFinal').value;

    // Filtra gastos e vendas baseado nas datas
    let result = gastos.filter(verificar);
    let VENDAS = vendas.filter(fixas2);

    function verificar(item, data) {
        if (item.data > DataIni && item.data <= DataFin)
            return item;
    }

    function fixas2(item, data) {
        if (item.data > DataIni && item.data <= DataFin)
            return item;
    }

    console.log(result);
    console.log('------------------------------------------------');
    console.log(VENDAS);

    // Calcula os totais de gastos e vendas
    let TotalGasto = 0;
    for (var i = 0; i < gastos.length; i++) {
        TotalGasto += gastos[i].valorInteiro;
    }

    let TotalVendas = 0;
    for (var i = 0; i < vendas.length; i++) {
        TotalVendas += vendas[i].valorInteiro;
    }

    // Formata os resultados para exibição no HTML
    let resultHtml = "Resultados de Gastos:<br/>";
    result.forEach(item => {
        resultHtml += `ID: ${item.id}, Produto: ${item.NomeProduto}, Valor: R$ ${item.valorInteiro}, Data: ${item.data}<br/>`;
    });

    let vendasHtml = "Resultados de Vendas:<br/>";
    VENDAS.forEach(item => {
        vendasHtml += `ID: ${item.id}, Produto: ${item.NomeProduto}, Valor: R$ ${item.valorInteiro}, Data: ${item.data}<br/>`;
    });
   
    let totalHtml = `Total Gasto: <span class="vermelho">R$${TotalGasto.toFixed(2)}</span>, Total Vendas: <span class="verde">R$${TotalVendas.toFixed(2)}</span>`;
    
     let newWindow = window.open("", "_blank");
    newWindow.document.write(`${resultHtml} <br/> ${vendasHtml} <br/> ${totalHtml}`);
}

// Função para filtrar despesas fixas
function DespesasFixas() {
    let DataIni = document.getElementById('DataInicial').value;
    let DataFin = document.getElementById('DataFinal').value;

    // Filtra gastos baseado nas datas e ID
    let result = gastos.filter(Fixas);

    function Fixas(item, data) {
        if (item.data > DataIni && item.data <= DataFin && item.id == 0)
            return item;
    }

    console.log(result);
}





//consulta via Id

function ConsultarViaId(){

    // Filtra gastos e vendas baseado no Id
    let ID = document.getElementById('ID').value
    let resConsulta = document.getElementById('ResConsulta');
    let result = gastos.filter(verificar);
    let VENDAS = vendas.filter(fixas2);

    function verificar(item, id) {
        if (item.id == ID )
            return item;
    }

    function fixas2(item, data) {
        if (item.id == ID)
            return item
    }

    console.log(result);
    console.log('------------------------------------------------');
    console.log(VENDAS);

    // Calcula os totais de gastos e vendas
    let TotalGasto = 0;
    for (var i = 0; i < gastos.length; i++) {
        TotalGasto += gastos[i].valorInteiro;
    }

    let TotalVendas = 0;
    for (var i = 0; i < vendas.length; i++) {
        TotalVendas += vendas[i].valorInteiro;
    }

    console.log(result)
    console.log(vendas)

   
    // Formata os resultados para exibição no HTML
    let resultHtml = "Resultados de Gastos:<br/>";
    result.forEach(item => {
        resultHtml += `ID: ${item.id}, Produto: ${item.NomeProduto}, Valor: R$ ${item.valorInteiro}, Data: ${item.data}<br/>`;
    });

    let vendasHtml = "Resultados de Vendas:<br/>";
    VENDAS.forEach(item => {
        vendasHtml += `ID: ${item.id}, Produto: ${item.NomeProduto}, Valor: R$ ${item.valorInteiro}, Data: ${item.data}<br/>`;
    });
   
    let totalHtml = `Total Gasto: <span class="vermelho">R$${TotalGasto.toFixed(2)}</span>, Total Vendas: <span class="verde">R$${TotalVendas.toFixed(2)}</span>`;
    
    let newWindow = window.open("", "_blank");
    newWindow.document.write(`${resultHtml} <br/> ${vendasHtml} <br/> ${totalHtml}`);
}







