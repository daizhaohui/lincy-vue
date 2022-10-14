export default function assign(target:any,...rest:any[]){
  let i;
  let source;
  let j;
  let l;
  let key:string;
  let keys:string[];
  const len = rest.length;
  for (i = 0; i < len; i++) {
    source = rest[i]
    keys = Object.keys(source);
    l = keys.length;
    for (j=0;j<l;j++) {
      key = keys[j];
      target[key] = source[key]
    }
  }
  return target
}