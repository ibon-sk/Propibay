
export interface PropertyFilter {
    precioMin?: number,
    precioMax?: number,
    extension?: number,
    nHabitaciones?: number,
    estado?: number,
    tipoInmueble?: number,
    tipoOferta?: number,
    ordenarPrecioMax: boolean,
    ordenarPrecioMin: boolean,
    ordenarFavoritos: boolean
}