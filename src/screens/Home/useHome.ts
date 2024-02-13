import { useEffect, useRef, useState } from "react";
import { TypeOptions, toast } from 'react-toastify';
import base64 from 'base-64';

type Toastfy = {
    content: string; 
    type: TypeOptions | undefined;
    autoClose?: number;
}

export default function useHome() {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [inputUsernameBasicAuth, setInputUsernameBasicAuth] = useState<string | null>(null);
    const [inputPasswordBasicAuth, setInputPasswordBasicAuth] = useState<string | null>(null);
    const [inputTokenBearerToken, setTnputTokenBearerToken] = useState<string | null>(null);

    const notify = (msg: Toastfy) => toast(msg.content, {
        type: msg.type
    });

    const methods = [
        {
            label: "GET",
            method: "get",
            disabled: false
        },
        {
            label: "POST",
            method: "post",
            disabled: true
        },
        {
            label: "PUT",
            method: "put",
            disabled: true
        },
        {
            label: "DELETE",
            method: "delete",
            disabled: true
        }
    ];

    const [methodActive, setMethodActive] = useState<string>("GET");
    const [url, setUrl] = useState<string>("");

    const [responseRequest, setResponseRequest] = useState<string>("");
    const [successRequest, setSuccessRequest] = useState<boolean>(false);

    const [typeAuth, definedTypeAuth] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    function handleBase64() {
        const credentials = `${inputUsernameBasicAuth}:${inputPasswordBasicAuth}`;
        const base64Credentials = base64.encode(credentials);
        
        return `Basic ${base64Credentials}`;
    }

    async function handleRequest() {

        if(url === "") {
            notify({
                type: "warning",
                content: "Informe o endpoint!"
            });
            return;
        }
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", typeAuth === "bearer" ? `Bearer ${inputTokenBearerToken}` : handleBase64());  

        const options = {
            method: methodActive,
            headers: myHeaders
        };

        fetch(url, options)
        .then(response => 
            response.json()
        )
        .then( json => {
            const retorno = JSON.stringify(json, null, 4);
            setResponseRequest(retorno);
            setSuccessRequest(true);
        })
        .catch(error => {
            setResponseRequest(JSON.stringify("ERRO: " + error));
            notify({
                type: "error",
                content: "Falhou",
                autoClose: 5000,
            });
            setSuccessRequest(false);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    function downloadJson() {

        const date = new Date();
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0'); 

        const filename = `file-${date.toLocaleDateString('pt-BR')}-${hour}|${minute}h`;

        const blob = new Blob([responseRequest], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function copyJson() {
        if(textareaRef.current) {
            navigator.clipboard.writeText(textareaRef.current.value)
            .then(() => {
                notify({
                    type: "success",
                    content: "Cópiado!"
                });
            })
            .catch((err) => {
                notify({
                    type: "error",
                    content: err
                });
            });
        }
    }

    useEffect(() => {
        setInputUsernameBasicAuth(null);
        setInputPasswordBasicAuth(null);
        setTnputTokenBearerToken(null);
    }, [typeAuth]);

    return {
        methods,
        methodActive,
        setMethodActive,
        url,
        setUrl,
        handleRequest,
        responseRequest,
        downloadJson,
        successRequest,
        copyJson,
        textareaRef,
        setInputUsernameBasicAuth,
        setInputPasswordBasicAuth,
        setTnputTokenBearerToken,
        definedTypeAuth,
        typeAuth,
        loading
    };
}