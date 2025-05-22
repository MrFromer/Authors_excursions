export interface CityOption {
    value: string;
    label: string;
    population?: number;
    region?: string;
  }


export const cities: CityOption[] = [
    { value: 'moscow', label: 'Москва', population: 12615, region: 'Центральный' },
    { value: 'saint-petersburg', label: 'Санкт-Петербург', population: 5384, region: 'Северо-Западный' },
    { value: 'novosibirsk', label: 'Новосибирск', population: 1626, region: 'Сибирский' },
    { value: 'ekaterinburg', label: 'Екатеринбург', population: 1493, region: 'Уральский' },
    { value: 'kazan', label: 'Казань', population: 1257, region: 'Приволжский' },
    { value: 'nizhny-novgorod', label: 'Нижний Новгород', population: 1244, region: 'Приволжский' },
    { value: 'chelyabinsk', label: 'Челябинск', population: 1193, region: 'Уральский' },
    { value: 'samara', label: 'Самара', population: 1144, region: 'Приволжский' },
    { value: 'omsk', label: 'Омск', population: 1126, region: 'Сибирский' },
    { value: 'rostov-on-don', label: 'Ростов-на-Дону', population: 1124, region: 'Южный' },
    { value: 'ufa', label: 'Уфа', population: 1122, region: 'Приволжский' },
    { value: 'krasnoyarsk', label: 'Красноярск', population: 1093, region: 'Сибирский' },
    { value: 'perm', label: 'Пермь', population: 1048, region: 'Приволжский' },
    { value: 'voronezh', label: 'Воронеж', population: 1048, region: 'Центральный' },
    { value: 'volgograd', label: 'Волгоград', population: 1011, region: 'Южный' },
    { value: 'krasnodar', label: 'Краснодар', population: 974, region: 'Южный' },
    { value: 'saratov', label: 'Саратов', population: 838, region: 'Приволжский' },
    { value: 'tyumen', label: 'Тюмень', population: 816, region: 'Уральский' },
    { value: 'tolyatti', label: 'Тольятти', population: 702, region: 'Приволжский' },
    { value: 'izhevsk', label: 'Ижевск', population: 646, region: 'Приволжский' },
  ];