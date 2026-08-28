(()=>{
const SUPABASE_URL='https://kcbkixbvyorgrkwezxta.supabase.co';
const SUPABASE_KEY='sb_publishable_WU97Wr5dWT-cQhTIN4tfWg_FbVQdd68';
const PROD_URL='https://landlord-os-eta.vercel.app';
const APP_KEY='landlord-os-v3';
const BUCKET='landlord-files';
const DEMO_EMAIL='belal.ecom1@gmail.com';
const EMPTY_STATE={demo:false,onboarding:true,properties:[],tenants:[],payments:[],expenses:[],documents:[],maintenance:[],dismissedAlerts:[]};
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
window.__LANDLORD_SUPABASE__=sb;
let currentUser=null,saveTimer=null,urlToToken=new Map(),syncing=false,appLoaded=false;
const originalSet=Storage.prototype.setItem.bind(localStorage);
const gate=document.createElement('div');gate.className='cloud-gate';document.body.appendChild(gate);
function loading(text='Loading your portfolio…'){gate.innerHTML=`<div class="cloud-loader"><div class="cloud-spinner"></div><strong>${text}</strong></div>`}
function authUI(mode='login',message=''){gate.innerHTML=`<div class="cloud-auth"><div class="cloud-logo">L</div><h1>${mode==='login'?'Welcome back':'Create your account'}</h1><p>${mode==='login'?'Sign in to open your rental portfolio from any device.':'Your properties, payments and files will be stored securely in your private cloud workspace.'}</p><form id="cloudAuthForm"><label>Email<input id="cloudEmail" type="email" autocomplete="email" required placeholder="you@example.com"></label><label>Password<input id="cloudPassword" type="password" autocomplete="${mode==='login'?'current-password':'new-password'}" required minlength="6" placeholder="At least 6 characters"></label><button class="cloud-submit" type="submit">${mode==='login'?'Sign in':'Create account'}</button></form><p class="cloud-message">${message}</p><button class="cloud-switch" id="cloudSwitch">${mode==='login'?'New here? Create an account':'Already have an account? Sign in'}</button></div>`;
const form=document.getElementById('cloudAuthForm'),msg=gate.querySelector('.cloud-message'),btn=form.querySelector('button');
form.onsubmit=async e=>{e.preventDefault();btn.disabled=true;msg.textContent='';const email=document.getElementById('cloudEmail').value.trim(),password=document.getElementById('cloudPassword').value;let result;if(mode==='login') result=await sb.auth.signInWithPassword({email,password}); else result=await sb.auth.signUp({email,password,options:{emailRedirectTo:PROD_URL}});if(result.error){msg.textContent=result.error.message;btn.disabled=false;return}if(mode==='login'||result.data.session){loading('Opening your portfolio…');await start(result.data.user||result.data.session?.user)}else{msg.classList.add('ok');msg.textContent='Account created. Check your email to confirm it, then come back and sign in.';btn.disabled=false;}};
document.getElementById('cloudSwitch').onclick=()=>authUI(mode==='login'?'signup':'login');}
function activationMessage(status){return ({invalid:'That activation code is not valid. Check the code and try again.',already_used:'This activation code has already been used by another account.',revoked:'This activation code is no longer active.'})[status]||'Could not activate this workspace. Please try again.'}
function activationUI(user,message=''){gate.innerHTML=`<div class="cloud-auth activation-card"><div class="cloud-logo">L</div><span class="activation-kicker">Lifetime access</span><h1>Activate Landlord OS</h1><p>Enter the activation code included with your purchase to unlock your private workspace.</p><form id="activationForm"><label>Activation code<input id="activationCode" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="LOS-XXXX-XXXX-XXXX" required></label><button class="cloud-submit" type="submit">Activate my workspace</button></form><p class="cloud-message">${message}</p><div class="activation-help">Purchased on Etsy? Use the unique code delivered with your order.</div><button class="cloud-switch" id="activationSignOut">Sign out · ${user.email||''}</button></div>`;
const form=document.getElementById('activationForm'),input=document.getElementById('activationCode'),msg=gate.querySelector('.cloud-message'),btn=form.querySelector('button');
input.addEventListener('input',()=>{let v=input.value.toUpperCase().replace(/[^A-Z0-9]/g,'').replace(/^LOS/,'');v=v.slice(0,12);const chunks=[v.slice(0,4),v.slice(4,8),v.slice(8,12)].filter(Boolean);input.value='LOS-'+chunks.join('-')});
form.onsubmit=async e=>{e.preventDefault();btn.disabled=true;msg.classList.remove('ok');msg.textContent='Checking your code…';const {data,error}=await sb.rpc('activate_license',{p_code:input.value});if(error){console.error(error);msg.textContent='Activation service is unavailable. Please try again.';btn.disabled=false;return}if(!data?.ok){msg.textContent=activationMessage(data?.status);btn.disabled=false;return}msg.classList.add('ok');msg.textContent='Activated successfully. Opening your workspace…';setTimeout(()=>start(user),450)};
document.getElementById('activationSignOut').onclick=async()=>{await sb.auth.signOut();localStorage.removeItem(APP_KEY);location.reload()};setTimeout(()=>input.focus(),80)}
async function checkLicense(){const {data,error}=await sb.rpc('get_license_status');if(error)throw error;window.__LANDLORD_LICENSE__=data||{activated:false};return data||{activated:false}}
function dataUrlToBlob(dataUrl){const [meta,b64]=dataUrl.split(',');const mime=(meta.match(/data:([^;]+)/)||[])[1]||'application/octet-stream';const bin=atob(b64),arr=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);return new Blob([arr],{type:mime})}
function extFor(mime){return ({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','application/pdf':'pdf'})[mime]||'bin'}
async function uploadDataUrl(dataUrl,category){const blob=dataUrlToBlob(dataUrl);const ext=extFor(blob.type);const path=`${currentUser.id}/${category}/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;const {error}=await sb.storage.from(BUCKET).upload(path,blob,{contentType:blob.type,upsert:false});if(error)throw error;return `sb:private:${path}`}
async function toCloud(data){const out=structuredClone(data);const jobs=[];const push=(obj,key,category)=>{const v=obj?.[key];if(typeof v==='string'&&v.startsWith('data:')) jobs.push((async()=>{obj[key]=await uploadDataUrl(v,category)})()); else if(typeof v==='string'&&urlToToken.has(v)) obj[key]=urlToToken.get(v)};
(out.properties||[]).forEach(x=>push(x,'image','properties'));(out.tenants||[]).forEach(x=>push(x,'avatar','avatars'));(out.expenses||[]).forEach(x=>push(x,'receipt','receipts'));(out.documents||[]).forEach(x=>push(x,'data','documents'));(out.maintenance||[]).forEach(x=>push(x,'photo','maintenance'));await Promise.all(jobs);return out}
async function fromCloud(data){const out=structuredClone(data||{});const jobs=[];const resolve=(obj,key)=>{const token=obj?.[key];if(typeof token!=='string'||!token.startsWith('sb:private:'))return;const path=token.slice('sb:private:'.length);jobs.push((async()=>{const {data,error}=await sb.storage.from(BUCKET).createSignedUrl(path,86400);if(!error&&data?.signedUrl){obj[key]=data.signedUrl;urlToToken.set(data.signedUrl,token)}})())};
(out.properties||[]).forEach(x=>resolve(x,'image'));(out.tenants||[]).forEach(x=>resolve(x,'avatar'));(out.expenses||[]).forEach(x=>resolve(x,'receipt'));(out.documents||[]).forEach(x=>resolve(x,'data'));(out.maintenance||[]).forEach(x=>resolve(x,'photo'));await Promise.all(jobs);return out}
function setSyncState(on){syncing=on;const dot=document.querySelector('.cloud-state');if(dot)dot.classList.toggle('syncing',on)}
async function syncState(raw){if(!currentUser)return;try{setSyncState(true);const local=JSON.parse(raw),cloud=await toCloud(local);const {error}=await sb.from('user_portfolios').upsert({user_id:currentUser.id,data:cloud,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(error)throw error}catch(e){console.error('Cloud sync failed',e)}finally{setSyncState(false)}}
function patchStorage(){if(window.__LANDLORD_STORAGE_PATCHED__)return;window.__LANDLORD_STORAGE_PATCHED__=true;const native=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){native.call(this,k,v);if(this===localStorage&&k===APP_KEY&&currentUser){clearTimeout(saveTimer);saveTimer=setTimeout(()=>syncState(v),500)}}}
function accountBadge(){if(document.querySelector('.cloud-user'))return;const el=document.createElement('div');el.className='cloud-user';el.innerHTML=`<span class="cloud-state"></span><b>${currentUser.email||'Cloud account'}</b><button id="cloudSignOut">Sign out</button>`;document.body.appendChild(el);document.getElementById('cloudSignOut').onclick=async()=>{await sb.auth.signOut();localStorage.removeItem(APP_KEY);location.reload()}}
function loadApp(){if(appLoaded)return Promise.resolve();return new Promise((res,rej)=>{const s=document.createElement('script');s.src='./v3.js';s.onload=()=>{appLoaded=true;res()};s.onerror=rej;document.body.appendChild(s)})}
async function start(user){
  currentUser=user;window.__LANDLORD_USER__=user;
  if(!currentUser){authUI();return}
  loading('Checking your license…');
  let license;try{license=await checkLicense()}catch(e){console.error(e);gate.innerHTML='<div class="cloud-auth"><h1>Could not verify your license</h1><p>Please refresh and try again.</p></div>';return}
  if(!license?.activated){activationUI(currentUser);return}
  loading('Syncing your cloud portfolio…');
  const {data,error}=await sb.from('user_portfolios').select('data').eq('user_id',currentUser.id).maybeSingle();
  if(error){console.error(error);gate.innerHTML='<div class="cloud-auth"><h1>Could not load your portfolio</h1><p>Please refresh and try again.</p></div>';return}
  const hasCloud=!!(data?.data&&Object.keys(data.data).length);
  if(hasCloud){const resolved=await fromCloud(data.data);originalSet(APP_KEY,JSON.stringify(resolved))}
  else if((currentUser.email||'').toLowerCase()!==DEMO_EMAIL){originalSet(APP_KEY,JSON.stringify(EMPTY_STATE))}
  patchStorage();
  await loadApp();
  gate.remove();
  accountBadge();
  window.dispatchEvent(new CustomEvent('landlord:ready',{detail:{user:currentUser,license}}));
  const raw=localStorage.getItem(APP_KEY);if(raw&&!hasCloud)setTimeout(()=>syncState(raw),400)
}
(async()=>{loading('Connecting securely…');const {data:{session}}=await sb.auth.getSession();if(session?.user)await start(session.user);else authUI();sb.auth.onAuthStateChange(async(event,session)=>{if(event==='SIGNED_IN'&&session?.user&&!currentUser)await start(session.user)})})();
})();