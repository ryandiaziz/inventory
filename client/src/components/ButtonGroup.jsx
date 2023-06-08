import { ButtonGroup, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { deleteItem } from "../axios/item";
import Modal from "./Modal";

const ButtonGroupC = (props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)

    const handleOpen = () => setOpen(!open);
    const handleEdit = () => setEdit(!edit);
    const refreshData = () => props.setUpdated(!props.updated);
    const handleOpenDialog = () => setOpenDialog(!openDialog);
    const handleDelete = (id) => {
        deleteItem(id, (result) => {
            if (result === 1) {
                refreshData()
                props.setAlertS(true)
                const timeout = setTimeout(() => {
                    props.setAlertS(false)
                }, 1500)
                return () => {
                    clearTimeout(timeout)
                }
            }
        })
    }
    return (
        <>
            <Modal
                title="Edit Barang"
                open={open}
                handleOpen={handleOpen}
                updated={props.updated}
                setUpdated={props.setUpdated}
                edit={edit}
                id={props.id}
            />
            <ConfirmDialog
                open={openDialog}
                handleOpen={handleOpenDialog}
                handleDelete={handleDelete}
                id={props.id}
            />
            <ButtonGroup variant="outlined" color="purple">
                <Button
                    onClick={() => {
                        handleOpen()
                        handleEdit()
                    }}
                    className="text-[#4d8076]"
                >Edit</Button>
                <Button
                    onClick={handleOpenDialog}
                    className="text-[#ff8066]"
                >Hapus</Button>
            </ButtonGroup>
        </>
    )
}

export default ButtonGroupC
