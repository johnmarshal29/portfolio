/**
 * JOHN MARSHAL G - MODERN PORTFOLIO INTERACTION ENGINE
 * Features: Particle canvas, Typewriter effect, Recruiter portal login,
 * 3D tilt effects, scroll progress, number counters, project modal, theme toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. AMBIENT BACKGROUND PARTICLE CANVAS
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.alpha = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --------------------------------------------------------------------------
  // 2. TYPEWRITER EFFECT
  // --------------------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = [
      'Computer Science Engineer',
      'Full Stack Web Developer',
      'Backend & Spring Boot Engineer',
      'n8n Workflow Automation Specialist',
      'Passionate Software Problem Solver'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRoles() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 2000; // Pause at full text
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400; // Pause before new word
      }

      setTimeout(typeRoles, typingSpeed);
    }
    typeRoles();
  }

  // --------------------------------------------------------------------------
  // 3. SCROLL PROGRESS & NAVBAR SCROLL BEHAVIOR & SCROLL SPY
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPos / docHeight) * 100;

    // Progress Bar
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Scrolled Navbar style
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll Spy: highlight active nav link
    let currentSectionId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. THEME TOGGLE (DARK / LIGHT)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('jm_theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('jm_theme', isLight ? 'light' : 'dark');
      themeToggle.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
      showToast(isLight ? 'Switched to Light Theme' : 'Switched to Cyber Dark Theme', 'info');
    });
  }

  // --------------------------------------------------------------------------
  // 5. MOBILE MENU DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. 3D TILT EFFECT ON AVATAR CARD
  // --------------------------------------------------------------------------
  const profileCard = document.getElementById('profile-card');
  if (profileCard && window.innerWidth > 992) {
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    profileCard.addEventListener('mouseleave', () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // --------------------------------------------------------------------------
  // 7. STATS COUNTER ON SCROLL
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  function runStatsCounter() {
    statNumbers.forEach((stat) => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 1800;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
          clearInterval(timer);
        } else {
          stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }
      }, stepTime);
    });
  }

  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          runStatsCounter();
          counted = true;
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStatsRow = document.querySelector('.hero-stats-row');
  if (heroStatsRow) heroObserver.observe(heroStatsRow);

  // --------------------------------------------------------------------------
  // 8. RECRUITER & CLIENT LOGIN PORTAL
  // --------------------------------------------------------------------------
  const portalModal = document.getElementById('portal-modal');
  const openPortalBtn = document.getElementById('open-portal-btn');
  const footerPortalBtn = document.getElementById('footer-portal-btn');
  const closePortalBtn = document.getElementById('close-portal-btn');
  const portalForm = document.getElementById('portal-form');
  const portalTabs = document.querySelectorAll('.portal-tab');
  const portalEmail = document.getElementById('portal-email');
  const portalPass = document.getElementById('portal-pass');
  const passToggle = document.getElementById('pass-toggle');
  const btnDemoFill = document.getElementById('btn-demo-fill');
  const quickGuestBtn = document.getElementById('quick-guest-btn');
  const portalSubmitBtn = document.getElementById('portal-submit');
  const portalStatusMsg = document.getElementById('portal-status-msg');
  const recruiterBanner = document.getElementById('recruiter-banner');
  const logoutPortalBtn = document.getElementById('logout-portal-btn');

  function openPortal() {
    if (portalModal) portalModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePortal() {
    if (portalModal) portalModal.classList.remove('open');
    document.body.style.overflow = '';
    if (portalStatusMsg) {
      portalStatusMsg.textContent = '';
      portalStatusMsg.className = 'portal-status-message';
    }
  }

  if (openPortalBtn) openPortalBtn.addEventListener('click', openPortal);
  if (footerPortalBtn) footerPortalBtn.addEventListener('click', openPortal);
  if (closePortalBtn) closePortalBtn.addEventListener('click', closePortal);

  // Close on overlay backdrop click
  if (portalModal) {
    portalModal.addEventListener('click', (e) => {
      if (e.target === portalModal) closePortal();
    });
  }

  // Password Visibility Toggle
  if (passToggle && portalPass) {
    passToggle.addEventListener('click', () => {
      const type = portalPass.getAttribute('type') === 'password' ? 'text' : 'password';
      portalPass.setAttribute('type', type);
      passToggle.innerHTML = type === 'password' 
        ? '<i class="fa-solid fa-eye"></i>' 
        : '<i class="fa-solid fa-eye-slash"></i>';
    });
  }

  // Tab Switching inside Portal
  portalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      portalTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const role = tab.getAttribute('data-tab');

      if (role === 'recruiter') {
        portalEmail.value = 'recruiter@techcorp.com';
        portalPass.value = 'talent2026';
      } else if (role === 'client') {
        portalEmail.value = 'client@company.io';
        portalPass.value = 'clientpass';
      } else if (role === 'admin') {
        portalEmail.value = 'admin@johnmarshal.dev';
        portalPass.value = 'devmaster';
      }
    });
  });

  // Demo auto-fill animation
  if (btnDemoFill) {
    btnDemoFill.addEventListener('click', () => {
      portalEmail.value = '';
      portalPass.value = '';
      const emailTarget = 'recruiter@enterprise.com';
      const passTarget = 'hireJohn2026';

      let i = 0;
      const emailInterval = setInterval(() => {
        if (i < emailTarget.length) {
          portalEmail.value += emailTarget[i];
          i++;
        } else {
          clearInterval(emailInterval);
          portalPass.value = passTarget;
          showToast('Credentials filled! Click Authenticate.', 'info');
        }
      }, 35);
    });
  }

  // Quick Guest Login button
  if (quickGuestBtn) {
    quickGuestBtn.addEventListener('click', () => {
      performLogin('Guest Recruiter');
    });
  }

  // Form Submit Authentication
  if (portalForm) {
    portalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = portalEmail.value.trim();
      const role = document.querySelector('.portal-tab.active')?.textContent.trim() || 'Recruiter';

      if (!email) return;

      portalSubmitBtn.classList.add('loading');
      portalStatusMsg.textContent = 'Verifying cryptographic security token...';
      portalStatusMsg.className = 'portal-status-message';

      setTimeout(() => {
        portalSubmitBtn.classList.remove('loading');
        performLogin(role);
      }, 1000);
    });
  }

  function performLogin(role) {
    if (portalStatusMsg) {
      portalStatusMsg.textContent = 'Access Granted! Welcome to the Executive Portal.';
      portalStatusMsg.className = 'portal-status-message success';
    }

    setTimeout(() => {
      closePortal();
      if (recruiterBanner) {
        recruiterBanner.classList.remove('hidden');
        recruiterBanner.scrollIntoView({ behavior: 'smooth' });
      }
      showToast(`Welcome! Authenticated as ${role}. Exclusive contact privileges unlocked.`, 'success');
      localStorage.setItem('jm_portal_auth', 'true');
    }, 600);
  }

  // Logout Portal
  if (logoutPortalBtn) {
    logoutPortalBtn.addEventListener('click', () => {
      if (recruiterBanner) recruiterBanner.classList.add('hidden');
      localStorage.removeItem('jm_portal_auth');
      showToast('Portal session closed.', 'info');
    });
  }

  // Check if session was already active
  if (localStorage.getItem('jm_portal_auth') === 'true' && recruiterBanner) {
    recruiterBanner.classList.remove('hidden');
  }

  // --------------------------------------------------------------------------
  // 9. PROJECTS CATEGORY FILTERING & MODAL OVERLAY
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Project Detail Modal
  const projectModal = document.getElementById('project-modal');
  const closeProjectModal = document.getElementById('close-project-modal');
  const closeProjectModalBtn = document.getElementById('close-project-modal-btn');
  const openProjectModalBtns = document.querySelectorAll('.open-project-modal');

  const modalTitle = document.getElementById('modal-project-title');
  const modalTech = document.getElementById('modal-project-tech');
  const modalDate = document.getElementById('modal-project-date');
  const modalDesc = document.getElementById('modal-project-desc');

  openProjectModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const tech = btn.getAttribute('data-tech');
      const date = btn.getAttribute('data-date');
      const desc = btn.getAttribute('data-desc');

      if (modalTitle) modalTitle.textContent = title;
      if (modalTech) modalTech.textContent = tech;
      if (modalDate) modalDate.textContent = date;
      if (modalDesc) modalDesc.textContent = desc;

      if (projectModal) {
        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeProjectPopup() {
    if (projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeProjectModal) closeProjectModal.addEventListener('click', closeProjectPopup);
  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectPopup);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectPopup();
    });
  }

  // --------------------------------------------------------------------------
  // 10. CONTACT FORM SUBMISSION WITH INTERACTIVE FEEDBACK
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'info');
        return;
      }

      const originalBtnHTML = contactSubmitBtn.innerHTML;
      contactSubmitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending message...';
      contactSubmitBtn.disabled = true;

      setTimeout(() => {
        contactSubmitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Transmitted!';
        contactSubmitBtn.style.background = 'var(--accent-emerald)';
        showToast(`Thank you, ${name}! Your inquiry has been forwarded to John.`, 'success');
        contactForm.reset();

        setTimeout(() => {
          contactSubmitBtn.innerHTML = originalBtnHTML;
          contactSubmitBtn.style.background = '';
          contactSubmitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  // Resume Download Button Alert
  const resumeDownloadBtn = document.getElementById('resume-download-btn');
  if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', () => {
      showToast('Opening verified resume (PDF) in new tab...', 'info');
    });
  }

  // --------------------------------------------------------------------------
  // 11. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' 
      ? '<i class="fa-solid fa-circle-check"></i>' 
      : '<i class="fa-solid fa-bell"></i>';

    toast.innerHTML = `
      ${icon}
      <span class="toast-msg">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 50);

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePortal();
      closeProjectPopup();
    }
  });
});
