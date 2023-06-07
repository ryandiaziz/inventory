import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";

const ConfirmDialog = (props) => {
    return (
        <Dialog open={props.open} handler={props.handleOpen}>
            <DialogHeader>Yakin ingin menghapus barang?</DialogHeader>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={props.handleOpen}
                    className="mr-1"
                >
                    <span>Batal</span>
                </Button>
                <Button variant="filled" className='bg-[#00c9a7]' onClick={() => props.handleDelete(props.id)}>
                    <span>Konfirmasi</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default ConfirmDialog