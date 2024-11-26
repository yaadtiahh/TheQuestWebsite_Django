document.addEventListener('DOMContentLoaded', () => {
    console.log('Info Center: ready!');

    // Класс для переключения контента
    class ContentSwitcher {
        constructor(menuSelector, contentSelector, defaultSection) {
            this.menuButtons = document.querySelectorAll(menuSelector);
            this.contentSections = document.querySelectorAll(contentSelector);
            this.defaultSection = defaultSection;

            if (!this.menuButtons.length || !this.contentSections.length) {
                console.error('Меню или секции для переключения не найдены!');
                return;
            }

            this.init();
        }

        // Инициализация: добавление обработчиков и установка дефолтного состояния
        init() {
            this.menuButtons.forEach((button) => {
                const sectionId = button.dataset.section;
                button.addEventListener('click', () => this.showContent(sectionId));
            });

            // Устанавливаем дефолтный активный раздел
            this.showContent(this.defaultSection);
        }

        // Показывает выбранный контент и обновляет активную кнопку
        showContent(sectionId) {
            // Скрыть все секции
            this.contentSections.forEach((section) => {
                section.style.display = 'none';
            });

            // Показать выбранную секцию
            const activeSection = document.getElementById(sectionId);
            if (activeSection) {
                activeSection.style.display = 'block';
            } else {
                console.warn(`Секция с ID '${sectionId}' не найдена.`);
            }

            // Сброс активного состояния кнопок
            this.menuButtons.forEach((button) => {
                button.classList.remove('active');
            });

            // Установить активную кнопку
            const activeButton = [...this.menuButtons].find(
                (button) => button.dataset.section === sectionId
            );
            if (activeButton) {
                activeButton.classList.add('active');
            } else {
                console.warn(`Кнопка для секции '${sectionId}' не найдена.`);
            }
        }
    }

    // Инициализация переключателя
    new ContentSwitcher('.menu-button', '.content', 'news');
});
