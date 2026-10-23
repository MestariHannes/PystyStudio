# Pysty Studio – verkkosivu

Pysty Studion oma staattinen sivusto: pelkkää HTML:ää, CSS:ää ja JavaScriptiä ilman taustapalvelinta. Sivu toimii sellaisenaan GitHub Pagesissa. Tehty 23.10.2026. Englanninkieliset sivut ja valuuttavalinta (EUR / USD) lisättiin 23.10.2026.

## Tiedostot

| Tiedosto | Mitä siinä on |
|---|---|
| `index.html` | Etusivu: hero ja esimerkkiklippi, Näin se toimii, Mitä klipeissä on, Palvelut ja hinnat, Lisäpalvelut, Referenssit, Usein kysyttyä ja Yhteys |
| `tietosuoja.html` | Tietosuojaseloste (luonnos, pohjana `02_sopimukset-ja-laki/2026-10-21_dpa-ja-tietosuoja.md`) |
| `naytteet.html` | Ilmaisten näytteiden ehdot (sanatarkasti `02_sopimukset-ja-laki/2026-10-23_nayte-ehdot.md`, osio 1). Linkki alapalkissa ja CTA-nappien alla. |
| `en/index.html` | Etusivu englanniksi (sama rakenne ja samat säätimet) |
| `en/samples.html` | Näytteiden ehdot englanniksi. Kohta 6 ja käännösmerkintä ovat Tuomarin tekstejä. |
| `en/privacy.html` | Tietosuojaseloste englanniksi, lopussa käännösmerkintä (Tuomarin teksti) |
| `assets/tyyli.css` | Kaikki tyylit. Brändivärit ja fontit ovat tiedoston alussa `:root`-osassa. |
| `assets/sivu.js` | Heron esimerkkiklippi: tekstitys sana kerrallaan ja puhujan vaihto. Repliikit suomeksi ja englanniksi sivun kielen mukaan. |
| `assets/hintadata.js` | **Kaikki hinnat ja EUR/USD-kurssi yhdessä paikassa.** Molemmat kielet käyttävät tätä. |
| `assets/valuutta.js` | Valuuttavalitsin (EUR / USD), valinnan muistaminen ja rahasummien muotoilu |
| `assets/hinnat.js` | Hintojen liukusäätimet, Klippaamon apusäätimet (videoita × klippiä per video) ja Klippitilin hoidon alustavalinta |
| `assets/logo.svg` | Nimilogo PYSTY\|STUDIO vaalealle pohjalle (konsepti 4, Pystyviiva). Yläpalkissa. |
| `assets/logo-tumma.svg` | Nimilogo tummalle pohjalle. Mustassa alapalkissa. |
| `assets/favicon.svg` | Selainvälilehden kuvake (P\| mustalla pohjalla) |
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

- **Kielivalitsin FI | EN** on jokaisen sivun yläpalkissa (`<nav class="kielet">`). Linkki vie vastaavalle sivulle toisella kielellä. Nykyisen kielen linkissä on `aria-current="page"`.
- **Hakukoneet:** jokaisen sivun `<head>`-osassa on `hreflang`-linkit (fi, en ja x-default = suomi). Osoitteet ovat täysiä osoitteita (`https://mestarihannes.github.io/PystyStudio/...`). Jos sivulle tulee oma verkkotunnus, vaihda ne kaikista kuudesta HTML-tiedostosta.
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

Sähköposti, puhelin ja nimi ovat kaikissa kuudessa HTML-tiedostossa (Yhteys-osio, napit ja alapalkki sekä tietosuojaselosteet). Jos jokin niistä muuttuu, vaihda se Etsi ja korvaa -toiminnolla kaikista tiedostoista. Vaihda myös `mailto:`- ja `tel:`-linkit.

- **Referenssit-osio** on piilotettu (`hidden`), kunnes asiakkaalta on lupa. Kun klipit ovat paikallaan, poista `hidden` osion `<section>`-tagista (molemmilla kielillä).
- **Y-tunnusta ei ole,** joten sitä ei ole lisätty. Kun Oy perustetaan, lisää Y-tunnus alapalkkiin ja tietosuojaselosteeseen ja päivitä UKK:n kohta ”Miksi lasku tulee Keikkalaskulta?” molemmilla kielillä. Englanninkielinen laskutusrivi on Tuomarin teksti, joten muutos tarkistetaan Tuomarilla.

## Logo ja ilme

Sivu käyttää logokonseptia 4, Pystyviiva, jonka Hannes valitsi 23.10.2026. Lähteet ja perustelut ovat kansiossa `08_brandi` (`2026-10-23_logo-perustelut.md`, osio 4). Edelliset väliaikaiset logo ja kuvake on arkistoitu kansioon `99_arkisto` (`2026-10-23_verkkosivu-logo-valiaikainen.svg` ja `2026-10-23_verkkosivu-favicon-valiaikainen.svg`).

- **Värit:** musta `#000000`, tekstityskeltainen `#FFE100`, valkoinen `#FFFFFF` ja betoni `#E4E4E1` (sivun tausta). Ne ovat `assets/tyyli.css`:n alussa `:root`-osassa. Esimerkkiklipin studio käyttää `--k-…`-muuttujia. `theme-color` on musta kaikkien HTML-tiedostojen `<head>`-osassa.
- **Keltaisen käyttö:** keltainen erottuu valkoisesta ja betonista huonosti (1,3:1). Sitä käytetään vain mustalla pohjalla (yhteysosio ja alapalkki), korostuksena mustan tekstin takana (linkkien ja nappien hover, valittu valuutta) tai mustan reunan kanssa (otsikon pystyviiva, vaiheiden numerot, merkit ja aikajanan kohdat). Keltaista tekstiä ei käytetä vaalealla pohjalla.
- **Fontit:** Big Shoulders Display (900) otsikoissa ja Figtree leipätekstissä. Muuttujat `--fontti-…` ja Google Fonts -linkki `<head>`-osassa.
- **Logon vaihto:** korvaa `assets/logo.svg` ja `assets/logo-tumma.svg` samoilla nimillä. Jos kuvasuhde muuttuu, päivitä `<img>`-tagien `width`- ja `height`-arvot (kaikki kuusi HTML-tiedostoa, ylä- ja alapalkki). Vaalea logo on 537 × 121 ja tumma 537 × 112. Korkeus asetetaan CSS:ssä (`.logo img` ja `.alapalkki-logo`), joten leveys seuraa kuvasuhdetta.
- **Kuvake:** `assets/favicon.svg`.

## Hintojen muokkaus

**Hinnat ovat tiedostossa `assets/hintadata.js`** (euroja, alv 0 %). Sieltä ne tulevat kummankin kielen etusivulle, ja JavaScript kirjoittaa ne sivulle.

Etusivuilla (`index.html` ja `en/index.html`) on samat hinnat myös näkyvinä teksteinä sitä varten, että sivu toimii ilman JavaScriptiä. **Kun muutat hintaa:**

1. Muuta hinta `hintadata.js`:ään.
2. Muuta sama hinta näkyvään tekstiin molemmissa HTML-tiedostoissa. Säädinkorteissa tämä koskee vain oletusporrasta (ks. alla).
3. Tarkista UKK: kiiretoimitus (+50 %), lisäkorjaus (15 €) ja suomeksi alv 25,5 %.

Hinnat ovat kahdessa osiossa:

- **Palvelut ja hinnat** (`<section id="hinnat">`, englanniksi `id="pricing"`): kuukausipaketit ja kertatyöt.
- **Lisäpalvelut** (`<section id="lisapalvelut">`, englanniksi `id="add-ons"`): hinnasto A, jonka Hannes hyväksyi sivustolle 23.10.2026.

Jokainen palvelu on oma `<li class="hintarivi">`-rivinsä: nimi on `<h4>`-tagissa, kuvaus `<p>`-tagissa ja hinta `<span class="summa">`-tagissa.

- **Kiinteä hinta** on merkitty `data-hinta="nimi"`, ja nimi viittaa `hintadata.js`:n `kiinteat`-osaan (esim. `data-hinta="lisaklippi"`).
  - `data-etumerkki="+"` lisää plusmerkin (esim. +5 €/klippi).
  - Tekstin sisällä olevassa hinnassa `data-jakso` on summan perään tuleva teksti (esim. `/kpl`), ja `data-sulut` tarkoittaa, että summa on sulkeissa.
- **Uusi palvelu** lisätään kopioimalla rivi molempiin HTML-tiedostoihin ja lisäämällä hinta `hintadata.js`:n `kiinteat`-osaan uudella nimellä.

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
  4. Vaihda `hreflang`-osoitteet kaikista HTML-tiedostoista (ks. Kielet).
  - Tarkista nimi ensin, ks. `01_suunnitelma` (Tuomarin nimitarkistus).

## Vielä tekemättä

- [x] Lopullinen logo ja kuvake: konsepti 4, Pystyviiva (23.10.2026)
- [x] Englanninkieliset sivut ja valuuttavalinta EUR / USD (23.10.2026)
- [ ] PNG-kuvake (`favicon.ico`, `apple-touch-icon`) ja jakokuva (`og:image`), kun logo on viimeistelty
- [ ] Referenssit: klipit asiakkaan kirjallisella luvalla, sitten `hidden` pois osiosta (molemmilla kielillä)
- [ ] Tietosuojaseloste: osoite rekisterinpitäjän tietoihin, jos laki sitä vaatii, ja juristin tarkistus
- [ ] Fontit omalle palvelimelle, jos Google Fonts halutaan pois (ks. yllä)
- [ ] EUR/USD-kurssin päivitys tarvittaessa (ks. Kurssin päivitys)

## Mitä sivulla ei ole

- Ei evästeitä, analytiikkaa eikä seurantakoodia. Ainoa selaimeen tallennettava tieto on valuuttavalinta (localStorage), joka ei lähde selaimesta.
- Ei lomaketta: yhteydenotot tulevat sähköpostilla (`mailto:`), joten sivu ei kerää tietoja itse.
- Asiakkaiden nimiä, klippejä tai asiakaskohtaisia hintoja ei näytetä ilman lupaa.

Huom. README näkyy julkisessa repossa kaikille, joten tähän tiedostoon ei kirjoiteta asiakastietoja.
