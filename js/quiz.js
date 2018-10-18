var contador;

function storeTryInDB(fecha,tabla, resultado, arrayFallos ) {
    console.log("fecha " + fecha);
    console.log("tabla "+ tabla );
    console.log("resultado: "+ resultado);
    arrayFallos.forEach(element => {
        console.log(element);
    });


    todoDB.open(function() {
            todoDB.createTodo(tabla, resultado, arrayFallos, function(todo) {
                console.log(todo);
            });
        }

    );


}

function startTimer(duration, display, callback) {
    var timer = duration, minutes, seconds;
    contador = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }

        if (timer <= 0) {
            display.textContent =  "00:00";
            
            clearInterval(contador);
            callback();
            
        }

    }, 1000);
}

function resolverQuiz() {
    
    let divQuizCuentas = document.querySelectorAll("#quiz .quizcuenta");
    let nodesArray = Array.prototype.slice.call(divQuizCuentas);

    let arrayFallos = new Array();

    nodesArray.forEach(element => {
        let primero = element.querySelector(".q_primero").innerHTML;
        let segundo = element.querySelector(".q_segundo").innerHTML;
        let resultadoIntroducido = element.querySelector("input").value;
        let resultadoReal = primero * segundo;
    
        let carita = element.querySelector(".q_carita");

        let caritaImg = document.createElement("img");

        let resCorrecto = element.querySelector(".q_res_correcto");
        

        if (resultadoIntroducido == resultadoReal) {
            caritaImg.setAttribute("src","img/ok.png");
            caritaImg.setAttribute("data-result", "OK");
        }
        else {
            caritaImg.setAttribute("src","img/ko.png");
            caritaImg.setAttribute("data-result", "KO");
            resCorrecto.innerHTML = resultadoReal;

            arrayFallos.push(primero+"x"+segundo);
        }

        carita.appendChild(caritaImg);
        
        document.querySelector("#time").textContent =  "00:00";

        



    });

    

    let quizresults = document.querySelector("#quizresults");

    let respuestasOK = document.querySelectorAll("img[data-result='OK']");
    let respuestasOKArray = Array.prototype.slice.call(respuestasOK);

    let respuestasError = document.querySelectorAll("img[data-result='KO']");
    let respuestasErrorArray = Array.prototype.slice.call(respuestasError);    

    const totalOK = respuestasOKArray.length;
    const totalError = respuestasErrorArray.length;

    let pCorrectas = document.createElement("p");

    let caritaImgCorrectas = document.createElement("img");
    caritaImgCorrectas.setAttribute("src","img/ok.png");

    pCorrectas.appendChild(caritaImgCorrectas);

    let textoCorrectas = document.createTextNode(" "+totalOK);
    pCorrectas.appendChild(textoCorrectas);

    let caritaImgError = document.createElement("img");
    caritaImgError.setAttribute("src","img/ko.png");   
    
    pCorrectas.appendChild(caritaImgError);

    let textoError = document.createTextNode(" "+totalError);
    pCorrectas.appendChild(textoError);    

    const punt = ((10-totalError)/10)*100;
    let textoPuntuacion = document.createTextNode(" Puntuación: "+punt+"%");
    pCorrectas.appendChild(textoPuntuacion);

    quizresults.appendChild(pCorrectas);

    clearInterval(contador);

    const tablaSeleccionada = localStorage.getItem("tablaSeleccionada");

    
    
    storeTryInDB( Date(), tablaSeleccionada, punt, arrayFallos);


}    

function empezarQuiz() {
    let tablaSeleccionada = localStorage.getItem("tablaSeleccionada");
    if (tablaSeleccionada == null || tablaSeleccionada == undefined) {
        tablaSeleccionada = 9;
    }
    
    let divQuiz = document.querySelector("#quiz");
    divQuiz.innerHTML = "";

    for (let index = 0; index < 10; index++) {
        let primeroRandom = Math.floor(Math.random() * 9) + 1;
        let segundoRandom = Math.floor(Math.random() * tablaSeleccionada) + 1;
        
        const divQuizCuenta = document.createElement("div");
        divQuizCuenta.setAttribute("class", "quizcuenta");
        
        const spanPrimero = document.createElement("span");
        spanPrimero.setAttribute("class", "q_primero t"+primeroRandom);
        spanPrimero.innerHTML=primeroRandom;

        const spanPor = document.createElement("span");
        spanPor.setAttribute("class", "q_por");
        spanPor.innerHTML="x";        

        const spanSegundo = document.createElement("span");
        spanSegundo.setAttribute("class", "q_segundo t"+segundoRandom);
        spanSegundo.innerHTML=segundoRandom;   
        
        const spanIgual = document.createElement("span");
        spanIgual.setAttribute("class", "q_igual");
        spanIgual.innerHTML="=";  

        const inputResultado = document.createElement("input");
        inputResultado.setAttribute("type", "text");
        inputResultado.setAttribute("class", "resultado");
        inputResultado.setAttribute("maxlength", "3");
        inputResultado.setAttribute("size", "3");
        
        const spanCarita = document.createElement("span");
        spanCarita.setAttribute("class", "q_carita");
        spanCarita.innerHTML=""; 
        
        const spanResCorrecto = document.createElement("span");
        spanResCorrecto.setAttribute("class", "q_res_correcto");
        spanResCorrecto.innerHTML="";      
        
        divQuizCuenta.appendChild(spanPrimero);
        divQuizCuenta.appendChild(spanPor);
        divQuizCuenta.appendChild(spanSegundo);
        divQuizCuenta.appendChild(spanIgual);
        divQuizCuenta.appendChild(inputResultado);
        divQuizCuenta.appendChild(spanCarita);
        divQuizCuenta.appendChild(spanResCorrecto);
        divQuiz.appendChild(divQuizCuenta);
    }

    let quizresults = document.querySelector("#quizresults");
    quizresults.innerHTML = "";

    var dosMinutos = 60 * 0.5;
    var display = document.querySelector('#time');
    startTimer(dosMinutos, display, resolverQuiz);

}    

function load() { 

    let botonSelTabla = document.querySelector("#selTable");
    botonSelTabla.addEventListener("click", seleccionarTabla, false); 

    let botonEmpezarQuiz = document.querySelector("#empezarQuiz");
    botonEmpezarQuiz.addEventListener("click", empezarQuiz, false); 

    let botonResolverQuiz = document.querySelector("#resolverQuiz");
    botonResolverQuiz.addEventListener("click", resolverQuiz, false);     

    let tablaSeleccionada = localStorage.getItem("tablaSeleccionada");
    if (tablaSeleccionada == null || tablaSeleccionada == undefined) {
        tablaSeleccionada = 9;
    }

    document.querySelector("#comboTablas").value = tablaSeleccionada;
    document.querySelector("#hastaTabla").innerHTML = tablaSeleccionada;



  } 
  
  window.onload = load;
  //document.addEventListener("DOMContentLoaded", load, false);