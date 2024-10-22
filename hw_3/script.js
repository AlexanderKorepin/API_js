// Цель: Разработать веб-приложение, которое каждый день будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
// • Отобразите информацию о фотографе под изображением.

// * Дополнительные задачи (по желанию):

// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
// • Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров.

const photoBox = document.getElementById('photo-box');
const photoName = document.getElementById('photo-name');
const photographerName = document.getElementById('photographer-name');
const likeBtn = document.getElementById('like-btn');
const likesCounter = document.getElementById('likes-counter');
let page = Math.floor(Math.random() * 100) + 1;

async function fetchPhoto() {
    const apiKey = '2tFGw0PvVEG108XaOuWm7KJKYS127AU0NlClSyIMwoQ';
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos?page=${page}&per_page=1&client_id=${apiKey}`
        );

        const photo = await response.json();
        console.log(photo); // Проверка загрузки
        return photo;
    } catch (error) {
        console.error('Ошибка при загрузке фотографий: ', error);
        return [];
    }
}

async function loadMorePhoto() {
    const photo = await fetchPhoto();
    console.log(photo); // Проверка загрузки

    const photoElem = photo[0].urls.small;
    const imgElem = document.createElement('img');
    imgElem.src = photoElem;
    photoBox.appendChild(imgElem);

    const photoNameElem = photo[0].alt_description;
    const info1 = document.createElement('h3');
    info1.textContent = `${photoNameElem}`;
    photoName.appendChild(info1);

    const nameUserElem = photo[0].user.first_name;
    const info2 = document.createElement('h3');
    info2.textContent = `${nameUserElem}`;
    photographerName.appendChild(info2);

    let likeElem = photo[0].likes;
    likesCounter.textContent = `${likeElem}`;
    likeBtn.addEventListener('click', () => {
        likeElem = likeElem + 1;
        likesCounter.textContent = `${likeElem}`;
    });
}

loadMorePhoto(page);