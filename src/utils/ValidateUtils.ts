import { Any } from "./StringUtils";
import EmptyOrInvalidType from "./empty-or-invalid-type";

const validateEmail = (email: string): EmptyOrInvalidType => {
    let isValid = true;
    let isEmpty = true;

    if (!email)
        isEmpty = false;

    if (!email && email.length < 5 && !email.includes('@'))
        isValid = false;  

    return {valid: isValid, empty: isEmpty };
}

const validatePassword = (password: string): EmptyOrInvalidType => {
    let isEmpty = true;
    let isValid = false;

    const specialCaracters: string = `~\`! @#$%^&*()_-+={[}]|\:;"'<,>.?/`; 

    if (!password)
        isEmpty = false;

    //Valida se há caracteres especiais na senha.
    if (!Any(specialCaracters, password))
        isValid = false;

    return {valid: isValid, empty: isEmpty };
}

export { validateEmail, validatePassword }