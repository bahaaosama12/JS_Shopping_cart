// var

let productName = document.getElementById('product-name');
let productDesc = document.getElementById('product-desc');
let productSizeSelect = document.getElementById('product-size');
let productPrice = document.getElementById('product-price');
let createForm = document.getElementById('create-form');
let inputFile = document.getElementById('upload-image-file');
let ProductSizeValue;
let productImage;

// Events
productSizeSelect.addEventListener('change', getProductSizeValue);
createForm.addEventListener('submit', createProductFun);
inputFile.addEventListener('change', uploadImage);

// Functions
function getProductSizeValue(e) {
  ProductSizeValue = e.target.value;
}
function createProductFun(e) {
  e.preventDefault();
  let allprducts = JSON.parse(localStorage.getItem('products')) || productsDB;
  let namevalue = productName.value;
  let descvalue = productDesc.value;
  let pricevalue = productPrice.value;

  if (namevalue && descvalue) {
    let opj = {
      id: allprducts ? allprducts.length + 1 : 1,
      qty: 1,
      imageUrl: productImage,
      size: ProductSizeValue,
      price: pricevalue + 'EGP',
      title: namevalue,
      desc: descvalue,
      isMe: 'Y',
    };
    let newProducts = allprducts ? [...allprducts, opj] : [opj];
    localStorage.setItem('products', JSON.stringify(newProducts));

    productName.value = '';
    productDesc.value = '';
    productSizeSelect.value = '';

    setTimeout(() => {
      window.location = 'index.html';
    }, 500);
  } else {
    alert('Enter Data...');
  }
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
