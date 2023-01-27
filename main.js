var app = new Vue({
    el: '#app',
    data: {
        cargos: [
            { cargo: 'Secretario', salarioBase: 0 },
            { cargo: 'Vendedor', salarioBase: 0 },
            { cargo: 'Ensamblador', salarioBase: 0 }
        ],
        cargoSeleccionado: '',
        salarioBase: '',
        cantidadMaximaZapatos:''

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

        guardarMaximoZapatos(){
            console.log(this.cantidadMaximaZapatos);
        }

    }
}
)