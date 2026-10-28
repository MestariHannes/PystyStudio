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
  // 4 klippiä lisätty 28.10.2026 (Hanneksen päätös): pienille kanaville, 32,25 €/klippi, eli portaat pysyvät järjestyksessä.
  // Yli 24 klippiä lisätty 28.10.2026 (Hanneksen pyyntö): 24 klipin hinta + 25 € jokaisesta lisäklipistä (sama kuin Lisäklippi).
  // Joka klippimäärä 29.10.2026 (Hanneksen päätös): Klippaamo 4–64 ja kertaerä 1–50 yhden klipin välein.
  // Hyväksytyt portaat ovat ennallaan (Klippaamo 4/8/12/16/20/24, kertaerä 1/4/6/8). Välimäärien hinta on
  // tasaisesti portaiden välistä euroon pyöristettynä, ja viimeisen portaan jälkeen 25 € jokaisesta lisäklipistä.
  klippaamo: {
    4: 129, 5: 159, 6: 189, 7: 219, 8: 249, 9: 274, 10: 299, 11: 324, 12: 349, 13: 369,
    14: 389, 15: 409, 16: 429, 17: 447, 18: 464, 19: 482, 20: 499, 21: 524, 22: 549, 23: 574,
    24: 599, 25: 624, 26: 649, 27: 674, 28: 699, 29: 724, 30: 749, 31: 774, 32: 799, 33: 824,
    34: 849, 35: 874, 36: 899, 37: 924, 38: 949, 39: 974, 40: 999, 41: 1024, 42: 1049, 43: 1074,
    44: 1099, 45: 1124, 46: 1149, 47: 1174, 48: 1199, 49: 1224, 50: 1249, 51: 1274, 52: 1299, 53: 1324,
    54: 1349, 55: 1374, 56: 1399, 57: 1424, 58: 1449, 59: 1474, 60: 1499, 61: 1524, 62: 1549, 63: 1574,
    64: 1599
  },
  kertaera: {
    1: 49, 2: 82, 3: 116, 4: 149, 5: 174, 6: 199, 7: 234, 8: 269, 9: 294, 10: 319,
    11: 344, 12: 369, 13: 394, 14: 419, 15: 444, 16: 469, 17: 494, 18: 519, 19: 544, 20: 569,
    21: 594, 22: 619, 23: 644, 24: 669, 25: 694, 26: 719, 27: 744, 28: 769, 29: 794, 30: 819,
    31: 844, 32: 869, 33: 894, 34: 919, 35: 944, 36: 969, 37: 994, 38: 1019, 39: 1044, 40: 1069,
    41: 1094, 42: 1119, 43: 1144, 44: 1169, 45: 1194, 46: 1219, 47: 1244, 48: 1269, 49: 1294, 50: 1319
  },
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
  }
};
