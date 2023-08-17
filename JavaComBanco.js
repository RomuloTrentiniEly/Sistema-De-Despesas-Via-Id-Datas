const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'seu_banco_de_dados'
});

connection.connect(function(err) {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conexão estabelecida com o banco de dados');
});

function Adicionar() {
    const res = document.getElementById('res');
    const id = document.getElementById('ID').value;
    const nomeProduto = document.getElementById('nomeProduto').value;
    const gasto = document.getElementById('gasto').checked;
    const venda = document.getElementById('venda').checked;
    const valor = parseInt(document.getElementById('Valor').value);
    const data = document.getElementById('data').value;

    let tabela = '';
    let tipo = '';
    if (gasto) {
        tabela = 'gastos';
        tipo = 'Gasto';
    } else if (venda) {
        tabela = 'vendas';
        tipo = 'Venda';
    }

    const query = `INSERT INTO ${tabela} (id, NomeProduto, Valor, Data) VALUES (?, ?, ?, ?)`;

    connection.query(query, [id, nomeProduto, valor, data], function(err, result) {
        if (err) {
            console.error(`Erro ao adicionar ${tipo}:`, err);
            return;
        }
        res.innerHTML = `${tipo} cadastrado com sucesso`;
        setTimeout(function() {
            res.innerHTML = '';
        }, 3000);

        // Limpando os campos
        document.getElementById('nomeProduto').value = '';
        document.getElementById('ID').value = '';
        document.getElementById('gasto').checked = false;
        document.getElementById('venda').checked = false;
        document.getElementById('Valor').value = '';
    });
}

function Consultar() {
    const resConsulta = document.getElementById('ResConsulta');
    const DataIni = document.getElementById('DataInicial').value;
    const DataFin = document.getElementById('DataFinal').value;

    let resultHtml = '';
    let vendasHtml = '';
    let totalHtml = '';

    const gastosQuery = `SELECT * FROM gastos WHERE Data > ? AND Data <= ?`;
    const vendasQuery = `SELECT * FROM vendas WHERE Data > ? AND Data <= ?`;

    connection.query(gastosQuery, [DataIni, DataFin], function(err, result) {
        if (err) {
            console.error('Erro ao consultar gastos:', err);
            return;
        }
        
        resultHtml = "Resultados de Gastos:<br/>";
        result.forEach(item => {
            resultHtml += `ID: ${item.id}, Produto: ${item.NomeProduto}, Valor: R$ ${item.Valor}, Data: ${item.Data}<br/>`;
        });

        connection.query(vendasQuery, [DataIni, DataFin], function(err, result) {
            if (err) {
                console.error('Erro ao consultar vendas:', err);
                return;
            }
            
            vendasHtml = "Resultados de Vendas:<br/>";
            result.forEach(item => {
                vendasHtml += `ID: ${item.id}, Produto: ${item.NomeProduto}, Valor: R$ ${item.Valor}, Data: ${item.Data}<br/>`;
            });

            // Calcula os totais de gastos e vendas
            let totalGasto = 0;
            let totalVendas = 0;

            for (let i = 0; i < result.length; i++) {
                totalGasto += result[i].Valor;
            }

            for (let i = 0; i < result.length; i++) {
                totalVendas += result[i].Valor;
            }

            totalHtml = `Total Gasto: <span class="vermelho">R$${totalGasto.toFixed(2)}</span>, Total Vendas: <span class="verde">R$${totalVendas.toFixed(2)}</span>`;
            
            // Exibe os resultados no HTML
            resConsulta.innerHTML = `${resultHtml} <br/> ${vendasHtml} <br/> ${totalHtml}`;
        });
    });
}

