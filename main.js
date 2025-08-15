function $(id) {
    return document.getElementById(id);
}

//constructoras
function Personaje(nombre, vidaBase, dañoFisico, dañoMagico) {
    this.nombre = nombre
    this.vidaBase = vidaBase
    this.dañoFisico = dañoFisico
    this.dañoMagico = dañoMagico
}
function Mounstro(n, r, d, v) {
    this.nombre = n
    this.resistencia = r
    this.daño = d
    this.vida = v
}
let personajes = [];
let mounstros = [];

fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        personajes = data.personajes.map(p => new Personaje(p.nombre, p.vidaBase, p.dañoFisico, p.dañoMagico))
        mounstros = data.mounstros.map(m => new Mounstro(m.nombre, m.resistencia, m.daño, m.vida))
        //p es de personaje y m de mounstro para asignar imagenes
        personajes.forEach((p, i) => p.imagen = data.personajes[i].imagen)
        mounstros.forEach((m, i) => m.imagen = data.mounstros[i].imagen)

        // Inicializar default
        personajeActual = personajes[0]
        mounstroActual = mounstros[0]
        updateImgPJ()
        updateImgMounstro()
    })
    .catch(error =>( Swal.fire({
            title: "Error de carga!",
            text: `no se pudo cargar la data: ${error}`,
            icon: "error"
        })));
//numero aleatorio para daños
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
let personajeActual = personajes[0]
let mounstroActual = mounstros[0]
//funciones de pelea
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function pelea1() {
    let vidaPersonaje = personajeActual.vidaBase
    let vidaMounstro = mounstroActual.vida
    let round = 1
    const display = document.querySelector(".display")
    const resultado = document.querySelector(".resultado")

    display.innerHTML = `<h3>¡${personajeActual.nombre} vs ${mounstroActual.nombre}!</h3>`;

    while (vidaPersonaje > 0 && vidaMounstro > 0) {
        display.innerHTML += `<p> --------------------------------------------------------</p> `
        display.innerHTML += `<p>Round ${round}:</p>`

        let dañoMounstro = numeroAleatorio(1, mounstroActual.daño)
        let dañoPersonaje = 0

        if (personajeActual.dañoFisico > 1) {
            dañoPersonaje += numeroAleatorio(5, personajeActual.dañoFisico)
            if (mounstroActual.resistencia === "fisico") {
                dañoPersonaje *= 0.75
            }
        }
        if (personajeActual.dañoMagico > 1) {
            dañoPersonaje += numeroAleatorio(5, personajeActual.dañoMagico)
            if (mounstroActual.resistencia === "magico") {
                dañoPersonaje *= 0.75
            }
        }
        vidaMounstro -= dañoPersonaje
        imgPersonaje.classList.add("ataque")
        setTimeout(() => {
            imgPersonaje.classList.remove("ataque")
        }, 500) // efecto de ataque

        display.innerHTML += `<p>${personajeActual.nombre} inflige ${dañoPersonaje} de daño al ${mounstroActual.nombre}. </p>`
        if (vidaMounstro > 0) {
            vidaPersonaje -= dañoMounstro
            imgMounstro.classList.add("ataque")
            setTimeout(() => {
                imgMounstro.classList.remove("ataque")
            }, 500) // efecto de ataque
            display.innerHTML += `<p> el ${mounstroActual.nombre} golpeo, tu vida disminuye a ${vidaPersonaje} </p>`
        }
        document.querySelector(".barra-vida .vida").style.width = (vidaPersonaje / personajeActual.vidaBase * 100) + "%";
        document.querySelector(".barra-vida-mounstro .vida-mounstro").style.width = (vidaMounstro / mounstroActual.vida * 100) + "%";

        round += 1
        display.innerHTML += `<p> --------------------------------------------------------</p> `
        await delay(1000) // para dar un efecto de espera entre rondas
    }
    if (vidaPersonaje <= 0 && vidaMounstro <= 0) {

        Swal.fire({
            title: "Han empatado?!",
            text: `ambos han caído en batalla`,
            icon: "info"
        })
    } else if (vidaPersonaje <= 0) {

        Swal.fire({
            title: "Has Perdido!",
            text: `El ${personajeActual.nombre} ha sido derrotado`,
            icon: "error"
        })
        resultado.innerHTML = `<p>¡${mounstroActual.nombre} ha ganado! ${personajeActual.nombre} ha sido derrotado.</p>`;
    } else {
        Swal.fire({
            title: "Has Ganado!",
            text: `El ${mounstroActual.nombre} ha sido derrotado`,
            icon: "success"
        })
        resultado.innerHTML = `<p>¡${personajeActual.nombre} ha ganado! ${mounstroActual.nombre} ha sido derrotado.</p>`;
    }
}
let botonInicio = document.getElementById("start")
botonInicio.onclick = pelea1
//logica del select dicen que si funciona no lo toques
let selectPersonaje = document.getElementById("selectPersonaje")
let selectMounstro = document.getElementById("selectMonster")
selectMounstro.addEventListener("change", function () {
    mounstroActual = mounstros[this.value]
    updateImgMounstro()
})

selectPersonaje.addEventListener("change", function () {
    personajeActual = personajes[this.value]
    updateImgPJ()
})

//local stograge
let botonSave = document.getElementById('botonSave')
let botonReset = document.getElementById('botonReset')
botonSave.onclick = saveName
botonReset.onclick = resetName
const savedName = localStorage.getItem('userName')
if (savedName) {
    document.getElementById('bienvenido').textContent = `¡Bienvenido a la aventura, ${savedName}!`
}
function saveName() {
    const nameInput = document.getElementById('nameInput').value.trim()
    if (nameInput) {
        localStorage.setItem('userName', nameInput);
        document.getElementById('bienvenido').textContent = `¡Bienvenido a la aventura, ${nameInput}!`
        document.getElementById('nameInput').value = '' // Limpiar el input
    } else {
        document.getElementById('bienvenido').textContent = 'Por favor, ingresa un nombre válido.'
    }
}
function resetName() {
    localStorage.removeItem('userName')
    document.getElementById('bienvenido').textContent = ''
    document.getElementById('nameInput').value = '' // Limpiar el input
}
//update de imagenes

function updateImgPJ() {
    if (personajeActual == personajes[0]) {
        imgPersonaje.src = "./media/ragnar.PNG"
    } else if (personajeActual == personajes[1]) {
        imgPersonaje.src = "./media/calradio.PNG"
    } else {
        imgPersonaje.src = "./media/legolas.png"
    }
}
function updateImgMounstro() {
    if (mounstroActual == mounstros[0]) {
        imgMounstro.src = "./media/golem.PNG"
    } else if (mounstroActual == mounstros[1]) {
        imgMounstro.src = "./media/orgo.png"
    } else {
        imgMounstro.src = "./media/esqueleto.png"
    }
}
