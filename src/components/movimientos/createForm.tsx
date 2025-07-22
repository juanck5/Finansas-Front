import { Input } from "../ui/input";
import { Button } from "../ui/button";
import z from "zod";
import { zodResolver} from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { utils } from "@/utils/utils";
import movimientosServices from "@/servises/movimientos.services";
import { de } from "zod/locales";
import { toast } from "sonner";

const moviminentSchema = z.object({
     descripcion: z.string().nonempty("La descripcion es requerida"),
    monto: z.number().nonnegative("El monto es requerido"),
    tipo: z.string(),
    
})
type movementType = z.infer<typeof moviminentSchema>
export default function CreateMovementForm() {

    const [formattedMonto, setFormattedMonto] = useState(""); // Estado para almacenar el monto formateado
    const types = ["ingreso", "egreso"]
    const {
        control,
        reset,
        setValue,
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<movementType>({
        resolver: zodResolver(moviminentSchema)
    })


//     const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { number, formatted } = utils.parseAndFormatCurrency(e.target.value);
//   setFormattedMonto(formatted);
//   setValue("monto", number);
// };
    const onSubmit: SubmitHandler<movementType> = async (data) => {
        console.log(data);
        
       const response = await movimientosServices.create(data);
       if(response.status === 201){
        toast.success("Movimiento creado exitosamente");
        reset();
       }else{
        toast.error("Error al crear el movimiento");
       }


    }
    return (
        <form onSubmit={handleSubmit(onSubmit) } className="flex flex-col gap-2">
            <Input {...register("descripcion")} placeholder="Descripcion" />
            {errors.descripcion && <p className="text-red-500 text-xs">{errors.descripcion.message}</p>}
            <Controller
  control={control}
  name="monto"
  
  render={({ field }) => (
    <Input
    
      placeholder="Monto"
      value={formattedMonto}
      onChange={(e) => {
  const { number, formatted } = utils.parseAndFormatCurrency(e.target.value);
  setFormattedMonto(formatted);
  field.onChange(number); // ✅ como número
}}
    />
  )}
/>
{errors.monto && <p className="text-red-500 text-xs">{errors.monto.message}</p>}
            <Controller
  control={control}
  name="tipo"
  defaultValue="ingreso"
  render={({ field }) => (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Tipo" />
      </SelectTrigger>
      <SelectContent>
        {types.map((type) => (
          <SelectItem key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )}
/>
{errors.tipo && <p className="text-red-500 text-xs">{errors.tipo.message}</p>}
            <Button type="submit">Crear movimiento</Button>
        </form>
    )
}