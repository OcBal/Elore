document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. CARRITO Y NOTIFICACIÓN TOAST
    // ==========================================================================
    let cartCount = 0;
    const cartCountEl = document.getElementById('cartCount');
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Botones "Añadir al carrito" en tarjetas de productos
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productName = e.target.getAttribute('data-product') || 'Producto';
            cartCount++;
            if (cartCountEl) cartCountEl.textContent = cartCount;
            showToast(`Añadido: ${productName}`);
        });
    });

    // Botón "Añadir al carrito" en Ficha de Producto Individual
    const addToCartSingleBtn = document.getElementById('addToCartSingleBtn');
    if (addToCartSingleBtn) {
        addToCartSingleBtn.addEventListener('click', () => {
            const activeSize = document.querySelector('.size-pill.active')?.textContent || '37';
            const activeColor = document.querySelector('.color-pill.active')?.textContent || 'Camel';
            cartCount++;
            if (cartCountEl) cartCountEl.textContent = cartCount;
            showToast(`Botín Chelsea Carmel (${activeColor}, Talla ${activeSize}) añadido.`);
        });
    }

    // ==========================================================================
    // 2. FILTRO DE CATEGORÍAS (PÁGINA TIENDA)
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('#productGrid .product-card');

    function filterCategory(category) {
        filterBtns.forEach(b => b.classList.remove('active'));
        const targetBtn = document.querySelector(`.filter-btn[data-category="${category}"]`) || document.querySelector('.filter-btn[data-category="todos"]');
        if (targetBtn) targetBtn.classList.add('active');

        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'todos' || cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterCategory(category);
        });
    });

    // Detectar si la URL incluye parámetro ?cat=
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('cat');
    if (categoryParam && productCards.length > 0) {
        filterCategory(categoryParam);
    }

    // ==========================================================================
    // 3. PESTAÑAS Y ACORDEÓN (PÁGINA DE SOPORTE)
    // ==========================================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabTarget) {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabTarget}"]`);
        const targetContent = document.getElementById(`tab-${tabTarget}`);

        if (activeBtn) activeBtn.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabTarget = btn.getAttribute('data-tab');
            switchTab(tabTarget);
        });
    });

    // Acordeón Desplegable FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });

    // Abrir automáticamente pestaña o ítem según URL
    const tabParam = urlParams.get('tab');
    if (tabParam) {
        switchTab(tabParam);
    }

    const topicParam = urlParams.get('topic');
    if (topicParam === 'devoluciones') {
        switchTab('faq');
        const devolucionesItem = document.getElementById('item-devoluciones');
        if (devolucionesItem) {
            devolucionesItem.classList.add('active');
            devolucionesItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // ==========================================================================
    // 4. OPCIONES DE COLOR Y TALLA (FICHA DE PRODUCTO)
    // ==========================================================================
    const colorPills = document.querySelectorAll('.color-pill');
    const selectedColorLabel = document.getElementById('selectedColor');

    colorPills.forEach(pill => {
        pill.addEventListener('click', () => {
            colorPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (selectedColorLabel) selectedColorLabel.textContent = pill.getAttribute('data-color');
        });
    });

    const sizePills = document.querySelectorAll('.size-pill');
    const selectedSizeLabel = document.getElementById('selectedSize');

    sizePills.forEach(pill => {
        pill.addEventListener('click', () => {
            sizePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (selectedSizeLabel) selectedSizeLabel.textContent = pill.getAttribute('data-size');
        });
    });

    // ==========================================================================
    // 5. HERO SLIDER (PÁGINA INICIO)
    // ==========================================================================
    const dots = document.querySelectorAll('.dot');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const slide = document.querySelector('.slide');

    if (slide && dots.length > 0) {
        const slideData = [
            {
                title: "Nueva Colección Otoño",
                subtitle: "Piezas atemporales para combinar la moda",
                image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600"
            },
            {
                title: "Básicos Esenciales",
                subtitle: "Texturas de lino y acabados artesanales",
                image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600"
            },
            {
                title: "Accesorios de Autor",
                subtitle: "Detalles que transforman tu look diario",
                image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600"
            }
        ];

        let currentSlide = 0;

        function updateSlide(index) {
            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');
            slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url('${slideData[index].image}')`;
            if (heroTitle) heroTitle.textContent = slideData[index].title;
            if (heroSubtitle) heroSubtitle.textContent = slideData[index].subtitle;
            currentSlide = index;
        }

        const nextBtn = document.getElementById('nextSlide');
        const prevBtn = document.getElementById('prevSlide');

        if (nextBtn) nextBtn.addEventListener('click', () => updateSlide((currentSlide + 1) % slideData.length));
        if (prevBtn) prevBtn.addEventListener('click', () => updateSlide((currentSlide - 1 + slideData.length) % slideData.length));
        dots.forEach((dot, index) => dot.addEventListener('click', () => updateSlide(index)));
    }

    // ==========================================================================
    // 6. FORMULARIO NEWSLETTER
    // ==========================================================================
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterFeedback = document.getElementById('newsletterFeedback');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (newsletterFeedback) {
                newsletterFeedback.textContent = "¡Gracias por suscribirte! Te hemos enviado un correo de bienvenida.";
            }
            newsletterForm.reset();
        });
    }

    // ==========================================================================
    // 7. MENÚ RESPONSIVE MÓVIL
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});