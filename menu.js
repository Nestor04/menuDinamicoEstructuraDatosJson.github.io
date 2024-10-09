let menuData = [];

// Cargar el archivo JSON y generar el menú
document.addEventListener("DOMContentLoaded", function() {
  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      menuData = data.menu; // Guardar los datos del menu en una variable global
      generarMenu(menuData); // Generar el menú dinamicamente
    })
    .catch(error => console.error('Error al cargar el menú:', error));
});

// Función para generar el menú
function generarMenu(menuData) {
  const menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = ''; // Limpiar el menú antes de regenerarlo

  menuData.forEach(opcion => {
    const menuItem = document.createElement("li");
    
    const enlace = document.createElement("a");
    enlace.textContent = opcion.nombre;
    enlace.href = opcion.enlace;
    
    // Botón para eliminar la opción
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.onclick = () => eliminarOpcion(opcion.id);
    
    // Botón para editar la opción
    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.onclick = () => mostrarFormularioEdicion(opcion.id);

    menuItem.appendChild(enlace);
    menuItem.appendChild(editarBtn);
    menuItem.appendChild(eliminarBtn);

    // Submenus
    if (opcion.subMenu) {
      const subMenuList = document.createElement("ul");
      subMenuList.classList.add("submenu");
      opcion.subMenu.forEach(subOpcion => {
        const subMenuItem = document.createElement("li");
        const subMenuEnlace = document.createElement("a");
        subMenuEnlace.textContent = subOpcion.nombre;
        subMenuEnlace.href = subOpcion.enlace;
        subMenuItem.appendChild(subMenuEnlace);
        subMenuList.appendChild(subMenuItem);
      });
      menuItem.appendChild(subMenuList);
    }

    menuContainer.appendChild(menuItem);
  });
}

// Esta funcion es para agregar una nueva opción al menu
function agregarOpcion() {
  const nombre = document.getElementById("nombre").value;
  const enlace = document.getElementById("enlace").value;

  if (!nombre || !enlace) {
    alert("Por favor, complete todos los campos");
    return;
  }

  // Crear nueva opcion
  const nuevaOpcion = {
    id: Date.now(), // Generar un id unico
    nombre: nombre,
    enlace: enlace
  };

  menuData.push(nuevaOpcion); // Agregar la nueva opcion al menu

  // Regenerar el menú
  generarMenu(menuData);
  
  // Limpiar los campos del formulario
  document.getElementById("nombre").value = '';
  document.getElementById("enlace").value = '';
}

// Eliminar una opcion del menu
function eliminarOpcion(id) {
  menuData = menuData.filter(opcion => opcion.id !== id); // Filtrar el menú para eliminar la opción
  generarMenu(menuData); // Regenerar el menu
}

// Mostrar el formulario de edición
function mostrarFormularioEdicion(id) {
  const opcion = menuData.find(opcion => opcion.id === id);
  if (opcion) {
    document.getElementById("editId").value = opcion.id;
    document.getElementById("editNombre").value = opcion.nombre;
    document.getElementById("editEnlace").value = opcion.enlace;
    document.getElementById("editMenuForm").style.display = 'block'; // Mostrar el formulario de edición
  }
}

// Esta funcion sirve para guardar los cambios de la edicion
function guardarEdicion() {
  const id = parseInt(document.getElementById("editId").value);
  const nombre = document.getElementById("editNombre").value;
  const enlace = document.getElementById("editEnlace").value;

  if (!nombre || !enlace) {
    alert("Por favor, complete todos los campos");
    return;
  }

  const opcion = menuData.find(opcion => opcion.id === id);
  if (opcion) {
    opcion.nombre = nombre;
    opcion.enlace = enlace;
    generarMenu(menuData); // Regenerar el menú con los cambios
    cancelarEdicion(); // Ocultar el formulario de edición
  }
}

// Esta funcion es para cancelar la edición
function cancelarEdicion() {
  document.getElementById("editMenuForm").style.display = 'none'; // Ocultar el formulario de edición
  document.getElementById("editId").value = '';
  document.getElementById("editNombre").value = '';
  document.getElementById("editEnlace").value = '';
}

  

