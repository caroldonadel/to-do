<?php
require_once 'global.php';

    $lista = Tarefa::listar();

    function data($data){

    return date("d/m/Y", strtotime($data));

    };


