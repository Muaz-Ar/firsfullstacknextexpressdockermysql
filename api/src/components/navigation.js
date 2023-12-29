import  Link  from 'next/link';

export default function Navigation() {
    const linkStyle = {
        padding: "2rem",
        fontSize: "40px",
        margin: "1rem"};
    return (
        <div style={{border: "2px solid black"}}>
            <Link style={linkStyle} href="/">Startseite</Link>
            <Link style={linkStyle} href="/eingabe">Eingabe</Link>
        </div>
    );
}