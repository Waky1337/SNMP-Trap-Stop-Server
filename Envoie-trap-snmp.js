//permet de simuler l'envoie d'un trap snmp

const snmp = require('net-snmp');

// Configuration
const target = '127.0.0.1'; // Adresse IP du serveur qui écoute les traps SNMP
const community = 'public'; // Communauté SNMP
const version = snmp.Version1; // Version SNMP
const type = snmp.TrapType.ColdStart; // Type de trap (par exemple, ColdStart)

// Créer une session SNMP
const session = snmp.createSession(target, community, { version: version });

// Créer les varbinds pour le trap
const varbinds = [
    {
        oid: '1.3.6.1.2.1.1.3.0', // sysUpTime
        type: snmp.ObjectType.TimeTicks,
        value: 12345
    },
    {
        oid: '1.3.6.1.6.3.1.1.4.1.0', // snmpTrapOID
        type: snmp.ObjectType.OID,
        value: '1.3.6.1.4.1.8072.2.3.0.1' // Exemple d'OID de trap
    },
    {
        oid: '1.3.6.1.4.1.your.oid.here', // Remplacez par l'OID spécifique de votre onduleur
        type: snmp.ObjectType.OctetString,
        value: 'PowerFailure' // Exemple de valeur indiquant une coupure de courant
    }
];

// Envoyer le trap
session.trap(type, varbinds, (error) => {
    if (error) {
        console.error('Erreur lors de l\'envoi du trap SNMP:', error);
    } else {
        console.log('Trap SNMP envoyé avec succès');
    }
    session.close();
});
