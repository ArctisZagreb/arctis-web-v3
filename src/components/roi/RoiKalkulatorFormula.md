Gdje `Σ` označava zbrajanje ušteda iz svih uključenih kategorija (Prostor, Održavanje, Administracija, Opcionalno).

## 3. Kategorije Izračuna i Formule

Kalkulator prikuplja podatke kroz nekoliko ključnih sekcija. Korisnik može odabrati (uključiti/isključiti) koje sekcije želi koristiti u izračunu.

### A) Upravljanje Prostorom (Space Management & Utilization)

- **Cilj uštede:** Smanjiti troškove povezane s neiskorištenim ili neoptimalno korištenim prostorom. Archibus pomaže identificirati takve prostore i donijeti odluke o njihovoj prenamjeni, otkazivanju najma ili boljoj alokaciji.
- **Potrebni Unosi od Klijenta:**
  - `Ukupna Površina Prostora (m²)`: Kolikom površinom upravljaju.
  - `Prosječni Godišnji Trošak po m² (€/m²)`: Cijena vlasništva/najma i održavanja po kvadratu.
  - `Procijenjeni Postotak Neiskorištenog Prostora (%)`: Koliko prostora nije u punoj funkciji.
- **Logika Formule:**
  1.  Izračunaj _Ukupni Godišnji Trošak Neiskorištenog Prostora_: `(Ukupna Površina * % Neiskorištenog Prostora / 100) * Prosječni Trošak po m²`
  2.  Izračunaj _Procijenjenu Uštedu_: `(Ukupni Godišnji Trošak Neiskorištenog Prostora) * Faktor Poboljšanja Iskorištenosti (%)`
  - _Faktor Poboljšanja Iskorištenosti (naša pretpostavka, npr. 15%):_ Predstavlja postotak troška neiskorištenog prostora koji se realno može uštedjeti ili prenamijeniti uz Archibus alate.

### B) Upravljanje Održavanjem (Maintenance Management)

- **Cilj uštede:** Smanjiti troškove reaktivnog (hitnog) održavanja, koje je skuplje od planiranog, i optimizirati troškove vanjskih izvođača. Archibus omogućuje bolje planiranje, praćenje radnih naloga i analizu troškova.
- **Potrebni Unosi od Klijenta:**
  - `Broj Zaposlenika u Održavanju`: Interni tim.
  - `Prosječna Godišnja Bruto Plaća Zaposlenika Održavanja (€)`: Trošak internog tima.
  - `Procijenjeni Postotak Vremena na Reaktivno Održavanje (%)`: Koliko se vremena gubi na "gašenje požara".
  - `Godišnji Trošak Vanjskih Usluga Održavanja (€)`: Koliko se plaća vanjskim tvrtkama.
- **Logika Formule:** Sastoji se od dva dijela:
  1.  _Ušteda na Internom Održavanju:_
      - Izračunaj _Trošak Vremena Potrošenog na Reaktivno Održavanje_: `(Broj Zaposlenika * Prosječna Plaća) * (% Vremena na Reaktivno / 100)`
      - Izračunaj _Procijenjenu Uštedu_: `(Trošak Vremena Potrošenog na Reaktivno Održavanje) * Faktor Smanjenja Reaktivnog Održavanja (%)`
      - _Faktor Smanjenja Reaktivnog Održavanja (naša pretpostavka, npr. 25%):_ Postotak smanjenja neefikasnog reaktivnog rada prelaskom na plansko održavanje.
  2.  _Ušteda na Vanjskom Održavanju:_
      - Izračunaj _Procijenjenu Uštedu_: `(Godišnji Trošak Vanjskih Usluga) * Faktor Optimizacije Vanjskih Troškova (%)`
      - _Faktor Optimizacije Vanjskih Troškova (naša pretpostavka, npr. 10%):_ Postotak uštede ostvariv kroz bolju kontrolu i analizu vanjskih usluga.
  3.  _Ukupna Ušteda (Održavanje)_ = Ušteda na Internom + Ušteda na Vanjskom.

### C) Administrativna Učinkovitost (Administrative Efficiency)

- **Cilj uštede:** Smanjiti vrijeme (i time trošak) koje administrativno osoblje troši na ručne, repetitivne zadatke poput unosa podataka, traženja informacija i izrade izvještaja. Archibus automatizira mnoge od tih procesa.
- **Potrebni Unosi od Klijenta:**
  - `Broj Osoba u Administraciji Nekretnina/FM-a`: Osoblje koje radi ove poslove.
  - `Prosječna Godišnja Bruto Plaća Admin Osoblja (€)`: Trošak tog osoblja.
  - `Procijenjeni Postotak Vremena na Ručni Rad (%)`: Koliko vremena odlazi na neautomatizirane zadatke.
- **Logika Formule:**
  1.  Izračunaj _Trošak Vremena Potrošenog na Ručni Rad_: `(Broj Admin Osoba * Prosječna Plaća) * (% Vremena na Ručni Rad / 100)`
  2.  Izračunaj _Procijenjenu Uštedu_: `(Trošak Vremena Potrošenog na Ručni Rad) * Faktor Smanjenja Ručnog Rada (%)`
  - _Faktor Smanjenja Ručnog Rada (naša pretpostavka, npr. 30%):_ Postotak smanjenja ručnog rada koji se postiže automatizacijom i centralizacijom podataka u Archibusu.

### D) Opcionalno: Energija i Imovina (Energy & Assets)

- **Cilj uštede:** Identificirati prilike za smanjenje potrošnje energije kroz bolje praćenje i analizu (ako Archibus moduli to podržavaju) te smanjiti troškove povezane s gubitkom ili neefikasnim upravljanjem imovinom (namještaj, oprema).
- **Potrebni Unosi od Klijenta:**
  - `Procijenjeni Godišnji Trošak Energije (€)`.
  - `Procijenjena Vrijednost Imovine (€)`.
- **Logika Formule:**
  1.  _Ušteda na Energiji_: `(Godišnji Trošak Energije) * Faktor Uštede Energije (%)`
      - _Faktor Uštede Energije (naša pretpostavka, npr. 8%):_ Postotak smanjenja troškova energije moguć kroz bolje praćenje.
  2.  _Ušteda na Imovini_: `(Procijenjena Vrijednost Imovine) * Faktor Smanjenja Gubitka Imovine (%)`
      - _Faktor Smanjenja Gubitka Imovine (naša pretpostavka, npr. 3%):_ Postotak vrijednosti imovine čiji se trošak (gubitak, zamjena) može izbjeći boljim praćenjem.
  3.  _Ukupna Ušteda (Opcionalno)_ = Ušteda na Energiji + Ušteda na Imovini.

## 4. Ukupna Procijenjena Godišnja Ušteda

Rezultat koji se prikazuje korisniku je **zbroj procijenjenih ušteda iz svih sekcija koje je korisnik uključio** (`Space` + `Maintenance` + `Admin` + `Optional`).

## 5. Ključne Pretpostavke i Ograničenja

- **Procjena, ne Garancija:** Naglašavamo da su rezultati _procjena_. Stvarne uštede ovise o preciznosti unesenih podataka, specifičnostima poslovanja klijenta i kvaliteti implementacije Archibusa.
- **Faktori Poboljšanja:** Korišteni postoci (npr. 15%, 25%, 30%) su **naše stručne pretpostavke** temeljene na iskustvu i industrijskim prosjecima. Oni su ključni za izračun i predstavljaju prosječni potencijal koji Archibus donosi.
- **Fokus na Uštede:** Kalkulator primarno prikazuje _potencijalne godišnje uštede_ u operativnim troškovima. Ne uključuje inicijalni trošak investicije u Archibus (licence, implementacija), iako se taj podatak može koristiti za kasniji izračun punog ROI-a (Povrata Investicije).

## Zaključak

ROI kalkulator je vrijedan alat za kvantificiranje potencijalnih benefita Archibusa. Koristeći podatke klijenta o njihovim trenutnim operacijama i primjenjujući realne faktore poboljšanja, on pruža opipljivu procjenu godišnjih ušteda, pomažući klijentima da lakše sagledaju financijsku isplativost ulaganja u moderno IWMS rješenje.
