const express = require('express');
const app = express();

app.get('/', (request, response) => {
	response.send('Olá Fullstack Lab');
});

app.listen(3000, (err) => {
	if (err) {
		console.log('Nao foi possivel iniciar o servidor do Jobify.');
	} else {
		console.log('Servidor do Jobify rodando...');
	}
});
