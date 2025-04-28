import Select, { ActionMeta, SingleValue } from "react-select";
import {cities, CityOption} from "./constants"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ru } from "date-fns/locale";

type DateRange = {
    startDate: Date | null;
    endDate: Date | null;
  };

function MainPage() {
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
        <div className="mainPageExternal">
            <div className="noCursor" style={{
                backgroundColor: "white",
                display: 'grid',
                gridTemplateColumns: '1fr 1fr', // Колонки равной ширины по бокам
                alignItems: 'center',
                width: '100%',
                padding: '0.5rem 1rem',
                boxSizing: 'border-box'
            }}
            >
                <a href="http://www.tbank.ru/" style={{ display: "inline-flex", justifySelf: 'start', height: "auto", alignItems: "center"}}>
                    <img src="https://cdn.tbank.ru/static/pfa-multimedia/images/ae288629-59d7-4eb6-b074-8bb0549a43b6.svg" style={{height: "35px"}}/>
                </a>
                <button className="tinkoffButton" style={{ justifySelf: 'end', display: "inline-flex", alignItems: "center", height: "35px" }}>
                    Личный кабинет
                </button>
            </div>
            <div className="mainPageInternal">
                <div className="search">
                    <div style={{width: "100%"}}>
                        <Select
                            options={cities}
                            placeholder="Выберите город"
                            noOptionsMessage={() => "Город не найден"}
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
                            }}
                            onChange={(newValue: SingleValue<CityOption>, actionMeta: ActionMeta<CityOption>) => {
                                console.log(newValue)
                                setCity(newValue?.label)
                            }}/>
                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                                    <DatePicker 
                                        locale={ru}
                                        selected={dates.startDate}
                                        onChange={handleStartDateChange}
                                        selectsStart
                                        startDate={dates.startDate}
                                        endDate={dates.endDate}
                                        placeholderText="Дата от"
                                        dateFormat="dd.MM.yyyy"
                                        customInput={
                                            <TextField
                                            label="Дата от"
                                            variant="outlined"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            />
                                        }
                                        />
                                    <DatePicker
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
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            />
                                        }
                                        />
                                    </Box>
                                </LocalizationProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;