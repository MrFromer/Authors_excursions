import { JSX, Suspense, } from "react";
import { Link, useNavigate } from "react-router-dom";

function OuterShape({ innerShape }: { innerShape: JSX.Element }) {
    const navigate = useNavigate()
    return (
        <div className="mainPageExternal">
            <div className="noCursor" style={{
                backgroundColor: "white",
                display: 'grid',
                gridTemplateColumns: '1fr 1fr', 
                alignItems: 'center',
                width: '100%',
                padding: '0.5rem 1rem',
                boxSizing: 'border-box'
            }}
            >
                <Link to="/" style={{ display: "inline-flex", justifySelf: 'start', height: "auto", alignItems: "center"}}>
                    <img src="https://cdn.tbank.ru/static/pfa-multimedia/images/ae288629-59d7-4eb6-b074-8bb0549a43b6.svg" style={{height: "35px"}}/>
                </Link>
                <button className="tinkoffButton" style={{ justifySelf: 'end', display: "inline-flex", alignItems: "center", height: "35px" }} onClick={() => navigate("/account")}>
                    Личный кабинет
                </button>
            </div>
            <Suspense fallback={<h1>Загрузка</h1>}>
                { innerShape }
            </Suspense>
        </div>
    )
}

export default OuterShape;