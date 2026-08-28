(()=>{
const mq=matchMedia('(max-width:780px)');
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
let queued=false;
function currentPage(){return q('.navbtn.active')?.dataset.page||'home'}
function annotate(){
 if(!mq.matches){document.body.removeAttribute('data-mobile-page');return}
 const page=currentPage();document.body.dataset.mobilePage=page;
 const workspace=!!q('.workspace-hero');document.body.classList.toggle('mobile-workspace',workspace);
 qa('.rent-row').forEach(x=>x.classList.add('m-rent-card'));
 qa('.expense-row').forEach(x=>x.classList.add('m-expense-card'));
 qa('.tenant-row').forEach(x=>x.classList.add('m-tenant-card'));
 qa('.doc-row').forEach(x=>x.classList.add('m-doc-card'));
 qa('.maintenance-row').forEach(x=>x.classList.add('m-maint-card'));
 qa('.report-stat').forEach(x=>x.classList.add('m-report-stat'));
 qa('.property-card').forEach(x=>x.classList.add('m-property-card'));
 qa('.attention-item').forEach(x=>x.classList.add('m-alert-card'));
}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;annotate()})}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
mq.addEventListener?.('change',schedule);document.addEventListener('DOMContentLoaded',schedule);setTimeout(schedule,300);
})();