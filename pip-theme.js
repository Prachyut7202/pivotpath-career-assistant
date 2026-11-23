/* User-controlled appearance. Stored separately from career data so that
   starting a fresh candidate cannot alter the device's display preference. */
(function(){
 'use strict';
 const KEY='pivotpath_display_theme_v1';
 const read=()=>{try{return localStorage.getItem(KEY)==='dark'?'dark':'light'}catch(e){return 'light'}};
 const apply=(theme,persist=true)=>{
   const mode=theme==='dark'?'dark':'light';
   document.documentElement.dataset.theme=mode;
   document.documentElement.style.colorScheme=mode;
   try{if(persist)localStorage.setItem(KEY,mode)}catch(e){/* private browsing: session-only */ }
   const meta=document.querySelector('meta[name="theme-color"]');
   if(meta)meta.content=mode==='dark'?'#0e1629':'#f8f9fc';
   document.querySelectorAll('[data-pp-theme-toggle]').forEach(button=>{
     const dark=mode==='dark';
     button.setAttribute('aria-pressed',String(dark));
     button.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
     button.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');
     const ico=button.querySelector('.pipThemeIcon'),word=button.querySelector('.pipThemeWord');
     if(ico)ico.textContent=dark?'☀':'☾';
     if(word)word.textContent=dark?'Light':'Dark';
   });
   const welcome=document.getElementById('pipWelcomeTheme');
   if(welcome)welcome.hidden=S.stage!=='welcome';
 };
 document.addEventListener('click',function(event){
   const toggle=event.target.closest('[data-pp-theme-toggle]');
   if(!toggle)return;
   event.preventDefault();event.stopPropagation();
   apply(document.documentElement.dataset.theme==='dark'?'light':'dark');
 });
 const priorRender=render;
 render=function(){priorRender();apply(document.documentElement.dataset.theme||read(),false)};
 apply(read(),false);
 render();
 window.PipTheme={get:()=>document.documentElement.dataset.theme,apply};
})();