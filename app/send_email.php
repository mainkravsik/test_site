<?php
// Включение отображения ошибок
ini_set('display_errors', 1);
error_reporting(E_ALL);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Убедитесь, что PHPMailer установлен

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // Настройки SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.yandex.ru'; // Адрес сервера Gmail
        $mail->SMTPAuth = true; // Включение авторизации
        $mail->Username = 'mainkravsik@yandex.ru'; // Ваша почта
        $mail->Password = 'acqlqtwqmtzvlagz'; // Пароль приложения, созданный на шаге 2
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Шифрование соединения
        $mail->Port = 587; // Порт сервера

        // От кого письмо
        $mail->setFrom('mainkravsik@yandex.ru', 'NZMI Website');

        // Кому письмо
        $mail->addAddress('mainkravsik@gmail.com'); // Укажите свою почту

        // Тело письма
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8'; // Устанавливаем кодировку UTF-8
        $mail->Subject = 'Новая заявка с сайта'; // Тема письма
        $mail->Body = "Имя: $name<br>Email: $email<br>Телефон: $phone<br>Сообщение:<br>$message"; // Тело письма
        $mail->Timeout = 60; // Таймаут в секундах
        $mail->SMTPKeepAlive = true; // Сохранять соединение
        $mail->SMTPDebug = 3; // Уровень отладки для максимальной детализации
        
        $mail->send(); // Уровень отладки: 2 - показывает протокол SMTP и ошибки
        $mail->Debugoutput = 'html'; // Формат вывода (в данном случае HTML для удобства просмотра в браузере)
        echo 'Сообщение успешно отправлено!';
    } catch (Exception $e) {
        echo "Ошибка при отправке: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(405);
    echo 'Метод не поддерживается.';
}
