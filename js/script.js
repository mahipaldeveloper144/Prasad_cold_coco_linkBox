$(document).ready(function() {
    // 1. Fade-in on load
    $('body').css('opacity', '0').animate({ opacity: 1 }, 800);

    // 2. Dynamic Year in Footer
    $('#year').text(new Date().getFullYear());

    // 3. Theme Toggle
    const themeBtn = $('#theme-toggle');
    const body = $('body');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    body.attr('data-theme', savedTheme);
    updateThemeContent(savedTheme);

    themeBtn.on('click', function() {
        const currentTheme = body.attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeContent(newTheme);
    });

    function updateThemeContent(theme) {
        // Update Icon
        const isDark = theme === 'dark';
        const iconClass = isDark ? 'fa-sun sun-icon' : 'fa-moon moon-icon';
        themeBtn.find('i').attr('class', `fas ${iconClass}`);

        // Update Logo & Favicon
        const logoPath = theme === 'dark' ? 'assets/Logo1.png' : 'assets/Logo2.png';
        $('.profile-img').attr('src', logoPath);
        $('link[rel="shortcut icon"]').attr('href', logoPath);
    }

    // 4. Ripple Effect
    $('.link-card, .offer-banner').on('click', function(e) {
        const x = e.pageX - $(this).offset().left;
        const y = e.pageY - $(this).offset().top;

        const ripple = $('<span class="ripple"></span>');
        ripple.css({ top: y + 'px', left: x + 'px' });
        $(this).append(ripple);

        setTimeout(() => ripple.remove(), 600);
    });

    // 5. Special Offer Modal
    const modal = $('#offer-modal');
    const openModal = $('#special-offer-btn');
    const closeModal = $('.modal-close');

    openModal.on('click', function() {
        modal.css('display', 'flex').hide().fadeIn();
    });

    closeModal.on('click', function() {
        modal.fadeOut();
    });

    $(window).on('click', function(e) {
        if ($(e.target).is(modal)) {
            modal.fadeOut();
        }
    });

    // 6. Lightbox Gallery
    const lightbox = $('#lightbox');
    const lightboxImg = lightbox.find('img');
    const lightboxVideo = lightbox.find('video');
    
    $('.gallery-item').on('click', function() {
        const img = $(this).find('img');
        const video = $(this).find('video');
        
        if (img.length) {
            lightboxImg.show().attr('src', img.attr('src'));
            lightboxVideo.hide().attr('src', '');
        } else if (video.length) {
            lightboxVideo.show().attr('src', video.attr('src'));
            lightboxImg.hide().attr('src', '');
            lightboxVideo[0].play();
        }

        lightbox.css('display', 'flex').hide().fadeIn();
    });

    lightbox.on('click', function() {
        lightbox.fadeOut(function() {
            // Stop video if playing
            lightboxVideo[0].pause();
            lightboxVideo.attr('src', '');
            lightboxImg.attr('src', '');
        });
    });

    // 7. AOS Scroll Animations Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true,
            easing: 'ease-in-out'
        });
    }

    // 8. Smooth Scrolling for internal links
    $('a[href^="#"]').on('click', function(event) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 20
            }, 800);
        }
    });
});
