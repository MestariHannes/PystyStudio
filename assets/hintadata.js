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
  // Joka määrä 29.10.2026 (Hanneksen päätökset): kaikki vivut yhden välein. Klippaamo 1–64 (alkaa 1 klipistä:
  // 1 = 39 €, 2 = 69 €, 3 = 99 €), kertaerä 1–50, AI-mainokset 5–20, Arkisto 10–50 ja klippitilin julkaisut 8–30.
  // Hyväksytyt portaat ovat ennallaan. Välimäärien hinta on tasaisesti portaiden välistä euroon pyöristettynä,
  // ja viimeisen portaan jälkeen 25 € jokaisesta lisäklipistä (Klippaamo yli 24, kertaerä yli 8).
  klippaamo: {
    1: 39, 2: 69, 3: 99, 4: 129, 5: 159, 6: 189, 7: 219, 8: 249, 9: 274, 10: 299,
    11: 324, 12: 349, 13: 369, 14: 389, 15: 409, 16: 429, 17: 447, 18: 464, 19: 482, 20: 499,
    21: 524, 22: 549, 23: 574, 24: 599, 25: 624, 26: 649, 27: 674, 28: 699, 29: 724, 30: 749,
    31: 774, 32: 799, 33: 824, 34: 849, 35: 874, 36: 899, 37: 924, 38: 949, 39: 974, 40: 999,
    41: 1024, 42: 1049, 43: 1074, 44: 1099, 45: 1124, 46: 1149, 47: 1174, 48: 1199, 49: 1224, 50: 1249,
    51: 1274, 52: 1299, 53: 1324, 54: 1349, 55: 1374, 56: 1399, 57: 1424, 58: 1449, 59: 1474, 60: 1499,
    61: 1524, 62: 1549, 63: 1574, 64: 1599
  },
  kertaera: {
    1: 49, 2: 82, 3: 116, 4: 149, 5: 174, 6: 199, 7: 234, 8: 269, 9: 294, 10: 319,
    11: 344, 12: 369, 13: 394, 14: 419, 15: 444, 16: 469, 17: 494, 18: 519, 19: 544, 20: 569,
    21: 594, 22: 619, 23: 644, 24: 669, 25: 694, 26: 719, 27: 744, 28: 769, 29: 794, 30: 819,
    31: 844, 32: 869, 33: 894, 34: 919, 35: 944, 36: 969, 37: 994, 38: 1019, 39: 1044, 40: 1069,
    41: 1094, 42: 1119, 43: 1144, 44: 1169, 45: 1194, 46: 1219, 47: 1244, 48: 1269, 49: 1294, 50: 1319
  },
  aiMainos: {
    5: 390, 6: 450, 7: 510, 8: 570, 9: 630, 10: 690, 11: 740, 12: 790,
    13: 840, 14: 890, 15: 940, 16: 990, 17: 1040, 18: 1090, 19: 1140, 20: 1190
  },
  arkisto: {
    10: 249, 11: 267, 12: 285, 13: 303, 14: 321, 15: 339, 16: 357, 17: 375, 18: 393, 19: 411,
    20: 429, 21: 445, 22: 461, 23: 477, 24: 493, 25: 510, 26: 526, 27: 542, 28: 558, 29: 574,
    30: 590, 31: 605, 32: 620, 33: 635, 34: 650, 35: 665, 36: 680, 37: 695, 38: 710, 39: 725,
    40: 740, 41: 755, 42: 770, 43: 785, 44: 800, 45: 815, 46: 830, 47: 845, 48: 860, 49: 875,
    50: 890
  },

  // Klippitilin hoito: julkaisuja kuukaudessa → €/kk, kun alustoja on [1, 2, 3].
  tilinhoito: {
    8: [99, 119, 139], 9: [104, 127, 147], 10: [109, 134, 154], 11: [114, 142, 162],
    12: [119, 149, 169], 13: [123, 153, 173], 14: [127, 157, 177], 15: [130, 160, 180],
    16: [134, 164, 184], 17: [138, 168, 188], 18: [142, 172, 192], 19: [145, 175, 195],
    20: [149, 179, 199], 21: [152, 183, 204], 22: [155, 187, 209], 23: [158, 191, 214],
    24: [161, 195, 219], 25: [164, 199, 224], 26: [167, 203, 229], 27: [170, 207, 234],
    28: [173, 211, 239], 29: [176, 215, 244], 30: [179, 219, 249]
  },
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
