import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserService from "../services/user.service";
import ILoggedUser from "../interfaces/user/logged-user.type";
import { EmptyOrInvalidType } from "../interfaces-refact/utils/empty-or-invalid-type";

const userService = new UserService;

const ul_tag_style: React.CSSProperties = {
    textAlign: 'center',
    padding: '20%',
    minWidth: '70%',
    boxShadow: '0px 4px 8px 4px rgba(0, 0, 0, 0.5)',
    backgroundColor: 'white',
};

const login_li_tag_style: React.CSSProperties = {
    fontSize: '1.5em',
    fontWeight: 'bold'
} 

const line_container_div_tag_style: React.CSSProperties = {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
};

const line_div_tag_style: React.CSSProperties = {
    marginTop: '20px',
    marginBottom: '20px',
    width: '90%',
    height: 0,
    border: '1px solid  rgba(0, 0, 0, 0.2)',
    display: 'block',
}

const input_empty_style: React.CSSProperties = {
    height: '1.7em',
    fontSize: '1em',
    marginTop: '10px',
    fontFamily: 'Timeburner',
    textAlign: 'center',
    border: '1px solid #ea9974', 
    outline: '1px solid transparent',
    boxShadow: '0px 1px 1px 0px #ea9974'
}   

const input_invalid_style: React.CSSProperties = {
    height: '1.7em',
    fontSize: '1em',
    marginTop: '10px',
    fontFamily: 'Timeburner',
    textAlign: 'center',
    border: '1px solid #ff3300', 
    outline: '1px solid transparent',
    boxShadow: '0px 1px 1px 0px #ff3300'
}  

const input_style: React.CSSProperties = {
    height: '1.7em',
    fontSize: '1em',
    marginTop: '10px',
    border: '1px solid #ff3300', 
    fontFamily: 'Timeburner',
    textAlign: 'center'
}  

const getInputStyle = (isEmailValid: EmptyOrInvalidType) => {
    if (isEmailValid.empty)
        return input_empty_style;

    if (!isEmailValid.valid)
        return input_invalid_style;

    return input_style;
}

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userNickName, setUserNickName] = useState('');
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState<EmptyOrInvalidType>({empty: true, valid: true});
    const [isPasswordValid, setIsPasswordValid] = useState<EmptyOrInvalidType>({empty: true, valid: true});

    useEffect(() => {
        document.body.style.backgroundColor = '#74EBD5';
        document.body.style.backgroundImage = 'linear-gradient(90deg, #74EBD5 0%, #8496e8 100%)';
        
        const loggedUser: ILoggedUser | undefined = userService.loggedUser();

        if (loggedUser != undefined)
        {
            setUserNickName(loggedUser.nick);
            setIsUserLogged(true)
        }
        
    }, []);

    const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const emailValue: string = e.currentTarget.value;

        validateEmailAndPassword(emailValue, '');
        setEmail(emailValue);
    }

    const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const passwordValue: string = e.currentTarget.value;

        validateEmailAndPassword('', passwordValue);
        setPassword(passwordValue)
    }

    const validateEmailAndPassword = (email: string, password: string) => {
        if (email)
            validateEmail(email);

        if (password)
            validatePassword(password);
    }

    const validateEmail = (email: string) => {
        let isValid = true;
        let isEmpty = true;

        if (!email)
            isEmpty = false;

        if (!email && email.length < 5 && !email.includes('@'))
            isValid = false;  

        setIsEmailValid({valid: isValid, empty: isEmpty });
    }

    const validatePassword = (password: string) => {
        let isEmpty = true;
        let isValid = false;

        const specialCaracters: string = `~\`! @#$%^&*()_-+={[}]|\:;"'<,>.?/`; 

        if (!password)
            isEmpty = false;

        //Valida se há caracteres especiais na senha.
        for (let i = 0; i > password.length; i++)
        {
            for (let x = 0;x > specialCaracters.length;x++)
            {
                if (specialCaracters[x] == password[i])
                {
                    isValid = true;
                    break;
                }
            }
        }

        setIsPasswordValid({valid: isValid, empty: isEmpty });
    }

    return (
        <>
            {isUserLogged && (<Navigate to={`/${userNickName}`} />)}
            <>
                <ul style={ul_tag_style}>
                    <li style={login_li_tag_style}>
                        Login
                    </li>
                    <li>
                        <div style={line_container_div_tag_style}>
                            <div style={line_div_tag_style}></div>
                        </div>
                    </li>
                    <li>
                        <form>
                            <ul>
                                <li>
                                    <b>Your e-mail:</b>
                                </li>
                                <li>
                                <input
                                    style={ getInputStyle(isEmailValid)}
                                    // className= { this._emptyEmail ? "login-input-empty"  : "login-input" }
                                    name='email'
                                    type='email'
                                    placeholder="that's used for boring stuff"
                                    value={email}
                                    onChange={handleEmailOnChange}
                                    />
                                </li>
                                <li>
                                <label>
                                    <b>Password:</b>
                                </label>
                                </li>
                                <li>
                                    <input
                                        style={ getInputStyle(isEmailValid)}
                                        name='password'
                                        type='password'
                                        placeholder='and here the magic word'
                                        value={password}
                                        onChange={handlePasswordOnChange}
                                    />
                                </li>
                                <li>
                                    <button className='login-btn' type='submit'><b>And there we go!</b></button>;
                                </li>
                            </ul>
                        </form>
                    </li>
                    <li>
                        Create your account
                    </li>
                </ul>
            </>
        </>
    )
}