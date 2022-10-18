import React from 'react';
import './register.css';

type Props = {

}

type State = {
    nick: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    btnLabel: string;
}

export default class Register extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)

        this.state = {
            nick: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            btnLabel: 'Almost there'
        };
    }
    
    nickIsEmpty: boolean = false;
    nickIsInvalid: boolean = false;
    firstNameIsEmpty: boolean = false;
    firstNameIsInvalid: boolean = false;
    lastNameIsEmpty: boolean = false;
    lastNameIsInvalid: boolean = false;
    emailIsEmpty: boolean = false;
    emailIsInvalid: boolean = false;
    passwordIsEmpty: boolean = false;
    passwordIsInvalid: boolean = false;
    confirmPasswordIsEmpty: boolean = false;
    confirmPasswordIsInvalid: boolean = false;

    handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            nick: { value: string },
            firstname: { value: string },
            lastname: { value: string },
            email: { value: string },
            password: { value: string },
            confirmpassword: { value: string }
        };

        const nick = target.nick.value;
        const firstName = target.firstname.value;
        const lastName = target.lastname.value;
        const email = target.email.value;
        const password = target.password.value;
        const confirmPassword = target.confirmpassword.value;

        if (nick == undefined || nick == '')
        {
            this.nickIsEmpty = true;
            this.setState({btnLabel: 'Nick is empty!'});
            return;
        }

        if (firstName == undefined || firstName == '')
        {
            this.firstNameIsEmpty = true;
            this.setState({btnLabel: 'First name is empty!'});
            return;
        }

        if (lastName == undefined || lastName == '')
        {
            this.lastNameIsEmpty = true;
            this.setState({btnLabel: 'Last name is empty!'});
            return;
        }

        if (email == undefined || email == '')
        {
            this.emailIsEmpty = true;
            this.setState({btnLabel: 'E-mail is empty!'});
            return;
        }

        if (password == undefined || password == '')
        {
            this.passwordIsEmpty = true;
            this.setState({btnLabel: 'Password is empty!'});
            return;
        }

        if (confirmPassword == undefined || confirmPassword == '')
        {
            this.confirmPasswordIsEmpty = true;
            this.setState({btnLabel: 'Password check is empty!'});
            return;
        }
        
        if (this.formInputsAreOk())
        {
            this.setState({btnLabel: `Let's Go!`});
            console.log('formulário ok!')
        }

        this.forceUpdate();
    }

    formInputsAreOk() : boolean {
        if (this.nickIsEmpty || this.nickIsInvalid
            || this.firstNameIsEmpty || this.firstNameIsInvalid
            || this.lastNameIsEmpty || this.lastNameIsInvalid
            || this.emailIsEmpty || this.emailIsInvalid
            || this.passwordIsEmpty || this.passwordIsInvalid
            || this.confirmPasswordIsEmpty || this.confirmPasswordIsInvalid)
            return false;

        return true;
    }

    setBtnToOriginalLabel(): void {
        this.setState({btnLabel: `Almost there`});
    }

    handleNick = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const _nick: string = e.target.value;
        const specialChars = `/[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;`

        if (_nick != undefined || _nick != '')
        {
            this.nickIsEmpty = false;
            this.setBtnToOriginalLabel();
        }

        const isSpecialCharsPresent = specialChars.split('').some(char => 
            _nick.includes(char))

        if (isSpecialCharsPresent)
        {
            this.nickIsInvalid = true;
            this.setState({btnLabel: 'Say no to special characters!'});
        }
        else 
        {
            this.nickIsInvalid = false;
            this.setBtnToOriginalLabel();
        }

        this.setState({nick: _nick});
    }

    handleFistName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const _fistName: string = e.target.value;

        if (_fistName != undefined || _fistName != '')
        {
            this.firstNameIsEmpty = false;
            this.setBtnToOriginalLabel();
        }

        this.setState({firstName: _fistName});
    }

    handleLastName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const _lastName: string = e.target.value;

        if (_lastName != undefined || _lastName != '')
        {
            this.lastNameIsEmpty = false;
            this.setBtnToOriginalLabel();
        }

        this.setState({lastName: _lastName});
    }

    handleEmailName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const _email: string = e.target.value;

        if (_email != undefined || _email != '')
        {
            this.emailIsEmpty = false;
            this.setBtnToOriginalLabel();
        }

        if (this.state.email.length > 5
            && !this.state.email.includes('@'))
            this.emailIsInvalid = true;

        this.setState({email: _email});
    }

    handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const _password: string = e.target.value;

        if (_password != undefined || _password != '')
        {
            this.passwordIsEmpty = false;
            this.setBtnToOriginalLabel();
        }

        if (this.state.password.length < 7)
        {
            this.passwordIsInvalid = true;
            this.setState({btnLabel: 'Min 8 characters for password!'});
        }
        else
        {
            this.passwordIsInvalid = false;
            this.setBtnToOriginalLabel();
        }


        this.setState({password: _password});
    }

    handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const _confirmPassword: string = e.target.value;

        if (_confirmPassword != undefined || _confirmPassword != '')
            this.confirmPasswordIsEmpty = false;

        if (this.state.password.length == _confirmPassword.length
            && this.state.password != _confirmPassword)
        {
            this.confirmPasswordIsInvalid = true;
            this.setState({btnLabel: `Password don't match!`});
        }  
        
        if (this.state.password.length == _confirmPassword.length
            && this.state.password == _confirmPassword)
        {
            this.confirmPasswordIsInvalid = false;
            this.setBtnToOriginalLabel();
        } 
            
        this.setState({confirmPassword: _confirmPassword});
    }

    render(){
        return <div className='register-container'>
            <div className='register-form'>
                <div className='register-title'>
                    <h2><b>Create account</b></h2>
                </div>
                <div className='line'></div>
                <form onSubmit={this.handleSubmit}>
                    <div className='register-field'>
                        <label className='register-form-label'>
                            <b>Nick: #</b>
                        </label>
                        <input
                            className= {this.nickIsInvalid ? 'is-invalid' : (this.nickIsEmpty ? 'is-empty' : 'register-input')}
                            name='nick'
                            type='text'
                            placeholder={this.nickIsEmpty ? `don't forget me` : 'to find your page'}
                            value={this.state.nick}
                            onChange={this.handleNick}/>
                    </div>
                    <br className="empty-space"/>
                    <div className='register-field'>
                        <label className='register-form-label'>
                            <b>First name:</b>
                        </label>
                        <input
                            className={this.firstNameIsEmpty ? 'is-empty' : 'register-input'}
                            name='firstname'
                            type='text'
                            placeholder={this.firstNameIsEmpty ? `don't forget me` : 'that beautiful word'}
                            value={this.state.firstName}
                            onChange={this.handleFistName}/>
                    </div>
                    <br className="empty-space"/>
                    <div className='register-field'>
                        <label className='register-form-label'>
                            <b>Last name:</b>
                        </label>
                        <input
                            className={this.lastNameIsEmpty ? 'is-empty' : 'register-input'}
                            name='lastname'
                            type='text'
                            placeholder={this.lastNameIsEmpty ? `don't forget me` : 'inherited for you'}
                            value={this.state.lastName}
                            onChange={this.handleLastName}/>
                    </div>
                    <br className="empty-space"/>
                    <div className='register-field'>
                        <label className='register-form-label'>
                            <b>Email:</b>
                        </label>
                        <input
                            className={this.emailIsEmpty ? 'is-empty' : 'register-input'}
                            name='email'
                            type='email'
                            placeholder={this.emailIsEmpty ? `don't forget me` : 'to solve boring stuff...'}
                            value={this.state.email}
                            onChange={this.handleEmailName}/>
                    </div>
                    <br className="empty-space"/>
                    <div className='register-field'>
                        <label className='register-form-label'>
                            <b>Password:</b>
                        </label>
                        <input
                            className={this.passwordIsEmpty ? 'is-empty' : 'register-input'}
                            name='password'
                            type='password'
                            placeholder={this.passwordIsEmpty ? `don't forget me` : `use a strong word`}
                            value={this.state.password}
                            onChange={this.handlePassword}/>
                    </div>
                    <br className="empty-space"/>
                    <div className='register-field'>
                        <label className='register-form-label'>
                            <b>Confirm Password:</b>
                        </label>
                        <input
                            className={this.confirmPasswordIsInvalid ? 'is-invalid' : (this.confirmPasswordIsEmpty ? 'is-empty' : 'register-input')}
                            name='confirmpassword'
                            type='password'
                            placeholder={this.confirmPasswordIsEmpty ? `don't forget me` : 'repeat the word'}
                            value={this.state.confirmPassword}
                            onChange={this.handleConfirmPassword}/>
                    </div>
                    <br className="empty-space"/>
                    <div style={{display: 'flex', justifyContent:'center'}}>
                        <button className='register-form-btn' type='submit'>{this.state.btnLabel}</button>
                    </div>
                </form>
            </div>
        </div>
    }
} 