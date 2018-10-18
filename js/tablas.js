
function refrescar() {
    window.location.reload();
}    

function calcular() {
    let primero = document.querySelector("#primero").innerHTML;
    let segundo = document.querySelector("#segundo").innerHTML;

    

    let result = document.querySelector("#resultado");
    console.log("RES" + result);
    let resultadoIntroducido = result.value;
    console.log("RI "+resultadoIntroducido);
    

    let resultadoReal = primero * segundo;

    console.log("RR "+resultadoReal);
    
    if (resultadoIntroducido == resultadoReal) {
        document.querySelector(".smileyface").setAttribute("style", "display:block;");
        document.querySelector(".angryface").setAttribute("style", "display:none;");        
    }
    else {
        document.querySelector(".smileyface").setAttribute("style", "display:none;");
        document.querySelector(".angryface").setAttribute("style", "display:block;"); 
        document.querySelector("#result").innerHTML=resultadoReal;      
        document.querySelector("#result").setAttribute("style", "display:block;"); 
    }
}

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
    

    let primeroRandom = Math.floor(Math.random() * 9) + 1;
    let segundoRandom = Math.floor(Math.random() * tablaSeleccionada) + 1;
    
    const primeroElem = document.querySelector("#primero");
    const segundoElem = document.querySelector("#segundo")

    primeroElem.innerHTML= primeroRandom;
    segundoElem.innerHTML= segundoRandom;

    primeroElem.setAttribute("class", "taulak"+primeroRandom);
    segundoElem.setAttribute("class", "taulak"+segundoRandom);

    document.querySelector("#resultado").value="";
    document.querySelector("#resultado").focus();

    document.querySelector("#result").value="";


    document.querySelector(".smileyface").setAttribute("style", "display:none;");
    document.querySelector(".angryface").setAttribute("style", "display:none;");
    document.querySelector("#result").setAttribute("style", "display:none;");

    let botonCalcular = document.querySelector("#calculate");

    botonCalcular.addEventListener("click", calcular, false); 

    let botonRefresh = document.querySelector("#more");

    botonRefresh.addEventListener("click", refrescar, false);     




      

  } 
  
  window.onload = load;
  //document.addEventListener("DOMContentLoaded", load, false);