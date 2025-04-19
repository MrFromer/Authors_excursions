
import { useState } from 'react'
import EmailPasswordBlock from './EmailPasswordBlock'
import { isMobile } from 'react-device-detect'



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
          <label className='textStyle' >
            Имя пользователя
          </label>
          <input className='textStyle customBorder' placeholder='Иван Говнов' value={username} onChange={usernameChanged}/>
          <label className='error' style={{visibility: "hidden"}}> "" </label>
        </div>
        {EmailPasswordBlock(setReturnEmail, setReturnPassword)}
        <button type='button' className='tinkoffButton' onClick={() => submit()}>
          Зарегистрироваться
        </button>
        <a href='/login/' className='refStyle'>
          Есть аккаунт? Войти
        </a>
      </form>
    </>
  )
}

export default SignUp
