function init() {
    productRender()
}

// fetch("https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-seller-products?domainCode=com&sellerId=AD97MR4NOW5CD&page=1", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "0ea4ca4479msh35a0d514694fec8p1b3d3ejsn2f6692e1d189",
// 		"x-rapidapi-host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com"
// 	}
// })
// .then(res => res.json())
// .then(products => console.log(products))
// .catch(err => {
// 	console.error(err);
// });

function productRender() {
    productList.forEach(product => showProducts(product))
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
    const onlyPrimeProds = document.getElementById('prime-btn');
    const allProds = document.getElementById('all-btn');
    const lowRangebtn = document.getElementById('low-range');
    const highRangebtn = document.getElementById('high-range');
    const allRangebtn = document.getElementById('all-range');

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

    function primeCheck(){
        if (product.prime){
            return 'Yes'
        } else {
            return 'No'
        }
    }

    productBuyButton.addEventListener("click", function (e) {
        const shoppingCart = document.querySelector("#shopping-bag")
        const newCard = e.target.productCard
        shoppingCart.append(newCard)
    })

    lowRangebtn.addEventListener('click', e =>{
        if (product.price > 20){
         productCard.style ='display : none'
         lowRangebtn.style.color='purple'
        }
    })

    highRangebtn.addEventListener('click', e =>{
        if (product.price < 20){
         productCard.style ='display : none'
         highRangebtn.style.color='purple'
        }
    })

    allRangebtn.addEventListener('click', e =>{
         productCard.style =''
         lowRangebtn.style.color=''
         highRangebtn.style.color=''
    })

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
    // const dropDown = document.getElementsByName("clothingprice")
    // dropDown.addEventListener("click", function () {
    //     const options = dropDown.querySelectorAll("option")
    //     if (options === "High") {

    //     }
    // })
}




init()
