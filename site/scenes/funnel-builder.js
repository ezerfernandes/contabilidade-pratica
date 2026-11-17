// Marketing funnel: opportunities enter, customers emerge, and the value-to-cost dial turns green.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,circle,lerp,arcPt}=R;
  const FUN={x:2,y:-156,w:152,h:105},ME=-25,CRANK=[-1,-88],RED='#e65d3b',GREEN='#1f6b55',BLUE='#3b6f8f';
  function funnel(g,crankK,scoreK){
    rr(g,FUN.x,FUN.y,FUN.w,FUN.h,8);inkFill(g,C.paper,1.7);
    text(g,'AQUISIÇÃO',FUN.x+FUN.w/2,FUN.y+16,8.5,C.umber);
    g.beginPath();g.moveTo(FUN.x+19,FUN.y+29);g.lineTo(FUN.x+91,FUN.y+29);g.lineTo(FUN.x+69,FUN.y+76);g.lineTo(FUN.x+50,FUN.y+76);g.closePath();inkFill(g,'#e6eef2',1.5,BLUE);
    text(g,'visitas',FUN.x+55,FUN.y+43,7.5,BLUE);
    text(g,'clientes',FUN.x+60,FUN.y+91,7.5,GREEN);
    rr(g,FUN.x+101,FUN.y+31,40,54,6);inkFill(g,'#f3eee2',1.2);
    text(g,'LTV',FUN.x+121,FUN.y+46,8,C.muted);
    text(g,'÷ CAC',FUN.x+121,FUN.y+59,8,C.muted);
    const dial=lerp(-2.5,.35,E.soft(scoreK));
    circle(g,FUN.x+121,FUN.y+72,9);inkFill(g,C.paper,1.2);
    ln(g,FUN.x+121,FUN.y+72,FUN.x+121+Math.cos(dial)*7,FUN.y+72+Math.sin(dial)*7,2,scoreK>.75?GREEN:RED);
    const a=crankK*Math.PI*2,tip=[CRANK[0]+Math.cos(a)*18,CRANK[1]+Math.sin(a)*18];
    ln(g,CRANK[0],CRANK[1],tip[0],tip[1],2.5);circle(g,CRANK[0],CRANK[1],4);inkFill(g,C.paper,1.2);circle(g,tip[0],tip[1],4.5);inkFill(g,RED,1.2,C.ink);
  }
  SC['funnel-builder']={
    dur:6.8,width:405,label:'Uma empreendedora gira o funil de marketing, transforma oportunidades em clientes e vê a relação entre valor e aquisição ficar saudável.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),crankK=0,scoreK=0,cheer=0;
      if(T<0){pose=mix(pose,P({hF:[10,-96],head:[8,-115],hB:[-4,-54]}),pulse(t,6,2.2,2.1));}
      else{
        const fade=1-seg(T,6.25,6.8);
        crankK=E.soft(seg(T,.55,3.25))*fade;
        const turn=E.soft(seg(T,.45,.7))*(1-E.soft(seg(T,3.15,3.45)));
        const hand=[CRANK[0]+Math.cos(crankK*Math.PI*2)*18,CRANK[1]+Math.sin(crankK*Math.PI*2)*18];
        pose=mix(pose,P({hF:lp(hand,ME,0,1),hB:[-4,-54],head:[9,-114],chest:[4,-89]}),turn);
        scoreK=seg(T,2.5,4.1)*fade;
        cheer=E.back(seg(T,4.05,4.45))*(1-E.soft(seg(T,5.2,5.6)));
        pose=mix(pose,P({hF:[19,-131],hB:[-12,-128],head:[3,-118]}),cheer);
      }
      pose=legs(pose,0,0,{arms:false});
      funnel(g,crankK,scoreK);
      fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});
      for(let i=0;i<5;i++){
        const k=seg(T,.75+i*.28,1.65+i*.28);
        if(k>0&&k<1){const p=arcPt([FUN.x+26+i*16,FUN.y+24],[FUN.x+54,FUN.y+67],12,E.soft(k));circle(g,p[0],p[1],3);inkFill(g,i%2?C.butter:BLUE,1,C.ink);}
      }
      for(let i=0;i<2;i++){
        const k=seg(T,2.25+i*.42,3.1+i*.42);
        if(k>0&&k<1){const p=arcPt([FUN.x+59,FUN.y+76],[FUN.x+64+i*25,FUN.y+104],10,E.soft(k));rr(g,p[0]-7,p[1]-5,14,10,3);inkFill(g,'#d7eadf',1,GREEN);text(g,'$',p[0],p[1]+3,7,GREEN);}
      }
      sparks(g,FUN.x+121,FUN.y+72,seg(T,4.05,4.65),15,6,GREEN);
    }
  };
})();
