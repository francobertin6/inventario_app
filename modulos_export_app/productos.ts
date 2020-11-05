// import electron
const electron = require("electron");
const ipc = electron.ipcRenderer;
// import conexion con la base de datos
let connect = require("D:/Users/Usuario/Documents/GIT hub/inventario_app/database_connection.js")


// interface de los productos
class productos {
    Id: number;
    Nombre:string ;
    Tipo: string;
    Color: string;
    Cantidad: number;
    Medida?: string | number | null;
    Costo?:number | null;
    Proveedor?: string;
    

// constructor
    constructor(
        id:number,
        nombre:string,
        tipo:string,
        color:string,
        cantidad: number,
        medida?:string | number | null,
        costo?:number | null,
        Proveedor?: string,
        
    ){
        this.Id = id;
        this.Nombre = nombre;
        this.Tipo = tipo;
        this.Color = color;
        this.Cantidad = cantidad;
        this.Medida = medida;
        this.Costo = costo;
        this.Proveedor = Proveedor;
        
    }
// constructor

relancion_cantidad_costo(cantidad:number){
    let numberB = cantidad * this.Costo!;
    return numberB / this.Cantidad;
}
}

                // GET function productos

// table elemento
const tabla = document.getElementById("tabla")!

function create_table_row(nuevo_prod:productos, img:HTMLImageElement): void{   
    let tbody = <HTMLTableSectionElement>document.getElementById('table-body')!;
    // rows = cabecilla de tabla, su valor sera el id del producto
    let row = document.createElement("tr");
    row.className = JSON.stringify(nuevo_prod.Id);
    tbody.appendChild(row);
    // row entrara al cuerpo de la tabla

    // nombre producto
    let name = document.createElement("th");
    name.innerHTML = nuevo_prod.Nombre;
    row.appendChild(name);
    // nombre producto

    // tipo producto
    let type = document.createElement("th");
    type.innerHTML = nuevo_prod.Tipo;
    row.appendChild(type);
    // tipo producto

    // color producto
    let color = document.createElement("th");
    color.innerHTML = nuevo_prod.Color;
    row.appendChild(color);
    // color producto

    // cantidad producto
    let cantidad = document.createElement("th");
    cantidad.innerHTML = JSON.stringify(nuevo_prod.Cantidad);
    row.appendChild(cantidad);
    // cantidad producto

    // medida producto
    let medida = document.createElement("th");
    medida.innerHTML = JSON.stringify(nuevo_prod.Medida);
    row.appendChild(medida);
    // medida producto

    // costo total producto
    let costo = document.createElement("th");
    costo.innerHTML = JSON.stringify(nuevo_prod.Costo);
    row.appendChild(costo);
    // costo total producto

    // proveedor producto
    let proveedor = document.createElement("th");
    proveedor.innerHTML = nuevo_prod.Proveedor!;
    row.appendChild(proveedor);
    // proveedor producto

    // options
    let options = document.createElement("th");
    options.className = "option";
    options.onclick = option
    let span = document.createElement("span");
    span.appendChild(img);
    options.appendChild(span);
    row.appendChild(options);
}


function get_productos(){
  connect.query('SELECT * FROM `productos`', async function(error:any, result:any, fields:any){
    if(error){
        throw error
    }else{   
       for (let index = 0; index < result.length; index++) {
           var nuevo_prod = new productos(
                result[index].id,
                result[index].nombre,
                result[index].tipo,
                result[index].color,
                result[index].cantidad,
                result[index].medida,
                result[index].costo_total,
                result[index].proveedor,
           );
           let img = document.createElement("img");
           img.src = "./icons/elipsis.svg";
           create_table_row(nuevo_prod, img);
       }
    } 
});  
}

get_productos();

let reload = document.getElementById("reload_button")!;

reload.addEventListener("click", function(e:Event){
    e.preventDefault();
    // reload function delete and create tbody
    let tbody = <HTMLTableSectionElement> document.getElementById('table-body')!;
    tbody.remove();
    // borro tbody de la tabla y vuelvo a crearlo para que la funcion pueda resetearse
    let body = document.createElement("tbody");
    body.id = 'table-body';
    tabla.appendChild(body);
    setTimeout(function(){
       get_productos(); 
    }, 500);
})

                // POST function /*SE HARA EN LA CARPETA ./AGREGAR_PRODUCTOS/PRODUCTOS_POST*/ 


// abrir agregar_producto.html
let agregar_producto_btn = document.getElementById("agregar_productos_btn")!;

agregar_producto_btn.addEventListener("click", function(event){
    event.preventDefault();
    ipc.send('open_agregar_producto.html');
})



// boton opciones en cada <tr>

// element script

function option(event:any){
    event.preventDefault();

    const body = document.getElementsByTagName("body")[0];
    const script = document.getElementsByTagName("script")[1];

    let positionY = JSON.stringify(event.clientY);
    console.log(`${positionY}px`, event.clientX);
    console.log(body.lastElementChild, script);
    
    if(body.lastElementChild === script){
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

    // option favorite
    let menu_fav = document.createElement("span");
    menu_fav.innerHTML = "Favorito";
    menu.appendChild(menu_fav);

    // option tag vendido
    let menu_sell = document.createElement("span");
    menu_sell.innerHTML = "Vendido";
    menu.appendChild(menu_sell);

    // option tag en espera
    let menu_waiting = document.createElement("span");
    menu_waiting.innerHTML = "En espera";
    menu.appendChild(menu_waiting);

    // option tag no vendido
    let menu_unsold = document.createElement("span");
    menu_unsold.innerHTML = "No vendido";
    menu.appendChild(menu_unsold);
    }else{
        let menu = document.getElementsByClassName("menu_option")[0];
        menu.remove();
    }
}