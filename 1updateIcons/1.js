document.addEventListener('DOMContentLoaded', () => {
	const toggleButton = document.getElementById('toggleButton');
	const icon = document.getElementById('icon');

	// Определяем содержимое иконок
	const icon1 = '<circle cx="12" cy="12" r="10" fill="blue" />';
	const icon2 = '<rect x="4" y="4" width="16" height="16" fill="red" />';

	// Переменная для отслеживания текущей иконки
	let isIcon1 = true;

	toggleButton.addEventListener('click', () => {
		if (isIcon1) {
			icon.innerHTML = icon2;
		} else {
			icon.innerHTML = icon1;
		}
		isIcon1 = !isIcon1; // Переключаем состояние
	});
});
