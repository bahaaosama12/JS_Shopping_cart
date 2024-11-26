let productsDom = document.querySelector('.product');
let noProductsDom = document.querySelector('.noProducts');

function drawCartProductsUI(allproducts = []){
if(JSON.parse(localStorage.getItem("productsInCart")).length === 0)
    noProductsDom.innerHTML = 'There Is No Products';

    let products = 
      JSON.parse(localStorage.getItem("productsInCart")) || allproducts ;
    let productsUI = products.map((item) => {
        return `
    <div class="product-item">
        <img
         class="product-item-img" 
        src="${item.imageUrl}"
        alt="img"
        />
        
        <div class="product-item-desc">
            <a onclick='saveItemData(${item.id})'>${item.title}</a >
            <p>${item.desc}</p>
            <span>Size${item.size}</span> <br>
            <span>Quntatit ${item.qty}</span>
        </div>
        <div class="product-item-action">
            <button class="add-to-cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
        </div>
    </div> 
        `;
    });
    productsDom.innerHTML = productsUI.join("");
}

drawCartProductsUI()

function removeFromCart(id){
    let productsInCart = localStorage.getItem('productsInCart');
    if(productsInCart) {
        let items = JSON.parse(productsInCart);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsInCart" , JSON.stringify(filteredItems));
        drawCartProductsUI(filteredItems);
    }
}

function saveItemData(id) {
    localStorage.setItem('productId', id);
    window.location = 'cartDetails.html';
  }