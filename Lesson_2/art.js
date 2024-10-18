// На странице есть список элементов, каждый из которых имеет атрибут data-price, содержащий цену товара. 
// Создайте функцию, которая принимаег максимальную цену и скрывает все элементы с ценой выше указанного значения.
const filterElementsByDataAttribute = (attributeName, maxPrice) => {
    
    const elements = Array.from(document.querySelectorAll(`[${attributeName}]`));
    elements.forEach(element => {
        const price = parseFloat(element.getAttribute(attributeName));
        if (price > maxPrice) {
            element.style.display = 'none';
        }
    });
}

// Пример использования функции
filterElementsByDataAttribute('data-price', 50);
// На странице есть список элементов, каждый из которых имеет атрибут data-rating, содержащий рейтинг товара.
// создайте функцию, которая сортирует элементы в порядке убыания рейтинга и представляет их на странице в соответствии с новым порядком.

const sortElementsByDataAttribute = attributeName => {
    const rating = document.querySelector('.rating');
    const elements = Array.from(document.querySelectorAll(`[${attributeName}]`));
    elements.sort((a, b) => {
        const ratingA = parseInt(a.getAttribute(attributeName));
        const ratingB = parseInt(b.getAttribute(attributeName));
        return ratingB - ratingA;
    });
    elements.forEach(element => {
        rating.appendChild(element);
    });

};

// Пример использования функции

sortElementsByDataAttribute('data-rating');