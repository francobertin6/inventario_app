"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import electron
const electron = require("electron");
const ipc = electron.ipcRenderer;
// import conexion con la base de datos
let connect = require("D:/Users/Usuario/Documents/GIT hub/inventario_app/database_connection.js");
// interface de los productos
class productos {
    // constructor
    constructor(id, nombre, tipo, color, cantidad, medida, costo_unitario, Proveedor) {
        this.Id = id;
        this.Nombre = nombre;
        this.Tipo = tipo;
        this.Color = color;
        this.Cantidad = cantidad;
        this.Medida = medida;
        this.Costo_unitario = costo_unitario;
        this.Proveedor = Proveedor;
    }
    // constructor
    relacion_cantidad_costounitario(cantidad, costo) {
        return cantidad * costo;
    }
}
// ARRAYS
const favorites = [];
const products_sell = [];
const waiting_sell = [];
const products_unsold = [];
// ARRAYS
// GET function productos
// table elemento
const tabla = document.getElementById("tabla");
function create_table_row(nuevo_prod, img) {
    let tbody = document.getElementById('table-body');
    // rows = cabecilla de tabla, su valor sera el id del producto
    let row = document.createElement("tr");
    row.className = "table_rows_products";
    row.id = JSON.stringify(nuevo_prod.Id);
    tbody.appendChild(row);
    // row entrara al cuerpo de la tabla
    // nombre producto
    let name = document.createElement("th");
    name.innerHTML = nuevo_prod.Nombre;
    row.appendChild(name);
    name.addEventListener("dblclick", (e) => {
        var _a;
        e.preventDefault();
        let element = e.target;
        let parentID = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.id;
        let paragraph = `Cambiar nombre = ${nuevo_prod.Nombre}`;
        create_update_input("nombre", paragraph, "text", parentID);
    });
    // nombre producto
    // tipo producto
    let type = document.createElement("th");
    type.innerHTML = nuevo_prod.Tipo;
    row.appendChild(type);
    type.addEventListener("dblclick", (e) => {
        var _a;
        e.preventDefault();
        let element = e.target;
        let parentID = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.id;
        let paragraph = `Cambiar tipo = ${nuevo_prod.Tipo}`;
        create_update_input("tipo", paragraph, "text", parentID);
    });
    // tipo producto
    // color producto
    let color = document.createElement("th");
    color.innerHTML = nuevo_prod.Color;
    row.appendChild(color);
    color.addEventListener("dblclick", (e) => {
        var _a;
        e.preventDefault();
        let element = e.target;
        let parentID = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.id;
        let paragraph = `Cambiar color = ${nuevo_prod.Color}`;
        create_update_input("color", paragraph, "text", parentID);
    });
    // color producto
    // cantidad producto
    let cantidad = document.createElement("th");
    cantidad.innerHTML = JSON.stringify(nuevo_prod.Cantidad);
    row.appendChild(cantidad);
    cantidad.addEventListener("dblclick", (e) => {
        e.preventDefault();
        let element = e.target;
        let parent = element.parentElement;
        let parentID = parent.id;
        let product_new = new productos(undefined, parent.children[0].innerHTML, parent.children[1].innerHTML, parent.children[2].innerHTML, parseInt(parent.children[3].innerHTML), undefined, parseInt(parent.children[5].innerHTML), undefined);
        console.log(product_new);
        create_update_input_for_cantidad("cantidad", "number", product_new, parentID);
    });
    // cantidad producto
    // medida producto
    let medida = document.createElement("th");
    medida.innerHTML = nuevo_prod.Medida;
    row.appendChild(medida);
    medida.addEventListener("dblclick", (e) => {
        var _a;
        e.preventDefault();
        let element = e.target;
        let parentID = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.id;
        let paragraph = `Cambiar medida = ${nuevo_prod.Medida}`;
        create_update_input("medida", paragraph, "text", parentID);
    });
    // medida producto
    // costo unitario producto
    let costo_unitario = document.createElement("th");
    costo_unitario.innerHTML = JSON.stringify(nuevo_prod.Costo_unitario);
    row.appendChild(costo_unitario);
    costo_unitario.addEventListener("dblclick", function (e) {
        var _a;
        e.preventDefault();
        let element = e.target;
        let parentID = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.id;
        let paragraph = `Cambiar costo unitario = ${nuevo_prod.Costo_unitario}`;
        create_update_input("costo_unitario", paragraph, "number", parentID);
    });
    // costo unitario producto
    // costo total producto
    let costo = document.createElement("th");
    costo.innerHTML = JSON.stringify(nuevo_prod.relacion_cantidad_costounitario(nuevo_prod.Cantidad, nuevo_prod.Costo_unitario));
    row.appendChild(costo);
    // costo total producto
    // proveedor producto
    let proveedor = document.createElement("th");
    proveedor.innerHTML = nuevo_prod.Proveedor;
    row.appendChild(proveedor);
    // proveedor producto
    // options
    let options = document.createElement("th");
    options.className = "option";
    options.onclick = option;
    let span = document.createElement("span");
    span.appendChild(img);
    options.appendChild(span);
    row.appendChild(options);
}
function get_productos() {
    connect.query('SELECT * FROM `productos`', function (error, result, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                throw error;
            }
            else {
                for (let index = 0; index < result.length; index++) {
                    var nuevo_prod = new productos(result[index].id, result[index].nombre, result[index].tipo, result[index].color, result[index].cantidad, result[index].medida, result[index].costo_unitario, result[index].proveedor);
                    let img = document.createElement("img");
                    img.src = "./icons/elipsis.svg";
                    create_table_row(nuevo_prod, img);
                }
            }
        });
    });
}
get_productos();
let reload = document.getElementById("reload_button");
function reload_get_products() {
    // reload function delete and create tbody
    let tbody = document.getElementById('table-body');
    tbody.remove();
    // borro tbody de la tabla y vuelvo a crearlo para que la funcion pueda resetearse
    let body = document.createElement("tbody");
    body.id = 'table-body';
    tabla.appendChild(body);
    setTimeout(function () {
        get_productos();
    }, 500);
}
reload.addEventListener("click", function (e) {
    e.preventDefault();
    reload_get_products();
});
// POST function /*SE HARA EN LA CARPETA ./AGREGAR_PRODUCTOS/PRODUCTOS_POST*/ 
// abrir agregar_producto.html
let agregar_producto_btn = document.getElementById("agregar_productos_btn");
agregar_producto_btn.addEventListener("click", function (event) {
    event.preventDefault();
    ipc.send('open_agregar_producto.html');
});
// boton opciones en cada <tr>
function option(event) {
    event.preventDefault();
    const body = document.getElementsByTagName("body")[0];
    const script = document.getElementsByTagName("script")[1];
    let th = event.target.parentElement;
    let parentElement = th.parentElement;
    let number_ID = th.parentElement.id;
    let positionY = JSON.stringify(event.clientY);
    if (body.lastElementChild === script) {
        // menu
        let menu = document.createElement("div");
        menu.className = "menu_option";
        body.appendChild(menu);
        menu.style.position = "absolute";
        menu.style.left = "86vw";
        menu.style.top = `${positionY}px`;
        // option delete
        let menu_delete = document.createElement("span");
        menu_delete.innerHTML = "Borrar producto";
        menu.appendChild(menu_delete);
        menu_delete.addEventListener("click", function (event) {
            event.preventDefault();
            delete_products(number_ID);
            setTimeout(function () {
                menu.remove();
                reload_get_products();
            }, 1000);
        });
        // option favorite
        let menu_fav = document.createElement("span");
        menu_fav.innerHTML = "Favorito";
        menu.appendChild(menu_fav);
        menu_fav.addEventListener("click", function (e) {
            e.preventDefault();
            favorites.push(parentElement);
            console.log(favorites);
        });
        // option tag vendido
        let menu_sell = document.createElement("span");
        menu_sell.innerHTML = "Vendido";
        menu.appendChild(menu_sell);
        menu_sell.addEventListener("click", function (e) {
            e.preventDefault();
            products_sell.push(parentElement);
            console.log(products_sell);
        });
        // option tag en espera
        let menu_waiting = document.createElement("span");
        menu_waiting.innerHTML = "En espera";
        menu.appendChild(menu_waiting);
        menu_waiting.addEventListener("click", function (e) {
            e.preventDefault();
            waiting_sell.push(parentElement);
            console.log(waiting_sell);
        });
        // option tag no vendido
        let menu_unsold = document.createElement("span");
        menu_unsold.innerHTML = "No vendido";
        menu.appendChild(menu_unsold);
        menu_unsold.addEventListener("click", function (e) {
            e.preventDefault();
            products_unsold.push(parentElement);
            console.log(products_unsold);
        });
    }
    else {
        let menu = document.getElementsByClassName("menu_option")[0];
        menu.remove();
    }
}
// function mysql delete (funciona)
function delete_products(number_id) {
    connect.query(`DELETE FROM productos WHERE id = ${number_id}`, function (error, results, fields) {
        if (error) {
            throw error;
        }
        ;
        console.log("numberid", number_id, "result", results);
    });
}
// function UPDATE productos 
function create_update_input(SPAN, PARAGRAPH, string_or_number, ID) {
    const body = document.getElementsByTagName("body")[0];
    let create_window = document.createElement("div");
    body.appendChild(create_window);
    create_window.className = "update_window";
    let span = document.createElement("span");
    let paragraph = document.createElement("p");
    let update_inputs = document.createElement("input");
    let modificar = document.createElement("button");
    let cancelar = document.createElement("button");
    // create window append child
    create_window.appendChild(span);
    create_window.appendChild(paragraph);
    create_window.appendChild(update_inputs);
    create_window.appendChild(modificar);
    create_window.appendChild(cancelar);
    // html-inner
    span.innerHTML = SPAN;
    paragraph.innerHTML = PARAGRAPH;
    modificar.innerHTML = "Modificar";
    cancelar.innerHTML = "Cancelar";
    update_inputs.type = string_or_number;
    // function update
    modificar.addEventListener("click", function (e) {
        e.preventDefault();
        let value = update_inputs.value;
        connect.query(`UPDATE productos SET ${SPAN} = ? WHERE id = ?`, [value, ID], function (error, results, fields) {
            if (error) {
                throw error;
            }
            else {
                console.log(results);
            }
            create_window.remove();
            reload_get_products();
        });
    });
    // funcion cancelar
    cancelar.addEventListener("click", function (e) {
        e.preventDefault();
        create_window.remove();
        reload_get_products();
    });
} // funciona bien y esta terminada
function create_update_input_for_cantidad(SPAN, string_or_number, producto, ID) {
    const body = document.getElementsByTagName("body")[0];
    let create_window = document.createElement("div");
    body.appendChild(create_window);
    create_window.className = "update_window";
    let span = document.createElement("span");
    let paragraph = document.createElement("p");
    let update_inputs = document.createElement("input");
    let modificar = document.createElement("button");
    let cancelar = document.createElement("button");
    // create window append child
    create_window.appendChild(span);
    create_window.appendChild(paragraph);
    create_window.appendChild(update_inputs);
    create_window.appendChild(modificar);
    create_window.appendChild(cancelar);
    // html-inner
    let cantidad = producto.Cantidad;
    span.innerHTML = SPAN;
    paragraph.innerHTML = `Cambiar cantidad = ${cantidad}`;
    modificar.innerHTML = "Modificar";
    cancelar.innerHTML = "Cancelar";
    update_inputs.type = string_or_number;
    // function update
    modificar.addEventListener("click", function (e) {
        e.preventDefault();
        let value = update_inputs.value;
        connect.query(`UPDATE productos SET ${SPAN} = ? WHERE id = ?`, [value, ID], function (error, results, fields) {
            if (error) {
                throw error;
            }
            else {
                console.log(results);
            }
            create_window.remove();
            reload_get_products();
        });
    });
    // funcion cancelar
    cancelar.addEventListener("click", function (e) {
        e.preventDefault();
        create_window.remove();
        reload_get_products();
    });
}
