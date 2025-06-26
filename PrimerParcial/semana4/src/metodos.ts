import { Usuario } from "./modelos/usuario"
import { Vista } from  "./modelos/vista"
import { appdatasource } from "./sqlite"

const insertar = async (nombre: string, correo: string)=>{
    const usuarioNuevo= new Usuario()
    usuarioNuevo.nombre = nombre
    usuarioNuevo.correo = correo
        
    return await appdatasource.manager.save(usuarioNuevo)

    

}
const consultar = async ()=>{
 return await appdatasource.manager.find(Usuario)
}
const consulta1 = async(id: number): Promise<Usuario | null> => {
    return await appdatasource.manager.findOne(Usuario, { where: { id } }) as Usuario | null;
}
const modificar = async (id: number, nombre: string, correo: string)=>{
    const usuarioencontrado = await consulta1(id)
    if (usuarioencontrado){
        usuarioencontrado.nombre = nombre
        usuarioencontrado.correo = correo

        return await appdatasource.manager.save(usuarioencontrado)
    }  
    return  null
}

const eliminar = async (id: number) => {
    const usuarioencontrado = await consulta1(id)
    if (usuarioencontrado){
        return await appdatasource.manager.remove(usuarioencontrado)
    }
    return null
}
const insertarVista = async(nombre:string,idUsuario:number)=>{
    const usuarioencontrado = await consulta1(idUsuario)
    if (usuarioencontrado){
    const vistaNueva = new Vista()
    vistaNueva.nombre=nombre
    vistaNueva.Usuario=usuarioencontrado
    return await appdatasource.manager.save(vistaNueva) 
    }
    return null
}
const eliminarVista = async (id: number) => {
    const vistaencontrado = await appdatasource.manager.findOne(Vista,{where:{id}})
    if (vistaencontrado){
        return await appdatasource.manager.remove(vistaencontrado)
    }
    return null
}
export{
    insertar, consultar, consulta1, modificar, eliminar,insertarVista, eliminarVista
}