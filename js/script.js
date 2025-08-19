function gerarCard() {
    // Coleta de dados dos inputs
    const name = document.getElementById("name").value || "Nome";
    const dominio = document.getElementById("dominio").value || "Domínio";
    const escola = document.getElementById("escola").value || "Escola";
    const flagUrl = document.getElementById("flag").value || "";
    const description = document.getElementById("description").value || "Descrição aqui...";
    const imageFile = document.getElementById("imageUpload").files[0];

    const arma = document.getElementById("arma").value || "Nenhuma";
    const protecao = document.getElementById("protecao").value || "Nenhuma";
    const tecnica = document.getElementById("tecnica").value || "-";
    const vantagem = document.getElementById("vantagem").value || "-";
    const desvantagem = document.getElementById("desvantagem").value || "-";

    const vigor = document.getElementById("vigor").value || 0;
    const determinacao = document.getElementById("determinacao").value || 0;
    const reflexos = document.getElementById("reflexos").value || 0;
    const astucia = document.getElementById("astucia").value || 0;
    const inteligencia = document.getElementById("inteligencia").value || 0;
    const agilidade = document.getElementById("agilidade").value || 0;
    const forca = document.getElementById("forca").value || 0;
    const percepcao = document.getElementById("percepcao").value || 0;
    const vazio = document.getElementById("vazio").value || 0;

    const atributosHTML = `
    <div class="attribute-group" id="anel_terra">
        <div class="attribute-values">
            <span>Vigor: ${vigor}</span>
            <span>Determinação: ${determinacao}</span>
        </div>
    </div>
    <div class="attribute-group" id="anel_ar">
        <div class="attribute-values">
            <span>Reflexos: ${reflexos}</span>
            <span>Astúcia: ${astucia}</span>
        </div>
    </div>
    <div class="attribute-group" id="anel_agua">
        <div class="attribute-values">
            <span>Força: ${forca}</span>
            <span>Percepção: ${percepcao}</span>
        </div>
    </div>
    <div class="attribute-group" id="anel_fogo">
        <div class="attribute-values">
            <span>Inteligência: ${inteligencia}</span>
            <span>Agilidade: ${agilidade}</span>
        </div>
    </div>
    <div class="attribute-group single" id="anel_vazio">
        <div class="attribute-values">
            <span>Vazio: ${vazio}</span>
        </div>
    </div>
    `;

    const flagHTML = flagUrl ? `<div class="flag-icon" style="background-image:url('${flagUrl}')"></div>` : "";

    const cardHTML = `
    <div class="card" id="card">
        <div class="card-header-top">
            <div class="card-header-left">
                <h2>${name}</h2>
                <div class="dominio-escola">${dominio} | ${escola}</div>
            </div>
            ${flagHTML}
        </div>
        <div class="card-header">
            <div class="image-placeholder">
                <img id="characterImage" src="" alt="Personagem">
            </div>
            <div class="attributes">${atributosHTML}</div>
        </div>
        <div class="card-sections">
            <div class="card-section"><h3>Arma</h3><p>${arma}</p></div>
            <div class="card-section"><h3>Proteção</h3><p>${protecao}</p></div>
            <div class="card-section"><h3>Vantagens</h3><p>${vantagem}</p></div>
            <div class="card-section"><h3>Desvantagens</h3><p>${desvantagem}</p></div>
            <div class="card-section full"><h3>Técnica</h3><p>${tecnica}</p></div>
        </div>
        <div class="description"><p>${description}</p></div>
    </div>
    `;

    document.getElementById("cardContainer").innerHTML = cardHTML;

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("characterImage").src = e.target.result;
        }
        reader.readAsDataURL(imageFile);
    }
}

function baixarCard() {
    const card = document.getElementById("card");
    if (!card) {
        alert("Gere o card antes de salvar!");
        return;
    }

    const nomePersonagem = document.getElementById("name").value || "personagem";
    const nomeArquivo = `card_${nomePersonagem.replace(/\s+/g, '_')}.png`;

    html2canvas(card, { useCORS: true }).then(canvas => {
        const link = document.createElement("a");
        link.download = nomeArquivo;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateBtn').addEventListener('click', gerarCard);
    document.getElementById('downloadBtn').addEventListener('click', baixarCard);
});