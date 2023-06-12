import React, { useState } from 'react'
import CardC from './Card'
import { Button, Alert, Typography } from '@material-tailwind/react'
import Modal from './Modal'
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Pagination from './Pagination'

const MainContent = ({
    items,
    search,
    updated,
    setUpdated,
    currentPage,
    setCurrentPage,
    postPerPage,
    currentPosts
}) => {
    const [open, setOpen] = useState(false)
    const [alertS, setAlertS] = useState(false)

    return (
        <>
            <div className='fixed z-50 bottom-5 right-5'>
                {/* success alert */}
                <Alert
                    open={alertS}
                    color="green"
                    className="max-w-screen-md"
                    icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
                    onClose={() => setAlertS(false)}
                >
                    <Typography variant="h5" color="white">
                        Barang berhasil dihapus
                    </Typography>
                </Alert>
            </div>
            <Modal
                title="Tambah Barang"
                open={open}
                setOpen={setOpen}
                updated={updated}
                setUpdated={setUpdated}
            />
            <div className='mx-auto max-w-screen-xl px-4 py-3 flex flex-wrap gap-5'>
                <Button
                    onClick={() => setOpen(true)}
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
                    currentPosts.filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : item.name.toLowerCase().includes(search);
                    }).map((item) => (
                        <CardC
                            key={item.id}
                            item={item}
                            updated={updated}
                            setUpdated={setUpdated}
                            setAlertS={setAlertS}
                        />
                    ))
                }
            </div>
            <Pagination
                totalPosts={items.length}
                postPerPage={postPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    )
}

export default MainContent