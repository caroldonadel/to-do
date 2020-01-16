<?php

require_once 'global.php';

try {
    $tarefa = new Tarefa();
    $nome = $_POST['nome'];
    $data = $_POST['data'];

    $tarefa->descricao = $nome;
    $tarefa->data = $data;
    $tarefa->status = 0;

    $tarefa->inserir();

    header('Location: index.php');
} catch (Exception $e) {
    Erro::trataErro($e);
}
