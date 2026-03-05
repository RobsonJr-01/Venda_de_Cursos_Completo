(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const inputQtd = document.getElementById('quantidade');
    const btnMais = document.getElementById('btn-mais');
    const btnMenos = document.getElementById('btn-menos');
    const totalValor = document.getElementById('total-valor');

    if (!inputQtd || !totalValor) return;

    const precoUnitario = typeof PRECO_UNITARIO !== 'undefined' ? PRECO_UNITARIO : 0;
    const maxVagas = typeof MAX_VAGAS !== 'undefined' ? MAX_VAGAS : 1;

    function formatarMoeda(valor) {
      return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    }

    function atualizarTotal() {
      const quantidade = parseInt(inputQtd.value) || 1;
      const total = precoUnitario * quantidade;

      totalValor.textContent = formatarMoeda(total);

      totalValor.classList.remove('bump');
      void totalValor.offsetWidth; 
      totalValor.classList.add('bump');
    }

    function incrementar() {
      const atual = parseInt(inputQtd.value) || 1;
      if (atual < maxVagas) {
        inputQtd.value = atual + 1;
        atualizarTotal();
      }
    }

    function decrementar() {
      const atual = parseInt(inputQtd.value) || 1;
      if (atual > 1) {
        inputQtd.value = atual - 1;
        atualizarTotal();
      }
    }

    btnMais.addEventListener('click', incrementar);
    btnMenos.addEventListener('click', decrementar);

    atualizarTotal();
  });

  window.finalizarCompra = function () {
    const qtd = parseInt(document.getElementById('quantidade').value) || 1;
    const total = document.getElementById('total-valor').textContent;
    const msgSucesso = document.getElementById('msg-sucesso');
    const btnComprar = document.querySelector('.sidebar-card .btn-primary');

    if (msgSucesso) {
      msgSucesso.textContent = `✅ ${qtd} vaga(s) reservada(s) — Total: ${total}`;
      msgSucesso.style.display = 'block';

      if (btnComprar) {
        btnComprar.disabled = true;
        btnComprar.textContent = 'Matrícula Solicitada!';
        btnComprar.style.opacity = '0.6';
      }

      setTimeout(function () {
        msgSucesso.style.display = 'none';
        if (btnComprar) {
          btnComprar.disabled = false;
          btnComprar.textContent = 'Matricular Agora';
          btnComprar.style.opacity = '1';
        }
      }, 5000);
    }
  };
})();
