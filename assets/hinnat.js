/* Pysty Studio – hintasäätimet.
   Portaat ja hinnat ovat index.html:ssä kortin data-attribuuteissa (data-portaat ym.), eikä niitä ole tässä tiedostossa.
   Ilman JavaScriptiä kortit näyttävät oletusportaan hinnat ja säätimet pysyvät piilossa (hidden). */
(function () {
  'use strict';

  var ALV_PROMILLE = 1255; // alv 25,5 %: hinta × 1,255

  // Senteistä teksti: "1 190 €" tai "337,60 €". Sentit näytetään vain, kun niitä on.
  function euroa(sentit) {
    var desimaalit = sentit % 100 === 0 ? 0 : 2;
    var muoto = new Intl.NumberFormat('fi-FI', { minimumFractionDigits: desimaalit, maximumFractionDigits: desimaalit });
    return muoto.format(sentit / 100) + ' €';
  }
  function alvilla(hinta) { return Math.round(hinta * ALV_PROMILLE / 10); } // sentteinä
  function luku(n) { return new Intl.NumberFormat('fi-FI').format(n); }

  // Yhteiset osat: säädin, porrasmerkinnät ja täyttö.
  function kytkeSaadin(kortti, paivita) {
    var input = kortti.querySelector('.saadin-input');
    var merkit = kortti.querySelectorAll('.portaat [data-i]');
    var max = Number(input.max) || 1;

    function piirra() {
      var i = Number(input.value);
      input.style.setProperty('--t', String(i / max));
      merkit.forEach(function (m) { m.classList.toggle('valittu', Number(m.dataset.i) === i); });
      paivita(i);
    }
    input.addEventListener('input', piirra);
    input.addEventListener('change', piirra);
    // Porrasnumeroa voi napauttaa (näppäimistöllä säädin toimii nuolinäppäimillä).
    merkit.forEach(function (m) {
      m.addEventListener('click', function () {
        input.value = m.dataset.i;
        piirra();
        input.focus();
      });
    });
    kortti.querySelector('.saadin').hidden = false;
    piirra();
    return input;
  }

  // Tavallinen säädinkortti: yksi porras = määrä ja hinta.
  function teeSaadin(kortti) {
    var portaat = JSON.parse(kortti.dataset.portaat);
    var yksikot = (kortti.dataset.yksikko || 'klippi|klippiä').split('|');
    var kk = kortti.hasAttribute('data-kk');
    var el = function (nimi) { return kortti.querySelector('[data-' + nimi + ']:not(li)'); };
    var nimiEl = el('nimi'), kuvausEl = el('kuvaus'), lisaEl = el('lisa'), summaEl = el('summa'),
        arvoEl = el('arvo'), yhteenvetoEl = el('yhteenveto');
    var input = kortti.querySelector('.saadin-input');
    input.value = kortti.dataset.oletus || 0;

    kytkeSaadin(kortti, function (i) {
      var p = portaat[i];
      var yksikko = p.n === 1 ? yksikot[0] : yksikot[1];
      var nimi = p.nimi || kortti.dataset.nimi;
      var kuvaus = p.kuvaus || kortti.dataset.malli.replace('{n}', p.n).replace('{yksikko}', yksikko);
      var perSentit = Math.round(p.hinta * 100 / p.n);

      if (nimiEl) nimiEl.textContent = nimi;
      if (kuvausEl) kuvausEl.textContent = kuvaus;
      if (lisaEl) { lisaEl.textContent = p.lisa || ''; lisaEl.hidden = !p.lisa; }
      summaEl.textContent = euroa(p.hinta * 100);
      arvoEl.textContent = p.n;
      yhteenvetoEl.textContent = 'Sis. alv 25,5 %: ' + euroa(alvilla(p.hinta)) + (kk ? '/kk' : '') +
        ' · ' + euroa(perSentit) + '/' + (kortti.dataset.per || yksikot[0]) + ' (alv 0 %)';
      input.setAttribute('aria-valuetext',
        p.n + ' ' + yksikko + (kk ? ' kuukaudessa' : '') + ', ' + luku(p.hinta) + ' euroa' + (kk ? ' kuukaudessa' : '') +
        (p.nimi ? ', ' + p.nimi : '') + (p.lisa ? ', ' + p.lisa.replace(/^\+\s*/, 'lisäksi ') : ''));
    });
  }

  // Klippitilin hoito: alustat (valintaruudut) ja julkaisumäärä (säädin).
  function teeTilinhoito(kortti) {
    var portaat = JSON.parse(kortti.dataset.portaat);
    var hinnat = JSON.parse(kortti.dataset.hinnat);
    var kayttoonotto = JSON.parse(kortti.dataset.kayttoonotto);
    var ruudut = kortti.querySelectorAll('.alustat input[type="checkbox"]');
    var summaEl = kortti.querySelector('[data-summa]');
    var kertaEl = kortti.querySelector('[data-kerta]');
    var arvoEl = kortti.querySelector('[data-arvo]');
    var yhteenvetoEl = kortti.querySelector('[data-yhteenveto]');
    var huomioEl = kortti.querySelector('[data-huomio]');
    var ilmoitusEl = kortti.querySelector('[data-ilmoitus]');
    var input = kortti.querySelector('.saadin-input');
    input.value = kortti.dataset.oletus || 0;

    function valitut() {
      return Array.prototype.filter.call(ruudut, function (r) { return r.checked; }).map(function (r) { return r.value; });
    }
    function luettelo(nimet) {
      return nimet.length < 2 ? nimet.join('') : nimet.slice(0, -1).join(', ') + ' ja ' + nimet[nimet.length - 1];
    }
    function laske() {
      var p = portaat[Number(input.value)];
      var alustat = valitut();
      var a = alustat.length;
      return { p: p, alustat: alustat, a: a, kk: hinnat[p.n][a - 1], kerta: kayttoonotto[a - 1] };
    }
    function paivita() {
      var h = laske();
      summaEl.textContent = euroa(h.kk * 100);
      kertaEl.textContent = '+ käyttöönotto ' + euroa(h.kerta * 100);
      arvoEl.textContent = h.p.n;
      yhteenvetoEl.textContent = h.a + ' ' + (h.a === 1 ? 'alusta' : 'alustaa') + ' (' + luettelo(h.alustat) + '), ' +
        h.p.n + ' julkaisua kuukaudessa eli noin ' + h.p.vko + ' viikossa. Sis. alv 25,5 %: ' +
        euroa(alvilla(h.kk)) + '/kk ja käyttöönotto ' + euroa(alvilla(h.kerta)) + '.';
      input.setAttribute('aria-valuetext',
        h.p.n + ' julkaisua kuukaudessa, noin ' + h.p.vko + ' viikossa, ' + luku(h.kk) + ' euroa kuukaudessa');
      return h;
    }

    kytkeSaadin(kortti, paivita);

    ruudut.forEach(function (ruutu) {
      ruutu.addEventListener('change', function () {
        var viesti = '';
        if (!valitut().length) {
          // Vähintään yksi alusta pysyy valittuna.
          ruutu.checked = true;
          huomioEl.hidden = false;
          viesti = 'Valitse vähintään yksi alusta. ';
        } else {
          huomioEl.hidden = true;
        }
        var h = paivita();
        ilmoitusEl.textContent = viesti + h.a + ' ' + (h.a === 1 ? 'alusta' : 'alustaa') + ': ' +
          luku(h.kk) + ' euroa kuukaudessa, käyttöönotto ' + luku(h.kerta) + ' euroa.';
      });
    });
  }

  if (!('JSON' in window) || !window.Intl) return;
  document.querySelectorAll('[data-saadin]').forEach(teeSaadin);
  document.querySelectorAll('[data-tilinhoito]').forEach(teeTilinhoito);
})();
