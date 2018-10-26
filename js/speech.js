var h = new SpeechSynthesisUtterance();
h.lang = "es-ES";

// Cargamos la voz de 'en-US'
window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
    
    for ( var i=0; i<voices.length; i++ ){
        console.log(voices[i]['lang']);
        if ( voices[i]['lang'] == 'es-ES'  ){
            h.voice = voices[i];
        }
    }
};

function leerTexto(texto) {
    h.text = texto;
    speechSynthesis.speak(h);
}

function mostrarCorrecto(texto) {
    h.text = texto;
    speechSynthesis.speak(h);
}