// Login ueber Firebase Authentication mit Benutzername + Passwort.
// Firebase kennt selbst keine "Benutzernamen", nur E-Mail/Passwort, daher
// wird der Benutzername auf eine synthetische E-Mail abgebildet
// (siehe Game.AUTH_EMAIL_DOMAIN in firebase-config.js).

window.Game = window.Game || {};

Game.Auth = {
  currentUser: null,

  usernameToEmail(username) {
    return `${username.trim().toLowerCase()}@${Game.AUTH_EMAIL_DOMAIN}`;
  },

  randomUsername() {
    const n = Math.floor(100000 + Math.random() * 900000);
    return `user${n}`;
  },

  // Vermeidet verwechselbare Zeichen (0/O, 1/l/I) fuer besser lesbare,
  // handschriftlich verteilbare Passwoerter.
  randomPassword(length = 8) {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let pw = "";
    for (let i = 0; i < length; i++) {
      pw += chars[Math.floor(Math.random() * chars.length)];
    }
    return pw;
  },

  login(username, password) {
    const email = this.usernameToEmail(username);
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  logout() {
    return firebase.auth().signOut();
  },

  // Ruft callback(user) einmal initial und bei jeder Anmeldeaenderung auf.
  onReady(callback) {
    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user;
      callback(user);
    });
  },
};
