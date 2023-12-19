const storeInLS = (product) => {
    let xperiaProducts = localStorage.getItem('xperiaProducts');
    let arr = [];
    if (!xperiaProducts) {
        arr = [{ ...product, count: 1 }];
        localStorage.setItem('xperiaProducts', JSON.stringify(arr));
    }

    else {
        xperiaProducts = JSON.parse(xperiaProducts);
        // check existing in local storage
        var productExist = xperiaProducts.find(obj => obj.id === product.id);
        if (productExist) {
            productExist.count = productExist.count + 1;
            arr = xperiaProducts;
        }
        else
            arr = [...xperiaProducts, { ...product, count: 1 }];
        // storing in ls
        localStorage.setItem('xperiaProducts', JSON.stringify(arr));
    }
}

export default storeInLS;