import React from 'react'
import { useMutation } from "@tanstack/react-query";
 const useMutationHooks = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback
    })
    return mutation
}

export default useMutationHooks