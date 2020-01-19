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
                    <button id="addNewTask" class="new add"><i class="fas fa-plus "></i></button>
                </li>
        <?php foreach ($lista as $linha) : ?>
                <li>
                    <?php if($linha['status']=== "1"){ ?>
                        <input type="checkbox" class="checkbox" checked>
                        <label class="taskName tarefaCompleta"><?php echo  $linha['descricao']?></label>
                    <?php }else{ ?>
                        <input type="checkbox" class="checkbox">
                        <label class="taskName"><?php echo  $linha['descricao']?></label>
                    <?php  } ?>
                    <input type="text" class="TaskNameEdit">
                    <input type="date" class="taskDate" value="<?php echo $linha['data']?>" >
                    <input type="hidden" value="<?php echo $linha['id']?>">
                    <button class="edit"><i class="fas fa-edit"></i> </button>
                    <button class="delete iconDelete"><i class="fas fa-trash"></i></button>
                </li>
        <?php endforeach; ?>
            </ul>
    </main>
    <script type="text/javascript" src="js/principal2.js"> </script>
</body>
</html>