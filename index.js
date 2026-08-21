// ---------------------------------------------
// ARTE GENERATIVO
// Los cuadrados aparecen y desaparecen
// suavemente según el scroll.
// ---------------------------------------------

let squares = [];
let colors;

const cantidadMaxima = 180;
const cantidadMinima = 45;

function setup() {

  let canvas = createCanvas(
    window.innerWidth,
    window.innerHeight
  );

  canvas.parent("canvas-container");

  noStroke();

  colors = [
    "#d2d2d0",
    "#565045",
    "#3c3634"
  ];

  for (let i = 0; i < cantidadMaxima; i++) {

    let axis = random() < 0.5 ? "x" : "y";

    squares.push({

      x: random(width),
      y: random(height),

      size: random(30, 80),

      axis: axis,

      speed: random(0.5, 2),

      angle: random(TWO_PI),

      rotSpeed: random(-0.05, 0.05),

      baseColor: color(random(colors)),

      // Todos comienzan completamente visibles
      opacity: 255

    });

  }

}


function draw() {

  clear();


  // ---------------------------------------------
  // CALCULAR POSICIÓN DEL SCROLL
  // ---------------------------------------------

  let alturaScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;

  let progreso = 0;

  if (alturaScroll > 0) {

    progreso = constrain(
      window.scrollY / alturaScroll,
      0,
      1
    );

  }


  // Cantidad ideal de cuadrados
  // según cuánto hemos bajado

  let cantidadObjetivo = floor(

    lerp(
      cantidadMaxima,
      cantidadMinima,
      progreso
    )

  );


  // ---------------------------------------------
  // DIBUJAR TODOS LOS CUADRADOS
  // ---------------------------------------------

  for (let i = 0; i < squares.length; i++) {

    let s = squares[i];


    // Los primeros cuadrados permanecen visibles.
    // Los demás comienzan a desaparecer.

    let opacidadObjetivo;

    if (i < cantidadObjetivo) {

      opacidadObjetivo = 255;

    }

    else {

      opacidadObjetivo = 0;

    }


    // Esta es la parte importante:
    // en vez de cambiar instantáneamente,
    // la opacidad se acerca lentamente
    // al valor deseado.

    s.opacity = lerp(
      s.opacity,
      opacidadObjetivo,
      0.04
    );


    // ---------------------------------------------
    // DIBUJAR
    // ---------------------------------------------

    push();

    translate(
      s.x,
      s.y
    );

    rotate(
      s.angle
    );


    let c = s.baseColor;

    fill(
      red(c),
      green(c),
      blue(c),
      s.opacity
    );


    rectMode(CENTER);

    rect(
      0,
      0,
      s.size,
      s.size
    );

    pop();


    // ---------------------------------------------
    // MOVIMIENTO
    // ---------------------------------------------

    if (s.axis === "x") {

      s.x += s.speed;

      if (s.x > width + s.size) {

        s.x = -s.size;

      }

    }

    else {

      s.y += s.speed;

      if (s.y > height + s.size) {

        s.y = -s.size;

      }

    }


    s.angle += s.rotSpeed;

  }

}


// ---------------------------------------------
// AJUSTAR CANVAS AL CAMBIAR TAMAÑO
// ---------------------------------------------

function windowResized() {

  resizeCanvas(
    window.innerWidth,
    window.innerHeight
  );

}