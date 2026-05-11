(function () {
  const pages = [
    ['index.html', 'Login'],
    ['Home.html', 'Home'],
    ['resources.html', 'Resources'],
    ['upload.html', 'Upload'],
    ['profile.html', 'Profile'],
    ['events.html', 'Events'],
    ['gallery.html', 'Gallery'],
    ['notifications.html', 'Notifications'],
    ['assignments.html', 'Assignments'],
    ['students-hub.html', 'Students Hub'],
    ['lecturers-hub.html', 'Lecturers Hub'],
    ['online-test.html', 'Online Test'],
    ['attendance.html', 'Attendance'],
    ['parents.html', 'Parents'],
    ['ai-chat.html', 'AI Chat'],
    ['about.html', 'About'],
    ['admin.html', 'Admin']
  ];

  const aliases = new Map([
    ['home.html', 'Home.html'],
    ['campushub.html', 'Home.html'],
    ['studentshub.html', 'students-hub.html'],
    ['lecturershub.html', 'lecturers-hub.html'],
    ['onlinetest.html', 'online-test.html'],
    ['onlinetests.html', 'online-test.html'],
    ['online-tests.html', 'online-test.html'],
    ['aichat.html', 'ai-chat.html'],
    ['parentsview.html', 'parents.html']
  ]);

  function currentFile() {
    const file = (window.location.pathname.split('/').pop() || 'index.html');
    return aliases.get(file.toLowerCase()) || file;
  }

  function buildNavbar() {
    const nav = document.createElement('nav');
    nav.className = 'site-navbar';
    nav.setAttribute('aria-label', 'Main site navigation');

    const active = currentFile().toLowerCase();
    const links = pages.map(([href, label]) => {
      const isActive = href.toLowerCase() === active ? ' is-active' : '';
      return `<a class="site-navbar__link${isActive}" href="${href}">${label}</a>`;
    }).join('');

    nav.innerHTML = `
      <div class="site-navbar__inner">
        <a class="site-navbar__brand" href="Home.html" aria-label="Sri Aurobindo College BCA Home">
          <span class="site-navbar__logo">BCA</span>
          <span class="site-navbar__title"><strong>Sri Aurobindo</strong><span>BCA Department</span></span>
        </a>
        <button class="site-navbar__toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
        <div class="site-navbar__links">${links}</div>
      </div>`;

    const toggle = nav.querySelector('.site-navbar__toggle');
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    return nav;
  }

  function fixKnownLinks() {
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const raw = anchor.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.includes('://') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      const clean = raw.split('#')[0].split('?')[0].toLowerCase();
      const replacement = aliases.get(clean);
      if (replacement) anchor.setAttribute('href', raw.replace(raw.split('#')[0].split('?')[0], replacement));
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    fixKnownLinks();
    document.body.classList.add('has-site-nav');
    document.body.insertBefore(buildNavbar(), document.body.firstChild);
  });
}());

