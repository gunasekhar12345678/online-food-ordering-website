// Cart management script - Repaired and robust
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var row = buttonClicked.closest('tr') || buttonClicked.parentElement.parentElement;
    if (row) {
        row.remove();
        updateCartTotal();
    }
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value < 0) {
        input.value = 0;
    }
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] || document.getElementsByClassName('cart-item')[0];
    if (!cartItemContainer) return;
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace(/[₹$,]/g, '')) || 0;
            var quantity = parseInt(quantityElement.value, 10) || 0;
            total += (price * quantity);
        }
    }
    var totalElement = document.getElementById('total') || document.getElementsByClassName('cart-total-price')[0];
    if (totalElement) {
        if (totalElement.tagName === 'INPUT') {
            totalElement.value = Math.round(total * 100) / 100;
        } else {
            totalElement.innerText = '₹ ' + (Math.round(total * 100) / 100);
        }
    }
}