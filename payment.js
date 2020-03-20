Stripe.setPublishableKey('pk_test_xmiinUUVWkEZEMk0glI31WbF00EOOVgEWU');
const cart_list = document.querySelector('#summary__cart-list tbody');
const payment_btn = document.getElementById('card-info');
let total = 0;

loadListenners();
function loadListenners(){
    document.addEventListener('DOMContentLoaded', leerLs);

    payment_btn.addEventListener('submit', chargePayment);
    
}



function getLS(){
    let itemsLS;
    if(localStorage.getItem('items') === null){
        itemsLS = [];
    }else{
        itemsLS = JSON.parse(localStorage.getItem('items'));
    }

    return itemsLS;

}

function leerLs(){
    const items  = getLS();
    items.forEach( (item)=>{
        let row = document.createElement('tr'); 
        row.className = 'cart-body__row';
        
        row.innerHTML = `

            <td class="cart-list__card">
                <p class="card-info">${item.name}</p>
            </td>
            <td class="cart-list__card">
                <p class="card-info price">${item.price}</p>
            </td>
        `;
        total += parseInt(item.price.substring(1));
        cart_list.appendChild(row);
    });

    totalPay();
    

    
}

function totalPay(){
    let div = document.createElement('div');
    let divText = document.createElement('p')
    divText.innerText = 'Total';
    divText.className = 'total-title'
    div.appendChild(divText);
    

    let p = document.createElement('p');
    p.innerText = `$${total}`;
    div.appendChild(p);
    cart_list.appendChild(div);
}

function chargePayment(e){
    e.preventDefault();
    const card = {
        card_number: document.querySelector('.card-number').value,
        card_cvc: document.querySelector('.card-cvc').value,
        card_month: document.querySelector('.card-expiry-month').value,
        card_year: document.querySelector('.card-expiry-year').value
    }


    stripeResponseHandler();
}


function stripeResponseHandler(status, response){

    Stripe.card.createToken({
        number: card.card_number,
        cvc: card.card_cvc,
        exp_month: card.card_name,
        exp_year: card.card_month
    }, stripeResponseHandler);

}