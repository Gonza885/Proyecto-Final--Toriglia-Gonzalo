/** CRAZY 4 MUSCLE: "Productos de gym" */

let productos = [];
let carrito = [];
carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const urlLocal = "productos.json";

fetch(urlLocal)
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(data);
    })
    .catch(error => console.log(error));


//Modificamos el DOM mostrando los productos */

const contenedorProductos = document.getElementById("contenedorProductos");


//Creamos una función para mostrar los productos. 

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                                <h5> ${producto.nombre} </h5>
                                <p> ${producto.precio} </p>
                                <button class = "btn colorBoton" id="boton${producto.id}" > Agregar al Carrito </button>
                            </div>
                        </div>
                        `
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

//Creamos la función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    calcularTotal();
    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Mostrar el carrito de compras:

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                                <h5> ${producto.nombre} </h5>
                                <p> ${producto.precio} </p>
                                
                                <button class = "btn colorBoton" id="restar${producto.id}" > - </button>
                                <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar </button>
                                <button class = "btn colorBoton" id="sumar${producto.id}" > + </button>

                                <p> ${producto.cantidad} </p>
                                                                                                                                                               
                            </div>
                        </div>
                        `
        contenedorCarrito.appendChild(card);

        const eliminar = document.getElementById(`restar${producto.id}`);
        eliminar.addEventListener("click", () => {
            restarCantidad(producto.id);
        })

        const sumar = document.getElementById(`sumar${producto.id}`);
        sumar.addEventListener("click", () => {
            sumarCantidad(producto.id);
        })

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })


    })

    calcularTotal();
}

const sumarCantidad = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    producto.cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

const restarCantidad = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    producto.cantidad--;
    if (producto.cantidad === 0) {
        eliminarDelCarrito(id);
    } else {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    mostrarCarrito();
}

//Funcion que elimina el producto del carrito:

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //Trabajamos con el localStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


//Mostramos el total de la compra: 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;

    })
    total.innerHTML = `Total: $${totalCompra}`;
}

//Vaciar todo el carrito: 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage:
    localStorage.clear();
}

const boton = document.getElementById("contenedorProductos");

boton.addEventListener("click", () => {
    Toastify({
        text: "Producto agregado al carrito",
        duration: 1000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #000000, #9E9E9E, #4A4848)"
        }
    }).showToast();
})

vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: "¿Seguro que quieres vaciar el carrito?",
        icon: "warning",
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        background: "red",
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = carrito.filter(producto => producto !== "mancuerna");
            console.log(carrito);
            Swal.fire({
                title: "Carrito Vacio",
                icon: "success",
                confirmButtonText: "Aceptar",

                background: "green",
            })
        }
    })
})
//Boton de finalizar Compra

const finalizarCompra = document.getElementById("finalizarCompra");
finalizarCompra.addEventListener("click", () => {
    Swal.fire({
        title: "CRAZY4MUSCLE",
        text: "¿Desea finalizar su compra?",
        icon: "question",
        imageUrl: "https://i.pinimg.com/originals/a2/c2/1c/a2c21cddcdffd7eb6c8259c06636299e.gif",
        confirmButtonText: "Finalizar Compra",
        background: "tomato",

    });
})







