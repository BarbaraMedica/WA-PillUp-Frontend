//fejkani podaci i funkcije koje samo prikazuju kakobi mmi backend mogao raditi
const users = [
  {
    _id: "user-1",
    email: "demo@pillup.com",
    lozinka: "demo123",
    ime: "PillUp korisnik",
    settings: {
      zvuk: true,
      push: true,
      email: false
    }
  }
];

let currentUserId = users[0]._id;

const lijekovi = [
  {
    _id: "lijek-1",
    id: "lijek-1",
    ime: "Aspirin",
    doza: "500 mg",
    vrijeme: "08:00",
    kolicina: 20,
    trajanje: 10,
    ucestalost: 2,
    nacin: "oralno",
    preostalo: 12,
    podsjetnik: true
  },
  {
    _id: "lijek-2",
    id: "lijek-2",
    ime: "Vitamin D",
    doza: "2000 IU",
    vrijeme: "12:00",
    kolicina: 30,
    trajanje: 30,
    ucestalost: 1,
    nacin: "oralno",
    preostalo: 21,
    podsjetnik: false
  },
  {
    _id: "lijek-3",
    id: "lijek-3",
    ime: "Magnesium",
    doza: "250 mg",
    vrijeme: "20:00",
    kolicina: 15,
    trajanje: 15,
    ucestalost: 1,
    nacin: "oralno",
    preostalo: 9,
    podsjetnik: true
  }
];

const biljeske = [
  {
    _id: "biljeska-1",
    lijek_id: "lijek-1",
    lijek_ime: "Aspirin",
    vrsta: "djelotvornost",
    tekst: "Osjećam olakšanje u roku od sat vremena.",
    createdAt: new Date().toISOString()
  },
  {
    _id: "biljeska-2",
    lijek_id: "lijek-2",
    lijek_ime: "Vitamin D",
    vrsta: "biljeska",
    tekst: "Osjećam se energičnije tijekom dana.",
    createdAt: new Date().toISOString()
  }
];

const uzimanja = [
  {
    _id: "uzimanje-1",
    lijek: "lijek-1",
    vrijeme: "08:00",
    datum: new Date().toISOString(),
    status: "uzet"
  }
];

const raspolozenja = [
  { _id: "raspolozenje-1", datum: new Date().toISOString(), raspolozenje: "Sretan", stanje: "pozitivno" }
];

const tegobe = [
  { _id: "tegoba-1", datum: new Date().toISOString(), tegoba: "Glavobolja" }
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function getUserByToken(token) {
  if (!token) {
    return users.find((user) => user._id === currentUserId) || users[0];
  }
  const id = token.replace(/^token-/, "");
  return users.find((user) => user._id === id) || users.find((user) => user._id === currentUserId) || users[0];
}

function getMedicineById(id) {
  return lijekovi.find((lijek) => lijek._id === id || lijek.id === id) || null;
}

export default {
  getProfile(token) {
    const user = getUserByToken(token);
    return { ime: user.ime };
  },

  postaviIme(token, ime) {
    const user = getUserByToken(token);
    user.ime = ime;
    return { ime: user.ime };
  },

  getSettings(token) {
    const user = getUserByToken(token);
    return clone(user.settings);
  },

  saveSettings(token, settings) {
    const user = getUserByToken(token);
    user.settings = { ...user.settings, ...settings };
    return clone(user.settings);
  },

  getAllMedicines() {
    return clone(lijekovi);
  },

  getMedicine(id) {
    return clone(getMedicineById(id));
  },

  addMedicine(data) {
    const noviLijek = {
      _id: createId("lijek"),
      id: null,
      ime: data.ime || "Nepoznato",
      doza: data.doza || "",
      vrijeme: data.vrijeme || "08:00",
      kolicina: Number(data.kolicina) || 0,
      trajanje: Number(data.trajanje) || 0,
      ucestalost: Number(data.ucestalost) || 1,
      nacin: data.nacin || "oralno",
      preostalo: Number(data.preostalo) || Number(data.kolicina) || 0,
      podsjetnik: data.podsjetnik === undefined ? true : data.podsjetnik
    };
    noviLijek.id = noviLijek._id;
    lijekovi.push(noviLijek);
    return clone(noviLijek);
  },

  updateMedicine(id, data) {
    const lijek = getMedicineById(id);
    if (!lijek) return null;
    Object.assign(lijek, {
      ime: data.ime ?? lijek.ime,
      doza: data.doza ?? lijek.doza,
      vrijeme: data.vrijeme ?? lijek.vrijeme,
      nacin: data.nacin ?? lijek.nacin,
      kolicina: Number(data.kolicina) || lijek.kolicina,
      trajanje: Number(data.trajanje) || lijek.trajanje,
      ucestalost: Number(data.ucestalost) || lijek.ucestalost,
      podsjetnik: data.podsjetnik === undefined ? lijek.podsjetnik : data.podsjetnik,
      preostalo: Number(data.preostalo) || lijek.preostalo
    });
    lijek.id = lijek._id;
    return clone(lijek);
  },

  deleteMedicine(id) {
    const index = lijekovi.findIndex((lijek) => lijek._id === id || lijek.id === id);
    if (index === -1) return false;
    lijekovi.splice(index, 1);
    return true;
  },

  togglePodsjetnik(id) {
    const lijek = getMedicineById(id);
    if (!lijek) return null;
    lijek.podsjetnik = !lijek.podsjetnik;
    return clone(lijek);
  },

  getMedicinesWithNotifications() {
    return clone(lijekovi.filter((lijek) => lijek.podsjetnik));
  },

  addIntake(id, body) {
    const lijek = getMedicineById(id);
    if (!lijek) {
      throw new Error("Lijek nije pronađen");
    }
    const zapis = {
      _id: createId("uzimanje"),
      lijek: lijek._id,
      vrijeme: body.vrijeme || lijek.vrijeme,
      datum: new Date().toISOString(),
      status: "uzet"
    };
    uzimanja.push(zapis);
    if (lijek.preostalo > 0) {
      lijek.preostalo -= 1;
    }
    return clone(zapis);
  },

  getTodayIntakes() {
    const danas = new Date().toISOString().slice(0, 10);
    return clone(
      uzimanja
        .filter((zapis) => zapis.datum.slice(0, 10) === danas)
        .map((zapis) => ({
          ...zapis,
          lijek: clone(getMedicineById(zapis.lijek))
        }))
    );
  },

  getTakenMedicines() {
    return clone(
      uzimanja.map((zapis) => ({
        ...zapis,
        lijek: clone(getMedicineById(zapis.lijek))
      }))
    );
  },

  getNotes() {
    return clone(biljeske);
  },

  addNote(data) {
    const lijek = getMedicineById(data.lijek_id);
    const novaBiljeska = {
      _id: createId("biljeska"),
      lijek_id: data.lijek_id,
      lijek_ime: lijek?.ime || "Nepoznato",
      vrsta: data.vrsta || "biljeska",
      tekst: data.tekst || "",
      createdAt: new Date().toISOString()
    };
    biljeske.unshift(novaBiljeska);
    return clone(novaBiljeska);
  },

  getReportNotes() {
    return clone(
      biljeske.map((biljeska) => ({
        ...biljeska,
        lijek_id: clone(getMedicineById(biljeska.lijek_id))
      }))
    );
  },

  getMoodStats() {
    return {
      labels: ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"],
      stanje: [75, 80, 72, 78, 74, 82, 86],
      pozitivni: 68,
      neutralni: 22,
      negativni: 10
    };
  },

  getIntakeStats() {
    return {
      naVrijeme: 82,
      kasno: 12,
      preskoceno: 6
    };
  },

  getAnalyticsData() {
    return {
      avgMood: 78
    };
  },

  analyze(data) {
    const { adherence = 80, avgMood = 75, missed = 5 } = data || {};
    const interpretation = `Vaša terapija je trenutno na razini ${adherence}%. Prosječno raspoloženje je ${avgMood}%.`;
    const advice = missed > 5 ? "Pokušajte postaviti dodatne podsjetnike kako biste smanjili propuštena uzimanja." : "Nastavite trenutni ritam uzimanja i praktikujte redovite pauze.";
    const actions = [
      "Provjerite da li su obavijesti uključene u postavkama",
      "Dodajte bilješke o nuspojavama i učestalosti simptoma",
      "Ako se raspoloženje pogorša, savjetujte se s liječnikom"
    ];
    return {
      interpretation,
      advice,
      actions
    };
  },

  getPdfReport() {
    const content = `PillUp izvještaj\n\nKorisnik: ${getUserByToken().ime}\n\nDodani lijekovi: ${lijekovi.length}\n\nZabilježena uzimanja: ${uzimanja.length}\n`;
    return new Blob([content], { type: "application/pdf" });
  },

  register(data) {
    const found = users.find((user) => user.email === data.email);
    if (found) {
      throw new Error("Korisnik već postoji");
    }
    const noviKorisnik = {
      _id: createId("user"),
      email: data.email,
      lozinka: data.lozinka,
      ime: "PillUp korisnik",
      settings: {
        zvuk: true,
        push: true,
        email: false
      }
    };
    users.push(noviKorisnik);
    currentUserId = noviKorisnik._id;
    return {
      token: `token-${noviKorisnik._id}`
    };
  },

  login(data) {
    const korisnik = users.find((user) => user.email === data.email && user.lozinka === data.lozinka);
    if (!korisnik) {
      const err = new Error("Neispravan korisnik ili lozinka");
      err.status = 401;
      throw err;
    }
    currentUserId = korisnik._id;
    return {
      token: `token-${korisnik._id}`
    };
  },

  addMood(data) {
    const novi = {
      _id: createId("mood"),
      datum: data.datum || new Date().toISOString(),
      raspolozenje: data.raspolozenje || "Neutralno",
      stanje: data.stanje || "neutralno"
    };
    raspolozenja.push(novi);
    return clone(novi);
  },

  addComplaint(data) {
    const novi = {
      _id: createId("tegoba"),
      datum: data.datum || new Date().toISOString(),
      tegoba: data.tegoba || "Nije definirano"
    };
    tegobe.push(novi);
    return clone(novi);
  }
};
