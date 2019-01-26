const express = require('express');
const redis = require('redis');
const keys = require('./keys');

const port = 3000;
const app = express();
const client = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort
});
client.set('visits', 0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Visits count: ' + visits);
        client.set('visits', parseInt(visits) + 1);
    })
});

app.listen(port, () => console.log(`Listening on ${port}`));