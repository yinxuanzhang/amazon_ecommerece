import {products} from "../data/products.js";
import {cart,addToCart} from "../data/cart.js";




let productsHTML= '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container" data-product-id="1" data-testid="2">
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-name">${product.name}</div>
        <div class="produt-rating">
          <img src="images/ratings/rating-${product.rating.stars*10}.png" >
          <div class="rating-count">${product.rating.count}</div>
        </div>
        <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
        <div class="selector-container">
          <select class="selector">
            <option selected >1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>

          <div class="product-space"></div>
          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          
          
            <button class="add-button js-add-to-cart" data-product-id="${product.id}">
              Add To Cart
            </button>
      </div>
  `;
});


//render amazon_index html
document.querySelector('.js-products-grid').innerHTML=productsHTML;

//implement the add to cart feature
function countCartQuantity(){
  let itemQuantity=0;
  cart.forEach((item)=>{
    itemQuantity+=item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML=itemQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
      const productId=button.dataset.productId;
      addToCart(productId);
      countCartQuantity();  
  });
});






