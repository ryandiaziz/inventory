import {
    Navbar,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";

const NavbarC = () => {
    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 ml-2 cursor-pointer py-1.5"
                >
                    Inventory
                </Typography>
                <div className="relative flex w-full gap-2 md:w-max">
                    <Input
                        type="search"
                        label="Ketik disini..."
                        className="pr-20"
                        containerProps={{
                            className: "min-w-[288px]",
                        }}
                    />
                    <Button size="sm" className="!absolute right-1 top-1 rounded bg-[#845ec2]">
                        Cari
                    </Button>
                </div>
            </div>
        </Navbar>
    );
}

export default NavbarC