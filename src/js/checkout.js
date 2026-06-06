import { loadHeaderFooter } from "./utils.mjs";
import { updateCartIcon } from "./CartCount.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// 🔹 carrega header e atualiza contador do carrinho
loadHeaderFooter(updateCartIcon);

// 🔹 pega o formulário
const form = document.querySelector("#checkoutForm");

// 🔹 cria instância do checkout
const checkout = new CheckoutProcess();

// 🔹 adiciona evento de envio
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // ✅ valida o formulário
  const formValid = form.checkValidity();

  // ✅ mostra mensagens de erro do navegador
  form.reportValidity();

  // ✅ só executa checkout se for válido
  if (formValid) {
    checkout.checkout(form);
  }
});