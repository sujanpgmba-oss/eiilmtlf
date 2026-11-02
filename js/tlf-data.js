
/* TLF Central Data Store - keeps website submissions in browser storage for Admin Excel export */
(function(){
  const KEY = 'tlfDataStore';
  function read(){ try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}} }
  function write(db){ localStorage.setItem(KEY, JSON.stringify(db)); return db; }
  function add(type, data){
    const db=read(); if(!Array.isArray(db[type])) db[type]=[];
    db[type].unshift(Object.assign({id:Date.now()+Math.floor(Math.random()*1000), createdAt:new Date().toISOString()},data));
    write(db);
  }
  window.TLFData = {read, write, add};
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('form').forEach(function(form){
      if(form.id === 'donationForm' || form.id === 'volunteerForm' || form.id === 'socialPostForm') return;
      if(form.classList.contains('search-form')) return;
      form.addEventListener('submit', function(){
        const fields={};
        form.querySelectorAll('input,select,textarea').forEach(function(el){
          const key=(el.name||el.id||el.placeholder||'field').replace(/\s+/g,'_').toLowerCase();
          if(el.type!=='submit' && el.type!=='button' && el.value) fields[key]=el.value;
        });
        if(!Object.keys(fields).length) return;
        const type = form.classList.contains('volunter-form') ? 'volunteerSubmissions'
                   : location.pathname.toLowerCase().includes('contact') ? 'contacts'
                   : form.closest('.comment-form') ? 'comments'
                   : 'formSubmissions';
        add(type, {page:location.pathname.split('/').pop()||'index.html', ...fields});
      });
    });
  });
})();
