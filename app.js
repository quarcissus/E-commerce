const buscador = document.querySelector('#page-header__searcher input');



// !LISTENERS

buscador.addEventListener('input', ()=>{
    console.log(buscador.value);
    if(buscador.value > 3){
        // *busca las cosas
    }
})