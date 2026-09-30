const STORAGE_KEY = "serverless-notebook-state-v1";
const state = loadState();
let currentIndex = Math.min(state.currentIndex ?? 0, lessons.length - 1);
const els = {
  nav:document.getElementById("lessonNav"),content:document.getElementById("content"),
  currentTitle:document.getElementById("currentTitle"),progressPercent:document.getElementById("progressPercent"),
  progressFill:document.getElementById("progressFill"),prev:document.getElementById("prevBtn"),
  next:document.getElementById("nextBtn"),complete:document.getElementById("completeBtn"),
  reset:document.getElementById("resetProgress"),menu:document.getElementById("menuBtn"),
  sidebar:document.getElementById("sidebar"),overlay:document.getElementById("overlay")
};
function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{completed:{},checks:{},answers:{}}}catch{return{completed:{},checks:{},answers:{}}}}
function saveState(){state.currentIndex=currentIndex;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));document.getElementById("savedState").textContent="Guardado ✓"}
function renderNav(){
  els.nav.innerHTML=lessons.map((lesson,index)=>{
    const classes=["nav-item",index===currentIndex?"active":"",state.completed?.[lesson.id]?"completed":""].filter(Boolean).join(" ");
    return '<button class="'+classes+'" data-index="'+index+'" type="button">'+lesson.navTitle+'</button>';
  }).join("");
  els.nav.querySelectorAll("[data-index]").forEach(btn=>btn.addEventListener("click",()=>{currentIndex=Number(btn.dataset.index);render();closeMenu()}));
}
function render(preserveScroll=false){
  if (!lessons.length) {
    els.content.innerHTML = '<section class="card warning"><span class="label">ERROR DE CARGA</span><h3>Los bloques no se han cargado</h3><p>GitHub Pages está sirviendo una versión incompleta. Recarga cuando finalice el despliegue.</p></section>';
    els.nav.innerHTML = '<p class="muted">Esperando bloques…</p>';
    return;
  }
  const lesson=lessons[currentIndex];
  els.currentTitle.textContent=lesson.title;
  els.content.innerHTML=renderLesson(lesson);
  renderNav();updateProgress();updateBottomNav(lesson);bindInteractive(lesson);enhanceCodeBlocks();restoreMaximizedPanel();
  if(state.maximizedPanel){
    // En modo maximizado NO movemos el viewport de la página.
    // El panel fullscreen es el único contexto de navegación hasta pulsar Volver.
  }else if(preserveScroll){
    const y=state.viewportY ?? window.scrollY;
    requestAnimationFrame(()=>window.scrollTo({top:y,left:0,behavior:"instant"}));
  }else{
    window.scrollTo({top:0,behavior:"smooth"});
  }
  saveState();
}
function renderLesson(lesson){
  const hero='<section class="hero"><p class="eyebrow">'+lesson.hero.eyebrow+'</p><h2>'+lesson.hero.title+'</h2><p>'+lesson.hero.description+'</p><div class="chips">'+lesson.hero.chips.map(x=>'<span class="chip">'+x+'</span>').join("")+'</div></section>';
  return hero+lesson.sections.map((section,i)=>renderSection(lesson,section,i)).join("");
}
function panelActions(key){
  const isFull=state.maximizedPanel===key;
  return '<div class="panel-actions"><button class="panel-action-btn" type="button" data-panel-toggle="'+key+'">'+(isFull?'↙ Volver':'⛶ Maximizar')+'</button></div>';
}
function enhanceCodeBlocks(){
  els.content.querySelectorAll('pre').forEach((pre,index)=>{
    if(pre.parentElement?.classList.contains('code-shell')) return;
    const shell=document.createElement('div');
    shell.className='code-shell';
    const bar=document.createElement('div');
    bar.className='code-toolbar';
    const label=document.createElement('span');
    label.textContent='Código';
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='copy-code-btn';
    btn.textContent='Copiar código';
    btn.addEventListener('click',async()=>{
      const code=pre.querySelector('code')?.innerText ?? pre.innerText;
      try{
        await navigator.clipboard.writeText(code);
        btn.textContent='✓ Copiado';
        setTimeout(()=>btn.textContent='Copiar código',1400);
      }catch{
        const range=document.createRange();
        range.selectNodeContents(pre);
        const sel=window.getSelection();
        sel.removeAllRanges(); sel.addRange(range);
        btn.textContent='Seleccionado · Ctrl+C';
      }
    });
    bar.append(label,btn);
    pre.parentNode.insertBefore(shell,pre);
    shell.append(bar,pre);
  });
}
function restoreMaximizedPanel(){
  document.body.classList.remove('panel-open');
  if(!state.maximizedPanel) return;
  const panel=document.querySelector('[data-panel-key="'+state.maximizedPanel+'"]');
  if(panel){
    panel.classList.add('panel-maximized');
    document.body.classList.add('panel-open');
    panel.scrollTop=state.maximizedPanelScrollTop ?? 0;
  }else{
    state.maximizedPanel=null;
    state.maximizedPanelScrollTop=0;
    saveState();
  }
}
function togglePanel(key){
  const isFull=state.maximizedPanel===key;
  if(!isFull){
    state.panelScrollY=window.scrollY;
    state.maximizedPanelScrollTop=0;
    state.maximizedPanel=key;
    saveState();
    render(true);
  }else{
    state.maximizedPanel=null;
    state.maximizedPanelScrollTop=0;
    saveState();
    document.body.classList.remove('panel-open');
    render(true);
    requestAnimationFrame(()=>window.scrollTo({top:state.panelScrollY??window.scrollY,left:0,behavior:'instant'}));
  }
}
function renderTabs(lesson,section,sectionIndex){
  const tabKey=lesson.id+"-"+sectionIndex;
  const active=state.tabs?.[tabKey] ?? 0;
  return '<section class="card tabs-card" data-anchor="'+tabKey+'" data-panel-key="'+tabKey+'"><div class="panel-heading"><div><span class="label">'+(section.label||"APRENDE POR CAPAS")+'</span><h3>'+section.title+'</h3></div>'+panelActions(tabKey)+'</div><div class="tab-list" role="tablist">'+
    section.tabs.map((tab,i)=>'<button class="tab-btn '+(i===active?"active":"")+'" type="button" data-tab-key="'+tabKey+'" data-tab-index="'+i+'">'+tab.title+'</button>').join("")+
    '</div><div class="tab-panel">'+section.tabs.map((tab,i)=>'<div class="tab-content '+(i===active?"active":"")+'">'+renderTabContent(tab)+'</div>').join("")+'</div></section>';
}
function renderTabContent(tab){
  let html=tab.intro?'<p>'+tab.intro+'</p>':'';
  if(tab.flow) html+='<div class="flow">'+tab.flow.map((x,i)=>'<div class="flow-box">'+x+'</div>'+(i<tab.flow.length-1?'<div class="flow-arrow">↓</div>':'')).join("")+'</div>';
  if(tab.steps) html+='<ol class="steps-list">'+tab.steps.map((step,i)=>'<li><span class="step-number">'+(i+1)+'</span><div><strong>'+step[0]+'</strong><p>'+step[1]+'</p></div></li>').join("")+'</ol>';
  if(tab.code) html+='<pre><code>'+escapeHtml(tab.code)+'</code></pre>';
  if(tab.note) html+='<div class="inline-note">'+tab.note+'</div>';
  return html;
}
function renderHelp(help){
  if(Array.isArray(help)) return '<ol class="diagnostic-list">'+help.map((x,i)=>'<li><strong>'+(i+1)+'. '+x[0]+'</strong><span>'+x[1]+'</span></li>').join("")+'</ol>';
  return '<p>'+help+'</p>';
}
function renderWizard(lesson,section,sectionIndex){
  const key=lesson.id+"-wizard-"+sectionIndex;
  const current=Math.min(state.wizards?.[key] ?? 0,section.steps.length-1);
  const step=section.steps[current];
  const pct=Math.round(((current+1)/section.steps.length)*100);
  return '<section class="card wizard-card" data-anchor="'+key+'" data-panel-key="'+key+'">'+
    '<div class="wizard-head"><div><span class="label">'+(section.label||"GUÍA INTERACTIVA")+'</span><h3>'+section.title+'</h3></div><div class="wizard-head-actions">'+panelActions(key)+'<strong>'+(current+1)+' / '+section.steps.length+'</strong></div></div>'+
    '<div class="wizard-progress"><span style="width:'+pct+'%"></span></div>'+
    '<div class="wizard-tabs" role="tablist">'+section.steps.map((s,i)=>'<button type="button" class="wizard-tab '+(i===current?"active ":"")+(i<current?"done":"")+'" data-wizard-key="'+key+'" data-wizard-index="'+i+'"><span class="wizard-tab-index">'+(i<current?"✓":i+1)+'</span><span class="wizard-tab-label">'+(s.shortTitle||s.title)+'</span></button>').join("")+'</div>'+
    '<div class="wizard-stage">'+
      '<div class="wizard-main"><p class="wizard-kicker">PASO '+(current+1)+' DE '+section.steps.length+'</p><h4>'+step.title+'</h4>'+
        (step.learn?'<div class="learn-box"><strong>Antes de hacerlo · entiende</strong><p>'+step.learn+'</p></div>':'')+
        '<p>'+step.text+'</p>'+
        (step.code?'<pre><code>'+escapeHtml(step.code)+'</code></pre>':'')+
        (step.expected?'<div class="expected-box"><strong>✓ Qué deberías ver</strong><p>'+step.expected+'</p></div>':'')+
        (step.success?'<div class="success-path"><strong>SI TE SALE ✓</strong><p>'+step.success+'</p></div>':'')+
        (step.help?'<details class="help-box"><summary>SI NO TE SALE · resuélvelo antes de continuar</summary>'+renderHelp(step.help)+'</details>':'')+
        (step.check?'<div class="step-check"><strong>CIERRA ESTE PASO</strong><p>'+step.check+'</p></div>':'')+
      '</div>'+
    '</div>'+
    '<div class="wizard-actions"><button class="btn secondary" type="button" data-wizard-prev="'+key+'" '+(current===0?"disabled":"")+'>← Paso anterior</button><button class="btn primary" type="button" data-wizard-next="'+key+'" '+(current===section.steps.length-1?"disabled":"")+'>'+(current===section.steps.length-1?"Guía completada ✓":"Ya lo tengo · siguiente →")+'</button></div>'+
  '</section>';
}
function renderSteps(section){
  return '<section class="card"><span class="label">AVANZA POR PASOS</span><h3>'+section.title+'</h3><ol class="steps-list">'+section.steps.map((step,i)=>'<li><span class="step-number">'+(i+1)+'</span><div><strong>'+step[0]+'</strong><p>'+step[1]+'</p></div></li>').join("")+'</ol></section>';
}
function renderSection(lesson,section,sectionIndex){
  if(section.type==="consolemap") return '<section class="card console-map"><span class="label">'+(section.label||"MAPA DE PANTALLA")+'</span><h3>'+section.title+'</h3><p>'+section.text+'</p><div class="console-window"><div class="console-top">AWS Console <span>›</span> '+section.service+'</div><div class="console-body">'+section.areas.map((x,i)=>'<div class="console-area '+(x.active?"active":"")+'"><span>'+(i+1)+'</span><div><strong>'+x.title+'</strong><small>'+x.text+'</small></div></div>').join("")+'</div></div></section>';
  if(section.type==="wizard") return renderWizard(lesson,section,sectionIndex);
  if(section.type==="tabs") return renderTabs(lesson,section,sectionIndex);
  if(section.type==="steps") return renderSteps(section);
  if(section.type==="grid") return '<section class="grid">'+section.cards.map(card=>'<article class="card"><span class="label">'+card.label+'</span><h3>'+card.title+'</h3><p>'+card.text+'</p></article>').join("")+'</section>';
  if(section.type==="flow") return '<section class="card"><span class="label">REPRESENTACIÓN</span><h3>'+section.title+'</h3><div class="flow">'+section.items.map((item,i)=>'<div class="flow-box">'+item+'</div>'+(i<section.items.length-1?'<div class="flow-arrow">↓</div>':'')).join("")+'</div></section>';
  if(section.type==="code") return '<section class="card dark"><span class="label">'+(section.label||"CÓDIGO")+'</span><h3>'+section.title+'</h3><pre><code>'+escapeHtml(section.code)+'</code></pre></section>';
  if(section.type==="table") return '<section class="card"><span class="label">REFERENCIA</span><h3>'+section.title+'</h3><div class="table-wrap"><table><thead><tr>'+section.headers.map(h=>'<th>'+h+'</th>').join("")+'</tr></thead><tbody>'+section.rows.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join("")+'</tr>').join("")+'</tbody></table></div></section>';
  if(section.type==="checklist"){
    const checks=state.checks?.[lesson.id]||{};
    return '<section class="card"><span class="label">CHECKPOINTS</span><h3>'+section.title+'</h3><ul class="checklist">'+section.items.map((item,i)=>'<li><label><input type="checkbox" data-check="'+i+'" '+(checks[i]?"checked":"")+'><span>'+item+'</span></label></li>').join("")+'</ul></section>';
  }
  if(section.type==="quiz"){
    const answer=state.answers?.[lesson.id]?.[sectionIndex];
    const opts=section.options.map((option,i)=>{let cls="quiz-option";if(answer!==undefined){if(i===section.correct)cls+=" correct";else if(i===answer)cls+=" incorrect"}return '<button class="'+cls+'" type="button" data-quiz-section="'+sectionIndex+'" data-answer="'+i+'">'+option+'</button>'}).join("");
    const fb=answer!==undefined?((answer===section.correct?"✓ Correcto. ":"✕ Revisa este concepto. ")+section.explanation):"";
    return '<section class="card"><span class="label">COMPRUEBA</span><h3>'+section.title+'</h3><p><strong>'+section.question+'</strong></p><div>'+opts+'</div><div class="quiz-feedback">'+fb+'</div></section>';
  }
  const classMap={concept:"card concept",warning:"card warning",success:"card success"};
  const labelMap={concept:"CONCEPTO NUEVO",warning:"ATENCIÓN",success:"CIERRE"};
  return '<section class="'+(classMap[section.type]||"card")+'"><span class="label">'+(labelMap[section.type]||"APRENDE")+'</span><h3>'+section.title+'</h3><p>'+section.text+'</p></section>';
}
function bindInteractive(lesson){
  els.content.querySelectorAll("[data-panel-toggle]").forEach(button=>button.addEventListener("click",()=>togglePanel(button.dataset.panelToggle)));
  els.content.querySelectorAll("[data-wizard-key]").forEach(button=>button.addEventListener("click",()=>{state.wizards||={};if(state.maximizedPanel){const p=document.querySelector('[data-panel-key="'+state.maximizedPanel+'"]');state.maximizedPanelScrollTop=p?.scrollTop??0;}else{state.viewportY=window.scrollY;}state.wizards[button.dataset.wizardKey]=Number(button.dataset.wizardIndex);saveState();render(true)}));
  els.content.querySelectorAll("[data-wizard-next]").forEach(button=>button.addEventListener("click",()=>{const key=button.dataset.wizardNext;state.wizards||={};if(state.maximizedPanel){const p=document.querySelector('[data-panel-key="'+state.maximizedPanel+'"]');state.maximizedPanelScrollTop=p?.scrollTop??0;}else{state.viewportY=window.scrollY;}state.wizards[key]=(state.wizards[key]??0)+1;saveState();render(true)}));
  els.content.querySelectorAll("[data-wizard-prev]").forEach(button=>button.addEventListener("click",()=>{const key=button.dataset.wizardPrev;state.wizards||={};if(state.maximizedPanel){const p=document.querySelector('[data-panel-key="'+state.maximizedPanel+'"]');state.maximizedPanelScrollTop=p?.scrollTop??0;}else{state.viewportY=window.scrollY;}state.wizards[key]=Math.max(0,(state.wizards[key]??0)-1);saveState();render(true)}));
  els.content.querySelectorAll("[data-tab-key]").forEach(button=>button.addEventListener("click",()=>{state.tabs||={};if(state.maximizedPanel){const p=document.querySelector('[data-panel-key="'+state.maximizedPanel+'"]');state.maximizedPanelScrollTop=p?.scrollTop??0;}else{state.viewportY=window.scrollY;}state.tabs[button.dataset.tabKey]=Number(button.dataset.tabIndex);saveState();render(true)}));
  els.content.querySelectorAll("[data-check]").forEach(input=>input.addEventListener("change",()=>{state.checks||={};state.checks[lesson.id]||={};state.checks[lesson.id][input.dataset.check]=input.checked;saveState()}));
  els.content.querySelectorAll("[data-answer]").forEach(button=>button.addEventListener("click",()=>{const sectionIndex=Number(button.dataset.quizSection);state.answers||={};state.answers[lesson.id]||={};state.answers[lesson.id][sectionIndex]=Number(button.dataset.answer);saveState();render()}));
}
function updateBottomNav(lesson){els.prev.disabled=currentIndex===0;els.next.disabled=currentIndex===lessons.length-1;els.complete.textContent=state.completed?.[lesson.id]?"✓ Completado":"Marcar completado"}
function updateProgress(){const total=lessons.length;const done=lessons.filter(l=>state.completed?.[l.id]).length;const percent=Math.round(done/total*100);els.progressPercent.textContent=percent+"%";els.progressFill.style.width=percent+"%"}
els.prev.addEventListener("click",()=>{if(currentIndex>0){currentIndex--;render()}});
els.next.addEventListener("click",()=>{if(currentIndex<lessons.length-1){currentIndex++;render()}});
els.complete.addEventListener("click",()=>{const lesson=lessons[currentIndex];state.completed||={};state.completed[lesson.id]=!state.completed[lesson.id];saveState();render()});
els.reset.addEventListener("click",()=>{if(confirm("¿Reiniciar el progreso del cuaderno? Se eliminarán completados, checkpoints y respuestas guardadas.")){localStorage.removeItem(STORAGE_KEY);location.reload()}});
els.menu.addEventListener("click",()=>{els.sidebar.classList.add("open");els.overlay.hidden=false});
els.overlay.addEventListener("click",closeMenu);
function closeMenu(){els.sidebar.classList.remove("open");els.overlay.hidden=true}
function escapeHtml(text){return text.replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]))}
render();