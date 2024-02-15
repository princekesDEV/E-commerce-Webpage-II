let url = " https://65c9b8a83b05d29307ded806.mockapi.io/Product";

let cart_items = JSON.parse(localStorage.getItem("cart-items")) || [];

let wishlist_items = JSON.parse(localStorage.getItem("wishlist-items")) || [];

let ProductData = [];

// fetching data from url
async function fetchData() {
  try {
    let res = await fetch(url);
    let out = await res.json();
    ProductData = out;
    displayProducts(ProductData);
  } catch (err) {
    console.log(err);
  }
}

fetchData();

// search functionality
function search() {
  console.log("inside");
  let input = document.querySelector("#search_items").value;

  let new_data = ProductData.filter((elem) => {
    return elem.Name.toLowerCase().includes(input.toLowerCase());
  });

  displayProducts(new_data);
}

// displaying products (cards) to WebPage
function displayProducts(ProductData) {
  document.querySelector("#container").innerHTML = "";
  ProductData.forEach((elem) => {
    let card = document.createElement("div");

    let image = document.createElement("img");
    image.src = elem.image;

    let ProductName = document.createElement("h2");
    ProductName.innerText = elem.Name;

    let price = document.createElement("p");
    price.innerText = `$ ${elem.Price}`;

    let addToWishlist = document.createElement("button");
    addToWishlist.innerText = "Add To Wishlist";
    addToWishlist.addEventListener("click", () => {
      adddingtowishlist(wishlist_items,elem.id, elem);
    });

    let addToCart = document.createElement("button");
    addToCart.innerText = "Add To Cart";
    addToCart.addEventListener("click", () => {
      addingtocart(cart_items, elem.id, elem);
    });

    // addding Quantity and FinalPrice keys to elements (products)
    elem.Quantity = 1;
    elem.FinalPrice = elem.Quantity * elem.Price;

    // Appending Products to WebPage
    document.querySelector("#container").append(card);
    card.append(image, ProductName, price, addToWishlist, addToCart);
  });
}

// adding products to cart, items cannot be repeated
function addingtocart(arr, id_num, elem) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id_num) {
      return alert("Already Addded to cart");
    }
  }

  cart_items.push(elem);
  localStorage.setItem("cart-items", JSON.stringify(cart_items));
}

// adding products to wishlist, items cannot be repeated
function adddingtowishlist(arr, id_num, elem) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id_num) {
      return alert("Already Addded to Wishlist");
    }
  }

  wishlist_items.push(elem);
  localStorage.setItem("wishlist-items", JSON.stringify(wishlist_items));
}
