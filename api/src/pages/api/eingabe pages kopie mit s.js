 // In Mein_projekt/api/src/pages/eingabe/index.js
 import React, { useState } from 'react';
 import Navigation from '@/components/navigation';
 
 export default function Eingabe() {
     const [inputValue, setInputValue] = useState('');
     const [savedValue, setSavedValue] = useState('');
 
     const handleInputChange = (e) => {
         setInputValue(e.target.value);
     };
 
 
 const handleSpeichernClick = async () => {
     setSavedValue(inputValue);
 
     // Senden an den Express-Server
     const response = await fetch('http://localhost:3000/save', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({ eingabe: inputValue }),
     });
 
     if (response.ok) {
         console.log('Eingabe gespeichert');
         window.location.href = "/"
     } else {
         console.error('Fehler beim Speichern');
     }
 };
 
  return (
         <div>
             <Navigation />
             <label style={{ fontSize: '40px', padding: '2rem' }}>
                 Begrüße mich:
                 <input
                     style={{ fontSize: '40px', padding: '2rem' }}
                     type="text"
                     placeholder="Eingabe hier"
                     value={inputValue}
                     onChange={handleInputChange}
                 />
             </label>
             <button onClick={handleSpeichernClick}>Speichern</button>
             {savedValue && (
                 <p style={{ fontSize: '24px' }}>
                     Gespeicherte Eingabe: {savedValue}
                 </p>
             )}
         </div>
     );
 }