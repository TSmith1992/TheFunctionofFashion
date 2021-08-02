function init(){
    productRender()
}

//func to iterate over product list
function productRender(){
    productList.forEach(product => showProducts(product))
}

//func to create product card
function showProducts(product){
    const pContainer = document.getElementById('products-container');
    const productCard = document.createElement('div');
    const lineBreak = document.createElement('hr')
    const productImg = document.createElement('img');
    const productRating = document.createElement('p');
    const productPrice = document.createElement('p');
    const productPrime = document.createElement('p');
    const productDescript = document.createElement('span');
    const productBuyButton = document.createElement('button');


    productCard.setAttribute('id',`product ${product.asin}`);
    productCard.setAttribute('class','product-card')
    productImg.src=`${product.imgUrl}`;
    productRating.innerText=`${product.productRating}`;
    productPrice.innerText=`Price: $${product.price}`;
    productPrime.innerText ='Is this product exclusive for PRIME Members? ' + forPrimeMembers();
    productDescript.innerText = product.productDescription;
    productBuyButton.innerText = 'Buy';

    productCard.append(productImg,productRating,productPrice,productPrime,productDescript,productBuyButton,lineBreak)
    pContainer.appendChild(productCard)
}

//func to tell if a product is exclusively for Prime Members
function forPrimeMembers(){
    if (productList.prime){
        return 'Yes'
    }else{
        return 'No'
    }
}

init()

//ctrl shift n