//constructoras
function Personaje(nombre,vidaBase,dañoFisico,dañoMagico) {
    this.nombre= nombre
    this.vidaBase=vidaBase
    this.dañoFisico=dañoFisico
    this.dañoMagico=dañoMagico
}
function Mounstro(n,r,d,v) {
    this.nombre= n
    this.resistencia=r
    this.daño=d
    this.vida= v
}

//personajes y daños
const ragnar = new Personaje("Ragnar",100,35,0)
const calradio = new Personaje("Calderio",90,0,30)
const legolas = new Personaje("Legolas",80,30,0)
const golem = new Mounstro("Golem de piedra", "fisico",20,120 )
const ogro = new Mounstro("Ogro", "fisico", 25, 120);
const esqueleto = new Mounstro("Esqueleto", "magico", 15, 100);
const personajes = [ragnar, calradio, legolas]
const mounstros = [golem, ogro, esqueleto] 
//seleccion de personaje
 
//numero aleatorio para daños
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
let personajeActual = personajes[0]
let mounstroActual = mounstros[0]
//funciones de pelea
function pelea1(){
let vidaPersonaje= personajeActual.vidaBase
let vidaMounstro = mounstroActual.vida
let round = 1
const display = document.querySelector(".display")
const resultado = document.querySelector(".resultado")

display.innerHTML = `<h3>¡${personajeActual.nombre} vs ${mounstroActual.nombre}!</h3>`;

    while (vidaPersonaje > 0 && vidaMounstro > 0){
        display.innerHTML += `<p> --------------------------------------------------------</p> `
        display.innerHTML += `<p>Round ${round}:</p>`

        let dañoMounstro = numeroAleatorio(1 , mounstroActual.daño)
        let dañoPersonaje = 0
        
         if (personajeActual.dañoFisico > 1 ){
            dañoPersonaje += numeroAleatorio (5,personajeActual.dañoFisico) 
             if (mounstroActual.resistencia === "fisico") {
            dañoPersonaje *= 0.75
            }
        }
         if (personajeActual.dañoMagico > 1 ){
            dañoPersonaje += numeroAleatorio (5,personajeActual.dañoMagico) 
             if (mounstroActual.resistencia === "magico") {
            dañoPersonaje *= 0.75
            }
        }


    vidaMounstro -= dañoPersonaje
    display.innerHTML += `<p>${personajeActual.nombre} inflige ${dañoPersonaje} de daño al ${mounstroActual.nombre}. </p>`
        if (vidaMounstro > 0){
            vidaPersonaje -= dañoMounstro;
               display.innerHTML += `<p> el ${mounstroActual.nombre} golpeo, tu vida disminuye a ${vidaPersonaje} </p>`
        }
        round += 1
    display.innerHTML += `<p> --------------------------------------------------------</p> `
    }
if (vidaPersonaje <= 0 && vidaMounstro <= 0) {
    resultado.innerHTML =`<p> ¡Empate! Ambos han caído en combate.</p>`;
} else if (vidaPersonaje <= 0) {
   resultado.innerHTML =`<p>¡${mounstroActual.nombre} ha ganado! ${personajeActual.nombre} ha sido derrotado.</p>`;
} else {
    resultado.innerHTML = `<p> ¡${personajeActual.nombre} ha ganado! El ${mounstroActual.nombre} ha sido derrotado.</p>`;
}
}
let botonInicio=document.getElementById("start")
botonInicio.onclick= pelea1
//logica del select dicen que si funciona no lo toques
let selectPersonaje = document.getElementById("selectPersonaje")
let selectMounstro = document.getElementById("selectMonster")
selectMounstro.addEventListener("change",function(){
   mounstroActual = mounstros[this.value]
})

selectPersonaje.addEventListener("change",function(){
    personajeActual = personajes[this.value]
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
