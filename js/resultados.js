function load() { 


    let tablaResult = document.querySelector("#result");

    todoDB.open(() => {
        todoDB.fetchTodos(function(todos) {
            todos.forEach(element => {
                console.log(element);

                /*
                                <tr>
                        <td>18/10/2018 13:20</td>
                        <td>&lt;= 4</td>
                        <td>70%</td>
                        <td>8x2|4x4|3x1</td>
                </tr>
                */

                let trElem = document.createElement("tr");
                let tdElemFecha = document.createElement("td");

                const d = new Date(element.fecha);
                const fec = 

                    ("00" + (d.getMonth() + 1)).slice(-2) + "/" + 
                    ("00" + d.getDate()).slice(-2) + "/" + 
                    d.getFullYear() + " " + 
                    ("00" + d.getHours()).slice(-2) + ":" + 
                    ("00" + d.getMinutes()).slice(-2) + ":" + 
                    ("00" + d.getSeconds()).slice(-2)
                ;

                tdElemFecha.innerHTML=fec;
                let tdElemTabla = document.createElement("td");
                tdElemTabla.innerHTML="&lt;= "+element.tabla;   
                let tdElemResultado = document.createElement("td");
                tdElemResultado.innerHTML=element.resultado+"%";        
                let tdElemFallos = document.createElement("td");
                tdElemFallos.setAttribute("class","tdFallos");

                element.arrayFallos.forEach(elemento => {
                    let spanFallo = document.createElement("span");
                    spanFallo.innerHTML = elemento;
                    tdElemFallos.appendChild(spanFallo);
                });
                
                trElem.appendChild(tdElemFecha);
                trElem.appendChild(tdElemTabla);
                trElem.appendChild(tdElemResultado);
                trElem.appendChild(tdElemFallos);

                tablaResult.appendChild(trElem);

            });
        
        })
    }

);


  } 
  
  window.onload = load;