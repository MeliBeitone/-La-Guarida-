
const productos = [
    { id: 1, nombre: "Comunicación y Lenguaje en la infancia", precio: 27000, imagen: "Imagenes/libro1.jpg" },
    { id: 2, nombre: "Harry Potter y la piedra filosofal", precio: 30000, imagen: "Imagenes/libro2.jpg" },
    { id: 3, nombre: "Alicia en el país de las maravillas", precio: 25000, imagen: "Imagenes/libro3.jpg" }
];


function mostrarProductos() {
    const contenedor = document.getElementById('libros').querySelector('.libros-a');
    contenedor.innerHTML = ""; 

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('libros-b');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="300" height="370">
            <h3>"${producto.nombre}"</h3>
            <p>$${producto.precio}</p>
            <button class="agregar-carrito" data-id="${producto.id}">Lo quiero!</button>
        `;
        contenedor.appendChild(div);
    });
}


function agregarAlCarrito(id) {
    const producto = productos.find(product => product.id === parseInt(id));
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let productoEnCarrito = carrito.find(p => p.id === producto.id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}


function incrementarCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let producto = carrito.find(p => p.id === parseInt(id));
    
    if (producto) {
        producto.cantidad++;
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}


function disminuirCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let producto = carrito.find(p => p.id === parseInt(id));
    
    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}


function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(producto => producto.id !== parseInt(id));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}


function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorCarrito = document.getElementById('productos-carrito');
    contenedorCarrito.innerHTML = "";  

    let total = 0;

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100" height="130">
            <span>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</span>
            <button class="incrementar-cantidad" data-id="${producto.id}">+</button>
            <button class="disminuir-cantidad" data-id="${producto.id}">-</button>
            <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
        `;
        contenedorCarrito.appendChild(div);

        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total').textContent = `Total: $${total}`;
}


function actualizarCarrito() {
    mostrarCarrito();
}


document.body.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('agregar-carrito')) {
        const idProducto = e.target.getAttribute('data-id');
        agregarAlCarrito(idProducto);
    }

  
    if (e.target && e.target.classList.contains('incrementar-cantidad')) {
        const idProducto = e.target.getAttribute('data-id');
        incrementarCantidad(idProducto);
    }

    
    if (e.target && e.target.classList.contains('disminuir-cantidad')) {
        const idProducto = e.target.getAttribute('data-id');
        disminuirCantidad(idProducto);
    }

 
    if (e.target && e.target.classList.contains('eliminar-producto')) {
        const idProducto = e.target.getAttribute('data-id');
        eliminarDelCarrito(idProducto);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    mostrarProductos();
    mostrarCarrito();
});


function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre && email && mensaje) {
        console.log("Formulario enviado correctamente");
    } else {
        console.log("Por favor complete todos los campos");
    }
}


document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); 
    validarFormulario();
});