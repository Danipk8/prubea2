document.addEventListener("DOMContentLoaded", function () {
    // Cargar Header dinámicamente
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
            initHeaderScripts(); // Ejecutar funciones del header después de cargarlo
        });

    // Cargar Footer dinámicamente
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });







    // Función para inicializar las funcionalidades del header
    function initHeaderScripts() {
        console.log("Header cargado. Ejecutando scripts...");

        



      // Mostrar y ocultar el menú de categorías
      const menuBoton = document.querySelector(".menu-boton");
      const categorias = document.querySelector(".Categorias");
      
      if (menuBoton && categorias) {
          menuBoton.addEventListener("click", function (event) {
              event.stopPropagation(); // Evita que el clic se propague al documento
              categorias.style.display = categorias.style.display === "block" ? "none" : "block";
          });
      
          // Cerrar al hacer clic fuera
          document.addEventListener("click", function (event) {
              if (!categorias.contains(event.target) && !menuBoton.contains(event.target)) {
                  categorias.style.display = "none";
              }
          });
      }



      
      
      // Mostrar y ocultar el menú de navegación
      const menuhamburguesa = document.querySelector(".menu-hamburguesa");
      const menu = document.querySelector(".menu");
      
      if (menuhamburguesa && menu) {
          menuhamburguesa.addEventListener("click", function (event) {
              event.stopPropagation(); // Evita que el clic se propague al documento
              menu.style.display = menu.style.display === "block" ? "none" : "block";
          });
      
          // Cerrar al hacer clic fuera
          document.addEventListener("click", function (event) {
              if (!menu.contains(event.target) && !menuhamburguesa.contains(event.target)) {
                  menu.style.display = "none";
              }
          });
      }






        
        





        // Funcionalidad del carrito
        const carritoBoton = document.getElementById("carrito-boton");
        const carritoPanel = document.getElementById("carrito-panel");
        const closeCarrito = document.getElementById("close-carrito");






        if (carritoBoton && carritoPanel && closeCarrito) {
            carritoBoton.addEventListener("click", () => {carritoPanel.classList.add("active"); });

            closeCarrito.addEventListener("click", () => {carritoPanel.classList.remove("active");});



            
            // Cerrar el carrito al hacer clic fuera de él


            document.addEventListener("click", (event) => {
                if (!carritoPanel.contains(event.target) && 
                    !carritoBoton.contains(event.target) &&
                    !event.target.classList.contains("eliminar")) {  // Evita cerrar si es un botón de eliminar
                    carritoPanel.classList.remove("active");
                }
            });
            




            
        }
    }




// Esto se copia de la prueba en la que servia una:

    // ✅ HACER `actualizarCarrito()` GLOBAL
    window.actualizarCarrito = function () {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const carritoItems = document.getElementById("carrito-items");
        const totalCarrito = document.getElementById("total-carrito");

        if (!carritoItems || !totalCarrito) {
            console.error("❌ No se encontró el carrito en el DOM.");
            return;
        }

        carritoItems.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            total += producto.precio * producto.cantidad;
            const li = document.createElement("li");
            li.classList.add("carrito-item");

            li.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
                <span>${producto.nombre} - ${producto.peso} - Cantidad: ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}</span>
                <button class="eliminar" data-index="${index}">✖</button>
            `;

            carritoItems.appendChild(li);
        });

        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

        document.querySelectorAll(".eliminar").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                carrito.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
            });
        });
    };

    // ✅ HACER `mostrarMensaje()` GLOBAL
    window.mostrarMensaje = function (texto) {
        const mensaje = document.createElement("div");
        mensaje.textContent = texto;
        mensaje.classList.add("mensaje-carrito");
        document.body.appendChild(mensaje);

        setTimeout(() => {
            mensaje.remove();
        }, 2000);
    };



// Esto se copia de la prueba en la que servia una:






























    // Función para manejar el carrito de compras
    function manejarCarrito() {

        document.getElementById("vaciar-carrito").addEventListener("click", function () {
            carrito = []; // Vaciar el array de productos
            localStorage.removeItem("carrito"); // Eliminar del almacenamiento local
            actualizarCarrito(); // Refrescar el carrito en pantalla
            mostrarMensaje("Carrito vaciado correctamente 🛒");
        });
        
        console.log("Carrito cargado. Ejecutando scripts...");
        
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const carritoItems = document.getElementById("carrito-items");
        const totalCarrito = document.getElementById("total-carrito");

        function actualizarCarrito() {
            carritoItems.innerHTML = "";
            let total = 0;
        
            carrito.forEach((producto, index) => {
                total += producto.precio * producto.cantidad;
                const li = document.createElement("li");
                li.classList.add("carrito-item");
        
                li.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
                    <span>${producto.nombre} - ${producto.peso} - Cantidad: ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}</span>
                    <button class="eliminar" data-index="${index}">✖</button>
                `;
        
                carritoItems.appendChild(li);
            });
        
            totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
        
            document.querySelectorAll(".eliminar").forEach(btn => {
                btn.addEventListener("click", function () {
                    const index = this.getAttribute("data-index");
                    carrito.splice(index, 1);
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    actualizarCarrito();
                });
            });
        }
        

       



















        actualizarCarrito();

        // ✅ Asignar eventos a los botones "Agregar al carrito" en todas las páginas, incluyendo `producto.html`
        document.body.addEventListener("click", function (event) {
            if (event.target.classList.contains("agregar-carrito")) {
                event.preventDefault();
        
                const productoElemento = event.target.closest(".producto") || event.target.closest(".producto-info");
                if (!productoElemento) {
                    console.error("❌ No se encontró el contenedor del producto.");
                    return;
                }
        
                // ✅ Obtener valores del producto
                const nombre = productoElemento.querySelector("h1").textContent;
                const imagen = productoElemento.querySelector("img").src;
                const id = event.target.getAttribute("data-id");
        
                // ✅ Obtener el peso seleccionado y su precio
                const pesoSeleccionado = productoElemento.querySelector("select.peso-seleccion");
                if (!pesoSeleccionado) {
                    console.error("❌ No se encontró el selector de peso.");
                    return;
                }
                const precio = parseFloat(pesoSeleccionado.selectedOptions[0].getAttribute("data-precio"));
                const peso = pesoSeleccionado.value; // "unidad", "libra" o "kilo"
        
                // ✅ Obtener la cantidad seleccionada
                const cantidadInput = productoElemento.querySelector("input[type='number']");
                const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;







document.addEventListener("DOMContentLoaded", function () {
    const menuHamburguesa = document.getElementById("menu-hamburguesa");
    const menu = document.querySelector("nav ul");

    if (menuHamburguesa && menu) {
        menuHamburguesa.addEventListener("click", function () {
            menu.classList.toggle("active"); // ✅ Alterna el menú
        });
    } else {
        console.error("❌ No se encontró el menú o el botón de hamburguesa.");
    }
});











        
                const producto = { id, nombre, imagen, precio, peso, cantidad };
                carrito.push(producto);
                localStorage.setItem("carrito", JSON.stringify(carrito));
        
                actualizarCarrito();
        
                // ✅ Mostrar mensaje de agregado al carrito
                mostrarMensaje(`"${nombre}" (${peso}) agregado al carrito ✅`);
            }
        });
    }

    // Esperar a que todo el HTML cargue antes de inicializar el carrito
    setTimeout(manejarCarrito, 500);
});





