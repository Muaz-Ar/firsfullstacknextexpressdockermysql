import React, { useState } from 'react';
import Navigation from '@/components/navigation';

export default function Eingabe() {
    
    const [savedValue, setSavedValue] = useState('');

 
    const handleSpeichernClick = () => {
        setSavedValue(inputValue);
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
