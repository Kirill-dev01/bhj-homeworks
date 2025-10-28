document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products');
    const cartProductsContainer = document.querySelector('.cart__products');
    const cart = document.querySelector('.cart');
    const STORAGE_KEY = 'shopping_cart';

    /**
     * (Повышенный #1)
     * Проверяет, есть ли товары в корзине, и показывает/скрывает ее.
     */
    function updateCartVisibility() {
        if (cartProductsContainer.children.length > 0) {
            cart.style.display = 'block';
        } else {
            cart.style.display = 'none';
        }
    }

    /**
     * (Повышенный #3)
     * Сохраняет текущее состояние корзины в localStorage.
     */
    function saveCartToStorage() {
        const cartData = [];
        cartProductsContainer.querySelectorAll('.cart__product').forEach(item => {
            cartData.push({
                id: item.dataset.id,
                count: parseInt(item.querySelector('.cart__product-count').textContent, 10),
                imgSrc: item.querySelector('.cart__product-image').src,
            });
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
    }

    /**
     * (Повышенный #3)
     * Загружает корзину из localStorage при загрузке страницы.
     */
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem(STORAGE_KEY);
        if (!savedCart) {
            return;
        }

        const cartData = JSON.parse(savedCart);
        cartData.forEach(item => {
            // Создаем товар в корзине (без анимации)
            createCartItem(item.id, item.imgSrc, item.count);
        });
    }

    /**
     * (Повышенный #2)
     * Анимация "полета" товара в корзину.
     * @param {Element} productImg - Изображение товара, которое "полетит".
     */
    function animateFlyToCart(productImg) {
        const productRect = productImg.getBoundingClientRect();
        const cartRect = cart.getBoundingClientRect();

        // 1. Создаем клон изображения
        const flyingImg = productImg.cloneNode();
        flyingImg.classList.add('product-shadow'); // Используем класс из CSS

        // 2. Позиционируем клон точно над оригиналом
        flyingImg.style.position = 'fixed';
        flyingImg.style.left = `${productRect.left}px`;
        flyingImg.style.top = `${productRect.top}px`;
        flyingImg.style.width = `${productRect.width}px`;
        flyingImg.style.height = `${productRect.height}px`;
        flyingImg.style.zIndex = 1000;

        // 3. Добавляем клон в body
        document.body.appendChild(flyingImg);

        // 4. Запускаем CSS-анимацию/переход (даем браузеру "тик" на отрисовку)
        requestAnimationFrame(() => {
            flyingImg.style.transition = 'left 0.5s ease-in-out, top 0.5s ease-in-out, transform 0.5s ease-in-out, opacity 0.5s ease-in-out';

            // 5. Анимируем в центр корзины, уменьшая размер
            flyingImg.style.left = `${cartRect.left + (cartRect.width / 2) - (productRect.width / 2)}px`;
            flyingImg.style.top = `${cartRect.top + (cartRect.height / 2) - (productRect.height / 2)}px`;
            flyingImg.style.transform = 'scale(0.1)';
            flyingImg.style.opacity = '0.5';
        });

        // 6. Удаляем клон после завершения анимации
        flyingImg.addEventListener('transitionend', () => {
            flyingImg.remove();
        });
    }

    /**
     * Создает DOM-элемент товара в корзине.
     * @param {string} id - ID товара.
     * @param {string} imgSrc - URL изображения.
     * @param {number} quantity - Количество.
     */
    function createCartItem(id, imgSrc, quantity) {
        const newItem = document.createElement('div');
        newItem.className = 'cart__product';
        newItem.dataset.id = id;

        newItem.innerHTML = `
        <img class="cart__product-image" src="${imgSrc}">
        <div class="cart__product-count">${quantity}</div>
      `;

        // (Повышенный #1 - Дополнение) Удаление товара по клику
        newItem.addEventListener('click', () => {
            newItem.remove();
            updateCartVisibility();
            saveCartToStorage();
        });

        cartProductsContainer.appendChild(newItem);
    }

    // --- ЛОГИКА ОБРАБОТКИ КЛИКОВ НА ТОВАРАХ ---

    // Используем делегирование событий для всего контейнера
    productsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const product = target.closest('.product');
        if (!product) return; // Клик был не внутри товара

        // 1. Управление количеством (кнопки +/-)
        if (target.classList.contains('product__quantity-control')) {
            const valueEl = product.querySelector('.product__quantity-value');
            let value = parseInt(valueEl.textContent, 10);

            if (target.classList.contains('product__quantity-control_dec')) {
                if (value > 1) {
                    valueEl.textContent = value - 1;
                }
            } else if (target.classList.contains('product__quantity-control_inc')) {
                valueEl.textContent = value + 1;
            }
        }

        // 2. Добавление в корзину
        if (target.classList.contains('product__add')) {
            const id = product.dataset.id;
            const img = product.querySelector('.product__image');
            const quantityEl = product.querySelector('.product__quantity-value');
            const quantity = parseInt(quantityEl.textContent, 10);

            // Проверяем, есть ли товар уже в корзине
            const existingCartItem = cartProductsContainer.querySelector(`.cart__product[data-id="${id}"]`);

            if (existingCartItem) {
                // Если да - увеличиваем счетчик
                const countEl = existingCartItem.querySelector('.cart__product-count');
                const currentCount = parseInt(countEl.textContent, 10);
                countEl.textContent = currentCount + quantity;
            } else {
                // Если нет - создаем новый элемент
                createCartItem(id, img.src, quantity);
            }

            // (Повышенный #2) Запускаем анимацию
            animateFlyToCart(img);

            // (Повышенный #1) Обновляем видимость корзины
            updateCartVisibility();

            // (Повышенный #3) Сохраняем корзину
            saveCartToStorage();
        }
    });

    // --- ИНИЦИАЛИЗАЦИЯ ---

    // (Повышенный #3) Загружаем корзину при старте
    loadCartFromStorage();

    // (Повышенный #1) Проверяем видимость корзины при старте
    updateCartVisibility();
});
