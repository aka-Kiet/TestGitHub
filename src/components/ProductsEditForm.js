import { useState } from 'react';
import { useProducts, useProductsDispatch } from '../context/ProductsContext';

export default function ProductsEditForm() {
    const data = useProducts();
    const dispatch = useProductsDispatch();
    const view = data.view;
    const product = view === 'edit' ? data.products.find(p => p.id === data.id) : data.newProduct;
    const [current, setCurrent] = useState(product);

    function onChange(e) {
        const { name, value } = e.target;
        setCurrent({
            ...current,
            [name]: name === 'price' ? Number(value) : value,
        });
    }

    function onSave() {
       if (view === 'create') {
        dispatch({ type: 'store', product: current });
       }
       else if( view === 'edit') {
        dispatch({ type: 'update', product: current});
       }
    }

    function onCancel() {
        dispatch({ type: 'index'});
    }

    return (
        <>
            <h2 className='title title-edit'>{view === 'edit' ? `Cập nhật: ${product.name}` : "Thêm sản phẩm mới"}</h2>
            <div className='content editForm'>
                <div className="mb-3">
                    <label className='form-label'>Tên sản phẩm: </label>
                    <input
                        type="text"
                        name="name"
                        value={current.name}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label'>Giá: </label>
                    <input
                        type="number"
                        name="price"
                        value={current.price}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label'>Mô tả: </label>
                    <textarea
                        name="desc"
                        value={current.desc}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <button className='btn btn-primary' onClick={onSave}>💾 Lưu</button>
                    <button className='btn btn-danger' onClick={onCancel} style={{ marginLeft: '10px' }}>
                        ❌ Hủy
                    </button>
                </div>
            </div>
        </>
    )
}