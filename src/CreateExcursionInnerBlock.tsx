import { Box, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ru } from 'date-fns/locale';
import { useCallback, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDropzone } from 'react-dropzone';

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

function CreateExcursionInnerBlock() {
  const [previews, setPreviews] = useState<string[]>([]);
  const previewsRef = useRef<string[]>([]);

  useEffect(() => {
    previewsRef.current = previews;
  }, [previews]);
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


  const k = 1;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const fileReaders = acceptedFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((newImages) => {
      const currentLength = previewsRef.current.length;
      const remainingSlots = 10 - currentLength;

      if (remainingSlots <= 0) {
        alert('Вы достигли лимита в 10 картинок! Удалите часть картинок, чтобы добавить новые.');
        return;
      }

      const imagesToAdd = newImages.slice(0, remainingSlots);

      if (newImages.length > remainingSlots) {
        alert(`Добавлено только ${imagesToAdd.length} из ${newImages.length} картинок. Лимит — 10.`);
      }

      setPreviews((prev) => [...prev, ...imagesToAdd]);
    });
  }, []);




  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif', '.webp']
    },
    maxFiles: undefined
  });

  const handleRemoveImage = (indexToRemove: number) => {
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };  

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
    console.log(previews)
    console.log("Excurison submitted")
    // TODO: Сделать отправку экскурсии
  }


  const [minPeople, setMinPeople] = useState<number>(1)
  const [maxPeople, setMaxPeople] = useState<number>(1)

  return (
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
          width: "100%",
          maxWidth: "100%",
          alignItems: "center"
        }}>
          <input {...getInputProps()} />
          <div className='noCursor'
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${13 * k}rem, 1fr))`,
              gap: '1rem',
              maxWidth: '100%', // можно ограничить ширину, если нужно
              padding: '1rem'
            }}
          >
            { previews.length != 0 ? (
              previews.map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    style={{
                      width: `${13 * k}rem`,
                      height: `${13 * k}rem`,
                      aspectRatio: 1,
                      borderRadius: '1rem',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      display: 'block',
                      marginBottom: '0.5rem',
                      border: "1px solid black"
                    }}
                  />
                  <button
                    className="tinkoffButton"
                    onClick={(event) => {
                      handleRemoveImage(index)
                      event.stopPropagation()
                    }}
                  >
                    Удалить
                  </button>
                </div>
              ))
            ) : (
                <img src="src\assets\WhiteBackground.jpg" alt="Preview" style={{ width: `${13*k}rem`, height: `${13*k}rem`, aspectRatio: 1, borderRadius: "1rem", objectFit: "cover", objectPosition: "center center"}} />
            )}
          </div>
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

export default CreateExcursionInnerBlock;