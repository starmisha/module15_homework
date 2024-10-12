document.addEventListener('DOMContentLoaded', () => {
	const wsUrl = 'wss://echo-ws-service.herokuapp.com';
	let socket;

	const chatMessages = document.getElementById('chatMessages');
	const sendButton = document.getElementById('sendButton');
	const messageInput = document.getElementById('messageInput');

	// Функция для инициализации WebSocket
	function initWebSocket() {
		socket = new WebSocket(wsUrl);

		socket.addEventListener('open', () => {
			console.log('Соединение установлено.');
			addSystemMessage('Соединение установлено.');
		});

		socket.addEventListener('message', (event) => {
			console.log('Получено сообщение от сервера:', event.data);
			addReceivedMessage(event.data);
		});

		socket.addEventListener('close', () => {
			console.log('Соединение закрыто.');
			addSystemMessage('Соединение закрыто. Перезапуск...');
			// Попытка переподключения через 3 секунды
			setTimeout(initWebSocket, 3000);
		});

		socket.addEventListener('error', (error) => {
			console.error('Ошибка WebSocket:', error);
			addSystemMessage('Ошибка соединения. Попытка переподключения...');
			socket.close();
		});
	}

	// Запускаем WebSocket
	initWebSocket();

	// Функция для добавления системных сообщений
	function addSystemMessage(text) {
		const messageElement = document.createElement('div');
		messageElement.classList.add('message', 'received');
		const textElement = document.createElement('div');
		textElement.classList.add('text');
		textElement.style.backgroundColor = '#f1f0f0';
		textElement.style.fontStyle = 'italic';
		textElement.textContent = text;
		messageElement.appendChild(textElement);
		chatMessages.appendChild(messageElement);
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}

	// Функция для добавления отправленного сообщения
	function addSentMessage(text) {
		const messageElement = document.createElement('div');
		messageElement.classList.add('message', 'sent');
		const textElement = document.createElement('div');
		textElement.classList.add('text');
		textElement.textContent = text;
		messageElement.appendChild(textElement);
		chatMessages.appendChild(messageElement);
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}

	// Функция для добавления полученного сообщения
	function addReceivedMessage(text) {
		const messageElement = document.createElement('div');
		messageElement.classList.add('message', 'received');
		const textElement = document.createElement('div');
		textElement.classList.add('text');
		textElement.textContent = text;
		messageElement.appendChild(textElement);
		chatMessages.appendChild(messageElement);
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}

	// Функция для отправки сообщения
	function sendMessage() {
		const message = messageInput.value.trim();
		if (message === '') {
			return; // Не отправлять пустые сообщения
		}

		if (socket.readyState === WebSocket.OPEN) {
			socket.send(message);
			addSentMessage(message);
			messageInput.value = '';
			messageInput.focus();
		} else {
			addSystemMessage('Соединение не установлено. Попробуйте позже.');
		}
	}
	function sendLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				const locationMessage = `Геолокация: ${latitude}, ${longitude}`;
				if (socket.readyState === WebSocket.OPEN) {
					socket.send(locationMessage);
					addSentMessage(locationMessage);
				} else {
					addSystemMessage('Соединение не установлено. Попробуйте позже.');
				}
			}, (error) => {
				console.error('Ошибка геолокации:', error);
				addSystemMessage('Ошибка геолокации.');
			});
		} else {
			addSystemMessage('Геолокация не поддерживается браузером.');
		}
	}

	// Обработчик клика на кнопку "Отправить"
	sendButton.addEventListener('click', () => {
		sendMessage();
	});
	// Обработчик клика на кнопку "Отправить геолокацию"
	locationButton.addEventListener('click', () => {
		sendLocation();
	});


	// Обработчик нажатия клавиши Enter в поле ввода
	messageInput.addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			sendMessage();
		}
	});
});
