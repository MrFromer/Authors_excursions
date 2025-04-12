import { CODE_LENGTH } from "./globals"

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

