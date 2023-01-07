import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTImerId) {
    // send forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так',
    };

    forms.forEach((item) => {
        bindPostData(item); // shift + F5 чтобы сбросить все данные(kesh)
    });

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
        openModal('.modal', modalTImerId);

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
            closeModal('.modal');
        }, 4000);
    }
    // getting database
    //in requests (db.json) будут записываться обращение пользователя когда он отправляем форму с сайта
    // fetch('db.json')
    fetch('http://localhost:3000/menu')
        .then((data) => data.json())
        .then((res) => console.log(res)); // здесь превратиться в обычный js объект
}

export default forms;
