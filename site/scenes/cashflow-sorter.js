// Cash flow sorter: sales enter a machine and are separated into costs, commitments and available cash.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,walkSeg,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const M={x:8,y:-150,w:150,h:108},HOME=-150,AT=-20,LEVER=[3,-88];
  const ACCENT='#e65d3b',GREEN='#1f6b55',BLUE='#3b6f8f';
  function machine(g,leverK,runK,doneK){
    ln(g,M.x+24,M.y+M.h,M.x+17,0,2.3);
    ln(g,M.x+M.w-24,M.y+M.h,M.x+M.w-17,0,2.3);
    rr(g,M.x,M.y,M.w,M.h,9);inkFill(g,C.paper,1.8);
    text(g,'VENDAS',M.x+M.w/2,M.y+16,9,C.umber);
    rr(g,M.x+48,M.y+23,54,18,5);inkFill(g,C.butter,1.3);
    text(g,'R$ 100',M.x+75,M.y+36,10,C.ink);
    for(let i=0;i<3;i++){
      const x=M.x+10+i*47,w=42;
      rr(g,x,M.y+66,w,29,5);inkFill(g,i===2?'#e3f1e8':'#f0eee7',1.2);
      text(g,['CUSTO','CONTAS','CAIXA'][i],x+w/2,M.y+79,7.5,i===2?GREEN:C.muted);
      const fill=Math.max(0,runK-i*.13);
      if(fill>0){rr(g,x+6,M.y+85,(w-12)*Math.min(1,fill*1.6),4,2);inkFill(g,[ACCENT,BLUE,GREEN][i],.8,[ACCENT,BLUE,GREEN][i]);}
    }
    const a=lerp(-1.1,.45,E.soft(leverK));
    ln(g,LEVER[0],LEVER[1],LEVER[0]+Math.cos(a)*25,LEVER[1]+Math.sin(a)*25,3,C.ink);
    circle(g,LEVER[0],LEVER[1],4);inkFill(g,C.paper,1.2);
    circle(g,LEVER[0]+Math.cos(a)*25,LEVER[1]+Math.sin(a)*25,5);inkFill(g,ACCENT,1.2,C.ink);
    tickBadge(g,M.x+M.w-6,M.y+4,doneK,8,'#d7eadf',GREEN);
  }
  SC['cashflow-sorter']={
    dur:6.8,width:430,
    label:'Uma empreendedora aciona uma máquina que separa as vendas entre custos, compromissos e caixa disponível.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let x=HOME,gait={ph:0,amp:0,stride:0},pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t);
      let leverK=0,runK=0,doneK=0,cheerK=0;
      if(T<0){
        pose=mix(pose,P({hF:[10,-96],head:[7,-116],hB:[-4,-54]}),pulse(t,5.8,2.1,2.0));
      }else{
        const fade=1-seg(T,6.25,6.8);
        const ws=T<4.1?walkSeg(T,.05,.75,HOME,AT):walkSeg(T,5.25,6.15,AT,HOME);
        x=ws.x;gait=ws;
        const reach=E.soft(seg(T,.72,1.05))*(1-E.soft(seg(T,2.0,2.3)));
        pose=mix(pose,P({hF:lp([LEVER[0]+6,LEVER[1]+8],x,0,1),hB:[-4,-54],head:[9,-114],chest:[4,-89]}),reach);
        leverK=E.soft(seg(T,1.05,1.55))*(1-seg(T,5.8,6.3));
        runK=seg(T,1.45,3.35)*fade;
        doneK=seg(T,3.3,3.72)*fade;
        cheerK=E.back(seg(T,3.45,3.85))*(1-E.soft(seg(T,4.6,5.0)));
        pose=mix(pose,P({hF:[18,-130],hB:[-12,-128],head:[4,-118]}),cheerK);
      }
      pose=legs(pose,gait.ph,gait.amp,{arms:false,stride:gait.stride});
      machine(g,leverK,runK,doneK);
      fig(g,pose,x,0,{wave:S.wave,wt:S.wt});
      if(runK>0&&runK<1){
        const y=lerp(M.y+43,M.y+62,E.soft(runK));
        for(let i=0;i<3;i++){circle(g,M.x+31+i*47,y,3.2);inkFill(g,[ACCENT,BLUE,GREEN][i],1,C.ink);}
      }
      sparks(g,M.x+M.w-1,M.y+3,seg(T,3.55,4.05),15,6,GREEN);
      if(doneK>0){g.save();g.globalAlpha*=doneK;text(g,'sobrou!',M.x+M.w-29,M.y+109,9,GREEN);g.restore();}
    }
  };
})();
