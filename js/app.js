
  /* ── LOADER ── */
  (()=>{
  const bar=document.getElementById('lbar'),pct=document.getElementById('lpct'),loader=document.getElementById('loader');
  let p=0;
  const iv=setInterval(()=>{
  p+=Math.random()*16+5;
  if(p>=100){p=100;clearInterval(iv);setTimeout(()=>loader.classList.add('hide'),400)}
  bar.style.width=p+'%';pct.textContent=Math.floor(p)+'%';
},70);
})();

  /* ── LIQUID CURSOR ── */
  (()=>{
  const container=document.getElementById('cursor-liquid');
  let lastX=0,lastY=0,lastTime=0;
  const sizes=[28,20,14];
  document.addEventListener('mousemove',e=>{
  const now=Date.now();
  if(now-lastTime<30)return;
  lastTime=now;
  const dx=e.clientX-lastX,dy=e.clientY-lastY;
  const speed=Math.hypot(dx,dy);
  if(speed<2)return;
  lastX=e.clientX;lastY=e.clientY;
  sizes.forEach((size,i)=>{
  setTimeout(()=>{
  const el=document.createElement('div');
  el.className='ripple-circle';
  const s=size+speed*0.4;
  el.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:${s}px;height:${s}px;animation-duration:${0.9+i*0.18}s;border-color:rgba(255,${107-i*20},43,${0.5-i*0.12});`;
  container.appendChild(el);
  setTimeout(()=>el.remove(),1200);
    },i*40);
    });
    });
    })();

  /* ── SCROLL ── */
  const prog=document.getElementById('scroll-prog');
  window.addEventListener('scroll',()=>{
  const s=document.documentElement.scrollTop;
  const h=document.documentElement.scrollHeight-window.innerHeight;
  prog.style.transform='scaleX('+(s/h)+')';
  document.getElementById('navbar').classList.toggle('scrolled',s>60);
});

  /* ── HERO CANVAS ── */
  (()=>{
  const canvas=document.getElementById('hero-canvas');
  const ctx=canvas.getContext('2d');
  function resize(){canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight}
  resize();window.addEventListener('resize',resize);
  const pts=Array.from({length:70},()=>({
  x:Math.random()*canvas.width,y:Math.random()*canvas.height,
  vx:(Math.random()-0.5)*0.35,vy:(Math.random()-0.5)*0.35,
  r:Math.random()*1.2+0.3,a:Math.random()*0.6+0.2
}));
  function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pts.forEach(p=>{
  p.x+=p.vx;p.y+=p.vy;
  if(p.x<0||p.x>canvas.width)p.vx*=-1;
  if(p.y<0||p.y>canvas.height)p.vy*=-1;
  ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
  ctx.fillStyle=`rgba(255,107,43,${p.a*0.4})`;ctx.fill();
});
  pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
  const d=Math.hypot(a.x-b.x,a.y-b.y);
  if(d<110){
  ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
  ctx.strokeStyle=`rgba(255,107,43,${(1-d/110)*0.1})`;
  ctx.lineWidth=0.5;ctx.stroke();
}
}));
  requestAnimationFrame(draw);
}
  draw();
})();

  /* ── TYPEWRITER ── */
  (()=>{
  const words=['Backend Engineer','Java Developer','REST API Architect','Spring Boot Developer','Systems Builder'];
  let wi=0,ci=0,del=false;
  const el=document.getElementById('tw-text');
  function type(){
  const w=words[wi];
  if(!del){el.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(type,1900);return}}
  else{el.textContent=w.slice(0,--ci);if(ci===0){del=false;wi=(wi+1)%words.length}}
  setTimeout(type,del?42:88);
}
  setTimeout(type,2400);
})();

  /* ── QUOTES ── */
  (()=>{
  const quotes=[
{q:"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",a:"Martin Fowler"},
{q:"First, solve the problem. Then, write the code.",a:"John Johnson"},
{q:"Simplicity is the soul of efficiency.",a:"Austin Freeman"},
{q:"Make it work, make it right, make it fast.",a:"Kent Beck"},
{q:"Clean code always looks like it was written by someone who cares.",a:"Robert C. Martin"},
{q:"The best error message is the one that never shows up.",a:"Thomas Fuchs"},
{q:"The function of good software is to make the complex appear to be simple.",a:"Grady Booch"},
{q:"Programming isn't about what you know; it's about what you can figure out.",a:"Chris Pine"},
{q:"Code is like humor. When you have to explain it, it's bad.",a:"Cory House"},
{q:"Software is a great combination of artistry and engineering.",a:"Bill Gates"}
  ];
  const qt=document.getElementById('q-text');
  const qa=document.getElementById('q-author');
  const qdots=document.getElementById('q-dots');
  let cur=Math.floor(Math.random()*quotes.length);
  quotes.forEach((_,i)=>{
  const d=document.createElement('div');d.className='qdot'+(i===cur?' active':'');
  qdots.appendChild(d);
});
  function setQuote(i){
  qt.classList.add('fade-out');qa.classList.add('fade-out');
  setTimeout(()=>{
  cur=i;
  qt.textContent=quotes[i].q;
  qa.textContent='— '+quotes[i].a;
  document.querySelectorAll('.qdot').forEach((d,j)=>d.classList.toggle('active',j===i));
  qt.classList.remove('fade-out');qa.classList.remove('fade-out');
},600);
}
  setQuote(cur);
  setInterval(()=>setQuote((cur+1)%quotes.length),15000);
})();

  /* ── SCROLL REVEAL ── */
  const reveals=document.querySelectorAll('.reveal');
  const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')});
},{threshold:0.08});
  reveals.forEach(r=>ro.observe(r));

  /* ── SKILL BARS ── */
  const sko=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('vis');
      const f=e.target.querySelector('.sk-bar-f');
      const w=getComputedStyle(e.target).getPropertyValue('--w')||'0.8';
      if(f)f.style.transform=`scaleX(${w.trim()})`;
    }
  });
},{threshold:0.3});
  document.querySelectorAll('.sk-card').forEach(c=>sko.observe(c));

  /* ── CARD TILT (all 3 cards) ── */
  document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5;
    const y=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`perspective(900px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='';});
  card.addEventListener('mouseenter',()=>{});
});

  /* ── MAGNETIC BUTTONS ── */
  document.querySelectorAll('.btn-p,.btn-o,.nav-hire').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*0.28;
    const y=(e.clientY-r.top-r.height/2)*0.28;
    btn.style.transform=`translate(${x}px,${y}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
});

  /* ── FORM ── */
  /* ── EMAILJS INIT ── */

  emailjs.init("tnDwepdOMJWgMcf2O");

  /* ── CONTACT FORM ── */

  function handleForm(e){

    e.preventDefault();

    const name =
        document.getElementById("cf-name").value.trim();

    const email =
        document.getElementById("cf-email").value.trim();

    const message =
        document.getElementById("cf-msg").value.trim();

    if(!name || !email || !message){

      showPopup("Please fill all fields","error");
      return;

    }

    const params = {

      from_name: name,
      from_email: email,
      message: message

    };

    emailjs.send(
        "service_3uiiytj",
        "template_42tb1il",
        params
    )

        .then(()=>{

          showPopup(
              "Message sent successfully",
              "success"
          );

          document
              .getElementById("contact-form")
              .reset();

        })

        .catch(()=>{

          showPopup(
              "Failed to send message",
              "error"
          );

        });

  }
  function showPopup(message,type){

    const popup = document.createElement("div");

    popup.className =
        `popup-msg ${type}`;

    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(()=>{
      popup.classList.add("show");
    },50);

    setTimeout(()=>{

      popup.classList.remove("show");

      setTimeout(()=>{
        popup.remove();
      },400);

    },3000);

  }

