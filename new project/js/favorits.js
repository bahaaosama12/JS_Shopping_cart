let productsDom = document.querySelector('.product');
let noProductsDom = document.querySelector('.noProducts');

function drawFavoritsProductsUI(allproducts = []){
if(JSON.parse(localStorage.getItem("productsFavorte")).length === 0)
    noProductsDom.innerHTML = 'There Is No Products';

    let products = 
      JSON.parse(localStorage.getItem("productsFavorte")) || allproducts ;
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
            <button class="add-to-cart" onclick='removeFromfavorite(${item.id})' >Remove From Favorits</button>
        </div>
    </div> 
        `;
    });
    productsDom.innerHTML = productsUI.join("");
}

drawFavoritsProductsUI()

function removeFromfavorite(id){
    let productsFavorte = localStorage.getItem('productsFavorte');
    if(productsFavorte) {
        let items = JSON.parse(productsFavorte);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsFavorte" , JSON.stringify(filteredItems));
        drawFavoritsProductsUI(filteredItems);
    }
}
