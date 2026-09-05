// Calculate total order amount
const calculateOrderTotal = (products, items) => {

    let total = 0;

    for (const item of items) {

        const product = products.find(
            (p) => p.id === item.product_id
        );

        total += Number(product.price) * item.quantity;
    }

    return total;
};

export default calculateOrderTotal;