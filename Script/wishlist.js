let wishlist_items = JSON.parse(localStorage.getItem("wishlist-items")) || [];

let cart_items = JSON.parse(localStorage.getItem("cart-items")) || [];

// displaying all products to webpage
displayProducts(wishlist_items);
function displayProducts(wishlist_items) {
  document.querySelector("#container").innerHTML = "";
  wishlist_items.forEach((elem) => {
    let card = document.createElement("div");

    let image = document.createElement("img");
    image.src = elem.image;

    let ProductName = document.createElement("h2");
    ProductName.innerText = elem.Name;

    let price = document.createElement("p");
    price.innerText = `$ ${elem.Price}`;

    let delete_but = document.createElement("button");
    delete_but.innerText = "Remove From Wishlist";
    delete_but.addEventListener("click", (i) => deleteItem(i));

    let addToCart = document.createElement("button");
    addToCart.innerText = "Add To Cart";
    addToCart.addEventListener("click", (i) => {
      addingtocart(cart_items,elem.id,elem)
    });

    document.querySelector("#container").append(card);
    card.append(image, ProductName, price, addToCart, delete_but);
  });
}

function deleteItem(i) {
  wishlist_items.splice(i, 1);

  localStorage.setItem("wishlist-items", JSON.stringify(wishlist_items));

  displayProducts(wishlist_items);
}

function addingtocart(arr, id_num, elem) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id_num) {
      return alert("Already Addded to cart");
    }
  }

  cart_items.push(elem);
  localStorage.setItem("cart-items", JSON.stringify(cart_items));
}