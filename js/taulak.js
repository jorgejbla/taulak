function load() { 

    let botonSelTabla = document.querySelector("#selTable");
    botonSelTabla.addEventListener("click", seleccionarTabla, false); 

    let tablaSeleccionada = localStorage.getItem("tablaSeleccionada");
    if (tablaSeleccionada == null || tablaSeleccionada == undefined) {
        tablaSeleccionada = 9;
        localStorage.setItem("tablaSeleccionada", tablaSeleccionada);
    }

console.log(tablaSeleccionada);

    document.querySelector("#comboTablas").value = tablaSeleccionada;
    document.querySelector("#hastaTabla").innerHTML = tablaSeleccionada;


    let taulakSelected = document.querySelector("#taulak"+tablaSeleccionada);
    taulakSelected.setAttribute("style", "border:10px solid #000;");

  } 
  
  window.onload = load;