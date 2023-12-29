<-------------- Clienteingabe auf einer page in home anzeigen lassen ------------>

1. **Erstellen einer mySql Datenbank in Docker**
2. **Erstellen eines express.js Server verbindung mit Datenbank erstellen** 
3. **Erstellen einer next.js anwendung und frontend vorbereiten** 
4. **Implementieren der API-Anfragen, Middelways, Endpoints und Routes** 
5. **Testing**



<--------------- 1. Datenbank mit Docker erstellen --------------> 

# was wir jetztz machen ist wir erstellen eine Docker Contaiern auf dem eine MySql datenbak läuft und 
# erstellen einen Express.js Server mit dem wir es routen 
# eine mit next app bei der wir daten an den spl schicken und auch empfangen 

der Dockerfile lautet 
docker run -d --name my-mysql-container 
-e MYSQL_ROOT_PASSWORD=my-secret-pw 
-e MYSQL_USER=myuser 
-e MYSQL_PASSWORD=mypassword 
-e MYSQL_DATABASE=mydb -p 3306:3306 mysql:5.7
docker läuft ? kontrollieren mit `docker container ps` 

-- wir müssen entweder direkt beim startern mit docker compose oder im nachhinein über Docker echo eine liste in der mySql erstellen. dies machen wir mit einem sql befehl 

befehl nachdem wir ein Dockerfile erstellt haben um auf die cli zu gelangen 

-- docker exec -it [Container-Name oder ID] mysql -u [Benutzername] -p

in unserem fall 
-- docker exec -it my-mysql-container mysql -u myuser -p

nach dem man das Password für die mySql eingegeben haben fügen wir folgende SQL befehle durch

-- CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;  
# hier erstellen wir eine mydb Datenbank falls sie nicht existiert 

# hier erstellen wir eine eine Tabelle mit zwei spalten ertellt "id", soll nur ganze zahlen sein und primärschlüssel Auto increment-attribut fügt automatisch zahlen u zeilen hinzu id dynamisch "spalteName" (Länge von 255 Zeichen und darf nicht NULL ) der name der Tabelle lautet deineTabelle 

-- CREATE TABLE deineTabelle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    spaltenName VARCHAR(255) NOT NULL );

<---------------- schritt 2 ertellung eines Folders my-server-app ------------------>

- mkdir my-server-app
- cd my-server-app
- npm init -y
- npm install express mysql

    [Optional] 
    - `npm install nodemon`  nach installation in Package.json unter 
    "scripts":{
        "dev": "nodemon server.js" } 
    - hinzufügen und ihr Server wird bei code-veränderungen aktuallisiert

# danach die Server.js datei erstelllen 

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost', //  MySQL-Host
  user: 'myuser',    //  MySQL-Benutzername
  password: 'mypassword', //  MySQL-Passwort
  database: 'mydb'   //  MySQL-Datenbankname });

db.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank: ' + err.message);
  } else {
    console.log('Erfolgreich mit der Datenbank verbunden'); } });

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});

wenn wir dann den server mit node starten bekommen wir die meldung verbunden wenn das so ist auf version immer achten. 



<------------------------------- schritt 3-4 next.js u. express.js ineinandergreifend--------------------------->

1. Folder erstellen `mkdir [next-app]`
2. in den folder gehen `cd [next-app]`
3. next starten  `npx create-next-app@ .`
4. ich habe bis auf `src`alles nein gemacht 
5. lösche alle eingaben in global.css und alles in /index.js
6. einfache navigation aufbauen und in index und /pages/eingabe/index.js einstellen 
7. in /eingabe/index useState hock anwendung coden 

7. # /src/pages/eingabe/index.js

import React, { useState } from 'react';          //useState importieren für das Speichern vom import hook anwendung
import Navigation from '@/components/navigation'; 

export default function Eingabe() {       
  const [inputValue, setInputValue] = useState('');  //Definieren der des InputValues variable für useState 

  # const handleInputChange = ({ target: { value } }) => setInputValue(value); //andere schreibweise macht das selbe

  const handleInputChange = (e) => {        hier definieren wir die funktion handleInpitChange diese fürt die funkct 
      setInputValue(e.target.value);        setInputValu welche aktualliesiert und die hook durchführt 
  };

# // definieren der funktion welche den wert an die server sendet und au die logik fürs clicken des button 
const handleSpeichernClick = async () => {   - Asyncroner operator erlaubt die verwendung von await um auf die 
                                              erfülllung der promises zu warten
    try {           - try{....} Catch{....} erlaub fehlererkennung und nicht unterbrechung vom code 
        // Senden an den Express-Server
        const response = await fetch('http://localhost:3000/save', {    await ist das schlüsselwort einer async funkct
                                                                sie pausiert die async funct bis die promise der fetch erfüllt ist  
            method: 'POST',                                     fetch(url, {option}) ist eine Netzwerkanfrage für 
            headers: {                                          APIs oder laden von Resourcencen über das Netzwerk
                'Content-Type': 'application/json',             method: HTTP z.B. 'GET', 'POST', 'PUT', 'DELETE'
            },                                                   Content-Type ist der Medienty Json-Datei 
            body: JSON.stringify({ eingabe: inputValue }),      body: JSON.stringify({ key: 'value' })   datentyp 
                                                              für den server wie es gespeichtert und gesendet wird });

        if (response.ok) {                                      zu if wenn respinse.ok ist bekommen wir in der console
            console.log('Eingabe gespeichert');                 die ausgabe 'Eingabe gespeichert' und werden auf die 
            window.location.href = "/";                         Startseite weitergeleitet
        } else {
            console.error('Fehler beim Speichern');             bei einem Fehler bekommen wir die ausgabe 'Fehler 
        }                                                       beim Speichern'
    } catch (error) {                                         -try-Block: Hier den Code, der Fehler werfen könnte. In console.error('Ein Fehler ist aufgetreten: ', error);        diesem Fall, der die Netzwerkanfrage macht.
                                                                -catch (error): Wenn innerhalb des try-Blocks ein 
                                                                Fehler auftritt, wird die Ausführung sofort zum catch-Block übergegangen, wo du den Fehler behandeln kannst.
        // Optional: Benutzerfeedback oder weitere Fehlerbehandlung} };

 return ( <div>
            <Navigation />                                        //einfügen der Navigation Componentt
            <label style={{ fontSize: '40px', padding: '2rem' }}> 
                Begrüße mich:
                <input                                            
                    style={{ fontSize: '40px', padding: '2rem' }}
                    type="text"
                    placeholder="Eingabe hier"
                    value={inputValue}                          //Inputvalue für in value einfügen useState speicherug
                    onChange={handleInputChange} />             //on klick einfügen damit die veränderung in value   
            </label>                                              erkennt und gespeichert wird 
            <button onClick={handleSpeichernClick}>Speichern</button>   //logik senden an server func aufrufen 
            </div>) }

# Server.js Datei 
l

const express = require('express');             //übernehmen von vorhin 
const cors = require('cors');                   //Cross-Origin Resource Sharing wird verwendet wenn fronten u backend 
                                                auf unterschiedlichen host laufen und front anfragen an server schickt
const app = express();                          //übernohmen
const bodyParser = require('body-parser');      //ist eine Middelware Modul um eingehende anfragen zu analysieren    
                                                    vorallem json 
const mysql = require('mysql');                 //übernommen
app.use(cors())                                 //aktiviert cors 
app.use(bodyParser.json());                     //eingehende anfragen sollen in json interpretiert werden 


const port = 3000;                               //portnummer 

<------------ login daten mysql -------------> 
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
<----------Datei vom eingabe/index.js empfangen und in DB Speichern---------->

// Post von /eingabe/index.js über 3000/save an  DB. Save
  app.post('/save', (req, res) => {    //verwendung von Post weil wir etwas Speichern dies befindet sich im rout      
                                        3000/save
    const { eingabe } = req.body;        //req.body: Enthält die Daten, die vom Client gesendet wurden. In diesem 
                                            Fall wird ein Objekt mit der Eigenschaft eingabe erwarte
# db.query(...): Führt eine SQL-Abfrage aus  
- **INSERT INTO (tabellenname) (spalte1, sp2, ...)= ist dass schlüssekwort um etwas einzufügen**
- **VALUES (?) ist ein platzhalte und fügt hier die daten von [eingabe] hinzu**
- **Syntax für mehr spalten**
- **db.query('INSERT INTO Tabellenname (Spalte1, Spalte2) VALUES (?, ?)', [eingabe, eingabe2], (err, result) =>{...**

    db.query('INSERT INTO deineTabelle (spaltenName) VALUES (?)', [eingabe], (err, result) => {    
        if (err) {
            res.status(500).send('Fehler beim Speichern in der Datenbank'); 
                                Fehlerbehandlung: Datenbankabfrage ein Fehler auftritt ServerAntwort Status 500 (Serverfehler).     Erfolgsantwort:Abfrage erfolgreich,Server Antwort Status 200 
                                                    Nachricht "Eingabe gespeichert".
            return;
        }
        res.status(200).send('Eingabe gespeichert');
    });
});
  
//Startsete auslesen der DB über get-data 

app.get('/get-data', (req, res) => {            // hier definiren wir eine get-anfrage vom endpoint /get-date
# hier werden alle * spalten von der Tabelle ausgelesen
- **SELECT spalte1, spalte2, ... FROM TABELLEName (rest optional) WHERE Bedingung**     
- **SELECT spalte1, spalte2, ... FROM TABELLEName (rest optional) WHERE id = 1** 
- **SELECT spalte1, spalte2, ... FROM TABELLEName (rest optional) spaltenNAme 'EinWert'** 
- **SELECT * FROM TABELLEName (rest optional) WHERE Bedingung**  
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


# Home.js Datei
/src/pages/home.js

// In Mein_projekt/api/src/pages/home.js
import React, { useEffect, useState } from 'react'; 
import Navigation from "@/components/navigation";

export default function Home() {                
    const [data, setData] = useState([]);      // eine variabel zum speichern u anzeigen der kommenden datei von DB

    useEffect(() => {  //useEffect ist ein Hook in React, der verwendet wird, um Nebeneffekte in Funktionskomponenten 
                        	durchzuführen useEffect(()=>{},[abhängigkeit]); [] ist einmaliger durchlauf

# useEffect führt den Code, der in seinem Funktionskörper definiert ist, nach dem Rendern der Komponente aus. Dieser Code kann aufgrund von Änderungen im Zustand der Komponente (zustandsverwaltet durch useState oder andere Zustandsmanagement-Tools), den Props oder anderen Faktoren ausgeführt werden.
        
        const fetchData = async () => {               // eine asyncrone funktion 
# hier definieren wir response die einen fetch Aufruf im endpoint der 3000/get-data durchführt await wartet, bis das Fetch-Promise erfüllt ist, d.h., bis die Daten vom Server geladen sind
            const response = await fetch('http://localhost:3000/get-data'); 
# hier definieren wir result welches die empfangene daten in eine jsond konvertiert await wartet bis es abgeschlossen ist                         
            const result = await response.json();
# setData(result) speichert die Datei in das array von DATA[] in der useState funktion             
            setData(result);
        };
# die funktion wird aufgerufen 
        fetchData();
    }, []);

    return (
        <div>
            <Navigation/>
            Hallo Welt
            <div>
# logik die map-funktion iteriert über data index vergibt ein key also ne nummer zählt von 0 auf 
item.spaltenName nimmt den wert von spaltenName was in Data gespeicher ist. 
                {data.map((item, index) => (
                    <p key={index}>{item.spaltenName}</p>
                ))}
            </div>
        </div>
    );
}




