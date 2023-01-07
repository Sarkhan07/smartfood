function openModal(modalSelector, modalTImerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTImerId);
    if (modalTImerId) {
        clearInterval(modalTImerId); // если сам открыл то надо очистить
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTImerId) {
    /// modal
    //for easily getting from html data-modal add in tag

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    // modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () =>
            openModal(modalSelector, modalTImerId)
        ); // for not being called before click, we use arrow function
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

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            // чтобы получить атрибут того куда нажимали и закрыть окно
            closeModal(modalSelector); // здесь вызываем потому что надо выполнить после условия
            // modal.classList.add('hide');
            // modal.classList.remove('show');
            // document.body.style.overflow = '';
            // но здесь повторение вверхнего кода это не хорошая практика Do not repeat yourself
        }
    });

    // esq close the modal// with keydown// keycpde.info we can search all keys code
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // poping up after 5 sec

    // task modal will open after certain scrolling

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal(modalSelector, modalTImerId);
            window.removeEventListener('scroll', showModalByScroll); // то есть как только открылся уже убрать обработчика чтобы больше не открылся
        } // I => pagexoffset прокрученная часть + II => видимая часть на экране = общая высота сайта с учетом прокрутки .. но лучше - 1 для страховки добавитьЫ
    } // { once: true } // чтобы обработчик только раз сработал но это здесь не подходит так акак обработчик на windows

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы
}

export default modal;

export { closeModal };
export { openModal };
