import {cart,removeFromCart,countCartQuantity, updateDeliveryOptionId} from'../../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { deliveryOptions ,getDeliveryOption} from '../../data/deliveryOption.js';
import{renderPaymentSummary}from'./paymentSummary.js'


export function renderOrderSummary(){
  
 let checkOutHTML='';
  cart.forEach((cartItem)=>{
  let matchingItem;
  matchingItem=getProduct(cartItem.productId);
  checkOutHTML+=`
  <div class="product-1 js-cart-item-container-${matchingItem.id}">
  <div class="delivery-date">Delivery date: <span class="js-delivery-date">${dayjs().add(getDeliveryOption(cartItem.deliveryOptionId).deliveryDays,'day').format('dddd,MMMM D')}</span></div>
  <div class="product-container">
    <img class="product-image" src=${matchingItem.image}>
    <div class="product-information">
      <div class="product-name">${matchingItem.name}</div>
      <div class="product-price">$${formatCurrency(matchingItem.priceCents)}</div>
      <div class="product-quantity-container">
        Quantity: <span>${cartItem.quantity}</span> <span class="product-quantity-button">Update</span>
        <span class="product-quantity-button js-product-quantity-button" data-product-id="${matchingItem.id}">Delete</span>
      </div>
    </div>

    <div class="delivery-option">
      <div class="delivery-choosetext">Choose a delivery option:</div>

      ${deliveryOptionsHTML(matchingItem,cartItem)}
    </div>
  </div>
  </div>
  `;
  });
  //
function deliveryOptionsHTML(matchingProduct,cartItem){
  let html='';
  deliveryOptions.forEach((deliveryOption)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd,MMMM D');
    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)}-`;
    const isChecked=deliveryOption.id===cartItem.deliveryOptionId;//key!!!!
    html +=`
      <div class="radio-and-words js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input  ${isChecked ? 'checked':''} class="delivery-option-input js-delivery-option-input" type="radio" name="delivery-optiopn-${matchingProduct.id}" >
        <div class="radio-words">
        <div class="delivery-exact-date">${dateString}</div>
        <div class="delivery-fee">${priceString} Shipping</div>
        </div>
      </div>
    `
  });
  return html;
}//
  countCartQuantity();
  document.querySelector('.js-order-summary')
  .innerHTML=checkOutHTML;

  document.querySelectorAll('.js-product-quantity-button').forEach((button)=>{
  
  button.addEventListener('click',()=>{
    const delItemId=button.dataset.productId;
    removeFromCart(delItemId);//remove from cart
    countCartQuantity();
    const container=document.querySelector(`.js-cart-item-container-${delItemId}`);
    container.remove();
    renderOrderSummary();
   });
   
});
document.querySelectorAll('.js-delivery-option')
  .forEach(element=>{
    element.addEventListener('click',()=>{
      const{productId,deliveryOptionId}=element.dataset;
      updateDeliveryOptionId(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}










