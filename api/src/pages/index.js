// In Mein_projekt/api/src/pages/home.js
import React, { useEffect, useState } from 'react';
import Navigation from "@/components/navigation";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/get-data');
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navigation/>
            Hallo Welt
            <div>
                {data.map((item, index) => (
                    <p key={index}>{item.spaltenName}</p>
                ))}
            </div>
        </div>
    );
}