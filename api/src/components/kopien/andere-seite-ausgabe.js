import React, { useState } from 'react';
import Navigation from '@/components/navigation';

export default function Eingabe({ onSave }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSpeichernClick = () => {
        onSave(inputValue);
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
        </div>
    );
}
