<?php

require_once 'global.php';

    $tarefa = new Tarefa();
    $nome = $_POST['nome'];
    $data = $_POST['data'];

    $tarefa->nome = $nome;
    $tarefa->data = $data;
    $tarefa->status = 0;

    $tarefa->inserir();

    header('Location: index.php');
