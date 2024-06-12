#language: ru

  Функционал: Регистрация и логин пользователей
    Как анонимный пользователь
    Мне необходима возможность пользоваться сайтом
    Для чего я могу зарегистрироваться и залогиниться

  Сценарий: Регистрация пользователя
    Допустим я нахожусь настранице "/register"
    Если  я ввожу "test@test.com" в поле "E-mail"
    И я ввожу "123qwe@" в поле "password"
    И я нажимаю на кнопку "Sign Up"
    То я вижу текст "HELLO TEST@TEST.COM!"