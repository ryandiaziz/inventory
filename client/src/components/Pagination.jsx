import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ totalPosts, postPerPage, setCurrentPage, currentPage }) => {
    const [active, setActive] = React.useState(1);
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i);
    }

    const getItemProps = (index) =>
    ({
        variant: active === index ? "filled" : "text",
        color: active === index ? "blue" : "blue-gray",
        onClick: () => {
            setActive(index)
            setCurrentPage(index)
        },
    });

    const next = () => {
        if (active === pages.length) return;
        setCurrentPage(currentPage + 1)
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setCurrentPage(currentPage - 1)
        setActive(active - 1);
    };

    return (
        <div className="w-full flex items-center my-5">
            <div className="flex items-center gap-4 m-auto">
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                    {
                        pages.map((page, i) => (
                            <IconButton key={i} {...getItemProps(page)}>{page}</IconButton>
                        ))
                    }
                </div>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2"
                    onClick={next}
                    disabled={active === pages.length}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default Pagination;