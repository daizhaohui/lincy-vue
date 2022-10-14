export function encryptText(text:string):string{
  let temp = "";
  let rs = "";
  for(let i=0 , len = text.length; i < len; i++ ){
      temp = text.charCodeAt(i).toString(16);
      rs  += "\\u"+ new Array(5-temp.length).join("0") + temp;
  }
  return rs;
}

export function descryptText(text:string):string{
  return text.replace(/(\\u)(\w{4}|\w{2})/gi, ($0,$1,$2)=>{
    return String.fromCharCode(parseInt($2,16));
  });
}