// Inicializamos el carrito como un array vacío
let carrito = [];

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    const contenedorItemsCarrito = document.getElementById('items-carrito');
    const elementoPrecioTotal = document.getElementById('precio-total');
    
    // Limpiamos el contenedor del carrito
    contenedorItemsCarrito.innerHTML = '';
    
    // Calculamos el total
    let total = 0;

    // Iteramos sobre los artículos en el carrito
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
        total += item.precio * item.cantidad; // Calculamos el total
    });
    
    // Actualizamos el total en la interfaz
    elementoPrecioTotal.innerText = `Total: $${total}`;
}

// Función para agregar un artículo al carrito
function agregarAlCarrito(producto) {
    const itemExistente = carrito.find(item => item.nombre === producto.nombre);
    
    if (itemExistente) {
        itemExistente.cantidad += 1; // Aumentamos la cantidad si ya existe
    } else {
        carrito.push({ ...producto, cantidad: 1, imagen: producto.imagen }); // Agregamos el nuevo artículo
    }
    
    actualizarCarrito(); // Actualizamos el carrito en la interfaz
}

// Función para eliminar un artículo del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminamos el artículo del carrito
    actualizarCarrito(); // Actualizamos el carrito en la interfaz
}

// Función para aumentar la cantidad de un artículo
function aumentarCantidad(index) {
    carrito[index].cantidad += 1; // Aumentamos la cantidad
    actualizarCarrito(); // Actualizamos el carrito en la interfaz
}

// Función para disminuir la cantidad de un artículo
function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1; // Disminuimos la cantidad
    } else {
        eliminarDelCarrito(index); // Si la cantidad es 1, eliminamos el artículo
    }
    actualizarCarrito(); // Actualizamos el carrito en la interfaz
}

// Función para vaciar el carrito al pagar
function pagar() {
    carrito = []; // Vaciamos el carrito
    actualizarCarrito(); // Actualizamos el carrito en la interfaz
}

// Agregamos los event listeners a los botones de agregar al carrito
document.querySelectorAll('.agregar-al-carrito').forEach(boton => {
    boton.addEventListener('click', (event) => {
        const elementoProducto = event.target.parentElement; // Obtenemos el elemento del producto
        const producto = {
            nombre: elementoProducto.getAttribute('data-nombre'),
            precio: parseFloat(elementoProducto.getAttribute('data-precio')),
            imagen: elementoProducto.querySelector('img').src // Obtenemos la imagen del producto
        };
        agregarAlCarrito(producto); // Llamamos a la función para agregar al carrito
    });
});

// Agregamos el event listener al botón de pagar
document.getElementById('pagar').addEventListener('click', pagar);