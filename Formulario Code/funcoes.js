var ctxCabecalho;
var ctxLinks;
var ctxConteudo;
var ctxRodape;

function configEstiloCabecalho() {
    bg = document.getElementById("corFundo").value;
    corFonte = document.getElementById("corFonte").value;
    tamFonte = document.getElementById("tamFonte").value;
    let altura = document.getElementById("alturaCabecalho").value;
    let largura = document.getElementById("larguraCabecalho").value;
    let fonte = document.getElementById("fonteCabecalho").value;
    ctxCabecalho = "#cabecalho {\n background-color: " + bg + ";\n";
    ctxCabecalho += " color: " + corFonte + ";\n";
    ctxCabecalho += " font-size: " + tamFonte + "pt;\n";
    if (altura) ctxCabecalho += " height: " + altura + "px;\n";
    if (largura) ctxCabecalho += " width: " + largura + "%;\n";
    if (fonte) ctxCabecalho += " font-family: '" + fonte + "';\n";
    ctxCabecalho += "}\n";
    

    return ctxCabecalho;
}
function configEstiloLinks() {
    let corLink = document.getElementById("corLinks").value;
    let estiloLinks = document.querySelector('input[name="estiloLinks"]:checked').value;

    ctxLinks = "a {\n color: " + corLink + ";\n";
    ctxLinks += " text-decoration: " + (estiloLinks === "0" ? "none" : "underline") + ";\n";
    ctxLinks += "}\n";

    return ctxLinks;
}

function configEstiloHoverLinks() {
    const estiloHover = document.getElementById("hoverLinks").value;
    const estiloBase = document.querySelector('input[name="estiloLinks"]:checked')?.value;

    let hoverCSS = "a:hover {\n";

    if (estiloHover === "negrito") {
        hoverCSS += " font-weight: bold;\n";
    } else if (estiloHover === "sublinhado" && estiloBase === "0") {
        // Só adiciona sublinhado no hover se o estilo base for "não sublinhado"
        hoverCSS += " text-decoration: underline;\n";
    } else if (estiloHover === "cor") {
        hoverCSS += " color: #FFFF00;\n"; // Rosa choque
    } else {
        return "";
    }

    hoverCSS += "}\n";
    return hoverCSS;
}

function configHtmlLinks() {
    const linkTexts = document.getElementsByName("links");
    const linkFiles = document.getElementsByName("href");
    let htmlLinks = "";

    for (let i = 0; i < linkTexts.length; i++) {
        let filePath = linkFiles[i].value.split("\\");
        let fileName = filePath[filePath.length - 1];
        htmlLinks += `<a href="${fileName}">${linkTexts[i].value}</a><br>\n`;
    }

    return htmlLinks;
}
function addHtmlLinks() {
    const container = document.getElementById("linksContainer");

    const newDiv = document.createElement("div");
    newDiv.className = "d-flex align-items-center mb-2";

    const inputTexto = document.createElement("input");
    inputTexto.type = "text";
    inputTexto.name = "links";
    inputTexto.className = "form-control mr-1";
    inputTexto.placeholder = "Texto do link";
    inputTexto.style.flexGrow = "1";
    
    const inputHref = document.createElement("input");
    inputHref.type = "file";
    inputHref.name = "href";
    inputHref.className = "form-control mx-2";

    newDiv.appendChild(inputTexto);
    newDiv.appendChild(inputHref);
    container.appendChild(newDiv);
}
function configHTMLCabecalho() {
    let aux = document.querySelector("#textoCabecalho").value;
    ctxCabecalho = '<h1>' + aux + '</h1>';
    return ctxCabecalho;
}
function gerarCodigo() {
    //Cóigo para CSS
    let codeCSS = document.querySelector("#codeCSS");
    let css = configEstiloCabecalho();
    css += configEstiloLinks();
    css += configEstiloHoverLinks();
    codeCSS.value = css;
    //Código para HTML
    let codeHTML = document.querySelector("#codeHTML");
    ctxHTML = "<html>\n<head>\n" +
        "<meta charset='UTF-8'>\n" +
        "<link rel='stylesheet' href='estilo.css'>\n" +
        "<title>Miha página</title>\n" +
        "</head>\n<body>" +
        "<div id='cabecalho'>" + configHTMLCabecalho() + "</div>\n" +
        "<nav id='links'>\n" + configHtmlLinks() + "\n</nav>\n" +
        "<div id='conteudo'></div>\n" +
        "</body>\n</html>";
    codeHTML.value = ctxHTML;

}
function download(campo, arquivo) {
    if (arquivo.trim() === '')
        arquivo = document.getElementById("nomeHTML").value + ".html";
    var text = document.getElementById(campo).value;
    var blob = new Blob([text], { type: "text/plain" });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = arquivo.trim();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function criarLinks() {
    pai=document.getElementById("areaLinks");
    link=document.createElement("input");
    link.setAttribute("type","text");
     link.setAttribute("name","links");
     link.setAttribute("id","links");
     link.setAttribute("placeholder","nome do link");
     href=document.createElement("input");
     href.setAttribute("type","file");
     href.setAttribute("name","href");
     href.setAttribute("id","file");
     bt=document.createElement("button");
     bt.setAttribute("onclick","criarLinks()");
     bt.innerText="+";
    pai.appendChild(link);
     pai.appendChild(href);
     pai.appendChild(bt);
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
       document.querySelector("#areaLinks").style.visibility=txt;
 }

function renderIframe(){
    const iframe = document.getElementById('pagina')
    const htmlCode = document.getElementById('codeHTML').value
    const cssCode = document.getElementById('codeCSS').value

    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlCode, 'text/html')

    const style = document.createElement('style');
    style.textContent = cssCode;

    if(doc.head){
        doc.head.appendChild(style)
    }

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<!DOCTYPE html>\n' + doc.documentElement.outerHTML);
    iframeDoc.close();
}

function mostraOcultaDiv(id){
    const divs = document.querySelectorAll('.content')
    divs.forEach(div => div.classList.remove('active'))
    document.getElementById(id).classList.add('active')
}
