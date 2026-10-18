/* Comportements partagés des cinq pages. Les réglages restent dans infos.js. */
(function () {
  'use strict';
  // Numéro de version affiché en pied de page : à changer à chaque mise à jour.
  var VERSION = 'Version 2.7';
  document.querySelectorAll('[data-version]').forEach(function (node) { node.textContent = VERSION; });
  var info = typeof INFOS === 'undefined' ? {} : INFOS;
  function element(id) { return document.getElementById(id); }
  function text(id, value) { var node = element(id); if (node && value) node.textContent = value; }
  function visible(id, show) { var node = element(id); if (node) node.hidden = !show; }
  function fill(name, value) {
    if (!value) return;
    document.querySelectorAll('[data-info="' + name + '"]').forEach(function (node) { node.textContent = value; });
  }
  function safeUrl(value) {
    try { var url = new URL(value); return /^https?:$/.test(url.protocol) ? url.href : ''; }
    catch (_) { return ''; }
  }
  var bookingUrl = safeUrl(info.lienBilletterie);
  var bookingOpen = info.billetterieOuverte === true && Boolean(bookingUrl);
  document.querySelectorAll('[data-booking-open]').forEach(function (node) { node.hidden = !bookingOpen; });
  document.querySelectorAll('[data-booking-closed]').forEach(function (node) { node.hidden = bookingOpen; });
  document.querySelectorAll('[data-booking]').forEach(function (link) {
    link.href = bookingOpen ? '/reserver/' : '/infos-pratiques/#billetterie';
    link.textContent = bookingOpen ? (link.dataset.openLabel || 'Réserver ma place') + ' ↗' : 'Billetterie bientôt';
    link.classList.toggle('dp-closed', !bookingOpen);
  });
  fill('heure', info.heure);
  fill('portes', info.ouverturePortes);
  if (info.heure) {
    var schedule = 'Samedi 5 juin 2027, ' + info.heure + '.';
    if (info.ouverturePortes) schedule += ' Ouverture des portes à ' + info.ouverturePortes + '.';
    text('i-horaire', schedule);
  }
  if (Array.isArray(info.tarifs) && info.tarifs.length) {
    fill('tarif', info.tarifs[0].prix);
    var second = info.tarifs[1];
    var secondLabel = second ? (/gratuit/i.test(second.prix) ? second.prix + ' pour les ' + second.nom.toLowerCase() : second.nom + ' : ' + second.prix) : '';
    document.querySelectorAll('[data-info="tarif-second"]').forEach(function (node) { node.textContent = secondLabel; node.hidden = !secondLabel; });
    text('i-tarifs', info.tarifs.map(function (tarif) { return tarif.nom + ' : ' + tarif.prix; }).join(' · '));
    visible('i-bloc-tarifs', true);
  }
  text('i-accessibilite', info.accessibilite);
  text('i-stationnement', info.stationnement);
  if (info.repasPrix) text('i-repas', info.repasPrix + ' par personne. Règlement sur place, carte bancaire acceptée.');
  var programme = element('i-programme');
  if (programme && Array.isArray(info.programme) && info.programme.length) {
    info.programme.forEach(function (piece) { var li = document.createElement('li'); li.textContent = piece; programme.appendChild(li); });
    programme.hidden = false; visible('i-programme-todo', false);
  }
  if (info.programmeIntro) { text('i-programme-intro', info.programmeIntro); visible('i-programme-intro', true); }

  // Les coordonnées restent masquées jusqu'au clic du visiteur.
  function decode(value) { try { return decodeURIComponent(escape(atob(value))); } catch (_) { return ''; } }
  function contactRow(label, code, prefix, mask) {
    var row = document.createElement('div'); row.className = 'masque';
    var name = document.createElement('span'); name.className = 'masque-nom'; name.textContent = label;
    var value = document.createElement('span'); value.className = 'masque-valeur'; value.textContent = mask;
    var button = document.createElement('button'); button.type = 'button'; button.className = 'oeil';
    button.textContent = 'Afficher'; button.setAttribute('aria-label', 'Afficher : ' + label.toLowerCase()); button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', function () {
      var shown = button.getAttribute('aria-pressed') !== 'true'; var decoded = shown ? decode(code) : '';
      if (shown && decoded) {
        var link = document.createElement('a'); link.textContent = decoded;
        link.href = prefix + (prefix === 'tel:' ? decoded.replace(/[^0-9+]/g, '') : decoded);
        value.replaceChildren(link);
      } else { value.textContent = mask; shown = false; }
      button.textContent = shown ? 'Masquer' : 'Afficher';
      button.setAttribute('aria-label', (shown ? 'Masquer : ' : 'Afficher : ') + label.toLowerCase());
      button.setAttribute('aria-pressed', String(shown));
    });
    row.append(name, value, button); return row;
  }
  // Adresse écrite en clair à l'écran, mais absente du code source lisible par les robots.
  document.querySelectorAll('[data-mail]').forEach(function (link) {
    var mail = decode(link.dataset.mail); if (mail) { link.href = 'mailto:' + mail; link.textContent = mail; }
  });
  var contacts = element('i-contact');
  if (contacts) {
    if (info.email) contacts.appendChild(contactRow('Mail', info.email, 'mailto:', '••••••••••@•••••••.••'));
    (info.telephones || []).forEach(function (phone, index) { contacts.appendChild(contactRow(index === 0 ? 'Portable' : 'Fixe', phone, 'tel:', '•• •• •• •• ••')); });
    var facebook = safeUrl(info.facebook);
    if (facebook) { var link = document.createElement('a'); link.href = facebook; link.rel = 'noopener'; link.textContent = 'Notre page Facebook'; contacts.appendChild(link); }
    visible('bloc-contact', contacts.childElementCount > 0); visible('bloc-contact-vide', contacts.childElementCount === 0);
  }
  var parkings = element('i-parkings');
  if (parkings && Array.isArray(info.parkings) && info.parkings.length) {
    info.parkings.forEach(function (parking) {
      var li = document.createElement('li'); var name = document.createElement('span'); var detail = document.createElement('span');
      name.textContent = parking.nom; detail.className = 'detail'; detail.textContent = parking.detail || ''; li.append(name, detail); parkings.appendChild(li);
    });
    parkings.hidden = false; visible('i-parkings-vide', false);
  }
  var hotels = element('i-hebergements');
  if (hotels && Array.isArray(info.hebergements) && info.hebergements.length) {
    var groups = new Map();
    info.hebergements.forEach(function (hotel) { var category = hotel.categorie || 'À proximité'; if (!groups.has(category)) groups.set(category, []); groups.get(category).push(hotel); });
    groups.forEach(function (entries, category) {
      var group = document.createElement('div'); var title = document.createElement('h4'); title.textContent = category;
      var ul = document.createElement('ul'); ul.className = 'liste-lieux';
      entries.forEach(function (hotel) {
        var li = document.createElement('li'); var url = safeUrl(hotel.lien); var name = document.createElement(url ? 'a' : 'span'); name.textContent = hotel.nom;
        if (url) { name.href = url; name.target = '_blank'; name.rel = 'noopener'; }
        var town = document.createElement('span'); town.className = 'detail'; town.textContent = hotel.ville || ''; li.append(name, town); ul.appendChild(li);
      });
      group.append(title, ul); hotels.appendChild(group);
    });
    hotels.hidden = false; visible('i-hebergements-vide', false);
  }
  var partners = element('i-partenaires');
  if (partners && Array.isArray(info.partenaires) && info.partenaires.length) {
    info.partenaires.forEach(function (partner) { var li = document.createElement('li'); li.textContent = partner; partners.appendChild(li); }); visible('partenaires', true);
  }


  // Menu mobile : bouton trois traits et panneau plein écran, construits à partir des onglets.
  var nav = document.querySelector('.dp-nav'); var mast = document.querySelector('.dp-masthead');
  if (nav && mast) {
    var burger = document.createElement('button'); burger.type = 'button'; burger.className = 'dp-burger';
    burger.setAttribute('aria-label', 'Ouvrir le menu'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-controls', 'dp-menu');
    burger.innerHTML = '<span></span><span></span><span></span>';
    mast.appendChild(burger);
    var panel = document.createElement('div'); panel.id = 'dp-menu'; panel.className = 'dp-menu'; panel.hidden = true;
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', 'Menu');
    var close = document.createElement('button'); close.type = 'button'; close.className = 'dp-menu-close'; close.setAttribute('aria-label', 'Fermer le menu'); close.textContent = '×';
    var list = document.createElement('nav'); list.className = 'dp-menu-links'; list.setAttribute('aria-label', 'Rubriques du site');
    nav.querySelectorAll('a').forEach(function (a) { var c = a.cloneNode(true); c.removeAttribute('class'); list.appendChild(c); });
    var when = document.createElement('div'); when.className = 'dp-menu-when';
    when.innerHTML = '<strong>Samedi 5 juin 2027 · ' + (info.heure || '20 h 30') + '</strong><span>Église de la Madeleine, Mont-de-Marsan</span>';
    var ticket = document.createElement('a'); ticket.className = 'dp-menu-ticket';
    ticket.href = bookingOpen ? '/reserver/' : '/infos-pratiques/#billetterie';
    ticket.textContent = bookingOpen ? 'Réserver ma place ↗' : 'Billetterie bientôt ouverte';
    if (!bookingOpen) ticket.classList.add('dp-closed');
    panel.append(close, list, when, ticket); document.body.appendChild(panel);
    function openMenu(open) {
      panel.hidden = !open; burger.setAttribute('aria-expanded', String(open)); document.body.style.overflow = open ? 'hidden' : '';
      (open ? close : burger).focus();
    }
    burger.addEventListener('click', function () { openMenu(true); });
    close.addEventListener('click', function () { openMenu(false); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) openMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) openMenu(false); });
  }

  // Lecteurs et plan créés uniquement après un clic, comme avant la refonte.
  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('.video-lancer');
    if (button) {
      if (!/^[\w-]{11}$/.test(button.dataset.video || '')) return;
      var frame = document.createElement('iframe'); frame.src = 'https://www.youtube-nocookie.com/embed/' + button.dataset.video + '?autoplay=1&rel=0';
      frame.title = button.getAttribute('aria-label') || 'Vidéo du Débuché de Paris'; frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'; frame.allowFullscreen = true;
      button.replaceWith(frame); return;
    }
    if (event.target.id === 'voir-plan') {
      var map = document.createElement('iframe'); map.src = 'https://www.google.com/maps?q=' + encodeURIComponent('Église de la Madeleine, 35 rue Victor-Hugo, 40000 Mont-de-Marsan') + '&output=embed';
      map.title = 'Plan d’accès à l’église de la Madeleine'; map.loading = 'lazy'; map.referrerPolicy = 'no-referrer-when-downgrade'; event.target.replaceWith(map);
    }
  });
  var dialog = element('photo-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    var enlarged = dialog.querySelector('img'); var trigger;
    document.querySelectorAll('figure:not(.video) img').forEach(function (photo) {
      if (photo.closest('a, button')) return;
      var button = document.createElement('button'); button.type = 'button'; button.className = 'photo-button'; button.setAttribute('aria-label', 'Agrandir : ' + photo.alt);
      photo.before(button); button.appendChild(photo);
      button.addEventListener('click', function () { trigger = button; enlarged.src = photo.currentSrc || photo.src; enlarged.alt = photo.alt; dialog.showModal(); });
    });
    dialog.querySelector('[data-close-photo]').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { enlarged.removeAttribute('src'); if (trigger) trigger.focus(); });
  }
  // Préserve les anciens liens directs vers une rubrique de la page unique.
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    var legacy = { concert: '/le-debuche-de-paris/#concert', centenaire: '/le-debuche-de-paris/#centenaire', trompe: '/la-trompe/#trompe', fitf: '/la-trompe/#fitf', unesco: '/la-trompe/#unesco', ecole: '/ecole-de-beaussiet/#ecole', infos: '/infos-pratiques/#infos', apres: '/infos-pratiques/#apres', sejour: '/infos-pratiques/#sejour', faq: '/infos-pratiques/#faq', eglise: '/#eglise' };
    var destination = legacy[window.location.hash.slice(1)]; if (destination) window.location.replace(destination);
  }
  // Ouvre le volet d'histoire si l'adresse pointe vers une de ses images/sections.
  if (window.location.hash) {
    var target = element(window.location.hash.slice(1));
    if (target) { var parent = target.parentElement; while (parent) { if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement; } target.scrollIntoView(); }
  }
  if (document.body.hasAttribute('data-reservation')) {
    var fallback = element('reservation-link'); if (bookingOpen && fallback) { fallback.href = bookingUrl; window.location.replace(bookingUrl); }
  }
})();
