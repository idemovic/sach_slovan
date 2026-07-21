<?php
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;

/* CONFIG - dev: docroot public/, config in repo root (../../)
   prod: docroot dist/, config one level above webroot (../../../) */
$config = false;

foreach (['/../../.env.slovan', '/../../../.env.slovan'] as $candidate) {
    if (is_readable(__DIR__ . $candidate)) {
        $config = parse_ini_file(__DIR__ . $candidate, true);
        break;
    }
}

if (!$config) {
    echo "config_missing";
    exit;
}

/* HONEYPOT CHECK */
if (!empty($_POST['website'] ?? '')) {
    echo "spam";
    exit;
}

/* TURNSTILE VERIFICATION */
$secretKey = $config['cloudflare_turnstile']['secret_key'];;
$token = $_POST['cf-turnstile-response'] ?? '';

if (!$token) {
    echo "turnstile_missing";
    exit;
}

$verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

$data = [
    'secret' => $secretKey,
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$options = [
    'http' => [
        'method'  => 'POST',
        'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query($data),
        'timeout' => 5
    ]
];

$context = stream_context_create($options);
$result = @file_get_contents($verifyUrl, false, $context);

if (!$result) {
    echo "turnstile_error";
    exit;
}

$response = json_decode($result, true);

if (empty($response['success'])) {
    echo "turnstile_failed";
    exit;
}

/* SEND EMAIL */
$mail = new PHPMailer(true);

try {
    // Input validation
    $name    = trim($_POST['name'] ?? '');
    $email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $package = trim($_POST['package'] ?? '');
    $subject = trim($_POST['subject'] ?? 'Kontakt ');
    $message = trim($_POST['message'] ?? '');

    if (!$name || !$email || !$message) {
        echo "invalid_input";
        exit;
    }

    // Server settings
    $mail->isSMTP();
    $mail->Host       = $config['smtp_settings']['host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_settings']['user'];
    $mail->Password   = $config['smtp_settings']['pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $config['smtp_settings']['port'];

    // Recipients
    $mail->setFrom($config['email_settings']['from_address'], 'ŠK Slovan Bratislava - Kontakt');
    $mail->addAddress($config['email_settings']['to_address']);
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(false);
    $mail->CharSet  = PHPMailer::CHARSET_UTF8;
    $mail->Encoding = PHPMailer::ENCODING_BASE64;
    $mail->Subject = $subject;

    $mail->Body =
        "Meno: $name\n" .
        "Email: $email\n" .
        ($package ? "Úroveň: $package\n" : "") .
        "\nSpráva:\n$message";

    $mail->send();

    echo "success";
} catch (Exception $e) {

    echo "mail_failed"; // In dev, you can use $mail->ErrorInfo to see why
    //    var_dump($mail->ErrorInfo);
}
