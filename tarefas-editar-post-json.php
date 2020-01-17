<?php require_once 'global.php' ?>

<?php
try {
    $json = file_get_contents('php://input');
    $jsonPayload = json_decode($json);

    $tarefa = new Tarefa();
    $nome = $jsonPayload->nome;
    $data = $jsonPayload->data;
    $status = $jsonPayload->status;
    $id = $jsonPayload->id;

    $tarefa->descricao = $nome;
    $tarefa->data = $data;
    $tarefa->status = $status;
    $tarefa->id = $id;
    $tarefa->atualizar();

     header('Location: categorias.php');
     echo $jsonPayload;
} catch (Exception $e) {
    Erro::trataErro($e);
}
