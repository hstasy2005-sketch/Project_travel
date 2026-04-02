// validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .select select.is-danger').forEach(function(el) {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(function(el) { el.remove(); });

        let isValid = true;

        // 1. Проверка ФИО (не пустое, минимум 2 слова)
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();

        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else if (fullnameValue.split(' ').filter(function(w) { return w.length > 0; }).length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }

        // 2. Проверка email (не пустой, содержит @ и .)
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        const topic = document.getElementById('topic');
        const topicValue = topic.value;

        if (topicValue === '') {
            showSelectError(topic, 'Выберите тему обращения');
            isValid = false;
        }

        // Если всё корректно - отправляем событие
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                email: emailValue,
                topic: topicValue,
                message: document.getElementById('message').value.trim() || '(не заполнено)'
            };

            const validEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(validEvent);

            alert('Форма отправлена! Данные в консоли.');
        }
    });

    // Функция показа ошибки
    function showError(input, message) {
        input.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        input.parentNode.parentNode.appendChild(help);
    }

    function showSelectError(select, message) {
        select.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        select.closest('.field').appendChild(help);
    }

    // Сброс ошибки при вводе
    document.querySelectorAll('.input, .textarea').forEach(function(input) {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const parent = this.parentNode.parentNode;
            const errors = parent.querySelectorAll('.help.is-danger');
            errors.forEach(function(el) { el.remove(); });
        });
    });

    const topicSelect = document.getElementById('topic');
    if (topicSelect) {
        topicSelect.addEventListener('change', function() {
            this.classList.remove('is-danger');
            const field = this.closest('.field');
            field.querySelectorAll('.help.is-danger').forEach(function(el) {
                el.remove();
            });
        });
    }
});
