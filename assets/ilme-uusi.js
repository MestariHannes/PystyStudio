/* Pysty Studio – Pystyviiva-ilme (esikatselu ?uusi=1 23.10.2026, käytössä kaikilla sivuilla samasta päivästä alkaen).
   Sivun <head>-skripti lisää <html>-elementtiin luokan ilme-uusi
   ja tarvittaessa luokat ilme-animoi ja intro-tulossa. Tyylit: ilme-uusi.css.

   2. Nauha heron alle: alustat ja lyhyet lupaukset (koriste, aria-hidden).
   3. Avausefekti etusivulla ensimmäisellä käynnillä (localStorage; ilman tallennusta kerran latausta kohden).
      Noin 5 s, Ohita-nappi, ja klikkaus, kosketus, vieritys tai mikä tahansa näppäin ohittaa sen.
      Intro on vain sisällön päällä oleva kerros (aria-hidden): sivun sisältö on HTML:ssä heti.
      Pakota uudelleen: ?intro=1.
   4. Hero-otsikko sana kerrallaan ja osioiden otsikot kirjoittuvat näkyviin vieritettäessä.
   Vähennetty liike (prefers-reduced-motion): ei introa eikä animaatioita (luokkia ei lisätä). */
(function () {
  'use strict';

  var h = document.documentElement;
  if (!h.classList.contains('ilme-uusi')) return;
  var en = h.lang === 'en';
  var animoi = h.classList.contains('ilme-animoi');
  var AVAIN = 'pystystudio-intro';

  // 2. Nauha heron alle. (Kohta 1, ?uusi=1-linkit, poistettiin, kun ilme otettiin käyttöön 23.10.2026.)
  var hero = document.querySelector('.hero');
  if (hero) {
    var sisalto = en
      ? ['TikTok', 'Reels', 'Shorts', 'YouTube', 'Word-by-word captions', 'Full-height 9:16', '3 free sample clips']
      : ['TikTok', 'Reels', 'Shorts', 'YouTube', 'Tekstitys sana kerrallaan', 'Täyskorkea 9:16', '3 ilmaista näyteklippiä'];
    var nauha = document.createElement('div');
    nauha.className = 'ilme-nauha';
    nauha.setAttribute('aria-hidden', 'true');
    var rulla = document.createElement('div');
    rulla.className = 'ilme-nauha-rulla';
    // Neljä kopiota: rulla siirtyy puolet leveydestään, joten silmukka on saumaton leveälläkin näytöllä.
    for (var k = 0; k < 4; k++) {
      sisalto.forEach(function (teksti) {
        var el = document.createElement('span');
        el.textContent = teksti;
        rulla.appendChild(el);
      });
    }
    nauha.appendChild(rulla);
    hero.insertAdjacentElement('afterend', nauha);
  }

  // 4a. Hero-otsikko sana kerrallaan (tyylit: .hero.ilme-esilla).
  function heroEsiin() { if (hero) hero.classList.add('ilme-esilla'); }

  // 4b. Osioiden otsikot sanoiksi; vieritettäessä otsikko kirjoittuu näkyviin ja sisältö tulee perässä.
  if (animoi) {
    var havainnoija = new IntersectionObserver(function (havainnot) {
      havainnot.forEach(function (x) {
        if (!x.isIntersecting) return;
        x.target.classList.add('ilme-esilla');
        havainnoija.unobserve(x.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('main > section.osio:not(.hero):not([hidden])').forEach(function (osio) {
      var otsikko = osio.querySelector('h2');
      if (!otsikko) return;
      var sanat = otsikko.textContent.trim().split(/\s+/);
      otsikko.textContent = '';
      sanat.forEach(function (sana, i) {
        if (i) otsikko.appendChild(document.createTextNode(' '));
        var el = document.createElement('span');
        el.className = 'ilme-sana';
        el.style.setProperty('--i', String(i));
        el.textContent = sana;
        otsikko.appendChild(el);
      });
      otsikko.style.setProperty('--n', String(sanat.length));
      osio.classList.add('ilme-paljastus');
      // Jo näkyvissä oleva osio (esim. ankkurilla tultaessa) kirjoitetaan heti, ei piiloteta ensin.
      if (osio.getBoundingClientRect().top < window.innerHeight * 0.9) osio.classList.add('ilme-esilla');
      else havainnoija.observe(osio);
    });
  }

  // 3. Avausefekti.
  function intro() {
    if (!h.classList.contains('intro-tulossa')) return false;
    try { window.localStorage.setItem(AVAIN, '1'); } catch (e) { /* ilman tallennusta intro näkyy kerran tällä latauksella */ }

    var slogan = en ? ['Long', 'videos,', 'made', 'vertical.'] : ['Pitkät', 'videot', 'pystyyn.'];
    var kerros = document.createElement('div');
    kerros.className = 'ilme-intro';
    kerros.setAttribute('aria-hidden', 'true');
    kerros.innerHTML =
      '<div class="ilme-intro-kehys">' +
        (document.getElementById('kohtaus') ? '<svg class="ilme-intro-kohtaus" viewBox="0 0 1600 900" focusable="false"><use href="#kohtaus"/></svg>' : '') +
        '<span class="ilme-intro-rajaus ilme-intro-rajaus-v"></span><span class="ilme-intro-rajaus ilme-intro-rajaus-o"></span>' +
        '<span class="ilme-intro-rako"></span>' +
        '<div class="ilme-intro-teksti">' +
          '<p class="ilme-intro-logo"><span class="ilme-intro-pysty">PYSTY</span><span class="ilme-intro-kursori"></span><span class="ilme-intro-studio">STUDIO</span></p>' +
          '<p class="ilme-intro-slogan">' + slogan.map(function (s, i) { return '<span style="--i:' + i + '">' + s + '</span>'; }).join(' ') + '</p>' +
        '</div>' +
      '</div>' +
      '<button class="ilme-intro-ohita" type="button" tabindex="-1">' + (en ? 'Skip' : 'Ohita') + '</button>';
    document.body.appendChild(kerros);
    h.classList.remove('intro-tulossa');

    var ohi = false;
    var ajastimet = [];
    var TAPAHTUMAT = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    function poista() { if (kerros.parentNode) kerros.parentNode.removeChild(kerros); }
    function lopeta(nopeasti) {
      if (ohi) return;
      ohi = true;
      ajastimet.forEach(clearTimeout);
      TAPAHTUMAT.forEach(function (t) { window.removeEventListener(t, ohita, true); });
      heroEsiin();
      if (nopeasti) {
        kerros.classList.add('ilme-intro-ohitetaan');
        setTimeout(poista, 280);
      } else {
        poista();
      }
    }
    function ohita() { lopeta(true); }
    TAPAHTUMAT.forEach(function (t) { window.addEventListener(t, ohita, { capture: true, passive: true }); });

    // Aloitus, kun fontit ovat ladattu (enintään 0,45 s odotus; musta ruutu ja kursori peittävät odotuksen).
    var aloitettu = false;
    function aloita() {
      if (aloitettu || ohi) return;
      aloitettu = true;
      kerros.classList.add('ilme-intro-kaynnissa');
      ajastimet.push(setTimeout(heroEsiin, 4300));
      ajastimet.push(setTimeout(function () { lopeta(false); }, 5050));
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('900 1em "Big Shoulders Display"'),
        document.fonts.load('900 1em Figtree')
      ]).then(aloita, aloita);
    }
    ajastimet.push(setTimeout(aloita, 450));
    return true;
  }

  if (!intro()) heroEsiin();
})();
