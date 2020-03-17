const buscador = document.querySelector('#page-header__searcher input');
const lista_carrito = document.querySelector('#cart-list tbody');

loadListenners();
// !LISTENERS

function loadListenners(){
    buscador.addEventListener('input', ()=>{
        console.log(buscador.value);
        if(buscador.value > 3){
            // *busca las cosas
        }
    });

    document.addEventListener('DOMContentLoaded',leerLs);

}


function get_itemInfo(element){
    const card = element.parentNode.parentNode.parentNode.parentNode;
    console.log(element.getAttribute('data-id'));
    return {
        img_card: card.querySelector('.card__image img').src,
        price: element.parentNode.parentNode.querySelector('.body__price').innerText,
        name: element.parentNode.parentNode.parentNode.querySelector('.card-body__title').innerText,
        id: element.getAttribute('data-id')
    }
}


function add_cart(element){
    
    const item = get_itemInfo(element);

    let row = document.createElement('tr'); 
    row.className = 'cart-body__row';
    
    row.innerHTML = `
        <td class="cart-list__card">
            <img src='${item.img_card}' class="card__img">
        </td>
        <td class="cart-list__card">
            <p class="card-info">${item.name}</p>
        </td>
        <td class="cart-list__card">
            <p class="card-info">${item.price}</p>
        </td>
        <td class="cart-list__card"><button class="card__delete" data-id="${item.id}" onclick="rmv_cart(this)">Borrar</button></td>
    `;

    lista_carrito.appendChild(row);
    add_ls(item);


}

function rmv_cart(element){

    const row = element.parentNode.parentNode;
    rmv_ls(element.getAttribute('data-id'));
    row.remove();

}

function clean_cart(){
    while(lista_carrito.firstChild){
        lista_carrito.removeChild(lista_carrito.firstChild);
        if(lista_carrito.firstChild !== null){
            rmv_ls(lista_carrito.firstChild.querySelector('.card__delete').getAttribute('data-id'));
        }
        
    }
}

function add_ls(item){
    let items = getLS();

    items.push(item);

    localStorage.setItem('items', JSON.stringify(items));
}
function rmv_ls(itemD){
    let items = getLS();
    let newItems = items.filter((item)=>{
        if(item.id !== itemD){
            return item
        }
    });

    localStorage.setItem('items', JSON.stringify(newItems));
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
                <img src='${item.img_card}' class="card__img">
            </td>
            <td class="cart-list__card">
                <p class="card-info">${item.name}</p>
            </td>
            <td class="cart-list__card">
                <p class="card-info">${item.price}</p>
            </td>
            <td class="cart-list__card"><button class="card__delete" data-id="${item.id}" onclick="rmv_cart(this)">Borrar</button></td>
        `;
    
        lista_carrito.appendChild(row);
    });

    
}