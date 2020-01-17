<?php require_once 'global.php';
require_once 'tarefas-busca-elementos.php'
?>

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
                <li class="newItem">
                    <input type="text" name="nome" placeholder="Novo item" class="newTaskDescription">
                    <input type="date" name="data" id="dateNewTask" class="dataInputEdit">
                    <button id="addNewTask" class="new"><i class="fas fa-plus add"></i></button>
                </li>
        <?php foreach ($lista as $linha) : ?>
                <li>
                    <?php if ($linha['status']===0){ ?>
                        <input type="checkbox" class="checkbox" >
                        <label class="taskName"><?php echo  $linha['descricao']?></label>
                   <?php }
                   else { ?>
                        <input type="checkbox" class="checkbox" checked>
                        <label class="taskName" text-decoration="line-through"><?php echo  $linha['descricao']?></label>
                    <?php } ?>

                    <input type="checkbox" class="checkbox">
                    <label class="taskName"><?php echo  $linha['descricao']?></label>
                    <input type="date" class="taskDate" value="<?php echo data($linha['data'])?>" readonly="true">
                    <input type="hidden" id="id" value="<?php echo $linha['id'] ?>">
                    <input type="text" class="TaskNameEdit" display="none">
                    <input type="date" class="dataInputEdit" id="newDate" display="none">
                    <button class="edit"><i class="fas fa-edit"></i> </button>
                    <button class="delete iconDelete"><i class="fas fa-trash"></i></button>
                </li>

        <?php endforeach; ?>
            </ul>
    </main>
    <script type="text/javascript" src="js/principal2.js"> </script>
</body>
</html>