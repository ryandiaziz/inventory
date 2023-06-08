import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Alert,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { setLocale } from 'yup';
import { createItem, detailItem, updateItem } from "../axios/item";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const Modal = (props) => {
    const [uploadImage, setUploadImage] = useState(null)
    const [name, setName] = useState(false)
    const [purchaseP, setPurchaseP] = useState(false)
    const [sellP, setSellP] = useState(false)
    const [stock, setStock] = useState(false)
    const [item, setItem] = useState({})
    const [alertF, setAlertF] = useState(false)

    setLocale({
        mixed: {
            required: 'Harus diisi!'
        },
    });

    function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        formik.setFieldValue('imageUrl', uploaded);
        setUploadImage(URL.createObjectURL(uploaded));
    }
    const submitHandler = () => {
        if (props.edit) {
            updateItem(formik.values.id, formik.values, () => {
                props.handleOpen()
                props.setUpdated(!props.updated)
            })
        } else {
            createItem(formik.values, (result) => {
                if (result.data) {
                    props.handleOpen()
                    props.setUpdated(!props.updated)
                } else {
                    setAlertF(true)
                    const timeout = setTimeout(() => {
                        setAlertF(false)
                    }, 5000)
                    return () => {
                        clearTimeout(timeout)
                    }
                }
            })
        }
    }

    const handleFocus = (e) => {
        switch (e) {
            case 'name':
                setName(true);
                break;
            case 'purchaseP':
                setPurchaseP(true);
                break;
            case 'sellP':
                setSellP(true);
                break;
            case 'stock':
                setStock(true);
                break;
            default:
                break;
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            purchasePrice: undefined,
            sellPrice: undefined,
            stock: undefined,
            imageUrl: null,
        },
        onSubmit: submitHandler,
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            purchasePrice: yup.number().typeError('Masukkan angka').required(),
            sellPrice: yup.number().typeError('Masukkan angka').required(),
            stock: yup.number().typeError('Masukkan angka').required(),
            imageUrl: yup.string().required(),
        }),
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    };

    useEffect(() => {
        if (!props.open) {
            setUploadImage(null);
            formik.setValues({
                name: '',
                purchasePrice: undefined,
                sellPrice: undefined,
                stock: undefined,
                imageUrl: null,
            })
            setName(false)
            setPurchaseP(false)
            setSellP(false)
            setStock(false)
        }
    }, [props.open])

    useEffect(() => {
        if (props.edit) {
            detailItem(props.id, (result) => {
                setItem(result)
                formik.setValues(result);
            })
        }
    }, [props.edit])
    return (
        <>
            <Dialog open={props.open} handler={props.handleOpen}>
                {/* warning alert */}
                <div className='fixed z-50 bottom-5 right-5'>
                    <Alert
                        variant="gradient"
                        color="red"
                        open={alertF}
                        icon={<ExclamationTriangleIcon className="h-6 w-6" />}
                        action={
                            <Button
                                variant="text"
                                color="white"
                                size="sm"
                                className="!absolute top-3 right-3"
                                onClick={() => setAlertF(false)}
                            >
                                Close
                            </Button>
                        }
                    >
                        Nama sudah digunakan.
                    </Alert>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>{props.title}</DialogHeader>
                    <DialogBody divider className="flex gap-5">
                        <div className="space-y-5 w-1/2">
                            <Input
                                label="Nama"
                                name="name"
                                value={formik.values.name}
                                onChange={handleForm}
                                onBlur={() => handleFocus('name')}
                            />
                            {
                                name &&
                                <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.name}</span>
                            }
                            <Input
                                label="Harga Beli"
                                name="purchasePrice"
                                value={formik.values.purchasePrice}
                                onChange={handleForm}
                                onBlur={() => handleFocus('purchaseP')}
                            />
                            {
                                purchaseP &&
                                <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.purchasePrice}</span>
                            }
                            <Input
                                label="Harga Jual"
                                name="sellPrice"
                                value={formik.values.sellPrice}
                                onChange={handleForm}
                                onBlur={() => handleFocus('sellP')}
                            />
                            {
                                sellP &&
                                <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.sellPrice}</span>
                            }
                            <Input
                                label="Stok"
                                name="stock"
                                value={formik.values.stock}
                                onChange={handleForm}
                                onBlur={() => handleFocus('stock')}
                            />
                            {
                                stock &&
                                <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.stock}</span>
                            }
                        </div>
                        <div className="w-1/2">
                            {
                                uploadImage === null && formik.values.imageUrl === null
                                    ? <div htmlFor='image' className="bg-gray-100 h-32 w-32 rounded-full m-auto flex items-center justify-center mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-14 h-14">
                                            <path fillRule="evenodd" d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    : <img
                                        src={uploadImage || `http://localhost:3000/${item.imageUrl}`}
                                        className="img-thumbnail h-32 w-32 object-cover rounded-full mb-5 m-auto"
                                        alt="Barang"
                                        width="300px"
                                    />
                            }
                            <div className="w-full flex">
                                <label htmlFor="image" className="m-auto h-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="bg-[#00c9a7] w-20 h-7 fill-white rounded-full cursor-pointer">
                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                    </svg>
                                    <input
                                        onChange={handleUploadChange}
                                        className="hidden"
                                        id="image"
                                        type="file"
                                    />
                                </label>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={props.handleOpen}
                            className="mr-1"
                        >
                            <span>Batal</span>
                        </Button>
                        <Button variant="filled" className="bg-[#00c9a7]" type="submit">
                            <span>Konfirmasi</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}

export default Modal