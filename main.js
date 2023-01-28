var app = new Vue({
    el: '#app',
    data: {
        empleados: [
            { nombre: 'camilo', cargo: 'Vendedor', liquidacion: false },
            { nombre: 'valentina', cargo: 'Ensamblador', liquidacion: false },
            { nombre: 'tiago', cargo: 'Vendedor', liquidacion: false }
        ],
        empleado: '',
        cargos: [
            { cargo: 'Secretario', salarioBase: 0 },
            { cargo: 'Vendedor', salarioBase: 1000000 },
            { cargo: 'Ensamblador', salarioBase: 0 }
        ],
        cargoSeleccionado: '',
        salarioBase: '',
        cantidadMaximaZapatos: '',
        precioEnsamble: '',
        comision: '',
        ventas: '',
        subsidioTransporte: 140606,
        vendedor:'',
        salarioVendedor: 0,
        liquidacionVendedores: 0,
        liquidacion: 0

    },

    methods: {

        guardarSalarioBase() {

            this.cargos.forEach(item => {

                if (item.cargo == this.cargoSeleccionado) {
                    item.salarioBase = this.salarioBase;
                }

            });

            console.log(this.cargos);

        },

        guardarMaximoZapatos() {
            console.log(this.cantidadMaximaZapatos);
        },

        guardarPrecioEnsamble() {
            console.log(this.precioEnsamble);
        },

        guardarComision() {
            console.log(this.comision);
        },

        calcularSalarioVendedor() {

            this.empleados.forEach(item => {
                if (item.nombre == this.empleado) {

                    if (this.ventas > 5000000 && this.ventas < 10000000) {
                        this.salarioVendedor = this.cargos[1].salarioBase + (this.cargos[1].salarioBase * 0.1) + this.subsidioTransporte;
                    } else if (this.ventas >= 10000000) {
                        this.salarioVendedor = this.cargos[1].salarioBase + (this.cargos[1].salarioBase * 0.2) + this.subsidioTransporte;
                    } else {
                        this.salarioVendedor = this.cargos[1].salarioBase + this.subsidioTransporte;
                    }
                    this.liquidacionVendedores = this.liquidacionVendedores + this.salarioVendedor;
                    this.liquidacion = this.liquidacion + this.salarioVendedor;
                    item.liquidacion = true;
                    this.ventas = '';
                    this.vendedor = this.empleado;
                
                }
            });

            console.log(this.empleados);


        }

    }
}
)