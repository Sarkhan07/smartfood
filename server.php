<?php
$_POST = json_decode(file_get_contents("php://input")), true // получить json файлы и работать с ними
echo var_dump($_POST);
