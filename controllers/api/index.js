const express = require('express');
const app = express();
const port = 3000;

// Função iterativa para calcular o produtório
function produtorioIterativo(m, n) {
    let result = 1;

    for (let i = m; i <= n; i++) {
        result *= i + 1 / i;
    }

    return result;
}

// Função recursiva para calcular o produtório
function produtorioRecursivo(m, n) {
    if (m > n) {
        return 1;
    }

    return (m + 1 / m) * produtorioRecursivo(m + 1, n);
}

// Rota para calcular o produtório
app.get('/produtorio', (req, res) => {
    const m = parseInt(req.query.m);
    const n = parseInt(req.query.n);
    const metodo = req.query.metodo;

    if (isNaN(m) || 
        isNaN(n) || 
        (metodo !== 'iterativa' && 
         metodo !== 'recursiva')) {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    let resultado;

    if (metodo === 'iterativa') {
        resultado = produtorioIterativo(m, n);
    } else {
        resultado = produtorioRecursivo(m, n);
    }

    res.json({ resultado });
});

// Executando o servidor
app.listen(port, () => {
    console.log(`API executando em http://localhost:${port}`);
});