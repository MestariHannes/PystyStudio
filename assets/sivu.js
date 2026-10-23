/* Pysty Studio – etusivun pienet toiminnot.
   1. Avattavat osiot (<details>): kun sivulle tullaan ankkurilla (esim. #lisapalvelut tai #klippitilin-hoito)
      tai sivun sisäinen linkki osoittaa avattavan osion sisälle, osio avataan ja kohta vieritetään näkyviin.
      Ilman JavaScriptiä osiot avautuvat itse napauttamalla.
   2. Heron esimerkkiklippi: tekstitys etenee sana kerrallaan, ja rajaus hyppää puhujaan, kun puhuja vaihtuu.
      Jos käyttäjä on pyytänyt vähemmän liikettä, näytetään yksi pysäytyskuva. */
(function () {
  'use strict';

  function kohde(hash) {
    if (!hash || hash.length < 2) return null;
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch (e) { return null; }
  }
  // Avaa kohteen ja sitä ympäröivät suljetut osiot. Palauttaa true, jos jokin osio avattiin.
  function avaa(el) {
    var avattiin = false;
    var d = el && (el.tagName === 'DETAILS' ? el : el.closest('details'));
    while (d) {
      if (!d.open) { d.open = true; avattiin = true; }
      d = d.parentElement ? d.parentElement.closest('details') : null;
    }
    return avattiin;
  }
  // Latauksessa vieritys on välitön (selaimen oma ankkurivieritys ei löydä suljetun osion sisältöä),
  // ja se toistetaan load-tapahtumassa, kun fontit ja hinnat ovat paikallaan.
  function ankkuri(alussa) {
    var el = kohde(window.location.hash);
    if (!el || !avaa(el)) return;
    if (alussa !== true) { el.scrollIntoView(); return; }
    el.scrollIntoView({ behavior: 'instant' });
    window.addEventListener('load', function () { el.scrollIntoView({ behavior: 'instant' }); });
  }

  ankkuri(true);
  window.addEventListener('hashchange', ankkuri);
  // Sisäinen linkki samaan ankkuriin, joka on jo osoitteessa: hashchange ei laukea, joten avataan klikkauksesta.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (a) avaa(kohde(a.getAttribute('href')));
  });
})();

(function () {
  'use strict';

  var demo = document.querySelector('[data-demo]');
  if (!demo) return;

  var teksti = demo.querySelector('.tekstitys');
  var nappi = demo.querySelector('.demo-tauko');
  var en = document.documentElement.lang === 'en';

  // Esimerkin repliikit sivun kielellä (index.html suomeksi, en/index.html englanniksi).
  var VAIHEET = en ? [
    { puhuja: 'a', sanat: 'An hour-long episode' },
    { puhuja: 'a', sanat: 'becomes eight clips.', zoomi: true },
    { puhuja: 'b', sanat: 'What do I' },
    { puhuja: 'b', sanat: 'need to do?' },
    { puhuja: 'a', sanat: 'Send a link.' },
    { puhuja: 'a', loppu: 'Full episode on YouTube', emoji: '🔥' }
  ] : [
    { puhuja: 'a', sanat: 'Tunnin jaksosta' },
    { puhuja: 'a', sanat: 'tulee kahdeksan klippiä.', zoomi: true },
    { puhuja: 'b', sanat: 'Mitä mun pitää' },
    { puhuja: 'b', sanat: 'tehdä itse?' },
    { puhuja: 'a', sanat: 'Lähettää linkki.' },
    { puhuja: 'a', loppu: 'Koko jakso YouTubessa', emoji: '🔥' }
  ];
  var NAPPI = en ? ['Pause example', 'Play example'] : ['Pysäytä esimerkki', 'Jatka esimerkkiä'];
  var SANAVALI = 300;   // ms sanojen välillä
  var PIDA = 900;       // ms viimeisen sanan jälkeen
  var PIDA_LOPPU = 2600;

  var vaihe = 0;
  var sana = 0;
  var ajastin = null;
  var kayttajaPysaytti = false;
  var nakyvissa = true;

  function piirra(v) {
    demo.dataset.puhuja = v.puhuja;
    demo.dataset.zoomi = v.zoomi ? '1' : '0';
    teksti.textContent = '';
    teksti.classList.toggle('loppukehote', Boolean(v.loppu));

    var osat = v.loppu ? [v.loppu] : v.sanat.split(' ');
    osat.forEach(function (osa, i) {
      if (i > 0) teksti.appendChild(document.createTextNode(' '));
      var el = document.createElement('span');
      el.className = 'sana';
      el.textContent = osa;
      teksti.appendChild(el);
    });
    if (v.emoji) {
      var e = document.createElement('span');
      e.className = 'sana emoji';
      e.textContent = v.emoji;
      teksti.appendChild(e);
    }
  }

  function askel() {
    var v = VAIHEET[vaihe];
    if (sana === 0) piirra(v);

    var sanat = teksti.querySelectorAll('.sana');
    if (v.loppu) {
      sanat.forEach(function (el) { el.classList.add('nakyy'); });
      sana = sanat.length;
    } else if (sana < sanat.length) {
      sanat[sana].classList.add('nakyy');
      sana += 1;
    }

    if (sana < sanat.length) {
      ajastin = setTimeout(askel, SANAVALI);
    } else {
      ajastin = setTimeout(function () {
        vaihe = (vaihe + 1) % VAIHEET.length;
        sana = 0;
        askel();
      }, v.loppu ? PIDA_LOPPU : PIDA);
    }
  }

  function kaynnista() {
    if (ajastin || kayttajaPysaytti || !nakyvissa) return;
    askel();
  }

  function pysayta() {
    clearTimeout(ajastin);
    ajastin = null;
  }

  // Vähemmän liikettä: pysäytyskuva ilman silmukkaa.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    piirra(VAIHEET[1]);
    teksti.querySelectorAll('.sana').forEach(function (el) { el.classList.add('nakyy'); });
    return;
  }

  // Napin teksti kertoo, mitä painallus tekee (Pysäytä / Jatka), joten aria-pressed-tilaa ei käytetä.
  nappi.hidden = false;
  nappi.addEventListener('click', function () {
    kayttajaPysaytti = !kayttajaPysaytti;
    nappi.textContent = kayttajaPysaytti ? NAPPI[1] : NAPPI[0];
    if (kayttajaPysaytti) pysayta(); else kaynnista();
  });

  // Esimerkki pyörii vain, kun se näkyy ruudulla.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (havainnot) {
      nakyvissa = havainnot[0].isIntersecting;
      if (nakyvissa) kaynnista(); else pysayta();
    }).observe(demo);
  }

  kaynnista();
})();
