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
const entries=[...document.querySelectorAll('.case-card')].map((card,i)=>({id:'web-'+i,type:'web',title:()=>tr(['Lingerie','Jewelry','Footwear','Workspace'][i],['内衣','首饰','球鞋','桌搭'][i]),subtitle:()=>card.querySelector('h2').innerHTML.replace(/<br\s*\/?\s*>/gi,' ').replace(/<[^>]*>/g,''),description:()=>card.querySelector('p').textContent,media:[...card.querySelectorAll('img')].map(img=>({src:img.getAttribute('src'),alt:img.alt}))}));
portfolio.forEach((group,i)=>entries.push({id:'film-'+i,type:'film',title:()=>tr(group.title,groupZh[group.title]),subtitle:()=>tr(group.items.length+' selected films',group.items.length+' 部精选作品'),description:()=>tr('Selected production work. Play each film to see the complete composition.','精选制作案例。点击播放，查看每部作品的完整画面。'),media:group.items.map(([file,label])=>({src:portfolioMediaUrl(webFilename[file]||file),video:true,alt:label}))}));
let filter='web',cleanup=()=>{};
const chapter=()=>location.hash.startsWith('#case/')?(location.hash.includes('film-')?'films':'websites'):({top:'profile',about:'profile',experience:'projects',work:'websites','site-cases':'websites',archive:'films'})[location.hash.slice(1)] || (['profile','projects','contact','films','websites'].includes(location.hash.slice(1))?location.hash.slice(1):'websites');
function mediaElement(m,detail=false){const el=document.createElement(m.video?'video':'img');if(m.video){el.muted=!detail;el.controls=detail;el.playsInline=true;el.preload='metadata';el.loop=!detail;el.dataset.media=m.src;el.addEventListener('loadedmetadata',()=>{if(detail)el.style.aspectRatio=el.videoWidth+'/'+el.videoHeight;else el.currentTime=Math.min(2,el.duration*.15);});}else{el.src=m.src;el.alt=m.alt;el.loading='lazy';}return el;}
function startMedia(){const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.media;}else v.pause();}),{rootMargin:'100px',threshold:.1});outlet.querySelectorAll('video').forEach(v=>io.observe(v));cleanup=()=>{io.disconnect();outlet.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.load();});};}
function renderFilmGallery(selected, gallery){
 const formats=[['wide','wide'],['wide','wide','wide','wide'],Array(6).fill('portrait'),Array(11).fill('portrait'),['portrait','wide'],['square','square','square','wide','wide','classic','classic'],['square','square','square','portrait','portrait'],Array(6).fill('portrait')][Number(selected.id.split('-')[1])];
 gallery.classList.add('film-gallery');
 const labels={wide:['Landscape','横屏'],portrait:['Portrait','竖屏'],square:['Square','方形'],classic:['Portrait · 3:4','竖屏 · 3:4']};
 const groups=[...new Set(formats)];
 groups.forEach(format=>{
  const section=document.createElement('section');section.className='film-format';
  if(groups.length>1){const heading=document.createElement('h2');heading.textContent=tr(...labels[format]);section.append(heading);}
  const grid=document.createElement('div');grid.className='film-grid film-grid--'+format;
  selected.media.forEach((m,i)=>{if(formats[i]!==format)return;const figure=document.createElement('figure');figure.className='film-item';const video=mediaElement(m,true);video.setAttribute('aria-label',selected.title()+' '+(i+1));const caption=document.createElement('figcaption');caption.textContent=String(i+1).padStart(2,'0');figure.append(video,caption);grid.append(figure);});
  section.append(grid);gallery.append(section);
 });
}
function render(){cleanup();outlet.replaceChildren();const section=chapter();outlet.dataset.page=section;
 app.querySelector('nav').innerHTML=[['profile','Profile','个人简介'],['websites','Websites','网站案例'],['films','Films','视频作品'],['projects','Projects','项目经历'],['contact','Contact','联系方式']].map(([id,en,zh],i)=>`<a href="#${id}" ${section===id?'aria-current="page"':''}><span>${tr(en,zh)}</span><small>0${i+1}</small></a>`).join('');
 app.querySelector('.studio-filter').hidden=true;
 app.querySelector('.filter-toggle').textContent=tr('Filter','筛选')+' +';
 app.querySelector('.filter-options').innerHTML=[['all','All','全部'],['web','Web design','网站设计'],['film','Film & motion','视频与动态']].map(([id,en,zh])=>`<button data-filter="${id}" aria-pressed="${id===filter}">${tr(en,zh)}</button>`).join('');
 app.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render();});
 const detailId=location.hash.startsWith('#case/')?location.hash.slice(6):null;
 const selected=entries.find(e=>e.id===detailId);
 if(selected){outlet.innerHTML=`<a class="back-work" href="#${section}">← ${tr('Back to work','返回作品')}</a><div class="detail-heading"><h1></h1><p></p></div><div class="detail-media"></div>`;outlet.querySelector('h1').textContent=selected.title();outlet.querySelector('.detail-heading p').textContent=selected.description();const gallery=outlet.querySelector('.detail-media');if(selected.type==='film')renderFilmGallery(selected,gallery);else selected.media.forEach(m=>gallery.append(mediaElement(m,true)));}
 else if(section==='websites'||section==='films'){
 const film=section==='films';filter=film?'film':'web';
 outlet.innerHTML=`<header class="collection-heading"><div><span>${film?'03 / FILM & MOTION':'02 / DIGITAL EXPERIENCES'}</span><h1>${film?tr('Film & motion','视频作品'):tr('Website design','网站案例')}</h1></div><p>${film?tr('Brand stories, product films and social content.','品牌叙事、产品影像与社媒内容。'):tr('Four visual worlds. Each with its own point of view.','四种视觉世界，各自表达清晰的观点。')}</p></header><div class="collection-grid"></div>`;
 entries.filter(e=>filter==='all'||e.type===filter).forEach(e=>{const row=document.createElement('article');row.className='studio-row';row.dataset.case=e.id;row.innerHTML='<div class="studio-strip" aria-label="Project preview"></div><div class="studio-caption"><a></a><span></span><a class="view-project"></a></div>';const rail=row.querySelector('.studio-strip');e.media.slice(0,1).forEach(m=>{const a=document.createElement('a');a.href='#case/'+e.id;a.setAttribute('aria-label',e.title());a.append(mediaElement(e.type==='film'?{src:e.id==='film-0'?'./assets/project-evidence/project-02-film-01.png':'./assets/covers/canyon-'+e.id+'.webp',alt:e.title()}:m));rail.append(a);});row.querySelector('.studio-caption a').textContent=e.title();row.querySelector('.studio-caption a').href='#case/'+e.id;row.querySelector('.studio-caption span').textContent=e.subtitle();const link=row.querySelector('.view-project');link.href='#case/'+e.id;link.textContent=tr('View project ↗','查看项目 ↗');outlet.querySelector('.collection-grid').append(row);
 let down=false,start=0,left=0,moved=false;rail.addEventListener('pointerdown',ev=>{if(ev.pointerType!=='mouse')return;down=true;moved=false;start=ev.clientX;left=rail.scrollLeft;});rail.addEventListener('pointermove',ev=>{if(!down)return;const dx=ev.clientX-start;if(Math.abs(dx)>5){moved=true;rail.scrollLeft=left-dx;}});rail.addEventListener('pointerup',()=>down=false);rail.addEventListener('pointerleave',()=>down=false);rail.addEventListener('dragstart',ev=>ev.preventDefault());rail.addEventListener('click',ev=>{if(moved){ev.preventDefault();moved=false;}});
 });}
 else{const selectors={profile:['.hero','#about'],projects:['#projects','#experience'],contact:['#contact']}[section];selectors.forEach(s=>{const clone=sourceMain.querySelector(s).cloneNode(true);clone.hidden=false;clone.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));clone.removeAttribute('id');outlet.append(clone);});}
 applyPresentation();startMedia();window.scrollTo({top:0,behavior:'instant'});
}
app.querySelector('.filter-toggle').onclick=()=>{const b=app.querySelector('.filter-toggle'),box=app.querySelector('.filter-options');box.hidden=!box.hidden;b.setAttribute('aria-expanded',String(!box.hidden));};
document.querySelector('.lang-switch').addEventListener('click',render);
window.addEventListener('hashchange',render);
function applyPresentation(){
 if(chapter()==='profile')renderProfileCapabilities();
 outlet.querySelectorAll('.project-card').forEach(card=>{
  const main=card.querySelector('.project-main'),company=main.querySelector('.project-company'),index=card.querySelector('.project-index');
  const meta=document.createElement('div');meta.className='project-heading-meta';company.before(meta);meta.append(index,company);
  const role=main.querySelector('.project-roleline');if(role)main.querySelector('h2').after(role);
  const result=card.querySelector('.project-result');
  [...result.querySelectorAll('strong')].forEach(strong=>{const description=strong.nextElementSibling;if(description?.tagName==='SPAN'){const item=document.createElement('div');item.className='project-metric';strong.before(item);item.append(strong,description);}});
 });
 const zh=document.documentElement.lang==='zh-CN';
 topbar.querySelector('.studio-signature').textContent=tr('CANYON PAN — CONTENT & VISUAL PRACTICE','CANYON PAN — 内容策划与视觉实践');
 topbar.querySelector('.top-contact').textContent=tr('CONTACT','联系我');
 app.querySelector('.studio-breadcrumb').textContent=tr('CANYON PAN / PORTFOLIO','CANYON PAN / 个人作品集');
 app.querySelector('.sidebar-bottom').innerHTML=tr('GUANGZHOU · CHINA<br>CONTENT / MOTION / WEB','中国 · 广州<br>内容 / 影像 / 网站')+'<span>2020 — 2026</span>';
 const overline=outlet.querySelector('.collection-heading>div>span');
 if(overline)overline.textContent=chapter()==='films'?tr('03 / FILM & MOTION','03 / 视频与动态影像'):tr('02 / DIGITAL EXPERIENCES','02 / 网站设计');
 const portrait=outlet.querySelector('.hero-portrait figcaption');if(portrait)portrait.textContent=tr('Canyon Pan · INTJ','潘谕 Canyon · INTJ');
 outlet.querySelectorAll('.project-evidence figcaption').forEach(node=>{const parts=node.textContent.split(' / ');if(parts.length===2)node.textContent=tr(parts[0],parts[1]);});
 outlet.querySelectorAll('.timeline-item h3').forEach((node,i)=>{if(zh)node.textContent=['赢盛科技','广州赫特信息科技','吉米生物科技','甜秘密 / 优美科技'][i]||node.textContent;});
 if(zh)outlet.querySelectorAll('.timeline-item>span').forEach(node=>node.textContent=node.textContent.replace('now','至今'));
 outlet.querySelectorAll('.project-tool-media img').forEach(img=>{const frame=document.createElement('div');frame.className='tool-flat-frame';img.before(frame);frame.append(img);});
 if(chapter()==='contact')renderContact();
 const walker=document.createTreeWalker(app,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode())n.nodeValue=n.nodeValue.replace(/[←-⇿➔➜➝➞➟➠➤➥➦➧➨➩➪➫➬➭➮➯➱➲]/g,'');
 document.querySelector('.lang-switch').setAttribute('aria-label',zh?'切换为英文':'Switch to Chinese');
}
function renderProfileCapabilities(){
 const intro=outlet.querySelector('.intro');
 outlet.querySelector('.hero-copy').textContent=tr('Content planner & video producer. From creative direction to filming, editing and AI-assisted production.','内容策划 / 视频编导，贯通创意、拍摄、后期与 AI 辅助生产。');
 const skills=[
  ['Content planning','内容策划','Brand stories · Campaign concepts · Scripts & storyboards','品牌内容 · 活动创意 · 脚本分镜','Briefs / Script templates','需求拆解 / 脚本模板','#projects','Explore projects','查看项目'],
  ['Film production','视频制作','On-set production · Editing · Ad creative iterations','拍摄执行 · 剪辑后期 · 广告素材迭代','Video structure tests / Asset standards','视频结构测试 / 素材标准','#films','Watch films','查看影片'],
  ['Visual delivery','视觉落地','Site content · Product visuals · AI images & video','独立站内容 · 产品视觉 · AI 图像与视频','Prompt design / Image-to-video','提示词设计 / 图生视频','#websites','Explore websites','查看网站案例'],
  ['Workflow tools','效率工具','Prompt management · Content libraries · Team workflows','提示词管理 · 内容资产库 · 团队协作流程','Prompt Dock / Work-order automation','Prompt Dock / 工单自动化','#projects','See workflow projects','查看工具与流程项目']
 ];
 intro.className='profile-overview';
 intro.innerHTML=`<div class="profile-section-heading"><span>01 / ${tr('CAPABILITIES','能力概览')}</span><h2>${tr('What I bring to the work.','从想法到交付，我能做什么。')}</h2></div><div class="capability-grid">${skills.map((s,i)=>`<article class="capability-item"><span class="capability-number">0${i+1}</span><h3>${tr(s[0],s[1])}</h3><p>${tr(s[2],s[3])}</p><p class="capability-method">${tr(s[4],s[5])}</p><a href="${s[6]}">${tr(s[7],s[8])}</a></article>`).join('')}</div><div class="profile-workflow"><h3>${tr('HOW I WORK','日常工作流')}</h3><ol>${[['Define the brief','需求梳理'],['Plan the script','脚本策划'],['Film / AI creation','拍摄 / AI 生成'],['Edit & deliver','剪辑交付'],['Test & refine','测试复盘']].map((s,i)=>`<li><span>0${i+1}</span>${tr(...s)}</li>`).join('')}</ol></div>`;
}
function renderContact(){
 const original=sourceMain.querySelector('#contact');
 outlet.innerHTML=`<section class="contact-sheet"><p class="contact-overline">${tr('05 / CONTACT','05 / 联系方式')}</p><h1>${tr('Let’s make it happen.','一起把想法落地。')}</h1><p class="contact-intro">${tr('Content planning, film production and visual experiences.','内容策划、视频制作与视觉体验。')}</p><div class="contact-direct"><a href="mailto:py1844636897@foxmail.com">py1844636897@foxmail.com</a><a class="contact-resume" download="Canyon-Pan-CV.pdf">${tr('Download résumé','下载简历')}</a></div><div class="contact-qr-pair"></div><p class="contact-location">${tr('Canyon Pan · Guangzhou, China','潘谕 Canyon · 中国广州')}</p></section>`;
 outlet.querySelector('.contact-resume').href=original.querySelector('.cv-download').href;
 [['wechat','WeChat','微信'],['linkedin','LinkedIn','领英']].forEach(([id,en,cn])=>{
 const figure=document.createElement('figure');figure.className='contact-code '+id;
 const img=original.querySelector('.'+id+'-qr-frame img').cloneNode(true);
 figure.innerHTML='<div class="qr-paper"><div class="qr-code"></div></div><figcaption><strong></strong><span></span></figcaption>';
 figure.querySelector('.qr-code').append(img);figure.querySelector('strong').textContent=tr(en,cn);
 figure.querySelector('figcaption span').textContent=tr('Scan to connect','扫码联系');
 if(id==='linkedin'){const a=document.createElement('a');a.href=original.querySelector('.linkedin-card figcaption a').href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=tr('Open profile','查看主页');figure.querySelector('figcaption span').replaceWith(a);}
 outlet.querySelector('.contact-qr-pair').append(figure);
 });
}
let savedLanguage;try{savedLanguage=localStorage.getItem('canyon-language');}catch{}
setLanguage(savedLanguage==='en'?'en':'zh');
render();
