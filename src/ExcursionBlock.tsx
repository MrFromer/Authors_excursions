import { MouseEvent } from "react";


const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!window.getSelection()?.toString()) {
        console.log('Кнопка нажата!');
    }
};


function ExcurtionBlock(city: string, date: string, description: string) {
    return <>
        <button className="excursionBlockExternal roundedBlock noCursor" onClick={handleClick}>
            <img src="src/assets/Паровозик.gif" alt="Здесь могла быть ваша реклама" style={{height: "13rem", width: "9rem", borderRadius: "1rem"}}/>
            <div className="excursionBlockInternal" style={{flexGrow: 1}}>
                <label className="textStyle selectable-text">
                    <b>Город:</b> {city}
                </label>
                <label className="textStyle selectable-text">
                    <b>Дата:</b> {date}
                </label>
                <label className="textStyle selectable-text" style={{flexGrow: 1}}>
                    <b>Краткое описание:</b> {description}
                </label>
            </div>
        </button>
    </>
}

export default ExcurtionBlock