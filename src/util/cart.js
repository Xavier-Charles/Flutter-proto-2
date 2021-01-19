import { Provider, Consumer } from './context'


export const addProduct = (product) => {
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push(product)
    localStorage.setItem('products', JSON.stringify(products));

}

export const deleteProduct = (product) => {
    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(prod => prod.productId !== product.productId );
    localStorage.setItem('products', JSON.stringify(products));
}
