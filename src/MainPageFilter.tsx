import Select, { ActionMeta, SingleValue } from "react-select";
import { cities, CityOption } from "./constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Box, FormControlLabel, Checkbox } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ru } from "date-fns/locale";
import { useState } from "react";

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

function MainPageFilter() {
  const today = new Date();
  const [city, setCity] = useState<string | undefined>(undefined);
  const [dates, setDates] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [hasChildren, setHasChildren] = useState(false);
  const [peopleCount, setPeopleCount] = useState<number | "">("");

  const handleStartDateChange = (date: Date | null) => {
    setDates((prevState) => ({
      ...prevState,
      startDate: date,
    }));
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasChildren(event.target.checked);
  };

  const handlePeopleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setPeopleCount("");
    } else {
      const num = Number(value);
      if (!isNaN(num) && num >= 0) {
        setPeopleCount(num);
      }
    }
  };

  return (
    <div className="roundedBlock search">
      <div style={{ width: "100%", marginBottom: 16 }}>
        <Select
          options={cities}
          placeholder="Выберите город"
          noOptionsMessage={() => "Город не найден"}
          menuPortalTarget={document.body}
          styles={{
            singleValue: (provided) => ({
              ...provided,
              textAlign: "left",
              marginLeft: 0,
            }),
            placeholder: (provided) => ({
              ...provided,
              textAlign: "left",
              marginLeft: 0,
            }),
            input: (provided) => ({
              ...provided,
              paddingLeft: 0,
              marginLeft: 0,
            }),
            option: (provided) => ({
              ...provided,
              textAlign: "left",
              marginLeft: 0,
            }),
            noOptionsMessage: (provided) => ({
              ...provided,
              textAlign: "left",
              marginLeft: 0,
            }),
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          onChange={(newValue: SingleValue<CityOption>, actionMeta: ActionMeta<CityOption>) => {
            console.log(newValue);
            setCity(newValue?.label);
          }}
        />
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginTop: 2,
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Левая группа: даты и количество людей */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <Box sx={{ flex: "1 1 150px", minWidth: 150 }}>
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
                    sx={{ width: "100%" }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                      input: {
                        style: { width: "100%", backgroundColor: "white" },
                      },
                    }}
                  />
                }
              />
            </Box>
            <Box sx={{ flex: "1 1 150px", minWidth: 150 }}>
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
                        style: { width: "100%", backgroundColor: "white" },
                      },
                    }}
                  />
                }
              />
            </Box>
            <Box sx={{ flex: "1 1 150px", minWidth: 150 }}>
              <TextField
                label="Количество людей"
                type="number"
                variant="outlined"
                fullWidth
                slotProps={{
                    htmlInput: {
                        min: 1,
                    },
                }}
                value={peopleCount}
                onChange={handlePeopleCountChange}
                sx={{ backgroundColor: "white" }}
              />
            </Box>
          </Box>

          {/* Чекбокс справа */}
          <Box sx={{ minWidth: 150, display: "flex", justifyContent: "flex-end" }}>
            <FormControlLabel
              control={<Checkbox checked={hasChildren} onChange={handleCheckboxChange} />}
              label="Есть дети"
            />
          </Box>
        </Box>
      </LocalizationProvider>

      <button className="tinkoffButton" style={{ marginTop: "20px" }}>
        Найти экскурсии
      </button>
    </div>
  );
}

export default MainPageFilter;
