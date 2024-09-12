
let pesoAtual = 0;
const pesos = [
  { img: "peso1.png", cat: "Normal", color: "#27c8a4", bg: "#27c8a4" },
  { img: "peso2.png", cat: "Sobrepeso", color: "#ffd900", bg: "#ffd900" },
  { img: "peso3.png", cat: "Obeso", color: "#fea14a", bg: "#fea14a" },
  { img: "peso4.png", cat: "Obesidade Grave", color: "#ff454d", bg: "#ff454d" },
  { img: "peso5.png", cat: "Abaixo Do Peso", color: "#72b8d9", bg: "#72b8d9" },
];

function mostrarCategoria() {
  const display = document.getElementById('peso');
  const categoria = document.getElementById("categoria");
  const bgColor = document.getElementById("peso-container");
  const buttonRight = document.getElementById("button-right");
  const buttonLeft = document.getElementById("button-left");

  display.classList.add(pesoAtual === 0 ? 'hidden-right' : 'hidden');


  setTimeout(() => {
    display.innerHTML = `<img src="src/img/${pesos[pesoAtual].img}" alt="${pesos[pesoAtual].cat}">`;
    categoria.textContent = pesos[pesoAtual].cat;
    categoria.style.color = pesos[pesoAtual].color;
    bgColor.style.backgroundColor = pesos[pesoAtual].bg;
    buttonRight.style.backgroundColor = pesos[pesoAtual].bg;
    buttonLeft.style.backgroundColor = pesos[pesoAtual].bg;

    
    // button.forEach(button => {
    //   button.addEventListener('click', () => {
    //         button.style.backgroundColor = pesos[pesoAtual].bg;
    //   });
    // });



    display.classList.remove('hidden', 'hidden-right');
  }, 500); // Match the transition duration in the CSS
}



function proximoPeso() {
  pesoAtual = (pesoAtual + 1) % pesos.length;
  mostrarCategoria();
}

function pesoAnterior() {
  pesoAtual = (pesoAtual - 1 + pesos.length) % pesos.length;
  mostrarCategoria();
}