<?php
	
	session_start();
	
	$win = "true";
	
	// Если существует переменная POST, то
	if ( $_POST ) {
		// Отправляем данные в Google
		function getCaptcha($SecretKey){
			$Response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LdV1IcUAAAAABnQ0mXIp5Yh7tLEcAXzdqG6rx9Y&response={$SecretKey}");
			$Return = json_decode($Response);
			return $Return;
		}
		
		/* Принимаем данные обратно */
		$Return = getCaptcha($_POST['g-recaptcha-response']);
		// Если вероятность робота более 0.5, то считаем отправителя человеком и выполняем отправку почты
		if( $Return->success == true && $Return->score > .125 ){
			
			$token = "7637946124:AAGtIRdbQVoNi82RVGvb6syTJ6ZQk3l5jOU";
			$chat_id = "-4796917309";
			
			$mail = $_POST['mail'];	
			$message = "Заявка на индивидуальное предложение с сайта газмастер62.рф";
			$message .= " Email: " . $mail;
			
			mail( "", "Заявка на индивидуальное предложение с сайта газмастер62.рф", $message	); // gazmaster62@mail.ru
			$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text={$message}","r"); //&parse_mode=html
			$_SESSION['win'] = 1;
			$_SESSION['recaptcha'] = '<p class="text-light">Спасибо за проявленный интерес к нам. Мы&#160;свяжемся с Вами в ближайшее время.</p>';
			header("Location: ".$_SERVER['HTTP_REFERER']);
		
		} else {
			// Иначе считаем отправителя роботом и выводим сообщение с просьбой повторить попытку
			$_SESSION['win'] = 1;
			$_SESSION['recaptcha'] = '<p class="text-light"><strong>Извините!</strong><br>Ваши действия похожи на робота. Пожалуйста повторите попытку!</p>';
			header("Location: ".$_SERVER['HTTP_REFERER']);
		}
	}
	
?>