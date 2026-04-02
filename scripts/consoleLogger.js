// consoleLogger.js
document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие formValid, которое диспатчит validation.js
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы из события
        const formData = event.detail;

        // Очищаем консоль для наглядности (опционально)
        console.clear();

        // Построчный вывод данных
        console.log('Имя:', formData.fullname);
        console.log('Email:', formData.email);
        console.log('Тема:', formData.topic);
        console.log('Сообщение:', formData.message);

        // Вывод временной метки
        const timestamp = new Date().toLocaleString();
        console.log('Время отправки:', timestamp);
    });
});
