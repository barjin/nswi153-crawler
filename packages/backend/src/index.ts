import express from 'express';
import getopts from 'getopts';

const app = express();

/* Execution */
app.delete('/execution/:executionId', (req, res) => {
    // TODO
    res.status(503).send('Unimplemented');
});
app.get('/execution', (req, res) => {
    // TODO
    res.status(503).send('Unimplemented');
});
app.get('/execution/:executionId', (req, res) => {
    // TODO
    res.status(503).send('Unimplemented');
});

/* WebsiteRecord */
app.post('/records', (req, res) => {
    // TODO
    res.status(503).send('Unimplemented');
});
app.delete('/records/:recordId', (req, res) => {
    // TODO
    res.status(503).send('Unimplemented');
});
app.get('/records/:recordId', (req, res) => {
    // TODO
    res.status(503).send('Unimplemented');
});
app.get('/records', (req, res) => {
    // TODO
    res.status(503).send('Unimplemented');
});
app.put('/records/:recordId', (req, res) => {
    // TODO
    res.status(503).send('Unimplemented');
});

const options = getopts(process.argv.slice(2), {
    alias: {
        port: 'p',
    },
    unknown: (option) => {
        console.log(`Unknown option: ${option}`);
        return false;
    },
});

const port = options.port || 3000;
const server = app.listen(port, () => {
    const address = server.address();
    if (typeof address === 'string') {
        console.log(`Listening on ${address}`);
    } else if (address) {
        console.log(`Listening on ${address.port}`);
    }
});
