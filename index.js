
// ============================================
// FONDO GENERATIVO — IVÁN CASTILLO
// ============================================

const contenedor = document.getElementById(
  "canvas-container"
);

if (contenedor) {

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  contenedor.appendChild(canvas);

  const colores = [
    "#d2d2d0",
    "#565045",
    "#3c3634"
  ];

  const cantidadMaxima = 180;
  const cantidadMinima = 45;

  const cuadrados = [];

  function aleatorio(min, max) {
    return Math.random() * (max - min) + min;
  }

  function ajustarCanvas() {

    const escala = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvas.width = Math.round(
      window.innerWidth * escala
    );

    canvas.height = Math.round(
      window.innerHeight * escala
    );

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(
      escala, 0,
      0, escala,
      0, 0
    );

  }

  function crearCuadrados() {

    cuadrados.length = 0;

    for (let i = 0; i < cantidadMaxima; i++) {

      cuadrados.push({

        x: aleatorio(0, window.innerWidth),
        y: aleatorio(0, window.innerHeight),

        tamaño: aleatorio(30, 80),

        color: colores[
          Math.floor(Math.random() * colores.length)
        ],

        eje: Math.random() < 0.5 ? "x" : "y",

        velocidad: aleatorio(0.5, 2),

        angulo: aleatorio(0, Math.PI * 2),

        velocidadRotacion: aleatorio(-0.025, 0.025),

        opacidad: 1

      });

    }

  }

  function obtenerProgreso() {

    const alturaTotal =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (alturaTotal <= 0) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(
        1,
        window.scrollY / alturaTotal
      )
    );

  }

  function animar() {

    const ancho = window.innerWidth;
    const alto = window.innerHeight;

    ctx.clearRect(0, 0, ancho, alto);

    const progreso = obtenerProgreso();

    const cantidadVisible = Math.floor(
      cantidadMaxima -
      (cantidadMaxima - cantidadMinima) * progreso
    );

    cuadrados.forEach((cuadrado, indice) => {

      const opacidadObjetivo =
        indice < cantidadVisible ? 1 : 0;

      cuadrado.opacidad +=
        (opacidadObjetivo - cuadrado.opacidad) * 0.04;

      // Dibujar cuadrado

      ctx.save();

      ctx.translate(
        cuadrado.x,
        cuadrado.y
      );

      ctx.rotate(cuadrado.angulo);

      ctx.globalAlpha = cuadrado.opacidad;

      ctx.fillStyle = cuadrado.color;

      ctx.fillRect(
        -cuadrado.tamaño / 2,
        -cuadrado.tamaño / 2,
        cuadrado.tamaño,
        cuadrado.tamaño
      );

      ctx.restore();

      // Desplazamiento

      if (cuadrado.eje === "x") {

        cuadrado.x += cuadrado.velocidad;

        if (cuadrado.x > ancho + cuadrado.tamaño) {
          cuadrado.x = -cuadrado.tamaño;
        }

      } else {

        cuadrado.y += cuadrado.velocidad;

        if (cuadrado.y > alto + cuadrado.tamaño) {
          cuadrado.y = -cuadrado.tamaño;
        }

      }

      // Rotación

      cuadrado.angulo +=
        cuadrado.velocidadRotacion;

    });

    requestAnimationFrame(animar);

  }

  ajustarCanvas();
  crearCuadrados();
  animar();

  window.addEventListener(
    "resize",
    ajustarCanvas
  );

}
