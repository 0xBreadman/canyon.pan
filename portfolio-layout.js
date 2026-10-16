/* Content is kept in the original document; the index presents it as project strips. */
const sourceMain=document.querySelector('main');
sourceMain.hidden=true;
document.querySelector('footer').hidden=true;
document.querySelector('.cursor-dot').hidden=true;
copy.splice(0,4);
const topbar=document.querySelector('.site-header');
topbar.querySelector('nav').remove();
topbar.insertAdjacentHTML('beforeend','<span class="studio-signature">CANYON PAN — CONTENT & VISUAL PRACTICE</span><a class="top-contact" href="#contact">GET IN TOUCH ↗</a>');
const app=document.createElement('div');app.className='studio-app';
app.innerHTML='<aside class="studio-sidebar"><div class="studio-breadcrumb">CANYON PAN / PORTFOLIO</div><nav aria-label="Sections"></nav><div class="studio-filter"><button class="filter-toggle" aria-expanded="false">Filter +</button><div class="filter-options" hidden></div></div><div class="sidebar-bottom">GUANGZHOU · CHINA<br>CONTENT / MOTION / WEB<br><span>2020 — 2026</span></div></aside><div class="studio-content" id="studio-content"></div>';
sourceMain.before(app);
const outlet=app.querySelector('.studio-content');
const tr=(en,zh)=>document.documentElement.lang==='zh-CN'?zh:en;
const entries=[...document.querySelectorAll('.case-card')].map((card,i)=>({id:'web-'+i,type:'web',title:()=>card.querySelector('.case-meta span').textContent,subtitle:()=>card.querySelector('h2').textContent,description:()=>card.querySelector('p').textContent,media:[...card.querySelectorAll('img')].map(img=>({src:img.getAttribute('src'),alt:img.alt}))}));
portfolio.forEach((group,i)=>entries.push({id:'film-'+i,type:'film',title:()=>tr(group.title,groupZh[group.title]),subtitle:()=>tr('Film, content & motion','视频、内容与动态影像'),description:()=>tr('Selected production work. Play each film to see the complete composition.','精选制作案例。点击播放，查看每部作品的完整画面。'),media:group.items.map(([file,label])=>({src:portfolioMediaUrl(webFilename[file]||file),video:true,alt:label}))}));
let filter='all',cleanup=()=>{};
const chapter=()=>({top:'profile',about:'profile',experience:'projects','site-cases':'work',archive:'work'})[location.hash.slice(1)] || (['profile','projects','contact'].includes(location.hash.slice(1))?location.hash.slice(1):'work');
function mediaElement(m,detail=false){const el=document.createElement(m.video?'video':'img');if(m.video){el.muted=!detail;el.controls=detail;el.playsInline=true;el.preload='metadata';el.loop=!detail;el.dataset.media=m.src;el.addEventListener('loadedmetadata',()=>{el.style.aspectRatio=el.videoWidth+'/'+el.videoHeight;});}else{el.src=m.src;el.alt=m.alt;el.loading='lazy';}return el;}
function startMedia(){const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.media;if(!v.controls)v.play().catch(()=>{});}else v.pause();}),{rootMargin:'100px',threshold:.1});outlet.querySelectorAll('video').forEach(v=>io.observe(v));cleanup=()=>{io.disconnect();outlet.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.load();});};}
function render(){cleanup();outlet.replaceChildren();const section=chapter();
 app.querySelector('nav').innerHTML=[['profile','Profile','个人简介'],['work','Work','作品'],['projects','Projects','项目经历'],['contact','Contact','联系方式']].map(([id,en,zh],i)=>`<a href="#${id}" ${section===id?'aria-current="page"':''}><span>${tr(en,zh)}</span><small>0${i+1}</small></a>`).join('');
 app.querySelector('.studio-filter').hidden=section!=='work';
 app.querySelector('.filter-toggle').textContent=tr('Filter','筛选')+' +';
 app.querySelector('.filter-options').innerHTML=[['all','All','全部'],['web','Web design','网站设计'],['film','Film & motion','视频与动态']].map(([id,en,zh])=>`<button data-filter="${id}" aria-pressed="${id===filter}">${tr(en,zh)}</button>`).join('');
 app.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render();});
 const detailId=location.hash.startsWith('#case/')?location.hash.slice(6):null;
 const selected=entries.find(e=>e.id===detailId);
 if(selected){outlet.innerHTML=`<a class="back-work" href="#work">← ${tr('Back to work','返回作品')}</a><div class="detail-heading"><h1></h1><p></p></div><div class="detail-media"></div>`;outlet.querySelector('h1').textContent=selected.title();outlet.querySelector('.detail-heading p').textContent=selected.description();selected.media.forEach(m=>outlet.querySelector('.detail-media').append(mediaElement(m,true)));}
 else if(section==='work'){
 entries.filter(e=>filter==='all'||e.type===filter).forEach(e=>{const row=document.createElement('article');row.className='studio-row';row.innerHTML='<div class="studio-strip" tabindex="0" aria-label="Scroll project images"></div><div class="studio-caption"><a></a><span></span><a class="view-project"></a></div>';const rail=row.querySelector('.studio-strip');e.media.forEach(m=>{const a=document.createElement('a');a.href='#case/'+e.id;a.setAttribute('aria-label',e.title());a.append(mediaElement(m));rail.append(a);});row.querySelector('.studio-caption a').textContent=e.title();row.querySelector('.studio-caption a').href='#case/'+e.id;row.querySelector('.studio-caption span').textContent=e.subtitle();const link=row.querySelector('.view-project');link.href='#case/'+e.id;link.textContent=tr('View project ↗','查看项目 ↗');outlet.append(row);
 let down=false,start=0,left=0,moved=false;rail.addEventListener('pointerdown',ev=>{if(ev.pointerType!=='mouse')return;down=true;moved=false;start=ev.clientX;left=rail.scrollLeft;});rail.addEventListener('pointermove',ev=>{if(!down)return;const dx=ev.clientX-start;if(Math.abs(dx)>5){moved=true;rail.scrollLeft=left-dx;}});rail.addEventListener('pointerup',()=>down=false);rail.addEventListener('pointerleave',()=>down=false);rail.addEventListener('dragstart',ev=>ev.preventDefault());rail.addEventListener('click',ev=>{if(moved){ev.preventDefault();moved=false;}});
 });}
 else{const selectors={profile:['.hero','#about'],projects:['#projects','#experience'],contact:['#contact']}[section];selectors.forEach(s=>{const clone=sourceMain.querySelector(s).cloneNode(true);clone.hidden=false;clone.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));clone.removeAttribute('id');outlet.append(clone);});}
 // Repeat short still-image sequences, keeping original compositions intact.
 outlet.querySelectorAll('.studio-strip').forEach(rail=>{if(rail.querySelector('video'))return;const originals=[...rail.children];for(let repeat=0;repeat<5;repeat++)originals.forEach(a=>{const duplicate=a.cloneNode(true);duplicate.tabIndex=-1;duplicate.setAttribute('aria-hidden','true');rail.append(duplicate);});rail.dataset.sequence=originals.length;});
 startMedia();window.scrollTo({top:0,behavior:'instant'});
}
app.querySelector('.filter-toggle').onclick=()=>{const b=app.querySelector('.filter-toggle'),box=app.querySelector('.filter-options');box.hidden=!box.hidden;b.setAttribute('aria-expanded',String(!box.hidden));};
document.querySelector('.lang-switch').addEventListener('click',render);
window.addEventListener('hashchange',render);
// A slow autonomous strip motion pauses whenever the visitor takes control.
let previous=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function drift(t){const dt=Math.min(t-previous,40);previous=t;if(!reduced.matches&&!document.hidden)outlet.querySelectorAll('.studio-strip').forEach(r=>{if(r.matches(':hover,:focus-within')||r.scrollWidth<=r.clientWidth)return;const direction=Number(r.dataset.direction||1);r.scrollLeft+=dt*.018*direction;if(r.dataset.sequence){const loop=r.children[Number(r.dataset.sequence)].offsetLeft-r.children[0].offsetLeft;if(loop>0&&r.scrollLeft>=loop)r.scrollLeft-=loop;}else if(r.scrollLeft>=r.scrollWidth-r.clientWidth-1)r.dataset.direction='-1';else if(r.scrollLeft<=0)r.dataset.direction='1';});requestAnimationFrame(drift);}render();requestAnimationFrame(drift);
