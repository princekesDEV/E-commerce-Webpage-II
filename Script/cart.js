let cart_items = JSON.parse(localStorage.getItem("cart-items")) || [];

let total_Price = 0;

displayProducts(cart_items);

// displaying all products (cards) to WebPage
function displayProducts(cart_items) {
  document.querySelector("#container").innerHTML = "";
  cart_items.forEach((elem, i) => {
    let card = document.createElement("div");

    let image = document.createElement("img");
    image.src = elem.image;

    let ProductName = document.createElement("h2");
    ProductName.innerText = elem.Name;

    let price = document.createElement("p");
    price.innerText = `$ ${elem.Price}`;

    let noOfPieces = document.createElement("select");
    noOfPieces.innerHTML =
      '<option value="1">Select Quantity</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option>';
    noOfPieces.style.display = "block";
    noOfPieces.style.margin = "auto";
    noOfPieces.style.textAlign = "center";
    noOfPieces.addEventListener("change", () => {
      quantity(noOfPieces, elem);
      FinalPrice(elem);
    });

    // Adding Delete button to all cards
    let delete_but = document.createElement("button");
    delete_but.innerText = "Remove From Cart";
    delete_but.addEventListener("click", (i) => deleteItem(i));

    // Appending all products to WebPage
    document.querySelector("#container").append(card);
    card.append(image, ProductName, price, noOfPieces, delete_but);
  });
}

// Remove from cart functionality
function deleteItem(i) {
  cart_items.splice(i, 1);

  localStorage.setItem("cart-items", JSON.stringify(cart_items));

  displayProducts(cart_items);
}

// updating Quantity of the particular product in localStorage
function quantity(noOfPieces, elem) {
  elem.Quantity = noOfPieces.value;

  localStorage.setItem("cart-items", JSON.stringify(cart_items));
}

// updating FianlPrice of the particular product in localStorage
function FinalPrice(elem) {
  elem.FinalPrice = elem.Quantity * elem.Price;
  localStorage.setItem("cart-items", JSON.stringify(cart_items));
  console.log(total_Price);
}
