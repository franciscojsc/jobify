const express = require('express');
const app = express();

const sqlite = require('sqlite');
const dbConnection = sqlite.open('banco.sqlite', (Promise) => {});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (request, response) => {
	response.render('home');
});

app.get('/vaga', (request, response) => {
	response.render('vaga');
});

const init = async () => {
	const db = await dbConnection;
	await db.run('create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);');
	//const categoria = 'Engineering team';
	//await db.run(`insert  into categorias(categoria) values('${categoria}');`);
};

init();

app.listen(3000, (err) => {
	if (err) {
		console.log('Nao foi possivel iniciar o servidor do Jobify.');
	} else {
		console.log('Servidor do Jobify rodando...');
	}
});
