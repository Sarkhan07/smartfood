window.addEventListener('DOMContentLoaded', () => {
    // tab
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach((item) => {
            // item.style.display = 'none'; it's not preferable
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active'); // точка не ставится из-за classlist
        });
    }

    function showTabContent(i = 0) {
        // standart es6 default
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer

    const deadline = '2022-12-31'; // input с type data возвращает с таким форматом так что лучше привыкать так
    // миллисекунда 1 / 1000 , в 1 сек = 60000
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;

        // get difference between dates
        const t = Date.parse(endtime) - Date.parse(new Date()); // количество милли секунд получаем тоже самое что new Date()
        // можно наверху new Date использовать и без parse

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            (days = Math.floor(t / (1000 * 60 * 60 * 24))), // Math.floor - это округление до ближащего целого
                (hours = Math.floor(((t / 1000) * 60 * 60) % 24)), // первое скобку общее количество часов получаем
                //а потом делим на 24 и получаем остатку// 50 hours % 24 и вернет всего 2 часа
                (minutes = Math.floor((t / 1000 / 60) % 60)),
                (seconds = Math.floor((t / 1000) % 60));
        }

        return {
            // чтобы вернуть наружу

            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    // adding zero to numbers of date

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // функция будет запускаться каждую 1 секунду

        // обновление нашего timer

        // чтобы не было мигании надо запускать update здесь
        // алгоритм сперва setclock делает переменные, а потом updateClock запускается сразу же а потом setInterval сработает

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime); // t это объект которое возращался с getTimeremaining (return)

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    /// modal
    //for easily getting from html data-modal add in tag

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
    // modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTImerId); // если сам открыл то надо очистить
    }

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    // () => {
    //     modal.classList.add('show');
    //     modal.classList.remove('hide');
    //     // modal.classList.toggle('show');
    //     document.body.style.overflow = 'hidden';
    // });
    // )};

    // modalCloseBtn.addEventListener('click', closeModal);

    // закрыть модальное окно кликая на подножку и это modal

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            // чтобы получить атрибут того куда нажимали и закрыть окно
            closeModal(); // здесь вызываем потому что надо выполнить после условия
            // modal.classList.add('hide');
            // modal.classList.remove('show');
            // document.body.style.overflow = '';
            // но здесь повторение вверхнего кода это не хорошая практика Do not repeat yourself
        }
    });

    // esq close the modal// with keydown// keycpde.info we can search all keys code
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // poping up after 5 sec
    const modalTImerId = setTimeout(openModal, 50000);

    // task modal will open after certain scrolling

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // то есть как только открылся уже убрать обработчика чтобы больше не открылся
        } // I => pagexoffset прокрученная часть + II => видимая часть на экране = общая высота сайта с учетом прокрутки .. но лучше - 1 для страховки добавитьЫ
    } // { once: true } // чтобы обработчик только раз сработал но это здесь не подходит так акак обработчик на windows

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            //надо получить карточки и для этого надо путь src, alt text, title, description and price and all of these will arguments
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // в классе будет массив
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
            // this.changeToUAH метод будет сработать в конструкторе и дальше в price будет новое значение
        }

        // сперва будет передаваться аргумента и создаваться верстка
        // и в price придет число и перед тем опубликовать нам надо конвертировать это число
        changeToUAH() {
            this.price = +this.price * this.transfer;
        }
        // чтобы когда этот метод конвертацию делать создаем метод render (для верстки)
        render() {
            const element = document.createElement('div');
            // for dafault argument and operator rest everytime return empty array and we can check if it's empty or not
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) =>
                    element.classList.add(className)
                );
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
        `;
            this.parent.append(element);
        }
    }

    // чтобы когда надо использовать на месте мы пишем, и это потом потеряться может

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).render();

    // const div = new MenuCard();

    // div.render();

    // send forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так',
    };

    forms.forEach((item) => {
        postData(item); // shift + F5 чтобы сбросить все данные(kesh)
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            // кнопка в форуме автоматически принимает submit
            e.preventDefault();

            // let statusMessage = document.createElement('div');
            // statusMessage.classList.add('status');
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto`;

            // statusMessage.textContent = message.loading;
            // form.append(statusMessage);1 WAY
            // 2 WAY of adding element to page

            form.insertAdjacentElement('afterend', statusMessage);
            const request = new XMLHttpRequest();

            request.open('POST', 'server.php');
            // request.setRequestHeader(
            //     'Content-type',
            //     'application/json; charset=utf-8'
            // ); when use formdata and xmlrequest header we should not use
            // а если наш сервер принимает в json формете то тогда нужет заголовок
            request.setRequestHeader('Content-type', 'application/json');
            const object = {};

            const formData = new FormData(form); // автоматически будет взять с форма все данные
            // чтобы formDATA сработала надо в верстке обязательно указать name"phone or Name"

            // в консоли можео делать и медленное 3 g

            formData.forEach(function (value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object); // превращает обычный объект в json

            // request.send(formData);
            request.send(json); // comparison the demand of our servis

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    // statusMessage.textContent = message.success;
                    showThanksModal(message.success);
                    form.reset(); // чтобы очистить форму.. альтернатив брать инпуты перебрать их и очистить их value
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    // statusMessage = message.failure;
                    showThanksModal(message.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class = "modal__close" data-close>&times;</div>
            <div class = "modal__title">${message}</div>
        
        
        </div>
        
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});
