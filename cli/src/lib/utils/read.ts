import fs from 'fs';

export function readText(fileName:string):string{
  let bin = fs.readFileSync(fileName);
  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
      bin = bin.slice(3);
  }
  return bin.toString('utf-8');
}

export function readJson(fileName: string): any {
  if(fs.existsSync(fileName)){
    const fileStr = fs.readFileSync(fileName, 'utf-8')
		const json = JSON.parse(fileStr);
    return json;
  }
  return null;
}