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

    //for gettin from database
    const getResourses = async (url) => {
        const res = await fetch(url);

        // fetch has limitation that with catch cannot return problem when it's 404 therefore writedown so .ok status

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); // приходит в нормальном формате
    };

    getResourses('http://localhost:3000/menu').then((data) => {
        ///first method
        data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(
                img,
                altimg,
                title,
                descr,
                price,
                '.menu .container'
            ).render();
        });
    });

    // second method when only one time we append something

    // getResourses('http://localhost:3000/menu').then((data) => createCard(data));

    //third method by axios

    // axios.get('http://localhost:3000/menu').then((data) => {
    //     data.data.forEach(({ img, altimg, title, descr, price }) => {
    //         // data.data что мы обращаемся объекту в в этой библиотеке так устроена
    //         new MenuCard(
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             '.menu .container'
    //         ).render();
    //     });
    // });
    // function createCard(data) {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //             `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }
    // everything is gotten by server and put inside constructor

    //each element we call object because inside array there are different array// there are also desctuction

    // new MenuCard( this in need when we don't work with server
    //     'img/tabs/vegy.jpg',
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    //     'menu__item',
    //     'big'
    // ).render();

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
        bindPostData(item); // shift + F5 чтобы сбросить все данные(kesh)
    });

    const postData = async (url, data) => {
        // это означает что внутри функции будет асинхронный код
        // во время запроса обработать данных
        const res = await fetch(url, {
            //блогадаря асинхронности код подождет пока выполнится код а потом уж пойдет присваивание
            method: 'POST',
            headers: {
                'Content-type': 'application/json', // все будет пока что поститься в формате json
            },
            body: data,
        });

        return await res.json(); //возвращаем в формате json но чтобы ожидал вернутие надо тоже набрать await
    };

    function bindPostData(form) {
        // это связать какой пост данных
        form.addEventListener('submit', (e) => {
            // кнопка в форуме автоматически принимает submit
            e.preventDefault();

            // let statusMessage = document.createElement('div');
            // statusMessage.classList.add('status');
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;`;

            // statusMessage.textContent = message.loading;
            // form.append(statusMessage);1 WAY
            // 2 WAY of adding element to page

            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();

            // request.open('POST', 'server.php');

            // request.setRequestHeader(
            //     'Content-type',
            //     'application/json; charset=utf-8'
            // ); when use formdata and xmlrequest header we should not use
            // а если наш сервер принимает в json формете то тогда нужет заголовок
            // request.setRequestHeader('Content-type', 'application/json');

            // в консоли можео делать и медленное 3 g
            const formData = new FormData(form); // автоматически будет взять с форма все данные
            // чтобы formDATA сработала надо в верстке обязательно указать name"phone or Name"

            ///
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });
            ///
            //instead of this forEach we can do so
            // const json = JSON.stringify(object); // превращает обычный объект в json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // for doing array in array from object entries

            // request.send(formData);
            // request.send(json); // comparison the demand of our servis

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         // statusMessage.textContent = message.success;
            //         showThanksModal(message.success);
            //         form.reset(); // чтобы очистить форму.. альтернатив брать инпуты перебрать их и очистить их value
            //         setTimeout(() => {
            //             statusMessage.remove();
            //         }, 2000);
            //     } else {
            //         // statusMessage = message.failure;
            //         showThanksModal(message.failure);
            //     }
            // });

            // fetch('server.php', {
            //     // если адрес указан не правильно cathc (reject) не будет выполняться. а при отключение интернета будет выполныяться
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json',
            //     },
            //     body: JSON.stringify(object),
            // }); это код уже старый так как вместо этого существует функция post data

            postData('http://localhost:3000/requests', json)
                // .then((data) => data.text()) // превращаем в обычные текст
                .then((data) => {
                    console.log(data); // data те данные которые возвращаются с promisess
                    showThanksModal(message.success);

                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
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
    // getting database
    //in requests (db.json) будут записываться обращение пользователя когда он отправляем форму с сайта
    // fetch('db.json')
    fetch('http://localhost:3000/menu')
        .then((data) => data.json())
        .then((res) => console.log(res)); // здесь превратиться в обычный js объект

    // json-server db.json for working with server

    // slider

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    // если поставить внутри функции показатель не будет правильным
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';

    slidesField.style.display = 'flex';
    slidesField.style.transtion = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');

    indicators.style.cssText = `  position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;`;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `  box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;`;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);

        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        // if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            // for removing px from the number we use slice
            offset = 0;
        } else {
            // offset += +width.replace(/\D/g, '');
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => (dot.style.opacity = '.5'));
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => (dot.style.opacity = '.5'));
        dots[slideIndex - 1].style.opacity = 1;
    });
    // showSlides(slideIndex);

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     // hide others

    //     slides.forEach((item) => (item.style.display = 'none'));

    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides((slideIndex += n));
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // second methods of doing slide

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach((dot) => (dot.style.opacity = '.5'));
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    //calC

    const result = document.querySelector('.calculating__result span');

    let sex = 'female',
        height,
        weight,
        age,
        ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; // Можете придумать что угодно
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
            );
        } else {
            result.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
            );
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }

                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation(
        '.calculating__choose_big',
        'calculating__choose-item_active'
    );

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDinamicInformation('#height');

    getDinamicInformation('#weight');

    getDinamicInformation('#age');
});
