
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
app.use(cors())
app.use(bodyParser.json());


const port = 3000; 

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'myuser',
    password: 'mypassword',
    database: 'mydb',
  });

db.connect((err) => {
    if (err) {
      console.error('Fehler bei der Verbindung zur Datenbank: ' + err.message);
    } else {
      console.log('Erfolgreich mit der Datenbank verbunden');
    }
  });

  app.post('/save', (req, res) => {
    const { eingabe } = req.body;
    db.query('INSERT INTO deineTabelle (spaltenName) VALUES (?)', [eingabe], (err, result) => {
        if (err) {
            res.status(500).send('Fehler beim Speichern in der Datenbank');
            return;
        }
        res.status(200).send('Eingabe gespeichert');
    });
});
  
// In Mein_projekt/my-server-app/server.js

app.get('/get-data', (req, res) => {
    db.query('SELECT * FROM deineTabelle', (err, results) => {
        if (err) {
            res.status(500).send('Fehler beim Abrufen der Daten');
            return;
        }
        res.status(200).json(results);
    });
});
  app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
  });