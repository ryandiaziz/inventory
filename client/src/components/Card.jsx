import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    CardFooter
} from "@material-tailwind/react";
import ButtonGroupC from "./ButtonGroup";
import { FormatRupiah } from "@arismun/format-rupiah";

const CardC = (props) => {
    return (
        <Card className="w-64">
            <CardHeader shadow={false} floated={false} >
                <img
                    src={`http://localhost:3000/${props.item.imageUrl}`}
                    className="w-full object-cover h-40"
                    alt='Barang'
                />
            </CardHeader>
            <CardBody>
                <div className="flex justify-center mb-2">
                    <Typography color="blue-gray" className="font-medium">
                        {props.item.name}
                    </Typography>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        Harga Beli
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        <FormatRupiah value={props.item.purchasePrice} />
                    </Typography>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        Harga Jual
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        <FormatRupiah value={props.item.sellPrice} />
                    </Typography>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        Stock
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        {props.item.stock}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="pt-0 m-auto">
                <ButtonGroupC
                    id={props.item.id}
                    updated={props.updated}
                    setUpdated={props.setUpdated}
                    setAlertS={props.setAlertS}
                />
            </CardFooter>
        </Card>
    );
}

export default CardC