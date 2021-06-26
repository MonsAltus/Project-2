
// PUT increase quantity in ProductCart
const incrementHandler = async (event) => {
    event.preventDefault();
    // Get product id though html attribute.
    const productId = event.target.getAttribute('product-id');

    try{
        if (productId) {
            const response = await fetch('/api/carts/add/'+productId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace(`/cart/`);
            }
        }
    } catch (err) {
        console.log(err)
    }
};

// PUT decrease quantity in ProductCart
const decrementHandler = async (event) => {
    event.preventDefault();
    // Get product id though html attribute.
    const productId = event.target.getAttribute('product-id');

    try{
        if (productId) {
            const response = await fetch('/api/carts/remove/'+productId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });

            // Should redirect to homepage after completion?
            // if (response.ok) {
            //     document.location.replace(`/homepage/`);
            // }

        }
    } catch (err) {
        console.log(err)
    }
};

// Delete ProductCart after Checkout
const deleteCartHandler = async (event) => {
    event.preventDefault();
    // Get product id though html attribute.
    const productId = event.target.getAttribute('product-id');

    try{
        if (productId) {
            const response = await fetch('/api/carts/remove/'+productId, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace(`/cart/`);
            }
        }
    } catch (err) {
        console.log(err)
    }
};

document
    .querySelector('#increment')
    .addEventListener('click', incrementHandler);

document
    .querySelector('#decrement')
    .addEventListener('click', decrementHandler);

document
    .querySelector('#checkout')
    .addEventListener('click', deleteCartHandler);
