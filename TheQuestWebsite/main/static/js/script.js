document.addEventListener('DOMContentLoaded', () => {
    console.log('The Quest ready!');

    /**
     * Утилита для привязки модального окна
     * @param {string} modalId - ID модального окна
     * @param {string} triggerSelector - Селектор элемента, открывающего окно
     * @param {string} closeSelector - Селектор кнопки закрытия окна
     * @param {function} onOpenCallback - Функция, вызываемая при открытии окна
     */
    function setupModal(modalId, triggerSelector, closeSelector, onOpenCallback = null) {
        const modal = document.getElementById(modalId);
        const trigger = document.querySelector(triggerSelector);
        const closeButton = modal?.querySelector(closeSelector);

        if (!modal || !trigger || !closeButton) {
            console.warn(`Не удалось привязать модальное окно: modalId=${modalId}`);
            return;
        }

        // Открытие окна
        trigger.addEventListener('click', () => {
            modal.style.display = 'flex';
            if (typeof onOpenCallback === 'function') {
                onOpenCallback(); // Вызываем дополнительную функцию при открытии
            }
        });

        // Закрытие окна через кнопку
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Закрытие окна при клике вне содержимого
        modal.addEventListener('click', (event) => {
            if (!event.target.closest('.modal-content') && event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Закрытие окна по ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
    }

    /**
     * Инициализация прогресс-бара
     * @param {string} progressBarId - ID элемента прогресс-бара
     */
    function startProgressBar(progressBarId) {
        const progressElement = document.getElementById(progressBarId);
        if (!progressElement) {
            console.warn(`Прогресс-бар с ID '${progressBarId}' не найден.`);
            return;
        }

        let progress = 0;
        const targetProgress = 70;

        const interval = setInterval(() => {
            if (progress < targetProgress) {
                progress++;
                progressElement.style.width = `${progress}%`;
            } else {
                clearInterval(interval);
            }
        }, 30);
    }

    // Привязка модальных окон
    setupModal(
        'overlay', 
        '.our-socials-btn', 
        '#close-block'
    );

    setupModal(
        'overlaytwo', 
        '.get-the-quest', 
        '#close-block-two', 
        () => startProgressBar('progress') // Привязываем запуск прогресс-бара
    );

    /**
     * Переключение языка
     */
    function initLanguageSwitch() {
        const languageSwitch = document.querySelector('.language-switch');
        const languageMenu = document.querySelector('.language-menu');

        if (!languageSwitch || !languageMenu) return;

        // Открыть/закрыть меню
        languageSwitch.addEventListener('click', (event) => {
            event.stopPropagation();
            languageSwitch.classList.toggle('active');
        });

        // Выбор языка
        languageMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const selectedLanguage = event.target.getAttribute('data-lang');
                console.log(`Выбранный язык: ${selectedLanguage}`);
                languageSwitch.classList.remove('active');
            }
        });

        // Закрыть меню при клике вне
        document.addEventListener('click', () => {
            languageSwitch.classList.remove('active');
        });
    }
    initLanguageSwitch();

    /**
     * Эффект hover на "OUR SOCIALS"
     */
    function initSocialsHover() {
        const socialsButton = document.querySelector('.our-socials-btn');
        const socialsBlocks = document.querySelectorAll('.social-item');

        if (!socialsButton || socialsBlocks.length === 0) return;

        socialsButton.addEventListener('mouseover', () => {
            socialsBlocks.forEach((block) => block.classList.add('hover'));
        });

        socialsButton.addEventListener('mouseout', () => {
            socialsBlocks.forEach((block) => block.classList.remove('hover'));
        });
    }
    initSocialsHover();

    /**
     * Эффект hover для кнопки "Get The Quest"
     */
    function initCtaButtonHover() {
        const ctaButton = document.querySelector('.cta-button');
        if (!ctaButton) return;

        const defaultSrc = ctaButton.getAttribute('data-default-src');
        const hoverSrc = ctaButton.getAttribute('data-hover-src');

        ctaButton.addEventListener('mouseover', () => {
            ctaButton.src = hoverSrc;
        });

        ctaButton.addEventListener('mouseout', () => {
            ctaButton.src = defaultSrc;
        });
    }
    initCtaButtonHover();



    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active')); // Удаляем класс active у всех
            this.classList.add('active'); // Добавляем класс active только к текущей
        });
    });
});


