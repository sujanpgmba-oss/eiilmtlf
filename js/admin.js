const STORAGE_KEY='tlfDataStore';
const LEGACY_KEYS={
  socialPosts:'tlfSocialPosts',
  users:'tlfUsers',
  donations:'tlfDonations',
  volunteers:'tlfVolunteers',
  products:'tlfProducts'
};
let currentType='users';

function safeParse(v,fallback){try{return JSON.parse(v||'')}catch(e){return fallback}}
function getDB(){
  const db=safeParse(localStorage.getItem(STORAGE_KEY),'') || {};
  Object.keys(LEGACY_KEYS).forEach(type=>{
    if(!Array.isArray(db[type])){
      const legacy=safeParse(localStorage.getItem(LEGACY_KEYS[type]),[]);
      if(Array.isArray(legacy)&&legacy.length) db[type]=legacy;
    }
  });
  return db;
}
function allTypes(db){
  const preferred=['users','donations','volunteers','socialPosts','products','contacts','comments','formSubmissions','volunteerSubmissions'];
  return [...new Set([...preferred,...Object.keys(db)])].filter(k=>Array.isArray(db[k]));
}
function label(k){return k.replace(/([A-Z])/g,' $1').replace(/^./,x=>x.toUpperCase())}
function renderStats(){
 const db=getDB(), types=allTypes(db);
 const total=types.reduce((n,k)=>n+db[k].length,0);
 const cards=[
 ['Total Records',total,'Database'],
 ['Users', (db.users||[]).length,'Registrations'],
 ['Donations',(db.donations||[]).length,'Donation Forms'],
 ['Volunteers',(db.volunteers||[]).length+(db.volunteerSubmissions||[]).length,'Volunteer Forms'],
 ['Social Posts',(db.socialPosts||[]).length,'Campaigns / Events / Stories']
 ];
 document.getElementById('stats').innerHTML=cards.map(c=>`<div class="col-md-4 col-lg mb-3"><div class="card-box stat"><div class="small text-muted">${c[2]}</div><h2>${c[1]}</h2><div class="font-weight-bold">${c[0]}</div></div></div>`).join('');
}
function renderTabs(){
 const db=getDB(), types=allTypes(db);
 if(!types.includes(currentType)) currentType=types[0]||'users';
 document.getElementById('tabs').innerHTML=types.map(k=>`<button class="btn ${k===currentType?'btn-success':'btn-outline-success'} mr-1 mb-1" onclick="currentType='${k}';renderTabs();renderCurrentTable()">${label(k)} (${db[k].length})</button>`).join('');
}
function flatten(v){
 if(v===null||v===undefined)return '';
 if(typeof v==='object')return JSON.stringify(v);
 return String(v);
}
function renderCurrentTable(){
 const db=getDB(), rows=db[currentType]||[], q=(document.getElementById('tableSearch').value||'').toLowerCase();
 const filtered=rows.filter(r=>JSON.stringify(r).toLowerCase().includes(q));
 const cols=[...new Set(filtered.flatMap(r=>Object.keys(r)))].slice(0,12);
 if(!filtered.length){document.getElementById('tableContainer').innerHTML='<div class="empty">No records found.</div>';return}
 document.getElementById('tableContainer').innerHTML='<table class="table table-bordered table-hover table-sm"><thead><tr>'+cols.map(c=>`<th>${label(c)}</th>`).join('')+'</tr></thead><tbody>'+filtered.map(r=>'<tr>'+cols.map(c=>`<td>${escapeHtml(flatten(r[c]))}</td>`).join('')+'</tr>').join('')+'</tbody></table>';
}
function escapeHtml(v){return v.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function exportAllToExcel(){
 const db=getDB(), wb=XLSX.utils.book_new();
 allTypes(db).forEach(type=>{
   const rows=db[type]||[];
   const clean=rows.map(r=>{const o={};Object.keys(r).forEach(k=>o[label(k)]=flatten(r[k]));return o});
   const ws=XLSX.utils.json_to_sheet(clean.length?clean:[{Info:'No records'}]);
   XLSX.utils.book_append_sheet(wb,ws,label(type).slice(0,31));
 });
 if(!allTypes(db).length){
   XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet([['TLF Data Export'],['No stored records yet.']]),'Overview');
 }
 XLSX.writeFile(wb,'TLF_Administrative_Data.xlsx');
}
function downloadJSONBackup(){
 const blob=new Blob([JSON.stringify(getDB(),null,2)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='TLF_Data_Backup.json';a.click();URL.revokeObjectURL(a.href);
}
function clearAllStoredData(){
 if(!confirm('This will remove all TLF locally stored form and admin records. Continue?'))return;
 localStorage.removeItem(STORAGE_KEY);
 Object.values(LEGACY_KEYS).forEach(k=>localStorage.removeItem(k));
 renderStats();renderTabs();renderCurrentTable();
}
document.addEventListener('DOMContentLoaded',()=>{renderStats();renderTabs();renderCurrentTable()});