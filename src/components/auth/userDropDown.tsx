import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { useUser } from "@/contexts/user.context"


export default function UserDropDown() {
    const { userName, clearUser } = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8">
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback  className="bg-gray-400"   >{userName?.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col w-[200px]" >
                <DropdownMenuItem > <Button onClick={() => {clearUser()}}>Logout</Button></DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    )
}