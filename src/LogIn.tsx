
import { useState } from 'react'
import EmailPasswordBlock from './EmailPasswordBlock'
import { isMobile } from 'react-device-detect'



function LogIn() {

  const [returnEmail, setReturnEmail] = useState("")
  const [returnPassword, setReturnPassword] = useState("")

  function submit() {
    console.log(`Email: ${returnEmail}, Password: ${returnPassword}`)
  }

  return (
    <>
      <form className={isMobile? 'mobileBaseForm': 'baseForm'}>
        {EmailPasswordBlock(setReturnEmail, setReturnPassword)}
        <button type='button' className='tinkoffButton' onClick={() => submit()}>
          Войти
        </button>
        <a href='/restore-password/' className='refStyle'>
          Забыли пароль?
        </a>
      </form>
    </>
  )
}

export default LogIn
