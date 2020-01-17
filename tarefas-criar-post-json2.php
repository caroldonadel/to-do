<?php

require_once 'global.php';

try{
    $json = file_get_contents('php://input');
    $jsonPayload = json_decode($json);

    $tarefa = new Tarefa();
    $nome = $jsonPayload->nome;
    $data = $jsonPayload->data;

    $tarefa->descricao = $nome;
    $tarefa->data = $data;
    $tarefa->status = 0;
    $tarefa->inserir();

//    $tarefa->id = Tarefa::pegarConexao()->lastInsertId();

    header('Content-Type: application/json');

//    echo json_encode($jsonPayload . ',"id":' . $item);

    echo json_encode($tarefa);

} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode($e);
}
