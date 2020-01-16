<?php

require_once 'global.php';

    // Takes raw data from the request
    $json = file_get_contents('php://input');
    // Converts it into a PHP object
    $jsonPayload = json_decode($json);

    $tarefa = new Tarefa();
    $nome = $jsonPayload->nome;
    $data = $jsonPayload->data;

    $tarefa->descricao = $nome;
    $tarefa->data = $data;
    $tarefa->status = 0;

    $tarefa->inserir();

    header('Content-Type: application/json');
    echo json_encode($jsonPayload);

    if(true)
    {
        $item = Tarefa::pegarConexao()->lastInsertId();

        echo '<li>
                    <input type="checkbox" class="checkbox">
                    <label class="taskName"> . $tarefa->descricao . </label>
                    <input type="date" class="taskDate" readonly="true" value=" . $tarefa->data .">
                    <input type="text" class="TaskNameEdit" display="none">
                    <input type="date" class="dataInputEdit" id="newDate" display="none">
                    <button class="edit"><i class="fas fa-edit"></i> </button>
                    <button class="delete iconDelete"><i class="fas fa-trash"></i></button>
            </li>';
    }

//} catch (Exception $e) {
//    header('Content-Type: application/json');
//    echo json_encode($e);
//}
