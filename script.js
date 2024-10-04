const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput  = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];
// ABRIR O MODAL DO CARRINHO
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
})

// FECHAR O MODAL QUANDO CLICAR FORA

cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// BOTAO DE FECHAR MODAL CART
closeModalBtn.addEventListener("click", function(){
    alert('Carrinho Fechado com sucesso')
    cartModal.style.display = "none"
})

// ADCIONAR FUNÇÃO ADD

menu.addEventListener("click", function(event){
 let parentButton = event.target.closest(".add-to-cart-btn")

 if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))

    addToCart(name, price)
}
})


// FUNÇÃO PARA ADD NO CARRINHO

function addToCart(name, price){

    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        // SE O ITEM EXISTE AUMENTA +1
        existingItem.quantity += 1;
        return;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        
    })
}

updateCartModal()

}

//ATULIZA O CART

function updateCartModal(){
  cartItemsContainer.innerHTML = "";
  let total = 0;


   cart.forEach(item => {
    const cartItemElement = document.createElement("div");
   cartItemElement.classList.add("flex", "justify-between", "flex-col", "mb-4")


    cartItemElement.innerHTML = `
    <div class=flex", "justify-between", "flex-col",>

    <div>
     <p class="font-bold">${item.name}</p>
     <p>Qtd: ${item.quantity}</p>
     
     <p>Preço: R$ ${item.price.toFixed(2)}</p>
    </div>
    
   <div class="mb-4">
   <button class="remover-btn" data-name="${item.name}">
      Remover
   </button>
   </div>

    </div>
    `

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement)

})

cartTotal.textContent = total.toLocaleString("pt-BR",{
    style:"currency",
    currency: "BRL"
});

cartCounter.innerHTML = cart.length;

}

// FUNÇÃO PARA ATUALIZAR O CARRINHO
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "flex-col", "mb-4");

        cartItemElement.innerHTML = `
            <div class="flex justify-between flex-col">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p>Preço: R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="mb-4">
                    <button class="remover-btn" data-name="${item.name}">
                        Remover
                    </button>
                </div>
            </div>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

// FUNÇÃO REMOVER
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remover-btn")){ // Corrigido aqui
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartModal(); // Atualiza o carrinho após a remoção
    }
}
