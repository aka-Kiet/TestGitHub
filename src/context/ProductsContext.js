import { createContext, useContext, useReducer} from 'react';

const ProductsContext = createContext(null);
const ProductsDispatchContext = createContext(null);

const initial = {
    newProduct: { id: 0, name: '', price: 0, desc: ''},
    products: [
        { id: 1, name: "Sản phẩm 1", price: 1000, desc: "Mô tả sản phẩm 1"},
        { id: 2, name: "Sản phẩm 2", price: 2000, desc: "Mô tả sản phẩm 2"},
        { id: 3, name: "Sản phẩm 3", price: 3000, desc: "Mô tả sản phẩm 3"},
        { id: 4, name: "Sản phẩm 4", price: 4000, desc: "Mô tả sản phẩm 4"},
    ],
    view: 'index',
    id: null,
}

function productsReducer(data, { type, id = null, product = null}) {
    switch (type) {
        case 'index': {
            return {
                ...data,
                view: 'index',
                id: null
            };
        }

        case 'show': {
            return {
                ...data,
                view: 'show',
                id:id
            };
        }

        case 'create': {
            return {
                ...data,
                view: 'create',
                id: null
            };
        }

        case 'store': {
            const maxId = Math.max(0, ...data.products.map(p => p.id));
            product.id = maxId + 1;
            return {
                ...data,
                products: [...data.products, product],
                view: 'index',
                id: null,
            }
        }

        case 'edit': {
            return {
                ...data,
                view: 'edit',
                id: id
            }
        }

        case 'update': {
            return {
                ...data,
                products: data.products.map(p => 
                    p.id === product.id ? product : p
                ),
                view: 'index',
                id: null
            }
        }

        case 'destroy': {
            return {
                ...data,
                products: data.products.filter(p => p.id !== id),
                view: 'index',
                id: null
            }
        }

        default: {
            throw Error('Unknown action: ' + type);
        }
    }
}

export function ProductsProvider({ children }) {
    const [data, dispatch] = useReducer(
        productsReducer,
        initial
    );

    return (
        <ProductsContext.Provider value={data}>
            <ProductsDispatchContext.Provider value={dispatch}>
                {children}
            </ProductsDispatchContext.Provider>
        </ProductsContext.Provider>
    )
}

export function useProducts() {
    return useContext(ProductsContext);
}

export function useProductsDispatch() {
    return useContext(ProductsDispatchContext);
}