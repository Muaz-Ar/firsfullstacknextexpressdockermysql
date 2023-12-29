// /lib/api.js
const postRequest = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Fehler beim Senden der Anfrage: ' + response.status);
    }

    return response.json();
};

export default postRequest;
