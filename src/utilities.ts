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


export function checkEmail(email: string): emailResult {
  if (email.trim().length === 0) {
    return emailResult.Empty
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return emailResult.Ok
  }
  return emailResult.FormatError
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

