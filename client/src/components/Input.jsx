import { Input } from "@material-tailwind/react";

const InputC = (props) => {
    return (
        <div className="w-72">
            <Input
                label={props.label}
            />
        </div>
    );
}

export default InputC