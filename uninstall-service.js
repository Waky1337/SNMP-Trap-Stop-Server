const Service = require('node-windows').Service;

// Créer un nouvel objet de service
const svc = new Service({
    name: 'NodeJS Shutdown Service',
    script: 'C:\\nodejs\\server-shutdown.js' //le chemin du script d'arret
});

// Écoutez l'événement "uninstall" pour savoir quand la désinstallation est terminée
svc.on('uninstall', function() {
    console.log('Désinstallation complète.');
    console.log('Le service existe : ', svc.exists);
});

// Désinstaller le service
svc.uninstall();
