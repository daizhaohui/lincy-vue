
import clipboard from '../utils/clipboard';

const generateId = ((id) => () => '$' + id++)(1);
const handlers:any = {};
type Func = (arg:any)=>void;

const removeHandler = (id:any) => {
  if (id) {
    handlers[id] = null
    delete handlers[id]
  }
};

const addHandler = (func:Func) => {
  const id = generateId()
  handlers[id] = func
  return id
};

export default {
  name:'clipboard',
  implement:{
    beforeMount(el:any, binding:any) {
      const { arg, value } = binding
      switch (arg) {
        case 'error':
          const errorHandlerId = addHandler(value)
          el.dataset.clipboardErrorHandler = errorHandlerId
          return

        case 'success':
          const successHandlerId = addHandler(value)
          el.dataset.clipboardSuccessHandler = successHandlerId
          return

        default:
          const clickEventHandler = (event:any) => {
            if (binding.hasOwnProperty('value')) {
              const payload = {
                value: typeof value === 'function' ? value() : value,
                event
              }

              const handlerId = clipboard(payload.value)
                ? el.dataset.clipboardSuccessHandler
                : el.dataset.clipboardErrorHandler

              const handler = handlers[handlerId]

              if (handler) {
                handler(payload)
              }
            }
          }
          const clickEventHandlerId = addHandler(clickEventHandler)
          el.dataset.clipboardClickHandler = clickEventHandlerId
          el.addEventListener('click', handlers[clickEventHandlerId])
          return
      }
    },

    unmounted(el:any) {
      const {
        clipboardSuccessHandler,
        clipboardErrorHandler,
        clipboardClickHandler
      } = el.dataset

      removeHandler(clipboardSuccessHandler)
      removeHandler(clipboardErrorHandler)

      if (clipboardClickHandler) {
        el.removeEventListener('click', handlers[clipboardClickHandler])
        removeHandler(clipboardClickHandler)
      }
    }
  }
}
