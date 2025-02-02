/* Mariano Perez Nº307265 */

class Sistema{
	constructor(){
		this.empresas=[];
		this.reclamos=[];
		
	}
	
	// agrega la empresa al array empresas
	agregarE(unaEmpresa){
		this.empresas.push(unaEmpresa);
			
	}
	
	// agrega el reclamo al array reclamos
	agregarR(unReclamo){
		this.reclamos.push(unReclamo);
		
	}
	
	// verifica que la empresa no este ya ingresada
	empresaRepetida(nombre){
		let repetida = false;
		for(let i = 0; i < this.darTodasE().length && !repetida; i++){
			if(this.darTodasE()[i].nombre.toLowerCase() == nombre.toLowerCase()){
				repetida = true;
			}
		}
		return repetida;
	}
	
	// devuelve todas las empresas 
	darTodasE(){
		return this.empresas;
	}
	
	// devuelve todos los reclamos
	darTodosR(){
		return this.reclamos;
		
	}
	
	// crea le crea un identificador al reclamo ingresado
	creadorIdReclamo(){
			for(let i = this.reclamos.length-1; i >= 0; i--){
				this.reclamos[i].identificador = i+1;
			}
	}
	
	// le suma todos los reclamos al contador de la empresa 
	contadorEmpresaReclamo(){
		for(let i = 0; i<this.empresas.length; i++){
			let contador = 0;
			for(let j=0; j < this.reclamos.length; j++){
				if(this.empresas[i].nombre == (this.reclamos[j].empresa.nombre)){
					contador += this.reclamos[j].contador;
				}
			}
			this.empresas[i].contadorDeReclamo = contador;
		}
	}
	
	//devuelve la cantidad total de reclamos 
	cantidadTotal(){
		let cantidadT = 0;
		for(let e of this.empresas){
			cantidadT += e.contadorDeReclamo;
		}
		return cantidadT;
	}
	
	//devuelve el rubro o los rubros y la cantidad maxima 
		obtenerMaximoCantidadReclamosRubro(){
		let maximoR = 0;
		let rubro1 = [];
		
		for(let i = 0 ; i < this.empresas.length ; i++){
			let empresa = this.empresas[i];
			let rubro = empresa.rubro;
			let cont = 0;
			for(let j = 0; j < this.empresas.length ; j++){
				if(rubro == this.empresas[j].rubro){
					cont += this.empresas[j].contadorDeReclamo;
				}
			}
			let rubro2 = new RubroReclamo(rubro,cont);
			if(cont > maximoR ){
				rubro1 = [];
				maximoR = cont;
				rubro1.push(rubro2);
			}else{
				if(cont == maximoR && cont > 0){
					let found = false;
					for (let r of rubro1) {
						if (r.rubro == rubro2.rubro) {
							found = true;
							break;
						}
					}
					if (!found) {
						rubro1.push(rubro2);
					}
				}
			}
		}	
		return  rubro1
	}
	
	// devuelve el arreglo ordenado creciente o decreciente
	ordenarTabla(creciente) {
		let datosEmpresa = this.darTodasE();
		if (creciente) {
			datosEmpresa.sort(function(a, b) {
			  return a.compararCon(b);
		});
		}else{
			datosEmpresa.sort(function(a, b) {
			  return b.compararCon(a);
		});
	  }
	  return datosEmpresa;
	}
	
	// devuelve el reclamo que coincida con alguno de los atributos establecidos
	mostrarDatosPedidos(palabra){
		let ret = [];
		for(let r of this.reclamos){
			if(r.nombre.toLowerCase().includes(palabra.toLowerCase()) || r.empresa.nombre.toLowerCase().includes(palabra.toLowerCase()) 
				|| r.reclamo.toLowerCase().includes(palabra.toLowerCase()) || r.comentario.toLowerCase().includes(palabra.toLowerCase())){
				ret.push(r);
				
			}
		}
		return ret;
	}
	// devuelve las empresas sin reclamos
	empresasSinReclamos(){
		let empresasSinReclamo = [];
		for(let e of this.empresas){
			if(e.contadorDeReclamo == 0){
				empresasSinReclamo.push(e);
			}
		}
		return empresasSinReclamo;
	}
}
	
class Empresa{
	constructor(nombre, direccion, rubro){
		this.nombre = nombre;
		this.direccion = direccion;
		this.rubro = rubro;
		this.contadorDeReclamo = 0;
	}
	
	toString(){return this.nombre + " " + this.direccion + " " + this.rubro + " " + this.contadorDeReclamo;}
	
	// compara una empresa con el parametro pasado sin tener en cuenta caracteres especiales, mayuscula, etc
	compararCon(otro){
		return this.nombre.localeCompare(otro.nombre);
	}
	
}

class Reclamo{
	constructor(nombre, empresa, reclamo, comentario, identificador){
		this.nombre= nombre;
		this.empresa = empresa;
		this.reclamo = reclamo;
		this.comentario = comentario;
		this.contador = 1;
		this.identificador =0;
	}

	toString(){return this.nombre + " " + this.empresa + " " + this.reclamo + " " + this.comentario + " " + this.contador + " " + this.identificador;}
}

// cree esta clase para poder tener un molde cuando creo y devuelvo el o los reclamos con maximos reclamos
class RubroReclamo{
	constructor(rubro, cantidadReclamo){
		this.rubro = rubro;
		this.cantidadReclamo = cantidadReclamo;
	}
	toString(){return this.rubro + " " +this.cantidadReclamo;}
}