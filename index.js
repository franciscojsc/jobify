const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
	response.render('home', {
		date: new Date()
	});
});

app.listen(3000, (err) => {
	if (err) {
		console.log('Nao foi possivel iniciar o servidor do Jobify.');
	} else {
		console.log('Servidor do Jobify rodando...');
	}
});
