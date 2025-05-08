<?php 

$diretorio = "php";
$arquivo = $diretorio.'/arquivo.php';

if(!file_exists($diretorio)){

    if(!mkdir("meu diretorio", 0777 ,true)){
        echo "Erro: Diretório não criado ";
    }
    else{
        echo "Diretório " . $diretorio. "criado";
    }
}
else{
    echo "O diretório ".$diretorio. " já existe";
}

$x = "Olá, mundo";
$conteudo = <<<PHP
    <?php 
    class Teste{
        function _construct(){
            echo "olá mundo ";
        }
    }
    new Teste();
    ?>
PHP;
if(file_put_contents($arquivo, $conteudo)===false ){
    echo " ERRO: não foi possível criar o arquivo";
}
else{
    echo $arquivo . " foi criado";
}  
    
?>
