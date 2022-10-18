import React, { ReactNode } from "react";
import { Link } from 'react-router-dom';
import './login.css'

type Props = {

}

type State = {
    email: string;
    password: string;
    submitBtnEnable: boolean;
    invalidEmail: boolean;
}

export default class Login extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        
        this.state = {
            email: '',
            password: '',
            submitBtnEnable: true,
            invalidEmail: false,
        }
    }
    
    private _emptyEmail: boolean = false;
    private _emptyPassword: boolean = false;
    private _hasNoError: boolean = false;
    
    handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string },
            password: { value: string }
        };

        const email = target.email.value;
        const password = target.password.value;

        if (!email)
            this._emptyEmail = true;

        if (!password)
            this._emptyPassword = true;

        if (this._emptyPassword || this._emptyEmail)
            this.forceUpdate();

        if (this._hasNoError){
            console.log('login');
        }
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const email: string = e.currentTarget.value;

        this.setState({ email: email });
    }

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const password: string = e.currentTarget.value;
        
        this.setState({ password: password })
    }

    changeEmptFields(email: string, password:string){
        if (email)
            this._emptyEmail = false;

        if (password)
            this._emptyPassword = false;
    }

    defineBtnSubmit(): ReactNode {
        const email: string = this.state.email; 
        const password: string = this.state.password;
        let submitBtnEnable: boolean = false;
        let invalidEmail: boolean = false;

        this.changeEmptFields(email, password);

        if (!email || !password)
            submitBtnEnable = false;

        if (email && password)
            submitBtnEnable = true;

        if (email && email.length > 5 && !email.includes('@'))
            invalidEmail = true;    

        if (email && email.length > 5 && email.includes('@'))
            invalidEmail = false;    

        if (invalidEmail)
            return <button className='login-btn-alert1' type='submit'><b>Invalid e-mail!</b></button>;
        
        if(!submitBtnEnable)
            return <button className='login-btn-alert2' type='submit'><b>Almost there!</b></button>;
        
        if (submitBtnEnable)
        {
            this._hasNoError = true;
            return <button className='login-btn' type='submit'><b>And there we go!</b></button>;
        }
    }

    render(){
        return <div className='login-container'>
            <div className='login'>
                <div className="login-title">
                    <h2><b>Login</b></h2>
                </div>
                <div className="login-line-container">
                    <div className="login-line"></div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div className="login-label">
                            <label >
                                <b>Your e-mail:</b>
                            </label>
                            <input
                                    className= { this._emptyEmail ? "login-input-empty"  : "login-input" }
                                    name='email'
                                    type='email'
                                    placeholder="that's used for boring stuff"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                        </div>
                        <div className="login-label">
                            <label>
                                <b>Password:</b>
                            </label>
                            <input
                                    className={ this._emptyPassword ? "login-input-empty"  : "login-input" }
                                    name='password'
                                    type='password'
                                    placeholder='and here the magic word'
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />
                        </div>
                    </div>
                    <div className="login-btn-container">
                        { this.defineBtnSubmit() }
                    </div>
                    <div>
                        <div className="login-create-account-container">
                            <Link className="login-create-account" to='/register'>
                                <b>Create your account</b>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}