import useHome from "./useHome";
import { RiFolderDownloadFill } from "react-icons/ri";
import { FaCopy } from "react-icons/fa";
import { ClockLoader } from "react-spinners";

export default function Home() {

    const {
        methods,
        setMethodActive,
        handleRequest,
        setUrl,
        responseRequest,
        downloadJson,
        methodActive,
        successRequest,
        copyJson,
        textareaRef,
        setInputUsernameBasicAuth,
        setInputPasswordBasicAuth,
        setTnputTokenBearerToken,
        definedTypeAuth,
        typeAuth,
        loading,
    } = useHome();

    return (
        <div className="flex flex-col w-full h-screen gap-5">
            <header className="pt-5 pl-5 pr-5">
                <aside className="flex justify-between">
                    <select
                        className="p-2 bg-blue-800 hover:bg-blue-700 rounded-s-lg min-w-[10%] max-w-[15%]"
                        onChange={(e) => setMethodActive(e.target.value)}
                        disabled={loading}
                    >
                        {methods.map((method) => (
                        <option
                            key={method.method}
                            value={method.method}
                            disabled={method.disabled}
                        >
                            {method.label}
                        </option>
                        ))}
                    </select>
                    <input
                        className="w-full p-2 text-xl"
                        type="text"
                        placeholder="exemplo.com"
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        className="flex items-center gap-2 justify-center p-2 bg-blue-700 w-[20%] hover:bg-blue-600 rounded-e-lg"
                        type="button"
                        onClick={handleRequest}
                        disabled={loading}
                    >
                        {
                            loading ? 
                                <ClockLoader 
                                    color="#FFF" 
                                    size={25}
                                /> 
                            : 
                                <>Enviar</>
                        }
                    </button>
                </aside>

                <section className="flex flex-col gap-5 mt-5 max-w-[100%]">
                    <div className="flex gap-5">
                        <button
                        onClick={() => definedTypeAuth("basic")}
                        className="p-2 rounded-lg border border-gray-100 hover:border-blue-600 hover:text-blue-600"
                        type="button"
                        disabled={loading}
                        >
                        Basic Auth
                        </button>
                        <button
                        onClick={() => definedTypeAuth("bearer")}
                        className="p-2 rounded-lg border border-gray-100  hover:border-blue-600 hover:text-blue-600"
                        type="button"
                        disabled={loading}
                        >
                        Bearer Token
                        </button>
                    </div>

                    {typeAuth === "basic" && (
                        <div className="flex flex-col min-w-[30%] max-w-[40%] pb-5 gap-2">
                        <h3 className="mb-5 text-blue-600 font-bold">Basic Auth</h3>
                        <label>Username</label>
                        <input
                            className="p-2 rounded-lg text-[16px]"
                            placeholder="Username"
                            onChange={(e) => setInputUsernameBasicAuth(e.target.value)}
                        />
                        <label>Password</label>
                        <input
                            className="p-2 rounded-lg text-[16px]"
                            placeholder="Password"
                            onChange={(e) => setInputPasswordBasicAuth(e.target.value)}
                        />
                        </div>
                    )}

                    {typeAuth === "bearer" && (
                        <div className="flex flex-col min-w-[30%] max-w-[40%] pb-5 gap-2">
                        <h3 className="mb-5 text-blue-600 font-bold">Bearer Token</h3>
                        <label>Token</label>
                        <input
                            className="p-2 rounded-lg text-[16px]"
                            placeholder="Token"
                            onChange={(e) => setTnputTokenBearerToken(e.target.value)}
                        />
                        </div>
                    )}
                </section>
            </header>

            <main className="p-5 justify-center w-full h-full">      
                <textarea
                    disabled
                    ref={textareaRef}
                    spellCheck="false"
                    className="
                            w-full h-[80%] 
                            bg-zinc-800 
                            border 
                            border-gray-700 
                            rounded-lg 
                            p-5 
                            overflow-auto
                        "
                    value={responseRequest}
                />

                {methodActive === "GET" && successRequest && responseRequest && (
                <section className="flex items-center justify-end mt-5 gap-2">
                    <button
                    className="flex items-center gap-2 p-2 bg-blue-700 w-auto hover:bg-blue-600 rounded-lg"
                    type="button"
                    onClick={downloadJson}
                    >
                    <RiFolderDownloadFill />
                    Gerar arquivo JSON
                    </button>
                    <button
                    className="flex items-center gap-2 p-2 bg-blue-700 w-auto hover:bg-blue-600 rounded-lg"
                    type="button"
                    onClick={copyJson}
                    >
                    <FaCopy />
                    Copiar
                    </button>
                </section>
                )}
            </main>

            <footer className="bottom-0 w-full h-20 bg-zinc-800 p-5">
                <span className="flex justify-center items-center h-full">
                    <a
                        className="text-sm font-semibold"
                        href="https://www.linkedin.com/in/natanael-souza-4150921a4/"
                        target="_blank"
                    >
                        Created by @Natanael Souza - 2024
                    </a>
                </span>
            </footer>
        </div>
    );
}
