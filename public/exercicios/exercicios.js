function gerarDesafioMatriz(linhas, colunas) {
        document.getElementById("desafio").innerHTML = gerarMatriz(linhas, colunas);
      }

      function gerarExercicioDeEscolha(tituloOpcoes, opcoes, respostaCorreta) {
        dadosFase = { respostaCorreta };
        let html = '<div class="choice-container">';
        const letras = ['A', 'B', 'C', 'D'];
        opcoes.forEach((opcao, index) => {
          html += `
            <div class="matrix-choice" onclick="selecionarEscolha(this)">
              <label>
                <input type="radio" name="matrix-choice" value="${letras[index]}">
                <strong>${letras[index]}) ${tituloOpcoes[index]}</strong>
                ${gerarMatriz(opcao.length, opcao[0].length, true, opcao)}
              </label>
            </div>`;
        });
        html += '</div>';
        document.getElementById("desafio").innerHTML = html;
      }

      function selecionarEscolha(elemento) {
          document.querySelectorAll('.matrix-choice').forEach(el => el.classList.remove('selected'));
          elemento.classList.add('selected');
          elemento.querySelector('input[type="radio"]').checked = true;
      }

      function validarEscolha() {
          const selecionada = document.querySelector('input[name="matrix-choice"]:checked');
          if (!selecionada) return false;
          return selecionada.value === dadosFase.respostaCorreta;
      }

      const fases = [
        {
          titulo: "Conecte os Tipos de Matrizes",
          descricao: "Arraste o nome de cada tipo de matriz para sua representação correta.",
          gerar: gerarJogoDeConexao,
          validar: validarJogoDeConexao,
        },
        {
          titulo: "Matriz Nula",
          descricao: "Selecione a matriz que é classificada como Nula.",
          gerar: () => {
            const nula = [[0, 0], [0, 0]];
            const outras = [
                [[1, 0], [0, 1]],
                [[1, 1], [1, 1]],
                [[0, 1], [1, 0]]
            ];
            const opcoes = [nula, ...outras].sort(() => Math.random() - 0.5);
            const respostaCorreta = String.fromCharCode(65 + opcoes.indexOf(nula));
            gerarExercicioDeEscolha(Array(4).fill(""), opcoes, respostaCorreta);
          },
          validar: validarEscolha,
        },
        {
          titulo: "Matriz Diagonal",
          descricao: "Selecione a matriz que é classificada como Diagonal.",
          gerar: () => {
            const diagonal = [[3, 0, 0], [0, 5, 0], [0, 0, 9]];
            const outras = [
                [[0, 0, 3], [0, 5, 0], [9, 0, 0]], // Anti-diagonal
                [[1, 1, 1], [1, 1, 1], [1, 1, 1]], // Unidade
                [[3, 5, 9], [0, 0, 0], [0, 0, 0]]  // Linha com números
            ];
            const opcoes = [diagonal, ...outras].sort(() => Math.random() - 0.5);
            const respostaCorreta = String.fromCharCode(65 + opcoes.indexOf(diagonal));
            gerarExercicioDeEscolha(Array(4).fill(""), opcoes, respostaCorreta);
          },
          validar: validarEscolha,
        },
        {
          titulo: "Matriz Escalar",
          descricao: "Preencha a matriz para que ela seja classificada como Escalar.",
          gerar: () => gerarDesafioMatriz(3, 3),
          validar: (m) => {
            const d = m[0][0];
            return m.every((l, i) => l.every((n, j) => (i === j ? n == d : n == 0)));
          },
        },
        {
          titulo: "Matriz Identidade",
          descricao: "Selecione a matriz que é classificada como Identidade.",
          gerar: () => {
            const identidade = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
            const outras = [
                [[5, 0, 0], [0, 5, 0], [0, 0, 5]], // Escalar
                [[1, 0, 0], [0, 2, 0], [0, 0, 3]], // Diagonal
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]]  // Nula
            ];
            const opcoes = [identidade, ...outras].sort(() => Math.random() - 0.5);
            const respostaCorreta = String.fromCharCode(65 + opcoes.indexOf(identidade));
            gerarExercicioDeEscolha(Array(4).fill(""), opcoes, respostaCorreta);
          },
          validar: validarEscolha,
        },
        {
          titulo: "Matriz Triangular Superior",
          descricao: "Preencha uma matriz 3x3 com zeros abaixo da diagonal principal.",
          gerar: () => gerarDesafioMatriz(3, 3),
          validar: (m) => m.every((l, i) => l.every((n, j) => (i > j ? n == 0 : true))),
        },
        {
          titulo: "Matriz Triangular Inferior",
          descricao: "Preencha uma matriz 3x3 com zeros acima da diagonal principal.",
          gerar: () => gerarDesafioMatriz(3, 3),
          validar: (m) => m.every((l, i) => l.every((n, j) => (i < j ? n == 0 : true))),
        },
        {
          titulo: "Matriz Simétrica (Interativo)",
          descricao: "Complete a matriz para que ela seja simétrica (A[i][j] = A[j][i]).",
          gerar: gerarExercicioSimetrica,
          validar: validarExercicioSimetrica,
        },
      ];

      let faseAtual = 0;
      let dadosFase;

      function gerarExercicioSimetrica() {
        const tamanho = 3;
        const matrizCompleta = Array.from({ length: tamanho }, () => Array(tamanho).fill(0));

        // Preenche a diagonal e o triângulo superior com números aleatórios
        for (let i = 0; i < tamanho; i++) {
          for (let j = i; j < tamanho; j++) {
            const valor = Math.floor(Math.random() * 10);
            matrizCompleta[i][j] = valor;
            matrizCompleta[j][i] = valor; // Garante a simetria
          }
        }

        dadosFase = { matrizCompleta }; // Salva a matriz correta para validação

        let html = '<table class="matrix-table">';
        for (let i = 0; i < tamanho; i++) {
          html += "<tr>";
          for (let j = 0; j < tamanho; j++) {
            // Células do triângulo superior e diagonal são preenchidas e readonly
            if (j >= i) {
              html += `<td><input type="number" id="cell-${i}-${j}" value="${matrizCompleta[i][j]}" readonly /></td>`;
            } else {
              // Células do triângulo inferior são editáveis
              html += `<td><input type="number" id="cell-${i}-${j}" /></td>`;
            }
          }
          html += "</tr>";
        }
        html += "</table>";
        document.getElementById("desafio").innerHTML = html;
      }

      function validarExercicioSimetrica(matrizUsuario) {
        const { matrizCompleta } = dadosFase;
        for (let i = 0; i < matrizCompleta.length; i++) {
          for (let j = 0; j < matrizCompleta[i].length; j++) {
            if (matrizUsuario[i][j] !== matrizCompleta[i][j]) {
              return false;
            }
          }
        }
        return true;
      }

      function gerarMatriz(linhas, colunas, preencher = false, valores = []) {
        let html = '<table class="matrix-table">';
        for (let i = 0; i < linhas; i++) {
          html += "<tr>";
          for (let j = 0; j < colunas; j++) {
            const valor = valores[i] ? valores[i][j] : "";
            html += `<td><input type="number" id="cell-${i}-${j}" ${
              preencher ? `value="${valor}" readonly` : ""
            }/></td>`;
          }
          html += "</tr>";
        }
        html += "</table>";
        return html;
      }

      function gerarJogoDeConexao() {
        const tipos = [
          {
            nome: "Matriz Quadrada (2x2)",
            linhas: 2,
            colunas: 2,
            id: "quadrada",
          },
          {
            nome: "Matriz Retangular (2x3)",
            linhas: 2,
            colunas: 3,
            id: "retangular",
          },
          { nome: "Matriz Linha (1x3)", linhas: 1, colunas: 3, id: "linha" },
          { nome: "Matriz Coluna (3x1)", linhas: 3, colunas: 1, id: "coluna" },
        ];

        dadosFase = { tipos: tipos.map((t) => t.id) };
        const tiposEmbaralhados = [...tipos].sort(() => Math.random() - 0.5);

        let html = '<div id="matching-game-container">';
        html += '<ul class="matching-list">';
        tiposEmbaralhados.forEach((tipo) => {
          html += `<li class="matching-item" draggable="true" data-id="${tipo.id}">${tipo.nome}</li>`;
        });
        html += "</ul>";

        html += '<ul class="matching-list">';
        tipos.forEach((tipo) => {
          html += `<li class="drop-zone" data-id="${tipo.id}">${gerarMatriz(
            tipo.linhas,
            tipo.colunas,
            true,
            Array(tipo.linhas).fill(Array(tipo.colunas).fill("?"))
          )}</li>`;
        });
        html += "</ul></div>";

        document.getElementById("desafio").innerHTML = html;
        configurarArrastarESoltar();
      }

      function configurarArrastarESoltar() {
        const items = document.querySelectorAll(".matching-item");
        const dropZones = document.querySelectorAll(".drop-zone");
        let draggedItem = null;

        items.forEach((item) => {
          item.addEventListener("dragstart", (e) => {
            draggedItem = item;
            setTimeout(() => item.classList.add("dragging"), 0);
          });
          item.addEventListener("dragend", () => {
            draggedItem.classList.remove("dragging");
            draggedItem = null;
          });
        });

        dropZones.forEach((zone) => {
          zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            zone.classList.add("over");
          });
          zone.addEventListener("dragleave", () => {
            zone.classList.remove("over");
          });
          zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("over");
            if (draggedItem) {
              const previousItem = zone.querySelector(".matching-item");
              if (previousItem) {
                document
                  .querySelector(".matching-list")
                  .appendChild(previousItem);
              }
              zone.appendChild(draggedItem);
            }
          });
        });
      }

      function validarJogoDeConexao() {
        const dropZones = document.querySelectorAll(".drop-zone");
        for (const zone of dropZones) {
          const droppedItem = zone.querySelector(".matching-item");
          if (!droppedItem || droppedItem.dataset.id !== zone.dataset.id) {
            return false;
          }
        }
        return true;
      }

      function getMatrizDoUsuario() {
        const tabela = document.querySelectorAll(
          ".matrix-table:last-of-type tr"
        );
        let matriz = [];
        tabela.forEach((linha) => {
          const linhaValores = [];
          linha.querySelectorAll("input").forEach((input) => {
            linhaValores.push(Number(input.value) || 0);
          });
          matriz.push(linhaValores);
        });
        return matriz;
      }

      function verificarResposta() {
        const verifyButton = document.getElementById("verify-button");
        const fase = fases[faseAtual];
        let valida;
        if (fase.validar === validarEscolha) {
            valida = validarEscolha();
        } else {
            const matrizUsuario = fase.validar === validarJogoDeConexao ? null : getMatrizDoUsuario();
            valida = fase.validar(matrizUsuario);
        }

        const feedback = document.getElementById("feedback");
        if (valida) {
          feedback.innerText = "✅ Correto! Avançando para a próxima fase...";
          feedback.style.color = "#27ae60";
          verifyButton.disabled = true;
          setTimeout(() => proximaFase(), 2000);
        } else {
          feedback.innerText = "❌ Verifique sua resposta e tente novamente.";
          feedback.style.color = "#c0392b";
        }
      }

      function proximaFase() {
        faseAtual++;
        if (faseAtual >= fases.length) {
          document.getElementById("game").innerHTML =
            "<h2>🎉 Parabéns! Você completou todas as fases.</h2>";
          return;
        }
        carregarFase();
      }

      function carregarFase() {
        const verifyButton = document.getElementById("verify-button");
        if (verifyButton) {
            verifyButton.disabled = false;
        }
        const fase = fases[faseAtual];
        document.getElementById("faseNum").innerText = faseAtual + 1;
        document.getElementById("titulo").innerText = fase.titulo;
        document.getElementById("descricao").innerText = fase.descricao;
        document.getElementById("feedback").innerText = "";
        fase.gerar();
      }

      carregarFase();