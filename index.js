const shopArray = [];
let addClothes = false;
const addBtn = document.querySelector("#new-btn");
const clothesForm = document.querySelector(".content");
const formBox = document.querySelector(".add-clothes");
clothesForm.style.display = "none";

//reveals form for user to add clothes
addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addClothes = !addClothes;
    if (addClothes) {
        clothesForm.style.display = "block";
    } else {
        clothesForm.style.display = "none";
    }

});

//initializer function
function init() {
    fetchProducts()
    navBarClicks()
    purchaseBox()
}

//iterates over product list to render
function fetchProducts() {
    fetch('http://localhost:8000/productList')
        .then(res => res.json())
        .then(products => products.forEach(renderProduct))
        .catch(err => console.error(err))
}

//Gives functionality to NavBar at top
function navBarClicks() {

    const navListProd = document.querySelector('#product-nav')
    const navListCart = document.querySelector('#cart-nav')
    const productPage = document.getElementById('products-container')
    const cartSect = document.getElementById('shopping-bag')

    navListProd.addEventListener('click', e=>{
        e.preventDefault();
        productPage.scrollIntoView();
    })
    
    
    navListCart.addEventListener('click', e =>{
        e.preventDefault();
        cartSect.scrollIntoView();
    })
}  

//Creates a check to ensure user has products in shopping bag before purchasing
function purchaseBox() {
    const alertButton = document.getElementById("checkout")
    alertButton.addEventListener("click", function () {
        const thanksBanner = document.getElementById('Thank-you')
        const shopBag = document.getElementById('shopping-bag')
        console.log(shopBag.childElementCount)
        
        if (shopBag.childElementCount <1){
            alert("Don't be shy. Buy something! 😊 ")
        }else {
            thanksBanner.style='display: block'
            alert("Thank you for your purchase")   
        }
    })
}

//Main function - Renders products on page, allows user to buy products, and allows user to use filters for products
function renderProduct(product) {
    const pContainer = document.getElementById('products-container')
    const productCard = document.createElement('div');
    const lineBreak = document.createElement('hr')
    const productImg = document.createElement('img');
    const productRating = document.createElement('p');
    const productPrice = document.createElement('p');
    const productPrime = document.createElement('p');
    const productDescript = document.createElement('span');
    const productBuyButton = document.createElement('button');
    const productReviewCount = document.createElement('span')
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

    likeClick.innerText = '👍';
    dislikeClick.innerText = '👎';
    likePhrase.innerText = `This product has ${likeCounter} like(s). Click the emoji to let us know what you think of it! `

    productPrime.innerText = 'Is this product exclusive for PRIME Members? ' + primeCheck();

    productDescript.innerText = product.productDescription;
    productBuyButton.innerText = 'Buy';
    productReviewCount.innerText = `Number of Reviews for this product: ${product.countReview}.`

    productCard.append(productImg, productRating, likeClick, likePhrase, dislikeClick, productDescript, productPrime, productPrice, productBuyButton, lineBreak, productReviewCount)
    pContainer.appendChild(productCard)


    function primeCheck() {
        if (product.prime) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    likeClick.addEventListener('click', () => {
        likeCounter++
        product.countReview++
        patchReviewCount(product)
        productReviewCount.innerText = `Number of Reviews for this product: ${product.countReview}.`
        return likePhrase.innerHTML = `This product has ${likeCounter} like(s). Click the emoji to let us know what you think of it! `

    })

    dislikeClick.addEventListener('click', () => {
        likeCounter--
        product.countReview++
        patchReviewCount(product)
        productReviewCount.innerText = `Number of Reviews for this product: ${product.countReview}.`
        return likePhrase.innerText = `This product has ${likeCounter} like(s). Click the emoji to let us know what you think of it! `
    })

    productBuyButton.addEventListener("click", function (e) {
        e.preventDefault()
        // const priceTotal = document.querySelector("#total-price")
        shopArray.push(product)
        renderShoppingCart(shopArray);

    })
  
    lowRangebtn.addEventListener('click', e =>{
        if (product.price > 20 && shopArray.includes(product)==false){
            productCard.style ='display : none'
            lowRangebtn.style.color='purple'
        } else if (shopArray.includes(product)){
                productCard.style =''
        }}
    )

    highRangebtn.addEventListener('click', e =>{
        if (product.price <= 20 && shopArray.includes(product)==false){
            productCard.style ='display : none'
            highRangebtn.style.color='purple'
        } else if (shopArray.includes(product)){
                productCard.style =''
        }})

    allRangebtn.addEventListener('click', e =>{
         productCard.style =''
         lowRangebtn.style.color=''
         highRangebtn.style.color=''
         lowRangebtn.style =''
         highRangebtn.style =''
    })

    onlyPrimeProds.addEventListener('click', e =>{
        if (productPrime.innerText=='Is this product exclusive for PRIME Members? No' && shopArray.includes(product)==false){
            productCard.style ='display : none'
            lowRangebtn.style.color='purple'
            highRangebtn.style ='display: none'
        } else if (shopArray.includes(product)){
                productCard.style =''
        }})


    allProds.addEventListener('click', e => {
        productCard.style = ''
        onlyPrimeProds.style.color = ''
    })

    function patchReviewCount(product) {
        fetch(`http://localhost:8000/productList/${product.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(product => console.log(product))
    }
}

//Sends inputs in CREATE CLOTHES form to JSON Server
function postFormBox(product) {
    fetch(`http://localhost:8000/productList/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .then(product => console.log(product))
}

//Saves inputs in CREATE CLOTHES box for POSTing in JSON Server
formBox.addEventListener("submit", function (e) {
    e.preventDefault();
    const newClothesDisc = e.target.name.value
    const newClothesImg = e.target.image.value
    console.log(e.target.image.value)
    const newClothesPrime = e.target.exclusive.value
    const newClothesPrice = Number(e.target.price.value)
    const newclothesObj = {

        id: e.target.id,
        countReview: 0,
        imgUrl: newClothesImg,
        price: newClothesPrice,
        prime: newClothesPrime,
        productDescription: newClothesDisc,
        productRating: "0 out of 5 stars",

    }
    renderProduct(newclothesObj);
    postFormBox(newclothesObj);
    formBox.reset();

})

//Renders to-be-purchased products in shopping cart
function renderShoppingCart(products) {
    const shoppingCart = document.querySelector("#shopping-bag")
    shoppingCart.innerHTML = ""
    products.forEach(renderShoppingCartItem)
    renderTotalPrice(products);
}

//Assigns values to cards in shopping cart and adds a REMOVE button to them
function renderShoppingCartItem(product, index) {
    const shoppingCart = document.querySelector("#shopping-bag")


    const newCard = document.createElement('div');
    const productImg = document.createElement('img');
    const productPrice = document.createElement('p');

    productImg.src = product.imgUrl
    productPrice.innerText = `Price: $${product.price}`
    newCard.append(productImg, productPrice)
    newCard.setAttribute("class", "new-card")
    newCard.setAttribute("id", Date.now().toString())
    shoppingCart.append(newCard)
    const removeButton = document.createElement("button")
    newCard.appendChild(removeButton)
    removeButton.innerText = "Remove"



    removeButton.addEventListener("click", function (e) {
        shopArray.splice(index, 1)
        renderShoppingCart(shopArray);
    })

}

//Calculates total price based on contents in Shopping Cart
function renderTotalPrice(products) {

    const total = products.reduce((sum, current) => sum + current.price, 0);
    const priceTotal = document.querySelector("#total-price")

    priceTotal.innerText = `Total: $${total.toFixed(2)}`

}




init()
