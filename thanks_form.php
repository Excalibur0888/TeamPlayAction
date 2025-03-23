<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $tel = isset($_POST["tel"]) ? $_POST["tel"] : "";
    $message = isset($_POST["message"]) ? $_POST["message"] : "";
    
	$to = "contact@" . $_SERVER['HTTP_HOST'];
    $subject = "Новая заявка с сайта";
    $body = "Имя: $name\n";
    $body .= "Email: $email\n";
    $body .= "Телефон: $tel\n";
    if (!empty($message)) {
        $body .= "Сообщение: $message\n";
    }
    
    $headers = "From: $to \r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
    
    mail($to, $subject, $body, $headers);
    // Redirect to thank you page
    header("Location: thanks.html");
    exit();
}
?>
