import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind'; //hung

import { classNames as classNamesPrime } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import './index.css';
import './DataTableDemo.css';
import MyBtn from '@/components/Button';
import { TrashIcon } from '@/components/Icons';
import { ProductService } from './ProductService';
import styles from './ManagerAccount.module.scss'; //hung
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const DataTableCrudDemo = () => {
    let emptyProduct = {
        id: null,
        //name: '',
        username: '',
        // image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK',
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
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

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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

    const importCSV = (e) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            const importedData = data.map((d) => {
                d = d.split(',');
                const processedData = cols.reduce((obj, c, i) => {
                    c = c === 'Status' ? 'inventoryStatus' : c === 'Reviews' ? 'rating' : c.toLowerCase();
                    obj[c] = d[i].replace(/['"]+/g, '');
                    (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
                    return obj;
                }, {});

                processedData['id'] = createId();
                return processedData;
            });

            const _products = [...products, ...importedData];

            setProducts(_products);
        };

        reader.readAsText(file, 'UTF-8');
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };

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

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} /> */}
                {/* <Button
                    label="Delete"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={confirmDeleteSelected}
                    disabled={!selectedProducts || !selectedProducts.length}
                /> */}
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload
                    mode="basic"
                    name="demo[]"
                    auto
                    url="https://primefaces.org/primereact/showcase/upload.php"
                    accept=".csv"
                    chooseLabel="Import"
                    className="mr-2 inline-block"
                    onUpload={importCSV}
                /> */}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        style={{ minWidth: '18rem' }}
                        left="30px"
                        onInput={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search..."
                    />
                </span>
                <Button
                    label="Create"
                    style={{ color: '#4962E9', background: '#BFE6F4' }}
                    icon="pi pi-plus"
                    className={cx('create-btn')}
                    onClick={openNew}
                />
                {/* <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} /> */}
            </React.Fragment>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <img
                src={`images/product/${rowData.image}`}
                onError={(e) =>
                    (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                }
                alt={rowData.image}
                className="product-image"
            />
        );
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>
                {rowData.inventoryStatus}
            </span>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* thu vien */}
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => editProduct(rowData)}
                />
                {/* <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={() => confirmDeleteProduct(rowData)}
                /> */}
                <MyBtn
                    leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faTrash} />}
                    onClick={() => confirmDeleteProduct(rowData)}
                ></MyBtn>
            </React.Fragment>
        );
    };

    const header = (
        <div className="table-header">
            {/* <h5 className="mx-0 my-1">Manage Products</h5> */}
            {/* <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span> */}
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button className={cx('btn-cancel')} 
            label="Cancel" 
            icon="pi pi-times" 
            style={{color:'#153AFF',background: '#ffffff',}}
             onClick={hideDialog} />
            <Button className={cx('btn-yes')} label="Save" icon="pi pi-check" 
            style={{color:'#ffffff',background: '#153AFF'}}
            onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button  
            className={cx('btn-cancel')} 
            label="Cancel" 
            style={{color:'#153AFF',background: '#ffffff',}}
            icon="pi pi-times"  
            onClick={hideDeleteProductDialog} />
            <Button 
            className={cx('btn-yes')} 
            label="Yes"
            icon="pi pi-check" 
            style={{color:'#ffffff',background: '#153AFF'}}
            onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    color= "#3652E6"
                
                    style={{ background: "#3652E6"}}
                    
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter}
                    //header={header}
                    responsiveLayout="scroll"
                >
                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column> */}
                    <Column field="id" header="ID" sortable style={{ minWidth: '12rem', color: '#153AFF' }}></Column>
                    <Column
                        field="username"
                        header="Username"
                        sortable
                        style={{ minWidth: '16rem', color: '#153AFF' }}
                    ></Column>
                    {/* <Column field="image" header="Image" body={imageBodyTemplate}></Column> */}
                    {/* <Column
                        field="price"
                        header="Price"
                        body={priceBodyTemplate}
                        sortable
                        style={{ minWidth: '8rem' }}
                    ></Column> */}
                    <Column
                        field="password"
                        header="Password"
                        sortable
                        style={{ minWidth: '10rem', color: '#153AFF' }}
                    ></Column>
                    <Column
                        field="role"
                        header="Role"
                        sortable
                        style={{ minWidth: '10rem', color: '#153AFF' }}
                    ></Column>
                    {/* <Column
                        field="rating"
                        header="Reviews"
                        body={ratingBodyTemplate}
                        sortable
                        style={{ minWidth: '12rem' }}
                    ></Column>
                    <Column
                        field="inventoryStatus"
                        header="Status"
                        body={statusBodyTemplate}
                        sortable
                        style={{ minWidth: '12rem' }}
                    ></Column> */}
                    <Column
                        header="Action"
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{ minWidth: '8rem', color: '#153AFF' }}
                    ></Column>
                </DataTable>
            </div>

            <Dialog 
                visible={productDialog}
                style={{ width: '450px', color: '#0D5BF1'}}
                //header="Product Details"
                header="Create account"
                modal
                className="p-fluid"
                footer={productDialogFooter}
                onHide={hideDialog}
            >
                {/* {product.image && (
                    <img
                        src={`images/product/${product.image}`}
                        onError={(e) =>
                            (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                        }
                        alt={product.image}
                        className="product-image block m-auto pb-3"
                    />
                )} */}
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price"style={{color:'#0D5BF1', fontSize: "13px"}}><b>Id</b></label>
                        <InputNumber
                           // id="price"
                            value={product.price}
                            onValueChange={(e) => onInputNumberChange(e, 'price')}
                            // mode="currency"
                            // currency="USD"
                            // locale="en-US"
                        />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity"style={{color:'#0D5BF1', fontSize: "13px"}}><b>Username</b></label>
                        <InputNumber
                            id="quantity"
                            value={product.quantity}
                            onValueChange={(e) => onInputNumberChange(e, 'quantity')}
                            integeronly
                        />
                    </div>
                </div >
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price"style={{color:'#0D5BF1', fontSize: "13px"}}><b>Password</b></label>
                        <InputNumber
                            //id="price"
                            value={product.price}
                            onValueChange={(e) => onInputNumberChange(e, 'price')}
                            //mode="currency"
                            //currency="USD"
                           // locale="en-US"
                        />
                    </div>
                </div>
                {/* <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText
                        id="name"
                        value={product.name}
                        onChange={(e) => onInputChange(e, 'name')}
                        required
                        autoFocus
                        className={classNamesPrime({ 'p-invalid': submitted && !product.name })}
                    />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div> */}
                {/* <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                        id="description"
                        value={product.description}
                        onChange={(e) => onInputChange(e, 'description')}
                        required
                        rows={3}
                        cols={20}
                    />
                </div> */}
                <div className="field">
                    <label className="mb-3"style={{color:'#0D5BF1', fontSize: "13px"}}><b>Role</b></label>
                    {/* classNăe="feild cold" */}
                    <div className={cx('grid-container')}>
                        <div class={cx('grid-item')}>
                            <RadioButton
                                inputId="category1"S
                                name="category"
                                value="Manager"
                                onChange={onCategoryChange}
                                checked={product.category === 'Manager'}
                            />
                            <label htmlFor="category1" style={{color:'#0D5BF1'}}>Manager</label>
                            
                        </div>
                        <div class={cx('grid-item')}>
                            <RadioButton
                                inputId="category2"
                                name="category"
                                value="Staff"
                                onChange={onCategoryChange}
                                checked={product.category === 'Staff'}
                            />
                            <label htmlFor="category2"style={{color:'#0D5BF1'}}>Staff</label>
                        </div>
                        <div class={cx('grid-item')}>
                            <RadioButton
                                inputId="category3"
                                name="category"
                                value="Specialist doctor"
                                onChange={onCategoryChange}
                                checked={product.category === 'Specialist doctor'}
                            />
                            <label htmlFor="category3"style={{color:'#0D5BF1'}}>Specialist doctor</label>
                        </div>
                        <div class={cx('grid-item')}>
                            <RadioButton
                                inputId="category4"
                                name="category"
                                value="General doctor"
                                onChange={onCategoryChange}
                                checked={product.category === 'General doctor'}
                            />
                            <label htmlFor="category4"style={{color:'#0D5BF1'}}>General doctor</label>
                        </div>
                       {/* className="field-radiobutton col-6" */}
                        <div class={cx('grid-item')}>
                            <RadioButton
                                inputId="category5"
                                name="category"
                                value="Pharmacist"
                                onChange={onCategoryChange}
                                checked={product.category === 'Pharmacist'}
                            />
                            <label htmlFor="category5"style={{color:'#0D5BF1'}}>Pharmacist</label>
                        </div>
                    </div>
                </div>

                
            </Dialog>

            <Dialog
                visible={deleteProductDialog}
               style={{ width: '450px', color: '#153AFF' }}
                header="Confirm"
                modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}
            >
                <div >
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: '#153AFF' }} />
                    {product && (
                        <span /*style="font-size:10px"*/>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteProductsDialog}
                style={{ width: '450px' }}
                header="Confirm"
                modal
                // footer={deleteProductsDialogFooter}
                onHide={hideDeleteProductsDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
};

function ManagerAccount() {
    return (
        <div>
            <h2 className={cx('title-vhung', 'hung')}>ManagerAccount Page</h2>
            <DataTableCrudDemo />
        </div>
    );
}

export default ManagerAccount;
