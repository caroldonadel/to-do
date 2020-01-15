<?php

class Tarefa
{
public $id;
public $descricao;
public $data;
public $status;

    public static function pegarConexao()
    {
        $conexao = new PDO(DB_DRIVE . ':host=' . DB_HOSTNAME . ';dbname=' . DB_DATABASE, DB_USERNAME, DB_PASSWORD);
    }

    public function inserir()
    {
        $query = "INSERT INTO tarefas (descricao, data, status) VALUES (:descricao, :data, :status)";
        $conexao = pegarConexao();
        $stmt = $conexao->prepare($query);
        $stmt->bindValue(':descricao', $this->descricao);
        $stmt->bindValue(':data', $this->data);
        $stmt->bindValue(':status', $this->status);
        $stmt->execute();
    }


    /*public function __construct($id = false)
    {
        if ($id) {
            $this->id = $id;
            $this->carregar();
        }
    }




    public function carregar()
    {
        $query = "SELECT id, nome FROM categorias WHERE id = :id";
        $conexao = Conexao::pegarConexao();
        $stmt = $conexao->prepare($query);
        $stmt->bindValue(':id', $this->id);
        $stmt->execute();
        $linha = $stmt->fetch();
        $this->nome = $linha['nome'];
    }



    public function atualizar()
    {
        $query = "UPDATE categorias set nome = :nome WHERE id = :id";
        $conexao = Conexao::pegarConexao();
        $stmt = $conexao->prepare($query);
        $stmt->bindValue(':nome', $this->nome);
        $stmt->bindValue(':id', $this->id);
        $stmt->execute();
    }

    public function excluir()
    {
        $query = "DELETE FROM categorias WHERE id = :id";
        $conexao = Conexao::pegarConexao();
        $stmt = $conexao->prepare($query);
        $stmt->bindValue(':id', $this->id);
        $stmt->execute();
    } */
}

