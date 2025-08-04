const matrizes = [
  { tipo: "Matriz Nula", texto: "Todos os elementos são iguais a zero." },
  { tipo: "Matriz Linha", texto: "Possui apenas uma linha." },
  { tipo: "Matriz Coluna", texto: "Possui apenas uma coluna." },
  {
    tipo: "Matriz Quadrada",
    texto: "Número de linhas e colunas são iguais (n x n).",
  },
  {
    tipo: "Matriz Diagonal",
    texto: "Elementos fora da diagonal principal são zero.",
  },
  {
    tipo: "Matriz Identidade",
    texto: "Diagonal principal com 1 e o resto com 0.",
  },
  {
    tipo: "Matriz Oposta",
    texto: "Todos os elementos são o oposto (negativo) de outra matriz.",
  },
  { tipo: "Matriz Transposta", texto: "Troca as linhas pelas colunas." },
  { tipo: "Matriz Simétrica", texto: "É igual à sua transposta." },
  {
    tipo: "Matriz Antissimétrica",
    texto: "É igual à oposta da sua transposta.",
  },
  {
    tipo: "Matriz Escalar",
    texto: "Diagonal principal com o mesmo número (≠1), resto zero.",
  },
  {
    tipo: "Matriz Triangular Superior",
    texto: "Elementos abaixo da diagonal principal são zero.",
  },
  {
    tipo: "Matriz Triangular Inferior",
    texto: "Elementos acima da diagonal principal são zero.",
  },
  {
    tipo: "Matriz Singular",
    texto: "Determinante igual a zero (não tem inversa).",
  },
  {
    tipo: "Matriz Inversa",
    texto: "Quando multiplicada pela matriz original, resulta na identidade.",
  },
];

const container = document.getElementById("lista-matrizes");

matrizes.forEach((matriz) => {
  const card = document.createElement("div");
  card.className = "card";

  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";

  const front = document.createElement("div");
  front.className = "card-front";
  front.textContent = matriz.tipo;

  const back = document.createElement("div");
  back.className = "card-back";
  back.textContent = matriz.texto;

  cardInner.appendChild(front);
  cardInner.appendChild(back);
  card.appendChild(cardInner);

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  container.appendChild(card);
});

document.getElementById("btnProximaTela").addEventListener("click", () => {
  window.location.href = "/exercicios/exercicios.html";
});
