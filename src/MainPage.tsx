function MainPage() {
    return (
        <>
            <div className="top-block noCursor" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr', // Колонки равной ширины по бокам
                alignItems: 'center',
                width: '100%',
                padding: '0.5rem 1rem',
                boxSizing: 'border-box'
            }}
            >
                <a href="http://www.tbank.ru/" style={{ display: "inline-flex", justifySelf: 'start', height: "auto", alignItems: "center"}}>
                    <img src="https://cdn.tbank.ru/static/pfa-multimedia/images/ae288629-59d7-4eb6-b074-8bb0549a43b6.svg" style={{height: "40px"}}/>
                </a>
                <button className="tinkoffButton" style={{ justifySelf: 'end' }}>
                    Личный кабинет
                </button>
            </div>
        </>
    )
}

export default MainPage;