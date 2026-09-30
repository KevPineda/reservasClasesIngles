import React, {createContext,useState, useEffect, useMemo, useCallback} from "react";
import AsyncStorage from "@react-native-asyc-storage/async-storage";

const CLAVE_RESERVAS = "@reservas_mj20";

export const ReservasContext = createContext();

export function ReservasProvider ({children}){
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState (true);

    //Crear la funcion de cargar
    useEffect(()=>{
        const cargar = async () => {
            try{
                const guardando = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if (guardando !== null){
                    setReservas(JSON.parse(guardando));
                }

            }catch(error){
                console.log("Ocurrio un error al cargar la informacion:" , error)

            }finally{
                setCargando(false);

            }
        };
        cargar();
    },[])

    // Guardar cada vez que cambie el arreglo de reservas
    useEffect(()=>{
        if(cargando) return;
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error)=>
            console.log("Error guardando reservas: ", error)
    );
    },[reservas, cargando]);

    const agregarReserva = useCallback((clase, horario)=>{
        const nueva ={
            id: clase.id + "-" + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + " " + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        }
        let resultados = {ok: true};
        setReservas((prev)=>{
            if(prev.some((r)=> r.id === nueva.id)){
                resultados = {ok: false}
                return prev;
            }
            return [nueva, ...prev]
        })
    },[]);





};//Esta llave es la que cierra la funcion del provider 