document.addEventListener('DOMContentLoaded', function() {
  
  // =================================================
  // 1. EFEK KETIK (TYPED.JS)
  // =================================================
  if (document.getElementById('typed-output')) {
    var options = {
      strings: [
        "Maheswara",
        "Seorang Koordinator Administrasi.",
        "Seorang Web Developer."
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true
    };
    new Typed('#typed-output', options);
  }

  // =================================================
  // 2. PENGELOLAAN NAVIGASI (SCROLL, KLIK, MOBILE)
  // =================================================
  const navBackground = document.getElementById('nav-background');
  const navMenuButton = document.getElementById('nav-menu-button');
  const navUl = document.querySelector('.nav-ul');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  // Efek scroll untuk navigasi desktop
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      if(navBackground) navBackground.classList.add('scrolled');
    } else {
      if(navBackground) navBackground.classList.remove('scrolled');
    }
  });

  // Fungsionalitas menu mobile
  if (navMenuButton && navUl) { // Pastikan kedua elemen ada
      navMenuButton.addEventListener('click', () => {
          navMenuButton.classList.toggle('active');
          navUl.classList.toggle('hide-ul');
      });
  }

  // Fungsi klik & smooth scroll untuk semua link navigasi
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Offset 70px agar tidak tertutup header
          behavior: 'smooth'
        });
      }

      // Sembunyikan menu setelah link di-klik (di mobile)
      if (window.innerWidth <= 768 && navMenuButton.classList.contains('active')) {
        navMenuButton.classList.remove('active');
        navUl.classList.add('hide-ul');
      }
    });
  });

  // =================================================
  // 3. ANIMASI "BUBBLE" & ACTIVE LINK NAVIGASI DESKTOP
  // =================================================
  if (window.innerWidth > 768) {
    const bubble = document.createElement('li');
    bubble.classList.add('bubble');
    if (navUl) navUl.prepend(bubble);

    function positionBubble(target) {
      if (target) {
        bubble.style.width = `${target.offsetWidth}px`;
        bubble.style.height = `${target.offsetHeight}px`;
        bubble.style.left = `${target.offsetLeft}px`;
      }
    }

    function updateActiveLink(target) {
      if (target) {
        navLinks.forEach(l => l.classList.remove('active-link'));
        target.classList.add('active-link');
        positionBubble(target);
      }
    }

    // Inisialisasi bubble pada link pertama atau yang aktif
    const initialActiveLink = document.querySelector('.nav-link.active-link') || navLinks[0];
    updateActiveLink(initialActiveLink);

    // Pindahkan bubble saat mouse hover
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        positionBubble(e.target);
      });
    });

    // Kembalikan bubble ke link yang aktif saat mouse keluar dari navigasi
    if (navUl) {
        navUl.addEventListener('mouseleave', () => {
            const activeLink = document.querySelector('.nav-link.active-link');
            positionBubble(activeLink);
        });
    }

    // Update link aktif saat scroll
    window.addEventListener('scroll', () => {
      let current = 'home';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 70) {
          current = section.getAttribute('id');
        }
      });

      const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
      if (activeLink && !activeLink.classList.contains('active-link')) {
        updateActiveLink(activeLink);
      }
    });
  }

  // =================================================
// 4. ANIMASI SAAT SCROLL (INTERSECTION OBSERVER)
// =================================================
const contactSection = document.querySelector('.contact-container');

if (contactSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactSection.classList.add('is-visible');
        observer.unobserve(entry.target); // Hentikan observasi setelah animasi berjalan
      }
    });
  }, {
    threshold: 0.1 // Picu animasi saat 10% section terlihat
  });

  observer.observe(contactSection);
}
});