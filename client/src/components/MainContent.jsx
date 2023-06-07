import React, { useState, useEffect } from 'react'
import { readItem } from '../axios/item'
import CardC from './Card'
import { Button } from '@material-tailwind/react'
import ModalAdd from './ModalAdd'

const MainContent = () => {
    const [items, setItems] = useState([])
    const [open, setOpen] = useState(false)
    const [updated, setUpdated] = useState(false)

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        readItem((result) => {
            setItems(result)
        })
    }, [updated])
    return (
        <>
            <ModalAdd
                open={open}
                handleOpen={handleOpen}
            />
            <div className='mx-auto max-w-screen-xl px-4 py-3 flex flex-wrap gap-5'>
                <Button
                    onClick={handleOpen}
                    className="flex items-center gap-3 bg-[#00c9a7]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    Tambah Barang
                </Button>
            </div>
            <div className='mx-auto max-w-screen-xl px-4 py-3 flex flex-wrap gap-5'>
                {
                    items.map((item) => (
                        <CardC
                            key={item.id}
                            item={item}
                            updated={updated}
                            setUpdated={setUpdated}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default MainContent