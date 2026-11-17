// Recognition gate: an economic event is tested before entering the balance sheet.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,lerp}=R;
  const G={x:8,y:-158,w:162,h:116},ME=-40,LEVER=[-10,-87];
  const GREEN='#1f6b55',BLUE='#3b6f8f',RED='#e65d3b';
  function gate(g,leverK,scanK,doneK){
    rr(g,G.x,G.y,G.w,G.h,8);inkFill(g,C.paper,1.7);
    text(g,'PORTÃO DO RECONHECIMENTO',G.x+G.w/2,G.y+15,7.6,C.umber);
    const rows=[['RECURSO CONTROLADO?',BLUE],['OBRIGAÇÃO PRESENTE?',RED]];
    rows.forEach((row,i)=>{
      const y=G.y+28+i*30,k=Math.max(0,Math.min(1,scanK*2-i));
      rr(g,G.x+12,y,G.w-24,23,5);inkFill(g,'#f2efe6',1,C.faint);
      text(g,row[0],G.x+20,y+15,7.2,row[1],'left');
      tickBadge(g,G.x+G.w-22,y+11,k,6,'#d7eadf',GREEN);
    });
    rr(g,G.x+41,G.y+91,80,17,4);inkFill(g,doneK>0?'#d7eadf':'#eee9dc',1.1);
    text(g,doneK>0?'BALANÇO':'TESTAR EVENTO',G.x+81,G.y+103,7.8,doneK>0?GREEN:C.muted);
    const a=lerp(-1.15,.35,E.soft(leverK));
    ln(g,LEVER[0],LEVER[1],LEVER[0]+Math.cos(a)*23,LEVER[1]+Math.sin(a)*23,3,C.ink);
    rr(g,LEVER[0]-4,LEVER[1]-4,8,8,3);inkFill(g,C.paper,1.1);
    rr(g,LEVER[0]+Math.cos(a)*23-4,LEVER[1]+Math.sin(a)*23-4,8,8,3);inkFill(g,RED,1.1,C.ink);
  }
  function eventCard(g,k){
    if(k<=0)return;
    const x=lerp(-2,49,E.soft(Math.min(1,k))),y=lerp(-137,-72,E.soft(Math.min(1,k)));
    g.save();g.globalAlpha*=Math.min(1,k*2);rr(g,x,y,61,27,5);inkFill(g,C.butter,1.2);text(g,'EVENTO',x+30.5,y+17,8,C.ink);g.restore();
  }
  SC['recognition-gate']={
    dur:6.6,width:420,label:'Uma contadora aciona um portão que testa se um evento cria um recurso controlado ou uma obrigação presente antes de levá-lo ao balanço.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),leverK=0,scanK=0,doneK=0,cheer=0,cardK=0;
      if(T<0){pose=mix(pose,P({hF:[11,-95],head:[8,-115]}),pulse(t,5.8,2.1,2));}
      else{
        const fade=1-seg(T,6.05,6.6),reach=E.soft(seg(T,.35,.65))*(1-E.soft(seg(T,2.05,2.35)));
        pose=mix(pose,P({hF:lp([LEVER[0]+8,LEVER[1]+5],ME,0,1),hB:[-6,-55],head:[8,-115]}),reach);
        leverK=E.soft(seg(T,.7,1.35))*fade;cardK=seg(T,1.15,2.2)*fade;scanK=seg(T,2.1,3.55)*fade;doneK=seg(T,3.55,4.05)*fade;
        cheer=E.back(seg(T,4.0,4.4))*(1-E.soft(seg(T,5.15,5.5)));
        pose=mix(pose,P({hF:[18,-131],hB:[-13,-128],head:[3,-118]}),cheer);
      }
      pose=legs(pose,0,0,{arms:false});gate(g,leverK,scanK,doneK);eventCard(g,cardK);fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});
      sparks(g,G.x+G.w-26,G.y+98,seg(T,3.8,4.45),16,7,GREEN);
    }
  };
})();
