import { useProducts } from '../context/ProductsContext';
import ProductsList from '../components/ProductsList';
import ProductsEditForm from '../components/ProductsEditForm';

export default function ProductsManagement() {
    const data = useProducts();
    return (
        <>
            <h1 className='title title-management'>📦Quản lý sản phẩm📦</h1>
            {
                (() => {
                    switch(data.view) {
                        case 'index':
                            return <ProductsList/>;
                        
                        case 'create':
                            return <ProductsEditForm/>;

                        case 'edit':
                            return <ProductsEditForm/>;
                        
                        default:
                            return <h2>Error: Unknown view</h2>;
                    }
                })()
            }
        </>
    )
}