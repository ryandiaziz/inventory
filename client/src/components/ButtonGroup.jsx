import { ButtonGroup, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { deleteItem } from "../axios/item";
import ModalEdit from "./ModalEdit";

const ButtonGroupC = (props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)

    const handleEdit = () => setEdit(!edit);
    const refreshData = () => props.setUpdated(!props.updated);
    const handleOpenDialog = () => setOpenDialog(!openDialog);
    const handleDelete = (id, imageName) => {
        console.log(id);
        deleteItem(id, imageName, (result) => {
            if (result.response === 1) {
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
            <ModalEdit
                isEdit={true}
                title="Edit Barang"
                open={open}
                setOpen={setOpen}
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
                imageName={props.imageName}
            />
            <ButtonGroup variant="outlined" color="purple">
                <Button
                    onClick={() => {
                        setOpen(true)
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
