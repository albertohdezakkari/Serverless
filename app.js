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
function render(){
  if (!lessons.length) {
    els.content.innerHTML = '<section class="card warning"><span class="label">ERROR DE CARGA</span><h3>Los bloques no se han cargado</h3><p>GitHub Pages está sirviendo una versión incompleta. Recarga cuando finalice el despliegue.</p></section>';
    els.nav.innerHTML = '<p class="muted">Esperando bloques…</p>';
    return;
  }
  const lesson=lessons[currentIndex];
  els.currentTitle.textContent=lesson.title;
  els.content.innerHTML=renderLesson(lesson);
  renderNav();updateProgress();updateBottomNav(lesson);bindInteractive(lesson);
  window.scrollTo({top:0,behavior:"smooth"});saveState();
}
function renderLesson(lesson){
  const hero='<section class="hero"><p class="eyebrow">'+lesson.hero.eyebrow+'</p><h2>'+lesson.hero.title+'</h2><p>'+lesson.hero.description+'</p><div class="chips">'+lesson.hero.chips.map(x=>'<span class="chip">'+x+'</span>').join("")+'</div></section>';
  return hero+lesson.sections.map((section,i)=>renderSection(lesson,section,i)).join("");
}
function renderSteps(section){
  return '<section class="card"><span class="label">AVANZA POR PASOS</span><h3>'+section.title+'</h3><ol class="steps-list">'+section.steps.map((step,i)=>'<li><span class="step-number">'+(i+1)+'</span><div><strong>'+step[0]+'</strong><p>'+step[1]+'</p></div></li>').join("")+'</ol></section>';
}
function renderSection(lesson,section,sectionIndex){
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