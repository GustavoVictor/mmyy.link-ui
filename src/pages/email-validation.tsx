import React, { ReactNode } from "react";
import '../pages/email-validation.css';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { Navigate } from "react-router-dom";

type Props = {
    email: string;
}

type State = {
    code: number | undefined;
    resendBtn: boolean;
}

export default class EmailValidation extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)

        if(this.props.email == ''
            || this.props.email == undefined)
            <Navigate to='/register' replace />

        this.state = {
            code: undefined,
            resendBtn: false
        }
    }

    handleInput = (code: number) => {
        const _code: string = code.toString();

        if (_code.length == 6)
        {
            let isValid: boolean = this.validateCode(_code);

            if (!isValid)
                this.setState({resendBtn: true});
        }

        this.setState({code: code});
    }

    handleResendBtn(){
        //resend code verification to API with this.props.email.
    }

    validateCode(code: string): boolean{
        let codeIsValid = true //validar na API.

        if (codeIsValid)
            <Navigate to='/login' replace /> //replace by user page

        return codeIsValid;
    }

    showResendBtn() : ReactNode {
        if (this.state.resendBtn)
            return <ResendOTP onResendClick={this.handleResendBtn()} />
    }

    render() {
        return <div className="email-validation-container">
            <h2>Email validation</h2>
                <div className="email-validation-line"></div>
                <label>
                    <b>Enter the <u>code</u> we just sent to email <u>{this.props.email}</u></b>
                </label>
                <OTPInput 
                    inputClassName='email-validation-inputs' 
                    value={this.state.code} 
                    onChange={this.handleInput} 
                    autoFocus 
                    OTPLength={6} 
                    otpType="number" 
                    disabled={false} /> 
                {  this.showResendBtn()}
            </div>
    }
}