import { ToastContainer } from 'react-toastify';
import Home from "./screens/Home";

function App() {
    return (
        <>
            <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Home />
        </>
    );
}

export default App;
