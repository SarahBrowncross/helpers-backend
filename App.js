const express = require('express');
const fs = require('fs').promises;
const { send404Error } = require('./errors')

const { PORT = 8080 } = process.env;

const app = express();
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.options('*', cors())

app.get('/playerlist', (req, res) => {
	fs.readFile('./players.json', 'utf-8')
	.then((file) =>{
		const parsedFile = JSON.parse(file)
		res.json(parsedFile)
	})
})

app.post('/playerlist', (req, res) => {
	const name = req.body.name;
	fs.readFile('./players.json', 'utf-8')
	.then((file) => {
		const parsedFile = JSON.parse(file)
		parsedFile.unshift({name})
		fs.writeFile('./players.json', JSON.stringify(parsedFile))
		.then(() => {
			res.json(parsedFile)
		})
	})
})

app.use('/*', send404Error);

app.listen(PORT, () => {
	console.log('listening');
})