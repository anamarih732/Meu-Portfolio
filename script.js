document.addEventListener('DOMContentLoaded', () => {
  const projectLinks = document.querySelectorAll('.links-projeto a');
  const toast = document.getElementById('toast');

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

  projectLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!isValidProjectLink(link.getAttribute('href'))) {
        event.preventDefault();
        showToast();
      }
    });
  });
});