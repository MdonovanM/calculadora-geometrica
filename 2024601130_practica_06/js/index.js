function init() {
    // Cambio de pestañas 
    const tabs = document.querySelectorAll("nav button");
    const sections = document.querySelectorAll("section");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(b => b.classList.remove("activo"));
            sections.forEach(s => s.classList.remove("activo"));
            tab.classList.add("activo");
            document.getElementById(tab.id.replace("btn", "").toLowerCase()).classList.add("activo");
        });
    });

    // Para seleccion
    document.getElementById("figuraArea").addEventListener("change", mostrarInputsArea);
    document.getElementById("figuraPerimetro").addEventListener("change", mostrarInputsPerimetro);
    document.getElementById("cuerpoVolumen").addEventListener("change", mostrarInputsVolumen);

    // Para calcular
    document.getElementById("btnCalcularArea").addEventListener("click", calcularArea);
    document.getElementById("btnCalcularPerimetro").addEventListener("click", calcularPerimetro);
    document.getElementById("btnCalcularVolumen").addEventListener("click", calcularVolumen);
}

// AREAS
function mostrarInputsArea() {
    let figura = this.value;
    let div = document.getElementById("inputsArea");
    div.innerHTML = "";
    if (figura === "cuadrado") {
        div.innerHTML = '<input id="ladoA" type="number" placeholder="Lado">';
    } else if (figura === "triangulo") {
        div.innerHTML = '<input id="baseT" type="number" placeholder="Base"><input id="alturaT" type="number" placeholder="Altura">';
    } else if (figura === "circulo") {
        div.innerHTML = '<input id="radioC" type="number" placeholder="Radio">';
    }
}

function calcularArea() {
    ocultarMensajes("Area");
    try {
        let figura = document.getElementById("figuraArea").value;
        let area = 0;
        if (figura === "cuadrado") {
            let lado = obtenerValor("ladoA");
            area = lado * lado;
        } else if (figura === "triangulo") {
            let base = obtenerValor("baseT");
            let altura = obtenerValor("alturaT");
            area = (base * altura) / 2;
        } else if (figura === "circulo") {
            let radio = obtenerValor("radioC");
            area = Math.PI * radio * radio;
        } else {
            throw new Error();
        }
        mostrarResultado("Area", area.toFixed(2));
    } catch {
        mostrarError("Area");
    }
}

// pERIMETROS
function mostrarInputsPerimetro() {
    let figura = this.value;
    let div = document.getElementById("inputsPerimetro");
    div.innerHTML = "";
    if (figura === "cuadrado") {
        div.innerHTML = '<input id="ladoP" type="number" placeholder="Lado">';
    } else if (figura === "triangulo") {
        div.innerHTML = `
        <input id="lado1" type="number" placeholder="Lado 1">
        <input id="lado2" type="number" placeholder="Lado 2">
        <input id="lado3" type="number" placeholder="Lado 3">`;
    } else if (figura === "circulo") {
        div.innerHTML = '<input id="radioP" type="number" placeholder="Radio">';
    }
}

function calcularPerimetro() {
    ocultarMensajes("Perimetro");
    try {
        let figura = document.getElementById("figuraPerimetro").value;
        let perimetro = 0;
        if (figura === "cuadrado") {
            perimetro = obtenerValor("ladoP") * 4;
        } else if (figura === "triangulo") {
            perimetro = obtenerValor("lado1") + obtenerValor("lado2") + obtenerValor("lado3");
        } else if (figura === "circulo") {
            perimetro = 2 * Math.PI * obtenerValor("radioP");
        } else {
            throw new Error();
        }
        mostrarResultado("Perimetro", perimetro.toFixed(2));
    } catch {
        mostrarError("Perimetro");
    }
}

// VOLUMEN
function mostrarInputsVolumen() {
    let cuerpo = this.value;
    let div = document.getElementById("inputsVolumen");
    div.innerHTML = "";
    if (cuerpo === "cubo") {
        div.innerHTML = '<input id="ladoV" type="number" placeholder="Lado">';
    } else if (cuerpo === "prisma") {
        div.innerHTML = `
        <input id="largo" type="number" placeholder="Largo">
        <input id="ancho" type="number" placeholder="Ancho">
        <input id="alto" type="number" placeholder="Alto">`;
    } else if (cuerpo === "esfera") {
        div.innerHTML = '<input id="radioE" type="number" placeholder="Radio">';
    }
}

function calcularVolumen() {
    ocultarMensajes("Volumen");
    try {
        let cuerpo = document.getElementById("cuerpoVolumen").value;
        let volumen = 0;
        if (cuerpo === "cubo") {
            let lado = obtenerValor("ladoV");
            volumen = lado ** 3;
        } else if (cuerpo === "prisma") {
            let largo = obtenerValor("largo");
            let ancho = obtenerValor("ancho");
            let alto = obtenerValor("alto");
            volumen = largo * ancho * alto;
        } else if (cuerpo === "esfera") {
            let radio = obtenerValor("radioE");
            volumen = (4 / 3) * Math.PI * Math.pow(radio, 3);
        } else {
            throw new Error();
        }
        mostrarResultado("Volumen", volumen.toFixed(2));
    } catch {
        mostrarError("Volumen");
    }
}

// VALIDACIONES
function obtenerValor(id) {
    let campo = document.getElementById(id);
    let valor = parseFloat(campo.value);
    if (isNaN(valor) || valor <= 0) {
        campo.classList.add("campo-requerido");
        throw new Error();
    } else {
        campo.classList.remove("campo-requerido");
        return valor;
    }
}

function ocultarMensajes(tipo) {
    document.getElementById("success" + tipo).classList.add("hide");
    document.getElementById("error" + tipo).classList.add("hide");
}

function mostrarResultado(tipo, resultado) {
    document.getElementById("resultado" + tipo).innerText = resultado;
    document.getElementById("success" + tipo).classList.remove("hide");
}

function mostrarError(tipo) {
    document.getElementById("error" + tipo).classList.remove("hide");
}
