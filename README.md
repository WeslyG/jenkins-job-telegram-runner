# Телеграмм бот для запуска jenkins jobs

# Зависимости:
* Бот привязывается к jenkins - имейте это в виду, когда будете размещать бота
* node 8+

# Конфигурация
* Заполнить параметры подключения к jenkins в файле ./credential/config.js
* jenkins token можно посмотреть на вкладке https://yourjenkins.com/user/username/configure
* Заполнить url до нужных jobs в Jenkins (по примеру внутри файла)
* Создать телеграмм бота, вписать его token в поле telegramBotToken

# Инструкция по установке
* npm install
* npm start

# Запуск
Локально запустить можно командой npm start
После успешного запуска, по нажатию кнопки, будет выполняться Jeknins jobs, а так же идти проверка, на ее состояние, и после выполнения отдаваться отчет + логирование! 


# Собрать контейнер

```
docker build -t telegram-bot .
```
* Запустить:

```
docker run -d telegram-bot
```
