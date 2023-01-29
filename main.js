var app = new Vue({
    el: '#app',
    data: {
        cargos: [ 
            {id: 1, nombre: 'Juan Hernandez', cargo: 'Administrador', pin: '0000', baseSalario: 1600000,}, 
            {id: 2, nombre: 'Felipe Castro', cargo: 'Secretario', pin: '1111', baseSalario: 1400000, horasExtra: 0, valorHoraExtra: 9000, totalPago: 0},
            {id: 3, nombre: 'Andrea Sanchez', cargo: 'Vendedor', pin: '2222', baseSalario: 1200000, comision1: 0.1, comision2: 0.2, subTransporte: 140606, totalVentas: 0, totalPago: 0},
            {
                id: 4, nombre: 'Thomas Fernandez', cargo: 'Ensamblador', pin: '3333', 
                baseSalario: 1485000, zapatosEns: 0, zapatillasEns: 0, totalEnsamblados: 0, maximoZapatos: 0, 
                maximoZapatillas: 0, valorHoraExtra: 0, horasExtra: 0, comision1: 117200, hijos: 0, totalPago: 0
            },
        ],
        operaciones: [ 
            {id: 1, tipo: 1, precio: 85000, ensamble: 0, monto: 0, vendido: 0},
            {id: 2, tipo: 2, precio: 100000, ensamble: 0, monto: 0, vendido: 0}
        ],
        accionesAdmi: [ 
            {editar1: '', editar2: '', editar3: '', informe: '', 
            nuevoSB: 0, pos: '', comisionUno: 10, comisionDos: 20, 
            costoZapatos: 200, costoZapatillas: 350, maximoZapatos: 2000, maximoZapatillas: 3000}
        ],
        accionesCargo: [
            {mHora1: 0, mHora2: 0, totalComision: 0, hijos: 0,}
        ],
        idCargo: '', //identificador de cargo
        tVistaAdmin: 0, //vista de administrador truo o false
        idPin: '', //clave
        cLogin: 1,  // ventana incio sesio
        tVistaSecr: 0, // vista de secretario(a) false o true
        tVistaValores: 0, //Muesta valores en la tabla de informacion del administrador
        tVistaVendedor: 0,//vista vendedor truo o false
        tVistaEnsamblador: 0,//vista ensamblador truo o false
      
    },
    methods: {
        vistaSeleccion(){ //ejecucion de cada ventana o vista
            if(this.idCargo === 1 && this.idPin === this.cargos[0].pin) {
                this.vistaAdmin();
            }else if(this.idCargo === 2 && this.idPin === this.cargos[1].pin){
                this.vistaSecretaria();
            }else if(this.idCargo === 3 && this.idPin === this.cargos[2].pin){
                this.vistaVendedor();
            }else if(this.idCargo === 4 && this.idPin === this.cargos[3].pin){
                this.vistaEnsamblador();
            }else{
                alert('Clave o Usuario incorrectos por favor vuelva colocar sus credenciales');
            }
        },
        vistaAdmin(){//habilita vista del administrador
            this.tVistaAdmin = 1;
            this.cLogin = '';
        },
        edicionCargo(index) {//edicion de los campos de los cargos
            switch (index) {
                case 1:
                    this.accionesAdmi[0].editar1 = true;
                    this.accionesAdmi[0].nuevoSB = this.cargos[1].baseSalario;
                    this.accionesAdmi[0].pos = index;
                    break;
                case 2:
                    this.accionesAdmi[0].editar2 = true;
                    this.accionesAdmi[0].nuevoSB = this.cargos[2].baseSalario;
                    this.accionesAdmi[0].pos = index;
                    break;
                case 3:
                    this.accionesAdmi[0].editar3 = true;
                    this.accionesAdmi[0].nuevoSB = this.cargos[3].baseSalario;
                    this.accionesAdmi[0].pos = index;
                    break;
                default:
                    break;
            }
        },
        guardar(){//guarda la informacion que se modifica despues de hacer click 
            this.cargos[this.accionesAdmi[0].pos].baseSalario = this.accionesAdmi[0].nuevoSB;
            if(this.accionesAdmi[0].pos === 2){
                this.cargos[2].comision1 = this.accionesAdmi[0].comisionUno/100;
                this.cargos[2].comision2 = this.accionesAdmi[0].comisionDos/100;
            }
            alert(`Salario actualizado para el empleado: ${this.cargos[this.accionesAdmi[0].pos].name} con cargo: ${this.cargos[this.accionesAdmi[0].pos].charge}`)
        },
        pInforme(){
            this.accionesAdmi[0].informe = true;

            //Operaciones de la liguidacion secretario
            this.cargos[1].valorHoraExtra = ((this.cargos[1].baseSalario/30)/8)*1.8;
            if(this.cargos[1].horasExtra > 0) {
                this.cargos[1].totalPago = (this.cargos[1].horasExtra * this.cargos[1].valorHoraExtra) + this.cargos[1].baseSalario;
            }else{
                this.cargos[1].totalPago = this.cargos[1].baseSalario;
            }

            //Operaciones de la liguidacion vendedor
            if(this.cargos[2].totalVentas > 5000000 && this.cargos[2].totalVentas < 10000000) {
                this.accionesCargo[0].totalComision = this.cargos[2].baseSalario * this.cargos[2].comision1;
                this.cargos[2].totalPago = this.accionesCargo[0].totalComision + this.cargos[2].baseSalario + this.cargos[2].subTransporte;
            }else if(this.cargos[2].totalVentas > 10000000) {
                this.accionesCargo[0].totalComision = this.cargos[2].baseSalario * this.cargos[2].comision2;
                this.cargos[2].totalPago = this.accionesCargo[0].totalComision + this.cargos[2].baseSalario + this.cargos[2].subTransporte;
            }else {
                this.accionesCargo[0].totalComision = 0;
                this.cargos[2].totalPago = this.cargos[2].baseSalario + this.cargos[2].subTransporte;
            }

            //Operaciones de la liguidacion ensamblador
            this.cargos[3].valorHoraExtra = ((this.cargos[3].baseSalario/30)/8)*2.2;
            if(this.cargos[3].horasExtra > 0) {
                this.cargos[3].totalPago = (this.cargos[3].horasExtra * this.cargos[3].valorHoraExtra) + this.cargos[3].baseSalario + this.cargos[3].subTransporte;
            }else{
                this.cargos[3].totalPago = this.cargos[3].baseSalario + this.cargos[3].subTransporte;
            }

            if(this.cargos[3].zapatosEns > 1000 && this.cargos[3].zapatosEns < 2000){
                const aumento = (this.accionesAdmi[0].costoZapatos*this.cargos[3].zapatosEns)*0.1;
                this.cargos[3].totalPago += aumento;
            }else if(this.cargos[3].zapatosEns > 1000){
                const aumento = (this.accionesAdmi[0].costoZapatos*this.cargos[3].zapatosEns)*0.2;
                this.cargos[3].totalPago += aumento;
            }

            if(this.cargos[3].zapatillasEns > 1700 && this.cargos[3].tsneakers < 3000){
                const aumento = (this.accionesAdmi[0].costoZapatillas*this.cargos[3].zapatillasEns)*0.15;
                this.cargos[3].totalPago += aumento;
            }else if(this.cargos[3].zapatillasEns > 3000){
                const aumento = (this.accionesAdmi[0].costoZapatillas*this.cargos[3].zapatillasEns)*0.3;
                this.cargos[3].totalPago += aumento;
            }

            if(this.cargos[3].hijos > 0 && this.cargos[3].hijos < 2){
                const bonus= 80000;
                this.cargos[3].totalPago += bonus;
            }else if(this.cargos[3].hijos >= 2){
                const bonus= 60000 * this.cargos[3].hijos;
                this.cargos[3].totalPago += bonus;
            }

        },
        botonX(){
            this.accionesAdmi[0].editar1 = false;
            this.accionesAdmi[0].editar2 = false;
            this.accionesAdmi[0].editar3 = false;
            this.accionesAdmi[0].informe = false;
        },
        cerrarSesion(){
            this.tVistaAdmin = 0;
            this.tVistaSecr= 0;
            this.tVistaVendedor = 0;
            this.tVistaEnsamblador = 0;
            this.idCargo = '';
            this.idPin = '';
            this.cLogin = 1;
        },
        vistaSecretaria(){
            this.tVistaSecr = 1;
            this.cLogin = '';
            this.cargos[3].totalEnsamblados = this.operaciones[0].assembled + this.operaciones[1].assembled;
            this.tVistaValores = (this.operaciones[0].price * this.operaciones[0].sold)+(this.operaciones[1].price * this.operaciones[1].sold);
        },
        secreEnviar(){
            this.cargos[1].horasExtra = this.accionesCargo[0].mHora1;
            alert("Los datos se enviaron");
        },
        vistaVendedor(){
            this.tVistaVendedor = 1;
            this.cLogin = '';
        },
        vendedorEnviar(){
            if (this.operaciones[0].amount > 0 || this.operaciones[1].amount > 0 ) {
                this.cargos[2].totalVentas = (this.operaciones[0].amount*this.operaciones[0].price)+(this.operaciones[1].amount*this.operaciones[1].price);
            }else{
                alert("Escriba una cantidad o presiones el boton de cerrar sesion para ir a la pagina de inicio");
            }
            alert("Los datos se enviaron");
        },
        vistaEnsamblador(){
            this.tVistaEnsamblador = 1;
            this.cLogin = '';
        },
        ensabladorEnviar(){
            if (this.operaciones[0].assembled > this.accionesAdmi[0].maximoZapatos || this.operaciones[1].assembled > this.accionesAdmi[0].maximoZapatillas) {
                alert('Ha superado la cantidad maxima de zapatos o zapatillas que se pueden montar')
                this.tVistaEnsamblador = 0;
                this.idCargo = '';
                this.idPin = '';
                this.cLogin = 1;
            }else{
                this.cargos[3].horasExtra = this.accionesCargo[0].mHora2;
                this.cargos[3].zapatosEns = this.operaciones[0].assembled;
                this.cargos[3].zapatillasEns = this.operaciones[1].assembled;
                alert("Los datos se enviaron");
            }
        }
    }
  })
