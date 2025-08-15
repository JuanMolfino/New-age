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

//personajes y daños
const ragnar = new Personaje("Ragnar", 100, 35, 0)
const calradio = new Personaje("Calradio", 90, 0, 30)
const legolas = new Personaje("Legolas", 80, 30, 0)
const golem = new Mounstro("Golem de piedra", "fisico", 20, 120)
const ogro = new Mounstro("Ogro", "fisico", 25, 120);
const esqueleto = new Mounstro("Esqueleto", "magico", 15, 100);
const personajes = [ragnar, calradio, legolas]
const mounstros = [golem, ogro, esqueleto]

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
let imgPersonaje = $("imgPersonaje")
let imgMounstro = $("imgMounstro")