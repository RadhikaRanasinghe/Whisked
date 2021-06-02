
//checks to see if document is done loading as js cant run
//without getting the elements inside it
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}




//event listeners for..
//connects buttons while page loads
function ready() {
    //for removing items
    //returns all elements with 'btn-danger' class name
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    //loops through all of the 'btn-danger' buttons in the cart
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        //when button is clicked it removes item
        button.addEventListener('click', removeCartItem)
    }

    //for changing quantity
    //loops through cart-quantity-inputs and gets the value in that instance
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    //for adding items
    //loops through shop-item-button
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    //for purchasing items
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    //MODAL BOX
    // Get the modal
    var modal = document.getElementById("modalBox");

    // Get the button that opens the modal
    var openModal = document.getElementsByClassName("shop-item-button");


    // Get the <span> element that closes the modal
    var closeModal = document.getElementsByClassName("close")[0];


    // When the user clicks the button, open the modal
    var i;
    for(i = 0; i < openModal.length; i++) openModal[i].onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    //Get the button:
    topButton = document.getElementById("btn-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction};

}

//scroll
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //to scroll to the top for the modal
    let element = document.getElementById('modalBox');
    element.scrollIntoView(true);
}

//changes font size
function resizeText(multiplier) {
    if (document.body.style.fontSize == "") {
        document.body.style.fontSize = "20px";
    }
    document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (multiplier * 1) + "px";
}


//removes an item from cart
function removeCartItem(event) {
    //.target targets the button that was clicked on
    var buttonClicked = event.target
    //gets cart-quantity div(.parentElement) and  cart-row div(.parentElement.parentElement)
    //then removes cart-row
    buttonClicked.parentElement.parentElement.remove()
    // total is updated as row is removed
    updateCartTotal()
}



//function to check if input is a number and is a positive number
//sets to 1 if its either
//isNaN - Not a Number
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


//to purchase items
function purchaseClicked() {
    //form variables
    var name = document.forms["orders"]["fname"].value;
    var mail = document.forms["orders"]["email"].value;
    var addr = document.forms["orders"]["address"].value;

        //checks if user has entered details
        if (name == ""||mail==""|| addr=="") {
            alert('Please fill in all your details')

        }else{
            //gives message to customer
        alert('Thank you ' + name + ' for your purchase.')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        //checks if there are items in cart and clears it through a loop till empty
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }}
    updateCartTotal()
}


//function that gets title, price and image about item when shop-item-button is pressed
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    //passes title, price annd img src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}


//adds item to cart
function addItemToCart(title, price, imageSrc) {
    //creates a div
    var cartRow = document.createElement('div')
    //adds the class of cartRow
    cartRow.classList.add('cart-row')
    //gets very first element of cart-items
    var cartItems = document.getElementsByClassName('cart-items')[0]

    //to check if item is already added into cart
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            //exits out of the function and doesnt execute the code below
            //returns back to where function was called
            return
        }
    }

    //uses html code to create cartRowContents
    //$ turns it into a variable to be evaluated
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    //gets content inside
    cartRow.innerHTML = cartRowContents
    //adds VAR cartRow to end of cartItems
    cartItems.append(cartRow)
    //adds the event listeners to new items
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}



function updateCartTotal() {
    //gets elements that have the class name 'cart-items'
    //cart-items wraps all the cart rows(cart-row)
    //selects the very first element innside the array
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    //gets all cart rows INSIDE cart-items ONLY
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        //is equal to the row that is currently on
        var cartRow = cartRows[i]
        //gets very first element of cart-price
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        //gets very first element of cart-quantity
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        //get the price from VAR priceElement
        //parseFloat converts String to 0
        //replaces $ with '' so calculations are possible
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        //gets quantity from  VAR quanntityElement
        var quantity = quantityElement.value
        //Calculates total
        total = total + (price * quantity)
    }
    //rounds total to 2 dp
    total = Math.round(total * 100) / 100
    //gets the very first element of cart-total-price and sets total
    //add $ to total
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


