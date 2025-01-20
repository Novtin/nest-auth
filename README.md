# Steroids Nest: Модуль авторизации

Модуль авторизации для библиотеки [Steroids Nest](https://github.com/steroids/nest)

## Предназначение

Модуль позволяет быстро внедрить в проект функциональность, связанную с авторизацией и аутентификацией:
- JWT-авторизация
- аутентификация по почте, по номеру телефона
- подтверждение действий по коду на номер телефона
- управление сессиями пользователей
- разграничение доступа на основе ролей и их прав
- обновление пароля

## Быстрый старт

todo

## Устройство модуля

### Конфигурация

---

Конфигурация модуля определена интерфейсом `IAuthModuleConfig`.

`jwtAccessSecretKey?: string`

Секретный ключ для подписи  access токена (JWT).

`jwtRefreshSecretKey?: string`

Секретный ключ для подписи refresh токена (JWT).

`accessTokenExpiresSec?: string`

Время жизни access токена.

`refreshTokenExpiresSec?: string`

Время жизни refresh токена.

`filesTokenAdditionalTime?: string`

Дополнительный срок действия токена для `FilesAuthGuard`.

`confirm.expireMins?: number`

Время в минутах, через которое код подтверждения станет недействительным.

`confirm.repeatLimitSec?: number`

Время в секундах, которое ограничивает возможность повторной отправки кода.

`confirm.attemptsCount?: number`

Количество попыток ввода правильного кода подтверждения.

`confirm.smsCodeLength?: number`

Длина кода подтверждения, который отправляется пользователю через SMS.

`confirm.callCodeLength?: number`

Длина кода подтверждения для звонка.

`confirm.isEnableDebugStaticCode?: boolean`

Включение режима отладки с использованием статического кода подтверждения.

`confirm.providerName?: 'smsc' | string`

Название провайдера для отправки кодов подтверждения.

`confirm.providerType?: 'voice' | 'sms' | 'call'`

Тип провайдера для отправки кода подтверждения.

---

### Модели

---

### AuthRoleModel

Роль в приложении. Имеет возможность наследования родительской роли.

### AuthPermissionModel

Права доступа роли.

### AuthLoginModel

Информация о сессиях пользователя.

### AuthConfirmModel

Данные о кодах подтверждения пользователя.

---

### Доменные сервисы

---

### AuthLoginService

Отвечает за создание и отзыв токенов, а также за управление сессиями пользователей.
Сохраняет в базу данных информацию о сессии пользователя, включающию данные о refresh и access токенах, способе и статусе входа для конкретного пользователя.

### AuthRoleService

Обеспечивает CRUD операции для ролей пользователей, автозаполнение ролями для полей на фронтенде

### AuthPermissionsService

Предназначен для работы с правами доступа ролей,
включая получение списка разрешений для заданных ролей,
проверку наличия прав доступа у ролей, создание новых прав,
получения дерева прав.

### AuthConfirmService

Предназначен для управления процессом подтверждения пользователя при его аутентификации, используя SMS, голосовые сообщения или звонки на телефон.
Основные функции включают отправку кодов подтверждения и проверку их корректности.

### AuthService

Обеспечивает регистрацию и аутентификацию пользователя, выход из приложения, создание DTO, который содержит информацию о текущем пользователе.

---

### Инфраструктурные сервисы

---

### SessionService

Сервис SessionService предоставляет функциональность для работы с паролями и токенами, используя библиотеки bcryptjs и @nestjs/jwt.
Основные функции включают хеширование пароля, сравнение хешированного пароля с нехешированным, подпись и верификация JWT, извлечение данных из JWT.

---

### HTTP-контроллеры

---

### AuthController

Содержит эндпоинты для аутентификации пользователя, выхода из приложения, обновления пароля и JWT.

### AuthPermissionController

Содержит эндпоинты для получения дерева прав доступа приложения и прав роли.

### AuthPhoneController

Содержит эндпоинты для отправки кода подтверждения на телефон с помощью SMS или звонка, проверки кода. Также есть эндпоинт для типа отправки, взятого из конфига.

### AuthRoleController

Содержит эндпоинты для CRUD операций с ролями пользователей и автозаполнения для фронтенда.

---

### Guards

---

### JwtAuthGuard

Проверяет валидность JWT переданного в заголовке Authorization.

### LoginPasswordAuthGuard

Проверяет валидность логина и пароля из тела запроса.

### PhoneCodeAuthGuard

Проверяет валидность кода подтверждения из тела запроса.

### RolesAuthGuard

Проверяет наличие прав доступа пользователя к конкретному эндпоинту.

### FilesAuthGuard

Проверяет валидность JWT переданного в заголовке Cookie.
Используется для проверки доступа к файлам.

---

### Декораторы

---

### AuthPermissions

Устанавливает и проверяет права доступа, которые должны быть у пользователя, для конкретного эндпоинта.
Для проверки использует `RolesAuthGuard`.

## Расширение функциональности

todo
