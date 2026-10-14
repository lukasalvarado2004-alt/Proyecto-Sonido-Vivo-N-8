import { useEffect } from 'react'

// Un hook propio es una función cuyo nombre empieza con "use" y que llama a otros hooks.
// Este cambia el título de la pestaña del navegador cada vez que se muestra una página.
export function useTituloPagina(titulo) {
  useEffect(() => {
    // document.title es el texto que aparece en la pestaña del navegador.
    document.title = `${titulo} | Sonido Vivo`
    // El arreglo de abajo indica cuándo se repite el efecto: solo si "titulo" cambia.
  }, [titulo])
}   