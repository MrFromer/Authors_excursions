import { useState } from 'react'
import './App.css'
import './styles.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { emailResult, passwordResult, checkEmail, checkPassword } from './utilities';


function RestorePassword() {
    return (
        <label>
            Ну типа пароль восстанавливать
        </label>
    )
}

export default RestorePassword