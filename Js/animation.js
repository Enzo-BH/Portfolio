const toggleBtn = document.getElementById('theme-toggle');
      const body = document.body;
      function setTheme(theme) {
        body.classList.remove('light', 'dark');
        body.classList.add(theme);
        toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
      // Au chargement, appliquer le thème stocké
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      toggleBtn.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      });
    


  //reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  function handleReveal() {
    for (const el of reveals) {
      const rect = el.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.99;
      const bottomLimit = -100;
      if (rect.top < triggerPoint ) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    }
  }
  window.addEventListener('scroll', handleReveal);
  window.addEventListener('load', handleReveal);