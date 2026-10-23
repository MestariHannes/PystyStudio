/* Pysty Studio – räätälöity tarjous (tarjous.html ja en/quote.html).
   Hinnat tulevat hintadata.js:stä ja valuutta valuutta.js:stä, joten hintoja ei ole tässä tiedostossa.
   Sivu ei lähetä eikä tallenna mitään: Lähetä-painike avaa kävijän oman sähköpostiohjelman valmiilla
   viestillä (mailto). Etusivun valinnat tulevat URL-parametreina, esim. ?klippaamo=12&videot=4&per=3.
   Sivun omat valinnat päivitetään samassa muodossa osoitteeseen (history.replaceState), ja valintojen
   kentissä on autocomplete="off": Takaisin-napilla palatessa valinnat palautuvat osoitteesta, eivät selaimen muistista.
   Ilman JavaScriptiä sivulla näkyy ohje lähettää sähköpostia ja palvelulista. */
(function () {
  'use strict';

  var H = window.PystyHinnat;
  var V = window.PystyValuutta;
  var lomake = document.querySelector('[data-tarjous]');
  if (!H || !V || !lomake) return;

  var en = V.kieli === 'en';
  var OSOITE = 'korkiakoskihannes@gmail.com';
  var SIVUSTO = 'https://mestarihannes.github.io/PystyStudio/';
  var PITKA_MAILTO = 1800; // merkkiä: tätä pidempi mailto-linkki ei avaudu kaikissa sähköpostiohjelmissa

  function monikko(n, yksi, monta) { return n === 1 ? yksi : monta; }

  var T = en ? {
    kk: '/mo',
    klippia: function (n) { return n + ' ' + monikko(n, 'clip', 'clips'); },
    klippiaKk: function (n) { return n + ' clips per month'; },
    mainosta: function (n) { return n + ' ' + monikko(n, 'ad', 'ads'); },
    alustaa: function (a) { return a + ' ' + monikko(a, 'platform', 'platforms'); },
    julkaisua: function (n) { return n + ' posts per month'; },
    ja: ' and ',
    kayttoonotto: 'setup',
    apu: function (v, p) { return v + ' ' + monikko(v, 'video', 'videos') + ' a month × ' + p + ' ' + monikko(p, 'clip', 'clips') + ' per video'; },
    perKlippi: function (n, kk, hinta) { return n + ' ' + monikko(n, 'clip', 'clips') + (kk ? ' per month' : '') + ' × ' + hinta; },
    kpl: function (n, hinta) { return n + ' × ' + hinta; },
    sisaltyy: 'included in the Pro package',
    sisaltyyKaikki: 'included in the all-done-for-you package',
    yliAihe: function (max) { return 'Quote request: more than ' + max + ' clips a month'; },
    yliViesti: function (v, p) { return 'Hi,\n\nVideos per month: ' + v + '\nClips per video: ' + p + '\nChannel: \n'; },
    eiKlippeja: 'Select a clip service first: the price is per clip.',
    kuukausittain: 'Monthly',
    kertaluonteiset: 'One-off',
    alv0: 'excl. VAT',
    sisAlv: 'incl. Finnish VAT 25.5%',
    tyhja: 'You haven’t selected any services yet.',
    valitseJotain: 'Select at least one service or the free samples.',
    aihe: function (yritys) { return 'Quote request' + (yritys ? ': ' + yritys : ''); },
    vastaanottaja: 'To: ',
    aiheOtsikko: 'Subject: ',
    hei: 'Hi,',
    pyydan: 'I’d like a quote for the following services.',
    arvio: 'Price estimate:',
    eiSitova: 'Estimate, not binding. The final quote will be sent by email.',
    usd: 'USD amounts are approximate. All prices are agreed and invoiced in euros.',
    naytteet: 'I’d like 3 free sample clips first.',
    hyvaksyn: 'I accept the sample terms: ',
    ehdot: 'en/samples.html',
    kentat: { nimi: 'Name', yritys: 'Company or channel', ytunnus: 'Business ID / VAT number', sahkoposti: 'Email', linkki: 'Channel or video', viesti: 'Message' },
    kopioitu: 'Message copied. Paste it into an email to ' + OSOITE + '.',
    eiKopioitu: 'Copying didn’t work. Select the message below and copy it yourself.',
    pitka: 'The message is long. If your email app doesn’t open the whole message, copy it and paste it into an email to ' + OSOITE + '.',
    ilmoitus: function (kk, kerta) { return 'Estimate: ' + kk + ' per month and ' + kerta + ' one-off.'; },
    palkki: function (kk, kerta) { return [kk, kerta].filter(Boolean).join(' + '); }
  } : {
    kk: '/kk',
    klippia: function (n) { return n + ' ' + monikko(n, 'klippi', 'klippiä'); },
    klippiaKk: function (n) { return n + ' klippiä kuukaudessa'; },
    mainosta: function (n) { return n + ' ' + monikko(n, 'mainos', 'mainosta'); },
    alustaa: function (a) { return a + ' ' + monikko(a, 'alusta', 'alustaa'); },
    julkaisua: function (n) { return n + ' julkaisua kuukaudessa'; },
    ja: ' ja ',
    kayttoonotto: 'käyttöönotto',
    apu: function (v, p) { return v + ' ' + monikko(v, 'video', 'videota') + ' kuukaudessa × ' + p + ' ' + monikko(p, 'klippi', 'klippiä') + ' per video'; },
    perKlippi: function (n, kk, hinta) { return n + ' ' + monikko(n, 'klippi', 'klippiä') + (kk ? ' kuukaudessa' : '') + ' × ' + hinta; },
    kpl: function (n, hinta) { return n + ' × ' + hinta; },
    sisaltyy: 'sisältyy Pro-pakettiin',
    sisaltyyKaikki: 'sisältyy Kaikki valmiina -pakettiin',
    yliAihe: function (max) { return 'Tarjouspyyntö: yli ' + max + ' klippiä kuukaudessa'; },
    yliViesti: function (v, p) { return 'Hei,\n\nVideoita kuukaudessa: ' + v + '\nKlippiä per video: ' + p + '\nKanava: \n'; },
    eiKlippeja: 'Valitse ensin klippipalvelu: hinta lasketaan klippien määrästä.',
    kuukausittain: 'Kuukausittain',
    kertaluonteiset: 'Kertaluonteiset',
    alv0: 'alv 0 %',
    sisAlv: 'sis. alv 25,5 %',
    tyhja: 'Et ole vielä valinnut palveluja.',
    valitseJotain: 'Valitse vähintään yksi palvelu tai ilmaiset näytteet.',
    aihe: function (yritys) { return 'Tarjouspyyntö' + (yritys ? ': ' + yritys : ''); },
    vastaanottaja: 'Vastaanottaja: ',
    aiheOtsikko: 'Aihe: ',
    hei: 'Hei,',
    pyydan: 'Pyydän tarjousta seuraavista palveluista.',
    arvio: 'Hinta-arvio:',
    eiSitova: 'Arvio, ei sitova. Lopullinen tarjous lähetetään sähköpostilla.',
    usd: 'Dollarisummat ovat suuntaa antavia. Hinnat sovitaan ja laskutetaan euroissa.',
    naytteet: 'Haluan ensin 3 ilmaista näyteklippiä.',
    hyvaksyn: 'Hyväksyn näytteiden ehdot: ',
    ehdot: 'naytteet.html',
    kentat: { nimi: 'Nimi', yritys: 'Yritys tai kanava', ytunnus: 'Y-tunnus', sahkoposti: 'Sähköposti', linkki: 'Kanava tai video', viesti: 'Viesti' },
    kopioitu: 'Viesti kopioitu. Liitä se sähköpostiin osoitteeseen ' + OSOITE + '.',
    eiKopioitu: 'Kopiointi ei onnistunut. Valitse viesti alta ja kopioi se itse.',
    pitka: 'Viesti on pitkä. Jos sähköpostiohjelmasi ei avaa koko viestiä, kopioi viesti ja liitä se sähköpostiin osoitteeseen ' + OSOITE + '.',
    ilmoitus: function (kk, kerta) { return 'Arvio: ' + kk + ' kuukaudessa ja ' + kerta + ' kertaluonteisesti.'; },
    palkki: function (kk, kerta) { return [kk, kerta].filter(Boolean).join(' + '); }
  };

  // Palvelut. hinta = hintadata.js:n kiinteä hinta, porras = portaittainen hinta (koko valitaan listasta),
  // klipit = montako klippiä palvelu tuottaa (englanninkielinen tekstitys ja vaakaversio lasketaan niistä).
  var KPL = {
    kansikuva: {}, pikkukuva: {},
    bestOf: { klipit: 1 }, ennenJalkeen: { klipit: 1 },
    traileri: { klipit: 1 }, kommenttivastaus: { klipit: 1 },
    sponsori: { klipit: 1 }, audiogrammi: { klipit: 1 },
    livestriimi: { klipit: 8 }, lisaklippi: { klipit: 1 }
  };
  var KK = ['julkaisutekstit', 'julkaisuPuolesta', 'kuukausiraportti'];
  var PER_KLIPPI = ['englanninTekstitys', 'vaakaversio'];

  function rivi(avain) { return lomake.querySelector('[data-palvelu="' + avain + '"]'); }
  function ruutu(r) { return r.querySelector('[data-valittu]'); }
  function valittu(avain) { var r = rivi(avain); return !!(r && ruutu(r).checked); }
  function nimi(r) { return r.querySelector('.palvelu-nimi').textContent.trim(); }
  function kokoValinta(r) { return r.querySelector('[data-koko]'); }
  function koko(r) { return Number(kokoValinta(r).value); }
  function kokoNimi(r) {
    var s = kokoValinta(r);
    return s.options[s.selectedIndex].getAttribute('data-nimi') || nimi(r);
  }
  function maara(r) {
    var n = Math.floor(Number(r.querySelector('[data-maara]').value));
    return n >= 1 ? Math.min(n, 999) : 1;
  }
  function alustat(r) {
    return Array.prototype.filter.call(r.querySelectorAll('[data-alusta]'), function (c) { return c.checked; })
      .map(function (c) { return c.value; });
  }
  function luettelo(nimet) {
    return nimet.length < 2 ? nimet.join('') : nimet.slice(0, -1).join(', ') + T.ja + nimet[nimet.length - 1];
  }

  // Klippaamon apuvalinnat (videoita × klippiä per video) ovat mukana viestissä, kun niitä on käytetty.
  var apuKaytossa = false;

  // Laskee valitut palvelut riveiksi: ryhmä (kk tai kerta), nimi, lisätiedot ja hinta sentteinä.
  function laske() {
    var rivit = [];
    var klipit = { kk: 0, kerta: 0 };
    function lisaa(ryhma, nimiTeksti, tiedot, sentit) {
      rivit.push({ ryhma: ryhma, nimi: nimiTeksti, tiedot: tiedot || '', sentit: sentit });
    }
    var r, n;

    if (valittu('klippaamo')) {
      r = rivi('klippaamo'); n = koko(r);
      lisaa('kk', kokoNimi(r), T.klippiaKk(n) + (apuKaytossa ? ' (' + T.apu(apuArvo('videot'), apuArvo('per')) + ')' : ''), H.klippaamo[n] * 100);
      klipit.kk += n;
    }
    if (valittu('kaikkiValmiina')) {
      r = rivi('kaikkiValmiina');
      lisaa('kk', nimi(r), '', H.kiinteat.kaikkiValmiina * 100);
      lisaa('kerta', nimi(r), T.kayttoonotto, H.kiinteat.kaikkiValmiinaKayttoonotto * 100);
      klipit.kk += 20;
    }
    if (valittu('kertaera')) {
      r = rivi('kertaera'); n = koko(r);
      lisaa('kerta', nimi(r), T.klippia(n), H.kertaera[n] * 100);
      klipit.kerta += n;
    }
    if (valittu('pystyPuhe')) {
      r = rivi('pystyPuhe');
      lisaa('kerta', nimi(r), T.klippia(8), H.kiinteat.pystyPuhe * 100);
      klipit.kerta += 8;
    }
    if (valittu('aiMainos')) {
      r = rivi('aiMainos'); n = koko(r);
      lisaa('kerta', nimi(r), T.mainosta(n), H.aiMainos[n] * 100);
    }
    if (valittu('arkisto')) {
      r = rivi('arkisto'); n = koko(r);
      lisaa('kerta', kokoNimi(r), T.klippia(n), H.arkisto[n] * 100);
      klipit.kerta += n;
    }
    if (valittu('tilinhoito')) {
      r = rivi('tilinhoito'); n = koko(r);
      var a = alustat(r);
      if (valittu('kaikkiValmiina')) {
        // Kaikki valmiina sisältää klippitilin hoidon: ei toista kuukausihintaa eikä toista käyttöönottoa.
        lisaa('kk', nimi(r), T.sisaltyyKaikki, 0);
      } else if (a.length) {
        lisaa('kk', nimi(r), T.alustaa(a.length) + ' (' + luettelo(a) + '), ' + T.julkaisua(n), H.tilinhoito[n][a.length - 1] * 100);
        lisaa('kerta', nimi(r), T.kayttoonotto, H.tilinhoitoKayttoonotto[a.length - 1] * 100);
      }
    }
    KK.forEach(function (avain) {
      if (!valittu(avain)) return;
      r = rivi(avain);
      var pro = avain === 'julkaisutekstit' && valittu('klippaamo') && koko(rivi('klippaamo')) === 24;
      lisaa('kk', nimi(r), pro ? T.sisaltyy : '', pro ? 0 : H.kiinteat[avain] * 100);
    });
    Object.keys(KPL).forEach(function (avain) {
      if (!valittu(avain)) return;
      r = rivi(avain);
      var q = maara(r), hinta = H.kiinteat[avain] * 100;
      lisaa('kerta', nimi(r), T.kpl(q, V.euroa(hinta)), q * hinta);
      klipit.kerta += q * (KPL[avain].klipit || 0);
    });
    PER_KLIPPI.forEach(function (avain) {
      if (!valittu(avain)) return;
      r = rivi(avain);
      var hinta = H.kiinteat[avain] * 100;
      if (klipit.kk) lisaa('kk', nimi(r), T.perKlippi(klipit.kk, true, V.euroa(hinta)), klipit.kk * hinta);
      if (klipit.kerta) lisaa('kerta', nimi(r), T.perKlippi(klipit.kerta, false, V.euroa(hinta)), klipit.kerta * hinta);
    });

    var summa = { kk: 0, kerta: 0 };
    rivit.forEach(function (x) { summa[x.ryhma] += x.sentit; });
    return { rivit: rivit, summa: summa, klipit: klipit };
  }

  function alvilla(sentit) { return Math.round(sentit * H.alvPromille / 1000); }
  // 'alv 0 %: 548 €/kk' ja 'sis. alv 25,5 %: 687,74 €/kk' (USD-tilassa dollariarvio perässä).
  function summaTeksti(sentit, jakso, erotin) {
    return T.alv0 + ': ' + V.teksti(sentit, jakso) + erotin + T.sisAlv + ': ' + V.teksti(alvilla(sentit), jakso);
  }
  function piirraSumma(el, sentit, jakso) {
    el.textContent = '';
    if (!sentit) { el.textContent = '–'; return; }
    [T.alv0 + ': ' + V.teksti(sentit, jakso), T.sisAlv + ': ' + V.teksti(alvilla(sentit), jakso)].forEach(function (t) {
      var rivi = document.createElement('span');
      rivi.textContent = t;
      el.appendChild(rivi);
    });
  }
  function apuArvo(nimiArvo) { return Number(rivi('klippaamo').querySelector('[data-' + nimiArvo + ']').value); }

  // Rivien hinnat lomakkeessa (näkyvät vasta JavaScriptillä, joten hintoja ei ole HTML:ssä).
  function piirraRivihinnat(h) {
    lomake.querySelectorAll('[data-palvelu]').forEach(function (r) {
      var avain = r.getAttribute('data-palvelu');
      var el = r.querySelector('[data-rivihinta]');
      if (!el) return;
      var t = '';
      if (avain !== 'tilinhoito' && H[avain] && kokoValinta(r)) t = V.teksti(H[avain][koko(r)] * 100, avain === 'klippaamo' ? T.kk : '');
      else if (avain === 'tilinhoito') {
        var a = Math.max(1, alustat(r).length);
        t = V.teksti(H.tilinhoito[koko(r)][a - 1] * 100, T.kk) + ' + ' + T.kayttoonotto + ' ' + V.teksti(H.tilinhoitoKayttoonotto[a - 1] * 100);
      } else if (avain === 'kaikkiValmiina') {
        t = V.teksti(H.kiinteat.kaikkiValmiina * 100, T.kk) + ' + ' + T.kayttoonotto + ' ' + V.teksti(H.kiinteat.kaikkiValmiinaKayttoonotto * 100);
      } else if (KK.indexOf(avain) >= 0) t = V.teksti(H.kiinteat[avain] * 100, T.kk);
      else if (KPL[avain]) t = V.teksti(H.kiinteat[avain] * 100, r.getAttribute('data-jakso') || '');
      else if (PER_KLIPPI.indexOf(avain) >= 0) t = V.teksti(H.kiinteat[avain] * 100, r.getAttribute('data-jakso') || '', '+');
      else if (H.kiinteat[avain]) t = V.teksti(H.kiinteat[avain] * 100);
      el.textContent = t;
    });
    // Klippikohtaiset lisät: kerrotaan, jos klippipalvelua ei ole valittu.
    PER_KLIPPI.forEach(function (avain) {
      var huom = rivi(avain).querySelector('[data-huomio]');
      if (huom) huom.hidden = !(valittu(avain) && !h.klipit.kk && !h.klipit.kerta);
    });
    var tilinhoitoHuomio = rivi('tilinhoito').querySelector('[data-huomio]');
    if (tilinhoitoHuomio) tilinhoitoHuomio.hidden = alustat(rivi('tilinhoito')).length > 0;
    // Klippitilin hoito ilman klippipalvelua: huomio, että se myydään klippipaketin rinnalle.
    var pakettiHuomio = rivi('tilinhoito').querySelector('[data-huomio-paketti]');
    if (pakettiHuomio) {
      pakettiHuomio.hidden = !(valittu('tilinhoito') &&
        !['klippaamo', 'kaikkiValmiina', 'kertaera', 'arkisto'].some(valittu));
    }
    // Yli suurimman Klippaamo-paketin (videoita × klippiä per video): sovitaan erikseen, kuten etusivulla.
    var k = rivi('klippaamo');
    var yliEl = k.querySelector('[data-huomio-yli]');
    if (yliEl) {
      var koot = Array.prototype.map.call(kokoValinta(k).options, function (o) { return Number(o.value); });
      var max = koot[koot.length - 1];
      var v = apuArvo('videot'), p = apuArvo('per');
      yliEl.hidden = !(apuKaytossa && v * p > max);
      var linkki = yliEl.querySelector('[data-yli-tarjous]');
      if (linkki && !yliEl.hidden) {
        linkki.setAttribute('href', 'mailto:' + OSOITE + '?subject=' + encodeURIComponent(T.yliAihe(max)) +
          '&body=' + encodeURIComponent(T.yliViesti(v, p)));
      }
    }
  }

  var listaEl = lomake.querySelector('[data-yhteenveto-lista]');
  var kkEl = lomake.querySelector('[data-summa-kk]');
  var kertaEl = lomake.querySelector('[data-summa-kerta]');
  var ilmoitusEl = lomake.querySelector('[data-tarjous-ilmoitus]');
  var palkkiEl = document.querySelector('[data-tarjous-palkki]');
  var palkkiSummaEl = document.querySelector('[data-palkki-summa]');
  var pitkaEl = lomake.querySelector('[data-pitka]');
  var ilmoitusAjastin = null;

  function piirraYhteenveto(h, ilmoita) {
    listaEl.textContent = '';
    if (!h.rivit.length) {
      var p = document.createElement('p');
      p.className = 'yhteenveto-tyhja';
      p.textContent = T.tyhja;
      listaEl.appendChild(p);
    }
    [['kk', T.kuukausittain], ['kerta', T.kertaluonteiset]].forEach(function (ryhma) {
      var omat = h.rivit.filter(function (x) { return x.ryhma === ryhma[0]; });
      if (!omat.length) return;
      var otsikko = document.createElement('h3');
      otsikko.textContent = ryhma[1];
      var ul = document.createElement('ul');
      omat.forEach(function (x) {
        var li = document.createElement('li');
        var nimiEl = document.createElement('span');
        nimiEl.className = 'yhteenveto-nimi';
        nimiEl.textContent = x.nimi + (x.tiedot ? ', ' + x.tiedot : '');
        var hintaEl = document.createElement('span');
        hintaEl.className = 'yhteenveto-hinta';
        hintaEl.textContent = V.teksti(x.sentit, ryhma[0] === 'kk' ? T.kk : '');
        li.appendChild(nimiEl);
        li.appendChild(hintaEl);
        ul.appendChild(li);
      });
      listaEl.appendChild(otsikko);
      listaEl.appendChild(ul);
    });
    piirraSumma(kkEl, h.summa.kk, T.kk);
    piirraSumma(kertaEl, h.summa.kerta, '');
    if (palkkiSummaEl) {
      // Mobiilin hintapalkki noudattaa valuuttavalintaa (USD-tilassa dollariarvio perässä).
      palkkiSummaEl.textContent = h.rivit.length
        ? T.palkki(h.summa.kk ? V.teksti(h.summa.kk, T.kk) : '', h.summa.kerta ? V.teksti(h.summa.kerta) : '')
        : T.tyhja;
    }
    clearTimeout(ilmoitusAjastin);
    if (ilmoita) ilmoitusAjastin = setTimeout(function () {
      ilmoitusEl.textContent = T.ilmoitus(V.sanoin(h.summa.kk), V.sanoin(h.summa.kerta));
    }, 700);
  }

  // Sähköpostiviesti. Henkilötiedot ovat vain viestissä, eivät sivun osoitteessa.
  function kentta(nimiArvo) { var el = lomake.querySelector('[name="' + nimiArvo + '"]'); return el ? el.value.trim() : ''; }
  function viesti(h) {
    var rivitTeksti = [T.hei, ''].concat(h.rivit.length ? [T.pyydan, ''] : []);
    [['kk', T.kuukausittain], ['kerta', T.kertaluonteiset]].forEach(function (ryhma) {
      var omat = h.rivit.filter(function (x) { return x.ryhma === ryhma[0]; });
      if (!omat.length) return;
      rivitTeksti.push(ryhma[1] + ':');
      omat.forEach(function (x) {
        rivitTeksti.push('- ' + x.nimi + (x.tiedot ? ', ' + x.tiedot : '') + ': ' + V.teksti(x.sentit, ryhma[0] === 'kk' ? T.kk : ''));
      });
      rivitTeksti.push('');
    });
    if (h.rivit.length) {
      rivitTeksti.push(T.arvio);
      if (h.summa.kk) rivitTeksti.push('- ' + T.kuukausittain + ', ' + summaTeksti(h.summa.kk, T.kk, '; '));
      if (h.summa.kerta) rivitTeksti.push('- ' + T.kertaluonteiset + ', ' + summaTeksti(h.summa.kerta, '', '; '));
      rivitTeksti.push(T.eiSitova);
      if (V.valuutta() === 'usd') rivitTeksti.push(T.usd);
      rivitTeksti.push('');
    }
    if (lomake.querySelector('[name="naytteet"]').checked) {
      rivitTeksti.push(T.naytteet);
      rivitTeksti.push(T.hyvaksyn + SIVUSTO + T.ehdot);
      rivitTeksti.push('');
    }
    ['nimi', 'yritys', 'ytunnus', 'sahkoposti', 'linkki'].forEach(function (k) {
      var arvo = kentta(k);
      if (arvo) rivitTeksti.push(T.kentat[k] + ': ' + arvo);
    });
    var vapaa = kentta('viesti');
    if (vapaa) rivitTeksti.push('', T.kentat.viesti + ':', vapaa);
    return rivitTeksti.join('\n').replace(/\u00a0/g, ' ');
  }
  function mailto(h) {
    var aihe = T.aihe(kentta('yritys') || kentta('nimi'));
    return 'mailto:' + OSOITE + '?subject=' + encodeURIComponent(aihe) + '&body=' + encodeURIComponent(viesti(h));
  }

  // Valinnat URL-parametreiksi (kielilinkki vie samat valinnat toiselle kielelle). Ei henkilötietoja.
  function parametrit() {
    var osat = [];
    lomake.querySelectorAll('[data-palvelu]').forEach(function (r) {
      var avain = r.getAttribute('data-palvelu');
      if (!ruutu(r).checked) return;
      var s = kokoValinta(r), q = r.querySelector('[data-maara]');
      osat.push(avain + '=' + (s ? s.value : q ? maara(r) : 1));
      if (avain === 'klippaamo' && apuKaytossa) osat.push('videot=' + apuArvo('videot'), 'per=' + apuArvo('per'));
      if (avain === 'tilinhoito') {
        osat.push('alustat=' + Array.prototype.filter.call(r.querySelectorAll('[data-alusta]'), function (c) { return c.checked; })
          .map(function (c) { return c.getAttribute('data-alusta'); }).join(','));
      }
    });
    if (lomake.querySelector('[name="naytteet"]').checked) osat.push('naytteet=1');
    if (V.valuutta() === 'usd') osat.push('currency=usd');
    return osat.length ? '?' + osat.join('&') : '';
  }

  function paivita(ilmoita) {
    var h = laske();
    piirraRivihinnat(h);
    piirraYhteenveto(h, ilmoita === true);
    var url = mailto(h);
    lomake.setAttribute('data-mailto', url);
    if (pitkaEl) pitkaEl.hidden = url.length <= PITKA_MAILTO;
    // Virheilmoitus pois heti, kun jokin palvelu tai näytteet on valittu.
    if (virheEl && (h.rivit.length || lomake.querySelector('[name="naytteet"]').checked)) virheEl.textContent = '';
    var haku = parametrit();
    document.querySelectorAll('[data-tarjous-kielilinkki]').forEach(function (a) {
      if (!a.hasAttribute('data-pohja')) a.setAttribute('data-pohja', a.getAttribute('href'));
      a.setAttribute('href', a.getAttribute('data-pohja') + haku);
    });
    // Valinnat sivun osoitteeseen (ei henkilötietoja), jotta Takaisin-napilla palatessa esitäyttö palauttaa ne.
    if (window.history && window.history.replaceState) {
      try {
        var uusi = window.location.pathname + haku + window.location.hash;
        if (uusi !== window.location.pathname + window.location.search + window.location.hash) {
          window.history.replaceState(window.history.state, '', uusi);
        }
      } catch (e) { /* osoitetta ei voi päivittää: lomake toimii silti */ }
    }
    return h;
  }

  // Klippaamon apuvalinnat siirtävät paketin pienimpään riittävään kokoon (kuten etusivulla).
  function apuMuuttui() {
    var r = rivi('klippaamo');
    var t = apuArvo('videot') * apuArvo('per');
    var s = kokoValinta(r);
    var koot = Array.prototype.map.call(s.options, function (o) { return Number(o.value); });
    var valinta = koot[koot.length - 1];
    for (var i = 0; i < koot.length; i++) { if (koot[i] >= t) { valinta = koot[i]; break; } }
    s.value = String(valinta);
    apuKaytossa = true;
  }

  // Etusivulta tulleet valinnat: ?klippaamo=12&videot=4&per=3&kertaera=8&tilinhoito=20&alustat=tiktok,shorts …
  function esitayta() {
    var p;
    try { p = new URLSearchParams(window.location.search); } catch (e) { return; }
    lomake.querySelectorAll('[data-palvelu]').forEach(function (r) {
      var avain = r.getAttribute('data-palvelu');
      if (!p.has(avain)) return;
      var arvo = p.get(avain);
      var s = kokoValinta(r), q = r.querySelector('[data-maara]');
      if (s) {
        if (!Array.prototype.some.call(s.options, function (o) { return o.value === arvo; })) return;
        s.value = arvo;
      } else if (q) {
        var n = Math.floor(Number(arvo));
        if (n >= 1 && n <= 999) q.value = String(n);
      }
      ruutu(r).checked = true;
      if (avain === 'tilinhoito' && p.has('alustat')) {
        var koodit = p.get('alustat').split(',');
        r.querySelectorAll('[data-alusta]').forEach(function (c) { c.checked = koodit.indexOf(c.getAttribute('data-alusta')) >= 0; });
        if (!alustat(r).length) r.querySelectorAll('[data-alusta]').forEach(function (c) { c.checked = true; });
      }
    });
    var k = rivi('klippaamo');
    ['videot', 'per'].forEach(function (nimiArvo) {
      var s = k.querySelector('[data-' + nimiArvo + ']');
      var arvo = p.get(nimiArvo);
      if (arvo && Array.prototype.some.call(s.options, function (o) { return o.value === arvo; })) {
        s.value = arvo;
        apuKaytossa = true;
      }
    });
    if (p.get('naytteet') === '1') lomake.querySelector('[name="naytteet"]').checked = true;
  }

  // Muutokset: palvelun asetuksen muuttaminen valitsee palvelun.
  lomake.addEventListener('change', function (e) {
    var el = e.target;
    var r = el.closest('[data-palvelu]');
    // Määräkenttä: arvo normalisoidaan kenttään (kokonaisluku 1–999), jotta kenttä ja laskelma täsmäävät.
    if (r && el.hasAttribute('data-maara')) el.value = String(maara(r));
    if (r && !el.hasAttribute('data-valittu')) {
      if (el.hasAttribute('data-videot') || el.hasAttribute('data-per')) apuMuuttui();
      else if (el.hasAttribute('data-koko') && r.getAttribute('data-palvelu') === 'klippaamo') apuKaytossa = false;
      ruutu(r).checked = true;
    }
    paivita(true);
  });
  lomake.addEventListener('input', function (e) {
    if (e.target.hasAttribute('data-maara')) {
      var r = e.target.closest('[data-palvelu]');
      if (r && e.target.value !== '') ruutu(r).checked = true;
      paivita(true);
    }
  });

  // Lähetys: selaimen oma tarkistus (pakolliset kentät) ensin, sitten mailto.
  var virheEl = lomake.querySelector('[data-tarjous-virhe]');
  lomake.addEventListener('submit', function (e) {
    e.preventDefault();
    var h = paivita();
    virheEl.textContent = '';
    if (!h.rivit.length && !lomake.querySelector('[name="naytteet"]').checked) {
      virheEl.textContent = T.valitseJotain;
      var eka = lomake.querySelector('[data-valittu]');
      if (eka) eka.focus();
      return;
    }
    api.avaa(mailto(h));
  });

  // Kopioi viesti: leikepöytä, ja jos se ei onnistu, viesti näytetään kentässä itse kopioitavaksi.
  var kopioiNappi = lomake.querySelector('[data-kopioi]');
  var kopioTilaEl = lomake.querySelector('[data-kopio-tila]');
  var kopioKenttaEl = lomake.querySelector('[data-kopio-kentta]');
  function naytaKentassa(teksti) {
    kopioKenttaEl.value = teksti;
    kopioKenttaEl.hidden = false;
    kopioKenttaEl.focus();
    kopioKenttaEl.select();
  }
  if (kopioiNappi) {
    kopioiNappi.addEventListener('click', function () {
      var teksti = T.vastaanottaja + OSOITE + '\n' + T.aiheOtsikko + T.aihe(kentta('yritys') || kentta('nimi')) + '\n\n' + viesti(paivita());
      var onnistui = function () { kopioTilaEl.textContent = T.kopioitu; kopioKenttaEl.hidden = true; };
      var epaonnistui = function () { kopioTilaEl.textContent = T.eiKopioitu; naytaKentassa(teksti); };
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(teksti).then(onnistui, epaonnistui);
        else epaonnistui();
      } catch (err) { epaonnistui(); }
    });
  }

  // Mobiilin hintapalkki piilotetaan, kun yhteenveto näkyy ruudulla.
  var yhteenvetoEl = lomake.querySelector('[data-yhteenveto]');
  if (palkkiEl && yhteenvetoEl && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (h) { palkkiEl.classList.toggle('piiloon', h[0].isIntersecting); }).observe(yhteenvetoEl);
  }

  // Ilman JavaScriptiä näkyvä ohje piiloon, lomakkeen toiminnalliset osat esiin.
  document.querySelectorAll('[data-ilman-js]').forEach(function (el) { el.hidden = true; });
  document.querySelectorAll('[data-vain-js]').forEach(function (el) { el.hidden = false; });

  // Rivin hinta luetaan ruudunlukijalla valintaruudun kuvauksena (aria-describedby).
  lomake.querySelectorAll('[data-palvelu]').forEach(function (r) {
    var hintaEl = r.querySelector('[data-rivihinta]');
    if (!hintaEl) return;
    if (!hintaEl.id) hintaEl.id = 'hinta-' + r.getAttribute('data-palvelu');
    ruutu(r).setAttribute('aria-describedby', hintaEl.id);
  });

  var api = window.PystyTarjous = {
    avaa: function (url) { window.location.href = url; },
    mailto: function () { return mailto(laske()); },
    viesti: function () { return viesti(laske()); },
    laske: laske
  };

  esitayta();
  paivita();
  V.kun(paivita);
  // Takaisin-napilla palattaessa (myös selaimen välimuistista) yhteenveto, hinnat ja osoite piirretään uudelleen.
  window.addEventListener('pageshow', function () { paivita(); });
})();
