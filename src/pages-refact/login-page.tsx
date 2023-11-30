import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserService from "../services/user.service";
import ILoggedUser from "../interfaces/user/logged-user.type";
import EmptyOrInvalidType  from "../utils/empty-or-invalid-type";
import { validateEmail, validatePassword } from "../utils/ValidateUtils";

const userService = new UserService;

const div_container_tag_style: React.CSSProperties = {
    width: '100%', 
    height: '100%',
    display: 'flex',
    // position: 'absolute', 
    alignItems: 'center',
    justifyContent: 'center', 
}

const ul_tag_style: React.CSSProperties = {
    textAlign: 'center',
    width: '60%',
    padding: '30px',
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

const submit_button_values: Array<string> = ['And there we go!', 'Some fields are empty'];

export const LoginPage = () => {

    const [createAccountHover, setCreateAccountHover] = useState(false);
    const [emailFieldHover, setEmailFieldHover] = useState(false);
    const [passwordFieldHover, setPasswordFieldHoveP] = useState(false);
    const [btnLoginHover, setBtnLoginHover] = useState(false);

    const label_style: React.CSSProperties = {
        textAlign:'left',
        paddingTop: '20px'
    }

    const input_empty_style: React.CSSProperties = {
        height: '1.7em',
        width: '100%',
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
        width: '100%',
        fontSize: '1em',
        marginTop: '10px',
        fontFamily: 'Timeburner',
        textAlign: 'center',
        border: '1px solid #ff3300', 
        outline: '1px solid transparent',
        boxShadow: '0px 1px 1px 0px #ff3300'
    }  
    
    const input_default_style: React.CSSProperties = {
        height: '1.7em',
        width: '100%',
        fontSize: '1em',
        marginTop: '10px',
        border: '1px solid #ff3300', 
        fontFamily: 'Timeburner',
        textAlign: 'center'
    }  

    const default_submit_button_style: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '15px',
        height: '1.5em',
        fontSize: '1.0em',
        fontFamily: 'Timeburner',
        backgroundColor: '#74ead5',
        border: '0px',
        transition: '0.1s',
        boxShadow: btnLoginHover ? '0px 2px 8px 0px rgba(0, 0, 0, 0.5)' :  '0px 2px 4px 0px rgba(0, 0, 0, 0.5)'
    }
    
    const empty_submit_button_style: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '15px',
        height: '1.5em',
        fontSize: '1.0em',
        fontFamily: 'Timeburner',
        backgroundColor: '#ea9974',
        border: '0px',
        transition: '0.1s',
        boxShadow: btnLoginHover ? '0px 2px 8px 0px rgba(0, 0, 0, 0.5)' :  '0px 2px 4px 0px rgba(0, 0, 0, 0.5)'
    }
    
    const invalid_submit_button_style: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '15px',
        height: '1.5em',
        fontSize: '1.0em',
        fontFamily: 'Timeburner',
        backgroundColor: '#ff3300',
        border: '0px',
        transition: '0.1s',
        boxShadow: btnLoginHover ? '0px 2px 8px 0px rgba(0, 0, 0, 0.5)' :  '0px 2px 4px 0px rgba(0, 0, 0, 0.5)'
    }

    const create_account_style: React.CSSProperties = {
        textDecoration: 'none',
        color: '#8497e8',
        padding: '5px',
        fontSize: '1em',
        textDecorationLine: createAccountHover ? 'underline' : 'none'
    }

    const [userNickName, setUserNickName] = useState<string>('');
    const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
    const [isEmail, setIsEmail] = useState<{text: string, style: React.CSSProperties, validation: EmptyOrInvalidType}>({text: '', style: input_default_style, validation: {empty: true, valid: true}});
    const [isPassword, setIsPassword] = useState<{text: string, style: React.CSSProperties, validation: EmptyOrInvalidType}>({text: '', style: input_default_style, validation: {empty: true, valid: true}});
    const [btnLogin, setBtnLogin] = useState<{text: string, style: React.CSSProperties, enable: boolean}>({text: submit_button_values[0], style: default_submit_button_style, enable: false});

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

        const validatedEmail = validateEmail(emailValue);
        const style = getInputStyle(validatedEmail);

        setIsEmail({text: emailValue, style: style, validation: validatedEmail});

        const btn = getButton('Email', validatedEmail);
        setBtnLogin(btn);
    }

    const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const passwordValue: string = e.currentTarget.value;

        const validatedPassword = validatePassword(passwordValue);
        const style = getInputStyle(validatedPassword);
        
        setIsPassword({text: passwordValue, style: style, validation: validatedPassword});

        const btn = getButton('Password', validatedPassword);
        setBtnLogin(btn);
    }

    const getInputStyle = (isValid: EmptyOrInvalidType) => {
        if (isValid.empty)
            return input_empty_style;
    
        if (!isValid.valid)
            return input_invalid_style;
    
        return input_default_style;
    }
    
    const getButton = (field: string, valid: EmptyOrInvalidType) : {text: string, style: React.CSSProperties, enable: boolean} => {
        if (valid.empty)
            return { text: `${field} field is empty...`, style: empty_submit_button_style, enable: false }

        if (!valid.valid)
            return { text: `${field} field is invalid...`, style: invalid_submit_button_style, enable: false }

        return { text: 'And there we go!', style: default_submit_button_style, enable: true }
    }

    return (
        <>
            {isUserLogged && (<Navigate to={`/${userNickName}`} />)}
            <div style={div_container_tag_style}>
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
                            <ul style={{padding: '0'}}>
                                <li style={label_style}>
                                    <label htmlFor={'email'}>
                                        <b>Your e-mail:</b>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        id={'email'}
                                        style={ isEmail.style }
                                        name='email'
                                        type='email'
                                        placeholder="that's used for boring stuff"
                                        value={isEmail.text}
                                        onChange={handleEmailOnChange}
                                        onMouseEnter={() => setEmailFieldHover(true)} onMouseLeave={() => setEmailFieldHover(false)}
                                        />
                                </li>
                                <li style={label_style}>
                                    <label htmlFor={'password'}>
                                        <b>Password:</b>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        id={'password'}
                                        style={ isPassword.style }
                                        name='password'
                                        type='password'
                                        placeholder='and here the magic word'
                                        value={isPassword.text}
                                        onChange={handlePasswordOnChange}
                                        onMouseEnter={() => setPasswordFieldHoveP(true)} onMouseLeave={() => setPasswordFieldHoveP(false)}
                                    />
                                </li>
                                <li>
                                    <div style={{display: 'flex', justifyContent: 'center', marginTop:'30px'}}>
                                        <button style={btnLogin.style} type='submit' onMouseEnter={() => setBtnLoginHover(true)} onMouseLeave={() => setBtnLoginHover(false)}>
                                            <b>{btnLogin.text}</b>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </li>
                    <li style={{paddingTop: '40px'}}>
                        <Link style={create_account_style} to='/register' onMouseEnter={() => setCreateAccountHover(true)} onMouseLeave={() => setCreateAccountHover(false)}>
                            <b>Create your account</b>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}