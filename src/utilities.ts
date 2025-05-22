import { CODE_LENGTH } from "./globals"
import placeholder from "./assets/vasserman_tantsuet.gif"
import placeholder2 from "./assets/Cum.gif"

export enum emailResult {
  Ok,
  Empty,
  FormatError
}

export enum passwordResult {
  Ok,
  Empty,
  LenError,
  MissingSymbolError
}


export enum codeResult {
  Ok,
  Empty,
  LenError,
  NotOnlyDigitsError
}


export function checkEmail(email: string): emailResult {
  if (email.trim().length === 0) {
    return emailResult.Empty
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return emailResult.Ok
  }
  return emailResult.FormatError
}

export function checkCode(code: string): codeResult {
  if (code.trim().length === 0) {
    return codeResult.Empty
  }
  if (!/^\d+$/.test(code.trim())) {
    return codeResult.NotOnlyDigitsError
  } 
  if (!(code.trim().length === CODE_LENGTH)) {
    return codeResult.LenError
  }
  return codeResult.Ok
} 


export function checkPassword(password: string): passwordResult {
  if (password.trim().length === 0) {
    return passwordResult.Empty
  }
  if (password.length < 8) {
    return passwordResult.LenError
  }
  if (!/[a-zA-Z]/.test(password)) {
    return passwordResult.MissingSymbolError
  }
  if (!/\d/.test(password)) {
    return passwordResult.MissingSymbolError
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return passwordResult.MissingSymbolError
  }
  return passwordResult.Ok
}


export interface ExcursionFullBlockProps {
  id?: number;
  image?: string;
  city?: string;
  dateStart?: string;
  dateEnd?: string;
  shortDescription?: string;
  fullDescription?: string;
  childrenAllowed?: boolean;
  peopleMin?: number;
  peopleMax?: number;
}

const test: ExcursionFullBlockProps = {
  id: 0,
  image: placeholder2,
  city: "Барнаул",
  dateStart: "1 Января 1970",
  shortDescription: "Экскурсия",
  fullDescription: '"Тайны старого квартала: прогулка сквозь века" - это 2.5-часовая пешеходная экскурсия по историческому центру, начинающаяся на площади Свободы у фонтана "Времена года". Маршрут проведет вас по самым загадочным местам квартала: вы услышите легенды площади Свободы с ее подземными ходами, увидите масонские символы на Улице Каменных львов, посетите таинственный Дом алхимика XVIII века, где искали философский камень, отдохнете в уединенном Тайном саду графини Орловой с его экзотическими растениями, спуститесь в атмосферные Подземные галереи XVII века, где хранили вино и прятали контрабанду, а также заглянете в Старую аптеку с ее "шкатулкой черного доктора". Экскурсия завершится в кофейне "Под часами" дегустацией исторического "Эликсира бодрости" по рецепту 1890 года.',
  childrenAllowed: true,
  peopleMin: 2,
peopleMax: 10
}


export function loadExcusionInfo(excursionId: number) {
  let result = test;
  result.id = excursionId
  console.log(result)
  return result
}

export function signForExcursion(excursionId: number) {
  console.log(`Запись на экускурсию ID: ${excursionId}`)
}