document.addEventListener('DOMContentLoaded', () => {
  const projectLinks = document.querySelectorAll('.links-projeto a');
  const toast = document.getElementById('toast');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.getElementById('theme-toggle');

  // Gerenciamento do modo escuro / claro
  const applyTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Ativar modo claro');
        themeToggle.setAttribute('title', 'Ativar modo claro');
      }
    } else {
      document.body.classList.remove('dark-mode');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
        themeToggle.setAttribute('title', 'Ativar modo escuro');
      }
    }
  };

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  applyTheme(initialIsDark);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-mode');
      const newTheme = !isCurrentlyDark;
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    });
  }

  const isValidProjectLink = (href) => {
    if (!href) return false;

    const value = href.trim();

    if (!value || value === '#' || value === 'javascript:void(0)') {
      return false;
    }

    if (value.toLowerCase().includes('ainda vai ter') || value.toLowerCase().includes('em desenvolvimento')) {
      return false;
    }

    if (value.startsWith('#')) {
      return Boolean(document.querySelector(value));
    }

    try {
      const url = new URL(value, window.location.href);
      return Boolean(url.href) && url.origin !== 'null';
    } catch (error) {
      return false;
    }
  };

  const showToast = () => {
    if (!toast) return;

    toast.classList.add('show');
    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  };

  if (menuToggle && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    };

    const closeMenu = () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
      }
    };

    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) {
        closeMenu();
      }
    });
  }

  projectLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!isValidProjectLink(link.getAttribute('href'))) {
        event.preventDefault();
        showToast();
      }
    });
  });
});
