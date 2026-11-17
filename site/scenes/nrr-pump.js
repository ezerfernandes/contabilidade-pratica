// NRR pump: expansion revenue offsets contraction and churn in the same customer base.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const M={x:8,y:-154,w:166,h:108},ME=-40,PUMP=[-9,-87],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function meter(g,pumpK,doneK){
    rr(g,M.x,M.y,M.w,M.h,8);inkFill(g,C.paper,1.7);text(g,'RECEITA DA MESMA BASE',M.x+M.w/2,M.y+15,7.8,C.umber);
    const vals=[['INÍCIO','100',BLUE],['PERDAS','-12',RED],['EXPANSÃO','+15',GREEN]];vals.forEach((v,i)=>{const x=M.x+10+i*50;rr(g,x,M.y+27,45,29,5);inkFill(g,'#f2efe6',1);text(g,v[0],x+22.5,M.y+38,6.3,C.muted);text(g,v[1],x+22.5,M.y+52,9,v[2]);});
    rr(g,M.x+24,M.y+68,116,25,5);inkFill(g,doneK>0?'#d7eadf':'#eee9dc',1.1);text(g,doneK>0?'NRR 103%':'100 − 12 + 15',M.x+82,M.y+85,9,doneK>0?GREEN:C.muted);tickBadge(g,M.x+M.w-7,M.y+5,doneK,7,'#d7eadf',GREEN);
    const y=lerp(PUMP[1]-14,PUMP[1]+11,E.soft(pumpK));ln(g,PUMP[0],PUMP[1]+10,PUMP[0],y,3,C.ink);ln(g,PUMP[0]-10,y,PUMP[0]+10,y,3,C.ink);circle(g,PUMP[0],PUMP[1]+12,5);inkFill(g,C.paper,1,C.ink);
  }
  SC['nrr-pump']={dur:6.5,width:430,label:'Uma controller bombeia receita de expansão para compensar contrações e churn e leva a retenção líquida acima de cem por cento.',draw(g,S){
    const T=S.on?S.u*this.dur:-1,t=S.t;let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),pumpK=0,doneK=0,cheer=0;
    if(T<0){pose=mix(pose,P({hF:[10,-96],head:[8,-115]}),pulse(t,5.9,2.1,2));}
    else{const fade=1-seg(T,5.95,6.5);pumpK=.5+.5*Math.sin(seg(T,.7,2.8)*Math.PI*6);const reach=E.soft(seg(T,.35,.65))*(1-E.soft(seg(T,2.8,3.1))),hand=[PUMP[0]+8,lerp(PUMP[1]-14,PUMP[1]+11,E.soft(pumpK))];pose=mix(pose,P({hF:lp(hand,ME,0,1),hB:[-5,-55],head:[8,-115]}),reach);doneK=seg(T,2.9,3.4)*fade;cheer=E.back(seg(T,3.55,3.95))*(1-E.soft(seg(T,4.85,5.25)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);}
    pose=legs(pose,0,0,{arms:false});meter(g,pumpK,doneK);fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});sparks(g,M.x+82,M.y+80,seg(T,3.15,3.85),17,7,GREEN);
  }};
})();
