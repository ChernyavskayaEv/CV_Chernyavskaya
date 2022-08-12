<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail ->CharSet = 'UTF-8';
$mail ->setLanguage('ru', 'en', 'phpmailer/language/');
$mail ->IsHTML(true);

$mail ->setFrom('указать адрес почты для отправки', 'Форма резюме');
$mail ->addAddress('chernyavskaya_ev@mail.ru');
$mail -> Subject = 'Обратная связь со страницы резюме';


$body = '<h1>Встречай долгожданное письмо!</h1>';

 if(trim(!empty($_POST['name']))){
  $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
 }
 if(trim(!empty($_POST['email']))){
  $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
 }
 if(trim(!empty($_POST['telephone']))){
  $body.='<p><strong>Телефон:</strong> '.$_POST['telephone'].'</p>';
 }
  if(trim(!empty($_POST['message']))){
  $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
 }

$mail ->Body = $body;

if(!$mail ->send()) {
  $message = 'Error';
} else {
  $message = 'Data sent!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>