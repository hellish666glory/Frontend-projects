import { useRef } from 'react';
import { useEffect } from 'react'

export function useAutoFocus(){
    let ref = useRef(null);

    useEffect(() => {
        if (ref != null) ref.current.focus()
    }, [ref]);

    return ref;
}