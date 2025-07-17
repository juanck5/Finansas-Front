import { Input } from "../ui/input";
import { useState } from "react";
import * as Icon from "@phosphor-icons/react";
import { Button } from "../ui/button";


interface CustomPasswordInputProps {
    inputPlaceholder: string;
    register: any
}
export default function CustomPasswordInput( { inputPlaceholder, register }: CustomPasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex items-center gap-2">
            <Input type={showPassword ? "text" : "password"} placeholder={inputPlaceholder} {...register}/>
            <Button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                    <Icon.EyeIcon size={24} />
                ) : (
                    <Icon.EyeClosedIcon size={24} />
                )}
            </Button>
        </div>
    );
}