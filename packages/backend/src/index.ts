import express from 'express'
import getopts from 'getopts'

const app = express()

/* Pet */
app.post('/pet', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.delete('/pet/:petId', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.get('/pet/findByStatus', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.get('/pet/findByTags', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.get('/pet/:petId', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.put('/pet', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.post('/pet/:petId', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.post('/pet/:petId/uploadImage', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})

/* Store */
app.delete('/store/order/:orderId', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.get('/store/inventory', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.get('/store/order/:orderId', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.post('/store/order', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})

/* User */
app.post('/user', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.post('/user/createWithArray', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.post('/user/createWithList', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.delete('/user/:username', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.get('/user/:username', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.get('/user/login', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.get('/user/logout', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})
app.put('/user/:username', function(req, res) {
	//TODO
	res.status(503).send('Unimplemented')
})

const options = getopts(process.argv.slice(2), {
	alias: {
		port: 'p',
	},
	unknown: (option) => {
		console.log(`Unknown option: ${option}`)
		return false
	},
})

const port = options.port || 3000
const server = app.listen(port, function() {
	const address = server.address()
	if (typeof address === 'string') {
		console.log(`Listening on ${address}`)
	} else if (address) {
		console.log(`Listening on ${address.port}`)
	}
})
