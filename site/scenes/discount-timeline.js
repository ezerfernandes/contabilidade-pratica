// Discount timeline: a future cash flow is reeled back to its present value.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const TUBE={x:8,y:-146,w:164,h:93},ME=-40,CRANK=[-9,-87],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function timeline(g,turnK,doneK){
    rr(g,TUBE.x,TUBE.y,TUBE.w,TUBE.h,8);inkFill(g,C.paper,1.7);text(g,'LINHA DO TEMPO',TUBE.x+TUBE.w/2,TUBE.y+15,8.4,C.umber);
    ln(g,TUBE.x+17,TUBE.y+62,TUBE.x+TUBE.w-17,TUBE.y+62,2,C.ink);
    [0,1,2].forEach((n,i)=>{const x=TUBE.x+22+i*60;ln(g,x,TUBE.y+55,x,TUBE.y+69,1.4,C.ink);text(g,n===0?'HOJE':`ANO ${n}`,x,TUBE.y+81,7,C.muted);});
    rr(g,TUBE.x+62,TUBE.y+24,43,20,4);inkFill(g,'#e6eef2',1,BLUE);text(g,'10% a.a.',TUBE.x+83.5,TUBE.y+38,7.5,BLUE);
    tickBadge(g,TUBE.x+TUBE.w-7,TUBE.y+5,doneK,7,'#d7eadf',GREEN);
    const a=turnK*Math.PI*2,tip=[CRANK[0]+Math.cos(a)*20,CRANK[1]+Math.sin(a)*20];ln(g,CRANK[0],CRANK[1],tip[0],tip[1],3,C.ink);circle(g,CRANK[0],CRANK[1],4);inkFill(g,C.paper,1);circle(g,tip[0],tip[1],4.5);inkFill(g,RED,1,C.ink);
  }
  function cash(g,k){
    const x=lerp(TUBE.x+142,TUBE.x+22,E.soft(k)),scale=lerp(1,.82,E.soft(k));g.save();g.translate(x,TUBE.y+44);g.scale(scale,scale);rr(g,-28,-11,56,22,4);inkFill(g,k>.85?'#d7eadf':C.butter,1.2);text(g,k>.85?'R$ 826':'R$ 1.000',0,4,8.4,k>.85?GREEN:C.ink);g.restore();
  }
  SC['discount-timeline']={
    dur:6.6,width:430,label:'Uma empreendedora gira uma manivela que traz mil reais de dois anos no futuro para o valor presente de aproximadamente oitocentos e vinte e seis reais a dez por cento ao ano.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),turnK=0,moveK=0,doneK=0,cheer=0;
      if(T<0){pose=mix(pose,P({hF:[10,-95],head:[8,-115]}),pulse(t,5.8,2.1,2));}
      else{
        const fade=1-seg(T,6.0,6.6);turnK=E.soft(seg(T,.55,3.15))*fade;moveK=seg(T,1.0,3.55)*fade;const hand=[CRANK[0]+Math.cos(turnK*Math.PI*2)*20,CRANK[1]+Math.sin(turnK*Math.PI*2)*20];
        const reach=E.soft(seg(T,.35,.65))*(1-E.soft(seg(T,3.2,3.5)));pose=mix(pose,P({hF:lp(hand,ME,0,1),hB:[-5,-55],head:[8,-115]}),reach);
        doneK=seg(T,3.45,3.9)*fade;cheer=E.back(seg(T,3.95,4.35))*(1-E.soft(seg(T,5.0,5.35)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);
      }
      pose=legs(pose,0,0,{arms:false});timeline(g,turnK,doneK);cash(g,Math.max(0,moveK));fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});sparks(g,TUBE.x+22,TUBE.y+43,seg(T,3.55,4.2),16,7,GREEN);
    }
  };
})();
