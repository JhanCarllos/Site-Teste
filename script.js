/**
 * Bella Napoli — Script Principal
 * Núcleo + Utilitários + Scroll Reveal + Mobile Menu + Smooth Scroll + WhatsApp FAB
 * (Tabs, Carousel, Lightbox, Formulário virão nas próximas etapas)
 */
(function() {
  'use strict';

  // ========================================
  // NAMESPACE GLOBAL
  // ========================================
  window.BellaNapoli = window.BellaNapoli || {};

  // ========================================
  // UTILITÁRIOS
  // ========================================

  /**
   * Debounce — adia execução até parar de chamar
   * @param {Function} fn - Função a executar
   * @param {number} wait - Tempo em ms
   * @returns {Function}
   */
  function debounce(fn, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /**
   * Throttle — limita execução a uma vez por período
   * @param {Function} fn - Função a executar
   * @param {number} limit - Tempo em ms
   * @returns {Function}
   */
  function throttle(fn, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, limit);
      }
    };
  }

  /**
   * Máscara de telefone brasileiro (99) 99999-9999
   * @param {HTMLInputElement} input
   */
  function formatPhoneBR(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
      value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    input.value = value;
  }

  /**
   * Retorna altura do header fixo para offset de scroll
   * @returns {number}
   */
  function getHeaderHeight() {
    const header = document.querySelector('.header');
    return header ? header.offsetHeight : 80;
  }

  /**
   * Gera link WhatsApp com mensagem codificada
   * @param {string} text - Mensagem
   * @returns {string}
   */
  function waLink(text) {
    const phone = '5511999999999'; // placeholder
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  /**
   * Toast factory — cria notificação acessível
   * @param {string} message - Texto
   * @param {'success'|'error'|'warning'|'info'} type
   * @param {number} [duration=5000]
   */
  function toast(message, type = 'info', duration = 5000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'polite');

    const icons = {
      success: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    el.innerHTML = `
      <span class="toast__icon-wrapper">${icons[type] || icons.info}</span>
      <div class="toast__content">${message}</div>
      <button class="toast__close" aria-label="Fechar notificação" type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    const closeBtn = el.querySelector('.toast__close');
    closeBtn.addEventListener('click', () => removeToast(el));

    container.appendChild(el);

    // Auto-remove
    const timer = setTimeout(() => removeToast(el), duration);

    // Pause on hover
    el.addEventListener('mouseenter', () => clearTimeout(timer));
    el.addEventListener('mouseleave', () => setTimeout(() => removeToast(el), 1000));

    function removeToast(toastEl) {
      toastEl.classList.add('exiting');
      toastEl.addEventListener('transitionend', () => toastEl.remove(), { once: true });
    }
  }

  // Exporta utilitários
  window.BellaNapoli.utils = {
    debounce,
    throttle,
    formatPhoneBR,
    getHeaderHeight,
    waLink,
    toast
  };

  // ========================================
  // SCROLL REVEAL (IntersectionObserver)
  // ========================================
  function initScrollReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Aplica estado final imediatamente
      document.querySelectorAll('[data-reveal], .reveal, .reveal-stagger').forEach(el => {
        if (el.classList.contains('reveal-stagger')) {
          el.classList.add('reveal-stagger--visible');
        } else {
          el.classList.add('reveal--visible');
        }
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Stagger delay
          if (target.dataset.revealDelay) {
            target.style.transitionDelay = `${target.dataset.revealDelay}ms`;
          }

          if (target.classList.contains('reveal-stagger')) {
            target.classList.add('reveal-stagger--visible');
          } else {
            target.classList.add('reveal--visible');
          }

          observer.unobserve(target);
        }
      });
    }, {
      rootMargin: '-10% 0px',
      threshold: 0.1
    });

    // Observa elementos
    document.querySelectorAll('[data-reveal], .reveal, .reveal-stagger').forEach(el => observer.observe(el));
  }

  // ========================================
  // MOBILE MENU
  // ========================================
  function initMobileMenu() {
    const toggleBtn = document.querySelector('[aria-controls="mobile-menu"]');
    const drawer = document.getElementById('mobile-menu');
    const overlay = document.querySelector('.mobile-menu__overlay');
    const closeBtn = drawer?.querySelector('.mobile-menu__close');
    const links = drawer?.querySelectorAll('.mobile-menu__link');

    if (!toggleBtn || !drawer || !overlay) return;

    let lastFocused = null;

    function openMenu() {
      lastFocused = document.activeElement;
      drawer.hidden = false;
      overlay.hidden = false;
      // Force reflow para transição
      requestAnimationFrame(() => {
        drawer.classList.add('mobile-menu--open');
        overlay.classList.add('mobile-menu__overlay--open');
      });
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Focus trap: foca no botão fechar
      closeBtn?.focus();
    }

    function closeMenu() {
      drawer.classList.remove('mobile-menu--open');
      overlay.classList.remove('mobile-menu__overlay--open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      // Wait transition
      setTimeout(() => {
        drawer.hidden = true;
        overlay.hidden = true;
        lastFocused?.focus();
      }, 250);
    }

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const focusable = drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }

    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });

    closeBtn?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    links?.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.hidden) closeMenu();
    });

    // Focus trap when open
    drawer.addEventListener('keydown', trapFocus);
  }

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = getHeaderHeight();
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      history.pushState(null, '', href);

      // Fecha mobile menu se aberto
      const drawer = document.getElementById('mobile-menu');
      if (drawer && !drawer.hidden) {
        document.querySelector('[aria-controls="mobile-menu"]')?.click();
      }
    });
  }

  // ========================================
  // WHATSAPP FAB (Básico)
  // ========================================
  function initWhatsAppFAB() {
    const fab = document.querySelector('.fab--whatsapp, .whatsapp-fab');
    if (!fab) return;

    // Se for placeholder .whatsapp-fab, cria o botão real
    if (fab.classList.contains('whatsapp-fab')) {
      fab.outerHTML = `
        <a href="${waLink('Olá, Bella Napoli! Gostaria de fazer um pedido.')}"
           class="fab--whatsapp"
           target="_blank"
           rel="noopener"
           aria-label="Falar no WhatsApp"
           title="Falar no WhatsApp">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#25d366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.454.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a21.87 21.87 0 0 1-.004-.004 22.175 22.175 0 0 1 0-.074c0-.026-.01-.068-.02-.11l-2.088-6.908a1.365 1.365 0 0 0-1.325-1l-5.605-.782a1.363 1.363 0 0 0-1.31.673l-.816 3.685a1.363 1.363 0 0 0 .434 1.446l3.134 3.133a1.364 1.364 0 0 0 1.445.434l3.755-.86a1.363 1.363 0 0 0 .77-1.426l-.693-4.116Z"/></svg>
        </a>
      `;
      return;
    }

    // Se já é .fab--whatsapp, garante href
    if (fab.tagName === 'BUTTON') {
      fab.addEventListener('click', () => {
        window.open(waLink('Olá, Bella Napoli! Gostaria de fazer um pedido.'), '_blank', 'noopener');
      });
    }
  }

  // ========================================
  // INPUT MASK PHONE (delegação)
  // ========================================
  function initPhoneMask() {
    document.addEventListener('input', (e) => {
      if (e.target.matches('#telefone, [type="tel"]')) {
        formatPhoneBR(e.target);
      }
    });
  }

  // ========================================
  // TABS CARDÁPIO
  // ========================================
  function initCardapioTabs() {
    const tablist = document.querySelector('.cardapio__tabs[role="tablist"]');
    if (!tablist) return;

    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls'))).filter(Boolean);

    function activateTab(index) {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', selected);
        tab.classList.toggle('tab--active', selected);
        tab.tabIndex = selected ? 0 : -1;
        if (panels[i]) {
          panels[i].hidden = !selected;
          panels[i].classList.toggle('tabpanel--active', selected);
        }
      });
    }

    // Click handler
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activateTab(i));
    });

    // Keyboard navigation
    tablist.addEventListener('keydown', (e) => {
      const currentIndex = tabs.findIndex(t => t === document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % tabs.length;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }
      tabs[nextIndex].focus();
      activateTab(nextIndex);
    });

    // Horizontal scroll snap no mobile (scroll into view)
    function scrollTabIntoView(tab) {
      if (window.innerWidth < 768) {
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => scrollTabIntoView(tab));
    });

    // Expõe para debug
    window.BellaNapoli.cardapioTabs = { activateTab, tabs, panels };
  }

  // ========================================
  // CAROUSEL DEPOIMENTOS
  // ========================================
  function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials__carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonials__track');
    const cards = Array.from(carousel.querySelectorAll('.testimonial__card'));
    const prevBtn = carousel.querySelector('.testimonials__prev');
    const nextBtn = carousel.querySelector('.testimonials__next');
    const dotsContainer = carousel.querySelector('.testimonials__dots');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    const autoPlayDelay = 5000;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cria dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      cards.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
        btn.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(btn);
      });
    }
    const dots = Array.from(dotsContainer?.querySelectorAll('button') || []);

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
        dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
      });
    }

    function goToSlide(index) {
      currentIndex = (index + cards.length) % cards.length;
      const cardWidth = cards[0].getBoundingClientRect().width + 16; // gap aproximado
      track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
      updateDots();
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    // Auto-play
    function startAutoPlay() {
      if (prefersReduced || cards.length <= 1) return;
      autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }

    // Event listeners
    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('focusin', stopAutoPlay);
    carousel.addEventListener('focusout', startAutoPlay);

    // Keyboard
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      else if (e.key === 'Escape') { dots[0]?.focus(); }
    });

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? nextSlide() : prevSlide(); }
    }, { passive: true });

    // Inicializa
    updateDots();
    startAutoPlay();

    window.BellaNapoli.testimonialsCarousel = { goToSlide, nextSlide, prevSlide, startAutoPlay, stopAutoPlay };
  }

  // ========================================
  // LIGHTBOX GALERIA
  // ========================================
  function initGalleryLightbox() {
    const triggers = document.querySelectorAll('[data-lightbox]');
    const modal = document.getElementById('gallery-lightbox');
    if (!modal || triggers.length === 0) return;

    const modalImage = modal.querySelector('.modal__image');
    const closeBtn = modal.querySelector('.modal__close');
    const prevBtn = modal.querySelector('.modal__nav--prev');
    const nextBtn = modal.querySelector('.modal__nav--next');
    const overlay = modal;

    const items = Array.from(triggers);
    let currentIndex = 0;
    let lastFocused = null;

    function openLightbox(index) {
      currentIndex = index;
      lastFocused = document.activeElement;
      updateImage();
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add('modal-overlay--open'));
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
      trapFocusSetup();
    }

    function closeLightbox() {
      modal.classList.remove('modal-overlay--open');
      document.body.style.overflow = '';
      setTimeout(() => {
        modal.hidden = true;
        lastFocused?.focus();
      }, 250);
      removeTrapFocus();
    }

    function updateImage() {
      const trigger = items[currentIndex];
      const img = trigger?.querySelector('img');
      if (img && modalImage) {
        modalImage.src = img.src;
        modalImage.alt = img.alt || `Imagem ${currentIndex + 1} de ${items.length}`;
      }
      // Atualiza contador se existir
      const counter = modal.querySelector('.modal__counter');
      if (counter) counter.textContent = `${currentIndex + 1} de ${items.length}`;
    }

    function nextImage() { currentIndex = (currentIndex + 1) % items.length; updateImage(); }
    function prevImage() { currentIndex = (currentIndex - 1 + items.length) % items.length; updateImage(); }

    // Focus trap
    let trapFocusHandler = null;
    function trapFocusSetup() {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      trapFocusHandler = (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      };
      modal.addEventListener('keydown', trapFocusHandler);
    }
    function removeTrapFocus() {
      if (trapFocusHandler) modal.removeEventListener('keydown', trapFocusHandler);
    }

    // Event listeners
    items.forEach((trigger, i) => {
      trigger.addEventListener('click', () => openLightbox(i));
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
      });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });

    prevBtn?.addEventListener('click', prevImage);
    nextBtn?.addEventListener('click', nextImage);

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
    });

    // Touch swipe
    let touchStartX = 0;
    modal.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    modal.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? nextImage() : prevImage(); }
    }, { passive: true });

    window.BellaNapoli.galleryLightbox = { openLightbox, closeLightbox, nextImage, prevImage };
  }

  // ========================================
  // FORMULÁRIO CONTATO
  // ========================================
  function initContactForm() {
    const form = document.querySelector('.contato__form');
    if (!form) return;

    const nomeInput = form.querySelector('#nome');
    const telefoneInput = form.querySelector('#telefone');
    const pedidoInput = form.querySelector('#pedido');
    const submitBtn = form.querySelector('.contato__submit');
    const whatsappMessageInput = form.querySelector('#whatsapp-message');

    // Validação customizada
    function validateField(input) {
      const errorEl = input.parentElement?.querySelector('.form-error');
      let isValid = true;
      let message = '';

      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        message = 'Este campo é obrigatório';
      } else if (input.id === 'telefone' && input.value.trim()) {
        const digits = input.value.replace(/\D/g, '');
        if (digits.length !== 11) {
          isValid = false;
          message = 'WhatsApp inválido. Use: (11) 99999-9999';
        }
      } else if (input.id === 'pedido' && input.value.trim().length < 5) {
        isValid = false;
        message = 'Descreva seu pedido (mín. 5 caracteres)';
      }

      input.setAttribute('aria-invalid', !isValid);
      if (errorEl) {
        errorEl.textContent = message;
      }
      return isValid;
    }

    // Validação em tempo real
    [nomeInput, telefoneInput, pedidoInput].forEach(input => {
      if (input) {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.getAttribute('aria-invalid') === 'true') validateField(input);
        });
      }
    });

    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nomeValid = validateField(nomeInput);
      const telefoneValid = validateField(telefoneInput);
      const pedidoValid = validateField(pedidoInput);

      if (!nomeValid || !telefoneValid || !pedidoValid) {
        toast('Preencha todos os campos corretamente', 'error');
        return;
      }

      // Monta mensagem WhatsApp
      const nome = nomeInput.value.trim();
      const telefone = telefoneInput.value.trim();
      const pedido = pedidoInput.value.trim();

      const message = `Olá, Bella Napoli! Meu nome é ${nome}. Gostaria de fazer o seguinte pedido:\n\n${pedido}\n\nMeu WhatsApp para confirmação: ${telefone}`;

      // Atualiza hidden input para o form action (WhatsApp deep link)
      if (whatsappMessageInput) {
        whatsappMessageInput.value = message;
      }

      // Abre WhatsApp
      const url = waLink(message);
      window.open(url, '_blank', 'noopener,noreferrer');

      // Toast sucesso
      toast('Pedido enviado! Você será redirecionado ao WhatsApp.', 'success');

      // Limpa formulário
      form.reset();
      [nomeInput, telefoneInput, pedidoInput].forEach(input => {
        if (input) input.removeAttribute('aria-invalid');
        const errorEl = input?.parentElement?.querySelector('.form-error');
        if (errorEl) errorEl.textContent = '';
      });
    });

    // Analytics placeholder para botões de pedido no cardápio
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-wa-event]');
      if (btn) {
        const eventName = btn.dataset.waEvent;
        const itemName = btn.dataset.item || 'Item desconhecido';
        const itemPrice = btn.dataset.price || '0';
        // Placeholder para analytics (GA4, Meta Pixel, etc.)
        console.log('[Analytics]', eventName, { item: itemName, price: itemPrice });
      }
    });

    window.BellaNapoli.contactForm = { form };
  }

  // ========================================
  // WHATSAPP FAB AVANÇADO + CARDS CARDÁPIO
  // ========================================
  function initWhatsAppFABAdvanced() {
    // 1. Cards do cardápio: click no botão "Pedir X pelo WhatsApp"
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.card__btn[data-item]');
      if (!btn) return;

      const itemName = btn.dataset.item;
      const itemPrice = btn.dataset.price;

      // Preenche formulário de contato
      const pedidoInput = document.querySelector('#pedido');
      if (pedidoInput) {
        const currentText = pedidoInput.value.trim();
        const newItem = `1x ${itemName} (R$ ${itemPrice})`;
        pedidoInput.value = currentText ? `${currentText}\n${newItem}` : newItem;
        pedidoInput.dispatchEvent(new Event('input', { bubbles: true }));
      }

      // Scroll suave até formulário
      const contatoSection = document.getElementById('contato');
      if (contatoSection) {
        const headerHeight = getHeaderHeight();
        const targetPosition = contatoSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        history.pushState(null, '', '#contato');

        // Foca no primeiro campo vazio
        setTimeout(() => {
          const nomeInput = document.querySelector('#nome');
          if (nomeInput && !nomeInput.value.trim()) nomeInput.focus();
        }, 500);
      }

      // Analytics
      console.log('[Analytics]', 'menu_item_click', { item: itemName, price: itemPrice });
    });

    // 2. FAB WhatsApp: garante que funciona tanto como <a> quanto <button>
    const fab = document.querySelector('.fab--whatsapp');
    if (fab && fab.tagName === 'BUTTON') {
      fab.addEventListener('click', () => {
        window.open(waLink('Olá, Bella Napoli! Gostaria de fazer um pedido.'), '_blank', 'noopener,noreferrer');
      });
    }

    window.BellaNapoli.whatsappFABAdvanced = {};
  }

  // ========================================
  // INICIALIZAÇÃO ÚNICA
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    try {
      initScrollReveal();
      initMobileMenu();
      initSmoothScroll();
      initWhatsAppFAB();
      initPhoneMask();
      initCardapioTabs();
      initTestimonialsCarousel();
      initGalleryLightbox();
      initContactForm();
      initWhatsAppFABAdvanced();

      // Expõe init para testes/debug
      window.BellaNapoli.init = {
        scrollReveal: initScrollReveal,
        mobileMenu: initMobileMenu,
        smoothScroll: initSmoothScroll,
        whatsappFAB: initWhatsAppFAB,
        phoneMask: initPhoneMask,
        cardapioTabs: initCardapioTabs,
        testimonialsCarousel: initTestimonialsCarousel,
        galleryLightbox: initGalleryLightbox,
        contactForm: initContactForm,
        whatsappFABAdvanced: initWhatsAppFABAdvanced
      };
    } catch (err) {
      console.error('[BellaNapoli] Erro na inicialização:', err);
    }
  });

})();