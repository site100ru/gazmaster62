<?php
	session_start();
	$win = "true";
	// Если существует переменная POST, то
	
	/*
	if($_POST){
		// Отправляем данные в Google
		function getCaptcha($SecretKey){
			$Response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LdV1IcUAAAAABnQ0mXIp5Yh7tLEcAXzdqG6rx9Y&response={$SecretKey}");
			$Return = json_decode($Response);
			return $Return;
		}
		
		print_r( $Return );
		
		/* Принимаем данные обратно
		$Return = getCaptcha($_POST['g-recaptcha-response']);
		// Если вероятность робота более 0.5, то считаем отправителя человеком и выполняем отправку почты
		if( $Return->success == true && $Return->score > 1 ){ */
			
			$mail = $_POST['mail'];	
			/*$tel = $_POST['tel'];	*/
			mail( "tanya-makhunova@ya.ru", "Заявка с сайта.", "
				Email: " . $mail
			);	
			$_SESSION['win'] = 1;
			$_SESSION['recaptcha'] = '<p class="text-light">Спасибо за проявленный интерес ко мне. Я&#160;свяжусь с Вами в ближайшее время.</p>';
			header("Location: ".$_SERVER['HTTP_REFERER']);
		
		/*} else {
			// Иначе считаем отправителя роботом и выводим сообщение с просьбой повторить попытку
			$_SESSION['win'] = 1;
			$_SESSION['recaptcha'] = '<p class="text-light"><strong>Извините!</strong><br>Ваши действия похожи на робота. Пожалуйста повторите попытку!</p>';
			header("Location: ".$_SERVER['HTTP_REFERER']);
		}
	} */
?>