import { useProducts, useProductsDispatch } from '../context/ProductsContext';

export default function ProductsList() {
    const data = useProducts();
    const dispatch = useProductsDispatch();

    function onEdit(product) {
        dispatch({ type: 'edit', id: product.id});
    }

    function onDelete(product) {
        dispatch({ type: 'destroy', id: product.id});
    }

    function onCreate() {
        dispatch({ type: 'create' });
    }

    return (
        <>
            <h2 className='title title-list'>Danh sách sản phẩm</h2>
            <div className='content'>
                <button className='btn btn-success' onClick={onCreate}>
                    ➕ Thêm sản phẩm
                </button>
                {
                    data.products.length === 0 ? <p className='title_not'>Không có sản phẩm</p>:
                    <table className='table'>
                        <thead className="table-secondary">
                            <tr>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.desc}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning edit'
                                            onClick={() => onEdit(product)}
                                        >
                                            ✏ Sửa
                                        </button>
                                        <button
                                            className='btn btn-danger delete'
                                            onClick={() => onDelete(product)}
                                        >
                                            🗑 Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}