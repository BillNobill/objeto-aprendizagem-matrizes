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
          titulo: "Matrizes Triangulares",
          descricao: "Observe as matrizes e identifique a Triangular Superior e a Triangular Inferior. Digite a letra correspondente em cada campo.",
          gerar: gerarExercicioTriangular,
          validar: validarExercicioTriangular,
        },
        {
          titulo: "Matriz Simétrica",
          descricao: "Complete a matriz para que ela seja simétrica (A[i][j] = A[j][i]).",
          gerar: gerarExercicioSimetrica,
          validar: validarExercicioSimetrica,
        },
        {
          titulo: "Verdadeiro ou Falso",
          descricao: "Avalie as afirmações sobre os tipos de matrizes e marque como Verdadeiro ou Falso.",
          gerar: gerarExercicioVerdadeiroFalso,
          validar: validarExercicioVerdadeiroFalso,
        },
      ];

      let faseAtual = 0;
      let dadosFase;
      let pontuacao = {
        certas: 0,
        erradas: 0,
      };

      function gerarExercicioVerdadeiroFalso() {
        const afirmacoes = [
            { afirmativa: "A transposta de uma matriz 2x3 é uma matriz 3x2.", resposta: true },
            { afirmativa: "Toda matriz identidade é uma matriz escalar.", resposta: true },
            { afirmativa: "Uma matriz antissimétrica deve ter todos os elementos da diagonal principal iguais a zero.", resposta: true },
            { afirmativa: "A matriz unidade é o mesmo que a matriz identidade.", resposta: true },
            { afirmativa: "A transposta de uma matriz diagonal é sempre ela mesma.", resposta: true },
            { afirmativa: "Uma matriz normal é sempre simétrica.", resposta: false },
            { afirmativa: "A matriz [[0, -1], [1, 0]] é antissimétrica.", resposta: true },
            { afirmativa: "Toda matriz escalar é uma matriz identidade.", resposta: false },
        ].sort(() => Math.random() - 0.5).slice(0, 4);

        dadosFase = { afirmacoes };

        let html = '<div class="vf-container">';
        afirmacoes.forEach((item, index) => {
            html += `
                <div class="vf-item">
                    <p>${item.afirmativa}</p>
                    <div class="vf-botoes">
                        <label><input type="radio" name="vf-${index}" value="true"> Verdadeiro</label>
                        <label><input type="radio" name="vf-${index}" value="false"> Falso</label>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        document.getElementById("desafio").innerHTML = html;
    }

    function validarExercicioVerdadeiroFalso() {
        const { afirmacoes } = dadosFase;
        for (let i = 0; i < afirmacoes.length; i++) {
            const respostaUsuario = document.querySelector(`input[name="vf-${i}"]:checked`);
            if (!respostaUsuario || (respostaUsuario.value === 'true') !== afirmacoes[i].resposta) {
                return false;
            }
        }
        return true;
    }

      function gerarExercicioTriangular() {
        const letras = ['A', 'B', 'C', 'D', 'E', 'F'];
        const superiorCorreta = { matriz: [[1, 2, 3], [0, 4, 5], [0, 0, 6]], tipo: 'S' };
        const inferiorCorreta = { matriz: [[1, 0, 0], [2, 3, 0], [4, 5, 6]], tipo: 'I' };
        const incorretas = [
            { matriz: [[1, 2, 3], [0, 4, 5], [1, 0, 6]], tipo: 'N' },
            { matriz: [[1, 0, 0], [2, 3, 1], [4, 5, 6]], tipo: 'N' },
            { matriz: [[1, 2, 0], [3, 4, 0], [0, 5, 6]], tipo: 'N' },
            { matriz: [[1, 0, 2], [0, 3, 0], [4, 0, 5]], tipo: 'N' },
            { matriz: [[9, 8, 7], [6, 5, 4], [3, 2, 1]], tipo: 'N' },
            { matriz: [[0, 0, 1], [0, 2, 0], [3, 0, 0]], tipo: 'N' }
        ].sort(() => Math.random() - 0.5);

        const matrizesFinais = new Array(6);
        matrizesFinais[2] = superiorCorreta; // C
        matrizesFinais[5] = inferiorCorreta; // F

        let incorretasIndex = 0;
        for (let i = 0; i < 6; i++) {
            if (!matrizesFinais[i]) {
                matrizesFinais[i] = incorretas[incorretasIndex++];
            }
        }

        dadosFase = {
            respostaSuperior: 'C',
            respostaInferior: 'F'
        };

        let html = '<div class="triangular-container">';
        matrizesFinais.forEach((item, index) => {
            html += `
                <div class="triangular-item">
                    <strong>${letras[index]}</strong>
                    ${gerarMatriz(3, 3, true, item.matriz)}
                </div>
            `;
        });
        html += '</div>';

        html += `
            <div class="triangular-inputs">
                <div>
                    <label for="superior-input">Triangular Superior:</label>
                    <input type="text" id="superior-input" maxlength="1" placeholder="Letra">
                </div>
                <div>
                    <label for="inferior-input">Triangular Inferior:</label>
                    <input type="text" id="inferior-input" maxlength="1" placeholder="Letra">
                </div>
            </div>
        `;

        document.getElementById("desafio").innerHTML = html;
    }

    function validarExercicioTriangular() {
        const respostaUsuarioSuperior = document.getElementById('superior-input').value.toUpperCase();
        const respostaUsuarioInferior = document.getElementById('inferior-input').value.toUpperCase();

        return respostaUsuarioSuperior === dadosFase.respostaSuperior && 
               respostaUsuarioInferior === dadosFase.respostaInferior;
    }

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
            nome: "Matriz Quadrada",
            linhas: 2,
            colunas: 2,
            id: "quadrada",
          },
          {
            nome: "Matriz Retangular",
            linhas: 2,
            colunas: 3,
            id: "retangular",
          },
          { nome: "Matriz Linha", linhas: 1, colunas: 3, id: "linha" },
          { nome: "Matriz Coluna", linhas: 3, colunas: 1, id: "coluna" },
        ];

        dadosFase = { tipos: tipos.map((t) => t.id) };
        const tiposEmbaralhadosParaArrastar = [...tipos].sort(() => Math.random() - 0.5);
        const tiposEmbaralhadosParaSoltar = [...tipos].sort(() => Math.random() - 0.5);

        let html = '<div id="matching-game-container">';
        html += '<ul class="matching-list">';
        tiposEmbaralhadosParaArrastar.forEach((tipo) => {
          html += `<li class="matching-item" draggable="true" data-id="${tipo.id}">${tipo.nome}</li>`;
        });
        html += "</ul>";

        html += '<ul class="matching-list">';
        tiposEmbaralhadosParaSoltar.forEach((tipo) => {
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
        } else if (fase.validar === validarExercicioTriangular) {
            valida = validarExercicioTriangular();
        } else if (fase.validar === validarExercicioVerdadeiroFalso) {
            valida = validarExercicioVerdadeiroFalso();
        } else {
            const matrizUsuario = fase.validar === validarJogoDeConexao ? null : getMatrizDoUsuario();
            valida = fase.validar(matrizUsuario);
        }

        const feedback = document.getElementById("feedback");
        if (valida) {
          pontuacao.certas++;
          feedback.innerText = "✅ Correto! Avançando para a próxima fase...";
          feedback.style.color = "#27ae60";
          verifyButton.disabled = true;
          setTimeout(() => proximaFase(), 2000);
        } else {
          pontuacao.erradas++;
          feedback.innerText = "❌ Verifique sua resposta e tente novamente.";
          feedback.style.color = "#c0392b";
        }
      }

      function proximaFase() {
        faseAtual++;
        if (faseAtual >= fases.length) {
          mostrarResultadoFinal();
          return;
        }
        carregarFase();
      }

      function mostrarResultadoFinal() {
        document.getElementById("game").innerHTML = `
          <div class="resultado-final">
            <h2>🎉 Parabéns! Você completou todas as fases.</h2>
            <p>Sua pontuação:</p>
            <div class="pontuacao-final">
                <span class="certas">✔ Certas: ${pontuacao.certas}</span>
                <span class="erradas">✖ Erradas: ${pontuacao.erradas}</span>
            </div>
            <div class="botoes-finais">
                <button onclick="reiniciarJogo()">Tentar Novamente</button>
                <button onclick="window.location.href = '../index.html'">Voltar aos Cards</button>
            </div>
          </div>
        `;
      }

      function reiniciarJogo() {
        faseAtual = 0;
        pontuacao = { certas: 0, erradas: 0 };
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