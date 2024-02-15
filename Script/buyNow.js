let cart_items = JSON.parse(localStorage.getItem("cart-items")) || [];

let totalPrice = 0;

// Adding to WebPage
addToTable();
function addToTable() {
  document.querySelector("tbody").innerHTML = "";
  cart_items.forEach((elem, i) => {
    // main row
    let tr = document.createElement("tr");

    // Serial number
    let td1 = document.createElement("td");
    td1.innerText = i + 1;

    // Product ID
    let td2 = document.createElement("td");
    td2.innerText = elem.id;

    // Product Name
    let td3 = document.createElement("td");
    td3.innerText = elem.Name;

    // Product Price
    let td4 = document.createElement("td");
    td4.innerText = elem.Price;

    // Quantity of product
    let td5 = document.createElement("td");
    if (elem.Quantity == undefined) {
      td5.innerText = "1";
    } else {
      td5.innerText = elem.Quantity;
    }

    // Final Price
    let td6 = document.createElement("td");
    td6.innerText = elem.Quantity * elem.Price;

    // Remove button
    let td7 = document.createElement("td");
    td7.innerHTML = ' <img style="width: 20px; height: 20px;" src="close-mark.png">';
    td7.style.cursor = "Pointer";
    td7.addEventListener("click", () => {
      removeFromTable(elem, i);
    });

    // Total Price
    totalPrice = totalPrice + elem.Price * elem.Quantity;

    // Appending all element to WebPage
    document.querySelector("tbody").append(tr);
    tr.append(td1, td2, td3, td4, td5, td6, td7);
  });

  // Final Total Row
  let TotalRow = document.createElement("tr");

  let totalKeyWord = document.createElement("td");
  totalKeyWord.innerText = "Total:";
  totalKeyWord.colSpan = "5";
  totalKeyWord.style.fontWeight = "900";

  let totalRate = document.createElement("td");
  totalRate.innerText = `$ ${totalPrice}`;
  totalRate.style.fontWeight = "900";

  // Appending final row to table
  document.querySelector("tbody").append(TotalRow);
  TotalRow.append(totalKeyWord, totalRate);
}

// remove button functionality
function removeFromTable(elem, i) {
  location.reload();
  addToTable();
  cart_items.splice(i, 1);
  localStorage.setItem("cart-items", JSON.stringify(cart_items));
}

// buy products and after buying the products cart will be empty and you will be redirected to home page
function buyProducts() {
  cart_items.splice(0, cart_items.length);
  alert("Order On The Way");
  localStorage.setItem("cart-items", JSON.stringify(cart_items));
  window.location.href = "index.html";
}
