import { convertToJson, alertMessage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

function packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1
  }));
}

export default class CheckoutProcess {
  async checkout(form) {
    const formData = new FormData(form);
    const order = Object.fromEntries(formData.entries());

    order.orderDate = new Date().toISOString();

    const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
    order.items = packageItems(cartItems);

    order.orderTotal = 100;
    order.shipping = 10;
    order.tax = 6;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };

    try {
      const response = await fetch(`${baseURL}checkout`, options);
      const data = await convertToJson(response);

      console.log("SUCCESS:", data);

      // ✅ limpa carrinho
      localStorage.removeItem("so-cart");

      // ✅ redireciona
      window.location.href = "/checkout/success.html";

    } catch (err) {
      console.log("ERROR:", err);
      alertMessage("❌ Error: " + JSON.stringify(err.message));
    }
  }
}

