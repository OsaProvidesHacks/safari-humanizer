// ==================== SAFARI HUMANIZER v3 ====================
(function () {
  if (window.__shLoaded) { window.__shToggle && window.__shToggle(); return; }
  window.__shLoaded = true;

  const styles = document.createElement('style');
  styles.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;700;800&display=swap');

    .sh-overlay {
      position: fixed; inset: 0;
      background: rgba(6,6,12,0.92);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      z-index: 999998;
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; gap: 20px;
      animation: shFadeIn 0.3s ease;
    }
    .sh-overlay.hidden { display: none; }
    .sh-run-title {
      font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
      color: #444455; letter-spacing: 0.18em; text-transform: uppercase;
    }
    .sh-run-btn {
      width: 160px; height: 160px; border-radius: 50%;
      background: transparent; border: 2px solid rgba(108,138,255,0.35);
      color: #fff; font-family: 'Syne', sans-serif;
      font-size: 22px; font-weight: 800; letter-spacing: 0.15em;
      cursor: pointer; position: relative; transition: all 0.2s;
      box-shadow: 0 0 40px rgba(108,138,255,0.12), inset 0 0 40px rgba(108,138,255,0.05);
    }
    .sh-run-btn::before {
      content: ''; position: absolute; inset: -10px; border-radius: 50%;
      border: 1px solid rgba(108,138,255,0.12);
      animation: shRotate 8s linear infinite;
    }
    .sh-run-btn::after {
      content: ''; position: absolute; inset: -20px; border-radius: 50%;
      border: 1px solid rgba(108,138,255,0.06);
      animation: shRotate 14s linear infinite reverse;
    }
    .sh-run-btn:hover {
      border-color: rgba(108,138,255,0.75);
      box-shadow: 0 0 70px rgba(108,138,255,0.3), inset 0 0 40px rgba(108,138,255,0.08);
      transform: scale(1.05);
    }
    .sh-run-btn:active { transform: scale(0.97); }
    .sh-run-hint { font-family:'JetBrains Mono',monospace; font-size:11px; color:#282835; letter-spacing:0.05em; }

    @keyframes shRotate { to { transform: rotate(360deg); } }
    @keyframes shFadeIn { from{opacity:0} to{opacity:1} }
    @keyframes shSlideIn { from{opacity:0;transform:translate(-50%,-46%)} to{opacity:1;transform:translate(-50%,-50%)} }
    @keyframes shPulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
    @keyframes shCursorBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }

    .sh-panel {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: #08080f; border: 1px solid #1a1a28;
      border-radius: 20px; padding: 0;
      z-index: 999999; width: 460px; max-width: 96vw; max-height: 92vh;
      overflow: hidden; display: flex; flex-direction: column;
      font-family: 'Syne', sans-serif; color: #e8e8f0;
      box-shadow: 0 0 0 1px #101018, 0 50px 100px rgba(0,0,0,0.95), 0 0 80px rgba(108,138,255,0.05);
      animation: shSlideIn 0.25s ease;
    }
    .sh-panel.hidden { display: none; }
    .sh-scroll { overflow-y: auto; padding: 20px 20px 14px; flex: 1; }
    .sh-scroll::-webkit-scrollbar { width: 3px; }
    .sh-scroll::-webkit-scrollbar-thumb { background: #222232; border-radius: 2px; }

    .sh-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 20px; border-bottom: 1px solid #141422;
      background: rgba(108,138,255,0.025); flex-shrink: 0;
    }
    .sh-title { font-size: 14px; font-weight: 800; letter-spacing: 0.05em; color: #fff; display: flex; align-items: center; gap: 8px; }
    .sh-dot { width: 7px; height: 7px; border-radius: 50%; background: #6c8aff; box-shadow: 0 0 8px #6c8aff; animation: shPulse 2s ease infinite; }
    .sh-header-r { display: flex; align-items: center; gap: 8px; }
    .sh-kbd { font-family:'JetBrains Mono',monospace; font-size:9px; color:#333345; border:1px solid #1e1e2c; border-radius:4px; padding:2px 6px; letter-spacing:0.05em; }
    .sh-close { background:#101018; border:1px solid #1e1e2c; color:#444; width:26px; height:26px; border-radius:6px; cursor:pointer; font-size:13px; display:flex; align-items:center; justify-content:center; transition:all 0.15s; }
    .sh-close:hover { color:#fff; background:#181828; }

    .sh-sec { margin-bottom: 15px; }
    .sh-lbl { font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#383850; margin-bottom:7px; }

    .sh-grades { display:grid; grid-template-columns:repeat(4,1fr); gap:5px; }
    .sh-grade { background:#0c0c18; border:1px solid #1a1a28; color:#444458; padding:8px 4px; border-radius:8px; cursor:pointer; font-family:'Syne',sans-serif; font-size:11px; font-weight:700; text-align:center; transition:all 0.15s; }
    .sh-grade:hover { border-color:#2a2a40; color:#aaa; }
    .sh-grade.active { background:#111128; border-color:#6c8aff; color:#6c8aff; box-shadow:0 0 12px rgba(108,138,255,0.1); }

    .sh-tog-row { display:flex; align-items:center; justify-content:space-between; padding:7px 0; border-bottom:1px solid #0f0f1c; }
    .sh-tog-row:last-child { border-bottom: none; }
    .sh-tog-lbl { font-size:12px; color:#888; }
    .sh-toggle { position:relative; width:34px; height:18px; }
    .sh-toggle input { opacity:0; width:0; height:0; }
    .sh-toggle-track { position:absolute; inset:0; background:#0c0c18; border-radius:9px; cursor:pointer; transition:0.2s; border:1px solid #1e1e2c; }
    .sh-toggle-track::before { content:''; position:absolute; width:12px; height:12px; left:2px; top:2px; background:#2a2a38; border-radius:50%; transition:0.2s; }
    .sh-toggle input:checked + .sh-toggle-track { background:#111128; border-color:#6c8aff; }
    .sh-toggle input:checked + .sh-toggle-track::before { transform:translateX(16px); background:#6c8aff; box-shadow:0 0 6px #6c8aff; }

    .sh-srow { display:flex; align-items:center; gap:10px; margin-top:4px; }
    .sh-slider { flex:1; -webkit-appearance:none; height:3px; background:#141422; border-radius:2px; }
    .sh-slider::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:#6c8aff; cursor:pointer; box-shadow:0 0 6px rgba(108,138,255,0.5); }
    .sh-sval { font-family:'JetBrains Mono',monospace; font-size:11px; color:#6c8aff; width:58px; text-align:right; flex-shrink:0; }

    .sh-textarea {
      width:100%; min-height:140px; max-height:38vh;
      background:#05050c; border:1px solid #161624;
      border-radius:10px; padding:14px;
      color:#e8e8f0; font-family:'JetBrains Mono',monospace;
      font-size:12px; resize:vertical; box-sizing:border-box;
      outline:none; transition:border-color 0.2s; line-height:1.65;
    }
    .sh-textarea:focus { border-color:#2a2a40; }
    .sh-textarea::placeholder { color:#1e1e2c; }

    .sh-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; margin:11px 0; }
    .sh-stat { background:#05050c; border:1px solid #111120; border-radius:8px; padding:9px; text-align:center; }
    .sh-snum { font-family:'JetBrains Mono',monospace; font-size:16px; font-weight:700; color:#6c8aff; }
    .sh-slbl { font-size:9px; color:#2a2a3a; margin-top:2px; letter-spacing:0.08em; text-transform:uppercase; }

    .sh-cd { background:#08081a; border:1px solid #20203a; border-radius:10px; padding:16px; text-align:center; display:none; margin:10px 0; }
    .sh-cd-lbl { font-size:11px; color:#444458; margin-bottom:6px; letter-spacing:0.04em; }
    .sh-cd-num { font-family:'JetBrains Mono',monospace; font-size:48px; font-weight:700; color:#6c8aff; line-height:1; display:block; text-shadow:0 0 30px rgba(108,138,255,0.5); }

    .sh-prog { height:2px; background:#0f0f1c; border-radius:1px; margin:10px 0; display:none; overflow:hidden; }
    .sh-prog-bar { height:100%; width:0%; background:linear-gradient(90deg,#6c8aff,#a78bfa); border-radius:1px; transition:width 0.4s; }

    .sh-bottom { padding:12px 20px; border-top:1px solid #111120; display:flex; gap:7px; flex-shrink:0; background:rgba(0,0,0,0.4); }
    .sh-btn { flex:1; padding:11px; border:none; border-radius:9px; font-family:'Syne',sans-serif; font-weight:700; font-size:13px; cursor:pointer; transition:all 0.15s; letter-spacing:0.02em; }
    .sh-btn-p { background:#6c8aff; color:#fff; }
    .sh-btn-p:hover { background:#7d96ff; transform:translateY(-1px); box-shadow:0 4px 20px rgba(108,138,255,0.3); }
    .sh-btn-p:active { transform:translateY(0); }
    .sh-btn-p:disabled { opacity:0.3; cursor:not-allowed; transform:none; box-shadow:none; }
    .sh-btn-s { background:#0c0c18; border:1px solid #1a1a28; color:#555568; flex:0 0 auto; padding:11px 14px; }
    .sh-btn-s:hover { background:#111120; color:#fff; }
    .sh-btn-stop { display:none; background:#150808; border:1px solid #321414; color:#bb3333; flex:0 0 auto; padding:11px 14px; }
    .sh-btn-stop:hover { color:#ff4444; background:#1c0a0a; }

    .sh-status { margin:0 20px 10px; padding:8px 14px; border-radius:8px; font-size:11px; text-align:center; display:none; font-family:'JetBrains Mono',monospace; }
    .sh-status.ok  { background:#06100a; border:1px solid #143020; color:#4db86d; }
    .sh-status.err { background:#100606; border:1px solid #301414; color:#cc4444; }
    .sh-status.info { background:#06060f; border:1px solid #1e1e38; color:#6c8aff; }

    .sh-cursor-glow {
      position:fixed; width:3px; height:22px;
      background:#8b5cf6; border-radius:2px; pointer-events:none;
      z-index:999997; display:none;
      box-shadow:0 0 12px rgba(139,92,246,0.9), 0 0 24px rgba(139,92,246,0.4), 0 0 40px rgba(139,92,246,0.2);
      animation:shCursorBlink 0.9s ease infinite;
    }
  `;
  document.head.appendChild(styles);

  function el(tag, cls, ...children) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    children.forEach(c => typeof c === 'string' ? e.appendChild(document.createTextNode(c)) : c && e.appendChild(c));
    return e;
  }
  function attr(e, obj) { Object.assign(e, obj); return e; }

  // Purple cursor glow
  const cursorGlow = el('div','sh-cursor-glow');
  document.body.appendChild(cursorGlow);

  // ── OVERLAY ──
  const overlay = el('div','sh-overlay');
  overlay.appendChild(el('div','sh-run-title','SAFARI HUMANIZER'));
  const runBtn = attr(el('button','sh-run-btn'), {});
  runBtn.textContent = 'RUN';
  overlay.appendChild(runBtn);
  overlay.appendChild(el('div','sh-run-hint','⌘⇧Z  to toggle'));
  document.body.appendChild(overlay);

  // ── PANEL ──
  const panel = el('div','sh-panel hidden');

  // header
  const hdr = el('div','sh-header');
  const titleEl = el('div','sh-title');
  titleEl.appendChild(el('div','sh-dot'));
  titleEl.appendChild(document.createTextNode('Humanizer'));
  hdr.appendChild(titleEl);
  const hdrR = el('div','sh-header-r');
  hdrR.appendChild(el('div','sh-kbd','⌘⇧Z'));
  const closeBtn = el('button','sh-close','✕');
  hdrR.appendChild(closeBtn);
  hdr.appendChild(hdrR);
  panel.appendChild(hdr);

  const scroll = el('div','sh-scroll');

  // grade
  const gradeSec = el('div','sh-sec');
  gradeSec.appendChild(el('div','sh-lbl','Grade Level'));
  const gradeWrap = el('div','sh-grades');
  ['9th','10th','11th','12th'].forEach((g,i)=>{
    const b = attr(el('button','sh-grade'+(i===0?' active':'')), {});
    b.dataset.grade = g; b.textContent = g;
    gradeWrap.appendChild(b);
  });
  gradeSec.appendChild(gradeWrap);
  scroll.appendChild(gradeSec);

  // speed
  const speedSec = el('div','sh-sec');
  speedSec.appendChild(el('div','sh-lbl','Typing Speed'));
  const speedVal = el('span','sh-sval','60 WPM');
  const speedSlider = attr(el('input','sh-slider'),{type:'range',id:'shSpeed',min:20,max:120,value:60});
  speedSec.appendChild(el('div','sh-srow',speedSlider,speedVal));
  scroll.appendChild(speedSec);

  // variance
  const varSec = el('div','sh-sec');
  varSec.appendChild(el('div','sh-lbl','Speed Variance'));
  const varVal = el('span','sh-sval','40%');
  const varSlider = attr(el('input','sh-slider'),{type:'range',id:'shVariance',min:0,max:100,value:40});
  varSec.appendChild(el('div','sh-srow',varSlider,varVal));
  scroll.appendChild(varSec);

  // toggles
  function togRow(id, label, checked=true) {
    const row = el('div','sh-tog-row');
    row.appendChild(el('span','sh-tog-lbl',label));
    const lbl = el('label','sh-toggle');
    const inp = attr(el('input'),{type:'checkbox',id,checked});
    lbl.appendChild(inp);
    lbl.appendChild(el('div','sh-toggle-track'));
    row.appendChild(lbl);
    return row;
  }
  const togSec = el('div','sh-sec');
  togSec.appendChild(el('div','sh-lbl','Humanize Options'));
  togSec.appendChild(togRow('shContractions','Use Contractions'));
  togSec.appendChild(togRow('shFiller','Add Filler Words'));
  togSec.appendChild(togRow('shVocab','Simplify Vocabulary'));
  togSec.appendChild(togRow('shTypos','Typo Simulation'));
  scroll.appendChild(togSec);

  // textarea — no limit
  const txSec = el('div','sh-sec');
  txSec.appendChild(el('div','sh-lbl','Paste Text'));
  const textarea = attr(el('textarea','sh-textarea'),{id:'shText',placeholder:'Paste any amount of text here — no limit...'});
  txSec.appendChild(textarea);
  scroll.appendChild(txSec);

  // stats
  const wNum = el('div','sh-snum','0'), cNum = el('div','sh-snum','0'), tNum = el('div','sh-snum','0');
  function statBox(n,l){ const b=el('div','sh-stat'); b.appendChild(n); const lb=el('div','sh-slbl',l); b.appendChild(lb); return b; }
  scroll.appendChild(el('div','sh-stats',statBox(wNum,'Words'),statBox(cNum,'Chars'),statBox(tNum,'Seconds')));

  // countdown
  const cdDiv = el('div','sh-cd');
  cdDiv.appendChild(el('div','sh-cd-lbl','Click in your target field — typing in'));
  const cdNum = el('span','sh-cd-num','5');
  cdDiv.appendChild(cdNum);
  scroll.appendChild(cdDiv);

  // progress
  const progDiv = el('div','sh-prog');
  const progBar = el('div','sh-prog-bar');
  progDiv.appendChild(progBar);
  scroll.appendChild(progDiv);

  panel.appendChild(scroll);

  // status + bottom
  const statusDiv = el('div','sh-status');
  panel.appendChild(statusDiv);

  const bottom = el('div','sh-bottom');
  const humanizeBtn = attr(el('button','sh-btn sh-btn-p'),{id:'shHumanize'});
  humanizeBtn.textContent = '✦  Humanize + Type';
  const previewBtn = attr(el('button','sh-btn sh-btn-s'),{});
  previewBtn.textContent = '👁';
  const stopBtn = attr(el('button','sh-btn sh-btn-stop'),{});
  stopBtn.textContent = '⏹';
  bottom.appendChild(humanizeBtn);
  bottom.appendChild(previewBtn);
  bottom.appendChild(stopBtn);
  panel.appendChild(bottom);
  document.body.appendChild(panel);

  // ── DATA ─────────────────────────────────────────────────────
  const vocabMap = {
    '9th':{'utilize':'use','demonstrate':'show','implement':'use','facilitate':'help','commence':'start','terminate':'end','sufficient':'enough','acquire':'get','attempt':'try','comprehend':'understand','establish':'set up','indicate':'show','obtain':'get','provide':'give','require':'need','regarding':'about','therefore':'so','however':'but','additionally':'also','subsequently':'then','approximately':'about','numerous':'many','significant':'big','various':'different','currently':'now','previously':'before','individuals':'people','enormous':'huge','fundamental':'basic','characteristics':'traits','perspective':'view','throughout':'across','particularly':'especially','emphasize':'stress','analyze':'study','construct':'build','contribute':'add to','determine':'figure out','evaluate':'judge','identify':'find','maintain':'keep'},
    '10th':{'utilize':'use','demonstrate':'show','facilitate':'help','commence':'start','terminate':'end','sufficient':'enough','acquire':'get','comprehend':'understand','numerous':'many','furthermore':'also','consequently':'so','nevertheless':'still','approximately':'around','individuals':'people','subsequently':'then','significant':'important','characteristics':'traits','emphasize':'stress','throughout':'across','particularly':'especially'},
    '11th':{'utilize':'use','individuals':'people','subsequently':'then','approximately':'around','numerous':'many','commence':'start'},
    '12th':{}
  };
  const contractionMap = {'will not':"won't",'cannot':"can't",'could not':"couldn't",'would not':"wouldn't",'should not':"shouldn't",'is not':"isn't",'are not':"aren't",'do not':"don't",'does not':"doesn't",'did not':"didn't",'have not':"haven't",'has not':"hasn't",'had not':"hadn't",'i am':"I'm",'you are':"you're",'they are':"they're",'we are':"we're",'it is':"it's",'that is':"that's",'there is':"there's",'i will':"I'll",'i have':"I've",'i would':"I'd",'let us':"let's"};
  const fillerPhrases = ['honestly','basically','I mean','you know','like','actually','pretty much','kind of','sort of','I think','to be fair','in a way','really'];

  function makeTypo(word) {
    if (word.length < 4) return null;
    const i = 1 + Math.floor(Math.random()*(word.length-2));
    return word.slice(0,i)+word[i+1]+word[i]+word.slice(i+2);
  }

  let currentGrade = '9th';

  function humanize(text) {
    let t = text;
    if (document.getElementById('shVocab').checked) {
      for (const [k,v] of Object.entries(vocabMap[currentGrade]))
        t = t.replace(new RegExp(`\\b${k}\\b`,'gi'), m => m[0]===m[0].toUpperCase() ? v[0].toUpperCase()+v.slice(1) : v);
    }
    if (document.getElementById('shContractions').checked) {
      for (const [k,v] of Object.entries(contractionMap))
        t = t.replace(new RegExp(`\\b${k}\\b`,'gi'), m => m[0]===m[0].toUpperCase() ? v[0].toUpperCase()+v.slice(1) : v);
    }
    if (document.getElementById('shFiller').checked) {
      t = t.replace(/(?<=[.!?]\s+)([A-Z])/g, (_,letter) => {
        if (Math.random()<0.18) { const f=fillerPhrases[Math.floor(Math.random()*fillerPhrases.length)]; return f[0].toUpperCase()+f.slice(1)+', '+letter.toLowerCase(); }
        return letter;
      });
    }
    return t;
  }

  // ── TYPING ENGINE ─────────────────────────────────────────────
  let stopTyping = false, insertMethod = null;

  function detectMethod(doc) {
    try { if(doc && doc.execCommand('insertText',false,'')!==false) return 'iframeExec'; } catch(e){}
    try { if(document.execCommand('insertText',false,'')!==false) return 'topExec'; } catch(e){}
    return 'inputEvent';
  }
  function doInsert(doc, char) {
    if (insertMethod==='iframeExec') doc.execCommand('insertText',false,char);
    else if (insertMethod==='topExec') document.execCommand('insertText',false,char);
    else {
      const t = doc ? doc.body : document.activeElement;
      t.dispatchEvent(new InputEvent('beforeinput',{bubbles:true,cancelable:true,inputType:'insertText',data:char}));
      t.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:false,inputType:'insertText',data:char}));
    }
  }
  function doDelete(doc) {
    if (insertMethod==='iframeExec') doc.execCommand('delete',false);
    else if (insertMethod==='topExec') document.execCommand('delete',false);
    else {
      const t = doc ? doc.body : document.activeElement;
      t.dispatchEvent(new InputEvent('beforeinput',{bubbles:true,cancelable:true,inputType:'deleteContentBackward'}));
    }
  }

  function setCursorGlow(show) {
    if (!show) { cursorGlow.style.display='none'; return; }
    cursorGlow.style.display = 'block';
    const a = document.activeElement;
    if (a) {
      const r = a.getBoundingClientRect();
      cursorGlow.style.top = (r.top+4)+'px';
      cursorGlow.style.left = (r.right+10)+'px';
    }
  }

  async function typeText(text, wpm, variancePct) {
    const iframe = document.querySelector('iframe.docs-texteventtarget-iframe');
    let iDoc = null;
    if (iframe) { iDoc = iframe.contentDocument||iframe.contentWindow.document; iDoc.body.focus(); }
    else if (document.activeElement) document.activeElement.focus();
    if (!insertMethod) insertMethod = detectMethod(iDoc);

    const baseDelay = (60/(wpm*5))*1000;
    const variance = variancePct/100;
    const words = text.split(/(\s+)/);
    let typed = 0; const total = text.length;
    setCursorGlow(true);

    for (let wi=0; wi<words.length; wi++) {
      if (stopTyping) break;
      const chunk = words[wi];
      const useTypo = document.getElementById('shTypos').checked && /^\w+$/.test(chunk) && chunk.length>=4 && Math.random()<0.07;
      if (useTypo) {
        const typo = makeTypo(chunk);
        if (typo) {
          await insertChars(iDoc,typo,baseDelay,variance);
          await sleep(200+Math.random()*300);
          for (let i=0;i<typo.length;i++) { doDelete(iDoc); await sleep(45+Math.random()*45); }
          await sleep(100+Math.random()*150);
        }
      }
      await insertChars(iDoc,chunk,baseDelay,variance);
      typed += chunk.length;
      progBar.style.width = Math.min(100,(typed/total)*100)+'%';
      if (/[.!?]$/.test(chunk.trim()) && Math.random()<0.4) await sleep(300+Math.random()*500);
    }
    setCursorGlow(false);
  }

  async function insertChars(iDoc, str, baseDelay, variance) {
    for (const char of str) {
      if (stopTyping) break;
      try { doInsert(iDoc,char); }
      catch(e) {
        const ms=['iframeExec','topExec','inputEvent'];
        insertMethod = ms[(ms.indexOf(insertMethod)+1)%ms.length];
        try { doInsert(iDoc,char); } catch(e2){}
      }
      await sleep(baseDelay*(1+(Math.random()*2-1)*variance));
    }
  }

  function sleep(ms) { return new Promise(r=>setTimeout(r,ms)); }

  function updateStats() {
    const t=textarea.value, words=t.trim()?t.trim().split(/\s+/).length:0;
    const chars=t.length, secs=Math.ceil((chars/(parseInt(speedSlider.value)*5))*60);
    wNum.textContent=words; cNum.textContent=chars; tNum.textContent=secs;
  }

  function showStatus(msg,type='info') {
    statusDiv.textContent=msg; statusDiv.className=`sh-status ${type}`; statusDiv.style.display='block';
    if(type!=='info') setTimeout(()=>statusDiv.style.display='none',3500);
  }

  function resetUI() {
    humanizeBtn.disabled=false; previewBtn.disabled=false;
    stopBtn.style.display='none'; cdDiv.style.display='none';
    setCursorGlow(false);
    setTimeout(()=>{ progDiv.style.display='none'; progBar.style.width='0%'; },2000);
  }

  // ── TOGGLE ────────────────────────────────────────────────────
  let uiState = 'overlay';
  function showOverlay() { overlay.classList.remove('hidden'); panel.classList.add('hidden'); uiState='overlay'; }
  function showPanel()   { overlay.classList.add('hidden'); panel.classList.remove('hidden'); uiState='panel'; }
  function hideAll()     { overlay.classList.add('hidden'); panel.classList.add('hidden'); uiState='hidden'; }
  function toggle()      { uiState==='hidden' ? showOverlay() : hideAll(); }

  window.__shToggle = toggle;

  runBtn.addEventListener('click', showPanel);
  closeBtn.addEventListener('click', showOverlay);

  document.addEventListener('keydown', e => {
    if ((e.metaKey||e.ctrlKey) && e.shiftKey && e.key==='Z') { e.preventDefault(); toggle(); }
  });

  gradeWrap.querySelectorAll('.sh-grade').forEach(btn => {
    btn.addEventListener('click', () => {
      gradeWrap.querySelectorAll('.sh-grade').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); currentGrade=btn.dataset.grade;
    });
  });

  speedSlider.addEventListener('input', ()=>{ speedVal.textContent=speedSlider.value+' WPM'; updateStats(); });
  varSlider.addEventListener('input', ()=>{ varVal.textContent=varSlider.value+'%'; });
  textarea.addEventListener('input', updateStats);

  humanizeBtn.addEventListener('click', async () => {
    const raw = textarea.value.trim();
    if (!raw) { showStatus('Paste text first.','err'); return; }
    stopTyping=false;
    const humanized = humanize(raw);
    humanizeBtn.disabled=true; previewBtn.disabled=true; stopBtn.style.display='block';

    // 5 second countdown
    cdDiv.style.display='block';
    for (let i=5;i>0;i--) {
      cdNum.textContent=i;
      await sleep(1000);
      if (stopTyping) { resetUI(); return; }
    }
    cdDiv.style.display='none';

    progDiv.style.display='block'; progBar.style.width='0%';
    showStatus('Typing…','info');

    try {
      await typeText(humanized, parseInt(speedSlider.value), parseInt(varSlider.value));
      if (!stopTyping) { progBar.style.width='100%'; showStatus('✓ Done!','ok'); }
      else showStatus('Stopped.','err');
    } catch(e) {
      showStatus('✕ '+e.message,'err');
    } finally { resetUI(); }
  });

  stopBtn.addEventListener('click', ()=>{ stopTyping=true; });
  previewBtn.addEventListener('click', ()=>{
    const raw=textarea.value.trim();
    if (!raw) { showStatus('Paste text first.','err'); return; }
    alert('── PREVIEW ──\n\n'+humanize(raw).substring(0,400)+(raw.length>400?'\n\n[…]':''));
  });

  updateStats();
  console.log('✅ Safari Humanizer v3 — ⌘⇧Z to toggle');
})();
