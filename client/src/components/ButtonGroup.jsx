import { ButtonGroup, Button } from "@material-tailwind/react";
import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { deleteItem } from "../axios/item";

const ButtonGroupC = (props) => {
    const [openDialog, setOpenDialog] = useState(false)

    const refreshData = () => props.setUpdated(!props.updated);
    const handleOpenDialog = () => setOpenDialog(!openDialog);
    const handleDelete = (id) => {
        deleteItem(id, (result) => {
            if (result === 1) {
                refreshData()
                props.setAlert(true)
                const timeout = setTimeout(() => {
                    props.setAlert(false)
                }, 1500)
                return () => {
                    clearTimeout(timeout)
                }
            }
        })
    }
    return (
        <>
            <ConfirmDialog
                open={openDialog}
                handleOpen={handleOpenDialog}
                handleDelete={handleDelete}
                id={props.id}
            />
            <ButtonGroup variant="outlined" color="purple">
                <Button
                    onClick={() => { }}
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
