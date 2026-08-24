// Persistiert den Punktestand pro Benutzer in Firestore:
// scores/{uid}            -> laufende Summe (correct/total)
// scores/{uid}/attempts/*  -> ein Eintrag pro abgeschlossener Stufe

window.Game = window.Game || {};

Game.Scores = {
  async loadAggregate(uid) {
    const doc = await firebase.firestore().collection("scores").doc(uid).get();
    const data = doc.data();
    return {
      correct: (data && data.correct) || 0,
      total: (data && data.total) || 0,
      disabled: !!(data && data.disabled),
    };
  },

  async listAll() {
    const snapshot = await firebase.firestore().collection("scores").get();
    return snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
  },

  async listAttempts(uid) {
    const snapshot = await firebase
      .firestore()
      .collection("scores")
      .doc(uid)
      .collection("attempts")
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => doc.data());
  },

  setDisabled(uid, disabled) {
    return firebase.firestore().collection("scores").doc(uid).set({ disabled }, { merge: true });
  },

  // Entfernt nur den Firestore-Eintrag (Punktestand/Verlauf). Loescht NICHT
  // das Firebase-Auth-Konto - das ist entweder schon per Hand in der
  // Firebase Console entfernt worden (verwaister Eintrag), oder muesste
  // separat in der Console geloescht werden.
  deleteEntry(uid) {
    return firebase.firestore().collection("scores").doc(uid).delete();
  },

  recordAnswer(uid, isCorrect) {
    return firebase
      .firestore()
      .collection("scores")
      .doc(uid)
      .set(
        {
          correct: firebase.firestore.FieldValue.increment(isCorrect ? 1 : 0),
          total: firebase.firestore.FieldValue.increment(1),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
  },

  recordAttempt(uid, moduleId, levelId, correct, total) {
    return firebase
      .firestore()
      .collection("scores")
      .doc(uid)
      .collection("attempts")
      .add({
        moduleId,
        levelId,
        correct,
        total,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  },
};
