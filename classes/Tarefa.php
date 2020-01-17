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
        return $conexao;
    }

    public function inserir()
    {
        $query = "INSERT INTO tarefas (descricao, data, status) VALUES (:descricao, :data, :status)";
        $conexao = self::pegarConexao();
        $stmt = $conexao->prepare($query);
        $stmt->bindValue(':descricao', $this->descricao);
        $stmt->bindValue(':data', $this->data);
        $stmt->bindValue(':status', $this-> status);
        $stmt->execute();

        $query = "SELECT LAST_INSERT_ID() as last_id";
        $stmt = $conexao->query($query); //usar bindValue
        $id = $stmt->fetch();
        $this->id = $id[0];
    }

    public static function listar()
    {
        $query = "SELECT id,descricao, data, status FROM tarefas";
        $conexao = self::pegarConexao();
        $resultado = $conexao->query($query);
        $lista = $resultado->fetchAll();
        return $lista;
    }

    public function atualizar()
    {
        $query = "UPDATE tarefas set descricao = :descricao, data = :data, status = :status WHERE id = :id";
        $conexao = Tarefa::pegarConexao();
        $stmt = $conexao->prepare($query);
        $stmt->bindValue(':descricao', $this->descricao);
        $stmt->bindValue(':data', $this->data);
        $stmt->bindValue(':id', $this->id);
        $stmt->bindValue(':status', $this->status);
        $stmt->execute();
    }

    public function excluir()
    {
        $query = "DELETE FROM tarefas WHERE id = :id";
        $conexao = self::pegarConexao();
        $stmt = $conexao->prepare($query);
        $stmt->bindValue(':id', $this->id);
        $stmt->execute();
    }
}

