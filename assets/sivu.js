/* Pysty Studio – etusivun pienet toiminnot.
   1. Avattavat osiot (<details>): kun sivulle tullaan ankkurilla (esim. #lisapalvelut tai #klippitilin-hoito)
      tai sivun sisäinen linkki osoittaa avattavan osion sisälle, osio avataan ja kohta vieritetään näkyviin.
      Ilman JavaScriptiä osiot avautuvat itse napauttamalla.
   2. Heron klippisyöte (uudistettu 28.10.2026): puhelimessa pyörii kolme klippiä samasta jaksosta. Tekstitys etenee
      sana kerrallaan, rajaus hyppää puhujaan, ja klippi vaihtuu pyyhkäisemällä ylös kuin somesyötteessä. Aikajanan
      keltainen kursori kelaa kohtaan, josta klippi on tehty. Vähemmän liikettä: yksi pysäytyskuva.
   3. Mobiilivalikko (lisätty 28.10.2026): alle 56em päävalikko ja kielivalinta avautuvat yläpalkin Valikko-napista.
      Valikko sulkeutuu linkistä, Esc-näppäimestä, ohi napauttamalla ja kun näyttö levenee.
   4. Kopioi osoite (lisätty 28.10.2026): jos sähköpostinappi ei avaa sähköpostiohjelmaa, osoitteen voi kopioida.
      Jos leikepöytä ei ole käytössä, osoite valitaan valmiiksi kopioitavaksi. */
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

  var klippi = demo.querySelector('.klippi');
  var kerros = demo.querySelector('.klippi-sisalto');
  var teksti = kerros.querySelector('.tekstitys');
  var nappi = demo.querySelector('.demo-tauko');
  var kursori = demo.querySelector('.aikajana-kursori');
  var aikaEl = demo.querySelector('.aikajana-aika');
  var kohdat = demo.querySelectorAll('.aikajana-kohdat rect');
  var en = document.documentElement.lang === 'en';

  // Klipit sivun kielellä (index.html suomeksi, en/index.html englanniksi).
  // kohta = aikajanan korostettu kohta (0–7), josta klippi on tehty. Puhujan vaihtuessa rajaus hyppää.
  var KLIPIT = en ? [
    { kohta: 1, vaiheet: [{ puhuja: 'a', sanat: 'An hour-long episode' }, { puhuja: 'a', sanat: 'becomes eight clips.', zoomi: true }] },
    { kohta: 4, vaiheet: [{ puhuja: 'b', sanat: 'What do I' }, { puhuja: 'b', sanat: 'need to do?' }, { puhuja: 'a', sanat: 'Send a link.' }] },
    { kohta: 6, vaiheet: [{ puhuja: 'b', sanat: 'How long' }, { puhuja: 'b', sanat: 'does it take?' }, { puhuja: 'a', sanat: 'Usually a day.', zoomi: true },
      { puhuja: 'a', loppu: 'Full episode on YouTube', emoji: '🔥' }] }
  ] : [
    { kohta: 1, vaiheet: [{ puhuja: 'a', sanat: 'Tunnin jaksosta' }, { puhuja: 'a', sanat: 'tulee kahdeksan klippiä.', zoomi: true }] },
    { kohta: 4, vaiheet: [{ puhuja: 'b', sanat: 'Mitä mun pitää' }, { puhuja: 'b', sanat: 'tehdä itse?' }, { puhuja: 'a', sanat: 'Lähettää linkki.' }] },
    { kohta: 6, vaiheet: [{ puhuja: 'b', sanat: 'Kauanko siinä' }, { puhuja: 'b', sanat: 'menee?' }, { puhuja: 'a', sanat: 'Yleensä vuorokausi.', zoomi: true },
      { puhuja: 'a', loppu: 'Koko jakso YouTubessa', emoji: '🔥' }] }
  ];
  var NAPPI = en ? ['Pause example', 'Play example'] : ['Pysäytä esimerkki', 'Jatka esimerkkiä'];
  var SANAVALI = 300;    // ms sanojen välillä
  var PIDA = 900;        // ms vaiheen viimeisen sanan jälkeen
  var PIDA_LOPPU = 2400;
  var PYYHKAISY = 560;   // ms: klippi vaihtuu pyyhkäisemällä ylös kuin somesyötteessä
  var PEHMEA = 'cubic-bezier(.22, 1, .36, 1)';
  var JAKSO = 3520;      // jakson pituus sekunteina (58:40, aikajanan oikea reuna)
  var LEVEYS = 1200;     // aikajanan viewBox-leveys

  var klippiNro = 0, vaihe = 0, sana = 0;
  var ajastin = null, liukuAjastin = null;
  var kayttajaPysaytti = false;
  var nakyvissa = true;
  var odottaaIntroa = false;

  function aikaTeksti(sekunnit) {
    var m = Math.floor(sekunnit / 60), s = Math.floor(sekunnit % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
  function kohdanAlku(i) { return Number(kohdat[i].getAttribute('x')) / LEVEYS; }
  function kohdanLoppu(i) { return (Number(kohdat[i].getAttribute('x')) + Number(kohdat[i].getAttribute('width'))) / LEVEYS; }
  // Klipin kesto suunnilleen: sanat × väli ja tauot. Kursori liukuu kohdan läpi saman ajan.
  function kesto(k) {
    return k.vaiheet.reduce(function (s, v) {
      return s + (v.loppu ? PIDA_LOPPU : v.sanat.split(' ').length * SANAVALI + PIDA);
    }, 0);
  }

  // Kursori: ensin pehmeästi kohdan alkuun, sitten tasaisesti kohdan läpi klipin ajan.
  function kursoriKohtaan(k) {
    if (!kursori || !kohdat.length) return;
    kursori.hidden = false;
    Array.prototype.forEach.call(kohdat, function (r, i) { r.classList.toggle('nyt', i === k.kohta); });
    aikaEl.textContent = aikaTeksti(kohdanAlku(k.kohta) * JAKSO);
    kursori.style.transition = 'left .7s ' + PEHMEA;
    kursori.style.left = (kohdanAlku(k.kohta) * 100) + '%';
    clearTimeout(liukuAjastin);
    liukuAjastin = setTimeout(function () {
      kursori.style.transition = 'left ' + (kesto(k) / 1000) + 's linear';
      kursori.style.left = (kohdanLoppu(k.kohta) * 100) + '%';
    }, 700);
  }
  function kursoriSeis() {
    if (!kursori) return;
    clearTimeout(liukuAjastin);
    var vasen = getComputedStyle(kursori).left;
    kursori.style.transition = 'none';
    kursori.style.left = vasen;
  }

  function piirra(v) {
    demo.dataset.puhuja = v.puhuja;
    kerros.dataset.puhuja = v.puhuja;
    kerros.dataset.zoomi = v.zoomi ? '1' : '0';
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

  // Edellinen klippi liukuu ylös, ja uusi tulee alta.
  function pyyhkaise() {
    if (!kerros.animate) return;
    var vanha = kerros.cloneNode(true);
    vanha.classList.add('klippi-sisalto-vanha');
    klippi.appendChild(vanha);
    var asetus = { duration: PYYHKAISY, easing: PEHMEA };
    vanha.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], asetus).onfinish = function () {
      if (vanha.parentNode) vanha.parentNode.removeChild(vanha);
    };
    kerros.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], asetus);
  }

  function askel() {
    var k = KLIPIT[klippiNro];
    var v = k.vaiheet[vaihe];
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
      return;
    }
    ajastin = setTimeout(function () {
      sana = 0;
      vaihe += 1;
      if (vaihe < k.vaiheet.length) { askel(); return; }
      // Seuraava klippi: pyyhkäisy, kursori seuraavaan kohtaan ja ensimmäinen sana pyyhkäisyn jälkeen.
      vaihe = 0;
      klippiNro = (klippiNro + 1) % KLIPIT.length;
      pyyhkaise(); // kopio vanhasta klipistä ensin, sitten uusi sisältö alta nousevaan kerrokseen
      piirra(KLIPIT[klippiNro].vaiheet[0]);
      kursoriKohtaan(KLIPIT[klippiNro]);
      ajastin = setTimeout(askel, PYYHKAISY * 0.6);
    }, v.loppu ? PIDA_LOPPU : PIDA);
  }

  function kaynnista() {
    if (ajastin || kayttajaPysaytti || !nakyvissa || odottaaIntroa) return;
    kursoriKohtaan(KLIPIT[klippiNro]);
    askel();
  }

  function pysayta() {
    clearTimeout(ajastin);
    ajastin = null;
    kursoriSeis();
  }

  // Vähemmän liikettä: pysäytyskuva ilman silmukkaa ja pyyhkäisyä.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    piirra(KLIPIT[0].vaiheet[1]);
    teksti.querySelectorAll('.sana').forEach(function (el) { el.classList.add('nakyy'); });
    if (kursori && kohdat.length) {
      kursori.hidden = false;
      kursori.style.left = (kohdanAlku(KLIPIT[0].kohta) * 100) + '%';
      aikaEl.textContent = aikaTeksti(kohdanAlku(KLIPIT[0].kohta) * JAKSO);
      kohdat[KLIPIT[0].kohta].classList.add('nyt');
    }
    return;
  }

  // Napin teksti kertoo, mitä painallus tekee (Pysäytä / Jatka), joten aria-pressed-tilaa ei käytetä.
  nappi.hidden = false;
  nappi.addEventListener('click', function () {
    kayttajaPysaytti = !kayttajaPysaytti;
    nappi.textContent = kayttajaPysaytti ? NAPPI[1] : NAPPI[0];
    if (kayttajaPysaytti) pysayta(); else kaynnista();
  });

  // Avausefektin aikana esimerkki odottaa, jotta ensimmäinen klippi näkyy alusta asti (hero saa luokan ilme-esilla, kun intro aukeaa).
  var hero = demo.closest('.hero');
  if (hero && document.querySelector('.ilme-intro') && !hero.classList.contains('ilme-esilla') && 'MutationObserver' in window) {
    odottaaIntroa = true;
    var introVahti = new MutationObserver(function () {
      if (!hero.classList.contains('ilme-esilla')) return;
      introVahti.disconnect();
      odottaaIntroa = false;
      kaynnista();
    });
    introVahti.observe(hero, { attributes: true, attributeFilter: ['class'] });
  }

  // Esimerkki pyörii vain, kun se näkyy ruudulla.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (havainnot) {
      nakyvissa = havainnot[0].isIntersecting;
      if (nakyvissa) kaynnista(); else pysayta();
    }).observe(demo);
  }

  kaynnista();
})();

(function () {
  'use strict';

  var nappi = document.querySelector('.valikko-nappi');
  var valikko = document.getElementById('paavalikko');
  if (!nappi || !valikko) return;

  var h = document.documentElement;
  var kapea = window.matchMedia ? window.matchMedia('(max-width: 55.99em)') : null;
  h.classList.add('valikko-kaytossa');
  nappi.hidden = false;

  function auki() { return nappi.getAttribute('aria-expanded') === 'true'; }
  function aseta(avaa, palautaKohdistus) {
    h.classList.toggle('valikko-auki', avaa);
    nappi.setAttribute('aria-expanded', String(avaa));
    if (!avaa && palautaKohdistus) nappi.focus();
  }

  nappi.addEventListener('click', function (e) {
    aseta(!auki());
    // Näppäimistöllä avattaessa kohdistus siirtyy ensimmäiseen linkkiin (detail 0 = ei hiiren tai kosketuksen klikkaus).
    if (auki() && e.detail === 0) {
      var eka = valikko.querySelector('a');
      if (eka) eka.focus();
    }
  });
  valikko.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('a')) aseta(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && auki()) aseta(false, true);
  });
  document.addEventListener('click', function (e) {
    if (auki() && !(e.target.closest && e.target.closest('.ylapalkki'))) aseta(false);
  });
  if (kapea) {
    var muuttui = function () { if (!kapea.matches && auki()) aseta(false); };
    if (kapea.addEventListener) kapea.addEventListener('change', muuttui);
    else if (kapea.addListener) kapea.addListener(muuttui);
  }
})();

(function () {
  'use strict';

  var en = document.documentElement.lang === 'en';
  var KOPIOITU = en ? 'Copied' : 'Kopioitu';

  document.querySelectorAll('[data-kopioi-osoite]').forEach(function (nappi) {
    var osoite = nappi.getAttribute('data-kopioi-osoite');
    var tila = nappi.parentNode.querySelector('[data-kopioi-tila]');
    var linkki = nappi.parentNode.querySelector('a');
    var teksti = nappi.textContent;
    var ajastin = null;
    nappi.hidden = false;

    function onnistui() {
      nappi.textContent = KOPIOITU;
      if (tila) tila.textContent = KOPIOITU + ': ' + osoite;
      clearTimeout(ajastin);
      ajastin = setTimeout(function () { nappi.textContent = teksti; }, 2500);
    }
    // Ilman leikepöytää osoite valitaan, jolloin sen voi kopioida itse.
    function valitse() {
      if (!linkki || !window.getSelection) return;
      var alue = document.createRange();
      alue.selectNodeContents(linkki);
      var valinta = window.getSelection();
      valinta.removeAllRanges();
      valinta.addRange(alue);
    }
    nappi.addEventListener('click', function () {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(osoite).then(onnistui, valitse);
        else valitse();
      } catch (e) { valitse(); }
    });
  });
})();
