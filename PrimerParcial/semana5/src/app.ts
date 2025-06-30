import express,{Request, Response} from "express";

console.log("Hola mundo");
const app = express();
app.use(express.json());
const puerto = 2500;
interface IMascota {
    nombre: string;
    color: string;
    raza: string;
}
const mascotas: IMascota[] = []  
app.get("/mascota", (req: Request, res:Response) => {
    res.json(mascotas)

})
app.get("/mascota/:nombre", (req: Request, res:Response) => {
    const { nombre } = req.params;
    const mascota_encontrada = mascotas.find((elemento) => {
        return elemento.nombre === nombre;
    });
    res.json(mascota_encontrada);
});
app.post("/mascota", (req: Request, res:Response) => {
    const mascota = req.body
    mascotas.push(mascota)
    res.json(mascota)

})
app.put("/mascota/:nombre", (req: Request, res:Response) => {
    const { nombre } = req.params;
    const mascota = req.body;
    const mascota_encontrada = mascotas.find((elemento) => {
        return elemento.nombre === nombre;
    });
    if(!mascota_encontrada){
        res.status(404).json({error: "No se encontró la mascota"});
        return;
    }
    mascota_encontrada.color = mascota.color;
    mascota_encontrada.raza = mascota.raza;
    res.json(mascota_encontrada);

});
app.delete("/mascota/:nombre", (req: Request, res:Response) => {
    const { nombre } = req.params;
    const mascota_encontrada = mascotas.find((elemento) => {
        return elemento.nombre === nombre;
    });
    if(!mascota_encontrada){
        res.status(404).json({error: "No se encontró la mascota"});
        return;
    }
    mascotas.splice(mascotas.indexOf(mascota_encontrada), 1);
    res.json(mascota_encontrada);
})

app.listen(puerto, () => {
    console.log("hola");
});
