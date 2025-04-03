var ctxCabecalho;
var ctxLinks;
var ctxConteudo;
var ctxRodape;

function configEstiloCabecalho() {
    bg = document.getElementById("corFundo").value;
    corFonte = document.getElementById("corFonte").value;
    tamFonte = document.getElementById("tamFonte").value;
    ctxCabecalho = "#cabecalho{\n background-color:" + bg + ";\n";
    ctxCabecalho += " color:" + corFonte + ";\n";
    ctxCabecalho += " font-size:" + tamFonte + "pt;\n}\n";
    return ctxCabecalho;
}
function configEstiloLinks() {
    corLink = document.getElementById("corLinks").value;
    estiloLinks = document.querySelector('input[name="estiloLinks"]:checked').value;
    ctxLinks = "a{\n color:" + corLink + ";\n";
    let aux = estiloLinks == "0" ? "none" : "underline";
    ctxLinks += " text-decoration:" + aux + ";\n}\n";
    return ctxLinks;
}
function configHtmlLinks() {
    links = document.getElementsByName("links");
    href = document.getElementsByName("href");
    ctxLinks = "";
    for (let i = 0; i < vetLinks.length; i++) {
        href = href[i].value.split("\\");
        ctxLinks += '<a href="' + href[href.length - 1] + '">' + links[i].value + '</a>';
        return ctxLinks;
    }
}
function addHtmlLinks() {
    const novaDivLink = document.createElement("div")
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
    codeCSS.value = css;
    //Código para HTML
    let codeHTML = document.querySelector("#codeHTML");
    ctxHTML = "<html>\n<head>\n" +
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
