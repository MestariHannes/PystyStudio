/* Pysty Studio – sähköpostinapit kaikilla koneilla (28.10.2026).
   Sivun napit ovat mailto-linkkejä. Puhelimessa ne avaavat sähköpostisovelluksen luotettavasti, mutta tietokoneella
   linkki ei tee mitään, jos oletussähköpostiohjelmaa ei ole (esim. Windowsin lopetettu Sähköposti-sovellus).
   Siksi tietokoneella (hiiri, hover) mailto-linkki avaa valintaikkunan: Gmail, Outlook.com, oma sähköpostiohjelma
   tai osoitteen kopiointi. Viestin aihe ja runko siirtyvät valmiina Gmailiin ja Outlookiin.
   Ilman JavaScriptiä linkit toimivat tavallisina mailto-linkkeinä. Tarjouslomake käyttää window.PystySahkoposti.avaa(). */
(function () {
  'use strict';

  var en = document.documentElement.lang === 'en';
  var T = en ? {
    otsikko: 'Send a message',
    teksti: 'Choose how to send it. The message is ready to go.',
    ohjelma: 'Your email app',
    kopioi: 'Copy address',
    kopioitu: 'Copied',
    sulje: 'Close'
  } : {
    otsikko: 'Lähetä viesti',
    teksti: 'Valitse, millä lähetät viestin. Viestipohja on valmiina.',
    ohjelma: 'Oma sähköpostiohjelma',
    kopioi: 'Kopioi osoite',
    kopioitu: 'Kopioitu',
    sulje: 'Sulje'
  };

  // Tietokone: tarkka osoitin ja hover. Kosketusnäytöllä mailto toimii suoraan.
  function tietokone() {
    return !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }

  // mailto:osoite?subject=…&body=… osiin. Plus-merkki jää plussaksi (mailto koodaa välilyönnin %20:ksi).
  function pura(href) {
    var loppu = href.replace(/^mailto:/i, '');
    var kysymys = loppu.indexOf('?');
    var tulos = { osoite: decodeURIComponent(kysymys < 0 ? loppu : loppu.slice(0, kysymys)), aihe: '', runko: '' };
    if (kysymys >= 0) {
      loppu.slice(kysymys + 1).split('&').forEach(function (pari) {
        var i = pari.indexOf('=');
        if (i < 0) return;
        var avain = pari.slice(0, i).toLowerCase();
        var arvo;
        try { arvo = decodeURIComponent(pari.slice(i + 1)); } catch (e) { arvo = pari.slice(i + 1); }
        if (avain === 'subject') tulos.aihe = arvo;
        if (avain === 'body') tulos.runko = arvo;
      });
    }
    return tulos;
  }

  var k = encodeURIComponent;
  function gmail(v) { return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + k(v.osoite) + '&su=' + k(v.aihe) + '&body=' + k(v.runko); }
  function outlook(v) { return 'https://outlook.live.com/mail/0/deeplink/compose?to=' + k(v.osoite) + '&subject=' + k(v.aihe) + '&body=' + k(v.runko); }

  var ikkuna, osoiteEl, kopioNappi, linkit = {};
  function luo() {
    ikkuna = document.createElement('dialog');
    ikkuna.className = 'sahkoposti-ikkuna';
    ikkuna.setAttribute('aria-labelledby', 'sahkoposti-otsikko');
    ikkuna.innerHTML =
      '<h2 id="sahkoposti-otsikko">' + T.otsikko + '</h2>' +
      '<p>' + T.teksti + '</p>' +
      '<div class="sahkoposti-valinnat">' +
        '<a class="nappi nappi-ensisijainen" data-sp="gmail" target="_blank" rel="noopener">Gmail</a>' +
        '<a class="nappi nappi-toissijainen" data-sp="outlook" target="_blank" rel="noopener">Outlook.com</a>' +
        '<a class="nappi nappi-toissijainen" data-sp="ohjelma">' + T.ohjelma + '</a>' +
      '</div>' +
      '<p class="sahkoposti-osoite"><span data-sp="osoite"></span> <button type="button" class="kopioi-nappi" data-sp="kopioi">' + T.kopioi + '</button></p>' +
      '<button type="button" class="sahkoposti-sulje" data-sp="sulje" aria-label="' + T.sulje + '">×</button>';
    document.body.appendChild(ikkuna);
    ['gmail', 'outlook', 'ohjelma'].forEach(function (n) { linkit[n] = ikkuna.querySelector('[data-sp="' + n + '"]'); });
    osoiteEl = ikkuna.querySelector('[data-sp="osoite"]');
    kopioNappi = ikkuna.querySelector('[data-sp="kopioi"]');
    ikkuna.querySelector('[data-sp="sulje"]').addEventListener('click', function () { ikkuna.close(); });
    // Klikkaus ikkunan ulkopuolelle (taustaan) sulkee sen.
    ikkuna.addEventListener('click', function (e) { if (e.target === ikkuna) ikkuna.close(); });
    // Valinnan jälkeen ikkuna sulkeutuu; uusi välilehti tai sähköpostiohjelma aukeaa.
    ['gmail', 'outlook', 'ohjelma'].forEach(function (n) {
      linkit[n].addEventListener('click', function () { setTimeout(function () { ikkuna.close(); }, 0); });
    });
    kopioNappi.addEventListener('click', function () {
      var teksti = osoiteEl.textContent;
      var valmis = function () { kopioNappi.textContent = T.kopioitu; };
      var valitse = function () {
        var alue = document.createRange();
        alue.selectNodeContents(osoiteEl);
        var valinta = window.getSelection();
        valinta.removeAllRanges();
        valinta.addRange(alue);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(teksti).then(valmis, valitse);
      else valitse();
    });
  }

  function avaa(href) {
    if (!tietokone() || typeof HTMLDialogElement !== 'function') { window.location.href = href; return; }
    if (!ikkuna) luo();
    var v = pura(href);
    linkit.gmail.href = gmail(v);
    linkit.outlook.href = outlook(v);
    linkit.ohjelma.href = href;
    osoiteEl.textContent = v.osoite;
    kopioNappi.textContent = T.kopioi;
    if (!ikkuna.open) ikkuna.showModal();
    linkit.gmail.focus();
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a[href^="mailto:"]') : null;
    if (!a || (ikkuna && ikkuna.contains(a)) || !tietokone()) return;
    e.preventDefault();
    avaa(a.getAttribute('href'));
  });

  window.PystySahkoposti = { avaa: avaa, pura: pura };
})();
