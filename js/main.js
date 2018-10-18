function seleccionarTabla() {
    let combo = document.querySelector("#comboTablas");
    const tablaSeleccionada = combo.options[combo.selectedIndex].value;
    localStorage.setItem("tablaSeleccionada", tablaSeleccionada);


    let segundoRandom = Math.floor(Math.random() * tablaSeleccionada) + 1;

    
    document.querySelector("#hastaTabla").innerHTML = tablaSeleccionada;

    let segundoElement = document.querySelector("#segundo");
    if (segundoElement != null && segundoElement != undefined) {
        document.querySelector("#segundo").innerHTML= segundoRandom;    
    }

    
}    




