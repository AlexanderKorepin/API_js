document.addEventListener("DOMContentLoaded", function () {
    const imageBox = document.getElementById("box"); // коробка для картинок
    const previousButton = document.getElementById("previous-btn"); // кнопка "Предыдущее изображение"
    const nextButton = document.getElementById("next-btn"); // кнопка "Следующее изображение"
    const navDot = document.querySelectorAll(".dot"); // навигационные точки
  
    let currentIndex = 3; // индекс изображения (середина)
  
    // метод для отображения изображения по указанному индексу
    function showImage(index) {
      const transformValue = -index * 100 + "%";
      imageBox.style.transform = "translateX(" + transformValue + ")";
    }
  
    // метод для обновления активной точки в навигации
    function updatenavDot(index) {
      navDot.forEach((dot) => dot.classList.remove("active-dot"));
      navDot[index].classList.add("active-dot");
    }
  
    // метод для переключения на предыдущее изображение
    function previousImage() {
      currentIndex = (currentIndex - 1 + navDot.length) % navDot.length;
      showImage(currentIndex);
      updatenavDot(currentIndex);
    }
  
    // метод для переключения на следующее изображение
    function nextImage() {
      currentIndex = (currentIndex + 1) % navDot.length;
      showImage(currentIndex);
      updatenavDot(currentIndex);
    }
  
    // метод для переключения на изображение по указанному индексу
    function goToImage(index) {
      currentIndex = index;
      showImage(currentIndex);
      updatenavDot(currentIndex);
    }
  
    // обработчики событий на кнопки и точки
    previousButton.addEventListener("click", previousImage);
    nextButton.addEventListener("click", nextImage);
  
    navDot.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        goToImage(index);
      });
    });
  
    showImage(currentIndex);
    updatenavDot(currentIndex);
  
  });