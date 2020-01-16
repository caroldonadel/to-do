<?php require_once 'global.php' ?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>To Do</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="lib/css/all.css">
</head>
<body>
    <main >
        <div class="container">
            <h1 class="container-titulo">To Do List</h1>
        </div>
            <ul class="conjuntoItens">
                <form action="tarefas-criar-post.php" method="post">
                    <li class="newItem">
                        <input type="text" name="nome" placeholder="Novo item" class="newTaskDescription">
                        <input type="date" name="data" id="dateNewTask" class="dataInputEdit">
                        <button type="submit" id="addNewTask" class="new"><i class="fas fa-plus add"></i></button>
                    </li>
                </form>
                <!--
                <form action="tarefas-editar-post.php" method="post">
                    <script type="text/javascript" src="js/adicionar.js">
                    </script>
                </form>
                -->

            </ul>
    </main>
    <script type="text/javascript" src="js/principal.js"> </script>
</body>
</html>