/* Pysty Studio – hintasäätimet ja hintojen valuutta etusivulla (index.html ja en/index.html).
   Hinnat ovat tiedostossa hintadata.js ja valuutan muotoilu tiedostossa valuutta.js.
   Portaat (määrät) ja portaiden omat nimet ovat HTML:ssä kortin data-portaat-attribuutissa.
   Ilman JavaScriptiä kortit näyttävät oletusportaan hinnat ja säätimet pysyvät piilossa (hidden).
   Säätimissä on autocomplete="off", jotta selain ei palauta vanhaa arvoa Takaisin-napilla tekstin ja hinnan ohi:
   valinnat palautetaan sen sijaan sivun osoitteesta (ks. paivitaOsoite). */
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
    yritykselle: 'For businesses: ',
    lisaAlv: ' + VAT',
    sisAlvLyhyt: 'incl. VAT',
    sisAlvIso: 'incl. VAT 25.5%',
    tapaIlmoitus: {
      kuluttaja: 'Prices are now shown for private individuals, including VAT.',
      yritys: 'Prices are now shown for businesses, excluding VAT.'
    },
    kk: '/mo',
    kuukaudessa: ' per month',
    lisaksi: 'plus ',
    kayttoonotto: '+ setup ',
    alusta: ['platform', 'platforms'],
    ja: ' and ',
    tilinhoito: function (a, lista, n, vko, kk, kerta, kuluttajalle) {
      return a + ' ' + monikko(a, 'platform', 'platforms') + ' (' + lista + '), ' + n + ' posts per month, about ' +
        vko + ' per week. ' + (kuluttajalle ? 'For businesses: ' + kk + ' and setup ' + kerta + ' + VAT.'
          : 'Incl. Finnish VAT 25.5%: ' + kk + ' and setup ' + kerta + '.');
    },
    tilinhoitoAria: function (n, vko, raha) { return n + ' posts per month, about ' + vko + ' per week, ' + raha; },
    valitseAlusta: 'Select at least one platform. ',
    alustaIlmoitus: function (a, kk, kerta) {
      return a + ' ' + monikko(a, 'platform', 'platforms') + ': ' + kk + ', setup ' + kerta + '.';
    },
    videotAria: function (n) { return n + ' ' + monikko(n, 'video', 'videos') + ' per month'; },
    perAria: function (n) { return n + ' ' + monikko(n, 'clip', 'clips') + ' per video'; },
    yhteensa: function (t) { return 'Total ' + t + ' ' + monikko(t, 'clip', 'clips') + ' per month'; },
    alle: function (min) { return 'The smallest package is ' + min + ' clips. For smaller needs, the single batch is a good fit.'; },
    yli: function (max) { return 'More than ' + max + ' clips a month: we can agree on that separately, and there is no upper limit.'; },
    yliAihe: function (max) { return 'Quote request: more than ' + max + ' clips a month'; },
    yliViesti: function (v, p) { return 'Hi,\n\nVideos per month: ' + v + '\nClips per video: ' + p + '\nChannel: \n'; },
    vapaaksi: function (n, v) {
      return n + '-clip package: ' + v + ' ' + monikko(v, 'clip is', 'clips are') + ' left over, e.g. for archive clips or an extra video.';
    },
    perVideo: function (x, v) {
      return '≈ ' + x + ' ' + monikko(x, 'clip', 'clips') + ' per video with ' + v + ' ' + monikko(v, 'video', 'videos') + ' a month';
    },
    valittu: function (n, raha) { return 'Selected package: ' + n + ' clips, ' + raha + '.'; }
  } : {
    sisAlv: 'Sis. alv 25,5 %: ',
    alv0: 'alv 0 %',
    yritykselle: 'Yritykselle ',
    lisaAlv: ' + alv',
    sisAlvLyhyt: 'sis. alv',
    sisAlvIso: 'sis. alv 25,5 %',
    tapaIlmoitus: {
      kuluttaja: 'Hinnat näytetään nyt yksityishenkilölle alv:n kanssa.',
      yritys: 'Hinnat näytetään nyt yritykselle ilman alv:tä.'
    },
    kk: '/kk',
    kuukaudessa: ' kuukaudessa',
    lisaksi: 'lisäksi ',
    kayttoonotto: '+ käyttöönotto ',
    alusta: ['alusta', 'alustaa'],
    ja: ' ja ',
    tilinhoito: function (a, lista, n, vko, kk, kerta, kuluttajalle) {
      return a + ' ' + monikko(a, 'alusta', 'alustaa') + ' (' + lista + '), ' + n + ' julkaisua kuukaudessa eli noin ' +
        vko + ' viikossa. ' + (kuluttajalle ? 'Yritykselle ' + kk + ' ja käyttöönotto ' + kerta + ' + alv.'
          : 'Sis. alv 25,5 %: ' + kk + ' ja käyttöönotto ' + kerta + '.');
    },
    tilinhoitoAria: function (n, vko, raha) { return n + ' julkaisua kuukaudessa, noin ' + vko + ' viikossa, ' + raha; },
    valitseAlusta: 'Valitse vähintään yksi alusta. ',
    alustaIlmoitus: function (a, kk, kerta) {
      return a + ' ' + monikko(a, 'alusta', 'alustaa') + ': ' + kk + ', käyttöönotto ' + kerta + '.';
    },
    videotAria: function (n) { return n + ' ' + monikko(n, 'video', 'videota') + ' kuukaudessa'; },
    perAria: function (n) { return n + ' ' + monikko(n, 'klippi', 'klippiä') + ' per video'; },
    yhteensa: function (t) { return 'Yhteensä ' + t + ' ' + monikko(t, 'klippi', 'klippiä') + ' kuukaudessa'; },
    alle: function (min) { return 'Pienin paketti on ' + min + ' klippiä. Pienempään tarpeeseen sopii kertaerä.'; },
    yli: function (max) { return 'Yli ' + max + ' klippiä kuussa: sovitaan erikseen, eikä ylärajaa ole.'; },
    yliAihe: function (max) { return 'Tarjouspyyntö: yli ' + max + ' klippiä kuukaudessa'; },
    yliViesti: function (v, p) { return 'Hei,\n\nVideoita kuukaudessa: ' + v + '\nKlippiä per video: ' + p + '\nKanava: \n'; },
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
  // Samat parametrit päivitetään myös tämän sivun osoitteeseen (history.replaceState). Kun sivulle palataan
  // Takaisin-napilla tai tullaan linkillä, jossa parametrit ovat (sama muoto kuin tarjoussivun esitäytössä),
  // säätimet palautuvat, ja lisäpalvelun säädin avaa oman avattavan osionsa. Henkilötietoja ei laiteta osoitteeseen.
  var AVAIMET = ['klippaamo', 'videot', 'per', 'kertaera', 'aiMainos', 'arkisto', 'tilinhoito', 'alustat'];
  var ALKU = (function () {
    try { return new URLSearchParams(window.location.search); } catch (e) { return null; }
  })();
  function alkuarvo(nimi) { return ALKU && ALKU.has(nimi) ? ALKU.get(nimi) : null; }

  // Hintatapa (valitsin data-hintatapa-valitsin): yksityishenkilölle hinnat alv:n kanssa, yritykselle alv 0 %.
  // Valinta tulee osoitteesta (?hinnat=yritys tai ?hinnat=yksityinen), sitten selaimen muistista, muuten yksityishenkilö.
  // Sivulla, jolla valitsinta ei ole (englanninkielinen etusivu), hinnat näytetään aina alv 0 %.
  var TAPA_MUISTI = 'pystystudio-hintatapa';
  var tapaValitsin = document.querySelector('[data-hintatapa-valitsin]');
  var tapaKuuntelijat = [];
  function tallennettuTapa() {
    try {
      var t = window.localStorage.getItem(TAPA_MUISTI);
      return t === 'yritys' || t === 'kuluttaja' ? t : null;
    } catch (e) { return null; }
  }
  function tallennaTapa(t) {
    try { window.localStorage.setItem(TAPA_MUISTI, t); } catch (e) { /* tallennus estetty: valinta pätee tällä sivulla */ }
  }
  var tapa = 'yritys';
  if (tapaValitsin) {
    var tapaAlku = { yritys: 'yritys', yksityinen: 'kuluttaja' }[alkuarvo('hinnat')] || null;
    tapa = tapaAlku || tallennettuTapa() || 'kuluttaja';
    if (tapaAlku) tallennaTapa(tapa);
  }
  function kuluttaja() { return tapa === 'kuluttaja'; }
  // Hinta sentteinä valitulla hintatavalla: yksityishenkilölle alv 25,5 % mukana.
  function hinnaksi(euroja) { return kuluttaja() ? V.alvilla(euroja) : Math.round(euroja * 100); }
  // Piirto uudelleen, kun valuutta tai hintatapa vaihtuu.
  function kun(fn) { V.kun(fn); tapaKuuntelijat.push(fn); }

  // Valitsimen napit ja huomautus, ison hinnan alv-merkintä (.hinta .alv) ja tekstit, joilla on
  // yksityishenkilön versio (data-alv-kuluttaja). HTML:n oma teksti on yrityksen versio.
  function paivitaTapaSivulla() {
    tapaValitsin.querySelectorAll('[data-hintatapa-nappi]').forEach(function (nappi) {
      nappi.setAttribute('aria-pressed', String(nappi.getAttribute('data-hintatapa-nappi') === tapa));
    });
    var huomio = tapaValitsin.querySelector('[data-hintatapa-huomio]');
    if (huomio) huomio.textContent = huomio.getAttribute(kuluttaja() ? 'data-kuluttaja' : 'data-yritys');
    document.querySelectorAll('.hinta .alv').forEach(function (el) {
      if (!el.hasAttribute('data-alv-yritys')) el.setAttribute('data-alv-yritys', el.textContent);
      el.textContent = kuluttaja() ? T.sisAlvIso : el.getAttribute('data-alv-yritys');
    });
    document.querySelectorAll('[data-alv-kuluttaja]').forEach(function (el) {
      if (!el.hasAttribute('data-alv-yritys')) el.setAttribute('data-alv-yritys', el.textContent);
      el.textContent = el.getAttribute(kuluttaja() ? 'data-alv-kuluttaja' : 'data-alv-yritys');
    });
  }
  function asetaTapa(uusi) {
    if (uusi === tapa) return;
    tapa = uusi;
    tallennaTapa(uusi);
    if (/[?&]hinnat=/.test(window.location.search) && window.history && window.history.replaceState) {
      try {
        var haku = window.location.search.replace(/([?&]hinnat=)[^&]*/, '$1' + (uusi === 'yritys' ? 'yritys' : 'yksityinen'));
        window.history.replaceState(window.history.state, '', window.location.pathname + haku + window.location.hash);
      } catch (e) { /* osoitetta ei voi päivittää: valinta pätee silti */ }
    }
    paivitaTapaSivulla();
    tapaKuuntelijat.forEach(function (fn) { fn(); });
    var ilmoitus = tapaValitsin.querySelector('[data-hintatapa-ilmoitus]');
    if (ilmoitus) ilmoitus.textContent = T.tapaIlmoitus[tapa];
  }

  var valinnat = {};
  function valintaOsat() {
    var osat = [];
    Object.keys(valinnat).forEach(function (palvelu) {
      var p = valinnat[palvelu];
      Object.keys(p).forEach(function (nimi) { osat.push(nimi + '=' + encodeURIComponent(p[nimi])); });
    });
    return osat;
  }
  function paivitaTarjouslinkit() {
    var osat = valintaOsat();
    if (V.valuutta() === 'usd') osat.push('currency=usd');
    if (V.lisaParametrit) osat = osat.concat(V.lisaParametrit()); // uuden ilmeen esikatselu (?uusi=1)
    document.querySelectorAll('[data-tarjouslinkki]').forEach(function (a) {
      if (!a.hasAttribute('data-pohja')) a.setAttribute('data-pohja', a.getAttribute('href'));
      a.setAttribute('href', a.getAttribute('data-pohja') + (osat.length ? '?' + osat.join('&') : ''));
    });
  }
  // Sivun oma osoite: säätimien parametrit vaihdetaan, muut parametrit (esim. currency) säilyvät.
  function paivitaOsoite() {
    if (!window.history || !window.history.replaceState) return;
    try {
      var muut = window.location.search.replace(/^\?/, '').split('&').filter(function (o) {
        return o && AVAIMET.indexOf(o.split('=')[0]) < 0;
      });
      var haku = valintaOsat().concat(muut);
      var uusi = window.location.pathname + (haku.length ? '?' + haku.join('&') : '') + window.location.hash;
      if (uusi !== window.location.pathname + window.location.search + window.location.hash) {
        window.history.replaceState(window.history.state, '', uusi);
      }
    } catch (e) { /* osoitetta ei voi päivittää: säätimet toimivat silti */ }
  }
  function valitse(palvelu, parametrit) { valinnat[palvelu] = parametrit; paivitaTarjouslinkit(); paivitaOsoite(); }

  // Avattava osio (<details>) auki, kun sen sisällä olevaa säädintä on käytetty tai se palautetaan osoitteesta.
  function avaaOsio(el) {
    var d = el.closest('details');
    while (d) {
      d.open = true;
      d = d.parentElement ? d.parentElement.closest('details') : null;
    }
  }

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
      var sentit = hinnaksi(euroja);
      var etumerkki = el.getAttribute('data-etumerkki') || '';
      var jakso = el.getAttribute('data-jakso') || '';
      if (el.classList.contains('summa')) naytaHinta(el, sentit, etumerkki);
      else if (el.hasAttribute('data-sulut')) el.textContent = V.sulkeissa(sentit, jakso, etumerkki);
      else el.textContent = V.teksti(sentit, jakso, etumerkki);
    });
    // Kaikki valmiina vs. erikseen: Klippaamo 20 klippiä + klippitilin hoito (20 julkaisua, 3 alustaa).
    document.querySelectorAll('[data-kaikki-saasto]').forEach(function (el) {
      var erikseen = H.klippaamo[20] + H.tilinhoito[20][2];
      el.textContent = V.teksti(hinnaksi(erikseen - H.kiinteat.kaikkiValmiina));
    });
  }

  // Yksi liukusäädin porrasnumeroineen. paivita(i, kayttaja): kayttaja = true, kun muutos tuli käyttäjältä.
  // input- ja change-tapahtuma tulevat usein samasta liikkeestä, joten sama arvo käsitellään vain kerran.
  function kytke(input, paivita) {
    var portaat = input.nextElementSibling;
    var merkit = portaat && portaat.classList.contains('portaat') ? portaat.querySelectorAll('[data-i]') : [];
    var max = Number(input.max) || 1;
    var piirretty = null;

    function piirra(kayttaja) {
      var i = Number(input.value);
      piirretty = input.value;
      input.style.setProperty('--t', String(i / max));
      Array.prototype.forEach.call(merkit, function (m) { m.classList.toggle('valittu', Number(m.dataset.i) === i); });
      paivita(i, kayttaja === true);
    }
    function kayttajalta() { if (input.value !== piirretty) piirra(true); }
    input.addEventListener('input', kayttajalta);
    input.addEventListener('change', kayttajalta);
    // Porrasnumeroa voi napauttaa (näppäimistöllä säädin toimii nuolinäppäimillä).
    Array.prototype.forEach.call(merkit, function (m) {
      m.addEventListener('click', function () {
        input.value = m.dataset.i;
        kayttajalta();
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
    // Osoitteesta palautettava porras (esim. ?kertaera=4), muuten oletus.
    var alku = alkuarvo(avain), alkuI = -1;
    portaat.forEach(function (p, j) { if (String(p.n) === alku) alkuI = j; });
    input.value = kortti.dataset.oletus || 0;

    function hintaSentit(i) { return hinnaksi(hinnat[portaat[i].n]); }

    var piirra = kytke(input, function (i, kayttaja) {
      var p = portaat[i];
      var hinta = hinnat[p.n];
      var yksikko = p.n === 1 ? yksikot[0] : yksikot[1];
      var nimi = p.nimi || kortti.dataset.nimi;
      var kuvaus = p.kuvaus || kortti.dataset.malli.replace('{n}', p.n).replace('{yksikko}', yksikko);
      var perSentit = Math.round(hinnaksi(hinta) / p.n);
      var jakso = kk ? T.kk : '', perJakso = '/' + (kortti.dataset.per || yksikot[0]);

      if (nimiEl) nimiEl.textContent = nimi;
      if (kuvausEl) kuvausEl.textContent = kuvaus;
      if (lisaEl) { lisaEl.textContent = p.lisa || ''; lisaEl.hidden = !p.lisa; }
      naytaHinta(summaEl, hinnaksi(hinta));
      arvoEl.textContent = p.n;
      // Yhteenvedossa toinen hinta: yritykselle alv 0 % tai yksityishenkilölle alv:n kanssa.
      yhteenvetoEl.textContent = kuluttaja()
        ? T.yritykselle + V.teksti(hinta * 100, jakso) + T.lisaAlv + ' · ' + V.lisatiedolla(perSentit, perJakso, T.sisAlvLyhyt)
        : T.sisAlv + V.teksti(V.alvilla(hinta), jakso) + ' · ' + V.lisatiedolla(perSentit, perJakso, T.alv0);
      input.setAttribute('aria-valuetext',
        p.n + ' ' + yksikko + (kk ? T.kuukaudessa : '') + ', ' + V.sanoin(hinnaksi(hinta), kk ? T.kuukaudessa : '') +
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
    if (apu && apu.palautettu) {
      avaaOsio(kortti);
    } else if (alkuI >= 0) {
      input.value = alkuI;
      piirra(false);
      if (apu) apu.pakettiMuuttui(alkuI, true);
      var param = {};
      param[avain] = portaat[alkuI].n;
      valinnat[avain] = param;
      avaaOsio(kortti);
    }
    kun(function () { piirra(false); });
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
    // Osoitteesta palautettavat arvot (?videot=4&per=3).
    var vAlku = vArvot.indexOf(Number(alkuarvo('videot')));
    var pAlku = pArvot.indexOf(Number(alkuarvo('per')));
    var palautettu = vAlku >= 0 && pAlku >= 0;
    if (palautettu) { vInput.value = vAlku; pInput.value = pAlku; }

    function videot() { return vArvot[Number(vInput.value)]; }
    function per() { return pArvot[Number(pInput.value)]; }

    // Yli suurimman paketin: Kysy tarjous -linkin aihe ja viesti (ei näytteiden ehtoja).
    function paivitaTarjous(v, pv) {
      var osoite = tarjousEl.getAttribute('href').split('?')[0];
      tarjousEl.setAttribute('href', osoite + '?subject=' + encodeURIComponent(T.yliAihe(max)) +
        '&body=' + encodeURIComponent(T.yliViesti(v, pv)));
    }

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
      else if (palautettu) valinnat.klippaamo = { klippaamo: n, videot: v, per: pv };
      yhteensaEl.textContent = T.yhteensa(t);
      viestiTekstiEl.textContent = viesti;
      if (t > max) paivitaTarjous(v, pv);
      tarjousEl.hidden = !(t > max);
      viestiEl.hidden = !viesti;
      if (kayttaja) ilmoitusEl.textContent = T.yhteensa(t) + '. ' + (viesti ? viesti + ' ' : '') + T.valittu(n, hintaSanoin(i));
    }

    var piirraV = kytke(vInput, function (i, kayttaja) { if (kayttaja) apuMuuttui(true); });
    var piirraP = kytke(pInput, function (i, kayttaja) { if (kayttaja) apuMuuttui(true); });
    el.hidden = false;

    return {
      palautettu: palautettu,
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
      naytaHinta(summaEl, hinnaksi(h.kk));
      kertaEl.textContent = T.kayttoonotto + V.teksti(hinnaksi(h.kerta));
      arvoEl.textContent = h.p.n;
      // Yhteenvedossa toinen hinta: yritykselle alv 0 % tai yksityishenkilölle alv:n kanssa.
      var toinen = kuluttaja() ? function (euroja) { return euroja * 100; } : V.alvilla;
      yhteenvetoEl.textContent = T.tilinhoito(h.a, luettelo(h.alustat), h.p.n, h.p.vko,
        V.teksti(toinen(h.kk), T.kk), V.teksti(toinen(h.kerta)), kuluttaja());
      input.setAttribute('aria-valuetext', T.tilinhoitoAria(h.p.n, h.p.vko, V.sanoin(hinnaksi(h.kk), T.kuukaudessa)));
      return h;
    }

    // Tarjoussivulle: julkaisumäärä ja alustat koodeina (tiktok, instagram, shorts).
    function valitseTilinhoito(h) {
      valitse('tilinhoito', {
        tilinhoito: h.p.n,
        alustat: h.alustat.map(function (a) { return a.toLowerCase().replace('youtube ', ''); }).join(',')
      });
    }

    // Osoitteesta palautettavat valinnat (?tilinhoito=20&alustat=tiktok,shorts).
    var alkuI = -1;
    portaat.forEach(function (p, j) { if (String(p.n) === alkuarvo('tilinhoito')) alkuI = j; });
    if (alkuI >= 0) {
      input.value = alkuI;
      var koodit = (alkuarvo('alustat') || '').split(',');
      var koodi = function (r) { return r.value.toLowerCase().replace('youtube ', ''); };
      if (Array.prototype.some.call(ruudut, function (r) { return koodit.indexOf(koodi(r)) >= 0; })) {
        ruudut.forEach(function (r) { r.checked = koodit.indexOf(koodi(r)) >= 0; });
      }
    }

    // Täyttö (--t) ja valittu porrasnumero piirretään heti latauksessa.
    var piirra = kytke(input, function (i, kayttaja) { var h = paivita(); if (kayttaja) valitseTilinhoito(h); });
    saadin.hidden = false;
    var alkuH = paivita();
    piirra(false);
    if (alkuI >= 0) {
      valinnat.tilinhoito = {
        tilinhoito: alkuH.p.n,
        alustat: alkuH.alustat.map(function (a) { return a.toLowerCase().replace('youtube ', ''); }).join(',')
      };
      avaaOsio(kortti);
    }
    kun(paivita);

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
        ilmoitusEl.textContent = viesti + T.alustaIlmoitus(h.a, V.sanoin(hinnaksi(h.kk), T.kuukaudessa), V.sanoin(hinnaksi(h.kerta)));
      });
    });
  }

  if (tapaValitsin) {
    tapaValitsin.querySelectorAll('[data-hintatapa-nappi]').forEach(function (nappi) {
      nappi.addEventListener('click', function () { asetaTapa(nappi.getAttribute('data-hintatapa-nappi')); });
    });
    tapaValitsin.hidden = false;
    paivitaTapaSivulla();
  }
  piirraKiinteat();
  kun(piirraKiinteat);
  V.kun(paivitaTarjouslinkit);
  document.querySelectorAll('[data-saadin]').forEach(teeSaadin);
  document.querySelectorAll('[data-tilinhoito]').forEach(teeTilinhoito);
  paivitaTarjouslinkit();
})();
