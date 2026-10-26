import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Ingrese el nombre del vendedor: ", function(nombreVendedor) {

    rl.question("Ingrese el nombre del producto: ", function(nombreProducto) {

        rl.question("Ingrese el precio base del producto ($): ", function(entradaPrecio) {

            const precioBase = parseFloat(entradaPrecio);

            if (isNaN(precioBase) || precioBase <= 0) {
                console.log("Error: el precio debe ser un numero mayor a cero.");
                rl.close();

            } else {

                console.log("\n===== CATEGORIAS DE PRODUCTOS =====");
                console.log("A. Linea Blanca - 10% de descuento");
                console.log("B. Electronica - 5% de descuento");
                console.log("C. Muebleria - 15% de descuento");
                console.log("D. Accesorios/Varios - Sin descuento");

                rl.question("Seleccione la categoria: ", function(entradaCategoria) {

                    const categoria = entradaCategoria.trim().toUpperCase();
                    let porcentajeDescuento = 0;
                    let nombreCategoria = "";
                    let opcionValida = true;

                    switch (categoria) {
                        case "A":
                            porcentajeDescuento = 0.10;
                            nombreCategoria = "Linea Blanca";
                            break;

                        case "B":
                            porcentajeDescuento = 0.05;
                            nombreCategoria = "Electronica";
                            break;

                        case "C":
                            porcentajeDescuento = 0.15;
                            nombreCategoria = "Muebleria";
                            break;

                        case "D":
                            porcentajeDescuento = 0;
                            nombreCategoria = "Accesorios/Varios";
                            break;

                        default:
                            console.log("Error: la categoria seleccionada no existe.");
                            opcionValida = false;
                    }

                    if (opcionValida) {

                        rl.question("Desea garantia extendida por $25.00? (S/N): ", function(entradaGarantia) {

                            const garantia = entradaGarantia.trim().toUpperCase();

                            if (garantia !== "S" && garantia !== "N") {
                                console.log("Error: debe responder S o N.");
                                rl.close();

                            } else {

                                const descuento = precioBase * porcentajeDescuento;
                                const subtotalProducto = precioBase - descuento;

                                let costoGarantia = 0;

                                if (garantia === "S") {
                                    costoGarantia = 25;
                                } else {
                                    costoGarantia = 0;
                                }

                                const subtotal = subtotalProducto + costoGarantia;
                                const iva = subtotal * 0.13;
                                const totalExacto = subtotal + iva;
                                const totalRedondeado = Math.round(totalExacto);

                                const fechaActual = new Date();

                                console.log("\n========================================");
                                console.log("          FACTURA DE VENTA");
                                console.log("========================================");
                                console.log("Fecha: " + fechaActual.toLocaleDateString());
                                console.log("Fecha y hora: " + fechaActual.toLocaleString());
                                console.log("Vendedor: " + nombreVendedor.trim());
                                console.log("Producto: " + nombreProducto.trim());
                                console.log("Categoria: " + nombreCategoria);
                                console.log("Precio base: $" + precioBase.toFixed(2));
                                console.log("Descuento aplicado: $" + descuento.toFixed(2));
                                console.log("Subtotal del producto: $" + subtotalProducto.toFixed(2));
                                console.log("Garantia extendida: $" + costoGarantia.toFixed(2));
                                console.log("Subtotal acumulado: $" + subtotal.toFixed(2));
                                console.log("IVA (13%): $" + iva.toFixed(2));
                                console.log("Total a pagar: $" + totalExacto.toFixed(2));
                                console.log("Total aproximado: $" + totalRedondeado);
                                console.log("========================================");
                                console.log("Gracias por su compra.");

                                rl.close();
                            }
                        });
                    } else {
                        rl.close();
                    }
                });
            }
        });
    });
});