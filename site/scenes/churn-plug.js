// Churn plug: a manager closes the leak in the recurring-customer tank.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const TANK={x:-147,y:-151,w:164,h:104},ME=50,VALVE=[20,-82],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function tank(g,closeK,doneK){
    rr(g,TANK.x,TANK.y,TANK.w,TANK.h,9);inkFill(g,C.paper,1.7);text(g,'BASE RECORRENTE',TANK.x+TANK.w/2,TANK.y+15,8.1,C.umber);
    rr(g,TANK.x+13,TANK.y+27,TANK.w-28,57,6);inkFill(g,'#e6eef2',1.1,BLUE);
    const remain=Math.round(100-lerp(8,2,E.soft(closeK)));text(g,`${remain} CLIENTES`,TANK.x+TANK.w/2,TANK.y+55,12,BLUE);text(g,'início: 100',TANK.x+TANK.w/2,TANK.y+72,7,C.muted);
    ln(g,TANK.x+TANK.w-1,TANK.y+68,VALVE[0],VALVE[1],4,BLUE);circle(g,VALVE[0],VALVE[1],6);inkFill(g,C.paper,1.2,C.ink);
    const a=lerp(-.65,0,E.soft(closeK));ln(g,VALVE[0],VALVE[1],VALVE[0]+Math.cos(a)*15,VALVE[1]+Math.sin(a)*15,3,RED);
    const flow=1-closeK;for(let i=0;i<3;i++){const y=TANK.y+82+i*11*flow;if(flow>.05){circle(g,VALVE[0]+6+i*3,y,2.2);inkFill(g,BLUE,.7,BLUE);}}
    rr(g,TANK.x+37,TANK.y+90,90,17,4);inkFill(g,doneK>0?'#d7eadf':'#f2efe6',1);text(g,doneK>0?'CHURN 2%':'VAZAMENTO 8%',TANK.x+82,TANK.y+102,7.7,doneK>0?GREEN:RED);tickBadge(g,TANK.x+TANK.w-7,TANK.y+5,doneK,7,'#d7eadf',GREEN);
  }
  SC['churn-plug']={dur:6.5,width:430,label:'Uma gestora fecha o vazamento de um reservatório de clientes recorrentes para reduzir o churn.',draw(g,S){
    const T=S.on?S.u*this.dur:-1,t=S.t;let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),closeK=0,doneK=0,cheer=0;
    if(T<0){pose=mix(pose,P({hF:[10,-96],head:[8,-115]}),pulse(t,5.8,2,2));}
    else{const fade=1-seg(T,5.95,6.5),reach=E.soft(seg(T,.45,.8))*(1-E.soft(seg(T,2.75,3.1)));pose=mix(pose,P({hF:lp([VALVE[0]+8,VALVE[1]-2],ME,0,-1),hB:[-5,-55],head:[8,-115]}),reach);closeK=E.soft(seg(T,.85,2.6))*fade;doneK=seg(T,2.65,3.15)*fade;cheer=E.back(seg(T,3.4,3.8))*(1-E.soft(seg(T,4.8,5.2)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);}
    pose=legs(pose,0,0,{arms:false});tank(g,closeK,doneK);fig(g,pose,ME,0,{sx:-1,wave:S.wave,wt:S.wt});sparks(g,TANK.x+82,TANK.y+98,seg(T,2.95,3.65),16,7,GREEN);
  }};
})();
