<?php


$conexao = Tarefa::pegarConexao();

//inserir todo o abaixo por um metodo chamado listar da classe Tarefa
$query = " SELECT * FROM todo";

$stmt = $conexao->prepare($query);
$stmt->execute();

$lista = $stmt->fetchAll();

?>