// define products//
let productsDom = document.querySelector('.product');
let cartProducMenu = document.querySelector('.carts-products');
let cartProductDom = document.querySelector('.carts-products div');
let badgeDom = document.querySelector('.badge');
let shoppingCartIcon = document.querySelector('.shopping-cart');
let products = productsDB;

// Open cart Menu call
shoppingCartIcon.addEventListener('click', openCartMenu);

// Display Products
let drawProductsUI;
(drawProductsUI = function (products = []) {
  let productsUI = products.map((item) => {
    return `
    <div class="product-item"  style="border: ${
      item.isMe === 'Y' ? '2px solid #9696968f' : ''
    }">
        <img
         class="product-item-img" 
        src="${item.imageUrl}" 
        alt="img"
        />
        
        <div class="product-item-desc">
            <a onclick='saveItemData(${item.id})'>${item.title}</a >
            <p> ${item.desc}</p>
            <span>Size: ${item.size}</span>
            <p class="price">${item.price}</p>

            ${
              item.isMe === 'Y' &&
              "<button class='edit-product' onclick='editProduct(" +
                item.id +
                ")'> Edit product</button>"
            }
        </div>
        <div class="product-item-action">
            <button class="add-to-cart" onclick="addedToCart(${
              item.id
            })">Add to Cart</button>
            <i class="favorite fa-solid fa-heart"style="color: ${
              item.liked == true ? '#923636' : ''
            }"onclick="addToFavorite(${item.id})"></i>
        </div>
    </div> 
        `;
  });
  productsDom.innerHTML = productsUI.join('');
})(JSON.parse(localStorage.getItem('products')) || products);

// check if there is item in loaclStroage and if there add it and check num of cart icon.
let addedItem = localStorage.getItem('productsInCart')
  ? JSON.parse(localStorage.getItem('productsInCart'))
  : [];
if (addedItem) {
  addedItem.map((item) => {
    cartProductDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
  });
  badgeDom.style.display = 'block';
  badgeDom.innerHTML += addedItem.length;
}

// add to cart function
function addedToCart(id) {
  if (localStorage.getItem('username')) {
    let products = JSON.parse(localStorage.getItem('products')) || products;
    let product = products.find((item) => item.id === id);
    let isProductInCart = addedItem.some((i) => i.id === product.id);

    if (isProductInCart) {
      addedItem = addedItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItem.push(product);
    }
    // ui
    cartProductDom.innerHTML = '';
    addedItem.forEach((item) => {
      cartProductDom.innerHTML += `<p> ${item.title} ${item.qty} </p>`;
    });

    // save data
    localStorage.setItem('productsInCart', JSON.stringify(addedItem));
    // add countcer of items
    let cartProductItem = document.querySelectorAll('.carts-products div p');
    badgeDom.style.display = 'block';
    badgeDom.innerHTML = cartProductItem.length;
  } else {
    window.location = 'login.html';
  }
}

function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);

  return unique;
}

//  Open cart Menu function
function openCartMenu() {
  if (cartProductDom.innerHTML != '') {
    if (cartProducMenu.style.display == 'block') {
      cartProducMenu.style.display = 'none';
    } else {
      cartProducMenu.style.display = 'block';
    }
  }
}

function saveItemData(id) {
  localStorage.setItem('productId', id);
  window.location = 'cartDetails.html';
}

// search function
let input = document.getElementById('search');
input.addEventListener('keyup', function (e) {
  search(e.target.value, JSON.parse(localStorage.getItem('products')));

  if (e.target.value.trim() === '')
    drawProductsUI(JSON.parse(localStorage.getItem('products')));
});

function search(title, myArray) {
  let arr = myArray.filter(
    (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
  );
  drawProductsUI(arr);
}

// add to favorite function
let favoritesItems = localStorage.getItem('productsFavorte')
  ? JSON.parse(localStorage.getItem('productsFavorte'))
  : [];
function addToFavorite(id) {
  if (localStorage.getItem('username')) {
    let choosenItem = products.find((item) => item.id === id);
    choosenItem.liked = true;
    favoritesItems = [...favoritesItems, choosenItem];
    let uniqueProducts = getUniqueArr(favoritesItems, 'id');
    localStorage.setItem('productsFavorte', JSON.stringify(uniqueProducts));
    products.map((item) => {
      if (item.id === choosenItem.id) {
        item.liked = true;
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
    drawProductsUI(products);
  } else {
    window.location = 'login.html';
  }
}

// Fiter Product by size
let sizeFilter = document.getElementById('size-filter');

sizeFilter.addEventListener('change', getProductsFilteredBySize);

function getProductsFilteredBySize(e) {
  let val = e.target.value;
  let products = JSON.parse(localStorage.getItem('products') || products);

  if (val === 'all') {
    drawProductsUI(products);
  } else {
    products = products.filter((i) => i.size === val);
    drawProductsUI(products);
  }
}

// Edit products 
function editProduct (id){
  localStorage.setItem("editPorducts", id);

  window.location="editProduct.html"
  
}