<?php
include "conexao.php";

class CriaClasses1 {
    private $con;

    function __construct() {
        $this->con = (new Conexao())->conectar();
    }

    function ClassesModel() {
        if (!file_exists("sistema")) {
            mkdir("sistema");
        }
        if (!file_exists("sistema/model")) {
            mkdir("sistema/model");
        }

        $sql = "SHOW TABLES";
        $query = $this->con->query($sql);
        $tabelas = $query->fetchAll(PDO::FETCH_ASSOC);

        foreach ($tabelas as $tabela) {
            $nomeTabela = array_values((array) $tabela)[0];
            $sql = "SHOW COLUMNS FROM {$nomeTabela}";
            $atributos = $this->con->query($sql)->fetchAll(PDO::FETCH_OBJ);

            $nomeAtributos = "";
            $gettersSetters = "";

            foreach ($atributos as $atributo) {
                $campo = $atributo->Field;
                $camelCampo = ucfirst($campo);

                // Atributo
                $nomeAtributos .= "    private \${$campo};\n";

                // Getter
                $gettersSetters .= <<<EOT
    public function get{$camelCampo}() {
        return \$this->{$campo};
    }

EOT;

                // Setter
                $gettersSetters .= <<<EOT
    public function set{$camelCampo}(\${$campo}) {
        \$this->{$campo} = \${$campo};
    }

EOT;
            }

            $nomeClasse = ucfirst($nomeTabela);
            $conteudo = <<<EOT
<?php
class {$nomeClasse} {
{$nomeAtributos}

{$gettersSetters}}
?>
EOT;

            file_put_contents("sistema/model/{$nomeClasse}.php", $conteudo);
        }
    }
}

(new CriaClasses1())->ClassesModel();
