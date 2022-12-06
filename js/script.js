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

    const deadline = '2022-12-20'; // input с type data возвращает с таким форматом так что лучше привыкать так
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
});
