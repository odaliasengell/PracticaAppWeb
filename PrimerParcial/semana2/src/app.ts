const num:number=4
console.log(num)

const auto:Iauto = {
    marca: "Chevrolet",
    modelo: "Spark",
    color: "Azul"
};
interface Iauto{
    marca: string;
    modelo: string;
    color: string;
}

const autos: Iauto[]=[
    {
        marca: "Chevrolet",
    modelo: "Spark",
    color: "Azul"
    },
    {
        marca: "Audi",
    modelo: "Q8",
    color: "Negro"
    },
    {
        marca: "Chevrolet",
    modelo: "Silverado",
    color: "Rojo"
    }
]
autos.push({ marca:"Toyota",
    modelo:"Yariz",
    color:"Rojo"
});
function agregarauto(auto: Iauto):void{
    autos.push(auto)
}
agregarauto(auto)
agregarauto({ marca:"Toyota",
    modelo:"Yariz",
    color:"Rojo"
})

function agregarauto2(auto: Iauto, callback: (auto:Iauto)=>void):void{
    autos.push(auto);
    callback(auto)
}

agregarauto2({ marca:"Toyota",
    modelo:"Yariz",
    color:"Rojo"
},(auto:Iauto)=>{
    //console.log(auto)
})

function agregarAuto3(auto:Iauto):Promise <Iauto> {
    return new Promise((resolve)=>{
        autos.push(auto);
        resolve(auto)
    }    )
}

agregarAuto3(auto).then((auto)=>{
    console.log("se inserto correctamente")
}).catch((err)=>{
    console.log("error")
}).finally(()=>{
    console.log("se finalizo la funcion")
})

async function main() {

    try {
        const autox = await agregarAuto3(auto)
        console.log("se inserto con await",autox)
    }

    catch(ex){
        console.log("error:", ex)
    }
    finally{
        // Finalization logic can be added here if needed
    }
}
 
main()
