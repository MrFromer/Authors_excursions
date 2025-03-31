import { useState } from 'react'
import './App.css'
import './styles.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { emailResult, passwordResult, checkEmail, checkPassword } from './utilities';



function EmailPasswordBlock(submit: (email: string, password: string) => void) {

    function emailChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newEmail = event.target.value
        setEmail(newEmail)
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
            <form onSubmit={() => submit(email, password)} className='baseForm'>
                <div className='columned'>
                    <label className='textStyle'>
                    Email
                    </label>
                    <input className='textStyle' placeholder='example@mail.com' value={email} onChange={emailChanged}/>
                    {emailError? <label className='error'>Введите корректный email</label>: <></>}
                </div>
                <div className='columned'>
                    <label className='textStyle'>
                    Пароль
                    </label>
                    <div className='rowed'>
                        <input className='textStyle horizontalStretch' type={isVisible? 'text': 'password'} placeholder='Введите пароль' value={password} onChange={passwordChanged}/>
                        <button type='button' className='setVisibleButton' onClick={() => setVisible(!isVisible)}>
                            {isVisible? <FaEye className='icon setVisibleIcon'/>: <FaEyeSlash className='icon setVisibleIcon'/>}
                        </button>
                    </div>
                    {passwordError? <label className='error'>{passwordErrorText}</label>: <></>}
                </div>
                <button type='submit' className='tinkoffButton'>
                    Войти
                </button>
            </form>
        </>
    )
}


export default EmailPasswordBlock