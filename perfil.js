let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let curtidas = JSON.parse(localStorage.getItem("curtidas")) || {};
let posts = JSON.parse(localStorage.getItem("posts")) || [];

const container = document.getElementById("perfil-container");

if (!usuarioLogado) {
  alert("Você precisa estar logado para ver seu perfil.");
  location.href = "index.html";
}

function atualizarUsuario() {
  const novoNome = document.getElementById("novo-nome").value.trim();
  const novaSenha = document.getElementById("nova-senha").value.trim();

  if (novoNome) usuarioLogado.nome = novoNome;
  if (novaSenha.length >= 4) usuarioLogado.senha = novaSenha;

  const index = usuarios.findIndex(u => u.email === usuarioLogado.email);
  usuarios[index] = usuarioLogado;

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

  alert("Perfil atualizado com sucesso!");
  location.reload();
}

function montarPerfil() {
  const curtidos = Object.keys(curtidas)
    .filter(k => k.startsWith(usuarioLogado.email))
    .map(k => parseInt(k.split("-")[1]));

  const postsCurtidos = posts.filter((_, i) => curtidos.includes(i));

  container.innerHTML = `
    <h2>Meu Perfil</h2>
    <p><strong>Nome:</strong> ${usuarioLogado.nome}</p>
    <p><strong>E-mail:</strong> ${usuarioLogado.email}</p>

    <h3>Editar Perfil</h3>
    <input type="text" id="novo-nome" placeholder="Novo nome" /><br>
    <input type="password" id="nova-senha" placeholder="Nova senha (min. 4 caracteres)" /><br>
    <button onclick="atualizarUsuario()">Salvar Alterações</button>

    <h3>Posts Curtidos</h3>
    ${postsCurtidos.map(p => `<article><h4>${p.titulo}</h4><p>${p.conteudo}</p></article>`).join("")}
  `;
}

montarPerfil();
atualizarNavegacao();