function init() {
    productRender()
    PrimeExclusive()
}

// fetch("https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-seller-products?domainCode=com&sellerId=AD97MR4NOW5CD&page=1", {
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-key": "84e9bccac5msh0b2a729d7675d15p134f8djsne7d94130722a",
//         "x-rapidapi-host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com"
//     }
// })
//     .then(response => {
//         console.log(response);
//     })
//     .catch(err => {
//         console.error(err);
//     });


function productRender() {
    productList.forEach(product => showProducts(product))
    console.log("hello")
}
function showProducts(product) {
    const pContainer = document.getElementById('products-container')
    const productCard = document.createElement('div');
    const lineBreak = document.createElement('hr')
    const productImg = document.createElement('img');
    const productRating = document.createElement('p');
    const productPrice = document.createElement('p');
    const productPrime = document.createElement('p');
    const productDescript = document.createElement('span');
    const productBuyButton = document.createElement('button');

    productCard.setAttribute('id', `product ${product.asin}`);
    productCard.setAttribute('class', 'product-card')
    productImg.setAttribute("class", "image")
    productImg.src = `${product.imgUrl}`;
    productRating.innerText = `${product.productRating}`;
    productPrice.innerText = `Price: $${product.price}`;
    productPrime.innerText = 'Is this product exclusive for PRIME Members? '+ primeCheck();
    productDescript.innerText = product.productDescription;
    productBuyButton.innerText = 'Buy';

    productCard.append(productImg, productRating, productPrice, productPrime, productDescript, productBuyButton, lineBreak)
    pContainer.appendChild(productCard)



    productBuyButton.addEventListener("click", function (e) {
        const shoppingCart = document.querySelector("#shopping-bag")
        const newCard = e.target.productCard
        shoppingCart.append(newCard)



    })
    function primeCheck(){
        if (product.prime){
            return 'Yes'
        } else {
            return 'No'
        }
    }
    // const dropDown = document.getElementsByName("clothingprice")
    // dropDown.addEventListener("click", function () {
    //     const options = dropDown.querySelectorAll("option")
    //     if (options === "High") {

    //     }
    // })
}

function PrimeExclusive(){
    const primeBtn = document.querySelector('[name="forPrime"]')
    
    primeBtn.addEventListener('click', e =>{
        if (e.target.value ='Yes'){
        
        }
    })
}




init()
