
import {JSX, ReactNode, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

export const useConfirm = (title: string, message: string, children: ReactNode): [() => JSX.Element, () => Promise<unknown>] => {

    const [promise, setPromise] = useState<{resolve: (value: boolean) => void} | null>(null);

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({resolve});
    })

    const handleClose = () => {
        setPromise(null);
    }

    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }

    const ConfirmDialog = () => (
        <Dialog open={promise !== null} onOpenChange={handleClose} >

            <DialogContent className={"z-300"}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>

                <div>
                    {children}
                </div>

                <DialogFooter className={"pt-2"}>

                    <div className={cn(buttonVariants({variant: "outline"}))} onClick={handleCancel}>

                        Cancel

                    </div>

                    <div className={cn(buttonVariants({variant: "default"}))} onClick={handleConfirm}>

                        Confirm

                    </div>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [ConfirmDialog, confirm]

}