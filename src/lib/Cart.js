export const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const updateQuantity = (cartItems, itemId, action) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
        const updatedItem = { ...updatedCartItems[itemIndex] };
        let updatedQuantity = updatedItem.quantity;

        if (action === "increase") {
            updatedQuantity++;
        } else if (action === "decrease" && updatedQuantity > 0) {
            updatedQuantity--;
        }

        updatedItem.quantity = updatedQuantity;
        updatedCartItems[itemIndex] = updatedItem;
    }

    return updatedCartItems;
};
