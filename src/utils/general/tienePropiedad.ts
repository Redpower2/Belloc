export function tienePropiedad<T extends object, K extends string>(
    objeto: T | any,
    propiedad: K
): objeto is T & Record<K, any>
{
    return typeof objeto === "object" && objeto !== null && propiedad in objeto;
}