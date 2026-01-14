import {cart,removeFromCart} from'../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { products } from '../data/products.js';
const fastestDate=dayjs().add(1,'day').format('dddd,MMMM D');
const normalDate=dayjs().add(5,'day').format('dddd,MMMM D');
const freeDate=dayjs().add(9,'day').format('dddd,MMMM D');


let checkOutHTML='';
cart.forEach((cartItem)=>{
  let matchingItem;
  products.forEach((product)=>{
    if(product.id===cartItem.productId){
      matchingItem=product;
    }
  });
  checkOutHTML+=`
  <div class="product-1 js-cart-item-container-${matchingItem.id}">
  <div class="delivery-date">Delivery date: <span class="js-delivery-date">${fastestDate}</span></div>
  <div class="product-container">
    <img class="product-image" src=${matchingItem.image}>
    <div class="product-information">
      <div class="product-name">${matchingItem.name}</div>
      <div class="product-price">$${(matchingItem.priceCents/100).toFixed(2)}</div>
      <div class="product-quantity-container">
        Quantity: <span>${cartItem.quantity}</span> <span class="product-quantity-button">Update</span>
        <span class="product-quantity-button js-product-quantity-button" data-product-id="${matchingItem.id}">Delete</span>
      </div>
    </div>

    <div class="delivery-option">
      <div class="delivery-choosetext">Choose a delivery option:</div>
      <div class="radio-and-words">
        <input  class="delivery-option-input js-delivery-option-input" type="radio" name="delivery-optiopn-${matchingItem.id}" checked>
        <div class="radio-words">
        <div class="delivery-exact-date">${freeDate}</div>
        <div class="delivery-fee">FREE Shipping</div>
        </div>
      </div>
      <div class="radio-and-words">
        <input  class="delivery-option-input js-delivery-option-input" type="radio" name="delivery-optiopn-${matchingItem.id}">
        <div class="radio-words">
        <div class="delivery-exact-date">${normalDate}</div>
        <div class="delivery-fee">$4.99 - Shipping</div>
        </div>
      </div>
      <div class="radio-and-words">
        <input  class="delivery-option-input js-delivery-option-input"type="radio" name="delivery-optiopn-${matchingItem.id}">
        <div class="radio-words">
        <div class="delivery-exact-date">${fastestDate}</div>
        <div class="delivery-fee">$9.99 - Shipping</div>
        </div>
      </div>

    </div>
  </div>
</div>
  `;
});





document.querySelector('.js-order-summary')
  .innerHTML=checkOutHTML;

document.querySelectorAll('.js-product-quantity-button').forEach((button)=>{
  
  button.addEventListener('click',()=>{
    const delItemId=button.dataset.productId;
    removeFromCart(delItemId);//remove from cart
    
    const container=document.querySelector(`.js-cart-item-container-${delItemId}`);
    container.remove();
   });
   
});
console.log(cart);