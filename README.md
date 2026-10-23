# Pysty Studio – verkkosivu

Pysty Studion oma staattinen sivusto: pelkkää HTML:ää, CSS:ää ja JavaScriptiä ilman taustapalvelinta. Sivu toimii sellaisenaan GitHub Pagesissa. Tehty 23.10.2026. Englanninkieliset sivut ja valuuttavalinta (EUR / USD) lisättiin 23.10.2026.

## Tiedostot

| Tiedosto | Mitä siinä on |
|---|---|
| `index.html` | Etusivu: hero ja esimerkkiklippi, Näin se toimii, Mitä klipeissä on, Palvelut ja hinnat (näytelaatikko, kuukausipaketti, kertaerä sekä avattavat Muut palvelut ja Lisäpalvelut), Referenssit (piilossa), Kuka klipit tekee, Usein kysyttyä ja Yhteys |
| `tietosuoja.html` | Tietosuojaseloste (luonnos, pohjana `02_sopimukset-ja-laki/2026-10-21_dpa-ja-tietosuoja.md`) |
| `naytteet.html` | Ilmaisten näytteiden ehdot (sanatarkasti `02_sopimukset-ja-laki/2026-10-23_nayte-ehdot.md`, osio 1). Linkki alapalkissa ja CTA-nappien alla. |
| `en/index.html` | Etusivu englanniksi (sama rakenne ja samat säätimet) |
| `en/samples.html` | Näytteiden ehdot englanniksi. Kohta 6 ja käännösmerkintä ovat Tuomarin tekstejä. |
| `en/privacy.html` | Tietosuojaseloste englanniksi, lopussa käännösmerkintä (Tuomarin teksti) |
| `tarjous.html` | Räätälöity tarjous: palvelut valittavina, hinta-arvio ja tarjouspyyntö sähköpostilla |
| `en/quote.html` | Räätälöity tarjous englanniksi (Custom quote) |
| `assets/tyyli.css` | Kaikki tyylit. Brändivärit ja fontit ovat tiedoston alussa `:root`-osassa. |
| `assets/sivu.js` | Avattavien osioiden (`<details>`) avaus ankkurilla sekä heron esimerkkiklippi: tekstitys sana kerrallaan ja puhujan vaihto. Repliikit suomeksi ja englanniksi sivun kielen mukaan. |
| `assets/hintadata.js` | **Kaikki hinnat ja EUR/USD-kurssi yhdessä paikassa.** Molemmat kielet käyttävät tätä. |
| `assets/valuutta.js` | Valuuttavalitsin (EUR / USD), valinnan muistaminen ja rahasummien muotoilu |
| `assets/hinnat.js` | Hintojen liukusäätimet, Klippaamon apusäätimet (videoita × klippiä per video), Klippitilin hoidon alustavalinta ja Räätälöity tarjous -linkkien valinnat |
| `assets/tarjous.js` | Tarjoussivun laskenta, yhteenveto, sähköpostiviesti (mailto) ja Kopioi viesti -nappi |
| `assets/logo.svg` | Nimilogo PYSTY\|STUDIO vaalealle pohjalle (konsepti 4, Pystyviiva). Yläpalkissa. |
| `assets/logo-tumma.svg` | Nimilogo tummalle pohjalle. Mustassa alapalkissa. |
| `assets/favicon.svg` | Selainvälilehden kuvake (P\| mustalla pohjalla) |
| `assets/apple-touch-icon.png` | 180 × 180 px kuvake iPhonen kotivalikkoon ja PNG-varakuvake (kopio tiedostosta `08_brandi/logo/png/2026-10-23_pysty-logo-favicon-180.png`) |
| `assets/jakokuva.png`, `assets/jakokuva-en.png` | Somejakojen kuva (`og:image`) 1200 × 630, suomeksi ja englanniksi (ks. Hakukoneet ja somejaot) |
| `assets/ilme-uusi.css`, `assets/ilme-uusi.js` | Uuden ilmeen esikatselu, joka on käytössä vain osoitteella `?uusi=1` (ks. Uuden ilmeen esikatselu) |
| `404.html` | Oma ”Sivua ei löytynyt” -sivu suomeksi ja englanniksi. Polut alkavat `/PystyStudio/`, koska GitHub Pages näyttää sivun mistä tahansa puuttuvasta osoitteesta. |
| `.nojekyll` | Kertoo GitHub Pagesille, että sivu julkaistaan sellaisenaan |

## Esikatselu omalla koneella

Avaa `index.html` selaimessa tuplaklikkaamalla. Sivu toimii ilman palvelinta.

## Kielet (suomi ja englanti)

Suomenkieliset sivut ovat juuressa ja englanninkieliset kansiossa `en/`. Assetit ovat yhteiset (`../assets/`).

| Suomeksi | Englanniksi |
|---|---|
| `index.html` | `en/index.html` |
| `naytteet.html` | `en/samples.html` |
| `tietosuoja.html` | `en/privacy.html` |
| `tarjous.html` | `en/quote.html` |

- **Kielivalitsin FI | EN** on jokaisen sivun yläpalkissa (`<nav class="kielet">`). Linkki vie vastaavalle sivulle toisella kielellä. Nykyisen kielen linkissä on `aria-current="page"`.
- **Hakukoneet:** jokaisen sivun `<head>`-osassa on `hreflang`-linkit (fi, en ja x-default = suomi). Osoitteet ovat täysiä osoitteita (`https://mestarihannes.github.io/PystyStudio/...`). Jos sivulle tulee oma verkkotunnus, vaihda ne kaikista HTML-tiedostoista.
- **Kun suomenkielinen teksti muuttuu,** päivitä sama kohta englanninkieliseen sivuun. Ehtojen ja tietosuojan englanninkieliset versiot ovat käännöksiä, ja niiden lopussa kerrotaan, että suomenkielinen versio on ensisijainen.
- **Englanninkielisten sivujen alv- ja laskutustekstit ovat Tuomarin tekstejä (23.10.2026), ja niitä käytetään sanatarkasti:**
  - alv: ”Prices exclude VAT. Finnish customers: VAT 25.5% is added. EU businesses with a valid VAT number: 0% VAT (reverse charge). Businesses outside the EU: 0% VAT. Services are for businesses only.”
  - laskutus: ”Invoicing is handled by Suomen Keikkalasku (Business ID 2883508-5), a Finnish invoicing service. Your agreement is with Hannes Korkiakoski, trading as Pysty Studio.”
- **Tuotenimet** Klippaamo (Starter, Pro) ja Pysty Puhe ovat englanniksikin samat. Muut nimet on käännetty (esim. Kertaerä = Single batch, Arkisto = Archive).

## Valuutta (EUR / USD)

Hintaosion alussa on valitsin **€ EUR | $ USD**. Se vaihtaa kaikki sivun hinnat: kiinteät hinnat, säädinten hinnat, alv-rivit, €/klippi-rivit, lisäpalvelut ja ruudunlukijan tekstit (`aria-valuetext`).

- **Laskut ovat aina euroissa,** joten USD-tilassakin euro näkyy:
  - isoissa hinnoissa dollarisumma on isolla (”≈ 391 $”) ja euro pienellä sen alla
  - tekstin sisällä euro ensin ja dollari arviona perässä, esim. ”438 €/kk (≈ 491 $)”
  - dollarit pyöristetään lähimpään kokonaiseen dollariin. Muoto on suomeksi ”269 $” ja englanniksi ”$269”.
- **USD-tilassa valitsimen alla näkyy huomautus** (Tuomarin teksti). Sen sanamuoto on HTML:ssä valitsimen `data-malli`-kentässä, ja kurssi sekä päivämäärä tulevat kohtiin `{kurssi}` ja `{pvm}` tiedostosta `hintadata.js`.
- **Valinnan muistaminen:** valinta tallennetaan selaimen localStorageen (avain `pystystudio-valuutta`), joten se säilyy sivulta ja kieleltä toiselle. Jos selain estää tallennuksen, valinta pätee vain avoimella sivulla. Tämä on kerrottu tietosuojaselosteessa (kohta Sivuston käyttö).
- **Linkki suoraan dollareihin:** `?currency=usd`, esim. `https://mestarihannes.github.io/PystyStudio/en/?currency=usd`. Parametri voittaa tallennetun valinnan. Oletus on EUR molemmilla kielillä.
- **Ilman JavaScriptiä** näkyvät euromääräiset hinnat, ja valitsin on piilossa.

### Kurssin päivitys

Kurssi on kiinteä, ja se on vain yhdessä paikassa: `assets/hintadata.js`, rivi `kurssi: { usd: 1.1205, pvm: '2026-10-22' }`.

Nykyinen kurssi on Euroopan keskuspankin virallinen EUR/USD-viitekurssi 22.10.2026: **1 € = 1,1205 USD**. Kurssi päivitetään käsin, kun halutaan:

1. Avaa EKP:n viitekurssit: https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html (tai koneluettava https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml).
2. Katso rivi USD (US dollar) ja päivämäärä. EKP julkaisee kurssit arkipäivisin noin klo 16 Keski-Euroopan aikaa.
3. Vaihda `hintadata.js`:ään `usd`-arvoksi kurssi pisteellä (esim. `1.0950`) ja `pvm`-arvoksi päivä muodossa `VVVV-KK-PP`.
4. Julkaise (ks. Julkaisu). Muuta ei tarvitse muuttaa: dollarihinnat ja huomautuksen kurssi päivittyvät itsestään.

## Yhteystiedot

Sähköposti, puhelin ja nimi ovat kaikissa HTML-tiedostoissa (Yhteys-osio, napit ja alapalkki sekä tietosuojaselosteet). Jos jokin niistä muuttuu, vaihda se Etsi ja korvaa -toiminnolla kaikista tiedostoista. Vaihda myös `mailto:`- ja `tel:`-linkit.

- **Referenssit-osio** on piilotettu (`hidden`), kunnes asiakkaalta on lupa. Kun klipit ovat paikallaan, poista `hidden` osion `<section>`-tagista (molemmilla kielillä).
- **Y-tunnusta ei ole,** joten sitä ei ole lisätty. Kun Oy perustetaan, lisää Y-tunnus alapalkkiin ja tietosuojaselosteeseen ja päivitä UKK:n kohta ”Miksi lasku tulee Keikkalaskulta?” molemmilla kielillä. Englanninkielinen laskutusrivi on Tuomarin teksti, joten muutos tarkistetaan Tuomarilla.

## Logo ja ilme

Sivu käyttää logokonseptia 4, Pystyviiva, jonka Hannes valitsi 23.10.2026. Lähteet ja perustelut ovat kansiossa `08_brandi` (`2026-10-23_logo-perustelut.md`, osio 4). Edelliset väliaikaiset logo ja kuvake on arkistoitu kansioon `99_arkisto` (`2026-10-23_verkkosivu-logo-valiaikainen.svg` ja `2026-10-23_verkkosivu-favicon-valiaikainen.svg`).

- **Värit:** musta `#000000`, tekstityskeltainen `#FFE100`, valkoinen `#FFFFFF` ja betoni `#E4E4E1` (sivun tausta). Ne ovat `assets/tyyli.css`:n alussa `:root`-osassa. Esimerkkiklipin studio käyttää `--k-…`-muuttujia. `theme-color` on musta kaikkien HTML-tiedostojen `<head>`-osassa.
- **Keltaisen käyttö:** keltainen erottuu valkoisesta ja betonista huonosti (1,3:1). Sitä käytetään vain mustalla pohjalla (yhteysosio ja alapalkki), korostuksena mustan tekstin takana (linkkien ja nappien hover, valittu valuutta) tai mustan reunan kanssa (otsikon pystyviiva, vaiheiden numerot, merkit ja aikajanan kohdat). Keltaista tekstiä ei käytetä vaalealla pohjalla.
- **Fontit:** Big Shoulders Display (900) otsikoissa ja Figtree leipätekstissä. Muuttujat `--fontti-…` ja Google Fonts -linkki `<head>`-osassa.
- **Logon vaihto:** korvaa `assets/logo.svg` ja `assets/logo-tumma.svg` samoilla nimillä. Jos kuvasuhde muuttuu, päivitä `<img>`-tagien `width`- ja `height`-arvot (kaikki HTML-tiedostot, ylä- ja alapalkki). Vaalea logo on 537 × 121 ja tumma 537 × 112. Korkeus asetetaan CSS:ssä (`.logo img` ja `.alapalkki-logo`), joten leveys seuraa kuvasuhdetta.
- **Kuvake:** `assets/favicon.svg`, iPhonelle ja PNG-varalle `assets/apple-touch-icon.png`.

## Hintojen muokkaus

**Hinnat ovat tiedostossa `assets/hintadata.js`** (euroja, alv 0 %). Sieltä ne tulevat kummankin kielen etusivulle, ja JavaScript kirjoittaa ne sivulle.

Etusivuilla (`index.html` ja `en/index.html`) on samat hinnat myös näkyvinä teksteinä sitä varten, että sivu toimii ilman JavaScriptiä. **Kun muutat hintaa:**

1. Muuta hinta `hintadata.js`:ään.
2. Muuta sama hinta näkyvään tekstiin molemmissa HTML-tiedostoissa. Säädinkorteissa tämä koskee vain oletusporrasta (ks. alla).
3. Tarkista UKK: lisäkorjaus (15 €) ja suomeksi alv 25,5 %.

Hinnat ovat yhdessä osiossa **Palvelut ja hinnat** (`<section id="hinnat">`, englanniksi `id="pricing"`). Osio kevennettiin Hanneksen päätöksellä 23.10.2026 (`04_myynti/2026-10-23_sivuston-tarkistus-ja-korjaukset.md`):

1. Alussa kohderyhmä ja alv, laatikko **Aloita ilmaisilla näytteillä** ja lupaukset.
2. Näkyvissä ovat **Kuukausipaketti** (Klippaamo ja laskuri) ja **Kertatyö** (Kertaerä).
3. Avattava `<details id="muut-palvelut">` (englanniksi `other-services`): Kaikki valmiina, Pysty Puhe ja AI-mainospaketti.
4. Avattava `<details id="lisapalvelut">` (englanniksi `add-ons`): lisäpalvelujen hinnasto A, jonka Hannes hyväksyi sivustolle 23.10.2026. Otsikossa on lisäpalvelujen määrä (18): päivitä se, jos rivejä tulee tai lähtee.
5. Maksuehdot ja Räätälöity tarjous -painike.

- **Avattavat osiot** toimivat ilman JavaScriptiä. Säätimet toimivat niiden sisällä samoin kuin muualla.
- **Automaattinen avaus:** osio avautuu, kun sivulle tullaan ankkurilla, joka on osion sisällä tai osio itse (esim. `index.html#lisapalvelut`, `#klippitilin-hoito`, `#arkisto`, `#muut-palvelut`, `#ai-mainospaketti`; englanniksi `#add-ons`, `#clip-account`, `#archive`, `#other-services`), ja kun osoitteessa on osion säätimen valinta (esim. `?tilinhoito=20&alustat=tiktok,shorts` tai `?aiMainos=10`).
- **Valinnat osoitteessa:** kun kävijä liikuttaa säädintä, valinta päivitetään myös etusivun omaan osoitteeseen samassa muodossa kuin tarjoussivun esitäytössä (esim. `index.html?klippaamo=16`). Takaisin-napilla palatessa ja jaetusta linkistä säätimet palautuvat. Säätimissä on `autocomplete="off"`, jotta selain ei palauta vanhaa arvoa tekstin ja hinnan ohi.

Tarjoussivuilla (`tarjous.html` ja `en/quote.html`) ei ole hintoja HTML:ssä: JavaScript hakee ne `hintadata.js`:stä. Jos portaat muuttuvat, päivitä tarjoussivujen valintalistat (`<select data-koko>`).

Jokainen palvelu on oma `<li class="hintarivi">`-rivinsä: nimi on `<h4>`-tagissa, kuvaus `<p>`-tagissa ja hinta `<span class="summa">`-tagissa.

- **Kiinteä hinta** on merkitty `data-hinta="nimi"`, ja nimi viittaa `hintadata.js`:n `kiinteat`-osaan (esim. `data-hinta="lisaklippi"`).
  - `data-etumerkki="+"` lisää plusmerkin (esim. +5 €/klippi).
  - Tekstin sisällä olevassa hinnassa `data-jakso` on summan perään tuleva teksti (esim. `/kpl`), ja `data-sulut` tarkoittaa, että summa on sulkeissa.
- **Uusi palvelu** lisätään kopioimalla rivi molempiin HTML-tiedostoihin ja lisäämällä hinta `hintadata.js`:n `kiinteat`-osaan uudella nimellä. Lisää se myös tarjoussivuille (`<div class="palvelu" data-palvelu="nimi">`) ja `tarjous.js`:n listaan (`KK` = kuukausihinta, `KPL` = kappalehinta).

### Säädinkortit (hinnat hyväksytty 23.10.2026)

Kuukausipaketti (Klippaamo), Kertaerä, AI-mainospaketti ja Arkisto ovat säädinkortteja (`data-saadin="klippaamo"` jne.), ja Klippitilin hoito on oma korttinsa (`data-tilinhoito`). Säädin päivittää nimen, kuvauksen, hinnan (alv 0 %), alv:llisen hinnan (25,5 %) ja €/klippi-luvun. Laskenta on tiedostossa `assets/hinnat.js`.

- **Portaiden hinnat** ovat `hintadata.js`:ssä, esim. `klippaamo: { 8: 249, 12: 349, … }` (klippejä: hinta).
- **Portaat ja niiden omat tekstit** ovat kortin `data-portaat`-attribuutissa, esim. `{"n":12,"nimi":"Klippaamo Starter"}`. Portaalle voi antaa oman nimen (`nimi`), kuvauksen (`kuvaus`) ja lisärivin (`lisa`). Englanninkielisessä tiedostossa tekstit ovat englanniksi.
- **`data-oletus`** kertoo oletusportaan järjestysnumeron (0 = ensimmäinen). Jos portaiden määrä muuttuu, päivitä myös `hintadata.js`, `<input type="range">`:n `value` ja `max` sekä porrasnumerot (`.portaat`).
- **Ilman JavaScriptiä** säätimet ovat piilossa ja kortissa näkyy oletusportaan teksti. Kun muutat oletusportaan hintaa, päivitä siis myös kortin näkyvät tekstit (nimi, kuvaus, hinta ja `data-yhteenveto`-rivi) molemmilla kielillä.
- **Klippitilin hoito:** `hintadata.js`:n `tilinhoito` sisältää €/kk-hinnat julkaisumäärän mukaan muodossa [1 alusta, 2 alustaa, 3 alustaa], ja `tilinhoitoKayttoonotto` sisältää kertamaksut samassa järjestyksessä. Vähintään yksi alusta pysyy aina valittuna.

### Klippaamon apusäätimet (lisätty 23.10.2026)

Klippaamo-kortissa on pakettisäätimen yläpuolella laskuri ”Laske paketin koko”: **Videoita kuukaudessa** (1, 2, 3, 4, 5, 6, 8; oletus 4) ja **Klippiä per video** (2, 3, 4, 5, 6, 8; oletus 3).

- Yhteismäärä (videot × klippiä per video) näkyy rivillä ”Yhteensä 12 klippiä kuukaudessa”, ja pakettisäädin siirtyy pienimpään portaaseen, joka riittää.
- Alle 8 klippiä: paketti 8 ja vinkki kertaerästä. Yli 24: paketti 24, teksti ”sovitaan erikseen, eikä ylärajaa ole” ja Kysy tarjous -linkki (sama sähköposti kuin muissa napeissa). Portaiden väliin jäävä määrä: kerrotaan, montako klippiä jää vapaaksi.
- Kun pakettisäädintä liikuttaa suoraan, apusäätimet eivät muutu, mutta niiden alla näkyy, montako klippiä videota kohden pakettiin mahtuu.
- Arvot ovat HTML:ssä apusäätimen `data-arvot`-kentässä ja oletus `data-oletus`-kentässä (järjestysnumero). Tekstit ovat `hinnat.js`:ssä molemmilla kielillä.

Asiakaskohtaisia hintoja ja tarjouksia ei laiteta sivulle.

## Räätälöity tarjous (lisätty 23.10.2026)

`tarjous.html` (englanniksi `en/quote.html`): kävijä valitsee palvelut, näkee hinta-arvion ja lähettää tarjouspyynnön. Sivulle vievät Räätälöity tarjous -painikkeet etusivun hintaosiossa (valuuttavalitsimen alla ja hintaosion lopussa) sekä yläpalkin valikossa leveällä näytöllä (64em eli noin 1024 px alkaen).

- **Etusivun valinnat mukaan:** kun kävijä liikuttaa etusivun säätimiä, painikkeiden linkkiin lisätään valinnat, esim. `tarjous.html?klippaamo=12&videot=4&per=3&tilinhoito=20&alustat=tiktok,shorts&currency=usd`. Vain liikutetut säätimet tulevat mukaan. Parametrien nimet ovat `hintadata.js`:n palvelujen nimiä. Osoitteeseen ei laiteta henkilötietoja.
- **Laskenta** (`assets/tarjous.js`): kuukausihinnat ja kertaluonteiset hinnat erikseen, alv 0 % ja alv:n kanssa. Kappalehintaiset lisät lasketaan kertaluonteisiksi. Englanninkielinen tekstitys ja vaakaversio lasketaan valittujen palvelujen klippimäärästä (Klippaamo ja Kaikki valmiina kuukausittain, muut kertaluonteisesti; livestriimi = 8 klippiä). Julkaisutekstit ovat 0 €, kun valittuna on Klippaamo Pro.
- **Lähetä tarjouspyyntö (ei sitova)** avaa kävijän oman sähköpostiohjelman valmiilla viestillä (mailto) osoitteeseen korkiakoskihannes@gmail.com. Aihe on ”Tarjouspyyntö: [yritys]”. Jos ilmaiset näytteet on valittu, viestissä on rivi ”Hyväksyn näytteiden ehdot: [linkki]”. Sivu ei lähetä eikä tallenna mitään itse.
- **Pitkä viesti:** yli 1 800 merkin mailto-linkki ei välttämättä avaudu kaikissa sähköpostiohjelmissa. Silloin sivu näyttää ohjeen, ja **Kopioi viesti** -nappi kopioi viestin leikepöydälle. Jos selain ei salli kopiointia, viesti näytetään kentässä itse kopioitavaksi.
- **Takaisin-nappi:** sivun valinnat päivitetään osoitteeseen (ei henkilötietoja), ja valintakentissä on `autocomplete="off"`. Palatessa valinnat, yhteenveto ja hinnat palautuvat osoitteesta.
- **Erikoistapaukset:** Kaikki valmiina sisältää klippitilin hoidon, joten jos molemmat on valittu, Klippitilin hoito näkyy rivinä ”sisältyy Kaikki valmiina -pakettiin” (0 €) ilman toista käyttöönottoa. Jos Klippitilin hoito valitaan ilman klippipalvelua (Klippaamo, Kaikki valmiina, Kertaerä tai Arkisto), rivillä näkyy huomio ”Klippitilin hoito myydään klippipaketin rinnalle”. Jos videoita × klippiä per video on yli 24, näkyy ”sovitaan erikseen” ja Kysy tarjous -linkki (aihe ”Tarjouspyyntö: yli 24 klippiä kuukaudessa”, ilman näyte-ehtoriviä).
- **Ilman JavaScriptiä** sivulla näkyy ohje lähettää sähköpostia ja palvelulista. Yhteenveto ja yhteystietokentät ovat piilossa.
- **Tietosuoja:** tarjouspyynnöstä kerrotaan tietosuojaselosteen kohdassa ”Mitä tietoja käsittelen” (molemmat kielet).
- **Toimitusaika** on sivuilla muodossa ”parhaimmillaan parissa tunnissa, yleensä vuorokauden sisällä arkipäivinä” (Tuomarin tarkennus 23.10.2026). Sitova yläraja on sopimuksessa. Kiiretoimitus poistettiin hinnastosta 23.10.2026.

## Uuden ilmeen esikatselu (?uusi=1, lisätty 23.10.2026)

Hannes pyysi näyttävämpää ilmettä ja avausefektiä. Uusi ilme on ensin esikatseluna, joka näkyy vain osoitteella
https://mestarihannes.github.io/PystyStudio/?uusi=1 (englanniksi `en/?uusi=1`). Ilman parametria sivu on täsmälleen ennallaan.

- **Teema:** logon pystyviiva on kursori, joka kirjoittaa tekstityksen sana kerrallaan.
  - **Avausefekti** (noin 5 s, vain etusivulla ensimmäisellä käynnillä):
    1. Musta ruutu ja vilkkuva kursori.
    2. PYSTY | STUDIO ja ”Pitkät videot pystyyn.” ilmestyvät sana kerrallaan.
    3. 16:9-studiokuva rajautuu 9:16:ksi puhujan kohdalle.
    4. Pystykehys suurenee ja aukeaa sivuksi.
  - **Muu ilme:**
    - musta hero, jonka otsikko ilmestyy sana kerrallaan
    - keltainen nauha (alustat ja lyhyet lupaukset)
    - kursori osioiden otsikoiden perässä
    - otsikot kirjoittuvat näkyviin vieritettäessä
    - puhelinkuvan tekstityksessä juuri puhuttu sana on keltainen
    - hienovarainen rakeisuus betonitaustassa
- **Intron ohitus:** Ohita-nappi oikeassa yläkulmassa, tai klikkaus, kosketus, vieritys tai mikä tahansa näppäin. Intro on vain sisällön päällä oleva kerros (`aria-hidden`), joten sivun sisältö on HTML:ssä heti hakukoneille ja ruudunlukijoille.
- **Kerran:** intro merkitään nähdyksi selaimen muistiin (localStorage, avain `pystystudio-intro`). Jos selain estää tallennuksen, intro näkyy kerran latausta kohden. Uudelleen katsominen: `?uusi=1&intro=1`.
- **Vähennetty liike:** jos laitteessa on valittu vähemmän liikettä (`prefers-reduced-motion`), intro ja animaatiot jäävät pois.
- **Toteutus:** jokaisen sivun `<head>`-osassa on pieni skripti, joka toimii vain parametrilla `?uusi=1`. Se lisää `<html>`-elementtiin luokan `ilme-uusi` ja lataa tiedostot `assets/ilme-uusi.css` ja `assets/ilme-uusi.js`. Kaikki uudet tyylit ovat `.ilme-uusi`-luokan alla. Parametri kulkee sisäisissä linkeissä (myös FI/EN-valitsin ja tarjoussivu: `valuutta.js`:n `lisaParametrit`).
- **Käyttöönotto,** jos Hannes hyväksyy: poista esikatseluskriptistä parametriehto (ensimmäinen `if`-rivi) kaikilta sivuilta, jolloin uusi ilme on aina käytössä. Poista samalla `?uusi=1` linkeistä: `valuutta.js`:n `lisaParametrit` palauttaa silloin tyhjän listan, ja `ilme-uusi.js`:n kohta 1 poistetaan.

## Hakukoneet ja somejaot

- Jokaisella sivulla on `rel=canonical`, Open Graph -tagit (`og:url`, `og:site_name`, `og:title`, `og:description`, `og:image` mittoineen ja alt-tekstineen) ja `twitter:card=summary_large_image`. 404-sivulla on `noindex`.
- **Jakokuva** `assets/jakokuva.png` (suomenkieliset sivut) ja `assets/jakokuva-en.png` (englanninkieliset) on tehty koodilla 23.10.2026: HTML-pohja (Pystyviiva-nimilogo `08_brandi/logo/2026-10-23_pysty-logo-konsepti-4-pystyviiva-nimilogo-tumma.svg`, otsikko, keltainen ”3 ilmaista näyteklippiä” -merkki ja esimerkkiklipin studio) kuvattiin Chromella 1200 × 630 pikselin kokoon. Jos teksti muuttuu, tee kuva samalla tavalla uudelleen samalla nimellä.
- **Meta description** on alle 160 merkkiä.

## Fontit ja tietosuoja

Fontit (Big Shoulders Display ja Figtree, SIL Open Font License) ladataan nyt Google Fontsista. Google Fonts ei aseta evästeitä, mutta kävijän IP-osoite välittyy Googlelle, ja tämä on kerrottu tietosuojaselosteessa.

Jos haluat, ettei sivu ota yhteyttä Googleen:

1. Lataa fonttitiedostot (woff2) kansioon `assets/fontit/`.
2. Lisää `tyyli.css`:n alkuun `@font-face`-määrittelyt.
3. Poista Google Fonts -rivit (`preconnect` ja `stylesheet`) kaikista HTML-tiedostoista.
4. Poista Google Fonts tietosuojaselosteiden (suomi ja englanti) kohdista ”Kuka tietoja käsittelee”, ”Sivuston käyttö” ja ”Siirrot EU:n ulkopuolelle”.

## Julkaisu (GitHub Pages)

Sivu julkaistiin 23.10.2026 samalla tavalla kuin Ajoura: omassa julkisessa repossaan GitHub Pagesiin.

| Mikä | Osoite |
|---|---|
| Sivu | https://mestarihannes.github.io/PystyStudio/ |
| Sivu englanniksi | https://mestarihannes.github.io/PystyStudio/en/ |
| Tietosuojaseloste | https://mestarihannes.github.io/PystyStudio/tietosuoja.html (englanniksi `en/privacy.html`) |
| Koodi | https://github.com/MestariHannes/PystyStudio (julkinen, haara `main`) |
| Pages-asetus | https://github.com/MestariHannes/PystyStudio/settings/pages (lähde: `main`, kansio `/`) |
| Linkki Lavreonin sivulta | Lavreonin PR https://github.com/MestariHannes/lavreon/pull/38: ”Pysty Studio ↗” yläpalkissa Ajouran vieressä sekä alapalkissa |

Polussa on iso P ja iso S (`/PystyStudio/`), samaan tapaan kuin Ajouran vanhassa osoitteessa.

- **Julkinen repo:** ilmaisessa GitHub-tilissä Pages vaatii julkisen repon, joten koodi ja tämä README näkyvät kaikille. Repoon laitetaan vain tämän kansion sisältö. Asiakkaiden klippejä, sopimuksia tai muita Pysty Studion kansioita ei laiteta sinne.
- **Päivitys:** muokkaa tiedostoja tässä kansiossa (`09_verkkosivu`, joka on repon paikallinen kopio). Aja sitten `git add .`, `git commit -m "kuvaus"` ja `git push`. Sivu päivittyy muutamassa minuutissa.
- **Oma verkkotunnus (valinnainen),** esim. `pystystudio.fi`:
  1. Repon Settings → Pages → Custom domain → kirjoita verkkotunnus → Save.
  2. Lisää verkkotunnuksen DNS-asetuksiin A-tietueet `185.199.108.153`, `185.199.109.153`, `185.199.110.153` ja `185.199.111.153` sekä `www`-aliakselle CNAME `mestarihannes.github.io`.
  3. Kun DNS toimii, kytke päälle *Enforce HTTPS*.
  4. Vaihda `hreflang`-, `canonical`-, `og:url`- ja `og:image`-osoitteet kaikista HTML-tiedostoista (ks. Kielet ja Hakukoneet ja somejaot), `tarjous.js`:n `SIVUSTO`, mailto-viestien näyte-ehtolinkit sekä `404.html`:n polut `/PystyStudio/` → `/`.
  - Tarkista nimi ensin, ks. `01_suunnitelma` (Tuomarin nimitarkistus).

## Vielä tekemättä

- [x] Lopullinen logo ja kuvake: konsepti 4, Pystyviiva (23.10.2026)
- [x] Englanninkieliset sivut ja valuuttavalinta EUR / USD (23.10.2026)
- [x] Räätälöity tarjous -sivu (23.10.2026)
- [x] PNG-kuvake (`apple-touch-icon`) ja jakokuva (`og:image`) (23.10.2026)
- [x] Sivuston tarkistuksen korjaukset A ja B sekä kevennetty hintaosio (23.10.2026)
- [ ] Kuva Hanneksesta Kuka klipit tekee -osioon (paikka on valmiina, ks. kommentti `index.html`:ssä)
- [ ] Oikea demoklippi Hanneksen omasta materiaalista
- [ ] Referenssit: klipit asiakkaan kirjallisella luvalla, sitten `hidden` pois osiosta (molemmilla kielillä)
- [ ] Tietosuojaseloste: osoite rekisterinpitäjän tietoihin, jos laki sitä vaatii, ja juristin tarkistus
- [ ] Fontit omalle palvelimelle, jos Google Fonts halutaan pois (ks. yllä)
- [ ] EUR/USD-kurssin päivitys tarvittaessa (ks. Kurssin päivitys)

## Mitä sivulla ei ole

- Ei evästeitä, analytiikkaa eikä seurantakoodia. Ainoa selaimeen tallennettava tieto on valuuttavalinta (localStorage), joka ei lähde selaimesta.
- Ei lomaketta, joka lähettäisi tietoja: yhteydenotot ja tarjouspyynnöt lähtevät kävijän omasta sähköpostiohjelmasta (`mailto:`), joten sivu ei kerää tietoja itse.
- Asiakkaiden nimiä, klippejä tai asiakaskohtaisia hintoja ei näytetä ilman lupaa.

Huom. README näkyy julkisessa repossa kaikille, joten tähän tiedostoon ei kirjoiteta asiakastietoja.
