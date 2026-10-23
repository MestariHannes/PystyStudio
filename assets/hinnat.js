/* Pysty Studio – hintasäätimet ja hintojen valuutta etusivulla (index.html ja en/index.html).
   Hinnat ovat tiedostossa hintadata.js ja valuutan muotoilu tiedostossa valuutta.js.
   Portaat (määrät) ja portaiden omat nimet ovat HTML:ssä kortin data-portaat-attribuutissa.
   Ilman JavaScriptiä kortit näyttävät oletusportaan hinnat ja säätimet pysyvät piilossa (hidden). */
(function () {
  'use strict';

  var H = window.PystyHinnat;
  var V = window.PystyValuutta;
  if (!H || !V) return;

  var en = V.kieli === 'en';
  function monikko(n, yksi, monta) { return n === 1 ? yksi : monta; }

  var T = en ? {
    sisAlv: 'Incl. Finnish VAT 25.5%: ',
    alv0: 'excl. VAT',
    kk: '/mo',
    kuukaudessa: ' per month',
    lisaksi: 'plus ',
    kayttoonotto: '+ setup ',
    alusta: ['platform', 'platforms'],
    ja: ' and ',
    tilinhoito: function (a, lista, n, vko, kk, kerta) {
      return a + ' ' + monikko(a, 'platform', 'platforms') + ' (' + lista + '), ' + n + ' posts per month, about ' +
        vko + ' per week. Incl. Finnish VAT 25.5%: ' + kk + ' and setup ' + kerta + '.';
    },
    tilinhoitoAria: function (n, vko, raha) { return n + ' posts per month, about ' + vko + ' per week, ' + raha; },
    valitseAlusta: 'Select at least one platform. ',
    alustaIlmoitus: function (a, kk, kerta) {
      return a + ' ' + monikko(a, 'platform', 'platforms') + ': ' + kk + ', setup ' + kerta + '.';
    },
    videotAria: function (n) { return n + ' ' + monikko(n, 'video', 'videos') + ' per month'; },
    perAria: function (n) { return n + ' ' + monikko(n, 'clip', 'clips') + ' per video'; },
    yhteensa: function (t) { return 'Total ' + t + ' ' + monikko(t, 'clip', 'clips') + ' per month'; },
    alle: function (min) { return 'The smallest package is ' + min + ' clips. For a single video, the single batch is a good fit.'; },
    yli: function (max) { return 'More than ' + max + ' clips a month: we can agree on that separately, and there is no upper limit.'; },
    vapaaksi: function (n, v) {
      return n + '-clip package: ' + v + ' ' + monikko(v, 'clip is', 'clips are') + ' left over, e.g. for archive clips or an extra video.';
    },
    perVideo: function (x, v) {
      return '≈ ' + x + ' ' + monikko(x, 'clip', 'clips') + ' per video with ' + v + ' ' + monikko(v, 'video', 'videos') + ' a month';
    },
    valittu: function (n, raha) { return 'Selected package: ' + n + ' clips, ' + raha + '.'; }
  } : {
    sisAlv: 'Sis. alv 25,5 %: ',
    alv0: 'alv 0 %',
    kk: '/kk',
    kuukaudessa: ' kuukaudessa',
    lisaksi: 'lisäksi ',
    kayttoonotto: '+ käyttöönotto ',
    alusta: ['alusta', 'alustaa'],
    ja: ' ja ',
    tilinhoito: function (a, lista, n, vko, kk, kerta) {
      return a + ' ' + monikko(a, 'alusta', 'alustaa') + ' (' + lista + '), ' + n + ' julkaisua kuukaudessa eli noin ' +
        vko + ' viikossa. Sis. alv 25,5 %: ' + kk + ' ja käyttöönotto ' + kerta + '.';
    },
    tilinhoitoAria: function (n, vko, raha) { return n + ' julkaisua kuukaudessa, noin ' + vko + ' viikossa, ' + raha; },
    valitseAlusta: 'Valitse vähintään yksi alusta. ',
    alustaIlmoitus: function (a, kk, kerta) {
      return a + ' ' + monikko(a, 'alusta', 'alustaa') + ': ' + kk + ', käyttöönotto ' + kerta + '.';
    },
    videotAria: function (n) { return n + ' ' + monikko(n, 'video', 'videota') + ' kuukaudessa'; },
    perAria: function (n) { return n + ' ' + monikko(n, 'klippi', 'klippiä') + ' per video'; },
    yhteensa: function (t) { return 'Yhteensä ' + t + ' ' + monikko(t, 'klippi', 'klippiä') + ' kuukaudessa'; },
    alle: function (min) { return 'Pienin paketti on ' + min + ' klippiä. Yksittäiseen videoon sopii kertaerä.'; },
    yli: function (max) { return 'Yli ' + max + ' klippiä kuussa: sovitaan erikseen, eikä ylärajaa ole.'; },
    vapaaksi: function (n, v) {
      return 'Paketti ' + n + ' klippiä: ' + v + ' ' + monikko(v, 'klippi jää', 'klippiä jää') + ' vapaaksi esim. arkistoklipeille tai lisävideolle.';
    },
    perVideo: function (x, v) {
      return '≈ ' + x + ' ' + monikko(x, 'klippi', 'klippiä') + ' per video, kun videoita on ' + v + ' kuussa';
    },
    valittu: function (n, raha) { return 'Valittu paketti: ' + n + ' klippiä, ' + raha + '.'; }
  };

  // Räätälöity tarjous -linkit (data-tarjouslinkki): säätimet, joita kävijä on liikuttanut, välitetään
  // URL-parametreina tarjoussivulle, esim. tarjous.html?klippaamo=12&videot=4&per=3&currency=usd.
  // Henkilötietoja ei laiteta osoitteeseen.
  var valinnat = {};
  function paivitaTarjouslinkit() {
    var osat = [];
    Object.keys(valinnat).forEach(function (palvelu) {
      var p = valinnat[palvelu];
      Object.keys(p).forEach(function (nimi) { osat.push(nimi + '=' + encodeURIComponent(p[nimi])); });
    });
    if (V.valuutta() === 'usd') osat.push('currency=usd');
    document.querySelectorAll('[data-tarjouslinkki]').forEach(function (a) {
      if (!a.hasAttribute('data-pohja')) a.setAttribute('data-pohja', a.getAttribute('href'));
      a.setAttribute('href', a.getAttribute('data-pohja') + (osat.length ? '?' + osat.join('&') : ''));
    });
  }
  function valitse(palvelu, parametrit) { valinnat[palvelu] = parametrit; paivitaTarjouslinkit(); }

  // Iso hinta kortissa. USD-tilassa summa on "≈ 391 $", ja euro näkyy pienellä sen alla.
  function naytaHinta(summaEl, sentit, etumerkki) {
    var hinta = summaEl.closest('.hinta') || summaEl.parentNode;
    var jakso = hinta.querySelector('.jakso');
    var eurEl = hinta.querySelector('.hinta-eur');
    if (!eurEl) {
      eurEl = document.createElement('span');
      eurEl.className = 'hinta-eur';
      (jakso || summaEl).insertAdjacentElement('afterend', eurEl);
    }
    V.iso(summaEl, sentit, etumerkki);
    eurEl.textContent = V.euroa(sentit, etumerkki) + (jakso ? jakso.textContent : '');
    eurEl.hidden = V.valuutta() !== 'usd';
  }

  // Kiinteät hinnat: data-hinta="nimi" (hinta hintadata.js:n kiinteat-osasta).
  // .summa = iso hinta; data-sulut = koko summa sulkeissa; data-jakso = summan perään tuleva teksti, esim. "/kpl".
  function piirraKiinteat() {
    document.querySelectorAll('[data-hinta]').forEach(function (el) {
      var euroja = H.kiinteat[el.getAttribute('data-hinta')];
      if (typeof euroja !== 'number') return;
      var sentit = euroja * 100;
      var etumerkki = el.getAttribute('data-etumerkki') || '';
      var jakso = el.getAttribute('data-jakso') || '';
      if (el.classList.contains('summa')) naytaHinta(el, sentit, etumerkki);
      else if (el.hasAttribute('data-sulut')) el.textContent = V.sulkeissa(sentit, jakso, etumerkki);
      else el.textContent = V.teksti(sentit, jakso, etumerkki);
    });
  }

  // Yksi liukusäädin porrasnumeroineen. paivita(i, kayttaja): kayttaja = true, kun muutos tuli käyttäjältä.
  function kytke(input, paivita) {
    var portaat = input.nextElementSibling;
    var merkit = portaat && portaat.classList.contains('portaat') ? portaat.querySelectorAll('[data-i]') : [];
    var max = Number(input.max) || 1;

    function piirra(kayttaja) {
      var i = Number(input.value);
      input.style.setProperty('--t', String(i / max));
      Array.prototype.forEach.call(merkit, function (m) { m.classList.toggle('valittu', Number(m.dataset.i) === i); });
      paivita(i, kayttaja === true);
    }
    input.addEventListener('input', function () { piirra(true); });
    input.addEventListener('change', function () { piirra(true); });
    // Porrasnumeroa voi napauttaa (näppäimistöllä säädin toimii nuolinäppäimillä).
    Array.prototype.forEach.call(merkit, function (m) {
      m.addEventListener('click', function () {
        input.value = m.dataset.i;
        piirra(true);
        input.focus();
      });
    });
    return piirra;
  }

  // Tavallinen säädinkortti: data-saadin="klippaamo" tms. (hinnat hintadata.js:stä), yksi porras = määrä ja hinta.
  function teeSaadin(kortti) {
    var avain = kortti.getAttribute('data-saadin');
    var hinnat = H[avain];
    var portaat = JSON.parse(kortti.dataset.portaat);
    var yksikot = (kortti.dataset.yksikko || 'klippi|klippiä').split('|');
    var kk = kortti.hasAttribute('data-kk');
    var el = function (nimi) { return kortti.querySelector('[data-' + nimi + ']:not(li)'); };
    var nimiEl = el('nimi'), kuvausEl = el('kuvaus'), lisaEl = el('lisa'), summaEl = el('summa'),
        arvoEl = el('arvo'), yhteenvetoEl = el('yhteenveto');
    var saadin = kortti.querySelector('.saadin');
    var input = saadin.querySelector('.saadin-input:not([data-apu])');
    var apu = null;
    input.value = kortti.dataset.oletus || 0;

    function hintaSentit(i) { return hinnat[portaat[i].n] * 100; }

    var piirra = kytke(input, function (i, kayttaja) {
      var p = portaat[i];
      var hinta = hinnat[p.n];
      var yksikko = p.n === 1 ? yksikot[0] : yksikot[1];
      var nimi = p.nimi || kortti.dataset.nimi;
      var kuvaus = p.kuvaus || kortti.dataset.malli.replace('{n}', p.n).replace('{yksikko}', yksikko);
      var perSentit = Math.round(hinta * 100 / p.n);

      if (nimiEl) nimiEl.textContent = nimi;
      if (kuvausEl) kuvausEl.textContent = kuvaus;
      if (lisaEl) { lisaEl.textContent = p.lisa || ''; lisaEl.hidden = !p.lisa; }
      naytaHinta(summaEl, hinta * 100);
      arvoEl.textContent = p.n;
      yhteenvetoEl.textContent = T.sisAlv + V.teksti(V.alvilla(hinta), kk ? T.kk : '') +
        ' · ' + V.lisatiedolla(perSentit, '/' + (kortti.dataset.per || yksikot[0]), T.alv0);
      input.setAttribute('aria-valuetext',
        p.n + ' ' + yksikko + (kk ? T.kuukaudessa : '') + ', ' + V.sanoin(hinta * 100, kk ? T.kuukaudessa : '') +
        (p.nimi ? ', ' + p.nimi : '') + (p.lisa ? ', ' + p.lisa.replace(/^\+\s*/, T.lisaksi) : ''));
      if (apu) apu.pakettiMuuttui(i, kayttaja);
      if (kayttaja) {
        var param = {};
        param[avain] = p.n;
        valitse(avain, param);
      }
    });

    var apuEl = saadin.querySelector('[data-apusaatimet]');
    if (apuEl) {
      apu = teeApusaatimet(apuEl, portaat, function (i) { input.value = i; piirra(false); }, function (i) {
        return V.sanoin(hintaSentit(i), kk ? T.kuukaudessa : '');
      });
    }
    saadin.hidden = false;
    piirra(false);
    if (apu) apu.alusta();
    V.kun(function () { piirra(false); });
  }

  // Klippaamon apusäätimet: videoita kuukaudessa × klippiä per video → pienin paketti, joka riittää.
  // Kun käyttäjä liikuttaa pakettisäädintä suoraan, apusäätimet eivät muutu, mutta niiden kohdalla
  // näytetään, montako klippiä pakettiin mahtuu videota kohden.
  function teeApusaatimet(el, portaat, asetaPorras, hintaSanoin) {
    var vInput = el.querySelector('[data-apu="videot"]');
    var pInput = el.querySelector('[data-apu="per"]');
    var vArvot = JSON.parse(vInput.dataset.arvot);
    var pArvot = JSON.parse(pInput.dataset.arvot);
    var vArvoEl = el.querySelector('[data-apu-arvo="videot"]');
    var pArvoEl = el.querySelector('[data-apu-arvo="per"]');
    var yhteensaEl = el.querySelector('[data-apu-yhteensa]');
    var viestiEl = el.querySelector('[data-apu-viesti]');
    var viestiTekstiEl = el.querySelector('[data-apu-viesti-teksti]');
    var tarjousEl = el.querySelector('[data-apu-tarjous]');
    var ilmoitusEl = el.querySelector('[data-apu-ilmoitus]');
    var maarat = portaat.map(function (p) { return p.n; });
    var min = maarat[0], max = maarat[maarat.length - 1];
    vInput.value = vInput.getAttribute('data-oletus') || 0;
    pInput.value = pInput.getAttribute('data-oletus') || 0;

    function videot() { return vArvot[Number(vInput.value)]; }
    function per() { return pArvot[Number(pInput.value)]; }

    function apuMuuttui(kayttaja) {
      var v = videot(), pv = per(), t = v * pv;
      vArvoEl.textContent = v;
      pArvoEl.textContent = pv;
      vInput.setAttribute('aria-valuetext', T.videotAria(v));
      pInput.setAttribute('aria-valuetext', T.perAria(pv));

      var i = 0;
      while (i < maarat.length - 1 && maarat[i] < t) i += 1;
      var n = maarat[i];
      var viesti = '';
      if (t < min) viesti = T.alle(min);
      else if (t > max) viesti = T.yli(max);
      else if (n !== t) viesti = T.vapaaksi(n, n - t);

      asetaPorras(i);
      if (kayttaja) valitse('klippaamo', { klippaamo: n, videot: v, per: pv });
      yhteensaEl.textContent = T.yhteensa(t);
      viestiTekstiEl.textContent = viesti;
      tarjousEl.hidden = !(t > max);
      viestiEl.hidden = !viesti;
      if (kayttaja) ilmoitusEl.textContent = T.yhteensa(t) + '. ' + (viesti ? viesti + ' ' : '') + T.valittu(n, hintaSanoin(i));
    }

    var piirraV = kytke(vInput, function (i, kayttaja) { if (kayttaja) apuMuuttui(true); });
    var piirraP = kytke(pInput, function (i, kayttaja) { if (kayttaja) apuMuuttui(true); });
    el.hidden = false;

    return {
      alusta: function () {
        // Piirretään apusäätimet ja siirretään paketti niiden mukaan (oletus 4 × 3 = 12).
        piirraV(false);
        piirraP(false);
        apuMuuttui(false);
      },
      pakettiMuuttui: function (i, kayttaja) {
        if (!kayttaja) return;
        var v = videot();
        yhteensaEl.textContent = T.perVideo(Math.max(1, Math.floor(maarat[i] / v)), v);
        viestiEl.hidden = true;
      }
    };
  }

  // Klippitilin hoito: alustat (valintaruudut) ja julkaisumäärä (säädin). Hinnat hintadata.js:stä.
  function teeTilinhoito(kortti) {
    var portaat = JSON.parse(kortti.dataset.portaat);
    var ruudut = kortti.querySelectorAll('.alustat input[type="checkbox"]');
    var summaEl = kortti.querySelector('[data-summa]');
    var kertaEl = kortti.querySelector('[data-kerta]');
    var arvoEl = kortti.querySelector('[data-arvo]');
    var yhteenvetoEl = kortti.querySelector('[data-yhteenveto]');
    var huomioEl = kortti.querySelector('[data-huomio]');
    var ilmoitusEl = kortti.querySelector('[data-ilmoitus]');
    var saadin = kortti.querySelector('.saadin');
    var input = saadin.querySelector('.saadin-input');
    input.value = kortti.dataset.oletus || 0;

    function valitut() {
      return Array.prototype.filter.call(ruudut, function (r) { return r.checked; }).map(function (r) { return r.value; });
    }
    function luettelo(nimet) {
      return nimet.length < 2 ? nimet.join('') : nimet.slice(0, -1).join(', ') + T.ja + nimet[nimet.length - 1];
    }
    function laske() {
      var p = portaat[Number(input.value)];
      var alustat = valitut();
      var a = alustat.length;
      return { p: p, alustat: alustat, a: a, kk: H.tilinhoito[p.n][a - 1], kerta: H.tilinhoitoKayttoonotto[a - 1] };
    }
    function paivita() {
      var h = laske();
      naytaHinta(summaEl, h.kk * 100);
      kertaEl.textContent = T.kayttoonotto + V.teksti(h.kerta * 100);
      arvoEl.textContent = h.p.n;
      yhteenvetoEl.textContent = T.tilinhoito(h.a, luettelo(h.alustat), h.p.n, h.p.vko,
        V.teksti(V.alvilla(h.kk), T.kk), V.teksti(V.alvilla(h.kerta)));
      input.setAttribute('aria-valuetext', T.tilinhoitoAria(h.p.n, h.p.vko, V.sanoin(h.kk * 100, T.kuukaudessa)));
      return h;
    }

    // Tarjoussivulle: julkaisumäärä ja alustat koodeina (tiktok, instagram, shorts).
    function valitseTilinhoito(h) {
      valitse('tilinhoito', {
        tilinhoito: h.p.n,
        alustat: h.alustat.map(function (a) { return a.toLowerCase().replace('youtube ', ''); }).join(',')
      });
    }

    kytke(input, function (i, kayttaja) { var h = paivita(); if (kayttaja) valitseTilinhoito(h); });
    saadin.hidden = false;
    paivita();
    V.kun(paivita);

    ruudut.forEach(function (ruutu) {
      ruutu.addEventListener('change', function () {
        var viesti = '';
        if (!valitut().length) {
          // Vähintään yksi alusta pysyy valittuna.
          ruutu.checked = true;
          huomioEl.hidden = false;
          viesti = T.valitseAlusta;
        } else {
          huomioEl.hidden = true;
        }
        var h = paivita();
        valitseTilinhoito(h);
        ilmoitusEl.textContent = viesti + T.alustaIlmoitus(h.a, V.sanoin(h.kk * 100, T.kuukaudessa), V.sanoin(h.kerta * 100));
      });
    });
  }

  piirraKiinteat();
  V.kun(piirraKiinteat);
  V.kun(paivitaTarjouslinkit);
  paivitaTarjouslinkit();
  document.querySelectorAll('[data-saadin]').forEach(teeSaadin);
  document.querySelectorAll('[data-tilinhoito]').forEach(teeTilinhoito);
})();
