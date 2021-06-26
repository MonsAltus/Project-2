// Create
// Add to quantity
// reduce quantity
// delete ProductCart

incrementHandler()


const decrementHandler = async (event) => {
    event.preventDefault();

    // GET PRODUCT ID THROUGH HTML DATA TAG
    const productId = event.target.getAttribute('product-id');

    try{
        if (review) {
            const response = await fetch('/api/reviews/', {
                method: 'POST',
                body: JSON.stringify({ review, productId }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace(`/product/${productId}`);
            } else {
                alert('Failed to post review');
            }
        }
    } catch (err) {
        console.log(err)
    }
};

// Delete
const deleteCartHandler = async

document
    .querySelector('#increment')
    .addEventListener('click', incrementHandler);

document
    .querySelector('#decrement')
    .addEventListener('click', decrementHandler);

document
    .querySelector('#checkout')
    .addEventListener('click', deleteCartHandler);

    document
    .querySelector('#addCart')
    .addEventListener('click', addCartHandler);
