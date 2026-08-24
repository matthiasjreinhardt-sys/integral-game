// Erstellt N Firebase-Auth-Konten mit zufaelligem Benutzernamen ("user827393")
// und einem gemeinsamen, vorgegebenen Passwort, sowie das passende
// Firestore-Score-Dokument (correct: 0, total: 0) je Konto.
//
// Voraussetzungen:
//   npm install firebase-admin
//   Service-Account-Schluessel: Firebase Console -> Projekteinstellungen
//   -> Dienstkonten -> "Neuen privaten Schluessel generieren", die
//   heruntergeladene Datei als serviceAccountKey.json in diesen Ordner legen.
//   WICHTIG: serviceAccountKey.json ist geheim - niemals committen/veroeffentlichen!
//
// Aufruf:
//   node scripts/generate-accounts.js --count 30 --password "Integral2026"
//
// Ergebnis: scripts/accounts.csv mit den Zeilen "username,password" zum
// Ausdrucken/Verteilen an die Klasse.

const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

function getArg(name, fallback) {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : fallback;
}

const count = parseInt(getArg("count", "25"), 10);
const password = getArg("password", null);
const emailDomain = getArg("domain", "integral-trainer.local");

if (!password) {
  console.error("Bitte ein Passwort angeben: --password DeinPasswort");
  process.exit(1);
}

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

function randomUsername() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `user${n}`;
}

async function main() {
  const rows = ["username,password"];
  const usedNames = new Set();

  for (let i = 0; i < count; i++) {
    let username;
    do {
      username = randomUsername();
    } while (usedNames.has(username));
    usedNames.add(username);

    const email = `${username}@${emailDomain}`;
    const userRecord = await admin.auth().createUser({ email, password });
    await admin.firestore().collection("scores").doc(userRecord.uid).set({
      username,
      correct: 0,
      total: 0,
    });

    rows.push(`${username},${password}`);
    console.log(`Angelegt: ${username}`);
  }

  const outPath = path.join(__dirname, "accounts.csv");
  fs.writeFileSync(outPath, rows.join("\n"));
  console.log(`\nFertig. Liste gespeichert unter: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
