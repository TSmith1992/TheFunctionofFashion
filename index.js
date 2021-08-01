function init(){
    productRender()
}

function productRender(){
    productList.forEach(product => showProducts(product))
}

function showProducts(product){
    const pContainer = document.getElementById('products-container');
    const productCard = document.createElement('div');
    const productImg = document.createElement('img');
    const productRating = document.createElement('p');
    const productPrice = document.createElement('p');
    const productPrime = document.createElement('p');
    const productDescript = document.createElement('span')


    productCard.setAttribute('id',`product ${product.asin}`);
    productImg.src=`${product.imgURL}`;
    productRating.innerText=`${product.productRating}`;
    productPrice.innerText=`Price: $${product.price}`;
    productPrime.innerText =`Is this product exclusive for PRIME Members? ${product.prime}`
    productDescript.innerText = product.productDescription

    productCard.append(productImg,productRating,productPrice,productPrime,productDescript)
    pContainer.appendChild(productCard)
}

init()

