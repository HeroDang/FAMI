import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import { classNames as primeClassnames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import styles from './Dialogs.module.scss';

const cx = classNames.bind(styles);

function DetailDialog({ propProductDialog, propSubmitted, propProduct, propProducts, propToast }) {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK',
    };

    const [productDialog, setProductDialog] = useState(propProductDialog);
    const [submitted, setSubmitted] = useState(propSubmitted);
    const [product, setProduct] = useState(propProduct);
    const [products, setProducts] = useState(propProducts);
    const toast = useRef(propToast);

    console.log('productDialog', productDialog, 'propProductDialog', propProductDialog);
    useEffect(() => {
        setProductDialog(propProductDialog);
        setSubmitted(propSubmitted);
        setProduct(propSubmitted);
        setProducts(propProducts);
    }, [propProductDialog, propSubmitted, propProducts, propToast]);

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000,
                });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000,
                });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    return (
        <Dialog
            visible={productDialog}
            style={{ width: '80%' }}
            header="Product Details"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
        >
            <div className={cx('dialog')}>
                {product.image && (
                    <img
                        src={`images/product/${product.image}`}
                        onError={(e) =>
                            (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                        }
                        alt={product.image}
                        className="product-image block m-auto pb-3"
                    />
                )}
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText
                        id="name"
                        value={product.name}
                        onChange={(e) => onInputChange(e, 'name')}
                        required
                        autoFocus
                        className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                    />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                        id="description"
                        value={product.description}
                        onChange={(e) => onInputChange(e, 'description')}
                        required
                        rows={3}
                        cols={20}
                    />
                </div>

                <div className="field">
                    <label className="mb-3">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="category1"
                                name="category"
                                value="Accessories"
                                onChange={onCategoryChange}
                                checked={product.category === 'Accessories'}
                            />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="category2"
                                name="category"
                                value="Clothing"
                                onChange={onCategoryChange}
                                checked={product.category === 'Clothing'}
                            />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="category3"
                                name="category"
                                value="Electronics"
                                onChange={onCategoryChange}
                                checked={product.category === 'Electronics'}
                            />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="category4"
                                name="category"
                                value="Fitness"
                                onChange={onCategoryChange}
                                checked={product.category === 'Fitness'}
                            />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Price</label>
                        <InputNumber
                            id="price"
                            value={product.price}
                            onValueChange={(e) => onInputNumberChange(e, 'price')}
                            mode="currency"
                            currency="USD"
                            locale="en-US"
                        />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quantity</label>
                        <InputNumber
                            id="quantity"
                            value={product.quantity}
                            onValueChange={(e) => onInputNumberChange(e, 'quantity')}
                            integeronly="true"
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default DetailDialog;
