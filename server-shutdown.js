const dgram = require('dgram');
const { exec } = require('child_process');

// Configuration
const PORT = 162; // Port standard pour les traps SNMP
const ALLOWED_IP = '127.0.0.1'; // Remplacez par l'adresse IP autorisée, celle de l'onduleur

// Créer un serveur UDP pour écouter les traps SNMP
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.error(`Erreur du serveur UDP: ${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`Trap SNMP reçu de ${rinfo.address}:${rinfo.port}`);
    console.log('Message:', msg);

    // Vérifier si l'adresse IP de l'expéditeur est autorisée
    if (rinfo.address !== ALLOWED_IP) {
        console.log(`Adresse IP non autorisée : ${rinfo.address}`);
        return;
    }

    // Analyser le message SNMP et vérifier s'il indique une coupure de courant
    if (trapIndicatePowerFailure(msg)) {
        console.log('Coupure de courant détectée. Arrêt du serveur...');
        shutdownServer();
    }
});

server.on('listening', () => {
    const address = server.address();
    console.log(`Serveur UDP en écoute sur ${address.address}:${address.port}`);
});

server.bind(PORT);

// Fonction pour vérifier si le trap indique une coupure de courant
function trapIndicatePowerFailure(msg) {
    // Implémentez ici la logique pour déterminer si le trap indique une coupure de courant
    // Cela dépendra du format spécifique des traps envoyés par votre onduleur
    // Par exemple, vous pouvez analyser le message SNMP et vérifier les OID et valeurs spécifiques
    return true; // À remplacer par votre logique réelle
}

// Fonction pour éteindre le serveur Windows
function shutdownServer() {
    // Commande d'arrêt du serveur pour Windows
    const shutdownCommand = 'shutdown /s /t 0';

    exec(shutdownCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors de l'arrêt du serveur: ${error}`);
            return;
        }
        console.log(`Serveur en cours d'arrêt: ${stdout}`);
    });
}
