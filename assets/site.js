'use strict';
(() => {
 const config=window.STUDIO_CONFIG;
 document.querySelectorAll('footer a[href^="mailto:"]').forEach(a=>{a.textContent=config.bookingEmail;a.href='mailto:'+config.bookingEmail;});
 document.querySelectorAll('footer a[href^="tel:"]').forEach(a=>{a.textContent=config.phone;a.href='tel:'+config.phone.replace(/[^+0-9]/g,'');});
 document.querySelectorAll('[data-address]').forEach(a=>a.textContent=config.address);
 const safeUrl=(value)=>{if(!value||typeof value!=='string')return null;try{const url=new URL(value,document.baseURI);return ['https:','http:','file:'].includes(url.protocol)?url.href:null;}catch{return null;}};
 document.querySelectorAll('[data-media]').forEach(slot=>{const url=safeUrl(config.media[slot.dataset.media]);if(!url)return;const img=document.createElement('img');img.src=url;img.alt=slot.dataset.alt;img.loading='lazy';img.addEventListener('error',()=>slot.hidden=true);slot.append(img);slot.hidden=false;});
 document.querySelectorAll('[data-video]').forEach(slot=>{const url=safeUrl(config.media[slot.dataset.video]);if(!url)return;const video=document.createElement('video');video.src=url;video.controls=true;video.playsInline=true;video.preload='metadata';video.addEventListener('error',()=>slot.hidden=true);slot.append(video);slot.hidden=false;});
 const rateFor=name=>config.rooms.find(room=>room.name===name)?.hourlyRate;
 const money=rate=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(rate);
 document.querySelectorAll('[data-rate]').forEach(el=>{const rate=rateFor(el.dataset.rate);el.textContent=typeof rate==='number'&&rate>=0?`${money(rate)} / hour · Engineer included`:'Rate on inquiry · Engineer included';});
 document.querySelectorAll('[data-engineer]').forEach(link=>{const engineer=config.engineers.find(e=>e.name===link.dataset.engineer);const url=safeUrl(engineer?.bookingUrl);if(url){link.href=url;link.hidden=false;}});
 const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('nav');const mq=matchMedia('(max-width:560px)');
 const setMenu=()=>{menu.hidden=!mq.matches;nav.hidden=mq.matches;menu.setAttribute('aria-expanded',String(!nav.hidden));};setMenu();mq.addEventListener('change',setMenu);menu.addEventListener('click',()=>{nav.hidden=!nav.hidden;menu.setAttribute('aria-expanded',String(!nav.hidden));});
 const form=document.getElementById('inquiry');if(!form)return;
 const params=new URLSearchParams(location.search);
 for(const name of ['room','engineer']){const value=params.get(name);if([...form.elements[name].options].some(o=>o.value===value))form.elements[name].value=value;}
 const now=new Date();const date=new Intl.DateTimeFormat('en-CA',{timeZone:config.timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);const part=t=>date.find(p=>p.type===t).value;form.elements.date.min=`${part('year')}-${part('month')}-${part('day')}`;
 const status=document.getElementById('form-status');const preview=document.getElementById('email-preview');const calendar=document.getElementById('selected-calendar');
 const update=()=>{const rate=rateFor(form.elements.room.value);const hours=Number(form.elements.hours.value);document.getElementById('rate-preview').textContent=typeof rate==='number'&&rate>=0&&Number.isFinite(hours)&&hours>=2?`Estimated session rate: ${money(rate*hours)}. Final quote confirmed by the studio.`:'Ask us for the current rate.';const engineer=config.engineers.find(e=>e.name===form.elements.engineer.value);const url=safeUrl(engineer?.bookingUrl);calendar.hidden=!url;if(url)calendar.href=url;};form.addEventListener('input',update);update();
 const draft=()=>{const data=new FormData(form);return [...data.entries()].map(([key,value])=>`${key==='time'?'Start time (America/Chicago)':key.charAt(0).toUpperCase()+key.slice(1)}: ${value||'No preference'}`).join('\n')+'\n\nThis is a reservation request, subject to studio confirmation.';};
 form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;preview.value=draft();preview.hidden=false;const subject=`Session inquiry — ${form.elements.room.value} — ${form.elements.date.value}`;location.href=`mailto:${encodeURIComponent(config.bookingEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preview.value)}`;status.textContent='Your inquiry is prepared below. Send it from your email app, or copy it and email the studio. No reservation has been confirmed.';});
 document.getElementById('copy-inquiry').addEventListener('click',async()=>{if(!form.reportValidity())return;preview.value=draft();preview.hidden=false;try{await navigator.clipboard.writeText(preview.value);status.textContent=`Inquiry copied. Email it to ${config.bookingEmail}.`;}catch{preview.focus();preview.select();status.textContent='Select and copy the inquiry below, then email it to the studio.';}});
})();
