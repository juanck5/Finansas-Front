"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateMovementForm from "./createForm"
import * as Icon from "@phosphor-icons/react"

export default function CreateMovementDialog() {
  return (
    <Dialog>
      <DialogTrigger> <div className="flex items-center justify-center bg-[#FFBC4C] w-[30px] h-[30px] rounded-full text-white "><Icon.PlusIcon size={22}/> </div></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crea un nuevo movimiento</DialogTitle>
          <DialogDescription>
            Aqui puedes crear un nuevo movimiento Ingreso o Egreso
          </DialogDescription>
        </DialogHeader>
        <CreateMovementForm />
      </DialogContent>
    </Dialog>
  )
}