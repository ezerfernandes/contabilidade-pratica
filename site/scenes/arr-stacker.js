// ARR stacker: twelve normalized months of recurring revenue become one annual run-rate.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const B={x:8,y:-157,w:166,h:112},ME=-40,CRANK=[-9,-88],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function machine(g,turnK,fillK,doneK){
    rr(g,B.x,B.y,B.w,B.h,8);inkFill(g,C.paper,1.7);text(g,'RECEITA RECORRENTE',B.x+B.w/2,B.y+15,8,C.umber);
    rr(g,B.x+13,B.y+27,55,24,5);inkFill(g,'#e6eef2',1.1);text(g,'MRR 40K',B.x+40.5,B.y+43,8,BLUE);
    const x0=B.x+78,y0=B.y+27,bw=16,bh=10;
    for(let i=0;i<12;i++){
      const k=Math.max(0,Math.min(1,fillK*12-i)),col=i<9?C.butter:'#d7eadf',x=x0+(i%4)*(bw+3),y=y0+Math.floor(i/4)*(bh+4);
      if(k>0){g.save();g.globalAlpha*=k;rr(g,x,y,bw,bh,2);inkFill(g,col,.9,C.ink);g.restore();}
    }
    rr(g,B.x+28,B.y+75,112,24,5);inkFill(g,doneK>0?'#d7eadf':'#eee9dc',1.1);text(g,doneK>0?'ARR 480K = MRR × 12':'NORMALIZAR 12 MESES',B.x+84,B.y+91,8,doneK>0?GREEN:C.muted);
    tickBadge(g,B.x+B.w-7,B.y+5,doneK,7,'#d7eadf',GREEN);
    const a=turnK*Math.PI*2,tip=[CRANK[0]+Math.cos(a)*20,CRANK[1]+Math.sin(a)*20];ln(g,CRANK[0],CRANK[1],tip[0],tip[1],3,C.ink);circle(g,CRANK[0],CRANK[1],4);inkFill(g,C.paper,1);circle(g,tip[0],tip[1],4.5);inkFill(g,RED,1,C.ink);
  }
  SC['arr-stacker']={dur:6.7,width:430,label:'Uma empreendedora gira uma manivela que empilha doze blocos de receita recorrente mensal e forma a receita recorrente anualizada.',draw(g,S){
    const T=S.on?S.u*this.dur:-1,t=S.t;let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),turnK=0,fillK=.08,doneK=0,cheer=0;
    if(T<0){pose=mix(pose,P({hF:[10,-96],head:[8,-115]}),pulse(t,5.9,2.1,2));}
    else{const fade=1-seg(T,6.1,6.7);turnK=E.soft(seg(T,.55,3.25))*fade;fillK=seg(T,.95,3.45)*fade+.08*(1-fade);const hand=[CRANK[0]+Math.cos(turnK*Math.PI*2)*20,CRANK[1]+Math.sin(turnK*Math.PI*2)*20],reach=E.soft(seg(T,.35,.65))*(1-E.soft(seg(T,3.25,3.55)));pose=mix(pose,P({hF:lp(hand,ME,0,1),hB:[-5,-55],head:[8,-115]}),reach);doneK=seg(T,3.45,3.9)*fade;cheer=E.back(seg(T,3.95,4.35))*(1-E.soft(seg(T,5.05,5.45)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);}
    pose=legs(pose,0,0,{arms:false});machine(g,turnK,fillK,doneK);fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});sparks(g,B.x+84,B.y+87,seg(T,3.65,4.3),17,7,GREEN);
  }};
})();
