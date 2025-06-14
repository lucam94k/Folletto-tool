// Includi questo script nel tuo HTML con:
// <script src="log_script_salva_visite.js"></script>

let startTime = Date.now();
let clicks = 0;

// Conta ogni click sul sito
document.addEventListener('click', () => {
    clicks++;
});

fetch("https://ipinfo.io/json?token=55094407a42c12")
    .then(response => response.json())
    .then(data => {
        const parser = new UAParser();
        const deviceType = parser.getDevice().type || "Desktop";
        const deviceModel = parser.getDevice().model || "Unknown";
        const osName = parser.getOS().name || "OS sconosciuto";
        const browserName = parser.getBrowser().name || "Browser sconosciuto";

        const timestamp = new Date().toLocaleString("it-IT");
        const timeSpent = Math.round((Date.now() - startTime) / 1000); // in secondi

        const logText = `DATA VISITA: ${timestamp}
IP: ${data.ip}
Luogo: ${data.city}, ${data.region}, ${data.country}
ISP: ${data.org}
Dispositivo: ${deviceType} - Modello: ${deviceModel}
Sistema Operativo: ${osName}
Browser: ${browserName}
Tempo sulla pagina: ${timeSpent}s
Click effettuati: ${clicks}
---------------------------------------------`;

        // Invia al server per salvarlo nel file .txt
        fetch("salva_log.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ log: logText })
        });
    })
    .catch(error => {
        console.error("Errore nel tracciamento:", error);
    });
