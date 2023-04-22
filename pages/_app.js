import styles from "../scss/Home.global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <ToastContainer limit={1} />
            <Component {...pageProps} />
        </>
    );
}
