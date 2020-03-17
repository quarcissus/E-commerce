const cart_list = document.querySelector('#summary__cart-list tbody');
let total = 0;

loadListenners();
function loadListenners(){
    document.addEventListener('DOMContentLoaded', leerLs);
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
    console.log(items);
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