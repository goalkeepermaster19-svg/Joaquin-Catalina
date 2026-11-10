/* =====================================================
   GLAM - CATALINA & JOAQUÍN
   Sistema de invitación digital
===================================================== */


/* =====================================================
   1. ELEMENTOS PRINCIPALES
===================================================== */

const bienvenida = document.getElementById("bienvenida");
const abrirSorpresa = document.getElementById("abrirSorpresa");
const contenidoPrincipal = document.getElementById("contenidoPrincipal");

const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");

const corazonesFlotantes = document.getElementById("corazonesFlotantes");


/* =====================================================
   2. APERTURA DE LA INVITACIÓN
===================================================== */

if (abrirSorpresa) {

    abrirSorpresa.addEventListener("click", () => {

        // Animación del sobre
        const sobre = document.getElementById("sobre");

        if (sobre) {
            sobre.classList.add("sobre-abierto");
        }

        abrirSorpresa.disabled = true;

        // Ocultar bienvenida
        setTimeout(() => {

            if (bienvenida) {
                bienvenida.style.transition = "opacity 0.8s ease";
                bienvenida.style.opacity = "0";
            }

        }, 400);

        // Mostrar contenido principal
        setTimeout(() => {

            if (bienvenida) {
                bienvenida.classList.add("oculto");
            }

            if (contenidoPrincipal) {
                contenidoPrincipal.classList.remove("oculto");
                contenidoPrincipal.style.animation = "aparecer 1s ease";
            }

            lanzarCorazones(25);

        }, 1100);

    });

}


/* =====================================================
   3. CUENTA REGRESIVA
   10 de noviembre de 2026
   07:25 AM - Hora Bolivia UTC-4
===================================================== */

const fechaAniversario = new Date(
    "2026-11-10T07:25:00-04:00"
).getTime();

const contador = document.getElementById("contador");

const elementoDias = document.getElementById("dias");
const elementoHoras = document.getElementById("horas");
const elementoMinutos = document.getElementById("minutos");
const elementoSegundos = document.getElementById("segundos");

const mensajeAniversario = document.getElementById("mensajeAniversario");


function actualizarContador() {

    const ahora = Date.now();

    const diferencia = fechaAniversario - ahora;

    if (diferencia <= 0) {

        if (contador) {
            contador.classList.add("oculto");
        }

        if (mensajeAniversario) {
            mensajeAniversario.classList.remove("oculto");
        }

        return;
    }

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );

    if (elementoDias) {
        elementoDias.textContent = String(dias).padStart(3, "0");
    }

    if (elementoHoras) {
        elementoHoras.textContent = String(horas).padStart(2, "0");
    }

    if (elementoMinutos) {
        elementoMinutos.textContent = String(minutos).padStart(2, "0");
    }

    if (elementoSegundos) {
        elementoSegundos.textContent = String(segundos).padStart(2, "0");
    }

}


// Iniciar contador
actualizarContador();

const intervaloContador = setInterval(() => {

    actualizarContador();

    if (Date.now() >= fechaAniversario) {
        clearInterval(intervaloContador);
    }

}, 1000);


/* =====================================================
   4. TARJETAS INTERACTIVAS
===================================================== */

const tarjetasAmor = document.querySelectorAll(".tarjeta-amor");

const mensajeTarjeta = document.getElementById("mensajeTarjeta");
const textoTarjeta = document.getElementById("textoTarjeta");
const cerrarTarjeta = document.getElementById("cerrarTarjeta");


tarjetasAmor.forEach((tarjeta) => {

    tarjeta.addEventListener("click", () => {

        const mensaje = tarjeta.dataset.mensaje;

        if (!mensaje || !mensajeTarjeta || !textoTarjeta) {
            return;
        }

        textoTarjeta.textContent = mensaje;

        mensajeTarjeta.classList.remove("oculto");

        lanzarCorazones(5);

        mensajeTarjeta.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


if (cerrarTarjeta) {

    cerrarTarjeta.addEventListener("click", () => {

        if (mensajeTarjeta) {
            mensajeTarjeta.classList.add("oculto");
        }

    });

}


/* =====================================================
   5. REPRODUCTOR MUSICAL
===================================================== */

const discoMusical = document.querySelector(".disco-musical");


if (botonMusica && musica) {

    botonMusica.addEventListener("click", async () => {

        if (musica.paused) {

            try {

                await musica.play();

                botonMusica.innerHTML = "⏸ PAUSAR CANCIÓN";

                if (discoMusical) {
                    discoMusical.classList.add("reproduciendo");
                }

            } catch (error) {

                console.error("Error al reproducir:", error);

                botonMusica.innerHTML = "▶ INTENTAR REPRODUCIR";

                alert(
                    "No se pudo reproducir la canción. Comprueba que el archivo musica/cancion.mp3 exista."
                );

            }

        } else {

            musica.pause();

            botonMusica.innerHTML = "▶ REPRODUCIR CANCIÓN";

            if (discoMusical) {
                discoMusical.classList.remove("reproduciendo");
            }

        }

    });


    musica.addEventListener("ended", () => {

        botonMusica.innerHTML = "▶ REPRODUCIR CANCIÓN";

        if (discoMusical) {
            discoMusical.classList.remove("reproduciendo");
        }

    });

}


/* =====================================================
   6. CORAZONES FLOTANTES
===================================================== */

function lanzarCorazones(cantidad = 8) {

    if (!corazonesFlotantes) return;

    const simbolos = ["♡", "♥", "💕", "💗", "✨"];

    for (let i = 0; i < cantidad; i++) {

        const corazon = document.createElement("span");

        corazon.classList.add("corazon-flotante");

        corazon.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        corazon.style.left = Math.random() * 100 + "%";

        corazon.style.fontSize =
            (14 + Math.random() * 20) + "px";

        corazon.style.animationDuration =
            (3 + Math.random() * 3) + "s";

        corazonesFlotantes.appendChild(corazon);

        setTimeout(() => {
            corazon.remove();
        }, 6500);

    }

}


/* =====================================================
   7. EFECTO EN FOTOGRAFÍA PRINCIPAL
===================================================== */

const fotoPortada = document.querySelector(".portada-foto");

if (fotoPortada) {

    fotoPortada.addEventListener("click", () => {
        lanzarCorazones(7);
    });

}


/* =====================================================
   8. EFECTOS EN FOTOGRAFÍAS
===================================================== */

document.querySelectorAll("img").forEach((imagen) => {

    imagen.addEventListener("dragstart", (evento) => {
        evento.preventDefault();
    });

});


/* =====================================================
   9. INICIALIZACIÓN
===================================================== */

console.log(
    "GLAM | Invitación de Catalina y Joaquín cargada correctamente ❤️"
);
/* ==================================
   APERTURA DE LA CARTA DE CATALINA
================================== */

const botonAbrirCarta = document.getElementById("abrirCarta");
const papelCarta = document.getElementById("papelCarta");

if (botonAbrirCarta && papelCarta) {

    botonAbrirCarta.addEventListener("click", function () {

        papelCarta.classList.remove("carta-oculta");
        papelCarta.classList.add("carta-visible");

        botonAbrirCarta.classList.add("oculto");

        setTimeout(() => {
            papelCarta.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 300);

    });

}
/* ==================================
   VISOR DE FOTOGRAFÍAS
================================== */

const visorFotografia = document.getElementById("visorFotografia");
const fotografiaAmpliada = document.getElementById("fotografiaAmpliada");
const descripcionFotografia = document.getElementById("descripcionFotografia");
const cerrarVisor = document.getElementById("cerrarVisor");

const fotografias = document.querySelectorAll(".foto-ampliable");

fotografias.forEach((fotografia) => {

    fotografia.addEventListener("click", function () {

        fotografiaAmpliada.src = this.src;
        fotografiaAmpliada.alt = this.alt;

        descripcionFotografia.textContent =
            this.parentElement.querySelector("p").textContent;

        visorFotografia.classList.add("visor-activo");

        document.body.style.overflow = "hidden";

    });

});


function cerrarFotografia() {

    visorFotografia.classList.remove("visor-activo");

    document.body.style.overflow = "";

}


cerrarVisor.addEventListener("click", cerrarFotografia);


visorFotografia.addEventListener("click", function (evento) {

    if (evento.target === visorFotografia) {
        cerrarFotografia();
    }

});


document.addEventListener("keydown", function (evento) {

    if (evento.key === "Escape") {
        cerrarFotografia();
    }

});


/* ==================================
   APARICIÓN DE LOS RECUERDOS
================================== */

const seccionRecuerdos = document.querySelector("#recuerdos");

if (seccionRecuerdos && "IntersectionObserver" in window) {

    const observadorRecuerdos = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                seccionRecuerdos.classList.add("recuerdos-visibles");

                observadorRecuerdos.unobserve(seccionRecuerdos);

            }

        });

    }, {
        threshold: 0.15
    });

    observadorRecuerdos.observe(seccionRecuerdos);

} else if (seccionRecuerdos) {

    seccionRecuerdos.classList.add("recuerdos-visibles");

}
/* ==================================
   ANIMACIÓN DE LA HISTORIA
================================== */

const momentosHistoria = document.querySelectorAll(".momento-historia");

if ("IntersectionObserver" in window) {

    const observadorHistoria = new IntersectionObserver((entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("momento-visible");

                observadorHistoria.unobserve(entrada.target);

            }

        });

    }, {
        threshold: 0.2
    });

    momentosHistoria.forEach((momento) => {
        observadorHistoria.observe(momento);
    });

} else {

    momentosHistoria.forEach((momento) => {
        momento.classList.add("momento-visible");
    });

}