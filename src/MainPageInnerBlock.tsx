import Select, { ActionMeta, SingleValue } from "react-select";
import {cities, CityOption} from "./constants"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ru } from "date-fns/locale";
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

type DateRange = {
    startDate: Date | null;
    endDate: Date | null;
};
  



async function MainPageInnerBlock() {
    const today = new Date()
    const [city, setCity] = useState<string | undefined>(undefined)
    const [dates, setDates] = useState<DateRange>({
      startDate: null,
      endDate: null,
    });

    const handleStartDateChange = (date: Date | null) => {
        setDates((prevState) => ({
          ...prevState,
          startDate: date,
        }));
        // Если дата "от" позже даты "до", сбрасываем дату "до"
        if (dates.endDate && date && date > dates.endDate) {
          setDates((prevState) => ({
            ...prevState,
            endDate: null,
            }));
        }
    };
    
    const handleEndDateChange = (date: Date | null) => {
        setDates((prevState) => ({
            ...prevState,
            endDate: date,
        }));
    };

    return (
        <div className="mainPageInternal noCursor">
            <div className="roundedBlock search">
                <div style={{width: "100%"}}>
                    <Select
                        options={cities}
                        placeholder="Выберите город"
                        noOptionsMessage={() => "Город не найден"}
                        menuPortalTarget={document.body}
                        styles={{
                            singleValue: (provided) => ({
                            ...provided,
                            textAlign: 'left',
                            marginLeft: 0
                            }),
                            placeholder: (provided) => ({
                            ...provided,
                            textAlign: 'left',
                            marginLeft: 0
                            }),
                            input: (provided) => ({
                            ...provided,
                            paddingLeft: 0,
                            marginLeft: 0
                            }),
                            option: (provided) => ({
                                ...provided,
                                textAlign: 'left',
                                marginLeft: 0       
                            }),
                            noOptionsMessage: (provided) => ({
                                ...provided,
                                textAlign: 'left',
                                marginLeft: 0
                            }),
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        onChange={(newValue: SingleValue<CityOption>, actionMeta: ActionMeta<CityOption>) => {
                            console.log(newValue)
                            setCity(newValue?.label)
                        }}/>
                </div>
                <div style={{width: "100%"}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                        <Box sx={{ display: "flex", gap: 2, marginTop: 2, width: "100%"}}>
                            <Box sx={{flex: 1}}>
                                <DatePicker 
                                    wrapperClassName="datepicker"
                                    locale={ru}
                                    selected={dates.startDate}
                                    onChange={handleStartDateChange}
                                    selectsStart
                                    startDate={dates.startDate}
                                    endDate={dates.endDate}
                                    minDate={today}
                                    placeholderText="Дата от"
                                    dateFormat="dd.MM.yyyy"
                                    customInput={
                                        <TextField
                                        label="Дата от"
                                        variant="outlined"
                                        fullWidth
                                        sx={{width: "100%"}}
                                        slotProps={{ 
                                            inputLabel: {
                                                shrink: true,
                                            },
                                            input: {
                                                style: { width: '100%', backgroundColor: "white"}
                                            }
                                        }}
                                        />
                                    }
                                    />
                            </Box>
                            <Box sx={{flex: 1}}>
                                <DatePicker
                                    wrapperClassName="datepicker"
                                    locale={ru}
                                    selected={dates.endDate}
                                    onChange={handleEndDateChange}
                                    selectsEnd
                                    startDate={dates.startDate}
                                    endDate={dates.endDate}
                                    minDate={dates.startDate ? dates.startDate : undefined}
                                    placeholderText="Дата до"
                                    dateFormat="dd.MM.yyyy"
                                    customInput={
                                        <TextField
                                        label="Дата до"
                                        variant="outlined"
                                        fullWidth
                                        slotProps={{
                                            inputLabel: {
                                                shrink: true,
                                            },
                                            input: {
                                                style: { width: '100%', backgroundColor: "white" }
                                            }
                                        }}
                                        />
                                    }
                                />
                            </Box>
                        </Box>
                    </LocalizationProvider>
                </div>
                <button className="tinkoffButton" style={{marginTop: "20px"}}>
                    Найти экскурсии
                </button>
            </div>
            <div className="chosenExcursions">
                <label className="bigText">
                    Избранные экскурсии вашего города
                </label>
                {excursionData.map((data, index) => (
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
                ))}
            </div>
        </div>
    )
}

export default MainPageInnerBlock;