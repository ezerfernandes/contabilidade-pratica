// CAC payback calendar: monthly gross margin fills the acquisition gap until it is recovered.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const B={x:8,y:-153,w:166,h:106},ME=-40,CRANK=[-9,-87],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function calendar(g,turnK,fillK,doneK){
    rr(g,B.x,B.y,B.w,B.h,8);inkFill(g,C.paper,1.7);text(g,'PAYBACK DO CAC',B.x+B.w/2,B.y+15,8.2,C.umber);
    rr(g,B.x+13,B.y+27,58,23,5);inkFill(g,'#f4ddd4',1);text(g,'CAC 500',B.x+42,B.y+43,8,RED);
    rr(g,B.x+79,B.y+27,73,23,5);inkFill(g,'#d7eadf',1);text(g,'MARGEM 100/MÊS',B.x+115.5,B.y+43,6.8,GREEN);
    ln(g,B.x+18,B.y+70,B.x+148,B.y+70,2,C.ink);
    for(let i=0;i<6;i++){const x=B.x+20+i*25,k=Math.max(0,Math.min(1,fillK*5-i));circle(g,x,B.y+70,6);inkFill(g,k>0?'#d7eadf':C.paper,1,k>0?GREEN:C.muted);text(g,String(i),x,B.y+88,7,C.muted);}
    rr(g,B.x+52,B.y+91,62,17,4);inkFill(g,doneK>0?'#d7eadf':'#eee9dc',1);text(g,doneK>0?'PAGO NO MÊS 5':'CONTAR MESES',B.x+83,B.y+103,7.2,doneK>0?GREEN:C.muted);tickBadge(g,B.x+B.w-7,B.y+5,doneK,7,'#d7eadf',GREEN);
    const a=turnK*Math.PI*2,tip=[CRANK[0]+Math.cos(a)*20,CRANK[1]+Math.sin(a)*20];ln(g,CRANK[0],CRANK[1],tip[0],tip[1],3,C.ink);circle(g,CRANK[0],CRANK[1],4);inkFill(g,C.paper,1);circle(g,tip[0],tip[1],4.5);inkFill(g,RED,1,C.ink);
  }
  SC['payback-calendar']={dur:6.6,width:430,label:'Uma empreendedora avança um calendário enquanto a margem mensal recupera o custo de aquisição do cliente.',draw(g,S){
    const T=S.on?S.u*this.dur:-1,t=S.t;let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),turnK=0,fillK=0,doneK=0,cheer=0;
    if(T<0){pose=mix(pose,P({hF:[10,-96],head:[8,-115]}),pulse(t,5.9,2,2));}
    else{const fade=1-seg(T,6.0,6.6);turnK=E.soft(seg(T,.55,3.2))*fade;fillK=seg(T,.95,3.35)*fade;const hand=[CRANK[0]+Math.cos(turnK*Math.PI*2)*20,CRANK[1]+Math.sin(turnK*Math.PI*2)*20],reach=E.soft(seg(T,.35,.65))*(1-E.soft(seg(T,3.2,3.5)));pose=mix(pose,P({hF:lp(hand,ME,0,1),hB:[-5,-55],head:[8,-115]}),reach);doneK=seg(T,3.35,3.85)*fade;cheer=E.back(seg(T,3.9,4.3))*(1-E.soft(seg(T,4.95,5.35)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);}
    pose=legs(pose,0,0,{arms:false});calendar(g,turnK,fillK,doneK);fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});sparks(g,B.x+83,B.y+98,seg(T,3.6,4.25),16,7,GREEN);
  }};
})();
