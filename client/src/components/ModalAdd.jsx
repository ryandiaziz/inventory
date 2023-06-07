import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import InputC from "./Input";

const ModalAdd = (props) => {
    return (
        <Dialog open={props.open} handler={props.handleOpen}>
            <DialogHeader>Tambah Barang</DialogHeader>
            <DialogBody divider>
                <InputC />
                <InputC />
                <InputC />
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
                <Button variant="filled" className="bg-[#00c9a7]" onClick={props.handleOpen}>
                    <span>Konfirmasi</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default ModalAdd