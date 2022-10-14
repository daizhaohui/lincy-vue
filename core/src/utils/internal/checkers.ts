
export function checkForError(condition:boolean,errMessage:string): void {
  if(__DEV__)
  {
    if(condition) throw new Error(errMessage);
  }
}
