/* Mariano Perez Nº307265 */

window.addEventListener("load", inicio);

let sistema = new Sistema();
var letrasSeleccionada = "*";


function inicio(){
	document.getElementById("pri").addEventListener("click", mostrarPrincipal);
	document.getElementById("rec").addEventListener("click", mostrarVerReclamos);
	document.getElementById("est").addEventListener("click", mostrarEstadisticas);
	document.getElementById("agr").addEventListener("click", mostrarAgregarEmpresa);
	document.getElementById("botonAgregarReclamo").addEventListener("click", mostrarAgregarReclamo);
	mostrarPrincipal();
	document.getElementById("idVolver").addEventListener("click", mostrarPrincipal);
    document.getElementById("botonAgregarEmpresa").addEventListener("click", TomarDatosDeAgregarEmpresa);
    document.getElementById("idAgregar").addEventListener("click", TomarDatosDelReclamo);
	document.getElementById("creciente").addEventListener("change", function(){generarTabla(true);});
	document.getElementById("decreciente").addEventListener("change", function(){generarTabla(false);});
	document.getElementById("botonBusqueda").addEventListener("click", buscadorNombreEmpresaComentario);
}

function mostrar(id){
	document.getElementById(id).style.display = "block";
}
function ocultar(id){
	document.getElementById(id).style.display = "none";
}

/*funciones para mostrar las secciones*/
function mostrarPrincipal(){
	mostrar("Principal");
	ocultar("Reclamos");
	ocultar("Estadisticas");
	ocultar("AgregarEmpresa");
	ocultar("AgregarReclamo");
	ocultar("idTitutloseccion2");
	mostrar("TituloPrincipal");
}
function mostrarVerReclamos(){
	actualizador();
	mostrar("Reclamos");
	mostrar("idTitutloseccion2");
	ocultar("Estadisticas");
	ocultar("AgregarEmpresa");
	ocultar("Principal");
	ocultar("AgregarReclamo");
	ocultar("TituloPrincipal");
}
function mostrarEstadisticas(){
	actualizador();
	mostrar("Estadisticas");
	ocultar("AgregarEmpresa");
	ocultar("Principal");
	ocultar("Reclamos");
	ocultar("AgregarReclamo");
	ocultar("idTitutloseccion2");
	ocultar("TituloPrincipal");
}
function mostrarAgregarEmpresa(){
	mostrar("AgregarEmpresa");
	ocultar("Principal");
	ocultar("Reclamos");
	ocultar("Estadisticas");
	ocultar("AgregarReclamo");
	ocultar("TituloPrincipal");
	ocultar("idTitutloseccion2");
}
function mostrarAgregarReclamo(){
	if(sistema.darTodasE().length > 0){
		ocultar("Reclamos");
		ocultar("Estadisticas");
		ocultar("AgregarEmpresa");
		mostrar("AgregarReclamo");
		mostrar("TituloPrincipal");
		ocultar("Principal")
	}else{
		alert("Debe ingresar empresas primero");
	}
}

//toma los datos de agregar empresa y los agrega a los diferentes lugares 
function TomarDatosDeAgregarEmpresa(){
	if(document.getElementById("AgregarEmpresa").reportValidity()){
		let nombre = document.getElementById("nombre2").value;
		let direccion = document.getElementById("Direccion").value;
		let rubro = document.getElementById("empresa2").value;
		if (!sistema.empresaRepetida(nombre)){
			let empresa = new Empresa(nombre, direccion, rubro);
			sistema.agregarE(empresa);
			document.getElementById("AgregarEmpresa").reset();
			actualizador();
		}else{
			alert("La empresa ya esta registrada");
		}
	}
}

//mantiene la pagina actualizada llamando las funciones 
function actualizador(){
	crearTabla(filtrarEmpresas(letrasSeleccionada));
	agregarACombo();
	agregarVerReclamos(sistema.darTodosR());
	crearBotonesEstadisticas();
	sistema.contadorEmpresaReclamo();
	crearListaEmpresaSinReclamo();
	crearListaRubroConMasReclamos();
}

// toma los datos ingresados en agregar reclamo 
function TomarDatosDelReclamo(){
	if(document.getElementById("AgregarReclamo").reportValidity()){
		let nombre = document.getElementById("idNombre").value;
		let empresa = document.getElementById("idEmpresa").value;
		for(let e of sistema.darTodasE()){
			if(empresa == e.nombre){
				empresa = e;
			}
		}
		let tituloReclamo = document.getElementById("reclamo").value;
		let textoReclamo = document.getElementById("idComentarios").value;
		let contador = 1;
		let reclamo = new Reclamo(nombre, empresa, tituloReclamo, textoReclamo , contador);
		sistema.agregarR(reclamo);
		let formul = document.getElementById("AgregarReclamo");
		formul.reset();
		sistema.creadorIdReclamo();
		actualizador();
		alert("Reclamo ingresado correctamente");
	}
}

//agrega al combo de la parte de agregar reclamos
function agregarACombo(){
		let combo = document.getElementById("idEmpresa");
		combo.innerHTML = "";
		let datos = sistema.darTodasE();
		for (let elem of datos) {
			let nodo = document.createElement("option");
			let nodoT = document.createTextNode(elem.nombre);
			nodo.appendChild(nodoT);
			combo.appendChild(nodo);
		}
}

//agrega el reclamo a ver reclamos y genera el boton y su funcionalidad para sumar el contador de reclamos
function agregarVerReclamos(rec){
	
	let verReclamos = document.getElementById("Reclamos");
	verReclamos.innerHTML = "";
	if(sistema.darTodosR().length > 0){
	let reclamosDelsistema = rec;
	for(let r of reclamosDelsistema){
		numReclamo=r.identificador;
		let nombre = r.nombre;
		let nombreTex = document.createTextNode(nombre + ":");
		let tituloReclamo = r.reclamo;
		let tituloReclamoText = document.createTextNode(tituloReclamo);
		let nombreEmpresaText = document.createTextNode("Empresa: ");
		let empresa = r.empresa.nombre;
		let empresaText = document.createTextNode(empresa);
		let textoReclamo = r.comentario;
		let textoReclamoTexto = document.createTextNode(textoReclamo);
		let contadorTbm = r.contador;
		let contadorTbmTex = document.createTextNode(contadorTbm);
		let textoNumeroReclamo = document.createTextNode("Reclamo N°" + r.identificador);
		let numeroReclamo = document.createElement("h3");
		numeroReclamo.appendChild(textoNumeroReclamo);
		verReclamos.appendChild(numeroReclamo);

		let divR= document.createElement("div");
		divR.classList.add("claseReclamo");
		let div1 = document.createElement("div");
		
		let spanTituloReclamo = document.createElement("span");
		spanTituloReclamo.classList.add("textoReclamo");
		spanTituloReclamo.appendChild(tituloReclamoText);
		let spanNombreEmpresa = document.createElement("span");
		spanNombreEmpresa.classList.add("NombreEmpresa");
		spanNombreEmpresa.appendChild(empresaText);
		
		let pNombre = document.createElement("p");
		pNombre.appendChild(nombreTex);
		pNombre.appendChild(spanTituloReclamo);
		pNombre.classList.add("reclamoCompleto");
		
		let pEmpresa = document.createElement("p");
		pEmpresa.appendChild(nombreEmpresaText);
		pEmpresa.appendChild(spanNombreEmpresa);
		pEmpresa.classList.add("reclamoCompleto");
		
		let pComentario = document.createElement("p");
		pComentario.appendChild(textoReclamoTexto);
		pComentario.classList.add("reclamoCompleto");
		
		let botonTambien = document.createElement("button");
		let textoCont = document.createTextNode(" Contador: ");
		let pCont = document.createElement("p");
		let spanContFuncional = document.createElement("span");
		botonTambien.setAttribute("id", "BotonDeReclamo" + numReclamo);
		botonTambien.innerHTML = "¡A m&iacute; tambi&eacute;n me pas&oacute;!";
		pCont.appendChild(botonTambien);
		pCont.appendChild(textoCont);
		spanContFuncional.appendChild(contadorTbmTex);
		pCont.appendChild(spanContFuncional);
		pCont.classList.add("reclamoCompleto");
		
		botonTambien.addEventListener("click", function () {
		  contadorTbm++; 
		  spanContFuncional.innerHTML = contadorTbm;
		  r.contador = contadorTbm;	
		});
		
		verReclamos.prepend(divR);
		verReclamos.prepend(numeroReclamo);
		divR.appendChild(div1);
		divR.appendChild(pNombre);
		divR.appendChild(pEmpresa);
		divR.appendChild(pComentario);
		divR.appendChild(pCont);
	}
	}else{
		verReclamos.innerHTML = "Sin Datos";
	}
	
}

//crea la estrucutura de la tabla, muestra el promedio y la cantidad de empresas
function crearTabla(datos){
	
		let tabla = document.getElementById("idTablaEmpresaCrear");
		tabla.innerHTML = "";
		let caption = document.createElement("caption");
		if(letrasSeleccionada == "*"){
			caption.innerHTML = "Empresas: todas";
		}else{
			caption.innerHTML = "Empresas que empiezan con : "  +  letrasSeleccionada;
		}
		tabla.appendChild(caption);
		let datosEmpresa =  datos;
		let cabezal = tabla.createTHead();
		let row = cabezal.insertRow();
		let nombre = row.insertCell();
		nombre.innerHTML = "Nombre";
		let direccion = row.insertCell();
		direccion.innerHTML = "Direcci&oacute;n";
		let rubro = row.insertCell();
		rubro.innerHTML = "Rubro";
		let cantidad = row.insertCell();
		cantidad.innerHTML = "Cantidad";
		for (let i = 0; i< datosEmpresa.length; i++){
			let fila = tabla.insertRow();
			let celdaNombre = fila.insertCell();
			celdaNombre.innerHTML = datosEmpresa[i].nombre;
			let celdaDireccion = fila.insertCell();
			celdaDireccion.innerHTML = datosEmpresa[i].direccion;
			let celdaRubro = fila.insertCell();
			celdaRubro.innerHTML = datosEmpresa[i].rubro;
			let celdaCantidad = fila.insertCell();
			celdaCantidad.innerHTML= datosEmpresa[i].contadorDeReclamo;
		}
		
		let promedioEmpresas = document.getElementById("idPromedioEmpresas");
		promedioEmpresas.innerHTML ="";
		let empresasTotales = sistema.darTodasE().length;
		let totalReclamos =  sistema.darTodosR().length;
		let texto;
		if(totalReclamos > 0){
			texto = document.createTextNode("El promedio de las cantidades considerando todos los reclamos de todas las empresas es: " + Math.trunc((sistema.cantidadTotal()/totalReclamos)));
			promedioEmpresas.appendChild(texto);
		}else{
			texto = document.createTextNode("El promedio de las cantidades considerando todos los reclamos de todas las empresas es: " + 0);
			promedioEmpresas.appendChild(texto);
		}
		
		let totalEmpresas = document.getElementById("idTotalEmpresasRegistradas");
		totalEmpresas.innerHTML ="";
		let texto2 = document.createTextNode("Total de empresas registradas: " + empresasTotales);
		totalEmpresas.appendChild(texto2);
}

//crea una lista de las empresas sin reclamos
function crearListaEmpresaSinReclamo(){
	let lista = document.getElementById("idEmpresasSinReclamos");
	lista.innerHTML = "";
	let info = sistema.empresasSinReclamos();
	if(info.length > 0){
		for(let e of info){
				let li = document.createElement("li");
				let nodoT = document.createTextNode(e.nombre + " (" 
				+ e.direccion + ") Rubro: " + e.rubro);
				li.appendChild(nodoT);
				lista.appendChild(li);
		}
	}else{
		lista.innerHTML = "Sin datos";
	}
	
}

//crea lista del rubro o los rubros con mas reclamos
function crearListaRubroConMasReclamos(){
	let lista2 = document.getElementById("idCantidadMaximaReclamos");
	lista2.innerHTML = "";
	let info2 = sistema.obtenerMaximoCantidadReclamosRubro()
	if(info2.length > 0){
		for(let r of info2){
			let li2 = document.createElement("li");
			let nodoT2 = document.createTextNode(r.rubro + " cantidad: " + r.cantidadReclamo);
			li2.appendChild(nodoT2);
			lista2.appendChild(li2);
		}
	}else{
		lista2.innerHTML = "Sin Datos";
	}
}

//crea los botones con las iniciales de las empresas, y ejecuta el evento si se clickea dichos botones lo pinta de verde y actualiza la tabla 
function crearBotonesEstadisticas() {
	let creciente = document.getElementById("creciente").checked;
	sistema.ordenarTabla(creciente);
	let nombres = sistema.darTodasE();
	let letras = [];
		document.getElementById("idBotones").innerHTML = "";
		for (let i = 0; i < nombres.length; i++) {
			let inicial = nombres[i].nombre.slice(0, 1).toUpperCase();
			if (!letras.includes(inicial)) {
			  letras.push(inicial);
			}
		letras.sort();
		}
		letras.push("*");
	for (let i = 0; i < letras.length; i++) {
		let boton = document.createElement("button");
		boton.innerHTML = letras[i];
		boton.classList.add("botonesSeleccionLetra");
		if(letras[i] == letrasSeleccionada){
			boton.classList.add("botonLetraT");
		}
		boton.addEventListener("click", function() {
			let botones = document.getElementsByClassName("botonLetraT");
			for (let j = 0; j < botones.length; j++) {
				botones[j].classList.remove("botonLetraT");
			}
			boton.classList.add("botonLetraT");
			let datosFiltrados = filtrarEmpresas(letras[i]);
			letrasSeleccionada = boton.innerHTML;
			crearTabla(datosFiltrados);
			
		});
		document.getElementById("idBotones").appendChild(boton);
	}
}

//recibe un booleano como parametro para ordenar creciente o decreciente, y muestra las empresas filtradas o todas 
function generarTabla(orden){
	let letra = document.getElementsByClassName("botonLetraT")[0].innerText;
	sistema.ordenarTabla(orden);
	let empresas = filtrarEmpresas(letra);
	crearTabla(empresas);
}

//filtra las empresas que empiezan con la letra marcada o todas con *
function filtrarEmpresas(inicial) {
	if(inicial != "*"){
		let filtro = [];
		let datosEmpresa = sistema.darTodasE();
		for (let i = 0; i < datosEmpresa.length; i++) {
			if (datosEmpresa[i].nombre.slice(0, 1).toUpperCase() == inicial) {
			filtro.push(datosEmpresa[i]);
			}
		}
		return filtro;
	}
	return sistema.darTodasE();
}

// muestra el reclamo o los reclamos buscados por nombre o empresa o comentario 
function buscadorNombreEmpresaComentario(){
	mostrarVerReclamos();
	let verReclamos = document.getElementById("Reclamos");
	verReclamos.innerHTML = "";
	let palabraDeseada = document.getElementById("busqueda").value;
	let encontrados = sistema.mostrarDatosPedidos(palabraDeseada);
	if(encontrados == 0){
		verReclamos.innerHTML = "Sin datos";
	}else{
		agregarVerReclamos(encontrados);
	}
}