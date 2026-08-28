(()=>{
const admin=()=>window.__LANDLORD_LICENSE__?.admin===true&&window.__LANDLORD_READONLY__!==true;
function purge(){
  if(admin())return;
  document.getElementById('licenseAdminBtn')?.remove();
  document.getElementById('mobileLicenseAdmin')?.remove();
  document.querySelectorAll('.license-admin-overlay').forEach(x=>x.remove());
  const reset=document.getElementById('resetBtn');if(reset)reset.style.display='none';
}
document.addEventListener('click',e=>{
  const t=e.target.closest?.('#licenseAdminBtn,#mobileLicenseAdmin,.license-revoke,#generateLicenses,#copyLicenses');
  if(t&&!admin()){e.preventDefault();e.stopImmediatePropagation();purge()}
},true);
window.addEventListener('landlord:ready',purge);window.addEventListener('landlord:demo-ready',purge);
new MutationObserver(()=>requestAnimationFrame(purge)).observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',purge);setTimeout(purge,700);
})();