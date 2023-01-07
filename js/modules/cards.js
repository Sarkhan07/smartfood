import { getResourses } from '../services/services';

function cards() {
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
}

export default cards;
