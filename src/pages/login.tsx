import React from "react";
import './login.css'

type Props = {

}

type State = {
    email: string;
    password: string;
}

export default class Login extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string },
            password: { value: string }
        };

        const email = target.email.value;
        const password = target.password.value;

        console.log({email, password});
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ email: e.currentTarget.value })
    }

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ password: e.currentTarget.value })
    }

    render(){
        return <div className='login-container'>
            <div className='login'>
                <form onSubmit={this.handleSubmit} className="login-label">
                    <label >
                        <b>Your e-mail:</b>
                    </label>
                    <input
                            className="login-input"
                            name='email'
                            type='text'
                            placeholder='e-mail'
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    <br className="empty-space"/>
                    <label className="login-label">
                        <b>Password:</b>
                    </label>
                    <input
                            className="login-input"
                            name='password'
                            type='password'
                            placeholder='password'
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    <br className="empty-space"/>
                    <br className="empty-space"/>
                    <div className="login-btn-container">
                        <button className='login-btn' type='submit'><b>And there we go!</b></button>
                    </div>
                </form>
            </div>
        </div>
    }
}