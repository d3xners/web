// Minimal Firebase auth frontend (ES module). Doplň firebaseConfig v README a vymeniť PLACEHOLDER hodnoty.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  linkWithCredential
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/*
  DOPLŇ sem svoju Firebase konfiguráciu (pokyny v README).
  Príklad:
  const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    appId: "APP_ID"
  };
*/
const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  appId: "REPLACE_ME"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Helper: update status element if present
function setStatus(msg, id = "status") {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

onAuthStateChanged(auth, (user) => {
  // This runs on all pages — if there is a #user-status element, update it.
  const statusEl = document.getElementById("user-status");
  if (statusEl) {
    if (user) {
      statusEl.textContent = `Prihlásený: ${user.uid}${user.isAnonymous ? " (anonym)" : ""}`;
    } else {
      statusEl.textContent = "Nie ste prihlásený";
    }
  }
});

// EXPORTS for pages that include this module
export async function doAnonymousRegister() {
  try {
    const result = await signInAnonymously(auth);
    setStatus("Registrovaný anonymne. Môžeš si neskôr pridať email.", "status-register");
    console.log("anon user", result.user.uid);
  } catch (err) {
    console.error(err);
    setStatus("Chyba pri anonymnej registrácii: " + err.message, "status-register");
  }
}

export async function doRegisterEmail(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    setStatus("Registrovaný a prihlásený s e‑mailom", "status-register");
  } catch (err) {
    console.error(err);
    setStatus("Chyba pri registrácii: " + err.message, "status-register");
  }
}

export async function doLoginEmail(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setStatus("Prihlásenie úspešné", "status-login");
  } catch (err) {
    console.error(err);
    setStatus("Chyba pri prihlásení: " + err.message, "status-login");
  }
}

export async function doLogout() {
  await signOut(auth);
  setStatus("Odhlásený", "status-login");
}

// Link anonymous account with email/password (user must be signed in anonymously)
export async function linkEmailToAnon(email, password) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Nie si prihlásený");
    if (!user.isAnonymous) throw new Error("Tento účet už nie je anonymný");
    const credential = EmailAuthProvider.credential(email, password);
    const linked = await linkWithCredential(user, credential);
    setStatus("Email pridaný k účtu", "status-link");
    console.log("linked", linked.user);
  } catch (err) {
    console.error(err);
    setStatus("Chyba pri pridávaní emailu: " + err.message, "status-link");
  }
}

// If this script is loaded directly on a page with specific forms, attach handlers:
document.addEventListener("DOMContentLoaded", () => {
  const anonBtn = document.getElementById("anon-register");
  if (anonBtn) anonBtn.addEventListener("click", () => doAnonymousRegister());

  const regForm = document.getElementById("register-form");
  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = regForm.querySelector('input[name="email"]').value;
      const pw = regForm.querySelector('input[name="password"]').value;
      doRegisterEmail(email, pw);
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[name="email"]').value;
      const pw = loginForm.querySelector('input[name="password"]').value;
      doLoginEmail(email, pw);
    });
  }

  const linkForm = document.getElementById("link-form");
  if (linkForm) {
    linkForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = linkForm.querySelector('input[name="email"]').value;
      const pw = linkForm.querySelector('input[name="password"]').value;
      linkEmailToAnon(email, pw);
    });
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", () => doLogout());
});