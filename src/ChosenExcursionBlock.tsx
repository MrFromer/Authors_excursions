import test from "./assets/Паровозик.gif"
import ExcursionBlock from "./ExcursionBlock";
import imgPlaceholder from "./assets/Teto_party.gif"

const excursionData = [
  {
    id: 2,
    image: test, 
    city: "Москва", 
    dateStart: "20 Мая 2025", 
    dateEnd: "40 февраля 1488", 
    description: "Экскурсия по Красной площади...",
    childrenAllowed: true, 
    peopleMin: 1, 
    peopleMax: 4
  },
  // Плейсхолдеры
  {
    id: 0,
    image: imgPlaceholder, 
    city: "Заглушка", 
    dateStart: "12 Марта 2024", 
    dateEnd: null, 
    description: "Плейсхолдер", 
    childrenAllowed: false, 
    peopleMin: 0, 
    peopleMax: 0
  },
  {
    id: 0,  
    image: imgPlaceholder, 
    city: "Заглушка", 
    dateStart: "Тралолейло тралала", 
    dateEnd: "", 
    description: "Плейсхолдер", 
    childrenAllowed: false, 
    peopleMin: 0, 
    peopleMax: 0
  }
];


async function ChosenExcurisonBlock() {
    return (
        <>
            { 
                excursionData.map((data, index) => (
                    <ExcursionBlock
                        key={index}
                        id={data.id}
                        image={data.image}
                        city={data.city}
                        dateStart={data.dateStart}
                        dateEnd={data.dateEnd}
                        description={data.description}
                        childrenAllowed={data.childrenAllowed}
                        peopleMin={data.peopleMin}
                        peopleMax={data.peopleMax}
                    />
                ))
            }
        </>
    )
}

export default ChosenExcurisonBlock