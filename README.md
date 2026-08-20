# HOLLEN Evidence vad – online verze

## Co obsahuje
- `index.html` – aplikace se dvěma režimy: Operátor a Admin
- `firebase.json` – konfigurace pro Firebase Hosting
- `firestore.rules` – základní pravidla databáze
- `storage.rules` – základní pravidla pro fotografie

## Rychlý test
Otevřete `index.html` v prohlížeči. Bez Firebase konfigurace funguje jako testovací verze v jednom zařízení.

## Skutečný online provoz
1. Vytvořte Firebase projekt a zaregistrujte Web App.
2. Aktivujte Cloud Firestore a Cloud Storage.
3. V `index.html` nahraďte objekt `CLOUD_CONFIG` údaji z Firebase Web App.
4. Nahrajte projekt na Firebase Hosting.

DŮLEŽITÉ: Dodaná pravidla jsou pouze pro první technický test. Před ostrým nasazením je nutné přidat přihlášení uživatelů a omezit přístup podle rolí.
