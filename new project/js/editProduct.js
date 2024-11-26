// Varibels
let products = JSON.parse(localStorage.getItem('products')) || productsDB;
let productId = JSON.parse(localStorage.getItem('editPorducts'));
let getProduct = products.find((i) => i.id === productId);
let productName = document.getElementById('product-name');
let productDesc = document.getElementById('product-desc');
let productSizeSelect = document.getElementById('product-size');
let productPrice = document.getElementById('product-price');
let updateForm = document.getElementById('update-form');
let inputFile = document.getElementById('upload-image-file');
let ProductSizeValue;
let productImage;

productName.value = getProduct.title;
productDesc.value = getProduct.desc;
productSizeSelect.value = getProduct.size;
productPrice.value = getProduct.price;
productImage = getProduct.imageUrl;

// Events
productSizeSelect.addEventListener('change', getProductSizeValue);
updateForm.addEventListener('submit', UpdateProductFun);
inputFile.addEventListener('change', uploadImage);

// Functions
function getProductSizeValue(e) {
  ProductSizeValue = e.target.value;
}
 
function UpdateProductFun(e) {
  e.preventDefault();

  getProduct.title = productName.value;
  getProduct.desc = productDesc.value;
  getProduct.size = productSizeSelect.value;
  getProduct.price = productPrice.value+"EGP";
  getProduct.imageUrl = productImage;
  
  localStorage.setItem('products', JSON.stringify(products));

  setTimeout(() => {
    window.location = 'index.html';
  }, 500);
}

// upload Image

function uploadImage() {
  let file = this.files[0];
  getImageBase64(file);
  // productImage = URL.createObjectURL(file);
}

function getImageBase64(file) {
  let reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function () {
    productImage = reader.result;
  };
  reader.onerror = function () {
    alert('Error !! ');
  };
}
