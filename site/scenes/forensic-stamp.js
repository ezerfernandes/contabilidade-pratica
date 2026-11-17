// Forensic stamp: evidence is examined and connected to a grounded expert conclusion.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,circle,lerp}=R;
  const D={x:9,y:-151,w:160,h:104},ME=-40,HANDLE=[-8,-84],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function desk(g,scanK,doneK){
    rr(g,D.x,D.y,D.w,D.h,8);inkFill(g,C.paper,1.7);text(g,'PERÍCIA CONTÁBIL',D.x+D.w/2,D.y+15,8.2,C.umber);
    for(let i=0;i<3;i++){const x=D.x+13+i*39,y=D.y+29+i*4;rr(g,x,y,52,42,4);inkFill(g,'#f2efe6',1,C.faint);ln(g,x+8,y+12,x+43,y+12,1,C.muted);ln(g,x+8,y+21,x+37,y+21,1,C.muted);text(g,['DOC.','CÁLC.','QUES.'][i],x+26,y+35,7,i===1?BLUE:C.muted);}
    const lx=lerp(D.x+33,D.x+110,E.soft(scanK)),ly=D.y+54;circle(g,lx,ly,17);g.strokeStyle=GREEN;g.lineWidth=3;g.stroke();ln(g,lx-13,ly+13,lx-31,ly+31,4,GREEN);
    rr(g,D.x+101,D.y+77,50,19,4);inkFill(g,doneK>0?'#d7eadf':'#eee9dc',1.1);text(g,doneK>0?'LAUDO':'CONCLUSÃO',D.x+126,D.y+90,7.3,doneK>0?GREEN:C.muted);tickBadge(g,D.x+D.w-7,D.y+5,doneK,7,'#d7eadf',GREEN);
  }
  SC['forensic-stamp']={
    dur:6.5,width:420,label:'Uma perita examina documentos com uma lente e transforma evidências em conclusão técnica fundamentada no laudo.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),scanK=0,doneK=0,cheer=0;
      if(T<0){pose=mix(pose,P({hF:[10,-95],head:[8,-115]}),pulse(t,5.9,2,2));}
      else{
        const fade=1-seg(T,5.95,6.5);scanK=E.soft(seg(T,.65,3.2))*fade;const reach=E.soft(seg(T,.35,.65))*(1-E.soft(seg(T,3.2,3.5)));
        pose=mix(pose,P({hF:lp([HANDLE[0]+9,HANDLE[1]+2],ME,0,1),hB:[-5,-55],head:[8,-115]}),reach);doneK=seg(T,3.35,3.85)*fade;
        cheer=E.back(seg(T,3.9,4.3))*(1-E.soft(seg(T,4.95,5.35)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);
      }
      pose=legs(pose,0,0,{arms:false});desk(g,scanK,doneK);fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});sparks(g,D.x+126,D.y+84,seg(T,3.6,4.25),16,7,GREEN);
    }
  };
})();
