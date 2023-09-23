import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
    // Estado para armazenar o valor debounced
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Configurar um timer para atualizar o valor debounced após o atraso especificado
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpar o timer se o valor ou o atraso mudarem antes que o temporizador expire
        return () => {
            clearTimeout(timerId);
        };
    }, [value, delay]);

    return debouncedValue;
}
