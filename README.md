# Pysty Studio – verkkosivu

Pysty Studion oma staattinen sivusto: pelkkää HTML:ää, CSS:ää ja JavaScriptiä ilman taustapalvelinta. Sivu toimii sellaisenaan GitHub Pagesissa. Tehty 23.10.2026.

## Tiedostot

| Tiedosto | Mitä siinä on |
|---|---|
| `index.html` | Etusivu: hero ja esimerkkiklippi, Näin se toimii, Mitä klipeissä on, Palvelut ja hinnat, Lisäpalvelut, Referenssit, Usein kysyttyä ja Yhteys |
| `tietosuoja.html` | Tietosuojaseloste (luonnos, pohjana `02_sopimukset-ja-laki/2026-10-21_dpa-ja-tietosuoja.md`) |
| `assets/tyyli.css` | Kaikki tyylit. Brändivärit ja fontit ovat tiedoston alussa `:root`-osassa. |
| `assets/sivu.js` | Heron esimerkkiklippi: tekstitys sana kerrallaan ja puhujan vaihto |
| `assets/logo.svg` | **Väliaikainen** tekstilogo |
| `assets/favicon.svg` | Väliaikainen selainvälilehden kuvake |
| `.nojekyll` | Kertoo GitHub Pagesille, että sivu julkaistaan sellaisenaan |

## Esikatselu omalla koneella

Avaa `index.html` selaimessa tuplaklikkaamalla. Sivu toimii ilman palvelinta.

## Yhteystiedot

Sähköposti, puhelin ja nimi ovat `index.html`:ssä (Yhteys-osio, napit ja alapalkki) ja `tietosuoja.html`:ssä. Jos jokin niistä muuttuu, vaihda se Etsi ja korvaa -toiminnolla molemmista tiedostoista. Vaihda myös `mailto:`- ja `tel:`-linkit.

- **Referenssit-osio** on piilotettu (`hidden`), kunnes asiakkaalta on lupa. Kun klipit ovat paikallaan, poista `hidden` osion `<section>`-tagista.
- **Y-tunnusta ei ole,** joten sitä ei ole lisätty. Kun Oy perustetaan, lisää Y-tunnus alapalkkiin ja tietosuojaselosteeseen ja päivitä UKK:n kohta ”Miksi lasku tulee Keikkalaskulta?”.

## Logon ja värien vaihto

- **Logo:** korvaa `assets/logo.svg` lopullisella logolla samalla nimellä. Logo näkyy yläpalkissa ja alapalkissa molemmilla sivuilla. Jos uuden logon kuvasuhde on eri, päivitä `<img>`-tagien `width`- ja `height`-arvot (4 kohtaa: `index.html` ja `tietosuoja.html`, ylä- ja alapalkki). Korkeus asetetaan CSS:ssä (`.logo img` ja `.alapalkki-logo`), joten leveys seuraa kuvasuhdetta.
- **Kuvake:** korvaa `assets/favicon.svg`.
- **Värit:** vaihda `assets/tyyli.css`:n alussa olevat `--vari-…`-muuttujat. Esimerkkiklipin studio (`--k-…`) seuraa brändivärejä. Vaihda myös `theme-color` molempien HTML-tiedostojen `<head>`-osassa.
- **Fontit:** vaihda `--fontti-…`-muuttujat ja Google Fonts -linkki `<head>`-osassa.

## Hintojen muokkaus

Kaikki hinnat ovat `index.html`:ssä kahdessa osiossa, eikä niitä ole muualla:

- **Palvelut ja hinnat** (`<section id="hinnat">`): kuukausipaketit ja kertatyöt.
- **Lisäpalvelut** (`<section id="lisapalvelut">`): hinnasto A, jonka Hannes hyväksyi sivustolle 23.10.2026.

Jokainen palvelu on oma `<li class="hintarivi">`-rivinsä: nimi on `<h4>`-tagissa, kuvaus `<p>`-tagissa ja hinta `<span class="summa">`-tagissa. Uusi palvelu lisätään kopioimalla rivi. UKK:ssa hinta mainitaan kahdessa kohdassa, kiiretoimitus (+50 %) ja alv 25,5 %, joten tarkista ne, jos hinnat muuttuvat.

Asiakaskohtaisia hintoja ja tarjouksia ei laiteta sivulle.

## Fontit ja tietosuoja

Fontit (Sofia Sans ja Sofia Sans Extra Condensed, SIL Open Font License) ladataan nyt Google Fontsista. Google Fonts ei aseta evästeitä, mutta kävijän IP-osoite välittyy Googlelle, ja tämä on kerrottu tietosuojaselosteessa.

Jos haluat, ettei sivu ota yhteyttä Googleen:

1. Lataa fonttitiedostot (woff2) kansioon `assets/fontit/`.
2. Lisää `tyyli.css`:n alkuun `@font-face`-määrittelyt.
3. Poista Google Fonts -rivit (`preconnect` ja `stylesheet`) molemmista HTML-tiedostoista.
4. Poista Google Fonts tietosuojaselosteen kohdista ”Kuka tietoja käsittelee”, ”Sivuston käyttö” ja ”Siirrot EU:n ulkopuolelle”.

## Julkaisu (GitHub Pages)

Sivu julkaistiin 23.10.2026 samalla tavalla kuin Ajoura: omassa julkisessa repossaan GitHub Pagesiin.

| Mikä | Osoite |
|---|---|
| Sivu | https://mestarihannes.github.io/PystyStudio/ |
| Tietosuojaseloste | https://mestarihannes.github.io/PystyStudio/tietosuoja.html |
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
  - Tarkista nimi ensin, ks. `01_suunnitelma` (Tuomarin nimitarkistus).

## Vielä tekemättä

- [ ] Lopullinen logo ja kuvake (`08_brandi`): korvaa `assets/logo.svg` ja `assets/favicon.svg`
- [ ] Referenssit: klipit asiakkaan kirjallisella luvalla, sitten `hidden` pois osiosta
- [ ] Tietosuojaseloste: osoite rekisterinpitäjän tietoihin, jos laki sitä vaatii, ja juristin tarkistus
- [ ] Fontit omalle palvelimelle, jos Google Fonts halutaan pois (ks. yllä)

## Mitä sivulla ei ole

- Ei evästeitä, analytiikkaa eikä seurantakoodia.
- Ei lomaketta: yhteydenotot tulevat sähköpostilla (`mailto:`), joten sivu ei kerää tietoja itse.
- Asiakkaiden nimiä, klippejä tai asiakaskohtaisia hintoja ei näytetä ilman lupaa.

Huom. README näkyy julkisessa repossa kaikille, joten tähän tiedostoon ei kirjoiteta asiakastietoja.
