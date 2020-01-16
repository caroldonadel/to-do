<?php
require_once 'global.php';

$conexao = Tarefa::pegarConexao();

$query = " SELECT * FROM tarefas";

$stmt = $conexao->prepare($query);
$stmt->execute();

$lista = $stmt->fetchAll();

header('Content-Type: application/json');

echo json_encode($lista);

