import Select, { ActionMeta, SingleValue } from "react-select";
import {cities, CityOption} from "./constants"
import { Suspense, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ru } from "date-fns/locale";
import ChosenExcurisonBlock from "./ChosenExcursionBlock";
import MainPageFilter from "./MainPageFilter";



type DateRange = {
    startDate: Date | null;
    endDate: Date | null;
};
  



function MainPageInnerBlock() {
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
            <MainPageFilter />
            <div className="chosenExcursions">
                <label className="bigText">
                    Избранные экскурсии вашего города
                </label>
                <Suspense fallback={<h1>Загрузка</h1>}>
                    <ChosenExcurisonBlock />
                </Suspense>
            </div>
        </div>
    )
}

export default MainPageInnerBlock;