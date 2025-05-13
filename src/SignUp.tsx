
import { useState, useEffect } from 'react'
import EmailPasswordBlock from './EmailPasswordBlock'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'



function SignUp() {

  
  const [returnEmail, setReturnEmail] = useState("")
  const [returnPassword, setReturnPassword] = useState("")
  const [username, setUsername] = useState("")

  function submit() {
    console.log(`Email: ${returnEmail}, Password: ${returnPassword}`)
  }

  function usernameChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const newUsername = event.target.value
    setUsername(newUsername)
  }


  return (
    <>
      <form className={isMobile? 'mobileBaseForm': 'baseForm'}>
        <div className='columned' >
          <label className='textStyle selectable-text' >
            Имя пользователя
          </label>
          <input className='textStyle customBorder input_style' placeholder='Иван Иванович' value={username} onChange={usernameChanged}/>
          <label className='error' style={{visibility: "hidden"}}> "" </label>
        </div>
        {EmailPasswordBlock(setReturnEmail, setReturnPassword)}
        <button type='button' className='tinkoffButton' onClick={() => submit()}>
          Зарегистрироваться
        </button>
        <Link to='/login/' className='refStyle'>
          Есть аккаунт? Войти
        </Link>
      </form>
    </>
  )
}

export default SignUp
