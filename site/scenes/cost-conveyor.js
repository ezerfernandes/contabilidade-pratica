// Cost conveyor: manufacturing costs rest in inventory until the product is sold and becomes CPV.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const B={x:8,y:-151,w:164,h:104},ME=-40,CRANK=[-9,-86],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function belt(g,turnK,soldK){
    rr(g,B.x,B.y,B.w,B.h,8);inkFill(g,C.paper,1.7);text(g,'CUSTO DO PRODUTO',B.x+B.w/2,B.y+15,8.2,C.umber);
    const blocks=[['FIXO',BLUE],['VAR.',RED],['IND.',C.umber]];blocks.forEach((a,i)=>{const x=B.x+9+i*45;rr(g,x,B.y+27,39,19,4);inkFill(g,'#f1eee5',1);text(g,a[0],x+19.5,B.y+40,7.2,a[1]);});
    ln(g,B.x+10,B.y+61,B.x+B.w-10,B.y+61,3,C.ink);ln(g,B.x+10,B.y+85,B.x+B.w-10,B.y+85,3,C.ink);
    for(let i=0;i<7;i++){circle(g,B.x+18+i*21,B.y+73,6);inkFill(g,C.paper,1,C.muted);ln(g,B.x+18+i*21,B.y+68,B.x+18+i*21+Math.sin(turnK*8+i)*3,B.y+78,1,C.faint);}
    rr(g,B.x+111,B.y+51,43,31,5);inkFill(g,soldK>0?'#d7eadf':C.butter,1.2);text(g,soldK>0?'CPV':'ESTOQUE',B.x+132.5,B.y+70,7.6,soldK>0?GREEN:C.ink);
    tickBadge(g,B.x+B.w-6,B.y+5,soldK,7,'#d7eadf',GREEN);
    const a=turnK*Math.PI*2,tip=[CRANK[0]+Math.cos(a)*20,CRANK[1]+Math.sin(a)*20];ln(g,CRANK[0],CRANK[1],tip[0],tip[1],3,C.ink);circle(g,CRANK[0],CRANK[1],4);inkFill(g,C.paper,1);circle(g,tip[0],tip[1],4.5);inkFill(g,RED,1,C.ink);
  }
  SC['cost-conveyor']={
    dur:6.7,width:430,label:'Uma gestora gira uma esteira que incorpora custos de produção ao estoque e transfere o custo do item vendido para o CPV.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),turnK=0,soldK=0,cheer=0;
      if(T<0){pose=mix(pose,P({hF:[10,-95],head:[8,-115]}),pulse(t,5.9,2.1,2));}
      else{
        const fade=1-seg(T,6.1,6.7);turnK=E.soft(seg(T,.55,3.35))*fade;const hand=[CRANK[0]+Math.cos(turnK*Math.PI*2)*20,CRANK[1]+Math.sin(turnK*Math.PI*2)*20];
        const reach=E.soft(seg(T,.35,.65))*(1-E.soft(seg(T,3.25,3.55)));pose=mix(pose,P({hF:lp(hand,ME,0,1),hB:[-5,-55],head:[8,-115]}),reach);
        soldK=seg(T,3.25,3.8)*fade;cheer=E.back(seg(T,3.9,4.3))*(1-E.soft(seg(T,5.0,5.4)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);
      }
      pose=legs(pose,0,0,{arms:false});belt(g,turnK,soldK);
      const move=E.soft(seg(T,1.2,3.35));if(move>0){const x=lerp(B.x+18,B.x+123,move);rr(g,x-8,B.y+54,16,15,3);inkFill(g,C.butter,1.1,C.ink);}
      fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});sparks(g,B.x+133,B.y+65,seg(T,3.55,4.25),16,7,GREEN);
    }
  };
})();
