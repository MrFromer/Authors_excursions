
import { useState } from 'react'
import EmailPasswordBlock from './EmailPasswordBlock'
import { isMobile } from 'react-device-detect'



function SignUp() {

  
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
