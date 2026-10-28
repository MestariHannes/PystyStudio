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
| `assets/hinnat.js` | Hintojen liukusäätimet, Klippaamon apusäätimet (videoita × klippiä per video), Klippitilin hoidon alustavalinta, hintatapa Yksityishenkilö / Yritys (ks. Hintojen muokkaus) ja Räätälöity tarjous -linkkien valinnat |
| `assets/tarjous.js` | Tarjoussivun laskenta, yhteenveto, sähköpostiviesti (mailto) ja Kopioi viesti -nappi |
| `assets/logo.svg` | Nimilogo PYSTY\|STUDIO vaalealle pohjalle (konsepti 4, Pystyviiva). Yläpalkissa. |
| `assets/logo-tumma.svg` | Nimilogo tummalle pohjalle. Mustassa alapalkissa. |
| `assets/favicon.svg` | Selainvälilehden kuvake (P\| mustalla pohjalla) |
| `assets/apple-touch-icon.png` | 180 × 180 px kuvake iPhonen kotivalikkoon ja PNG-varakuvake (kopio tiedostosta `08_brandi/logo/png/2026-10-23_pysty-logo-favicon-180.png`) |
| `assets/jakokuva.png`, `assets/jakokuva-en.png` | Somejakojen kuva (`og:image`) 1200 × 630, suomeksi ja englanniksi (ks. Hakukoneet ja somejaot) |
| `assets/ilme-uusi.css`, `assets/ilme-uusi.js` | Pystyviiva-ilme ja avausefekti, käytössä kaikilla sivuilla 23.10.2026 alkaen (ks. Pystyviiva-ilme) |
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
- **Hakukoneet:** jokaisen sivun `<head>`-osassa on `hreflang`-linkit (fi, en ja x-default = suomi). Osoitteet ovat täysiä osoitteita (`https://pystystudio.fi/...`). Jos verkkotunnus vaihtuu, vaihda ne kaikista HTML-tiedostoista sekä `tarjous.js`:n `SIVUSTO`.
- **Sivukartta ja robots.txt** (28.10.2026): `sitemap.xml` listaa 8 sivua samoilla `hreflang`-pareilla kuin sivujen `<head>`, ja `robots.txt` sallii kaiken ja kertoo sivukartan osoitteen. `404.html` on `noindex` eikä ole sivukartassa. Kun lisäät sivun, lisää se sivukarttaan; kun sivun sisältö muuttuu, päivitä sen `lastmod`. Sivu on Google Search Consolessa (verkkotunnusomaisuus `pystystudio.fi`, vahvistettu Cloudflaren TXT-tietueella).
- **Kun suomenkielinen teksti muuttuu,** päivitä sama kohta englanninkieliseen sivuun. Ehtojen ja tietosuojan englanninkieliset versiot ovat käännöksiä, ja niiden lopussa kerrotaan, että suomenkielinen versio on ensisijainen.
- **Englanninkielisten sivujen alv- ja laskutustekstit ovat Tuomarin tekstejä (23.10.2026), ja niitä käytetään sanatarkasti:**
  - alv: ”Prices exclude VAT. Finnish customers: VAT 25.5% is added. EU businesses with a valid VAT number: 0% VAT (reverse charge). Businesses outside the EU: 0% VAT. Services are for businesses only.”
  - laskutus: ”Invoicing is handled by Suomen Keikkalasku (Business ID 2883508-5), a Finnish invoicing service. Your agreement is with Hannes Korkiakoski, trading as Pysty Studio.”
- **Tuotenimet** Klippaamo (Starter, Pro) ja Pysty Puhe ovat englanniksikin samat. Muut nimet on käännetty (esim. Kertaerä = Single batch, Arkisto = Archive).

## Valuutta (EUR / USD)

Valitsin **€ EUR | $ USD** on englanninkielisen etusivun hintaosion alussa ja suomenkielisellä etusivulla hintaosion lopussa (siirretty 28.10.2026, koska lähes kaikki suomalaiset kävijät maksavat euroissa ja valitsin oli hintojen edessä). Se vaihtaa kaikki sivun hinnat: kiinteät hinnat, säädinten hinnat, alv-rivit, €/klippi-rivit, lisäpalvelut ja ruudunlukijan tekstit (`aria-valuetext`).

- **Laskut ovat aina euroissa,** joten USD-tilassakin euro näkyy:
  - isoissa hinnoissa dollarisumma on isolla (”≈ 391 $”) ja euro pienellä sen alla
  - tekstin sisällä euro ensin ja dollari arviona perässä, esim. ”438 €/kk (≈ 491 $)”
  - dollarit pyöristetään lähimpään kokonaiseen dollariin. Muoto on suomeksi ”269 $” ja englanniksi ”$269”.
- **USD-tilassa valitsimen alla näkyy huomautus** (Tuomarin teksti). Sen sanamuoto on HTML:ssä valitsimen `data-malli`-kentässä, ja kurssi sekä päivämäärä tulevat kohtiin `{kurssi}` ja `{pvm}` tiedostosta `hintadata.js`.
- **Valinnan muistaminen:** valinta tallennetaan selaimen localStorageen (avain `pystystudio-valuutta`), joten se säilyy sivulta ja kieleltä toiselle. Jos selain estää tallennuksen, valinta pätee vain avoimella sivulla. Tämä on kerrottu tietosuojaselosteessa (kohta Sivuston käyttö).
- **Linkki suoraan dollareihin:** `?currency=usd`, esim. `https://pystystudio.fi/en/?currency=usd`. Parametri voittaa tallennetun valinnan. Oletus on EUR molemmilla kielillä.
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

## Mobiilivalikko ja Kopioi osoite (lisätty 28.10.2026)

- **Mobiilivalikko** (`sivu.js`, kohta 3; molemmat etusivut): alle 56em yläpalkissa ovat logo, Ilmaiset näytteet ja Valikko-nappi. Valikosta aukeavat osioiden linkit, Räätälöity tarjous ja kielivalinta FI | EN. Valikko sulkeutuu linkistä, Esc-näppäimestä ja ohi napauttamalla. Ilman JavaScriptiä nappi on piilossa ja yläpalkki on kuten ennen.
- **Kopioi osoite** (`sivu.js`, kohta 4): Yhteys-osiossa sähköpostiosoitteen alla. Jos `mailto:`-nappi ei avaa sähköpostiohjelmaa (esim. tietokone ilman sähköpostiohjelmaa), osoitteen voi kopioida.
- **Näytteet jo saaneelle** (Yhteys-osiossa; heron alta poistettu 28.10.2026): ”Sait jo näytteet sähköpostilla? Vastaa samaan viestiin, niin sovitaan aloituksesta.” Myyntiviestin saanut tekijä tulee sivulle näytteet jo saaneena.
- **Sähköpostin valintaikkuna** (`assets/sahkoposti.js`, kaikilla sivuilla, 28.10.2026): tietokoneella `mailto:`-linkki ei tee mitään, jos koneella ei ole toimivaa oletussähköpostiohjelmaa (näin oli Hanneksen koneella: Windowsin lopetettu Sähköposti-sovellus). Siksi tietokoneella (hiiri ja hover) jokainen `mailto:`-linkki avaa ikkunan: Gmail, Outlook.com, oma sähköpostiohjelma ja Kopioi osoite. Aihe ja viestipohja siirtyvät Gmailiin ja Outlookiin. Puhelimessa ja ilman JavaScriptiä linkit avautuvat suoraan. Tarjouslomakkeen lähetys käyttää samaa ikkunaa (`PystyTarjous.avaa` → `PystySahkoposti.avaa`). Tyylit: `tyyli.css`, `.sahkoposti-ikkuna`.

## Logo ja ilme

Sivu käyttää logokonseptia 4, Pystyviiva, jonka Hannes valitsi 23.10.2026. Lähteet ja perustelut ovat kansiossa `08_brandi` (`2026-10-23_logo-perustelut.md`, osio 4). Edelliset väliaikaiset logo ja kuvake on arkistoitu kansioon `99_arkisto` (`2026-10-23_verkkosivu-logo-valiaikainen.svg` ja `2026-10-23_verkkosivu-favicon-valiaikainen.svg`).

- **Värit:** musta `#000000`, tekstityskeltainen `#FFE100`, valkoinen `#FFFFFF` ja betoni `#E4E4E1` (sivun tausta). Ne ovat `assets/tyyli.css`:n alussa `:root`-osassa. Esimerkkiklipin studio käyttää `--k-…`-muuttujia. `theme-color` on musta kaikkien HTML-tiedostojen `<head>`-osassa.
- **Keltaisen käyttö:** keltainen erottuu valkoisesta ja betonista huonosti (1,3:1). Sitä käytetään vain mustalla pohjalla (yhteysosio ja alapalkki), korostuksena mustan tekstin takana (linkkien ja nappien hover, valittu valuutta) tai mustan reunan kanssa (otsikon pystyviiva, vaiheiden numerot, merkit ja aikajanan kohdat). Keltaista tekstiä ei käytetä vaalealla pohjalla.
- **Fontit:** Big Shoulders Display (900) otsikoissa ja Figtree leipätekstissä. Muuttujat `--fontti-…` ja Google Fonts -linkki `<head>`-osassa.
- **Logon vaihto:** korvaa `assets/logo.svg` ja `assets/logo-tumma.svg` samoilla nimillä. Jos kuvasuhde muuttuu, päivitä `<img>`-tagien `width`- ja `height`-arvot (kaikki HTML-tiedostot, ylä- ja alapalkki). Vaalea logo on 537 × 121 ja tumma 537 × 112. Korkeus asetetaan CSS:ssä (`.logo img` ja `.alapalkki-logo`), joten leveys seuraa kuvasuhdetta.
- **Kuvake:** `assets/favicon.svg`, iPhonelle ja PNG-varalle `assets/apple-touch-icon.png`.

## Hintojen muokkaus

> **Etusivun hintaosio muuttui 28.10.2026** (Hanneksen pyyntö: yksinkertaisemmat hinnat). Etusivuilla on nyt kolme pakettikorttia (4, 12 ja 24 klippiä, `.paketit`), joiden hinnat tulevat hintadata.js:stä muodossa `data-hinta="klippaamo:N"` (hinnat.js, `kiinteaHinta`; myös `kertaera:1`). Yksityishenkilö | Yritys -valitsin vaihtaa korttien hinnat. Liukusäätimet, apusäätimet, Muut palvelut ja lisäpalvelut (18) poistettiin etusivuilta; ne ovat tarjoussivulla (tarjous.html ja en/quote.html), ja kortin Valitse-linkki avaa sen valmiiksi valitulla paketilla (`?klippaamo=N`). Suomenkieliseltä etusivulta poistettiin myös valuuttavalitsin. Alla olevat säädinkorttien ohjeet koskevat enää tarjoussivua.

> **Tarjoussivun säätimet 28.10.2026** (Hanneksen pyyntö): Klippiä per video alkaa 1:stä, Videoita kuukaudessa ulottuu 20:een, ja Klippaamossa on 24:n yli koot 28–64 (neljän välein). Yli 24 klipin hinta on 599 € + 25 € jokaisesta lisäklipistä (Lisäklipin hinta), ja niihin sisältyvät julkaisutekstit kuten Pro-pakettiin. Yli 64 klippiä kuussa: tarjoussivu näyttää huomion "sovitaan erikseen".

> **Arvioiden korjaukset 28.10.2026** (Pääaseman, Kilpailijan ja Tuomarin arviot, `04_myynti/2026-10-28_sivuston-korjaukset/2026-10-28_arviot-sivusta.md`):
> - **Tarjoussivulla (fi) on sama Yksityishenkilö | Yritys -valitsin** kuin etusivulla: sama selaimen muisti (`pystystudio-hintatapa`) ja sama `?hinnat=`-parametri.
>   - Yksityishenkilölle rivien, yhteenvedon ja sähköpostiviestin rivihinnat näytetään alv:n kanssa, ja yhteissummassa hinta alv:n kanssa on ensin.
>   - Laskenta (`PystyTarjous.laske()`) on aina alv 0 %.
>   - Englanninkielisellä sivulla valitsinta ei ole, ja hinnat ovat alv 0 %.
> - **Pakettikorteissa näkyy klippihinta** (`data-klippihinta`): paketin hinta jaettuna klippien määrällä täysinä euroina.
> - **Puhelimen pääkuvassa** ingressi ja napit ovat ennen liikkuvaa klippiä.

**Hinnat ovat tiedostossa `assets/hintadata.js`** (euroja, alv 0 %). Sieltä ne tulevat kummankin kielen etusivulle, ja JavaScript kirjoittaa ne sivulle.

Etusivuilla (`index.html` ja `en/index.html`) on samat hinnat myös näkyvinä teksteinä sitä varten, että sivu toimii ilman JavaScriptiä. **Kun muutat hintaa:**

1. Muuta hinta `hintadata.js`:ään.
2. Muuta sama hinta näkyvään tekstiin molemmissa HTML-tiedostoissa. Säädinkorteissa tämä koskee vain oletusporrasta (ks. alla).
3. Tarkista UKK: lisäkorjaus (15 €) ja suomeksi alv 25,5 %.

**Hintatapa Yksityishenkilö / Yritys (lisätty 28.10.2026):** suomenkielisen etusivun hintaosiossa on valitsin (`data-hintatapa-valitsin`), koska palvelua myydään myös yksityishenkilöille.
- **Yksityishenkilö** on oletus: kaikki etusivun hinnat näytetään alv:n kanssa (× 1,255), ja yhteenvetorivillä näkyy yrityksen alv 0 % -hinta.
- **Yritys:** hinnat ovat alv 0 % kuten ennen, ja yhteenvetorivillä näkyy hinta alv:n kanssa.
- Valinta muistetaan selaimessa (localStorage `pystystudio-hintatapa`). Osoitteella `index.html?hinnat=yritys` tai `?hinnat=yksityinen` sivu aukeaa valitulla tavalla.
- Laskenta on `assets/hinnat.js`:ssä (`hinnaksi`). Hinnat pysyvät `hintadata.js`:ssä alv 0 %. Tekstit, joilla on yksityishenkilön versio, on merkitty `data-alv-kuluttaja`-kentällä, ja HTML:n oma teksti on yrityksen versio.
- Englanninkielisellä sivulla ei ole valitsinta, joten siellä hinnat ovat aina alv 0 %. Tarjoussivu näyttää yhteenvedossa molemmat hinnat.

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

- **Portaiden hinnat** ovat `hintadata.js`:ssä, esim. `klippaamo: { 4: 129, 8: 249, 12: 349, … }` (klippejä: hinta).
- **Portaat ja niiden omat tekstit** ovat kortin `data-portaat`-attribuutissa, esim. `{"n":12,"nimi":"Klippaamo Starter"}`. Portaalle voi antaa oman nimen (`nimi`), kuvauksen (`kuvaus`) ja lisärivin (`lisa`). Englanninkielisessä tiedostossa tekstit ovat englanniksi.
- **`data-oletus`** kertoo oletusportaan järjestysnumeron (0 = ensimmäinen). Jos portaiden määrä muuttuu, päivitä myös `hintadata.js`, `<input type="range">`:n `value` ja `max` sekä porrasnumerot (`.portaat`).
- **Ilman JavaScriptiä** säätimet ovat piilossa ja kortissa näkyy oletusportaan teksti. Kun muutat oletusportaan hintaa, päivitä siis myös kortin näkyvät tekstit (nimi, kuvaus, hinta ja `data-yhteenveto`-rivi) molemmilla kielillä.
- **Klippitilin hoito:** `hintadata.js`:n `tilinhoito` sisältää €/kk-hinnat julkaisumäärän mukaan muodossa [1 alusta, 2 alustaa, 3 alustaa], ja `tilinhoitoKayttoonotto` sisältää kertamaksut samassa järjestyksessä. Vähintään yksi alusta pysyy aina valittuna.

### Klippaamon apusäätimet (lisätty 23.10.2026)

Klippaamo-kortissa on pakettisäätimen yläpuolella laskuri ”Laske paketin koko”. Suomenkielisellä etusivulla se on 28.10.2026 alkaen suljettavan otsikon ”Laske koko videoiden määrästä” takana (`details.apu-avattava`), jotta kortissa näkyy ensin yksi säädin. Osoitteen `?videot=&per=` avaa sen. Laskurissa ovat **Videoita kuukaudessa** (1, 2, 3, 4, 5, 6, 8; oletus 4) ja **Klippiä per video** (2, 3, 4, 5, 6, 8; oletus 3).

- Yhteismäärä (videot × klippiä per video) näkyy rivillä ”Yhteensä 12 klippiä kuukaudessa”, ja pakettisäädin siirtyy pienimpään portaaseen, joka riittää.
- Alle 4 klippiä: paketti 4 ja vinkki kertaerästä (pienin paketti oli 8 klippiä 28.10.2026 asti). Yli 24: paketti 24, teksti ”sovitaan erikseen, eikä ylärajaa ole” ja Kysy tarjous -linkki (sama sähköposti kuin muissa napeissa). Portaiden väliin jäävä määrä: kerrotaan, montako klippiä jää vapaaksi.
- Kun pakettisäädintä liikuttaa suoraan, apusäätimet eivät muutu, mutta niiden alla näkyy, montako klippiä videota kohden pakettiin mahtuu.
- Arvot ovat HTML:ssä apusäätimen `data-arvot`-kentässä ja oletus `data-oletus`-kentässä (järjestysnumero). Tekstit ovat `hinnat.js`:ssä molemmilla kielillä.

Asiakaskohtaisia hintoja ja tarjouksia ei laiteta sivulle.

## Räätälöity tarjous (lisätty 23.10.2026)

`tarjous.html` (englanniksi `en/quote.html`): kävijä valitsee palvelut, näkee hinta-arvion ja lähettää tarjouspyynnön. Sivulle vievät Räätälöity tarjous -painike etusivun hintaosion lopussa sekä yläpalkin valikko: leveällä näytöllä (64em eli noin 1024 px alkaen) linkkinä yläpalkissa ja puhelimessa Valikossa. Englanninkielisellä etusivulla painike on myös hintaosion alussa. Suomenkielisen sivun yläreunan painike poistettiin 28.10.2026, jotta hinnat tulevat puhelimessa nopeammin näkyviin.

- **Etusivun valinnat mukaan:** kun kävijä liikuttaa etusivun säätimiä, painikkeiden linkkiin lisätään valinnat, esim. `tarjous.html?klippaamo=12&videot=4&per=3&tilinhoito=20&alustat=tiktok,shorts&currency=usd`. Vain liikutetut säätimet tulevat mukaan. Parametrien nimet ovat `hintadata.js`:n palvelujen nimiä. Osoitteeseen ei laiteta henkilötietoja.
- **Laskenta** (`assets/tarjous.js`): kuukausihinnat ja kertaluonteiset hinnat erikseen, alv 0 % ja alv:n kanssa. Kappalehintaiset lisät lasketaan kertaluonteisiksi. Englanninkielinen tekstitys ja vaakaversio lasketaan valittujen palvelujen klippimäärästä (Klippaamo ja Kaikki valmiina kuukausittain, muut kertaluonteisesti; livestriimi = 8 klippiä). Julkaisutekstit ovat 0 €, kun valittuna on Klippaamo Pro.
- **Lähetä tarjouspyyntö (ei sitova)** avaa kävijän oman sähköpostiohjelman valmiilla viestillä (mailto) osoitteeseen korkiakoskihannes@gmail.com. Aihe on ”Tarjouspyyntö: [yritys]”. Jos ilmaiset näytteet on valittu, viestissä on rivi ”Hyväksyn näytteiden ehdot: [linkki]”. Sivu ei lähetä eikä tallenna mitään itse.
- **Pitkä viesti:** yli 1 800 merkin mailto-linkki ei välttämättä avaudu kaikissa sähköpostiohjelmissa. Silloin sivu näyttää ohjeen, ja **Kopioi viesti** -nappi kopioi viestin leikepöydälle. Jos selain ei salli kopiointia, viesti näytetään kentässä itse kopioitavaksi.
- **Takaisin-nappi:** sivun valinnat päivitetään osoitteeseen (ei henkilötietoja), ja valintakentissä on `autocomplete="off"`. Palatessa valinnat, yhteenveto ja hinnat palautuvat osoitteesta.
- **Julkaisutekstit** (korjattu 28.10.2026): ne näkyvät 0 €:n rivinä ”sisältyy …”, kun mukana on Pro (24 klippiä), Klippitilin hoito tai Kaikki valmiina, koska ne kuuluvat näihin. Aiemmin tarjous laski 60 €/kk kahteen kertaan klippitilin hoidon kanssa.
- **Erikoistapaukset:** Kaikki valmiina sisältää klippitilin hoidon, joten jos molemmat on valittu, Klippitilin hoito näkyy rivinä ”sisältyy Kaikki valmiina -pakettiin” (0 €) ilman toista käyttöönottoa. Jos Klippitilin hoito valitaan ilman klippipalvelua (Klippaamo, Kaikki valmiina, Kertaerä tai Arkisto), rivillä näkyy huomio ”Klippitilin hoito myydään klippipaketin rinnalle”. Jos videoita × klippiä per video on yli 24, näkyy ”sovitaan erikseen” ja Kysy tarjous -linkki (aihe ”Tarjouspyyntö: yli 24 klippiä kuukaudessa”, ilman näyte-ehtoriviä).
- **Ilman JavaScriptiä** sivulla näkyy ohje lähettää sähköpostia ja palvelulista. Yhteenveto ja yhteystietokentät ovat piilossa.
- **Tietosuoja:** tarjouspyynnöstä kerrotaan tietosuojaselosteen kohdassa ”Mitä tietoja käsittelen” (molemmat kielet).
- **Toimitusaika** on sivuilla muodossa ”parhaimmillaan parissa tunnissa, yleensä vuorokauden sisällä arkipäivinä” (Tuomarin tarkennus 23.10.2026). Sitova yläraja on sopimuksessa. Kiiretoimitus poistettiin hinnastosta 23.10.2026.

## Pystyviiva-ilme (käytössä 23.10.2026)

Hannes pyysi näyttävämpää ilmettä ja avausefektiä. Ilme oli ensin esikatseluna osoitteella `?uusi=1`, ja Hannes hyväksyi sen 23.10.2026. Nyt se on käytössä kaikilla sivuilla.

- **Teema:** logon pystyviiva on kursori, joka kirjoittaa tekstityksen sana kerrallaan.
  - **Avausefekti** (noin 3 s, vain etusivulla ensimmäisellä käynnillä; lyhennetty 28.10.2026 viidestä sekunnista, koska myyntiviestistä tuleva kävijä näkee sen ensimmäisenä. Aikajana on `ilme-uusi.css`:n kommentissa):
    1. Musta ruutu ja vilkkuva kursori.
    2. PYSTY | STUDIO ja ”Pitkät videot pystyyn.” ilmestyvät sana kerrallaan.
    3. 16:9-studiokuva rajautuu 9:16:ksi puhujan kohdalle.
    4. Pystykehys suurenee ja aukeaa sivuksi.
  - **Muu ilme:**
    - musta hero, jonka otsikko ilmestyy sana kerrallaan
    - ~~keltainen nauha (alustat ja lyhyet lupaukset)~~ (poistettu 28.10.2026)
    - ~~kursori osioiden otsikoiden perässä~~ (poistettu 28.10.2026)
    - otsikot kirjoittuvat näkyviin vieritettäessä
    - puhelinkuvan tekstityksessä juuri puhuttu sana on keltainen
    - hienovarainen rakeisuus betonitaustassa
- **Ulkoasun uudistus 28.10.2026** (Hanneksen pyyntö: koukuttavampi ja sulavampi):
  - **Heron klippisyöte** (`sivu.js`, kohta 2): puhelimessa pyörii kolme klippiä samasta jaksosta. Klippi vaihtuu pyyhkäisemällä ylös kuin somesyötteessä, ja puhelimen sisältö on kerroksessa `.klippi-sisalto` (rajaus ja zoomi sen `data-puhuja`- ja `data-zoomi`-kentistä). Repliikit ovat `KLIPIT`-listassa molemmilla kielillä.
  - **Aikajana puhelimen alla:** jakson aikajana on demon sisällä. Keltainen kursori (logon pystyviiva) kelaa kohtaan, josta klippi on tehty, ja näyttää kohdan ajan. Nykyinen kohta on kirkas ja muut himmeitä.
  - **Puhelimessa demo on heti otsikon alla** (alle 64em, `display: contents` ja `order`), joten liikkuva klippi näkyy ensimmäisellä ruudulla.
  - **Tumma yläpalkki heron päällä** (`ilme-uusi.js`, kohta 5): etusivuilla logo on kahtena kuvana (`logo-vaalea` ja `logo-tumma`). Avoin mobiilivalikko on aina vaalea.
  - **Pehmeä liike:** yksi käyrä `--ease-ulos` (`tyyli.css`, `:root`). Otsikot nousevat ilman pomppua, ja pomppu jää vain puhelimen tekstitykseen. Napit nousevat hoverissa 2 px. Avattavat osiot avautuvat pehmeästi selaimissa, jotka tukevat `interpolate-size`-ominaisuutta.
  - Demo odottaa avausefektin loppuun, ja Pysäytä esimerkki -nappi pysäyttää myös kursorin.
- **Intron ohitus:** Ohita-nappi oikeassa yläkulmassa, tai klikkaus, kosketus, vieritys tai mikä tahansa näppäin. Intro on vain sisällön päällä oleva kerros (`aria-hidden`), joten sivun sisältö on HTML:ssä heti hakukoneille ja ruudunlukijoille.
- **Kerran:** intro merkitään nähdyksi selaimen muistiin (localStorage, avain `pystystudio-intro`). Jos selain estää tallennuksen, intro näkyy kerran latausta kohden. Uudelleen katsominen: `?intro=1`.
- **Vähennetty liike:** jos laitteessa on valittu vähemmän liikettä (`prefers-reduced-motion`), intro ja animaatiot jäävät pois.
- **Toteutus:** jokaisen sivun `<head>`-osassa on pieni skripti, joka lisää `<html>`-elementtiin luokan `ilme-uusi` ja lataa tiedostot `assets/ilme-uusi.css` ja `assets/ilme-uusi.js`. Kaikki uudet tyylit ovat `.ilme-uusi`-luokan alla.
- **Käyttöönotto tehty 23.10.2026:** parametriehto poistettiin kaikilta sivuilta, `valuutta.js`:n `lisaParametrit` palauttaa tyhjän listan, ja `ilme-uusi.js`:n linkkikohta poistettiin.
- **Kevennys 28.10.2026** (palaute: liikaa tietoa, liian täyteläinen ja tekoälyn näköinen; Hanneksen päätökset). Yllä kuvatusta ilmeestä poistettiin:
  - avausefekti (etusivujen `<head>`-skriptistä poistettiin `data-intro`; koodi on yhä `ilme-uusi.js`:ssä)
  - keltainen nauha heron alta (`ilme-uusi.js` ja `ilme-uusi.css`)
  - vilkkuva keltainen kursori kaikista otsikoista (hero, osiot, alasivut ja 404). Pystyviiva jää logoon ja aikajanan kursoriin.
  - heron yläotsake ja pientekstit, pieni 16:9-kuva ja kuvatekstit. Pysäytä esimerkki -nappi on aikajanan alla.
  - Mitä klipeissä on -osion kaavio ja tekniikkalista (drop, äänitaso, kuvataajuus). Tilalla on neljä lyhyttä kohtaa (`.ominaisuudet-tiivis`), joista ensimmäinen on pysäyttävä alku.
  - hintaosion musta näytelaatikko ja keltaiset lupausrivit; laskutusteksti yhteen lauseeseen
  - UKK 13 → 8 kysymystä, vastaukset lyhyemmiksi
  - Näytenappi on kahdesti: yläpalkissa ja herossa. Yhteysosion nappi poistettiin, ja sen viestipohja on nyt ison sähköpostiosoitteen linkissä.
  - Vaiheita on kolme (ennen neljä). Heron otsikko on puhelimessa pienempi (`h1`: `clamp(3.25rem, 15vw, 9.5rem)`).

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
| Sivu | https://pystystudio.fi/ (vanha osoite https://mestarihannes.github.io/PystyStudio/ ohjautuu tänne) |
| Sivu englanniksi | https://pystystudio.fi/en/ |
| Tietosuojaseloste | https://pystystudio.fi/tietosuoja.html (englanniksi `en/privacy.html`) |
| Koodi | https://github.com/MestariHannes/PystyStudio (julkinen, haara `main`) |
| Pages-asetus | https://github.com/MestariHannes/PystyStudio/settings/pages (lähde: `main`, kansio `/`) |
| Linkki Lavreonin sivulta | Lavreonin PR https://github.com/MestariHannes/lavreon/pull/38: ”Pysty Studio ↗” yläpalkissa Ajouran vieressä sekä alapalkissa |

Oma verkkotunnus `pystystudio.fi` (käyttäjän päätös 28.10.2026) on repon juuren `CNAME`-tiedostossa. Ennen sitä sivu oli osoitteessa `/PystyStudio/` (iso P ja iso S).

- **Julkinen repo:** ilmaisessa GitHub-tilissä Pages vaatii julkisen repon, joten koodi ja tämä README näkyvät kaikille. Repoon laitetaan vain tämän kansion sisältö. Asiakkaiden klippejä, sopimuksia tai muita Pysty Studion kansioita ei laiteta sinne.
- **Päivitys:** muokkaa tiedostoja tässä kansiossa (`09_verkkosivu`, joka on repon paikallinen kopio). Aja sitten `git add .`, `git commit -m "kuvaus"` ja `git push`. Sivu päivittyy muutamassa minuutissa.
- **Oma verkkotunnus `pystystudio.fi`:**
  1. GitHubin tilin asetuksissa Settings → Pages → *Add a domain*: verkkotunnus vahvistetaan TXT-tietueella, jotta kukaan muu ei voi ottaa sitä käyttöön omalla GitHub-sivullaan.
  2. Verkkotunnuksen DNS-asetuksiin A-tietueet `185.199.108.153`, `185.199.109.153`, `185.199.110.153` ja `185.199.111.153`, AAAA-tietueet `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` ja `2606:50c0:8003::153` sekä `www`-nimelle CNAME `mestarihannes.github.io`.
  3. Kun DNS toimii, push `CNAME`-tiedostolla (sisältö `pystystudio.fi`). Repon Settings → Pages näyttää verkkotunnuksen, ja kun varmenne on valmis, sieltä kytketään päälle *Enforce HTTPS*.
  4. Kaikki täydet osoitteet (`hreflang`, `canonical`, `og:url`, `og:image`, `tarjous.js`:n `SIVUSTO` ja mailto-viestien näyte-ehtolinkit) ovat muotoa `https://pystystudio.fi/...`, ja `404.html`:n polut alkavat `/`.
  - Nimi tarkistettiin 28.10.2026: Traficomin whois (vapaa), YTJ (ei samannimistä yritystä) ja verkkohaku. Tavaramerkkejä ei tarkistettu.

## Vielä tekemättä

- [x] Lopullinen logo ja kuvake: konsepti 4, Pystyviiva (23.10.2026)
- [x] Englanninkieliset sivut ja valuuttavalinta EUR / USD (23.10.2026)
- [x] Räätälöity tarjous -sivu (23.10.2026)
- [x] PNG-kuvake (`apple-touch-icon`) ja jakokuva (`og:image`) (23.10.2026)
- [x] Sivuston tarkistuksen korjaukset A ja B sekä kevennetty hintaosio (23.10.2026)
- [x] Mobiilivalikko, lyhyempi avausefekti, Kopioi osoite ja tiiviimpi hintaosio puhelimessa (28.10.2026)
- [ ] Englanninkieliset sivut yksityishenkilöille (hintatapa, näyte-ehtojen kohdat 6 ja 7, UKK)
- [x] Oma verkkotunnus `pystystudio.fi` (28.10.2026): Domainhotelli, DNS Cloudflaressa (kaikki tietueet "DNS only"), GitHubin vahvistettu verkkotunnus ja Enforce HTTPS päällä. Vanha github.io-osoite ohjautuu uuteen.
- [ ] Kuva Hanneksesta Kuka klipit tekee -osioon (paikka on valmiina, ks. kommentti `index.html`:ssä)
- [ ] Oikea demoklippi Hanneksen omasta materiaalista
- [ ] Referenssit: klipit asiakkaan kirjallisella luvalla, sitten `hidden` pois osiosta (molemmilla kielillä)
- [ ] Tietosuojaseloste: osoite rekisterinpitäjän tietoihin, jos laki sitä vaatii, ja juristin tarkistus
- [ ] Fontit omalle palvelimelle, jos Google Fonts halutaan pois (ks. yllä)
- [ ] EUR/USD-kurssin päivitys tarvittaessa (ks. Kurssin päivitys)

## Mitä sivulla ei ole

- Ei evästeitä, analytiikkaa eikä seurantakoodia. Selaimeen tallennetaan vain valuuttavalinta, hintatapa (yksityishenkilö tai yritys) ja tieto nähdystä avausefektistä (localStorage). Ne eivät lähde selaimesta, ja ne on kerrottu tietosuojaselosteessa.
- Ei lomaketta, joka lähettäisi tietoja: yhteydenotot ja tarjouspyynnöt lähtevät kävijän omasta sähköpostiohjelmasta (`mailto:`), joten sivu ei kerää tietoja itse.
- Asiakkaiden nimiä, klippejä tai asiakaskohtaisia hintoja ei näytetä ilman lupaa.

Huom. README näkyy julkisessa repossa kaikille, joten tähän tiedostoon ei kirjoiteta asiakastietoja.
