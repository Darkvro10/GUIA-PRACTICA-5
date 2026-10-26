import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Ingrese el nombre completo del cliente: ", function(nombreCliente) {

    rl.question("Ingrese la marca y modelo del vehiculo: ", function(vehiculo) {

        rl.question("Ingrese el monto base del vehiculo ($): ", function(entradaPrecio) {

            const precioVehiculo = parseFloat(entradaPrecio);

            if (isNaN(precioVehiculo) || precioVehiculo <= 0) {
                console.log("Error: el precio debe ser un numero mayor a cero.");
                rl.close();
            } else {

                console.log("\n===== TIPO DE VEHICULO =====");
                console.log("1. Sedan - 5%");
                console.log("2. SUV - 8%");
                console.log("3. Pick-up / Camioneta - 12%");

                rl.question("Seleccione una opcion: ", function(entradaTipo) {

                    const tipoVehiculo = parseInt(entradaTipo);
                    let porcentajePrima = 0;
                    let nombreTipo = "";
                    let opcionValida = true;

                    switch (tipoVehiculo) {
                        case 1:
                            porcentajePrima = 0.05;
                            nombreTipo = "Sedan";
                            break;

                        case 2:
                            porcentajePrima = 0.08;
                            nombreTipo = "SUV";
                            break;

                        case 3:
                            porcentajePrima = 0.12;
                            nombreTipo = "Pick-up / Camioneta";
                            break;

                        default:
                            console.log("Error: la opcion seleccionada no existe.");
                            opcionValida = false;
                    }

                    if (opcionValida) {
                        const primaAnual = precioVehiculo * porcentajePrima;
                        const fechaCotizacion = new Date().toLocaleString();

                        console.log("\n==================================");
                        console.log("     COTIZACION DE SEGURO ANUAL");
                        console.log("==================================");
                        console.log("Fecha y hora: " + fechaCotizacion);
                        console.log("Cliente: " + nombreCliente.trim());
                        console.log("Vehiculo: " + vehiculo.trim());
                        console.log("Tipo: " + nombreTipo);
                        console.log("Valor del vehiculo: $" + precioVehiculo.toFixed(2));
                        console.log("Prima anual: " + (porcentajePrima * 100) + "%");
                        console.log("Total anual del seguro: $" + primaAnual.toFixed(2));
                        console.log("==================================");
                    }

                    rl.close();
                });
            }
        });
    });
});