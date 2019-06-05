const express = require('express');
const app = express();

const sqlite = require('sqlite');
const dbConnection = sqlite.open('banco.sqlite', (Promise) => {});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (request, response) => {
	const db = await dbConnection;
	const categoriasDb = await db.all('select * from categorias;');
	const vagas = await db.all('select * from vagas;');
	const categorias = categoriasDb.map((cat) => {
		return {
			...cat,
			vagas: vagas.filter((vaga) => vaga.categoria === cat.id)
		};
	});
	response.render('home', {
		categorias: categorias
	});
});

app.get('/vaga/:id', async (request, response) => {
	const db = await dbConnection;
	const vaga = await db.get('select * from vagas where id = ' + request.params.id);
	response.render('vaga', {
		vaga
	});
});

const init = async () => {
	const db = await dbConnection;
	await db.run('create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);');
	await db.run(
		'create table if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);'
	);
	//const categoria = 'Engineering team';
	//await db.run(`insert  into categorias(categoria) values('${categoria}');`);
	// const titulo = 'Fullstack Develop (Remote)';
	// const descricao = 'Vaga para Fulstack develop que fez o Fullstack Lab';
	// await db.run(`insert into vagas (categoria, titulo, descricao)	values (1, '${titulo}', '${descricao}');`);
};

init();

app.listen(3000, (err) => {
	if (err) {
		console.log('Nao foi possivel iniciar o servidor do Jobify.');
	} else {
		console.log('Servidor do Jobify rodando...');
	}
});
