/* ==========================================================================
   Ifueko — look page gallery
   Clicking a thumbnail (Front, Back, Detail, Sketch) swaps the large image.
   ========================================================================== */

document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
  var main = gallery.querySelector('.gallery__main');
  var thumbs = gallery.querySelectorAll('.gallery__thumb');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      main.src = thumb.getAttribute('data-src');
      main.alt = thumb.getAttribute('data-alt');

      thumbs.forEach(function (other) {
        other.setAttribute('aria-pressed', other === thumb ? 'true' : 'false');
      });
    });
  });
});