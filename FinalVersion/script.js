var ctxCabecalho;
var ctxLinks;
var txtConteudo;
var ctxRodape;
var ancora=true;
var imagemBase = "";

function configEstiloCabecalho(){
 bg=document.getElementById("corFundo").value;
 corFonte=document.getElementById("corFonte").value;
 tamFonte=document.getElementById("tamFonte").value;
 ctxCabecalho="#cabecalho{\n background-color:"+bg+";\n";
 ctxCabecalho+=" color:"+corFonte+";\n";
 ctxCabecalho+=" font-size:"+tamFonte+"pt;\n}\n";
 return ctxCabecalho;
}

function configEstiloLinks(){
    corLink=document.getElementById("corLinks").value;
    estiloLinks=document.querySelector('input[name="estiloLinks"]:checked').value;
    ctxLinks="a{\n color:"+corLink+";\n";
    let aux=estiloLinks=="0"?"none":"underline";
    ctxLinks+=" text-decoration:"+aux+";\n}\n";
    return ctxLinks;
}

function configHtmlLinks(){
    if(!ancora)return "";
    links=document.getElementsByName("links");
    href=document.getElementsByName("href");
    htmlLinks="";
    for(let i=0;i<links.length;i++) {
        vet=href[i].value.split("\\");
        htmlLinks +='<a href="'+vet[vet.length-1]+'">'+links[i].value+'</a>';
    }
    return htmlLinks;
}

function configHTMLCabecalho(){
    let aux=document.querySelector("#textoCabecalho").value;
    return '<h1>'+aux+'</h1>';
}

function lerImagem() {
    const imagem = document.getElementById("imagem1").files[0];
    if (imagem) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imagemBase = event.target.result;
        };
        reader.readAsDataURL(imagem);
    }
}

function configHTMLConteudo(){
    txtConteudo="";
    txtConteudo=document.querySelector("#txtConteudo").value;
    if (imagemBase) {
        txtConteudo += '<img src="' + imagemBase + '" width="' + document.getElementById("largura").value + '" height="' + document.getElementById("altura").value + '">';
    }
    return txtConteudo;
}

function gerarCodigo(){
//Código para CSS
    let codeCSS=document.querySelector("#codeCSS");
    let css=configEstiloCabecalho();
    css+=configEstiloLinks();
    codeCSS.value=css;
//Código para HTML
    let codeHTML=document.querySelector("#codeHTML");
    ctxHTML="";
    ctxHTML="<!DOCTYPE html>\n<html>\n<head>\n<meta charset='UTF-8'>\n" +
        "<link rel='stylesheet' href='estilo.css'>\n"+
        "<title>Minha página</title>\n"+
        "</head>\n<body>" +
        "<div id='cabecalho'>" + configHTMLCabecalho() + "</div>\n" +
        "<nav id='links'>\n" + configHtmlLinks() + "\n</nav>\n" +
        "<div id='conteudo'>\n" + configHTMLConteudo() + "\n</div>\n" +
        "</body>\n</html>";
    codeHTML.value=ctxHTML;
}

function download(campo,arquivo){
    if(arquivo.trim()==='')
        arquivo=document.getElementById("nomeHTML").value+".html";
    var text = document.getElementById(campo).value;
    var blob = new Blob([text], {type: "text/plain"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = arquivo.trim();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function criarLinks() {
    const pai = document.getElementById("linksContainer");

    const div = document.createElement("div");
    div.setAttribute("class", "d-flex align-items-center mb-2");

    const link = document.createElement("input");
    link.setAttribute("type", "text");
    link.setAttribute("name", "links");
    link.setAttribute("placeholder", "Texto do Link");
    link.setAttribute("class", "form-control me-2");
    link.setAttribute("style", "flex: 2");

    const arquivo = document.createElement("input");
    arquivo.setAttribute("type", "file");
    arquivo.setAttribute("name", "href");
    arquivo.setAttribute("class", "form-control me-2");
    arquivo.setAttribute("style", "flex: 2");

    const botao = document.createElement("button");
    botao.setAttribute("type", "button");
    botao.setAttribute("class", "btn btn-primary");
    botao.setAttribute("style", "flex: 0 0 auto");
    botao.innerText = "+";
    botao.onclick = criarLinks;

    div.appendChild(link);
    div.appendChild(arquivo);
    div.appendChild(botao);

    pai.appendChild(div);
}

function removeLinks(check){
    if(check.checked) {
        txt = "hidden";
        ancora=false;
    }
    else {
        txt = "visible";
        ancora=true;
    }
        document.querySelector("#areaLink").style.visibility=txt;
}

function renderIframe(){
    const iframe = document.getElementById('pagina');
    const htmlCode = document.getElementById('codeHTML').value;
    const cssCode = document.getElementById('codeCSS').value;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    const style = document.createElement('style');
    style.textContent = cssCode;

    if (doc.head){
        doc.head.appendChild(style);
    }
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<!DOCTYPE html>\n' + doc.documentElement.outerHTML);
    iframeDoc.close();
}

function mostraOcultaDiv(id) {
    const divs = document.querySelectorAll('.content, .contentActive');
    divs.forEach(div => div.style.display = 'none'); // Oculta todas

    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block'; // 
    }
}

function aviso(){
    alert('Para que o link funcione o arquivo de destino deve estar no diretório do projeto')
    return true;
}
