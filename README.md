Области хранения данных:

- БД на json-server
- BFF (локальный)
- redux store

Сущности приложения:

- Пользователь: БД (список пользователей), BFF (сессия текущего пользователя), store (отображение в браузере)
- Роль: БД (список ролей), BFF (сессия пользователя с ролью), store (использование на клиенте)
- Статья: БД (список статей), store (отображение статей на клиенте)
- Комментарии: БД (список комментариев), store (отображение на клиенте)

Таблицы БД:

- Пользователи - users: id / login / password / registed_at / role_id
- Роль - roles: id / name
- Статьи - posts: id / title / image_url / content / published_at
- Комментарии - comments: id / author_id / post_id / content / published_at

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для redux store:

- user: id / login / roleId / session
- posts: array post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: array comment: id / author / content / publishedAt
- users: array user: id / login / registed_at / role
