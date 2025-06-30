import { inicializar } from  "./database";
import { consulta1, consultar, eliminar, eliminarVista, insertar, insertarVista, modificar } from "./metodos"


console.log ("HOLA MUNDO")

 async function  main (){  
    await inicializar()
    const usuarioNuevo = await insertar( "Alberto", "cd1232@gmail.com")
    console.log(usuarioNuevo)
    const usuarios = await consultar()
    console.log(usuarios)
    const vistaNueva= await insertarVista("usuario",usuarioNuevo.id)
    console.log(vistaNueva)
    const usuarioI = await consulta1(usuarioNuevo.id)
    console.log(usuarioI)
    const usuariosmodificados = await modificar(usuarioNuevo.id, "jeremy", "jeremy.2022@gmail.com")
    console.log(usuariosmodificados) 
    const vistaeliminada =await eliminarVista(vistaNueva!.id)
    console.log(vistaeliminada)
    const usuarioeliminado = await eliminar(usuarioNuevo.id)
    console.log(usuarioeliminado)
    
}


main()

 