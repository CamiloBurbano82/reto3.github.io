var app = new Vue({
    el: '#app',
    data: {
        empleados: [
            { nombre: 'Camilo Burbano', cargo: 'Vendedor', liquidacion: false, salario: 0 },
            { nombre: 'Valentina Burbano', cargo: 'Ensamblador', liquidacion: false, salario: 0 },
            { nombre: 'Tiago Burbano', cargo: 'Vendedor', liquidacion: false, salario: 0 },
            { nombre: 'Lina Muñoz', cargo: 'Secretario', liquidacion: false, salario: 0 },
            { nombre: 'Juan Hernandez', cargo: 'Ensamblador', liquidacion: false, salario: 0 },
            { nombre: 'Felipe Castro', cargo: 'Secretario', liquidacion: false, salario: 0 },
            { nombre: 'Andrea Sanchez', cargo: 'Vendedor', liquidacion: false, salario: 0 },

        ],

        cargos: [
            { cargo: 'Administrador', pin: '0000', login: false },
            { cargo: 'Secretario', salarioBase: 0, salarioTotal: 0, pin: '1111', login: false },
            { cargo: 'Vendedor', salarioBase: 0, salarioTotal: 0, pin: '2222', login: false },
            { cargo: 'Ensamblador', salarioBase: 0, salarioTotal: 0, pin: '3333', login: false },
        ],
        // login
        pin: '',
        estado: true,

        // Administrador
        cargoSeleccionado: '',
        salarioBase: '',
        cantidadMaximaZapatos: 0,
        cantidadMaximaZapatillas: 0,
        precioEnsambleZapatos: 0,
        precioEnsambleZapatillas: 0,
        comision: 0,

        //Secretario
        secretario: '',
        horas: '',

        //Vendedor
        empleado: '',
        ventas: '',
        subsidioTransporte: 140606,
        vendedor: '',
        liquidacionVendedores: 0,
        salario: 0,

        //ensamblador
        tieneHijos: '',
        hijos: 0,
        ensamblador: '',
        horasExtrasEnsamblador: '',
        totalZapatosEnsamblados: '',
        totalZapatillasEnsambladas: '',

        liquidacion: 0,
        verLiquidacion: 0,
        verEnsamblador: 0,
        verSecretario: 0,
        verVendedor: 0,
        peso: ''

    },

    methods: {

        login() {
            if (this.cargoSeleccionado != '' && this.pin != '') {
                let bandera = true;
                this.cargos.forEach(item => {
                    if (item.pin == this.pin && item.cargo == this.cargoSeleccionado) {
                        if (this.cargoSeleccionado == 'Administrador') {
                            this.moneda();
                            this.verLiquidacion = this.peso.format(this.liquidacion.toFixed(2));
                            this.verSecretario = this.peso.format(this.cargos[1].salarioTotal.toFixed(2));
                            this.verVendedor = this.peso.format(this.cargos[2].salarioTotal.toFixed(2));
                            this.verEnsamblador = this.peso.format(this.cargos[3].salarioTotal.toFixed(2));
                        }
                        item.login = true;
                        this.cargoSeleccionado = '';
                        this.pin = '';
                        this.estado = false;
                        bandera = false;
                    }
                });
                if (bandera) {
                    alert('Pin incorrecto');
                }
            } else {
                alert('Todos los campos son obligatorios');
            }
        },


        moneda() {
            this.peso = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            })
        },

        salir() {
            this.estado = true;
            this.cargos.forEach(item => {
                item.login = false;
            }
            );
        },

        guardarSalarioBase() {

            if (this.salarioBase != '' && this.cargoSeleccionado != '' && this.salarioBase > 0) {

                if (this.cargoSeleccionado == 'Secretario') {
                    this.cargos[1].salarioBase = this.salarioBase;

                }
                if (this.cargoSeleccionado == 'Vendedor') {
                    this.cargos[2].salarioBase = this.salarioBase;

                }
                if (this.cargoSeleccionado == 'Ensamblador') {
                    this.cargos[3].salarioBase = this.salarioBase;

                }
                alert('Salario base del ' + this.cargoSeleccionado + ' actualizado');
                this.cargoSeleccionado = '';
                this.salarioBase = '';
            } else {
                alert('Error al ingresar los datos');
            }
        },

        guardarMaximoZapatos() {
            if (this.cantidadMaximaZapatos != '' && this.cantidadMaximaZapatillas != '') {
                alert('Cantidad maxima de  zapatos y zapatillas actualizadas');

            } else {
                alert('Todos los campos son obligatorios');
            }
        },

        guardarPrecioEnsamble() {
            if (this.precioEnsambleZapatos != '' && this.precioEnsambleZapatillas != '') {
                alert('Precio de ensamble de zapatos y zapatillas actualizado');
            } else {
                alert('Todos los campos son obligatorios');
            }
        },

        guardarComision() {
            if (this.comision != '' && this.comision >= 0 && this.comision <= 100) {
                alert('Comisión actualizada');
            } else {
                alert('El campo es obligatorio');
            }
        },

        calcularSalarioSecretario() {
            if (this.empleado != '' && this.horas != '') {
                this.empleados.forEach(item => {
                    if (item.nombre == this.empleado) {
                        item.salario = this.cargos[1].salarioBase + (((this.cargos[1].salarioBase / 30) / 8) * 1.8 * this.horas);

                        this.salario = item.salario;
                        item.liquidacion = true;
                        this.cargos[1].salarioTotal = this.cargos[1].salarioTotal + item.salario;
                        this.liquidacion = this.liquidacion + item.salario;
                        this.horas = '';
                        this.secretario = this.empleado;
                        this.empleado = '';
                    }
                })
            } else {
                alert('Todos los campos son obligatorios');
            }
        },

        calcularSalarioVendedor() {

            if (this.empleado != '' && this.ventas != '') {

                this.empleados.forEach(item => {
                    if (item.nombre == this.empleado) {
                        if (this.ventas > 5000000 && this.ventas < 10000000) {
                            item.salario = this.cargos[2].salarioBase + (this.cargos[2].salarioBase * 0.1) + (this.ventas * (this.comision / 100)) + this.subsidioTransporte;
                        } else if (this.ventas >= 10000000) {
                            item.salario = this.cargos[2].salarioBase + (this.cargos[2].salarioBase * 0.2) + (this.ventas * (this.comision / 100)) + this.subsidioTransporte;
                        } else {
                            item.salario = this.cargos[2].salarioBase + (this.ventas * (this.comision / 100)) + this.subsidioTransporte;
                        }

                        this.salario = item.salario;
                        item.liquidacion = true;
                        this.cargos[2].salarioTotal = this.cargos[2].salarioTotal + item.salario;
                        this.liquidacion = this.liquidacion + item.salario;
                        this.ventas = '';
                        this.vendedor = this.empleado;
                        this.empleado = '';
                    }
                });
            } else {
                alert('Todos los campos son obligatorios');
            }

        },

        calcularSalarioEnsamblador() {

            if (this.empleado != '' && this.horasExtrasEnsamblador != '' && this.totalZapatosEnsamblados != '' && this.totalZapatillasEnsambladas != '') {

                if (this.cantidadMaximaZapatos > this.totalZapatosEnsamblados && this.cantidadMaximaZapatillas > this.totalZapatillasEnsambladas) {
                    this.empleados.forEach(item => {
                        if (this.empleado == item.nombre) {
                            if (this.totalZapatosEnsamblados > 1000 && this.totalZapatosEnsamblados < 2000) {
                                item.salario = item.salario + this.cargos[3].salarioBase + ((this.cargos[3].salarioBase / 30) / 8) * 2.2 * this.horasExtrasEnsamblador + (this.totalZapatosEnsamblados * this.precioEnsambleZapatos) * 0.1;
                            }
                            if (this.totalZapatosEnsamblados >= 2000) {
                                item.salario = item.salario + this.cargos[3].salarioBase + ((this.cargos[3].salarioBase / 30) / 8) * 2.2 * this.horasExtrasEnsamblador + (this.totalZapatosEnsamblados * this.precioEnsambleZapatos) * 0.2;
                            }
                            if (this.totalZapatillasEnsambladas > 1700 && this.totalZapatillasEnsambladas < 3000) {
                                item.salario = item.salario + this.cargos[3].salarioBase + ((this.cargos[3].salarioBase / 30) / 8) * 2.2 * this.horasExtrasEnsamblador + (this.totalZapatillasEnsambladas * this.precioEnsambleZapatillas) * 0.15;
                            }
                            if (this.totalZapatillasEnsambladas >= 3000) {
                                item.salario = item.salario + this.cargos[3].salarioBase + ((this.cargos[3].salarioBase / 30) / 8) * 2.2 * this.horasExtrasEnsamblador + (this.totalZapatillasEnsambladas * this.precioEnsambleZapatillas) * 0.3;
                            }
                            if (this.totalZapatosEnsamblados <= 1000 && this.totalZapatillasEnsambladas <= 1700) {
                                item.salario = item.salario + this.cargos[3].salarioBase + ((this.cargos[3].salarioBase / 30) / 8) * 2.2 * this.horasExtrasEnsamblador;
                            }
                            if (this.hijos > 0) {
                                if (this.hijos == 1) {
                                    item.salario = item.salario + 60000;
                                } else {
                                    item.salario = item.salario + (80000 * this.hijos);
                                }
                            }

                            this.salario = item.salario;
                            item.liquidacion = true;
                            this.cargos[3].salarioTotal = this.cargos[3].salarioTotal + item.salario;
                            this.liquidacion = this.liquidacion + item.salario;


                            this.ensamblador = this.empleado;
                            this.empleado = '';

                            this.hijos = 0;
                            this.horasExtrasEnsamblador = '';
                            this.totalZapatosEnsamblados = '';
                            this.totalZapatillasEnsambladas = '';

                        }
                    })

                } else {
                    alert('El numero de zapatos o zapatillas ensamblados no deben superar sus maximos respectivos');
                }
            } else {
                alert('Todos los campos son obligatorios');
            }

        }

    }
}
)