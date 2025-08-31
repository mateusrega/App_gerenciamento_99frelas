const backendUrl = "http://192.168.1.96:5000/dados";

async function carregarDados() {
  const tabela = document.querySelector("#tabela tbody");
  tabela.innerHTML = "<tr><td colspan='3'>⏳ Carregando...</td></tr>";

  try {
    const resposta = await fetch(backendUrl);
    const dados = await resposta.json();

    tabela.innerHTML = "";
    dados.forEach(item => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${item.titulo}</td>
        <td>${item.valor}</td>
        <td><a href="${item.link}" target="_blank">Abrir</a></td>
      `;
      tabela.appendChild(linha);
    });

  } catch (erro) {
    tabela.innerHTML = `<tr><td colspan="3">❌ Erro ao carregar dados</td></tr>`;
    console.error(erro);
  }
}

// Instalar PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
