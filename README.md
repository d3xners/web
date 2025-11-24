# Dexner — statický starter s Firebase Auth

Tento projekt je jednoduchý statický web (HTML/CSS/JS) so základnou autentifikáciou cez Firebase. Umožňuje:
- anonymnú registráciu (bez e‑mailu),
- registráciu s e‑mailom a heslom,
- pridanie e‑mailu k existujúcemu anonymnému účtu.

Čo potrebuješ urobiť pred nasadením
1. Vytvor Firebase projekt
   - Prejdi na https://console.firebase.google.com/
   - Vytvor nový projekt (názov napr. dexner-site)
   - V sekcii Authentication → Sign-in method povol:
     - Anonymous
     - Email/Password
   - V Project settings → Web apps pridaj novú web app a skopíruj firebaseConfig (apiKey, authDomain, projectId, appId).

2. Doplň firebaseConfig
   - Otvor `app.js` a nahraď objekt `firebaseConfig` hodnotami z tvojej Firebase web app.

3. Vytvor GitHub repozitár (napr. `dexner-xyz`) a pushni súbory
   - Lokálne:
     git init
     git add .
     git commit -m "Initial site with Firebase auth"
     git branch -M main
     git remote add origin https://github.com/your-username/dexner-xyz.git
     git push -u origin main

4. Nastav GitHub Pages
   - V GitHub repo → Settings → Pages vyber branch `main` a priečinok `/ (root)`.
   - Pridaj súbor `CNAME` (obsah už je v tomto repozitári: `dexner.xyz`) alebo v Pages nastaveniach zadaj custom domain dexner.xyz.
   - Certifikát GitHub Pages môže chvíľu trvať.

5. DNS v Cloudflare (keď budeš pripravený presmerovať doménu)
   - Pridaj 4 A záznamy pre apex `@` na IP:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   - Pridaj CNAME pre `www` → `your-github-username.github.io`
   - Dôležité: u A a CNAME nastav Cloudflare proxy na DNS-only (šedý cloud), inak môžu nastať problémy s TLS pri GitHub Pages.
   - Po pár minútach až hodine by malo všetko fungovať.

Dôležité poznámky o bezpečnosti
- Anonymná autentifikácia a lokálne stránky sú v poriadku pre rýchly štart, ale ak budeš ukladať súkromné dáta alebo chránený obsah, zváž pridanie backendu alebo pravidiel zabezpečenia.
- API kľúče v `firebaseConfig` sú bezpečné ako "public" klientské kľúče pre Firebase, no db rules a storage rules treba správne nastaviť.

Ak chceš, môžem:
- vytvoriť GitHub repozitár za teba (potrebuješ mi dať oprávnenie alebo to spravím, keď mi povíš že mám pokračovať), alebo
- poslať ZIP s týmito súbormi, alebo
- krok‑po‑kroku pomôcť pri nastavení Firebase a DNS v Cloudflare.
