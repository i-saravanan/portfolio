
  /* LOADER */
  (()=>{const b=document.getElementById('lbar'),p=document.getElementById('lpct'),l=document.getElementById('loader');let v=0;const iv=setInterval(()=>{v+=Math.random()*16+5;if(v>=100){v=100;clearInterval(iv);setTimeout(()=>l.classList.add('hide'),500)}b.style.width=v+'%';p.textContent=Math.floor(v)+'%';},70);})();

  /* LIQUID CURSOR + SPOTLIGHT */
  const cl=document.getElementById('cur-liq');
  const curDot=document.getElementById('cur-dot');
  const curRing=document.getElementById('cur-ring');
  const spl=document.getElementById('spotlight');
  let lx=0,ly=0,lt=0,sx=0,sy=0,rx=0,ry=0;

  document.addEventListener('mousemove',e=>{
  if(window.innerWidth<=1024)return;
  lx=e.clientX;ly=e.clientY;
  const isInput=e.target.closest('input,textarea,select');
  if(isInput){
  if(curDot)curDot.style.opacity='0';
  if(curRing)curRing.style.opacity='0';
}else{
  if(curDot)curDot.style.opacity='1';
  if(curRing)curRing.style.opacity='1';
}
  const now=Date.now();
  if(now-lt>28){lt=now;const dx=e.clientX-lx,dy=e.clientY-ly,sp=Math.hypot(dx,dy);
  if(sp>2 && !isInput){[28,20,14].forEach((s,i)=>{setTimeout(()=>{const el=document.createElement('div');el.className='rpl';const sz=s+sp*.32;el.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:${sz}px;height:${sz}px;animation-duration:${.9+i*.18}s;border:1.5px solid rgba(255,${107-i*20},43,${.55-i*.12})`;cl.appendChild(el);setTimeout(()=>el.remove(),1200);},i*40);});}
}
});
  document.addEventListener('mouseleave',()=>{
  if(curDot)curDot.style.opacity='0';
  if(curRing)curRing.style.opacity='0';
});
  document.addEventListener('mouseenter',()=>{
  if(curDot)curDot.style.opacity='1';
  if(curRing)curRing.style.opacity='1';
});
  (function moveSpl(){
  if(window.innerWidth<=1024){requestAnimationFrame(moveSpl);return;}
  sx+=(lx-sx)*.07;sy+=(ly-sy)*.07;
  if(spl){spl.style.left=sx+'px';spl.style.top=sy+'px';}
  rx+=(lx-rx)*.15;ry+=(ly-ry)*.15;
  if(curRing){curRing.style.left=rx+'px';curRing.style.top=ry+'px';}
  if(curDot){curDot.style.left=lx+'px';curDot.style.top=ly+'px';}
  requestAnimationFrame(moveSpl);
})();

  document.addEventListener('mouseover',e=>{
  if(window.innerWidth<=1024)return;
  const isInput=e.target.closest('input,textarea,select');
  if(isInput){
  if(curRing)curRing.style.opacity='0';
  if(curDot)curDot.style.opacity='0';
  return;
}
  if(curRing)curRing.style.opacity='1';
  if(curDot)curDot.style.opacity='1';
  const target=e.target.closest('a,button,[onclick],.cat-chip,.sc-card,.lab-card,.pcard');
  if(target){
  if(curRing)curRing.classList.add('hovered');
  if(curDot)curDot.classList.add('hovered');
}
});
  document.addEventListener('mouseout',e=>{
  if(window.innerWidth<=1024)return;
  if(curRing)curRing.classList.remove('hovered');
  if(curDot)curDot.classList.remove('hovered');
});

  /* SCROLL */
  const sp=document.getElementById('sprg');
  window.addEventListener('scroll',()=>{const s=document.documentElement.scrollTop,h=document.documentElement.scrollHeight-window.innerHeight;sp.style.transform='scaleX('+(h>0?s/h:0)+')';document.getElementById('navbar').classList.toggle('sc',s>60);},{passive:true});

  /* NAV (SPA ROUTER) */
  let curPage='home';
  let heroAnim=null, sphereAnim=null;
  let labAnim1=null, labInterval2=null, labAnim3=null, labResizeHandler=null;
  let galaxyAnim=null;

  function nav(page){
  if(window.location.hash.substring(1)!==page){
  window.location.hash=page;
  return;
}
  if(page!=='home'){
  if(heroAnim){cancelAnimationFrame(heroAnim);heroAnim=null;}
  if(sphereAnim){cancelAnimationFrame(sphereAnim);sphereAnim=null;}
}
  if(page!=='skills'){
  if(galaxyAnim){cancelAnimationFrame(galaxyAnim);galaxyAnim=null;}
  if(skillBarsObserver){skillBarsObserver.disconnect();skillBarsObserver=null;}
}
  if(page!=='experience'){
  if(dsaObserver){dsaObserver.disconnect();dsaObserver=null;}
}
  if(page!=='lab'){
  if(labAnim1){cancelAnimationFrame(labAnim1);labAnim1=null;}
  if(labInterval2){clearInterval(labInterval2);labInterval2=null;}
  if(labAnim3){cancelAnimationFrame(labAnim3);labAnim3=null;}
  if(labResizeHandler){window.removeEventListener('resize',labResizeHandler);labResizeHandler=null;}
}
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el=document.getElementById('page-'+page);
  if(!el)return;
  el.classList.add('active');curPage=page;window.scrollTo(0,0);

  const pagePrefix=page.startsWith('proj-')?'projects':page;
  document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===pagePrefix));
  document.getElementById('navlinks').classList.remove('open');
  setTimeout(initReveal,80);
  if(page==='home')setTimeout(()=>{initHero();initSphere();},300);
  if(page==='skills')setTimeout(()=>{initSkillsGalaxy();initSkillBars();},300);
  if(page==='lab')setTimeout(initLab,200);
  if(page==='experience')setTimeout(initDSA,300);
}
  function toggleMenu(){document.getElementById('navlinks').classList.toggle('open');}

  window.addEventListener('hashchange',()=>{
  const hash=window.location.hash.substring(1)||'home';
  nav(hash);
});
  window.addEventListener('DOMContentLoaded',()=>{
  const hash=window.location.hash.substring(1)||'home';
  setTimeout(()=>nav(hash),50);
});

  /* REVEAL */
  function initReveal(){
  const els=document.querySelectorAll('.page.active .reveal');
  const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.07});
  els.forEach(e=>{e.classList.remove('in');ro.observe(e);});
}
  setTimeout(initReveal,150);

  /* HERO CANVAS */
  let heroResizeHandler=null;
  function initHero(){
  if(curPage!=='home')return;
  const c=document.getElementById('hero-canvas');if(!c)return;
  if(heroAnim)cancelAnimationFrame(heroAnim);
  const ctx=c.getContext('2d');
  if(heroResizeHandler)window.removeEventListener('resize',heroResizeHandler);
  heroResizeHandler=()=>{
  const cEl=document.getElementById('hero-canvas');
  if(cEl){cEl.width=cEl.offsetWidth;cEl.height=cEl.offsetHeight;}
};
  heroResizeHandler();
  window.addEventListener('resize',heroResizeHandler,{passive:true});
  const pts=Array.from({length:60},()=>({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.2+.3,a:Math.random()*.5+.2}));
  (function draw(){
  if(curPage!=='home')return;
  ctx.clearRect(0,0,c.width,c.height);
  pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>c.width)p.vx*=-1;if(p.y<0||p.y>c.height)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,107,43,${p.a*.32})`;ctx.fill();});
  pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<100){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(255,107,43,${(1-d/100)*.08})`;ctx.lineWidth=.5;ctx.stroke();}}));
  heroAnim=requestAnimationFrame(draw);
})();
}

  /* 3D SPHERE */
  function initSphere(){
  if(curPage!=='home')return;
  const c=document.getElementById('sphere-canvas');if(!c)return;
  if(sphereAnim)cancelAnimationFrame(sphereAnim);
  const ctx=c.getContext('2d'),W=360,H=360,cx=W/2,cy=H/2,R=130;
  const labels=['Java','Spring','MySQL','REST','JPA','Git','Maven','JDBC','Security','OOP','HTTP','API','DTO','MVC','SQL','ORM','Ctrl','Svc'];
  const nodes=labels.map(l=>({theta:Math.random()*Math.PI*2,phi:Math.acos(2*Math.random()-1),vt:(Math.random()-.5)*.0015,vp:(Math.random()-.5)*.001,label:l}));
  let rot=0;
  (function draw3d(){
  if(curPage!=='home')return;
  ctx.clearRect(0,0,W,H);rot+=.0008;
  const proj=nodes.map(n=>{n.theta+=n.vt;n.phi+=n.vp;const x=R*Math.sin(n.phi)*Math.cos(n.theta+rot),y=R*Math.cos(n.phi),z=R*Math.sin(n.phi)*Math.sin(n.theta+rot),sc=(z+R*1.5)/(R*2.5);return{sx:cx+x,sy:cy+y,z,sc,label:n.label};}).sort((a,b)=>a.z-b.z);
  for(let i=0;i<proj.length;i++)for(let j=i+1;j<proj.length;j++){const d=Math.hypot(proj[i].sx-proj[j].sx,proj[i].sy-proj[j].sy);if(d<100){ctx.beginPath();ctx.moveTo(proj[i].sx,proj[i].sy);ctx.lineTo(proj[j].sx,proj[j].sy);ctx.strokeStyle=`rgba(255,107,43,${(1-d/100)*.12*proj[i].sc})`;ctx.lineWidth=.5;ctx.stroke();}}
  proj.forEach(p=>{const r=3*p.sc;ctx.beginPath();ctx.arc(p.sx,p.sy,r,0,Math.PI*2);ctx.fillStyle=`rgba(255,107,43,${.6*p.sc})`;ctx.fill();if(p.sc>.5){ctx.font=`${Math.round(9*p.sc)}px JetBrains Mono`;ctx.fillStyle=`rgba(245,240,255,${p.sc*.65})`;ctx.textAlign='center';ctx.fillText(p.label,p.sx,p.sy-r-3);}});
  sphereAnim=requestAnimationFrame(draw3d);
})();
}

  /* TYPEWRITER */
  (()=>{const words=['Backend Engineer','Java Developer','REST API Architect','Spring Boot Developer','Systems Builder'];let wi=0,ci=0,del=false;const el=document.getElementById('tw-text');if(!el)return;function type(){const w=words[wi];if(!del){el.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(type,1900);return}}else{el.textContent=w.slice(0,--ci);if(ci===0){del=false;wi=(wi+1)%words.length}}setTimeout(type,del?42:88);}setTimeout(type,2400);})();

  /* QUOTES */
  (()=>{
  const quotes=[{q:"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",a:"Martin Fowler"},{q:"First, solve the problem. Then, write the code.",a:"John Johnson"},{q:"Simplicity is the soul of efficiency.",a:"Austin Freeman"},{q:"Make it work, make it right, make it fast.",a:"Kent Beck"},{q:"Clean code always looks like it was written by someone who cares.",a:"Robert C. Martin"},{q:"The best error message is the one that never shows up.",a:"Thomas Fuchs"},{q:"The function of good software is to make the complex appear to be simple.",a:"Grady Booch"},{q:"Programming isn't about what you know; it's about what you can figure out.",a:"Chris Pine"},{q:"Code is like humor. When you have to explain it, it's bad.",a:"Cory House"},{q:"Software is a great combination of artistry and engineering.",a:"Bill Gates"}];
  const qt=document.getElementById('q-text'),qa=document.getElementById('q-author'),qdots=document.getElementById('q-dots');if(!qt)return;
  let cur=0;quotes.forEach((_,i)=>{const d=document.createElement('div');d.className='qd'+(i===0?' active':'');qdots.appendChild(d);});
  function setQ(i){qt.classList.add('fo');qa.classList.add('fo');setTimeout(()=>{cur=i;qt.textContent=quotes[i].q;qa.textContent='- '+quotes[i].a;document.querySelectorAll('.qd').forEach((d,j)=>d.classList.toggle('active',j===i));qt.classList.remove('fo');qa.classList.remove('fo');},600);}
  setQ(0);setInterval(()=>setQ((cur+1)%quotes.length),15000);
})();

  /* SKILLS GALAXY */
  function initSkillsGalaxy(){
  if(curPage!=='skills')return;
  const canvas=document.getElementById('skills-canvas');if(!canvas)return;
  if(galaxyAnim)cancelAnimationFrame(galaxyAnim);
  const wrap=canvas.parentElement;canvas.width=wrap.offsetWidth;canvas.height=wrap.offsetHeight;
  const ctx=canvas.getContext('2d'),cx=canvas.width/2,cy=canvas.height/2;
  const icons=['☕','🌱','🗄','⚡','🔗','📦','🔬','🐙'];
  const rings=[{r:90,spd:.005,cnt:3,off:0},{r:160,spd:.003,cnt:5,off:1},{r:220,spd:.0015,cnt:9,off:2}];
  let ang=0;
  (function dg(){
  if(curPage!=='skills')return;
  ctx.clearRect(0,0,canvas.width,canvas.height);rings.forEach(o=>{ctx.beginPath();ctx.arc(cx,cy,o.r,0,Math.PI*2);ctx.strokeStyle='rgba(255,107,43,0.07)';ctx.lineWidth=1;ctx.stroke();});
  let ti=0;rings.forEach(o=>{for(let i=0;i<o.cnt;i++){const a=ang*o.spd+o.off+(i/o.cnt)*Math.PI*2,x=cx+o.r*Math.cos(a),y=cy+o.r*Math.sin(a);ctx.font='17px serif';ctx.globalAlpha=.55;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(icons[ti%icons.length],x,y);ti++;ctx.globalAlpha=1;}});
  ang++;
  galaxyAnim=requestAnimationFrame(dg);
})();
}

  /* SKILL BARS */
  let skillBarsObserver=null;
  function initSkillBars(){
  if(curPage!=='skills')return;
  if(skillBarsObserver)skillBarsObserver.disconnect();
  skillBarsObserver=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('vis');const f=en.target.querySelector('.sk-bar-f');const w=getComputedStyle(en.target).getPropertyValue('--w')||'.8';if(f)f.style.transform=`scaleX(${w.trim()})`;}});},{threshold:.3});
  document.querySelectorAll('#page-skills .sk').forEach(c=>skillBarsObserver.observe(c));
}

  /* FILTER */
  function filterSkills(cat,btn){document.querySelectorAll('.cat-chip').forEach(c=>c.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('#skills-grid .sk').forEach(sk=>{sk.style.display=(cat==='all'||sk.dataset.cat===cat)?'':'none';});}

  /* TILT */
  document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    if(window.innerWidth<=1024)return;
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='';});
});

  /* MAGNETIC */
  document.querySelectorAll('.bp,.bo,.n-hire').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    if(window.innerWidth<=1024)return;
    const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.25}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
});

  /* DSA BARS */
  let dsaObserver=null;
  function initDSA(){
  if(curPage!=='experience')return;
  if(dsaObserver)dsaObserver.disconnect();
  dsaObserver=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('vis');});},{threshold:.3});document.querySelectorAll('#page-experience .dsa-fill').forEach(f=>dsaObserver.observe(f));
}

  /* LAB */
  function initLab(){
  if(curPage!=='lab')return;
  if(labAnim1)cancelAnimationFrame(labAnim1);
  if(labInterval2)clearInterval(labInterval2);
  if(labAnim3)cancelAnimationFrame(labAnim3);

  const c1=document.getElementById('lab-canvas-1');
  if(c1){
  c1.width=c1.offsetWidth||300;c1.height=c1.offsetHeight||160;
  const ctx=c1.getContext('2d');
  const pts=Array.from({length:25},()=>({x:Math.random()*c1.width,y:Math.random()*c1.height,vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.8}));
  (function d1(){
  if(curPage!=='lab')return;
  ctx.fillStyle='rgba(9,7,26,.15)';
  ctx.fillRect(0,0,c1.width,c1.height);
  pts.forEach(p=>{
  p.x+=p.vx;p.y+=p.vy;
  if(p.x<0){p.x=0;p.vx*=-1;}
  if(p.x>c1.width){p.x=c1.width;p.vx*=-1;}
  if(p.y<0){p.y=0;p.vy*=-1;}
  if(p.y>c1.height){p.y=c1.height;p.vy*=-1;}
  ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fillStyle='rgba(255,107,43,.8)';ctx.fill();
});
  pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
  const d=Math.hypot(a.x-b.x,a.y-b.y);
  if(d<80){
  ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
  ctx.strokeStyle=`rgba(0,212,177,${(1-d/80)*.5})`;ctx.lineWidth=.7;ctx.stroke();
}
}));
  labAnim1=requestAnimationFrame(d1);
})();
}
  const d2=document.getElementById('lab-api-demo');
  if(d2){
  const steps=['Client','→ Auth Layer','→ Controller','→ Service','→ Repository','→ Database','← Response'];
  let si=0;
  d2.style.cssText='background:#090714;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:1rem;font-family:JetBrains Mono,monospace;font-size:.7rem;height:160px;border-radius:10px';
  const render=()=>{
  if(curPage!=='lab')return;
  d2.innerHTML='<div style="color:rgba(245,240,255,.3);font-size:.6rem;letter-spacing:.1em;margin-bottom:.3rem">REST API FLOW</div>';
  steps.forEach((s,i)=>{
  const el=document.createElement('div');
  el.style.cssText=`padding:.2rem .7rem;border-radius:3px;transition:all .4s;${i===si?'background:rgba(255,107,43,.15);border:1px solid rgba(255,107,43,.4);color:#ff8f5e':'border:1px solid rgba(255,255,255,.05);color:rgba(245,240,255,.22)'}`;el.textContent=s;d2.appendChild(el);
});
  si=(si+1)%steps.length;
};
  render();
  labInterval2=setInterval(render,700);
}
  const c3=document.getElementById('lab-canvas-3');
  if(c3){
  c3.width=c3.offsetWidth||300;c3.height=c3.offsetHeight||160;
  const ctx=c3.getContext('2d');
  const icons=['☕','🌱','🗄','⚡','🔗','📦'];
  let a=0;
  (function d3(){
  if(curPage!=='lab')return;
  const cx=c3.width/2,cy=c3.height/2;
  ctx.clearRect(0,0,c3.width,c3.height);
  ctx.beginPath();ctx.arc(cx,cy,55,0,Math.PI*2);ctx.strokeStyle='rgba(255,107,43,.1)';ctx.lineWidth=1;ctx.stroke();
  ctx.beginPath();ctx.arc(cx,cy,20,0,Math.PI*2);ctx.fillStyle='rgba(255,107,43,.15)';ctx.fill();
  ctx.font='bold 12px Outfit';ctx.fillStyle='rgba(245,240,255,.6)';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('SI',cx,cy);
  icons.forEach((icon,i)=>{
  const ang=a+(i/icons.length)*Math.PI*2,x=cx+55*Math.cos(ang),y=cy+55*Math.sin(ang);
  ctx.font='16px serif';ctx.fillText(icon,x,y);
});
  a+=.002;
  labAnim3=requestAnimationFrame(d3);
})();
}

  if(labResizeHandler)window.removeEventListener('resize',labResizeHandler);
  labResizeHandler=()=>{
  const c1=document.getElementById('lab-canvas-1');
  const c3=document.getElementById('lab-canvas-3');
  if(c1){c1.width=c1.offsetWidth||300;c1.height=c1.offsetHeight||160;}
  if(c3){c3.width=c3.offsetWidth||300;c3.height=c3.offsetHeight||160;}
};
  window.addEventListener('resize',labResizeHandler,{passive:true});
}

  /* ── EMAILJS INIT ── */
  emailjs.init("tnDwepdOMJWgMcf2O");

  /* ── CONTACT FORM ── */
  function handleForm(e){
  e.preventDefault();
  const name=document.getElementById('cf-name').value.trim();
  const email=document.getElementById('cf-email').value.trim();
  const message=document.getElementById('cf-msg').value.trim();
  if(!name||!email||!message){showPopup('Please fill all fields','error');return;}
  const btn=document.querySelector('#contact-form .t-submit');
  const origText=btn.textContent;
  btn.disabled=true;btn.textContent='Sending...';
  emailjs.send('service_3uiiytj','template_42tb1il',{
  name: name,
  from_name: name,
  from_email: email,
  message: message
})
  .then(()=>{
  showPopup('Message sent successfully!','success');
  document.getElementById('contact-form').reset();
  btn.disabled=false;btn.textContent=origText;
})
  .catch((err)=>{
  console.error('EmailJS error:',err);
  showPopup('Failed to send message. Please try again.','error');
  btn.disabled=false;btn.textContent=origText;
});
}
  function showPopup(message,type){
  const popup=document.createElement('div');
  popup.className='popup-msg '+type;
  popup.textContent=message;
  document.body.appendChild(popup);
  setTimeout(()=>popup.classList.add('show'),50);
  setTimeout(()=>{popup.classList.remove('show');setTimeout(()=>popup.remove(),400);},3000);
}
