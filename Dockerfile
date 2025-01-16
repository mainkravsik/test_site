# Используем официальный образ Nginx
FROM nginx:alpine

# Копируем содержимое сайта в папку для сервера Nginx
COPY app/ /usr/share/nginx/html

# Открываем порт 80 для доступа к сайту
EXPOSE 80
FROM php:8.1-fpm

# Установите необходимые зависимости
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo mbstring zip

# Установите Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer