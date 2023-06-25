// Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const buscador = document.querySelector("#buscador");

// Contenedor para los resultados
const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca: "",
    year: "",
    minimo: "",
    maximo: "",
    puertas: "",
    transmision: "",
    color: "",
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos); // Muestra Autos al cargas

    // Llena las opciones de años
    llenarSelect();
});

// Eventlistener para los select de busqueda
marca.addEventListener("change", (e) => {
    datosBusqueda.marca = e.target.value;
    filtarAuto();
});

year.addEventListener("change", (e) => {
    datosBusqueda.year = parseInt(e.target.value);
    filtarAuto();
});

minimo.addEventListener("change", (e) => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtarAuto();
});

maximo.addEventListener("change", (e) => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtarAuto();
});

puertas.addEventListener("change", (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtarAuto();
});

transmision.addEventListener("change", (e) => {
    datosBusqueda.transmision = e.target.value;
    filtarAuto();
});

color.addEventListener("change", (e) => {
    datosBusqueda.color = e.target.value;
    filtarAuto();
});

// Funciones
function mostrarAutos(autos) {
    limpiarHTML(); // Elimina el HTML previo

    autos.forEach((auto) => {
        const { marca, modelo, year, puertas, transmision, precio, color } =
            auto;
        const autoHTML = document.createElement("P");
        autoHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}`;

        // Insertar en el HTML
        resultado.appendChild(autoHTML);
    });
}

// Limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del Select
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement("OPTION");
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega opciones de año al select
    }
}

// Filtara en base a la busqueda
function filtarAuto() {
    const resultado = autos
        .filter(filtarMarca)
        .filter(filtrarYear)
        .filter(filtrarMinimo)
        .filter(filtrarMaximo)
        .filter(filtrarPuertas)
        .filter(filtrarTransmision)
        .filter(filtrarColor);

    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement("DIV");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent = "No hay resultados, Intenta con otros términos de búsqueda";

    resultado.appendChild(noResultado);
}

function filtarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}