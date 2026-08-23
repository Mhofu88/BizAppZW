const fs=require('fs'), path=require('path');
const oldNum='2631234567', newNum='263772951579';
const oldPlus='+2631234567', newPlus='+263772951579';
function walk(dir){
 fs.readdirSync(dir).forEach(f=>{
  const p=path.join(dir,f);
  if(fs.statSync(p).isDirectory() && !f.startsWith('.') && f!=='node_modules') walk(p);
  else if(/\.(html|js|json|ts|jsx|tsx)$/.test(f)){
   let c=fs.readFileSync(p,'utf8');
   if(c.includes(oldNum)){
    c=c.replaceAll(oldPlus,newPlus).replaceAll(oldNum,newNum);
    fs.writeFileSync(p,c);
    console.log('✅ Patched',p);
   }
  }
 });
}
walk('.');
console.log('Done! All numbers now +263772951579');