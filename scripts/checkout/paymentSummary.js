import {cart,removeFromCart,countCartQuantity} from'../../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {getDeliveryOption} from '../../data/deliveryOption.js'
  
export function renderPaymentSummary(){
  let paymentTotalQuantity=0;
  let paymentTotalPrice=0;
  let totalShippingHandling=0;
  let totalBeforeTax=0;
  cart.forEach(items=>{
    let matchingProduct=getProduct(items.productId);
    let singleItemPrice=0;
    let singleShippingHandling=0;
    paymentTotalQuantity+=items.quantity;
    singleItemPrice=items.quantity*matchingProduct.priceCents;
    paymentTotalPrice+=singleItemPrice;
    singleShippingHandling=getDeliveryOption(items.deliveryOptionId).priceCents;
    totalShippingHandling+=singleShippingHandling;
  });
  totalBeforeTax=totalShippingHandling+paymentTotalPrice;
  const estimatedTax=totalBeforeTax * 0.1;
  const orderTotal=totalBeforeTax+estimatedTax;

let paymentSummaryHTML='';

document.querySelector('.js-payment-summary')
  .innerHTML=`
  <div class="order-summary-text">Order Summary</div>

<div class="payment-summary-row">
<div class="js-payment-total-items">Items ${paymentTotalQuantity}:</div>
<div class="payment-summary-money js-payment-summary-money">$${formatCurrency(paymentTotalPrice)}</div>
</div>
<div class="payment-summary-row">
<div>Shipping&handling:</div>
<div class="payment-summary-money subtotal-row">$${formatCurrency(totalShippingHandling)}</div>
</div>


<div class="payment-summary-row">
<div>Total before tax:</div>
<div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
</div>
<div class="payment-summary-row">
<div>Estimated tax(10%):</div>
<div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
</div>


<div class=" payment-summary-row order-total-section">
<div class="order-total-text">Order Total:</div>
<div>$${formatCurrency(orderTotal)}</div>
</div>
<div class="place-button-section"><button class="place-button">Place your order</button></div>
</div>
`;        
}

          
          
          
          






