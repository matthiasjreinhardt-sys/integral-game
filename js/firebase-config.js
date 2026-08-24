// Firebase-Projekt-Konfiguration.
//
// Diese Werte sind KEINE Geheimnisse - sie duerfen oeffentlich im Frontend
// stehen (auch auf GitHub Pages). Der Zugriffsschutz laeuft ueber die
// Firestore Security Rules (siehe firestore.rules), nicht ueber Geheimhaltung
// dieser Config.
//
// Zu finden in der Firebase Console:
// Projekteinstellungen -> "Meine Apps" -> Web-App -> SDK-Setup und -Konfiguration.
//
// TODO: Werte unten durch die eigene Firebase-Projekt-Konfiguration ersetzen.

const firebaseConfig = {
  apiKey: "AIzaSyApQsHDPZORqbLHlAH51toHBEKRwwAl-yI",
  authDomain: "lernspiellogin.firebaseapp.com",
  projectId: "lernspiellogin",
  storageBucket: "lernspiellogin.firebasestorage.app",
  messagingSenderId: "656163434492",
  appId: "1:656163434492:web:7fabe30853528e89bd8c79",
};

firebase.initializeApp(firebaseConfig);

window.Game = window.Game || {};

// Wird von admin.html wiederverwendet, um beim Anlegen neuer Schülerkonten
// eine zweite, isolierte Firebase-App-Instanz zu starten (damit die eigene
// Admin-Sitzung dabei nicht ueberschrieben wird).
Game.firebaseConfig = firebaseConfig;

// Domain-Suffix fuer die synthetischen Login-E-Mails: aus "user827393" wird
// intern "user827393@integral-trainer.local". Muss zu scripts/generate-accounts.js
// passen (dort per --domain aenderbar).
Game.AUTH_EMAIL_DOMAIN = "integral-trainer.local";
