import { useState } from 'react'
import './App.css'
import './styles.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { emailResult, passwordResult, checkEmail, checkPassword } from './utilities';



function EmailPasswordBlock(changeEmail: React.Dispatch<React.SetStateAction<string>>, changePassword: React.Dispatch<React.SetStateAction<string>>) {

    function emailChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newEmail = event.target.value
        setEmail(newEmail)
        changeEmail(newEmail)
        const res = checkEmail(newEmail)
        if (res === emailResult.FormatError) {
            setEmailError(true)
        }
        else {
            setEmailError(false)
        }
    }

    function passwordChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newPassword = event.target.value
        setPassword(newPassword)
        changePassword(newPassword)
        const res = checkPassword(newPassword) 
        switch (res) {
            case passwordResult.Ok: {
                setPasswordError(false)
                break
            }
            case passwordResult.LenError: {
                setPasswordError(true)
                setPasswordErrorText("Пароль должен содержать не менее 8 символов")
                break
            }
            case passwordResult.MissingSymbolError: {
                setPasswordError(true)
                setPasswordErrorText("Пароль должен содержать буквы, цифры и символы “!#$%&*")
                break
            }
            case passwordResult.Empty: {
                setPasswordError(false)
                break
            }
        }
    }


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorText, setPasswordErrorText] = useState("")
    const [isVisible, setVisible] = useState(false)
    return (
        <>
            <div className='columned'>
                <label className='textStyle selectable-text'>
                    Email
                </label>
                <input className='textStyle customBorder input_style' placeholder='example@mail.com' value={email} onChange={emailChanged}/>
                <label className='error' style={emailError? {visibility: "visible"}: {visibility: "hidden"}}>
                    {emailError? "Введите корректный email": "\u00A0"}
                </label>
            </div>
            <div className='columned'>
                <label className='textStyle selectable-text'>
                    Пароль
                </label>
                <div className='rowed'>
                    <input className='textStyle horizontalStretch customBorder input_style' type={isVisible? 'text': 'password'} placeholder='Введите пароль' value={password} onChange={passwordChanged}/>
                    <button type='button' className='setVisibleButton whiteButton' onClick={() => setVisible(!isVisible)} style={{height: "2.5rem"}}>
                        {isVisible? <FaEye className='icon setVisibleIcon'/>: <FaEyeSlash className='icon setVisibleIcon'/>}
                    </button>
                </div>
                <label className='error selectable-text' style={emailError? {visibility: "visible"}: {visibility: "hidden"}}>
                    {passwordError? passwordErrorText: "\u00A0"}
                </label>
            </div>
        </>
    )
}


export default EmailPasswordBlock