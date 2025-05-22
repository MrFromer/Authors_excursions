import { useState } from "react"
import { isMobile } from 'react-device-detect'
async function MailVerification() {
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState(false)
    const [codeErrorText, setCodeErrorText] = useState("")

    function submit() {

    }
    
    function codeChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newCode = event.target.value
        setCode(newCode)
    }
    return (
    <>
        <form className={isMobile? 'mobileVerificationForm': 'verificationForm'}>
            <label className='textStyle selectable-text'>
                Введите код отправленный вам на почту
            </label>
            {!isMobile? 
                <div className="rowed" style={{gap: "10px", display: "inline-flex", alignItems: "center"}}>
                    <input className='textStyle horizontalStretch customBorder input_style' type='text' value={code} 
                    onChange={codeChanged} style={{height: '2.2rem', paddingLeft: "7px", display: "inline-flex", alignItems: "center"}}/>
                    <button type='button' className='tinkoffButton' onClick={() => submit()} style={{height: '2.5rem', display: "inline-flex", alignItems: "center"}}>
                        Подтвердить
                    </button>
                </div>
                :
                <>
                    <input className='textStyle customBorder input_style' type='text' value={code} 
                    onChange={codeChanged} style={{height: '2.2rem', paddingLeft: "7px", display: "inline-flex", alignItems: "center"}}/>
                    <button type='button' className='tinkoffButton' onClick={() => submit()} style={{height: '2.5rem', display: "inline-flex", alignItems: "center"}}>
                        Подтвердить
                    </button>
                </>
            }
            <label className='error selectable-text'>
                {codeError? codeErrorText: "\u00A0"}
            </label>
        </form>
    </>
    )
}

export default MailVerification 