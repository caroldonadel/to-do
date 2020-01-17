<?php
require_once 'global.php';

try {
    $json = file_get_contents('php://input');
    $jsonPayload = json_decode($json);

    $tarefa = new Tarefa();
    $id = $jsonPayload;
    $tarefa->id = $id;

    $tarefa->excluir();

    //$item = Tarefa::pegarConexao()->lastInsertId();

    header('Content-Type: application/json');

    echo $jsonPayload;

} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode($e);
}

