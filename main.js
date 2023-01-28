var app = new Vue({
    el: '#app',
    data: {
        empleados: [
            { nombre: 'camilo burbano', cargo: 'Vendedor', liquidacion: false },
            { nombre: 'valentina', cargo: 'Ensamblador', liquidacion: false },
            { nombre: 'tiago burbano', cargo: 'Vendedor', liquidacion: false },
            { nombre: 'lina', cargo: 'Secretario', liquidacion: false }
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
        vendedor: '',
        salarioVendedor: 0,
        liquidacionVendedores: 0,
        liquidacion: 0

    },

    methods: {

        guardarSalarioBase() {

            if (this.salarioBase != '' && this.cargoSeleccionado != '') {
                this.cargos.forEach(item => {

                    if (item.cargo == this.cargoSeleccionado) {
                        item.salarioBase = this.salarioBase;
                        alert('Salario base del ' + this.cargoSeleccionado + ' actualizado');
                        this.cargoSeleccionado = '';
                        this.salarioBase = '';
                    }
                });

            } else {
                alert('Error al ingresar los datos');
            }
            console.log(this.cargos);
        },

        guardarMaximoZapatos() {
            if (this.cantidadMaximaZapatos != '') {
                alert('Cantidad maxima de  zapatos actualizada');
                // console.log(this.cantidadMaximaZapatos);
            } else {
                alert('Error al ingresar los datos');
            }
        },

        guardarPrecioEnsamble() {
            if (this.precioEnsamble != '') {
                alert('Precio de ensamble actualizado');
                // console.log(this.precioEnsamble);
            } else {
                alert('Error al ingresar los datos');
            }
        },

        guardarComision() {
            if (this.comision != '' && this.comision >= 0 && this.comision <= 100) {
                console.log(this.comision);
                alert('Comisión actualizada');
            } else {
                alert('Error al ingresar los datos');
            }
        },

        calcularSalarioVendedor() {

            if (this.empleado != '' && this.ventas != '') {
                this.empleados.forEach(item => {
                    if (item.nombre == this.empleado) {
                        // console.log(item.nombre);
                        // console.log(this.empleado);
                        if (this.ventas > 5000000 && this.ventas < 10000000) {
                            this.salarioVendedor = this.cargos[1].salarioBase + (this.cargos[1].salarioBase * 0.1) + (this.ventas * (this.comision / 100)) + this.subsidioTransporte;
                        } else if (this.ventas >= 10000000) {
                            this.salarioVendedor = this.cargos[1].salarioBase + (this.cargos[1].salarioBase * 0.2) + (this.ventas * (this.comision / 100)) + this.subsidioTransporte;
                        } else {
                            this.salarioVendedor = this.cargos[1].salarioBase + (this.ventas * (this.comision / 100)) + this.subsidioTransporte;
                        }
                        this.liquidacionVendedores = this.liquidacionVendedores + this.salarioVendedor;
                        this.liquidacion = this.liquidacion + this.salarioVendedor;
                        item.liquidacion = true;
                        this.ventas = '';
                        this.vendedor = this.empleado;
                        this.empleado = '';
                    }
                });
            } else {
                alert('Error al ingresar los datos');
            }
            console.log(this.empleados);

        }

    }
}
)