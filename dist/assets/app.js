const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
const menuBackground=[...document.querySelectorAll('main,footer,.mobile-book,.skip-link,.topbar,.header-inner > .wordmark,.header-book')];
function setMenu(open){nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('locked',open);document.body.classList.toggle('menu-open',open);menuBackground.forEach(element=>element.inert=open);if(open){nav.setAttribute('role','dialog');nav.setAttribute('aria-modal','true');nav.querySelector('.nav-link').focus();}else{nav.removeAttribute('role');nav.removeAttribute('aria-modal');}}
function closeMenu(){setMenu(false);}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';setMenu(open);if(!open)menuButton.focus();});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
window.matchMedia('(min-width: 1101px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
document.addEventListener('keydown',e=>{if(!nav.classList.contains('open'))return;if(e.key==='Escape'){closeMenu();menuButton.focus();}if(e.key==='Tab'){const focusable=[...nav.querySelectorAll('a'),menuButton];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
const today=new Date();const localToday=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
document.querySelectorAll('input[type=date]').forEach(input=>input.min=localToday);
document.querySelectorAll('form').forEach(form=>{const start=form.querySelector('[name=checkin]'),end=form.querySelector('[name=checkout]');if(start&&end)start.addEventListener('change',()=>{if(!start.value){end.min=localToday;return;}const next=new Date(start.value+'T12:00:00');next.setDate(next.getDate()+1);end.min=`${next.getFullYear()}-${String(next.getMonth()+1).padStart(2,'0')}-${String(next.getDate()).padStart(2,'0')}`;});});
const whatsApp=message=>'https://wa.me/2348067141416?text='+encodeURIComponent(message);
const niceDate=value=>value?new Date(value+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'To be confirmed';
function dateError(start,end){if(start&&start<localToday)return 'Please choose a check-in date from today onwards.';if(end&&end<localToday)return 'Please choose a checkout date from today onwards.';if(start&&end&&end<=start)return 'Check-out must be after check-in.';return '';}
const availability=document.querySelector('#availability');
availability?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(availability);const error=dateError(data.get('checkin'),data.get('checkout'));availability.querySelector('.form-error').textContent=error;if(error)return;window.open(whatsApp(`Hello, I'd like to check availability at Carlaw Guest House.\nCheck-in: ${niceDate(data.get('checkin'))}\nCheck-out: ${niceDate(data.get('checkout'))}\nGuests: ${data.get('guests')}`),'_blank','noopener');});
const enquiry=document.querySelector('#enquiry');
enquiry?.addEventListener('submit',e=>{e.preventDefault();let valid=true;for(const name of ['name','contact']){const input=enquiry.elements[name];const empty=!input.value.trim();input.setAttribute('aria-invalid',String(empty));input.parentElement.querySelector('.field-error').textContent=empty?`Please enter your ${name==='name'?'name':'phone number or email'}.`:'';if(empty){if(valid)input.focus();valid=false;}}const data=new FormData(enquiry);const error=dateError(data.get('checkin'),data.get('checkout'));enquiry.querySelector('.form-error').textContent=error;if(error||!valid)return;const url=whatsApp(`Hello, I'd like to enquire about a stay at Carlaw Guest House.\nName: ${data.get('name')}\nContact: ${data.get('contact')}\nCheck-in: ${niceDate(data.get('checkin'))}\nCheck-out: ${niceDate(data.get('checkout'))}\n${data.get('message')||''}`);window.open(url,'_blank','noopener');const status=enquiry.querySelector('.form-status');status.replaceChildren(document.createTextNode('Your enquiry is ready. Complete sending in WhatsApp. '));const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.textContent='Open WhatsApp again';status.append(a);});
let currentFilter='All';
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{currentFilter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('[data-category]').forEach(tile=>tile.hidden=currentFilter!=='All'&&tile.dataset.category!==currentFilter);}));
const dialog=document.querySelector('.lightbox');
const tiles=[...document.querySelectorAll('[data-photo]')];
let activeIndex=0,opener;
const visibleTiles=()=>tiles.filter(tile=>!tile.hidden);
function showPhoto(index){const list=visibleTiles();activeIndex=(index+list.length)%list.length;const source=list[activeIndex].querySelector('img');dialog.querySelector('img').src=source.src;dialog.querySelector('img').alt=source.alt;dialog.querySelector('figcaption').textContent=`${String(activeIndex+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')} — ${source.alt}`;}
tiles.forEach(tile=>tile.addEventListener('click',()=>{opener=tile;showPhoto(visibleTiles().indexOf(tile));dialog.showModal();document.body.classList.add('locked');dialog.querySelector('.lightbox-close').focus();}));
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click',()=>showPhoto(activeIndex-1));
dialog.querySelector('.lightbox-next').addEventListener('click',()=>showPhoto(activeIndex+1));
dialog.addEventListener('close',()=>{document.body.classList.remove('locked');opener?.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(activeIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(activeIndex-1);}});
