(function () {
  'use strict';

  var VIEWS = {
    front:  'front view',
    back:   'back view',
    detail: 'close-up of the detail',
    sketch: 'Obosa’s original sketch'
  };

  function imagePath(look, view) {
    return 'images/look-' + look.id + '-' + view + '.jpg';
  }

  function lookUrl(look) {
    return 'look.html?id=' + encodeURIComponent(look.id);
  }

  /* Builds one card from the <template id="look-card-template"> on the page */
  function makeLookCard(look) {
    var template = document.getElementById('look-card-template');
    var card = template.content.firstElementChild.cloneNode(true);
    var image = card.querySelector('.look-card__image');

    card.querySelector('.look-card').href = lookUrl(look);
    image.src = imagePath(look, 'front');
    image.alt = look.name + ' from the Las Gidi Collection';
    card.querySelector('.look-card__name').textContent = look.name;
    card.querySelector('.look-card__price').textContent = look.price;

    return card;
  }

  function fillGrid(grid, looks) {
    looks.forEach(function (look) {
      grid.appendChild(makeLookCard(look));
    });
  }


  /* ---------- Collection page ---------- */

  var collectionGrid = document.querySelector('[data-collection-grid]');

  if (collectionGrid) {
    fillGrid(collectionGrid, LOOKS);

    var count = document.querySelector('[data-look-count]');
    if (count) {
      count.textContent = LOOKS.length + (LOOKS.length === 1 ? ' Look' : ' Looks');
    }
  }


  /* ---------- Look page (look.html?id=01) ---------- */

  var lookPage = document.querySelector('[data-look-page]');

  if (lookPage) {
    var id = new URLSearchParams(window.location.search).get('id');
    var look = LOOKS.find(function (item) { return item.id === id; });

    if (!look) {
      document.querySelector('[data-look-content]').hidden = true;
      document.querySelector('[data-more]').hidden = true;
      document.querySelector('[data-look-not-found]').hidden = false;
      return;
    }

    document.title = look.name + ', Las Gidi Collection — Ifueko';

    // Text
    lookPage.querySelectorAll('[data-field]').forEach(function (element) {
      element.textContent = look[element.getAttribute('data-field')] || '';
    });

    // Gallery
    var main = lookPage.querySelector('[data-gallery-main]');
    var thumbs = lookPage.querySelectorAll('[data-view]');

    function showView(view) {
      main.src = imagePath(look, view);
      main.alt = look.name + ', ' + VIEWS[view];
      thumbs.forEach(function (thumb) {
        thumb.setAttribute('aria-pressed', thumb.getAttribute('data-view') === view ? 'true' : 'false');
      });
    }

    thumbs.forEach(function (thumb) {
      var view = thumb.getAttribute('data-view');
      thumb.querySelector('img').src = imagePath(look, view);
      thumb.addEventListener('click', function () { showView(view); });
    });

    showView('front');

    // "More from Las Gidi": the next three looks in the list
    var others = [];
    var start = LOOKS.indexOf(look);
    for (var i = 1; i < LOOKS.length && others.length < 3; i++) {
      others.push(LOOKS[(start + i) % LOOKS.length]);
    }

    if (others.length) {
      fillGrid(document.querySelector('[data-more-grid]'), others);
    } else {
      document.querySelector('[data-more]').hidden = true;
    }
  }
})();