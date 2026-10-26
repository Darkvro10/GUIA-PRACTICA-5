import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Ingrese el nombre del huesped: ", function(nombreHuesped) {

    rl.question("Ingrese la cantidad de noches: ", function(entradaNoches) {

        const noches = parseInt(entradaNoches);

        rl.question("Ingrese la tarifa base por noche ($): ", function(entradaTarifa) {

            const tarifaBase = parseFloat(entradaTarifa);

            if (isNaN(noches) || noches <= 0 ||
                isNaN(tarifaBase) || tarifaBase <= 0) {

                console.log("Error: ingrese noches y tarifa validas.");
                rl.close();

            } else {

                console.log("\n===== TEMPORADA DE RESERVA =====");
                console.log("1. Temporada Baja");
                console.log("2. Temporada Media - 15% de recargo");
                console.log("3. Temporada Alta - 35% de recargo");

                rl.question("Seleccione la temporada: ", function(entradaTemporada) {

                    const temporada = parseInt(entradaTemporada);
                    let tarifaNoche = 0;
                    let nombreTemporada = "";
                    let opcionValida = true;

                    switch (temporada) {
                        case 1:
                            tarifaNoche = tarifaBase;
                            nombreTemporada = "Temporada Baja";
                            break;

                        case 2:
                            tarifaNoche = tarifaBase * 1.15;
                            nombreTemporada = "Temporada Media";
                            break;

                        case 3:
                            tarifaNoche = tarifaBase * 1.35;
                            nombreTemporada = "Temporada Alta";
                            break;

                        default:
                            console.log("Error: la temporada seleccionada no existe.");
                            opcionValida = false;
                    }

                    if (opcionValida) {
                        let subtotal = tarifaNoche * noches;
                        let descuento = 0;

                        if (noches >= 5) {
                            descuento = subtotal * 0.10;
                            subtotal = subtotal - descuento;
                        }

                        const impuestoTurismo = subtotal * 0.05;
                        const totalExacto = subtotal + impuestoTurismo;
                        const totalRedondeado = Math.ceil(totalExacto);

                        const fechaSalida = new Date();
                        fechaSalida.setDate(fechaSalida.getDate() + noches);

                        console.log("\n==================================");
                        console.log("       LIQUIDACION DE HOSPEDAJE");
                        console.log("==================================");
                        console.log("Fecha de entrada: " + new Date().toLocaleDateString());
                        console.log("Fecha de check-out: " + fechaSalida.toLocaleDateString());
                        console.log("Huesped: " + nombreHuesped.trim());
                        console.log("Temporada: " + nombreTemporada);
                        console.log("Noches: " + noches);
                        console.log("Tarifa por noche: $" + tarifaNoche.toFixed(2));
                        console.log("Subtotal antes del descuento: $" + (tarifaNoche * noches).toFixed(2));
                        console.log("Descuento: $" + descuento.toFixed(2));
                        console.log("Subtotal con descuento: $" + subtotal.toFixed(2));
                        console.log("Impuesto turistico (5%): $" + impuestoTurismo.toFixed(2));
                        console.log("Total exacto: $" + totalExacto.toFixed(2));
                        console.log("Total redondeado hacia arriba: $" + totalRedondeado);
                        console.log("==================================");
                    }

                    rl.close();
                });
            }
        });
    });
});