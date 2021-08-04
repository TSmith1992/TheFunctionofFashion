//initializer function
function init() {
    productRender()
    imageClick()
    navBarClicks()
    purchaseBox()
}


//iterates over product list to render
function productRender() {
    //productList.forEach(product => showProducts(product))
    fetch("https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-seller-products?domainCode=com&sellerId=AD97MR4NOW5CD&page=1", {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "0ea4ca4479msh35a0d514694fec8p1b3d3ejsn2f6692e1d189",
        "x-rapidapi-host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com"
    }
})
    .then(res => res.json())
    .then(products => products.forEach(products.searchProductDetails))
    .catch(err => {
        console.error(err);
    });
}



const priceArrays = []

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
    const onlyPrimeProds = document.getElementById('prime-btn');
    const allProds = document.getElementById('all-btn');
    const lowRangebtn = document.getElementById('low-range');
    const highRangebtn = document.getElementById('high-range');
    const allRangebtn = document.getElementById('all-range');
    const likeClick = document.createElement('p')
    const dislikeClick = document.createElement('p')
    let likePhrase = document.createElement('p')
    let likeCounter = 0

    productCard.setAttribute('id', `product ${product.asin}`);
    productCard.setAttribute('class', 'product-card')
    productImg.setAttribute("class", "image")
    productImg.src = `${product.imgUrl}`;
    productRating.innerText = `${product.productRating}`;
    productPrice.innerText = `Price: $${product.price}`;
    likeClick.innerText='👍';
    dislikeClick.innerText='👎';
    likePhrase.innerText = `This product has ${likeCounter} like(s). Click the emoji to let us know what you think of it! `
    productPrime.innerText = 'Is this product exclusive for PRIME Members? ' + primeCheck();
    productDescript.innerText = product.productDescription;
    productBuyButton.innerText = 'Buy';

    productCard.append(productImg, productRating, likeClick, likePhrase, dislikeClick, productDescript, productPrime, productPrice, productBuyButton, lineBreak)
    pContainer.appendChild(productCard)

    likeClick.addEventListener('click',() =>{
        likeCounter++
        return likePhrase.innerHTML = `This product has ${likeCounter} like(s). Click the emoji to let us know what you think of it! `
        
    })

    dislikeClick.addEventListener('click',() =>{
        likeCounter--
        return likePhrase.innerText = `This product has ${likeCounter} like(s). Click the emoji to let us know what you think of it! `
    })


    function primeCheck() {
        if (product.prime) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    productBuyButton.addEventListener("click", function (e) {
        e.preventDefault()
        const priceTotal = document.querySelector("#total-price")
        const shoppingCart = document.querySelector("#shopping-bag")
        priceArrays.push(product.price)
        console.log(priceArrays)
        const currentPrice = priceArrays.reduce(function (sum, current) {
            return sum + current;
        }, 0)
        console.log(currentPrice)
        const newCard = e.target.parentElement
        shoppingCart.append(newCard)
        productBuyButton.remove()
        productRating.remove()
        productDescript.remove()
        productPrime.remove()
        const removeButton = document.createElement("button")
        newCard.appendChild(removeButton)
        removeButton.innerText = "Remove"
        showProducts(product)
        priceTotal.innerText = `Total : ${currentPrice}`
        removeButton.addEventListener("click", function (e) {
            newCard.remove()
            priceTotal.innerText = `Total : ${currentPrice - product.price} `
        })
    })

    lowRangebtn.addEventListener('click', e =>{
        if (product.price > 20){
         productCard.style ='display : none'
         lowRangebtn.style.color='purple'
         highRangebtn.style ='display: none'
        }
    })

    highRangebtn.addEventListener('click', e =>{
        if (product.price < 20){
         productCard.style ='display : none'
         highRangebtn.style.color='purple'
         lowRangebtn.style ='display: none'
        }
    })

    allRangebtn.addEventListener('click', e =>{
         productCard.style =''
         lowRangebtn.style.color=''
         highRangebtn.style.color=''
         lowRangebtn.style =''
         highRangebtn.style =''

    onlyPrimeProds.addEventListener('click', e =>{
        if (productPrime.innerText=='Is this product exclusive for PRIME Members? No'){
        productCard.style ='display : none'
        onlyPrimeProds.style.color='purple'
        }
    })


    allProds.addEventListener('click', e =>{
        productCard.style =''
        onlyPrimeProds.style.color=''
    })
})
}

function purchaseBox() {
    const alertButton = document.getElementById("checkout")
    alertButton.addEventListener("click", function () {

        alert("Thank you for your purchase")

    })

}

function navBarClicks(){
    const navListProd = document.querySelector('#product-nav')
    const navListCart = document.querySelector('#cart-nav')
    const productPage = document.getElementById('products-container')
    const cartSect = document.getElementById('shopping-bag')
    
    navListProd.addEventListener('click', ()=>{
        productPage.scrollIntoView();
    })

    navListCart.addEventListener('click', ()=>{
        cartSect.scrollIntoView();
    })  
}

//Used to allow user to click on image in top banner to go to Shopping Cart
function imageClick(){
    const cartImage = document.querySelector('img')
    const cartBag = document.getElementById('shopping-bag')
    
    cartImage.addEventListener('click', () =>{
        cartBag.scrollIntoView();
        
    })
}

init()
