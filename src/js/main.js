import { loadHeaderFooter } from "./utils.mjs";
import { updateCartIcon } from "./CartCount.mjs";
import Alert from "./Alert.js";

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter(updateCartIcon);

const alertSystem = new Alert("main");
alertSystem.init();

// ✅ ADD THIS PART
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", null, dataSource, listElement);
productList.init();