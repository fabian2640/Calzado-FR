// Inicializa el carrito como un array vacío
let carrito = [];

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    const contenedorItemsCarrito = document.getElementById('items-carrito');
    const elementoPrecioTotal = document.getElementById('precio-total');
    
    contenedorItemsCarrito.innerHTML = '';
    
    let total = 0;
    carrito.forEach((item, index) => {
        const divItem = document.createElement('div');
        divItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="imagen-producto">
            <p>${item.nombre} - $${item.precio} x ${item.cantidad}</p>
            <button onclick="aumentarCantidad(${index})">+</button>
            <button onclick="disminuirCantidad(${index})">-</button>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        contenedorItemsCarrito.appendChild(divItem);
        total += item.precio * item.cantidad;
    });
    
    elementoPrecioTotal.innerText = `Total: $${total}`;
}

// Función para agregar un artículo al carrito
function agregarAlCarrito(producto) {
    const itemExistente = carrito.find(item => item.nombre === producto.nombre);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1, imagen: producto.imagen });
    }
    
    actualizarCarrito(); 
}

// Función para eliminar un artículo del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    actualizarCarrito(); 
}

// Función para aumentar la cantidad de un artículo
function aumentarCantidad(index) {
    carrito[index].cantidad += 1; 
    actualizarCarrito();
}

// Función para disminuir la cantidad de un artículo
function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1; 
    } else {
        eliminarDelCarrito(index); 
    }
    actualizarCarrito(); 
}

// Función para vaciar el carrito al pagar
function pagar() {
    carrito = []; 
    actualizarCarrito(); 
}

// Agrega los event listeners a los botones de agregar al carrito
document.querySelectorAll('.agregar-al-carrito').forEach(boton => {
    boton.addEventListener('click', (event) => {
        const elementoProducto = event.target.parentElement; 
        const producto = {
            nombre: elementoProducto.getAttribute('data-nombre'),
            precio: parseFloat(elementoProducto.getAttribute('data-precio')),
            imagen: elementoProducto.querySelector('img').src 
        };
        agregarAlCarrito(producto);
    });
});

// Agrega el event listener al botón de pagar
document.getElementById('pagar').addEventListener('click', pagar);
