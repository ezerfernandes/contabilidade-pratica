// ROAS balance: conversion value is compared with ad spend, without pretending it is profit.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const B={x:8,y:-153,w:166,h:106},ME=-40,LEVER=[-9,-87],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function balance(g,leverK,doneK){
    rr(g,B.x,B.y,B.w,B.h,8);inkFill(g,C.paper,1.7);text(g,'RETORNO DA MÍDIA',B.x+B.w/2,B.y+15,8.2,C.umber);
    const tilt=lerp(.12,-.1,E.soft(leverK)),cx=B.x+82,cy=B.y+49,len=56;g.save();g.translate(cx,cy);g.rotate(tilt);ln(g,-len,0,len,0,2.3,C.ink);ln(g,-len,0,-len,18,1.4,C.ink);ln(g,len,0,len,18,1.4,C.ink);rr(g,-len-27,17,54,22,5);inkFill(g,'#f4ddd4',1);text(g,'MÍDIA R$1',-len,32,7.5,RED);rr(g,len-31,17,62,22,5);inkFill(g,'#d7eadf',1);text(g,'VALOR R$4',len,32,7.5,GREEN);g.restore();
    ln(g,cx,cy,cx,B.y+82,2.3,C.ink);rr(g,cx-27,B.y+80,54,8,3);inkFill(g,C.paper,1,C.ink);
    if(doneK>0){rr(g,B.x+18,B.y+88,55,17,4);inkFill(g,'#d7eadf',1);text(g,'ROAS 4×',B.x+45.5,B.y+100,7.8,GREEN);rr(g,B.x+96,B.y+88,55,17,4);inkFill(g,'#f4ddd4',1);text(g,'≠ LUCRO',B.x+123.5,B.y+100,7.8,RED);}tickBadge(g,B.x+B.w-7,B.y+5,doneK,7,'#d7eadf',GREEN);
    const a=lerp(-1.1,.4,E.soft(leverK));ln(g,LEVER[0],LEVER[1],LEVER[0]+Math.cos(a)*22,LEVER[1]+Math.sin(a)*22,3,C.ink);circle(g,LEVER[0],LEVER[1],4);inkFill(g,C.paper,1);circle(g,LEVER[0]+Math.cos(a)*22,LEVER[1]+Math.sin(a)*22,4.5);inkFill(g,RED,1,C.ink);
  }
  SC['roas-balance']={dur:6.5,width:430,label:'Uma gestora coloca investimento de mídia em uma balança e compara com o valor de conversão atribuído, sem confundir ROAS com lucro.',draw(g,S){
    const T=S.on?S.u*this.dur:-1,t=S.t;let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),leverK=0,doneK=0,cheer=0;
    if(T<0){pose=mix(pose,P({hF:[10,-96],head:[8,-115]}),pulse(t,5.9,2.1,2));}
    else{const fade=1-seg(T,5.95,6.5),reach=E.soft(seg(T,.4,.72))*(1-E.soft(seg(T,2.3,2.65)));pose=mix(pose,P({hF:lp([LEVER[0]+8,LEVER[1]+4],ME,0,1),hB:[-5,-55],head:[8,-115]}),reach);leverK=E.soft(seg(T,.8,2.2))*fade;doneK=seg(T,2.35,2.9)*fade;cheer=E.back(seg(T,3.55,3.95))*(1-E.soft(seg(T,4.8,5.2)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);}
    pose=legs(pose,0,0,{arms:false});balance(g,leverK,doneK);fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});sparks(g,B.x+45,B.y+91,seg(T,2.7,3.4),16,7,GREEN);
  }};
})();
