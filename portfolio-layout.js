/* Four independently browsable chapters, with persistent deep links. */
const chapterMap = {profile:['.hero','#about'],work:['#work','#site-cases','#archive'],projects:['#projects','#experience'],contact:['#contact']};
const chapterLabels = {profile:['Profile','个人简介'],work:['Work','作品'],projects:['Projects','项目经历'],contact:['Contact','联系方式']};
const sidebar = document.querySelector('.site-header');
sidebar.querySelector('nav').innerHTML = Object.entries(chapterLabels).map(([id,labels],i)=>`<a href="#${id}" data-chapter="${id}"><small>0${i+1}</small><span>${labels[0]}</span></a>`).join('');
const identity = document.createElement('div');
identity.className='sidebar-identity';
identity.innerHTML='<strong>Canyon Pan</strong><span>Content & visual practice</span><span>Guangzhou, China</span>';
sidebar.querySelector('.mark').after(identity);
const workHeader=document.createElement('div');
workHeader.className='work-index';
workHeader.innerHTML='<h1>Selected work<span>2020 — 2026</span></h1><div class="work-filters" aria-label="Work categories"><button data-filter="all" aria-pressed="true">All</button><button data-filter="film" aria-pressed="false">Film & motion</button><button data-filter="web" aria-pressed="false">Web design</button></div>';
document.querySelector('#work').prepend(workHeader);
const applyLayoutLanguage=()=>{
 const zh=document.documentElement.lang==='zh-CN';
 sidebar.querySelectorAll('[data-chapter]').forEach(a=>{a.querySelector('span').textContent=chapterLabels[a.dataset.chapter][zh?1:0];});
 workHeader.querySelector('h1').innerHTML=`${zh?'精选作品':'Selected work'}<span>2020 — 2026</span>`;
 workHeader.querySelectorAll('button').forEach((b,i)=>b.textContent=(zh?['全部','视频与动态','网站设计']:['All','Film & motion','Web design'])[i]);
};
// The original bilingual table targets navigation positions; these now belong to the sidebar.
copy.splice(0,4);
document.querySelector('.lang-switch').addEventListener('click',applyLayoutLanguage);
const selectChapter=()=>{
 const hash=location.hash.slice(1);
 const chapter=({about:'profile',top:'profile',experience:'projects','site-cases':'work',archive:'work'})[hash] || (chapterMap[hash]?hash:'work');
 Object.entries(chapterMap).forEach(([key,selectors])=>selectors.forEach(s=>{document.querySelector(s).hidden=key!==chapter;}));
 document.body.dataset.chapter=chapter;
 sidebar.querySelectorAll('[data-chapter]').forEach(a=>{if(a.dataset.chapter===chapter)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 document.querySelectorAll('video').forEach(v=>{if(v.closest('[hidden]'))v.pause();});
 requestAnimationFrame(()=>{const target=document.getElementById(hash);if(target && !['work','projects','contact'].includes(hash))target.scrollIntoView({behavior:'instant',block:'start'});else window.scrollTo({top:0,behavior:'instant'});updateRailStates();});
};
workHeader.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
 document.body.dataset.workFilter=b.dataset.filter;
 workHeader.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
 document.querySelectorAll('video').forEach(v=>{if(!v.getClientRects().length)v.pause();});
 requestAnimationFrame(updateRailStates);
}));
window.addEventListener('hashchange',selectChapter);
applyLayoutLanguage();selectChapter();
