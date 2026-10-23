/* Pysty Studio – hintojen valuutta (EUR / USD) ja rahasummien muotoilu.
   Kurssi on tiedostossa hintadata.js. Laskut ovat aina euroissa, joten USD-tilassa euro näytetään aina mukana.

   Valuutta valitaan näin: URL-parametri ?currency=usd tai ?currency=eur, sitten selaimeen tallennettu
   valinta (localStorage), muuten EUR. Tallennus on try/catch-suojattu, joten sivu toimii ilman sitäkin.
   Ilman JavaScriptiä sivulla näkyvät euromääräiset hinnat, ja valuuttavalitsin pysyy piilossa (hidden). */
(function () {
  'use strict';

  var data = window.PystyHinnat;
  if (!data || !window.JSON || !window.Intl) return;

  var MUISTI = 'pystystudio-valuutta';
  var kieli = document.documentElement.lang === 'en' ? 'en' : 'fi';
  var en = kieli === 'en';
  var kuuntelijat = [];

  var SANAT = en
    ? { euroa: 'euros', dollaria: 'dollars', noin: 'about ',
        ilmoitusEur: 'Prices are now shown in euros.',
        ilmoitusUsd: 'Prices are now shown in euros with approximate US dollar amounts.' }
    : { euroa: 'euroa', dollaria: 'dollaria', noin: 'noin ',
        ilmoitusEur: 'Hinnat näytetään nyt euroina.',
        ilmoitusUsd: 'Hinnat näytetään nyt euroina ja suuntaa antavina dollareina.' };

  function parametri() {
    try {
      var m = /[?&]currency=(usd|eur)(?:&|$)/i.exec(window.location.search);
      return m ? m[1].toLowerCase() : null;
    } catch (e) { return null; }
  }
  function tallennettu() {
    try {
      var v = window.localStorage.getItem(MUISTI);
      return v === 'usd' || v === 'eur' ? v : null;
    } catch (e) { return null; }
  }
  var valuutta = parametri() || tallennettu() || 'eur';

  function numero(arvo, desimaalit) {
    return new Intl.NumberFormat(en ? 'en-US' : 'fi-FI', {
      minimumFractionDigits: desimaalit, maximumFractionDigits: desimaalit
    }).format(arvo);
  }
  function dollarit(sentit) { return Math.round(sentit * data.kurssi.usd / 100); }

  // "349 €" / "€349", senttien kanssa "337,60 €" / "€337.60". Sentit näytetään vain, kun niitä on.
  function euroa(sentit, etumerkki) {
    var luku = numero(sentit / 100, sentit % 100 === 0 ? 0 : 2);
    return (etumerkki || '') + (en ? '€' + luku : luku + ' €');
  }
  // "391 $" / "$391": aina kokonaisina dollareina.
  function dollaria(sentit, etumerkki) {
    var luku = numero(dollarit(sentit), 0);
    return (etumerkki || '') + (en ? '$' + luku : luku + ' $');
  }
  function usd() { return valuutta === 'usd'; }

  // Tekstin sisällä: "438 €/kk", USD-tilassa "438 €/kk (≈ 491 $)".
  function teksti(sentit, jakso, etumerkki) {
    return euroa(sentit, etumerkki) + (jakso || '') + (usd() && sentit ? ' (≈ ' + dollaria(sentit, etumerkki) + ')' : '');
  }
  // Lisätieto sulkeissa: "29,08 €/klippi (alv 0 %)", USD-tilassa "29,08 €/klippi (alv 0 %, ≈ 33 $)".
  function lisatiedolla(sentit, jakso, lisa) {
    var osat = [lisa];
    if (usd()) osat.push('≈ ' + dollaria(sentit));
    return euroa(sentit) + (jakso || '') + ' (' + osat.join(', ') + ')';
  }
  // Koko summa sulkeissa: "(25 €/kpl)", USD-tilassa "(25 €/kpl, ≈ 28 $)".
  function sulkeissa(sentit, jakso, etumerkki) {
    return '(' + euroa(sentit, etumerkki) + (jakso || '') +
      (usd() ? ', ≈ ' + dollaria(sentit, etumerkki) : '') + ')';
  }
  // Ruudunlukijalle: "349 euroa kuukaudessa", USD-tilassa "349 euroa kuukaudessa, noin 391 dollaria".
  function sanoin(sentit, jakso) {
    var eur = numero(sentit / 100, sentit % 100 === 0 ? 0 : 2) + ' ' + SANAT.euroa + (jakso || '');
    return usd() ? eur + ', ' + SANAT.noin + numero(dollarit(sentit), 0) + ' ' + SANAT.dollaria : eur;
  }
  // Iso hinta: EUR-tilassa "349 €", USD-tilassa "≈ 391 $" (≈ luetaan ruudunlukijalla "noin").
  function iso(el, sentit, etumerkki) {
    el.textContent = '';
    if (!usd()) { el.textContent = euroa(sentit, etumerkki); return; }
    var merkki = document.createElement('span');
    merkki.className = 'noin';
    merkki.setAttribute('aria-hidden', 'true');
    merkki.textContent = '≈';
    var sana = document.createElement('span');
    sana.className = 'piilotettu';
    sana.textContent = SANAT.noin;
    el.appendChild(merkki);
    el.appendChild(sana);
    el.appendChild(document.createTextNode(dollaria(sentit, etumerkki)));
  }

  // Valitsimen huomautus: kurssi ja päivämäärä hintadata.js:stä HTML:n data-malli-tekstiin.
  function huomautus(malli) {
    var p = data.kurssi.pvm.split('-');
    return malli.replace('{kurssi}', numero(data.kurssi.usd, 4)).replace('{pvm}', p[2] + '.' + p[1] + '.' + p[0]);
  }

  function paivitaSivu() {
    document.querySelectorAll('[data-valuuttavalitsin]').forEach(function (v) {
      v.querySelectorAll('[data-valuutta-nappi]').forEach(function (nappi) {
        nappi.setAttribute('aria-pressed', String(nappi.getAttribute('data-valuutta-nappi') === valuutta));
      });
      var h = v.querySelector('[data-valuutta-huomio]');
      if (h) { h.textContent = huomautus(h.getAttribute('data-malli')); h.hidden = !usd(); }
    });
    // Kielilinkki vie saman valuutan toiselle kielelle myös silloin, kun selain ei salli tallennusta.
    document.querySelectorAll('[data-kielilinkki]').forEach(function (a) {
      if (!a.hasAttribute('data-pohja')) a.setAttribute('data-pohja', a.getAttribute('href'));
      a.setAttribute('href', a.getAttribute('data-pohja') + (usd() ? '?currency=usd' : ''));
    });
  }

  function aseta(uusi) {
    if (uusi !== 'usd' && uusi !== 'eur') return;
    if (uusi === valuutta) return;
    valuutta = uusi;
    try { window.localStorage.setItem(MUISTI, uusi); } catch (e) { /* tallennus estetty: valinta pätee tällä sivulla */ }
    if (parametri() && window.history && window.history.replaceState) {
      try {
        var osoite = window.location.search.replace(/([?&]currency=)(usd|eur)/i, '$1' + uusi);
        window.history.replaceState(null, '', window.location.pathname + osoite + window.location.hash);
      } catch (e) { /* ei haittaa */ }
    }
    paivitaSivu();
    kuuntelijat.forEach(function (fn) { fn(valuutta); });
    document.querySelectorAll('[data-valuutta-ilmoitus]').forEach(function (el) {
      el.textContent = usd() ? SANAT.ilmoitusUsd : SANAT.ilmoitusEur;
    });
  }

  document.querySelectorAll('[data-valuuttavalitsin]').forEach(function (v) {
    v.querySelectorAll('[data-valuutta-nappi]').forEach(function (nappi) {
      nappi.addEventListener('click', function () { aseta(nappi.getAttribute('data-valuutta-nappi')); });
    });
    v.hidden = false;
  });
  paivitaSivu();

  window.PystyValuutta = {
    kieli: kieli,
    valuutta: function () { return valuutta; },
    aseta: aseta,
    kun: function (fn) { kuuntelijat.push(fn); },
    euroa: euroa,
    dollaria: dollaria,
    teksti: teksti,
    lisatiedolla: lisatiedolla,
    sulkeissa: sulkeissa,
    sanoin: sanoin,
    iso: iso,
    numero: numero,
    alvilla: function (euroja) { return Math.round(euroja * data.alvPromille / 10); } // sentteinä
  };
})();
