
import { useState } from 'react'
import EmailPasswordBlock from './EmailPasswordBlock'



function SignUp() {

  
  const [returnEmail, setReturnEmail] = useState("")
  const [returnPassword, setReturnPassword] = useState("")

  function submit() {
    console.log(`Email: ${returnEmail}, Password: ${returnPassword}`)
  }

  return (
    <>
      <form className='baseForm'>
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
