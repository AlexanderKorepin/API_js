// console.log(navigator.userAgent);
// console.log(navigator.cookieEnabled);
// console.log(navigator.doNotTrack);
// console.log(navigator.geolocation);
// Здесь:
// userAgent — информация о браузере;
// cookieEnabled — включены ли coockie;
// doNotTrack — включена ли опция запрета на отслеживание;
// platform — текущая ОС пользователя;
// geolocation — геолокация, в данном случае не активированная.
//----------------------------------------------------------------
//задание 1
//Напишите функцию findClosestCity(useLocation,cities), которая принимает текущее местоположение пользователя
// в формате [latitude,longitude] и массив городов и их координатами в формате {name: 'City',location: [latitude,longitude]}. Функция должна вернуть 
// назвыние ближайшего города к пользователю. 

function calculateDistance (location1, location2) {
    const [lat1, lon1] = location1; // разбивает координаты первого местоположения на широту и долготу
    const [lat2, lon2] = location2; // разбивает координаты второго местоположения на широту и долготу
    const toRad = value => (value*Math.PI)/180;// Преобразует значения в радианы
    const R = 6371; // Радиус Земли

    const dLat = toRad(lat2 - lat1);// Вычисляет разницу широты в радианах
    const dLon = toRad(lon2 - lon1);// Вычисляет разницу долготы в радианах
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) + //вычисляет квадрат синуса половины разницы широты
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);// вычисляет квадрат синуса половины разницы долготы
        // и учитывает косинусы широт
    const c = 
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); // вычисляет центральный  угол  между двумя точками
    const distance = R * c; // вычисляет расстояние между двумя точками в километрах
    return distance; // возвращает расстояние в километрах
}
function findFastestCity (cities) {
    return new Promise((resolve, reject)  => {
        if (navigator.geolocation) { // Проверяем поддержку геолокации в браузере
            navigator.geolocation.getCurrentPosition(
                position => {
                    const userLocation = [position.coords.latitude, position.coords.latitude];// получаем текущие координаты пользователя
                    let closestCity = null;// пременная для хранения ближайшего города
                    let shortestDistance = Infinity;// переменная для хранения ближайшего растояния
                    cities.forEach(city => {// перебирает все города из массива cities
                        const distance = calculateDistance(userLocation, city.location); // вычисляем расстояние до каждого города
                        if (distance < shortestDistance) { // если расстояние меньше текущего минимального
                            closestCity = city.name; // записывает имя текущего города в  closestCity
                            shortestDistance = distance; // записывает текущее расстояние в shortestDistance                     
                        }
                    });
                    resolve(closestCity);// Возвращает ближайший город
                },
                error => {
                    if (error.code === Error.PERMISSION_DENIED) { // Если пользователь отказал от доступа к геолокации
                        reject(new Error('Permission denied')); // Доступ запрещен
                    } else {
                        reject(new Error('Не удалось определить местоположение')); // Error
                    }                                   
                }
            );
        }else {
            reject(new Error('Geolocation is not supported by this browser')); // Если геолокация не поддерживается в браузере
        }
    });
}
// Пример использования
const cities = [
    {name: 'Москва', location: [55.75, 37.5]},
    {name: 'Санкт-Петербург', location: [59.93, 30.33]},
    {name: 'Новосибирск', location: [55.04, 82.93]},

    //... добавьте другие города

];

findFastestCity(cities)
    .then(closestCity =>{
        console.log(`Ближайший город: ${closestCity}`)
    })
    .catch(err =>{
        console.log(err.message);
    });



