document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get("id");

    if (!productoId) {
        document.getElementById("producto-detalle").innerHTML = "<p>Producto no encontrado</p>";
        return;
    }

    fetch("data/productos.json")
        .then(response => response.json())
        .then(data => {
            const producto = data.find(p => p.id == productoId);
            if (!producto) {
                document.getElementById("producto-detalle").innerHTML = "<p>Producto no encontrado</p>";
                return;
            }

            document.title = `${producto.nombre} - Tienda Virtual`;

            // ✅ Insertar dinámicamente el producto en el HTML
            document.getElementById("producto-detalle").innerHTML = `
                <div class="producto-detalle-contenedor">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                    <div class="producto-info">
                        <h1>${producto.nombre}</h1>
                        <p>${producto.descripcion}</p>

                        <label for="peso-${producto.id}">Seleccione un peso:</label>
                        <select id="peso-${producto.id}" class="peso-seleccion">
                            <option value="unidad" data-precio="${producto.precioUnidad}">Unidad - $${producto.precioUnidad}</option>
                            <option value="libra" data-precio="${producto.precioLibra}">Libra - $${producto.precioLibra}</option>
                            <option value="kilo" data-precio="${producto.precioKilo}">Kilo - $${producto.precioKilo}</option>
                        </select>

                        <div class="Texto-Sel">
                            <p>Ingrese una cantidad:</p> 
                        </div>

                        <div class="cantidad-seleccion-producto">
                            <button class="btn-cantidad disminuir" data-id="${producto.id}">-</button>
                            <input type="number" id="cantidad-${producto.id}" value="1" min="1">
                            <button class="btn-cantidad aumentar" data-id="${producto.id}">+</button>
                        </div>

                        <a href="#" class="agregar-carrito btn-2" id="boton-agregar-carrito-${producto.id}" data-id="${producto.id}">Agregar al carrito</a>
                    </div>
                </div>
            `;

            // ✅ Funcionalidad de cantidad
            document.querySelector(`.aumentar[data-id="${producto.id}"]`).addEventListener("click", function () {
                let cantidad = parseInt(document.getElementById(`cantidad-${producto.id}`).value);
                document.getElementById(`cantidad-${producto.id}`).value = cantidad + 1;
            });

            document.querySelector(`.disminuir[data-id="${producto.id}"]`).addEventListener("click", function () {
                let cantidad = parseInt(document.getElementById(`cantidad-${producto.id}`).value);
                if (cantidad > 1) document.getElementById(`cantidad-${producto.id}`).value = cantidad - 1;
            });

            // ✅ Esperar a que el botón de "Agregar al carrito" exista antes de asignarle el evento
            setTimeout(() => {
                const boton = document.getElementById(`boton-agregar-carrito-${producto.id}`);
                if (boton) {
                    boton.addEventListener("click", function (event) {
                        event.preventDefault();
                        agregarProductoAlCarrito(producto);
                    });
                } else {
                    console.error("❌ No se encontró el botón en producto.html");
                }
            }, 300);
        })
        .catch(error => console.error("Error al cargar el producto:", error));
});

function agregarProductoAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const pesoSeleccionado = document.getElementById(`peso-${producto.id}`);
    const precio = parseFloat(pesoSeleccionado.selectedOptions[0].getAttribute("data-precio"));
    const peso = pesoSeleccionado.value;

    const cantidadInput = document.getElementById(`cantidad-${producto.id}`);
    const cantidad = parseInt(cantidadInput.value) || 1;

    const productoAgregado = {
        id: producto.id,
        nombre: producto.nombre,
        imagen: producto.imagen,
        precio: precio,
        peso: peso,
        cantidad: cantidad
    };

    carrito.push(productoAgregado);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarMensaje(`"${producto.nombre}" agregado al carrito ✅`);

    // ✅ Esperar a que `actualizarCarrito()` esté disponible antes de llamarlo
    const waitForActualizarCarrito = setInterval(() => {
        if (typeof actualizarCarrito === "function") {
            actualizarCarrito();
            clearInterval(waitForActualizarCarrito);
        } else {
            console.warn("⌛ Esperando que actualizarCarrito() esté disponible...");
        }
    }, 50);
}
