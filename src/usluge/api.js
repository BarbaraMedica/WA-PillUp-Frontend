import store from "./store.js";

const delay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

const wrapResponse = (data) => Promise.resolve({ data });

const createError = (status, message) => {
  const error = new Error(message);
  error.response = { status, data: { message } };
  return error;
};

const getToken = () => (typeof localStorage !== "undefined" ? localStorage.getItem("token") : null);

const handleGet = async (path, config = {}) => {
  await delay();
  const token = getToken();

  if (path === "/korisnik/profil") {
    return wrapResponse(store.getProfile(token));
  }

  if (path === "/korisnik/postavke") {
    return wrapResponse(store.getSettings(token));
  }

  if (path === "/lijekovi") {
    return wrapResponse(store.getAllMedicines());
  }

  if (path === "/lijekovi/danasnja-uzimanja") {
    return wrapResponse(store.getTodayIntakes());
  }

  if (path === "/lijekovi/sa-podsjetnicima") {
    return wrapResponse(store.getMedicinesWithNotifications());
  }

  if (path === "/biljeske") {
    return wrapResponse(store.getNotes());
  }

  if (path === "/statistika/raspolozenje") {
    return wrapResponse(store.getMoodStats());
  }

  if (path === "/statistika/uzimanje") {
    return wrapResponse(store.getIntakeStats());
  }

  if (path === "/analiza") {
    return wrapResponse(store.getAnalyticsData());
  }

  if (path === "/izvjestaj/uzeti-lijekovi") {
    return wrapResponse(store.getTakenMedicines());
  }

  if (path === "/izvjestaj/biljeske") {
    return wrapResponse(store.getReportNotes());
  }

  if (path === "/korisnik/postavke") {
    return wrapResponse(store.getSettings(token));
  }

  if (path === "/izvjestaj/pdf") {
    const blob = store.getPdfReport();
    return wrapResponse(blob);
  }

  if (path.startsWith("/lijekovi/")) {
    const route = path.replace("/lijekovi/", "");
    if (route.includes("/")) {
      return Promise.reject(createError(404, "Nepoznata ruta"));
    }
    return wrapResponse(store.getMedicine(route));
  }

  return Promise.reject(createError(404, "Nepoznata GET ruta"));
};

const handlePost = async (path, body) => {
  await delay();
  const token = getToken();

  if (path === "/autentikacija/registracija") {
    const result = store.register(body);
    return wrapResponse(result);
  }

  if (path === "/autentikacija/prijava") {
    try {
      const result = store.login(body);
      return wrapResponse(result);
    } catch (error) {
      return Promise.reject(createError(401, error.message));
    }
  }

  if (path === "/korisnik/postavi-ime") {
    return wrapResponse(store.postaviIme(token, body.ime));
  }

  if (path === "/korisnik/postavke") {
    return wrapResponse(store.saveSettings(token, body));
  }

  if (path === "/lijekovi") {
    return wrapResponse(store.addMedicine(body));
  }

  if (path === "/biljeske") {
    return wrapResponse(store.addNote(body));
  }

  if (path === "/raspolozenja") {
    return wrapResponse(store.addMood(body));
  }

  if (path === "/tegobe") {
    return wrapResponse(store.addComplaint(body));
  }

  if (path.startsWith("/analiza/analyze")) {
    return wrapResponse(store.analyze(body));
  }

  if (path.startsWith("/lijekovi/")) {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 3 && segments[2] === "uzimanje") {
      return wrapResponse(store.addIntake(segments[1], body));
    }
  }

  return Promise.reject(createError(404, "Nepoznata POST ruta"));
};

const handlePut = async (path, body) => {
  await delay();

  if (path.startsWith("/lijekovi/")) {
    const id = path.replace("/lijekovi/", "");
    const updated = store.updateMedicine(id, body);
    if (!updated) {
      return Promise.reject(createError(404, "Lijek nije pronađen"));
    }
    return wrapResponse(updated);
  }

  return Promise.reject(createError(404, "Nepoznata PUT ruta"));
};

const handleDelete = async (path) => {
  await delay();

  if (path.startsWith("/lijekovi/")) {
    const id = path.replace("/lijekovi/", "");
    const deleted = store.deleteMedicine(id);
    if (!deleted) {
      return Promise.reject(createError(404, "Lijek nije pronađen"));
    }
    return wrapResponse({ success: true });
  }

  return Promise.reject(createError(404, "Nepoznata DELETE ruta"));
};

const handlePatch = async (path) => {
  await delay();

  if (path.startsWith("/lijekovi/") && path.endsWith("/toggle-podsjetnik")) {
    const id = path.replace("/lijekovi/", "").replace("/toggle-podsjetnik", "");
    const updated = store.togglePodsjetnik(id.replace(/\/$/, ""));
    if (!updated) {
      return Promise.reject(createError(404, "Lijek nije pronađen"));
    }
    return wrapResponse(updated);
  }

  return Promise.reject(createError(404, "Nepoznata PATCH ruta"));
};

const api = {
  get: (url, config) => handleGet(url, config),
  post: (url, data) => handlePost(url, data),
  put: (url, data) => handlePut(url, data),
  delete: (url) => handleDelete(url),
  patch: (url, data) => handlePatch(url, data)
};

export default api;
