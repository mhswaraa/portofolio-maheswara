document.addEventListener('DOMContentLoaded', function() {
  // Pastikan elemen #typed-output ada sebelum menjalankan
  if (document.getElementById('typed-output')) {
    var options = {
      strings: [
        "Halo, saya Maheswara.",
        "Seorang Web Developer.",
        "Mahasiswa Sistem Informasi."
      ],
      typeSpeed: 50,  // Kecepatan mengetik
      backSpeed: 30,  // Kecepatan menghapus
      backDelay: 2000, // Waktu tunggu sebelum menghapus
      startDelay: 500, // Waktu tunggu sebelum mulai
      loop: true      // Mengulang animasi
    };
  
    var typed = new Typed('#typed-output', options);
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const navBackground = document.getElementById('nav-background');
    const navMenuButton = document.getElementById('nav-menu-button');
    const navUl = document.querySelector('.nav-ul');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    // =================================================
    // 1. EFEK SCROLL UNTUK NAVIGASI DESKTOP
    // =================================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navBackground.classList.add('scrolled');
        } else {
            navBackground.classList.remove('scrolled');
        }
    });

    // =================================================
    // 2. FUNGSIONALITAS MENU MOBILE (DIPERBAIKI)
    // =================================================
    // Logika toggle yang lebih sederhana dan andal
    navMenuButton.addEventListener('click', () => {
        navMenuButton.classList.toggle('active');
        navUl.classList.toggle('hide-ul'); // Cukup toggle class ini
    });

    // =================================================
    // 3. FUNGSI KLIK & SMOOTH SCROLL
    // =================================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link melompat secara default
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Smooth scroll ke section yang dituju
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset 70px agar tidak tertutup header
                    behavior: 'smooth'
                });
            }

            // Sembunyikan menu setelah link di-klik (di mobile)
            if (window.innerWidth <= 768) {
                navMenuButton.classList.remove('active');
                navUl.classList.add('hide-ul');
            }
        });
    });

    // =================================================
    // 4. ANIMASI "BUBBLE" UNTUK NAVIGASI DESKTOP
    // =================================================
    if (window.innerWidth > 768) {
        const bubble = document.createElement('li');
        bubble.classList.add('bubble');
        navUl.prepend(bubble);

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

        const initialActiveLink = document.querySelector('.nav-link.active-link') || navLinks[0];
        updateActiveLink(initialActiveLink);

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                positionBubble(e.target);
            });
        });

        navUl.addEventListener('mouseleave', () => {
            const activeLink = document.querySelector('.nav-link.active-link');
            positionBubble(activeLink);
        });

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
});
