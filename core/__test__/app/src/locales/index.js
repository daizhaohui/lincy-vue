import en_US from './en_US.json';
import zh_CN from './zh_CN.json';

const VALUE = {
  en_US,
  zh_CN
};
window.__lincy_vue__ = {};
window.__lincy_vue__.lang = VALUE;

export default VALUE;





// if (
//   module.hot.data &&
//   module.hot.data.value &&
//   module.hot.data.value !== VALUE
// ) {
//   module.hot.invalidate();
//   console.log('invalidate');
// } else {
//   module.hot.dispose((data) => {
//     data.value = VALUE;
//   });
//   module.hot.accept('./index.js',()=>{
//     window.__lincy_vue__.lang = VALUE;
//     console.log(VALUE);
//   });
// }