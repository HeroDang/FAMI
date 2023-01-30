import classNames from 'classnames/bind';
import React, { useState, useEffect, useRef } from 'react';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { classNames as primeClassnames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import '@/pages/ManagerAccount/index.css';
import '@/pages/ManagerAccount/DataTableDemo.css';
import MyBtn from '@/components/Button';
import { SearchIcon, TrashSmallIcon } from '@/components/Icons';
import { ProductService } from './ProductService';
import * as meformService from '@/services/meformService';
import styles from './MedicalChecklist.module.scss';

const cx = classNames.bind(styles);

function MedicalChecklist() {
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

    let emptyMEForm = {
        formId: 0,
        numOrder: 0,
        personId: 0,
        patientId: 0,
        reason: 'Benh',
        _patient: {
            id: 0,
            name: '',
            address: '',
            phone: '',
            career: '',
            age: 0,
        },
        _person: {
            name: '',
        }

    };

    const [products, setProducts] = useState(null);

    const [meforms, setMeforms] = useState(null);
    const [meform, setMeform] = useState(emptyMEForm);
    const [changeData, setChangeData] = useState(false);
    const [counterMEForm, setCounterMEForm] = useState(0);

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
        productService.getProducts().then((data) => {
            setProducts(data);
        });
        meformService.getMEFormList().then((data) => {
            let newMEForms = data.map((item) => {
                let newItem = { ...item };
                newItem.formId = item.formId.toLocaleString();
                newItem.patientId = item.patientId.toLocaleString();
                newItem.date = new Date(item.date).toLocaleDateString('us-US');
                return newItem;
            });
            setMeforms(newMEForms);
        });
        meformService.getCounterMEForm().then((data) => {
            setCounterMEForm(data.seq);
        })
    }, [changeData]); // eslint-disable-line react-hooks/exhaustive-deps

    const openNew = () => {
        setMeform(emptyMEForm);

        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const saveMEForm = () => {
        setSubmitted(true);

        let _meforms = [...meforms];
        let _meform = { ...meform };
        if (meform._id) {
            meformService.updateMEForm(_meform, _meform._id).then((data) => {
                console.log('data', data);

                toast.current.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Form Created',
                    life: 3000,
                });

                setProductDialog(false);
                setMeform(emptyMEForm);
                setChangeData(!changeData);
            });
        } else {
            console.log(_meform);
            // meformService.createMEForm(_meform).then((data) => {
            //     console.log('data', data);

            //     toast.current.show({
            //         severity: 'success',
            //         summary: 'Successful',
            //         detail: 'Product Created',
            //         life: 3000,
            //     });

            //     setProductDialog(false);
            //     setMeform(emptyMEForm);
            //     setChangeData(!changeData);
            //     // setProduct(emptyProduct);
            // });
        }
        // setProducts(_products);
    };

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveMEForm} />
        </React.Fragment>
    );

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

    const onInputChange = (e, name, type = "form") => {
        const val = (e.target && e.target.value) || '';
        let _meform = { ...meform };

        switch(type){
        case "form" :{
            console.log(val);
            _meform[`${name}`] = val;
            break;}
            case "patient":
                _meform._patient[`${name}`] = val;
                break;
            case "person":
                _meform._person[`${name}`] = val;
                break;
            default: break;
        }

        setMeform(_meform);
    };


    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
        setChangeData(!changeData);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const deleteProduct = () => {
        // let _products = products.filter((val) => val.id !== product.id);
        // setProducts(_products);

        let _meform = { ...meform };
        meformService.deleteMEForm(_meform._id).then((data) => {
            console.log('data', data);
            setChangeData(!changeData);
            setDeleteProductDialog(false);
            // setProduct(emptyProduct);
            setMeform(emptyMEForm);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Form Deleted', life: 3000 });
        });
    };

    const deleteSelectedProducts = () => {
        // let _products = products.filter((val) => !selectedProducts.includes(val));
        // setProducts(_products);
        let _selectedProducts = [ ...selectedProducts ];
        let formIds = [];

        _selectedProducts.forEach((item) => {
            formIds.push(item._id);
        })

        meformService.deleteSelectedMEForm(formIds)
            .then((data) => {
                console.log(data);
                setChangeData(!changeData);
                setDeleteProductsDialog(false);
                setSelectedProducts(null);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            })
    };

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const DataTableCrudDemo = () => {
        const formatCurrency = (value) => {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        };

        const editProduct = (meform) => {
            setMeform({ ...meform });
            // setProduct({ ...product });
            setProductDialog(true);
        };

        const confirmDeleteProduct = (e, meform) => {
            setMeform(meform);
            // setProduct(product);
            setDeleteProductDialog(true);
            e.stopPropagation();
        };

        const priceBodyTemplate = (rowData) => {
            return formatCurrency(rowData.price);
        };

        const actionBodyTemplate = (rowData) => {
            return (
                <div className={cx('actionBtns')}>
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
                    <button className={cx('btn-delete')} onClick={(e) => confirmDeleteProduct(e, rowData)}>
                        <span className={cx('icon')}>
                            <TrashSmallIcon />
                        </span>
                    </button>
                </div>
            );
        };

        return (
            <div className="">
                <div className="card">
                    {/* Datatable */}
                    <DataTable
                        ref={dt}
                        value={meforms}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} forms"
                        globalFilter={globalFilter}
                        responsiveLayout="scroll"
                    >
                        <Column
                            headerClassName={cx('column-thead')}
                            bodyClassName={cx('column')}
                            selectionMode="multiple"
                            headerStyle={{ width: '3rem' }}
                            exportable={false}
                        ></Column>
                        <Column
                            headerClassName={cx('column-thead')}
                            bodyClassName={cx('column')}
                            field="formId"
                            header="ID"
                            sortable
                            style={{ minWidth: '12rem' }}
                        ></Column>
                        <Column
                            headerClassName={cx('column-thead')}
                            bodyClassName={cx('column')}
                            field="patientId"
                            header="ID Patient"
                            sortable
                            style={{ minWidth: '16rem' }}
                        ></Column>
                        <Column
                            headerClassName={cx('column-thead')}
                            bodyClassName={cx('column')}
                            field="patientName"
                            header="Patient's Name"
                            // body={priceBodyTemplate}
                            sortable
                            style={{ minWidth: '8rem' }}
                        ></Column>
                        <Column
                            headerClassName={cx('column-thead')}
                            bodyClassName={cx('column')}
                            field="patientPhone"
                            header="Phone"
                            // body={priceBodyTemplate}
                            sortable
                            style={{ minWidth: '8rem' }}
                        ></Column>
                        <Column
                            headerClassName={cx('column-thead')}
                            bodyClassName={cx('column')}
                            field="date"
                            header="Date"
                            sortable
                            style={{ minWidth: '10rem' }}
                        ></Column>
                        <Column
                            headerClassName={cx('column-thead')}
                            bodyClassName={cx('column')}
                            body={actionBodyTemplate}
                            exportable={false}
                            style={{ minWidth: '8rem' }}
                        ></Column>
                    </DataTable>
                </div>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <Toast ref={toast} />
            <h2 className={cx('header-title')}>Medical Checklist</h2>
            <div className={cx('body')}>
                <div className={cx('toolbar')}>
                    <div className={cx('search')}>
                        <span className={cx('search-icon')}>
                            <SearchIcon />
                        </span>
                        <InputText
                            className={cx('search-input')}
                            type="search"
                            onInput={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                        />
                    </div>
                    <div className={cx('btn-group')}>
                        <MyBtn
                            className={cx('btn-add')}
                            primary
                            large
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={openNew}
                        >
                            New
                        </MyBtn>
                        <MyBtn
                            className={cx('btn-add')}
                            primary
                            large
                            leftIcon={<TrashSmallIcon width="1.6rem" height="1.6rem" />}
                            onClick={confirmDeleteSelected}
                            disable={!selectedProducts || !selectedProducts.length}
                        >
                            Delete
                        </MyBtn>
                    </div>
                </div>
                <DataTableCrudDemo />
            </div>

            {/* Product Details */}
            <Dialog
                visible={productDialog}
                style={{ width: '80%' }}
                header="Form Detail"
                headerClassName={cx('detail-dialog-header')}
                modal
                className="p-fluid"
                footer={productDialogFooter}
                onHide={hideDialog}
            >
                <div className={cx('dialog')}>
                    <div>
                        <h1>Information of patient</h1>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="patientId" className={cx('label-input')}>
                                    Id Patient
                                </label>
                                <InputText
                                    id="patientId"
                                    value={meform.patientId}
                                    required
                                    disabled
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {submitted && !meform.patientId && <small className="p-error">Name is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="patientName">Full Name</label>
                                <InputText
                                    id="patientName"
                                    value={meform._patient.name}
                                    onChange={(e) => onInputChange(e, 'name', "patient")}
                                    required
                                    autoFocus
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {/* {submitted && !meform.numOrder && <small className="p-error">Name is required.</small>} */}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="patientAddress">Address</label>
                                <InputText
                                    id="patientAddress"
                                    value={meform._patient.address}
                                    onChange={(e) => onInputChange(e, 'address', "patient")}
                                    required
                                    autoFocus
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {/* {submitted && !meform.numOrder && <small className="p-error">Name is required.</small>} */}
                            </div>
                            <div className="field col">
                                <label htmlFor="patientPhone">Phone number</label>
                                <InputText
                                    id="patientPhone"
                                    value={meform._patient.phone}
                                    onChange={(e) => onInputChange(e, 'phone', "patient")}
                                    required
                                    autoFocus
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {/* {submitted && !meform.numOrder && <small className="p-error">Name is required.</small>} */}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="patientJob">Job</label>
                                <InputText
                                    id="patientJob"
                                    value={meform._patient.career}
                                    onChange={(e) => onInputChange(e, 'career', "patient")}
                                    required
                                    autoFocus
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {/* {submitted && !meform.numOrder && <small className="p-error">Name is required.</small>} */}
                            </div>
                            <div className="field col">
                                <label htmlFor="patientAge">Age</label>
                                <InputText
                                    id="patientAge"
                                    value={meform._patient.age}
                                    onChange={(e) => onInputChange(e, 'age', "patient")}
                                    required
                                    autoFocus
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {/* {submitted && !meform.numOrder && <small className="p-error">Name is required.</small>} */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1>Information of patient</h1>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="formId" className={cx('label-input')}>
                                    Id General Form
                                </label>
                                <InputText
                                    id="formId"
                                    value={meform.formId === 0 ? (counterMEForm+1) : meform.formId}
                                    required
                                    disabled
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {submitted && !meform.formId && <small className="p-error">Name is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="numOrder">Ordinal numbers</label>
                                <InputText
                                    id="numOrder"
                                    value={meform.numOrder}
                                    onChange={(e) => onInputChange(e, 'numOrder')}
                                    required
                                    autoFocus
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {submitted && !meform.numOrder && <small className="p-error">Name is required.</small>}
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="personName" className={cx('label-input')}>
                                    Full name of Doctor
                                </label>
                                <InputText
                                    id="personName"
                                    value={meform._person.name}
                                    onChange={(e) => onInputChange(e, 'name', "person")}
                                    required
                                    autoFocus
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {submitted && !meform.personId && <small className="p-error">Name is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="date">Date</label>
                                <InputText
                                    id="date"
                                    value={meform.date}
                                    onChange={(e) => onInputChange(e, 'date')}
                                    required
                                    autoFocus
                                    // className={primeClassnames({ 'p-invalid': submitted && !product.name })}
                                    className={cx({ 'p-invalid': submitted && !product.name }, 'hung')}
                                />
                                {submitted && !meform.patientId && <small className="p-error">Name is required.</small>}
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="reason">Reasons to see a doctor</label>
                        <InputTextarea
                            id="reason"
                            value={meform.reason}
                            onChange={(e) => onInputChange(e, 'reason')}
                            required
                            rows={3}
                            cols={20}
                        />
                    </div>

                    {/* <div className="field">
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
                    </div> */}
                </div>
            </Dialog>
            {/* delete */}
            <Dialog
                visible={deleteProductDialog}
                style={{ width: '450px' }}
                header="Confirm"
                modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            {/* delete the selected products */}
            <Dialog
                visible={deleteProductsDialog}
                style={{ width: '450px' }}
                header="Confirm"
                modal
                footer={deleteProductsDialogFooter}
                onHide={hideDeleteProductsDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default MedicalChecklist;
