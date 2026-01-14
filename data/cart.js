export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
  {productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
   quantity:3
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:2
  }
];
}
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
 
//implement the add to cart feature

export function addToCart(productId){
  let matchingItem;
  cart.forEach((item)=>{
   if(item.productId===productId){
      matchingItem=item;
    }
  });
  if(matchingItem){
    matchingItem.quantity+=1;
  }else {
    cart.push({
      productId:productId,
      quantity:1
    });
  }
  saveToStorage();
}


export function removeFromCart(cartDelId){
  const newCart=[];
  cart.forEach(cartItem=>{
    if(cartDelId!==cartItem.productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStorage();
}





    
