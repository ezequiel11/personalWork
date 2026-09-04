const cartButtons = document.querySelectorAll('[aria-label="Agregar al carrito"]');
const cart = document.querySelector('nav button');
let itemCount = 0;

cartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        itemCount += 1;
        cart.textContent = `Carrito (${itemCount})`;
    });
});
