
import { useEffect, useState } from 'react'
import EmailPasswordBlock from './EmailPasswordBlock'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'



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
        <Link to='/restore-password/' className='refStyle'>
          Забыли пароль?
        </Link>
      </form>
    </>
  )
}

export default LogIn
