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

const getResourses = async (url) => {
    const res = await fetch(url);

    // fetch has limitation that with catch cannot return problem when it's 404 therefore writedown so .ok status

    if (!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json(); // приходит в нормальном формате
};

export { postData };
export { getResourses };
