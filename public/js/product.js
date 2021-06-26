
// Adds new review.
const newReviewHandler = async (event) => {
    event.preventDefault();

    // Queries new review data from form.
    const review = document.querySelector('#newReview-text').value.trim();
    // get's current product id from product page.
    // add `product-id="{{id}}" type="submit"` in tags for review submit button in the product.handlebars view.
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
                return;
            }
        }
    } catch (err) {
        console.log(err)
    }
};

// POST Create ProductCart Object. Add product to cart.
const createCartHandler = async (event) => {
    event.preventDefault();
    // Get product id though html attribute.
    const productId = event.target.getAttribute('product-id');

    try{
        if (productId) {
            const response = await fetch('/api/carts/add/'+productId, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (response.ok) {
                document.location.replace(`/product/${productId}`);
            }
        }
    } catch (err) {
        console.log(err)
    }
};


document
    .querySelector('.addReview-form')
    .addEventListener('click', newReviewHandler);

    document
    .querySelector('#addCart')
    .addEventListener('click', createCartHandler);