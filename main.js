// variable inicial que setea los productos que añade el usuario al carrito y además verifica existencia de productos en localStorage

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

// función que genera cards 

const cardsAHtml = (array, container) => {
    const cards = array.reduce((acc, element) => {
        return acc + `
            <article class="card">
                <h3>
                    ${element.title}
                </h3>
                <button class="boton-carrito" id=${element.id}>
                    Add
                </button>                
            </article>
        `
    }, "")

    container.innerHTML = cards
}

// inyectamos en el DOM las cards creadas dinámicamente desde js

cardsAHtml(products, document.querySelector("#container-cards"))

// función genérica que sube al LocalStorage

const alLocalStorage = ( clave, valor ) => localStorage.setItem(clave, JSON.stringify(valor))

// función genérica que obtiene data del LocalStorage

const obtenerDelLocalStorage = clave => JSON.parse(localStorage.getItem(clave))

// notificación genérica Toastify

const notificarAlUsuario = info => {
    Toastify({
        text: info,
        duration: 1500,        
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }        
      }).showToast();
}

// ligamos evento a botones

const aniadirAlCarrito = array => {

    document.body.addEventListener("click", (event) => {
        if (event.target.className === "boton-carrito") {  
            const producto = array.find( element => element.id === Number(event.target.id))                     
            carrito.push(producto)
            alLocalStorage("carrito", carrito)
            notificarAlUsuario(`${ producto.title} ha sido añadido al carrito.`)
        }
    })
}

aniadirAlCarrito(products)