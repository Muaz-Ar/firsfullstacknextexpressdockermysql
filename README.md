# Erstellen einer einfachen Fullstack aplication mit next.js express.js und Docker mysql Datenbank 


### 1. Benutzereingabe in Next.js (`api/pages/eingabe/index.js`)

- **Benutzerinteraktion**: Der Benutzer gibt Daten in ein Eingabefeld ein und klickt auf "Speichern".
- **React State**: Die Eingabedaten werden in einem lokalen State (`useState`) gespeichert.
- **Event Handler**: Wenn der Speichern-Button geklickt wird, löst dies den `handleSpeichernClick` Event-Handler aus.

### 2. Senden der Daten an Express Server

- **Fetch API**: Der `handleSpeichernClick` Handler verwendet `fetch`, um eine POST-Anfrage an den Express-Server zu senden (`http://localhost:3000/save`). Die Daten werden im Request-Body mitgeschickt.
- **Asynchrone Verarbeitung**: Die Anfrage erfolgt asynchron, was bedeutet, dass der Code die Antwort abwartet, ohne die UI zu blockieren.

### 3. Verarbeitung im Express Server

- **Express Route Handler**: Der Server empfängt die Anfrage am `/save` Endpoint.
- **Datenbank-Interaktion**: Der Server verwendet die `mysql`-Bibliothek, um die Daten aus dem Request-Body in die MySQL-Datenbank einzufügen.
- **Rückmeldung**: Nach erfolgreichem Einfügen der Daten sendet der Server eine Bestätigung zurück zum Client.

### 4. Speicherung in MySQL-Datenbank

- **Datenbank-Operation**: Die Daten werden in der entsprechenden Tabelle (`deineTabelle`) in der MySQL-Datenbank gespeichert.
- **Auto-Increment ID**: Jeder neue Eintrag erhält automatisch eine einzigartige ID (wenn so konfiguriert).

### 5. Abrufen und Anzeigen der Daten (`api/pages/home.js`)

- **Initial Load via useEffect**: Beim Laden der Home-Seite löst `useEffect` eine Funktion aus, die Daten vom Server abruft.
- **Fetch API**: Es wird eine GET-Anfrage an `http://localhost:3000/get-data` gesendet.
- **Verarbeitung der Antwort**: Die Antwort des Servers wird verarbeitet und die Daten werden im State der Komponente gespeichert.
- **Rendering**: Die abgerufenen Daten werden im UI gerendert und angezeigt.

### Zusammenfassung der Schritte

1. **Benutzereingabe in Next.js**
2. **Senden der Daten an Express Server**
3. **Verarbeitung im Express Server**
4. **Speicherung in MySQL-Datenbank**
5. **Abrufen und Anzeigen der Daten in Next.js**

In jedem dieser Schritte spielen spezifische Technologien und Konzepte eine Rolle, wie React's State Management, asynchrone JavaScript-Anfragen, Express-Server-Handling, SQL-Operationen und das dynamische Rendering in Next.js.