const Service = require('node-windows').Service;

// Créer un nouvel objet de service
const svc = new Service({
    name: 'NodeJS Shutdown Service',
    description: 'Service pour écouter les traps SNMP et éteindre le serveur en cas de coupure de courant.',
    script: 'C:\\nodejs\\server-shutdown.js' //le chemin du script d'arret
});

// Écoutez l'événement "install", indiquant que le processus est disponible en tant que service
svc.on('install', function() {
    svc.start();
});

// Installer le service
svc.install();
