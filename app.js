const buscador = document.querySelector('#page-header__searcher input');



// !LISTENERS

buscador.addEventListener('input', ()=>{
    console.log(buscador.value);
    if(buscador.value > 3){
        // *busca las cosas
    }
})


function add_cart(element){
    const card = element.parentNode.parentNode.parentNode.parentNode;
    const img_card = card.querySelector('.card__image img').src;
    console.log(img_card);
    
}