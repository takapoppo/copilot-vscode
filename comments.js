// Create web server

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        }
        res.send(data);
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        }
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
            }
            res.send('Comment added');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});