<?php

require_once "conexao.php";

class criarClasse2{
    private $tbBanco = "Tables_in_enderecos";
    private $con;


    function classesModel(){
        $sql = "SHOW TABLES";
        $query = $this->con->query($sql);
        $tabelas = $query->fetchAll(PDO::FETCH_OBJ);

        foreach($tabelas as $tabela){
            $nomeTabela = ucfirst(($tabela->{$this->tbBanco}));
            $conteudo = <<<EOT

class ($nomeTabela){
}
EOT;

            echo "conteudo:<br><pre>$conteudo</pre><br><br>"
        }
    }
}

