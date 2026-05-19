/* preview/_theme.js
   Shared theme toggle for all DS preview cards.
   Include with <script src="_theme.js"></script> before </body>.
   Persists to localStorage('ds-theme').
   Responds to postMessage({ theme: 'dark'|'light' }) from parent (index.html).
*/
(function () {
  /* ── 1. Apply saved theme immediately (before paint) ── */
  var saved = localStorage.getItem('ds-theme');
  if (saved === 'dark') document.documentElement.classList.add('dark');

  /* ── 2. Listen for theme sync from parent index ── */
  window.addEventListener('message', function (e) {
    if (e.data && e.data.theme) {
      var dark = e.data.theme === 'dark';
      document.documentElement.classList.toggle('dark', dark);
      localStorage.setItem('ds-theme', dark ? 'dark' : 'light');
      updateIcon();
    }
  });

  /* ── 3. Inject toggle button after DOM ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.id = 'ds-theme-toggle';
    btn.title = 'Toggle light / dark';
    btn.setAttribute('aria-label', 'Toggle theme');

    var moonSVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    var sunSVG  = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

    function updateIcon() {
      btn.innerHTML = document.documentElement.classList.contains('dark') ? sunSVG : moonSVG;
    }
    updateIcon();

    btn.addEventListener('click', function () {
      var isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('ds-theme', isDark ? 'dark' : 'light');
      updateIcon();
    });

    Object.assign(btn.style, {
      position:        'fixed',
      bottom:          '10px',
      right:           '10px',
      width:           '34px',
      height:          '34px',
      borderRadius:    '9999px',
      background:      'linear-gradient(135deg,rgba(181,255,0,.20),rgba(255,122,0,.10),rgba(105,0,255,.05))',
      backdropFilter:  'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border:          '1px solid rgba(181,255,0,.30)',
      color:           'var(--fg-1, #6900FF)',
      cursor:          'pointer',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      zIndex:          '9999',
      transition:      'all .25s ease',
      boxShadow:       '0 2px 8px rgba(105,0,255,.12)',
    });

    document.body.appendChild(btn);
  });
})();
