import { useState } from "react";
import ErrorPopup from "../Components/Errors/ErrorPopup";

function useError() {
    const [errorPopup, setErrorPopup] = useState();

    const setError = (error, message) => {
        setErrorPopup(<ErrorPopup error={error} message={message} />);
        setTimeout(removeError, 2000);
    }
    const removeError = () => {
        setErrorPopup();
    }
    return [errorPopup, setError];
}
export default useError;