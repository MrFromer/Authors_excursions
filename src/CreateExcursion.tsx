import { Box, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ru } from 'date-fns/locale';
import { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDropzone } from 'react-dropzone';
import OuterShape from './OuterShape';

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

function CreateExcursion() {
  const today = new Date()

  const [checkChildren, setCheckChildren] = useState(false)

  const [excursionName, setExcursionName] = useState("")

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


  const [preview, setPreview] = useState<string | null>(null);
  const k = 1;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  function nameChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const newName = event.target.value
    setExcursionName(newName)
  }

  function changeChildren(event: React.ChangeEvent<HTMLInputElement>) {
    setCheckChildren(event.target.checked)
  }

  function minChanged(event: React.ChangeEvent<HTMLInputElement>) {
    let new_val = Number.parseInt(event.target.value)
    if (new_val > maxPeople) {
      setMaxPeople(new_val)
    }
    setMinPeople(new_val)
  }

  function maxChanged(event: React.ChangeEvent<HTMLInputElement>) {
    let new_val = Number.parseInt(event.target.value)
    if (new_val < minPeople) {
      setMinPeople(new_val)
    }
    setMaxPeople(new_val)
  }

  function submitExcursion() {
    console.log("Excurison submitted")
    // TODO: Сделать отправку экскурсии
  }


  const [minPeople, setMinPeople] = useState<number>(1)
  const [maxPeople, setMaxPeople] = useState<number>(1)

  return OuterShape(
    <div className='createExcursionExternal'>
      <div className='createExcursionInternal'>
        <label className='textStyle2 selectable-text'>
          Введите название экскурсии
        </label>
        <input className='textStyle customBorder input_style' placeholder='Имя экскурсии' value={excursionName} onChange={nameChanged} />
        <label className='textStyle2 selectable-text'>
          Выберите даты экскурсии
        </label>


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

        
    <label className='textStyle2 selectable-text'>
      Количество людей (мин/макс)
    </label>
    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
      <input
        className='textStyle customBorder input_style'
        type='number'
        placeholder='Мин.'
        value={minPeople}
        onChange={minChanged}
        min={1}
        step={1}
      />
      <input
        className='textStyle customBorder input_style'
        type='number'
        placeholder='Макс.'
        value={maxPeople}
        onChange={maxChanged}
        min={1}
        step={1}
      />
    </div>

        <label className='textStyle2 selectable-text'>
          Введите краткое описание
        </label>
        <textarea className='textStyle customBorder input_style' style={{padding: "6px", resize: "none", height: "5rem"}}/>

        <label className='textStyle2 selectable-text'>
          Введите полное описание (если не указано - то будет скопировано краткое описание)
        </label>
        <textarea className='textStyle customBorder input_style' style={{padding: "6px", resize: "none", height: "7rem"}}/>
        
        <label className='textStyle2 selectable-text'>
          Выберите изображение для экскурсии размером 1 на 1
        </label>
        <div {...getRootProps()} style={{
          border: '2px dashed #ccc',
          padding: 0,
          borderRadius: "1rem",
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f0f0' : 'white',
          width: `${13*k}rem`,
          height: `${13*k}rem`
        }}>
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", aspectRatio: 1, borderRadius: "1rem", objectFit: "cover", objectPosition: "center center"}} />
          ) : (
            <img src="src\assets\WhiteBackground.jpg" alt="Preview" style={{ width: "100%", height: "100%", aspectRatio: 1, borderRadius: "1rem", objectFit: "cover", objectPosition: "center center"}} />
          )}
        </div>
        <label className='textStyle2 selectable-text'>
          Допускаются ли дети {"\t \t "}
          <input type='checkbox' checked={checkChildren} onChange={changeChildren} />
        </label>
        <button className='tinkoffButton' type='button' onClick={submitExcursion} style={{alignSelf: "center", width: "40%"}}>
          Опубликовать экскурсию
        </button>
      </div>
    </div>
  );
};

export default CreateExcursion;