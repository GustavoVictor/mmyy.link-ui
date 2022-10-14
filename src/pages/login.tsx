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
                        Your e-mail:
                    </label>
                    <input
                            name='email'
                            type='text'
                            placeholder='e-mail'
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    <br className="empty-space"/>
                    <label className="login-label">
                        Password:
                    </label>
                    <input
                            name='password'
                            type='password'
                            placeholder='password'
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    <br className="empty-space"/>
                    <button type='submit'>And there we go!!</button>
                </form>
            </div>
        </div>
    }
}