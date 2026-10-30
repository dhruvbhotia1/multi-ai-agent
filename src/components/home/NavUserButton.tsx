"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CircleUserRoundIcon, CreditCardIcon, LogOutIcon } from "lucide-react"
import {authClient} from "@/lib/authClient";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {toast} from "sonner";
import {deleteRedisKey} from "@/lib/user/deleteRedisKey";
import {clientSession} from "@/lib/types/ApiResponse";

interface Props {

    data: clientSession | null;
}

export function NavUser({data}: Props) {

    const router = useRouter()

    const handleLogout = async () => {

        const response = await deleteRedisKey(data?.session.id as string);

        if(response.status === "success") {

            await authClient.signOut({
                fetchOptions: {

                    onSuccess: () => {
                        toast.success("Signed out successfully.");
                        router.push("/");
                    }
                }
            });
        }

    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={"p-0 rounded-lg"}>
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={data?.user?.image as string} alt={data?.user?.name} />
                        <AvatarFallback className="rounded-lg">{data?.user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={data?.user?.image as string} alt={data?.user?.name}/>
                            <AvatarFallback className="rounded-lg">{data?.user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{data?.user?.name}</span>
                            <span className="truncate text-xs text-muted-foreground">
                    {data?.user?.email}
                  </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={'/dashboard'}>
                            <CircleUserRoundIcon
                            />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={'/settings'}>
                            <CreditCardIcon
                            />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Button onClick={handleLogout}>
                        <LogOutIcon
                        />
                        Log out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}