/* Pysty Studio – Pystyviiva-ilme (esikatselu ?uusi=1 23.10.2026, käytössä kaikilla sivuilla samasta päivästä alkaen).
   Sivun <head>-skripti lisää <html>-elementtiin luokan ilme-uusi
   ja tarvittaessa luokat ilme-animoi ja intro-tulossa. Tyylit: ilme-uusi.css.

   2. (Nauha heron alla poistettiin 28.10.2026.)
   3. Avausefekti etusivulla ensimmäisellä käynnillä (localStorage; ilman tallennusta kerran latausta kohden).
      Uusittu 29.10.2026: noin 1,5 s, studiokuva rajautuu pystyyn ja liukuu heron puhelimen paikalle.
      Ohita-nappi, ja klikkaus, kosketus, vieritys tai mikä tahansa näppäin ohittaa sen.
      Intro on vain sisällön päällä oleva kerros (aria-hidden): sivun sisältö on HTML:ssä heti.
      Pakota uudelleen: ?intro=1.
   4. Hero-otsikko sana kerrallaan ja osioiden otsikot kirjoittuvat näkyviin vieritettäessä.
   5. Yläpalkki on musta heron päällä ja vaalea sen jälkeen (28.10.2026, tyylit: tyyli.css, .ylapalkki-tumma).
   Vähennetty liike (prefers-reduced-motion): ei introa eikä animaatioita (luokkia ei lisätä). */
(function () {
  'use strict';

  var h = document.documentElement;
  if (!h.classList.contains('ilme-uusi')) return;
  var en = h.lang === 'en';
  var animoi = h.classList.contains('ilme-animoi');
  var AVAIN = 'pystystudio-intro';

  // 2. Heron alla ollut liukuva nauha poistettiin 28.10.2026 (sivu näytti liian täydeltä).
  var hero = document.querySelector('.hero');

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

  // 3. Avausefekti (uusittu 29.10.2026): studiokuva rajautuu 9:16:ksi ja liukuu heron puhelimen paikalle.
  function intro() {
    if (!h.classList.contains('intro-tulossa')) return false;
    var kohde = hero && hero.querySelector('.klippi');
    if (!kohde || !document.getElementById('kohtaus') || !kohde.animate) { h.classList.remove('intro-tulossa'); return false; }
    try { window.localStorage.setItem(AVAIN, '1'); } catch (e) { /* ilman tallennusta intro näkyy kerran tällä latauksella */ }

    var kerros = document.createElement('div');
    kerros.className = 'ilme-intro';
    kerros.setAttribute('aria-hidden', 'true');
    kerros.innerHTML =
      '<div class="ilme-intro-tausta"></div>' +
      '<div class="ilme-intro-kehys">' +
        '<svg class="ilme-intro-kohtaus" viewBox="0 0 1600 900" focusable="false"><use href="#kohtaus"/></svg>' +
        '<p class="ilme-intro-logo"><span class="ilme-intro-pysty">PYSTY</span><span class="ilme-intro-kursori"></span><span class="ilme-intro-studio">STUDIO</span></p>' +
      '</div>' +
      '<button class="ilme-intro-ohita" type="button" tabindex="-1">' + (en ? 'Skip' : 'Ohita') + '</button>';
    document.body.appendChild(kerros);
    h.classList.remove('intro-tulossa');
    h.classList.add('intro-kaynnissa');

    var ohi = false;
    var ajastimet = [];
    var animaatiot = [];
    var TAPAHTUMAT = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    function poista() {
      if (kerros.parentNode) kerros.parentNode.removeChild(kerros);
      h.classList.remove('intro-kaynnissa');
    }
    function lopeta(nopeasti) {
      if (ohi) return;
      ohi = true;
      ajastimet.forEach(clearTimeout);
      TAPAHTUMAT.forEach(function (t) { window.removeEventListener(t, ohita, true); });
      heroEsiin();
      if (nopeasti) {
        h.classList.remove('intro-kaynnissa');
        kerros.classList.add('ilme-intro-ohitetaan');
        setTimeout(function () { animaatiot.forEach(function (a) { a.cancel(); }); poista(); }, 260);
      } else {
        poista();
      }
    }
    function ohita() { lopeta(true); }
    TAPAHTUMAT.forEach(function (t) { window.addEventListener(t, ohita, { capture: true, passive: true }); });

    // Kehyksen kohde: 9:16-rajaus (81/256 kuvan leveydestä) skaalataan ja siirretään heron puhelimen päälle.
    var aloitettu = false;
    function aloita() {
      if (aloitettu || ohi) return;
      aloitettu = true;
      var kehys = kerros.querySelector('.ilme-intro-kehys');
      var kuva = kerros.querySelector('.ilme-intro-kohtaus');
      var logo = kerros.querySelector('.ilme-intro-logo');
      var tausta = kerros.querySelector('.ilme-intro-tausta');
      var k = kehys.getBoundingClientRect(), t = kohde.getBoundingClientRect();
      var rajaus = k.width * 81 / 256;
      var s = t.width / rajaus;
      var dx = (t.left + t.width / 2) - (k.left + k.width / 2);
      var dy = (t.top + t.height / 2) - (k.top + k.height / 2);
      var reuna = ((k.width - rajaus) / 2 / k.width * 100).toFixed(3) + '%';
      var sade = (parseFloat(getComputedStyle(kohde).borderTopLeftRadius) || 0) / s;
      var EASE = 'cubic-bezier(.7, 0, .3, 1)';
      var aja = function (el, avaimet, asetus) { animaatiot.push(el.animate(avaimet, Object.assign({ fill: 'both' }, asetus))); };
      aja(kuva, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: 'ease-out' });
      aja(logo, [{ opacity: 0, transform: 'translateY(10%)' }, { opacity: 1, transform: 'none', offset: .35 }, { opacity: 1, offset: .7 }, { opacity: 0 }], { duration: 750 });
      // Kuva siirtyy niin, että puhuja A (30 % leveydestä) on keskellä, kuten heron ensimmäisessä klipissä.
      aja(kuva, [{ transform: 'none' }, { transform: 'translateX(20%)' }], { delay: 500, duration: 400, easing: EASE });
      aja(kehys, [{ clipPath: 'inset(0 0 0 0 round 0px)' }, { clipPath: 'inset(0 ' + reuna + ' 0 ' + reuna + ' round ' + sade.toFixed(1) + 'px)' }], { delay: 500, duration: 400, easing: EASE });
      aja(kehys, [{ transform: 'none' }, { transform: 'translate(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px) scale(' + s.toFixed(4) + ')' }], { delay: 900, duration: 600, easing: 'cubic-bezier(.65, 0, .35, 1)' });
      aja(tausta, [{ opacity: 1 }, { opacity: 0 }], { delay: 900, duration: 500, easing: 'ease-in-out' });
      ajastimet.push(setTimeout(heroEsiin, 1150));
      ajastimet.push(setTimeout(function () { lopeta(false); }, 1520));
    }
    // Aloitus, kun logon fontti on ladattu (enintään 0,45 s odotus; musta peite peittää odotuksen).
    if (document.fonts && document.fonts.load) {
      document.fonts.load('900 1em "Big Shoulders Display"').then(aloita, aloita);
    }
    ajastimet.push(setTimeout(aloita, 450));
    // Varmistus: intro ei jää päälle missään tilanteessa.
    ajastimet.push(setTimeout(function () { lopeta(true); }, 3000));
    return true;
  }

  if (!intro()) heroEsiin();

  // 5. Yläpalkki on musta, kun musta hero on sen alla, joten palkki ja hero ovat yhtä pintaa.
  var ylapalkki = document.querySelector('.ylapalkki');
  if (hero && ylapalkki) {
    var tulossa = false;
    var tarkista = function () {
      tulossa = false;
      h.classList.toggle('ylapalkki-tumma', hero.getBoundingClientRect().bottom > ylapalkki.offsetHeight);
    };
    window.addEventListener('scroll', function () {
      if (!tulossa) { tulossa = true; window.requestAnimationFrame(tarkista); }
    }, { passive: true });
    window.addEventListener('resize', tarkista);
    tarkista();
  }
})();
