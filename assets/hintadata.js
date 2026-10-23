/* Pysty Studio – kaikki hinnat ja valuuttakurssi yhdessä paikassa.
   Hinnat ovat euroja, alv 0 %. Tätä tiedostoa käyttävät sekä suomen- että englanninkielinen sivu.

   Sivujen HTML:ssä (index.html ja en/index.html) on samat hinnat näkyvinä teksteinä sitä varten,
   että sivu toimii myös ilman JavaScriptiä. Kun muutat hintaa, muuta se tähän ja päivitä myös
   näkyvät tekstit molempiin HTML-tiedostoihin. Ohje: README.md, kohta Hintojen muokkaus. */
window.PystyHinnat = {
  // Euroopan keskuspankin virallinen EUR/USD-viitekurssi (euro foreign exchange reference rates):
  // 1 € = usd dollaria, päivältä pvm. Päivitys: README.md, kohta Valuutta. Muuta vain nämä kaksi arvoa.
  kurssi: { usd: 1.1205, pvm: '2026-10-22' },

  alvPromille: 1255, // alv 25,5 %: hinta × 1,255

  // Portaittaiset palvelut: määrä (klippejä, mainoksia) → hinta €. Portaat näkyvät myös HTML:n data-portaat-kentässä.
  klippaamo: { 8: 249, 12: 349, 16: 429, 20: 499, 24: 599 },
  kertaera: { 1: 49, 4: 149, 6: 199, 8: 269 },
  aiMainos: { 5: 390, 10: 690, 20: 1190 },
  arkisto: { 10: 249, 20: 429, 30: 590, 50: 890 },

  // Klippitilin hoito: julkaisuja kuukaudessa → €/kk, kun alustoja on [1, 2, 3].
  tilinhoito: { 8: [99, 119, 139], 12: [119, 149, 169], 20: [149, 179, 199], 30: [179, 219, 249] },
  // Käyttöönotto (kertamaksu), kun alustoja on [1, 2, 3].
  tilinhoitoKayttoonotto: [99, 129, 149],

  // Kiinteät hinnat. HTML:ssä hinta on merkitty data-hinta="nimi".
  kiinteat: {
    kaikkiValmiina: 649,             // Klippitili Kaikki valmiina, €/kk
    kaikkiValmiinaKayttoonotto: 149, // sen käyttöönotto
    pystyPuhe: 290,
    lisaklippi: 25,
    livestriimi: 269,
    traileri: 25,
    kommenttivastaus: 20,
    bestOf: 79,
    ennenJalkeen: 99,
    sponsori: 149,
    audiogrammi: 15,
    julkaisutekstit: 60,             // €/kk
    julkaisuPuolesta: 120,           // €/kk
    kuukausiraportti: 49,            // €/kk
    kansikuva: 10,
    pikkukuva: 49,
    englanninTekstitys: 5,           // + €/klippi
    vaakaversio: 10,                 // + €/klippi
    lisakorjaus: 15                  // €/klippi
  },
  kiireProsentti: 50                 // kiiretoimitus 24 h: +50 %
};
