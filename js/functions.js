// Pool der Funktionen, aus denen Aufgaben generiert werden.
// Jede Funktion liefert f(x) UND die passende Stammfunktion F(x),
// damit exakte Integralwerte ohne Symbolik berechnet werden koennen.
//
// category:
//   "easy"   -> im gesamten sinnvollen Grenzenbereich >= 0 (klassische Flaeche)
//   "signed" -> wechselt im Grenzenbereich das Vorzeichen (echte Flaechenbilanz)

window.Game = window.Game || {};

Game.functionPool = [
  {
    id: "f-x",
    label: "f(x) = x",
    f: (x) => x,
    F: (x) => (x * x) / 2,
    domain: [0, 6],
    category: "easy",
  },
  {
    id: "f-const2",
    label: "f(x) = 2",
    f: () => 2,
    F: (x) => 2 * x,
    domain: [0, 6],
    category: "easy",
  },
  {
    id: "f-x2",
    label: "f(x) = x²",
    f: (x) => x * x,
    F: (x) => (x ** 3) / 3,
    domain: [0, 4],
    category: "easy",
  },
  {
    id: "f-halfx-1",
    label: "f(x) = 0,5x + 1",
    f: (x) => 0.5 * x + 1,
    F: (x) => 0.25 * x * x + x,
    domain: [0, 6],
    category: "easy",
  },
  {
    id: "f-4-x",
    label: "f(x) = 4 − x",
    f: (x) => 4 - x,
    F: (x) => 4 * x - (x * x) / 2,
    domain: [0, 4],
    category: "easy",
  },
  {
    id: "f-x2-plus1",
    label: "f(x) = x² + 1",
    f: (x) => x * x + 1,
    F: (x) => (x ** 3) / 3 + x,
    domain: [0, 3],
    category: "easy",
  },

  {
    id: "f-x-minus2",
    label: "f(x) = x − 2",
    f: (x) => x - 2,
    F: (x) => (x * x) / 2 - 2 * x,
    domain: [-1, 5],
    category: "signed",
  },
  {
    id: "f-x2-minus4",
    label: "f(x) = x² − 4",
    f: (x) => x * x - 4,
    F: (x) => (x ** 3) / 3 - 4 * x,
    domain: [-3, 3],
    category: "signed",
  },
  {
    id: "f-3-minus-x",
    label: "f(x) = 3 − x",
    f: (x) => 3 - x,
    F: (x) => 3 * x - (x * x) / 2,
    domain: [-1, 6],
    category: "signed",
  },
  {
    id: "f-sin",
    label: "f(x) = sin(x)",
    f: (x) => Math.sin(x),
    F: (x) => -Math.cos(x),
    domain: [0, 2 * Math.PI],
    category: "signed",
    // Grenzen fuer sin() sollen "schoene" Vielfache von PI/2 sein
    niceBounds: [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI],
  },
  {
    id: "f-x2-minus1",
    label: "f(x) = x² − 1",
    f: (x) => x * x - 1,
    F: (x) => (x ** 3) / 3 - x,
    domain: [-2, 2],
    category: "signed",
  },
  {
    id: "f-x3-minus4x",
    label: "f(x) = 0,5x³ − 2x",
    f: (x) => 0.5 * x * x * x - 2 * x,
    F: (x) => 0.125 * x ** 4 - x * x,
    domain: [-2, 2],
    category: "signed",
  },
];
