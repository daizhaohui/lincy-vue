const copyErrorMessage = 'Failed to copy value to clipboard. Unknown type.';
const cssText = 'position:fixed;pointer-events:none;z-index:-9999;opacity:0;';

 /**
 * 剪贴板
 * @param input 如果不是字符串,将尝试调用JSON.stringify(input)转换成字符串
 */
export default function clipboard(input: any):boolean{
  let value;

  if (typeof input !== 'string') {
    try {
      value = JSON.stringify(input);
    } catch (e) {
      throw copyErrorMessage;
    }
  } else {
    value = input;
  }

  const textarea:any = document.createElement('textarea')

  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.cssText = cssText;

  document.body.appendChild(textarea);

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    textarea.contentEditable = true;
    textarea.readOnly = true;

    const range = document.createRange();
    range.selectNodeContents(textarea);
    const selection = window.getSelection();
    if(selection){
      selection.removeAllRanges();
      selection.addRange(range);
      textarea.setSelectionRange(0, 999999);
    }
  } else {
    textarea.select();
  }

  let success = false;

  try {
    success = document.execCommand('copy')
  // tslint:disable-next-line:no-empty
  } catch {
  }
  document.body.removeChild(textarea);
  return success;
}