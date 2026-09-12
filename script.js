const dot = document.querySelector('.cursor-dot');
window.addEventListener('pointermove', (event) => { if (dot) { dot.style.left = `${event.clientX}px`; dot.style.top = `${event.clientY}px`; } });
const portfolio = [
  {title:'Brand collaborations', items:[['SW-吾皇联名.mp4','Brand collaboration'],['联名创意小短片-1.mp4','Brand collaboration']]},
  {title:'Brand promotion', items:[['【无水印】1202甜秘密30S.mp4','Brand film'],['M010-3.mp4','Brand film'],['M010-2.mp4','Brand film'],['自然会有好梦.mp4','Brand film']]},
  {title:'Product introductions', items:[['1080aa95bf6e097a17d187a30e34b193.MP4','Product introduction'],['YXMB-A0215-MY-TT-240321.mp4','Product introduction'],['除臭喷雾(马来西亚）-A1-1-31.mp4','Product introduction'],['腋下美白（马来西亚）A2-2023-12-20.mp4','Product introduction'],['MBJH-A0034-PH-TT-240319.mp4','Product introduction'],['SaveClip-product-intro.mp4','Product introduction']]},
  {title:'Social media', items:[['四喜包包Vlog.MP4','Social content'],['cyx-260728-假发帽.mp4','Social content'],['20250909-141124.mp4','Social content'],['SaveClip-social-reference.mp4','Social content'],['20250909-150147.mp4','Social content'],['1(2).mp4','Social content'],['20250909-151104.mp4','Social content'],['LZS-260721-HRLD56M-WIG-N-BNC-26-officialdiior(1).mp4','Social content'],['grok-20fdcc96-895b-4755-b89d-97adb18ff2c7-720p.mp4','Social content'],['111.mov','Social content'],['cyx-260812-FDM56C-WIG-TP4M613-ST-12.mp4','Social content']]},
  {title:'Offline campaigns', items:[['甜秘密达人线下采访.mp4','Offline campaign'],['大赛宣传视频2.mp4','Offline campaign']]},
  {title:'E-commerce main visuals', items:[['主图-去角质-英语.mp4','E-commerce main visual'],['主图-懒人霜-英语.mp4','E-commerce main visual'],['主图-除臭喷雾-英语.mp4','E-commerce main visual'],['GAME-4523.mov','E-commerce main visual'],['0317甜秘密风窝垫稿无水印.mp4','E-commerce main visual'],['丹左.mp4','E-commerce main visual'],['罗尔丹.mp4','E-commerce main visual']]},
  {title:'Feed advertising', items:[['CCPW+YXMB-A0725-PH-FB-240521.mp4','Feed advertising'],['XCJSZL+YXMB-A0411-ID-FB-240522.mp4','Feed advertising'],['去角质啫喱Y-A35-FB-PH-240123.mp4','Feed advertising'],['视频2.mp4','Feed advertising'],['视频1.mp4','Feed advertising']]},
  {title:'AI advertising', items:[['arabellahairofficial.mp4','AI advertising'],['grok-85a26efa-cb9a-4043-881c-f4c7de5a7bfc-720p.mp4','AI advertising'],['ai-ad-manager-01.mp4','AI advertising'],['ai-ad-manager-02.mp4','AI advertising'],['grok-62b25bef-5593-4f82-a948-b86438cb06fb-720p.mp4','AI advertising'],['CYX-260825-LDNETE-WIG-N-BNC.mp4','AI advertising']]}
];
const webReady = new Set(portfolio.flatMap((group) => group.items.map(([file]) => file)));
const webFilename = {'GAME-4523.mov':'GAME-4523.mp4','111.mov':'111.mp4'};
const portfolioAssetBase = location.hostname === '0xbreadman.github.io' ? 'https://github.com/0xBreadman/canyon.pan/releases/download/media-v1' : './assets/portfolio-web';
const portfolioMediaName = new Map(portfolio.flatMap((group) => group.items).map(([file], index) => [webFilename[file] || file, `media-${String(index + 1).padStart(3, '0')}.mp4`]));
const portfolioMediaUrl = (file) => `${portfolioAssetBase}/${encodeURIComponent(location.hostname === '0xbreadman.github.io' ? portfolioMediaName.get(file) : file)}`;
const releaseAssetBase = 'https://github.com/0xBreadman/canyon.pan/releases/download/media-v1';
if (location.hostname === '0xbreadman.github.io') {
  document.querySelectorAll('img[src="./assets/site-cases/jewelry-shop.png"]').forEach((image) => { image.src = `${releaseAssetBase}/jewelry-shop.png`; });
  document.querySelectorAll('a[href="./assets/portfolio/个人简历.pdf"]').forEach((link) => { link.href = `${releaseAssetBase}/${encodeURIComponent('个人简历.pdf')}`; });
}
document.querySelectorAll('.media-frame video[data-media-file]').forEach((video) => { video.src = portfolioMediaUrl(video.dataset.mediaFile); });
const groupZh = {'Brand collaborations':'品牌联名','Brand promotion':'品牌宣传内容','Product introductions':'产品介绍','Social media':'社媒视频','Offline campaigns':'线下活动宣传','E-commerce main visuals':'电商主图','Feed advertising':'信息流广告类','AI advertising':'AI 类广告'};
const labelZh = {'Brand collaboration':'品牌联名','Brand film':'品牌宣传','Product introduction':'产品介绍','Social content':'社媒内容','Offline campaign':'线下活动','E-commerce main visual':'电商主图','Feed advertising':'信息流广告','AI advertising':'AI 广告'};
const gallery = document.querySelector('#portfolio-gallery');
if (gallery) portfolio.forEach((group, groupIndex) => {
  const section = document.createElement('section'); section.className = `gallery-group items-${group.items.length}`;
  section.dataset.enTitle = group.title; section.dataset.zhTitle = groupZh[group.title] || group.title;
  section.innerHTML = `<div class="gallery-group-head"><h3>${group.title}</h3><span>${group.items.length} pieces</span></div><div class="gallery-grid" tabindex="0" aria-label="${group.title} portfolio — scroll horizontally"></div>`;
  const grid = section.querySelector('.gallery-grid');
  group.items.forEach(([file, label], index) => {
    const item = document.createElement('article'); item.className = 'gallery-item';
    const video = document.createElement('video'); const resolvedFile = webFilename[file] || file; video.dataset.src = portfolioMediaUrl(resolvedFile); video.muted = true; video.loop = true; video.playsInline = true; video.preload = 'none';
    video.addEventListener('loadedmetadata', () => { if (video.videoWidth && video.videoHeight) item.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`; });
    item.dataset.enLabel = label; item.dataset.zhLabel = labelZh[label] || label;
    const pieceNumber = `${String(groupIndex + 1).padStart(2,'0')}.${String(index + 1).padStart(2,'0')}`;
    item.append(video); item.insertAdjacentHTML('beforeend', `<div class="gallery-caption">${pieceNumber}<span>${label}</span></div>`); grid.append(item);
  }); gallery.append(section);
});
const updateRailStates = () => document.querySelectorAll('.gallery-group').forEach((group) => {
  const rail = group.querySelector('.gallery-grid');
  group.classList.toggle('can-scroll', rail.scrollWidth > rail.clientWidth + 2);
});
requestAnimationFrame(updateRailStates);
window.addEventListener('resize', updateRailStates);
const railObserver = new ResizeObserver(updateRailStates);
document.querySelectorAll('.gallery-grid, .gallery-grid video').forEach((node) => railObserver.observe(node));
const lazyVideoObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  const video = entry.target;
  if (!video.hasAttribute('src') && video.dataset.src) {
    video.src = video.dataset.src;
    video.load();
  }
  lazyVideoObserver.unobserve(video);
}), {rootMargin:'600px 0px'});
document.querySelectorAll('.gallery-item video[data-src]').forEach((video) => lazyVideoObserver.observe(video));
const videos = document.querySelectorAll('video');
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  const video = entry.target;
  video.dataset.inView = entry.isIntersecting ? 'true' : 'false';
  if (entry.isIntersecting && video.hasAttribute('src')) video.play().catch(() => {});
  else video.pause();
}), {threshold:.15});
videos.forEach((video) => observer.observe(video));
videos.forEach((video) => {
  video.addEventListener('loadedmetadata', updateRailStates);
  video.addEventListener('canplay', () => { if (video.dataset.inView === 'true') video.play().catch(() => {}); });
  video.addEventListener('play', () => video.classList.add('is-playing'));
  video.addEventListener('pause', () => video.classList.remove('is-playing'));
});

const copy = [
  ['.site-header nav a:nth-child(1)','Selected work','精选作品'],['.site-header nav a:nth-child(2)','Projects','项目经历'],['.site-header nav a:nth-child(3)','Experience','工作经历'],['.site-header nav a:nth-child(4)','About','关于我'],
  ['.hero-kicker','Content Lead · Visual Planner · Video Producer','内容负责人 · 视觉策划 · 视频编导'],
  ['.hero-name','Canyon Pan / Yu Pan · INTJ','Canyon Pan / 潘谕 · INTJ'],
  ['.eyebrow','Guangzhou · China / Available for cross-border content work','中国 · 广州 / 可承接跨境内容项目'],
  ['.hero h1','Ideas that<br /><em>move</em> brands.','让想法<br /><em>推动</em>品牌。'],
  ['.hero-copy','I build visual content systems across video, social, advertising and independent sites — from the first script to the asset that gets tested.','我负责从脚本、拍摄到交付的视觉内容系统，覆盖视频、社媒、广告和独立站，让一次内容需求变成可以测试和复用的资产。'],
  ['.hero-actions .button','Explore work <span>↘</span>','查看作品 <span>↘</span>'],
  ['.hero-actions .cv-hero-link','Download résumé <span>↓</span>','下载简版简历 <span>↓</span>'],
  ['.hero-actions .contact-jump','Contact <span>↘</span>','联系方式 <span>↘</span>'],
  ['.hero-stamp','<span>CONTENT</span><strong>05</strong><span>YEARS IN MOTION</span>','<span>CONTENT</span><strong>05</strong><span>年持续创作</span>'],
  ['#about .section-label','01 / Profile','01 / 关于我'],
  ['.display-copy','A formally trained content planner and video producer.','科班出身的内容策划 / 视频编导。'],
  ['.intro-copy p:not(.display-copy)','I bring end-to-end experience across scripting, production, editing and visual content delivery for brand content, social media, independent sites and advertising. Because I understand the full path from idea to shoot to edit, I can anticipate production bottlenecks, coordinate creative resources and turn one-off requests into reusable content assets. I work proactively, turning individual briefs into reviewable workflows: script templates, material standards, video-structure testing, work-order flows, content libraries and AI-assisted production.','具备脚本策划、拍摄执行、剪辑后期与视觉内容落地的完整经验，长期服务品牌内容、社媒内容、独立站与广告素材场景。因为熟悉从创意到拍摄再到剪辑交付的全流程，能够提前判断执行中的卡点，合理调动拍摄、设计、剪辑、红人、投放等资源，提高内容落地效率与复用价值。工作中更偏主动型内容负责人，善于把单次内容需求沉淀为可复盘的工作流，包括脚本模板、素材标准、视频结构测试、工单流转、内容资产库和 AI 辅助生产流程；持续关注新工具和新内容形式，并将 AI 图像、AI 视频、提示词和自动化表格用于团队协作、内容扩量和效率提升。'],
  ['.profile-capabilities div:nth-child(1) strong','Strategy','内容策略'],['.profile-capabilities div:nth-child(1) span','Briefs · scripts · formats · asset standards','需求拆解 · 脚本 · 内容形式 · 素材标准'],['.profile-capabilities div:nth-child(2) strong','Production','全流程制作'],['.profile-capabilities div:nth-child(2) span','Shooting · editing · review · delivery','拍摄 · 剪辑 · 审核 · 交付'],['.profile-capabilities div:nth-child(3) strong','Workflow','工作流'],['.profile-capabilities div:nth-child(3) span','AI image/video · prompts · automation','AI 图像/视频 · 提示词 · 自动化'],
  ['#work .section-label','02 / Selected work','02 / 精选作品'],['#work .section-head p','Campaigns, systems, social and commerce assets.','品牌宣发、内容系统、社媒与电商内容。'],
  ['.work-card:nth-child(1) .card-meta span:nth-child(1)','Brand campaign','品牌宣发'],['.work-card:nth-child(1) h2','From product use<br />to participation.','从产品使用<br />到用户参与。'],['.work-card:nth-child(1) p','Designed a user-participation hair dye campaign that helped a new brand account gain 1,378% net follower growth in 7 days and 70,000+ followers in one month.','策划用户参与型染发活动，将产品使用场景转化为可参与、可传播的内容话题；账号 7 日净增粉 1378%，一个月净增粉丝 7 万+。'],
  ['.work-card:nth-child(2) .card-meta span:nth-child(1)','Content operations','内容运营'],['.work-card:nth-child(2) h2','Turning briefs into<br />reusable assets.','把需求变成<br />可复用资产。'],['.work-card:nth-child(2) p','Built work-order flows, creative libraries, testing records and review standards across two wig brand sites.','为两个假发品牌站点搭建工单流转、创意库、测试记录和审核标准。'],
  ['.work-card:nth-child(3) .card-meta span:nth-child(1)','Brand video','品牌视频'],['.work-card:nth-child(3) h2','Making a collaboration<br />feel alive.','让一次联名<br />真正活起来。'],['.work-card:nth-child(3) p','Planned and delivered campaign films and social assets, balancing brand exposure, IP character and viewing experience.','策划并交付联名影片与社媒素材，在品牌露出、IP 气质和观看体验之间取得平衡。'],
  ['.work-card:nth-child(4) .card-meta span:nth-child(1)','AI content production','AI 内容生产'],['.work-card:nth-child(4) h2','More visual tests,<br />less friction.','更多视觉测试，<br />更少执行摩擦。'],['.work-card:nth-child(4) p','Developed prompt methods, image-to-video workflows and material standards to support advertising and social content expansion.','沉淀提示词方法、图生视频流程和素材标准，支持广告与社媒内容扩量。'],
  ['#projects .section-label','02A / Selected projects','02A / 重要项目经历'],['#projects .section-head p','From creative direction to measurable content systems.','从创意方向到可验证的内容系统。'],
  ['.project-card:nth-child(1) .project-roleline','Campaign strategy · Script · Shooting · Editing','活动策略 · 脚本 · 拍摄 · 剪辑'],
  ['.project-card:nth-child(2) .project-roleline','Creative direction · Script · Production · Post-production','创意方向 · 脚本 · 制作统筹 · 后期'],
  ['.project-card:nth-child(3) .project-roleline','Site content · Creator briefs · Shoot direction · A/B testing','站点内容 · 红人脚本 · 拍摄指导 · A/B 测试'],
  ['.project-card:nth-child(4) .project-roleline','Content strategy · Workflow design · AI production · Team coordination','内容策略 · 工作流设计 · AI 生产 · 团队协同'],
  ['.project-card:nth-child(5) .project-roleline','Product strategy · UX design · Workflow design · Native development','产品策略 · 交互设计 · 工作流设计 · 原生开发'],
  ['.project-card:nth-child(1) .project-company','Youmei Technology · Brand account launch','优美科技 · 品牌账号从 0 到 1'],['.project-card:nth-child(1) h2','Turning product use into a participatory launch.','把产品使用转化为用户参与。'],['.project-card:nth-child(1) .project-summary','Built a new content account around a hair-colour line, using a user-participation campaign and continuous short-form video to complete the cold start.','围绕染发剂产品线搭建品牌内容账号，通过用户参与型活动与持续短视频内容完成账号冷启动。'],['.project-card:nth-child(1) li:nth-child(1)','Designed the campaign concept and participation mechanism.','策划活动主题与用户参与机制。'],['.project-card:nth-child(1) li:nth-child(2)','Led scripting, shooting, editing and publishing asset support.','负责脚本、拍摄、剪辑与发布素材支持。'],['.project-card:nth-child(1) .project-result span:nth-of-type(1)','net follower growth in 7 days','7 日内净增粉丝'],['.project-card:nth-child(1) .project-result span:nth-of-type(2)','net new followers in one month','一个月净增粉丝'],
  ['.project-card:nth-child(2) .project-company','Sweet Secret · Co-branded campaign','甜秘密 · 吾皇联名宣发'],['.project-card:nth-child(2) h2','Translating an IP collaboration into social momentum.','把联名 IP 转化为社媒传播势能。'],['.project-card:nth-child(2) .project-summary','Planned co-branded films and social assets, balancing brand visibility, IP character and the viewing rhythm required by each platform.','策划联名影片与社媒素材，在品牌露出、IP 气质和各平台观看节奏之间取得平衡。'],['.project-card:nth-child(2) li:nth-child(1)','Set the creative direction for campaign shorts and social edits.','制定联名短片与社媒剪辑的创意方向。'],['.project-card:nth-child(2) li:nth-child(2)','Controlled scripts, production communication, pacing and visual delivery.','把控脚本、拍摄沟通、后期节奏与画面交付。'],['.project-card:nth-child(2) .project-result strong','10M-level','千万级'],['.project-card:nth-child(2) .project-result span','cross-platform social buzz','全平台话题声量'],
  ['.project-card:nth-child(3) .project-company','Guangzhou Het · Site and outdoor production','广州赫特 · 独立站与外模拍摄'],['.project-card:nth-child(3) h2','Connecting site pages, creator briefs and ad-ready footage.','连接站点页面、红人创意与广告素材。'],['.project-card:nth-child(3) .project-summary','Planned South Africa site content, product-page improvements, creator concepts and outdoor model production so one shoot could serve site, social and paid-media needs.','统筹南非站点内容、详情页优化、红人创意与场外模特拍摄，使一次拍摄同时服务独立站、社媒和广告需求。'],['.project-card:nth-child(3) li:nth-child(1)','Defined page, product-story and visual-asset requirements.','梳理页面、产品表达与视觉素材需求。'],['.project-card:nth-child(3) li:nth-child(2)','Directed camera framing, product actions and delivery specifications.','指导镜头、产品展示动作与素材规格执行。'],['.project-card:nth-child(3) .project-result span:nth-of-type(1)','monthly Facebook ad GMV uplift','Facebook 信息流广告月度 GMV 增量'],['.project-card:nth-child(3) .project-result span:nth-of-type(2)','ROI sustained for four months','连续四个月保持 ROI'],
  ['.project-card:nth-child(4) .project-company','Winsheng Technology · Content growth system','赢盛科技 · 内容增长系统'],['.project-card:nth-child(4) h2','Making content recordable, testable and reusable.','让内容可记录、可测试、可复用。'],['.project-card:nth-child(4) .project-summary','Connected advertising, social, influencer, AI and independent-site content across two wig-brand sites, turning one-off delivery into a cross-channel operating system.','连接两个假发品牌站点的广告、社媒、红人、AI 与独立站内容，把单次交付转化为跨渠道内容系统。'],['.project-card:nth-child(4) li:nth-child(1)','Built video-structure tests, creative libraries and Facebook asset flows.','搭建视频结构测试、创意库与 Facebook 素材流转链路。'],['.project-card:nth-child(4) li:nth-child(2)','Established AI production methods, work-order automation and content standards.','建立 AI 生产方法、工单自动化与内容标准。'],['.project-card:nth-child(4) .project-result span:nth-of-type(1)','total CTR peak','总 CTR 峰值'],['.project-card:nth-child(4) .project-result span:nth-of-type(2)','influencer-video GMV growth','红人视频 GMV 增长'],['.project-card:nth-child(4) .project-result span:nth-of-type(3)','ROI progressively stabilised','ROI 逐步稳定'],
  ['.project-card:nth-child(5) .project-company','Prompt Dock · Self-initiated open-source tool','Prompt Dock · 自主开源效率工具'],['.project-card:nth-child(5) h2','Compressing a long AI workflow into one gesture.','把冗长的 AI 工作流压缩成一个手势。'],['.project-card:nth-child(5) .project-summary','Designed and built a local-first macOS prompt launcher for frequent work across text, image and video AI tools—turning a personal efficiency problem into a reusable product.','为高频使用文本、图像与视频 AI 工具的场景，设计并制作了一款本地优先的 macOS Prompt 快捷面板，将个人效率问题转化为可复用产品。'],['.project-card:nth-child(5) li:nth-child(1)','Created an always-on-top panel, search, categories and click-to-copy Prompt cards.','实现始终置顶面板、搜索、分类与点击即复制的 Prompt 卡片。'],['.project-card:nth-child(5) li:nth-child(2)','Designed work presets, a gesture-based radial menu, edge shelf and local backup flow.','设计工作预设、手势转盘、屏幕边缘栏与本地备份流程。'],['.project-card:nth-child(5) .project-tool-result strong','Open source','开源项目'],['.project-card:nth-child(5) .project-tool-result span','macOS · local first · bilingual','macOS · 本地优先 · 中英双语'],['.project-card:nth-child(5) .project-source','View source ↗','查看源代码 ↗'],['.project-card:nth-child(5) .project-tool-media figure:nth-child(1) figcaption','Floating panel','悬浮面板'],['.project-card:nth-child(5) .project-tool-media figure:nth-child(2) figcaption','Work presets','工作预设'],['.project-card:nth-child(5) .project-tool-media figure:nth-child(3) figcaption','Prompt library','Prompt 管理后台'],
  ['#archive .section-label','02C / Full portfolio','02C / 完整作品集'],['#archive .section-head p','All selected source materials from the working portfolio.','按新版飞书作品集分类整理的完整素材。'],
  ['#site-cases .section-label','02B / Site visual cases','02B / 独立站视觉案例'],['#site-cases .section-head p','Independent-site worlds, product language and visual systems.','独立站视觉世界、产品语言与视觉系统。'],
  ['.case-card:nth-child(1) .case-meta span:nth-child(1)','Lingerie / 内衣','内衣 / Lingerie'],['.case-card:nth-child(1) .case-meta span:nth-child(2)','Website design','网页设计'],['.case-card:nth-child(1) h2','Soft, strange,<br /><em>deliberately off-script.</em>','柔软、奇怪，<br /><em>故意不按脚本来。</em>'],['.case-card:nth-child(1) p','Developed a playful visual direction for an independent site: color mood, editorial image language, product storytelling and the relationship between homepage, collection and product detail.','为独立站搭建带有玩心的视觉方向：色彩氛围、编辑感影像语言、产品叙事，以及首页、集合页和详情页之间的视觉关系。'],
  ['.case-card:nth-child(2) .case-meta span:nth-child(1)','Jewelry / 首饰','首饰 / Jewelry'],['.case-card:nth-child(2) .case-meta span:nth-child(2)','Website design','网页设计'],['.case-card:nth-child(2) h2','A place for<br /><em>small details.</em>','为<br /><em>细节留出位置。</em>'],['.case-card:nth-child(2) p','Built a visual and content system for an accessories site, covering brand story, product education, use scenarios and customer-help content.','为配件网站搭建视觉与内容系统，覆盖品牌故事、产品教育、使用场景和客户帮助内容。'],
  ['.case-card:nth-child(3) .case-meta span:nth-child(1)','Footwear / 球鞋','球鞋 / Footwear'],['.case-card:nth-child(3) .case-meta span:nth-child(2)','Website design','网页设计'],['.case-card:nth-child(3) h2','Curating a shelf<br /><em>with a point of view.</em>','用自己的观点<br /><em>策划一整面鞋墙。</em>'],['.case-card:nth-child(3) p','Built the visual foundation for a selected-footwear site: brand world, homepage rhythm, collection structure, product-page hierarchy and responsive experience.','搭建精选球鞋网站的视觉基础：品牌世界、首页节奏、集合结构、产品详情页层级与响应式体验。'],
  ['#experience .section-label','03 / Experience','03 / 工作经历'],
  ['.timeline-item:nth-child(1) p','Visual Planner / Independent Site Content Lead','视觉策划 / 独立站内容负责人'],['.timeline-item:nth-child(1) small','Two wig brand sites · advertising · social · influencer assets · AI content','两个假发品牌站点 · 广告 · 社媒 · 红人素材 · AI 内容'],
  ['.timeline-item:nth-child(2) p','Content Planner','内容策划'],['.timeline-item:nth-child(2) small','Independent site content · product pages · outdoor model shooting · A/B testing','独立站内容 · 产品详情页 · 外模拍摄 · A/B 测试'],
  ['.timeline-item:nth-child(3) p','Brand Content Video Producer','品牌内容编导'],['.timeline-item:nth-child(3) small','TikTok · Instagram · feed ads · influencer videos · video SOPs','TikTok · Instagram · 信息流广告 · 红人视频 · 视频 SOP'],
  ['.timeline-item:nth-child(4) p','Brand Video Producer / Cross-border E-commerce Video Producer','品牌视频编导 / 跨境电商视频编导'],['.timeline-item:nth-child(4) small','Brand campaigns · Amazon · Lazada · Shopee · full-cycle video production','品牌宣发 · Amazon · Lazada · Shopee · 全流程视频制作'],
  ['.closing .section-label','04 / Contact','04 / 联系方式'],['.closing h2','Have a brief<br /><em>worth moving?</em>','有一份值得<br /><em>推动的需求？</em>'],['.closing .contact-education','South China Normal University · Environmental Art / Visual Design','华南师范大学 · 环境艺术 / 视觉设计'],['.closing .cv-download span','Download résumé PDF','下载简版简历 PDF'],['.closing .wechat-card-head span','Direct contact','直接联系'],['.closing .wechat-card figcaption span','Scan to connect ↗','扫码添加微信 ↗'],['footer span:nth-child(2)','Content, carefully in motion.','让内容持续发生。'],['footer a','Back to top ↑','回到顶部 ↑']
];
let currentLanguage = 'en';
function setLanguage(language) {
  currentLanguage = language; document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  copy.forEach(([selector,en,zh]) => document.querySelectorAll(selector).forEach((node) => { node.innerHTML = language === 'zh' ? zh : en; }));
  document.querySelectorAll('.timeline-detail').forEach((node) => { node.textContent = language === 'zh' ? node.dataset.zh : node.dataset.en; });
  document.querySelector('.lang-switch').textContent = language === 'zh' ? 'EN' : '中文';
  document.querySelectorAll('.gallery-group').forEach((group) => { group.querySelector('h3').textContent = language === 'zh' ? group.dataset.zhTitle : group.dataset.enTitle; });
  document.querySelectorAll('.gallery-item').forEach((item) => { item.querySelector('.gallery-caption span').textContent = language === 'zh' ? item.dataset.zhLabel : item.dataset.enLabel; });
  document.title = language === 'zh' ? 'Canyon Pan / 潘谕 — 内容负责人 / 视觉策划' : 'Canyon Pan — Content Lead / Visual Planner';
}
document.querySelector('.lang-switch')?.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'zh' : 'en'));
setLanguage('en');
