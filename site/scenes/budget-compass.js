// Budget compass: plan and actual are compared so variance becomes an accountable action.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const B={x:8,y:-151,w:164,h:104},ME=-40,DIAL=[-8,-86],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function board(g,turnK,doneK){
    rr(g,B.x,B.y,B.w,B.h,8);inkFill(g,C.paper,1.7);text(g,'GESTÃO DE DESEMPENHO',B.x+B.w/2,B.y+15,7.7,C.umber);
    const vals=[['ORÇADO','100',BLUE],['REAL','92',RED]];vals.forEach((v,i)=>{const x=B.x+12+i*70;rr(g,x,B.y+27,62,31,5);inkFill(g,'#f2efe6',1);text(g,v[0],x+31,B.y+38,6.8,C.muted);text(g,v[1],x+31,B.y+53,10,v[2]);});
    rr(g,B.x+43,B.y+66,75,22,5);inkFill(g,doneK>0?'#f4ddd4':'#eee9dc',1.1);text(g,doneK>0?'DESVIO -8':'COMPARAR',B.x+80.5,B.y+80,7.8,doneK>0?RED:C.muted);
    if(doneK>0){ln(g,B.x+121,B.y+77,B.x+148,B.y+77,2.5,GREEN);ln(g,B.x+141,B.y+70,B.x+148,B.y+77,2.5,GREEN);ln(g,B.x+141,B.y+84,B.x+148,B.y+77,2.5,GREEN);text(g,'AÇÃO',B.x+141,B.y+96,6.8,GREEN);}
    tickBadge(g,B.x+B.w-7,B.y+5,doneK,7,'#d7eadf',GREEN);
    const a=lerp(-2.4,.45,E.soft(turnK)),tip=[DIAL[0]+Math.cos(a)*20,DIAL[1]+Math.sin(a)*20];circle(g,DIAL[0],DIAL[1],5);inkFill(g,C.paper,1.1);ln(g,DIAL[0],DIAL[1],tip[0],tip[1],3,C.ink);circle(g,tip[0],tip[1],4.5);inkFill(g,RED,1,C.ink);
  }
  SC['budget-compass']={
    dur:6.5,width:430,label:'Uma controller compara orçado e realizado em um painel, identifica a variação e aponta uma ação corretiva.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),turnK=0,doneK=0,cheer=0;
      if(T<0){pose=mix(pose,P({hF:[10,-95],head:[8,-115]}),pulse(t,5.9,2.1,2));}
      else{
        const fade=1-seg(T,5.95,6.5),reach=E.soft(seg(T,.35,.65))*(1-E.soft(seg(T,2.6,2.9)));
        turnK=E.soft(seg(T,.75,2.45))*fade;const a=lerp(-2.4,.45,turnK),hand=[DIAL[0]+Math.cos(a)*20,DIAL[1]+Math.sin(a)*20];pose=mix(pose,P({hF:lp(hand,ME,0,1),hB:[-5,-55],head:[8,-115]}),reach);
        doneK=seg(T,2.65,3.2)*fade;cheer=E.back(seg(T,3.75,4.15))*(1-E.soft(seg(T,4.9,5.3)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);
      }
      pose=legs(pose,0,0,{arms:false});board(g,turnK,doneK);fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});sparks(g,B.x+148,B.y+77,seg(T,3.05,3.8),16,7,GREEN);
    }
  };
})();
