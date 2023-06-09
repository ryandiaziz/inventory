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
import { detailItem, updateItem } from "../axios/item";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const ModalEdit = (props) => {
    const [uploadImage, setUploadImage] = useState(null)
    const [name, setName] = useState(false)
    const [purchaseP, setPurchaseP] = useState(false)
    const [sellP, setSellP] = useState(false)
    const [stock, setStock] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [alertF, setAlertF] = useState(false)

    setLocale({
        mixed: {
            required: 'Harus diisi!'
        },
    });

    function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        formik.setFieldValue('filename', uploaded);
        setUploadImage(URL.createObjectURL(uploaded));
    }

    const submitHandler = () => {
        updateItem(formik.values.id, formik.values, () => {
            props.setOpen(false)
            props.setUpdated(!props.updated)
        })
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
            image: null,
            filename: null,
        },
        onSubmit: submitHandler,
        validationSchema: yup.object().shape({
            name: yup.string().required(),
            purchasePrice: yup.number().typeError('Masukkan angka').required(),
            sellPrice: yup.number().typeError('Masukkan angka').required(),
            stock: yup.number().typeError('Masukkan angka').required(),
        }),
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    };

    useEffect(() => {
        if (props.edit) {
            detailItem(props.id, (result) => {
                setImageUrl(result.image.url);
                formik.setValues({
                    id: props.id,
                    name: result.name,
                    purchasePrice: +result.purchasePrice,
                    sellPrice: +result.sellPrice,
                    stock: +result.stock,
                    imageName: result.image.name,
                    image: {
                        url: result.image.url,
                        name: result.image.name,
                    },
                });
            })
        }
    }, [props.edit])
    return (
        <>
            <Dialog open={props.open} handler={() => props.setOpen(false)}>
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
                                <img
                                    src={uploadImage || imageUrl}
                                    className="img-thumbnail h-32 w-32 object-cover rounded-full mb-1 m-auto"
                                    alt="Barang"
                                    width="300px"
                                />
                            }
                            <div className="w-full mb-1">
                                <div className="text-[12px] m-auto">
                                    <p className="text-center">Ukuran maksimal gambar 100kb</p>
                                    <p className="text-center">format: jpg, png</p>
                                </div>
                            </div>
                            <div className="w-full flex">
                                <label htmlFor="image" className="m-auto h-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="bg-[#00c9a7] w-20 h-7 fill-white rounded-full cursor-pointer">
                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                    </svg>
                                    <input
                                        onBlur={() => handleFocus('imageUrl')}
                                        onChange={handleUploadChange}
                                        className="hidden"
                                        id="image"
                                        type="file"
                                    />
                                </label>
                            </div>
                            {
                                <div className="w-full flex justify-center">
                                    <span className='text-pink-600 font-light text-sm mt-1'>{formik.errors.imageUrl}</span>
                                </div>
                            }
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => props.setOpen(false)}
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

export default ModalEdit