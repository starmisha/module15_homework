// Дождёмся полной загрузки документа
document.addEventListener('DOMContentLoaded', () => {
	// Находим кнопку по её ID
	const button = document.getElementById('showScreenSize');

	// Добавляем обработчик события клика
	button.addEventListener('click', () => {
		// Получаем ширину и высоту экрана
		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;

		// Получаем ширину и высоту окна браузера
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Формируем сообщение для alert
		const message = `
          Размер экрана:
          Ширина: ${screenWidth}px
          Высота: ${screenHeight}px

          Размер окна браузера:
          Ширина: ${windowWidth}px
          Высота: ${windowHeight}px
        `;

		// Выводим сообщение
		alert(message);
	});
});
