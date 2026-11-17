// Statements splitter: one credit sale is read through BP, DRE and DFC.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,lerp,arcPt}=R;
  const M={x:8,y:-156,w:164,h:112},ME=-40,LEVER=[-10,-88],GREEN='#1f6b55',RED='#e65d3b',BLUE='#3b6f8f';
  function splitter(g,leverK,doneK){
    rr(g,M.x,M.y,M.w,M.h,8);inkFill(g,C.paper,1.7);
    text(g,'VENDA A PRAZO',M.x+M.w/2,M.y+16,8.2,C.umber);
    rr(g,M.x+51,M.y+24,62,22,5);inkFill(g,C.butter,1.2);text(g,'R$ 1.000',M.x+82,M.y+39,9,C.ink);
    ln(g,M.x+82,M.y+46,M.x+82,M.y+61,2,C.muted);
    const labs=[['BP',GREEN],['DRE',RED],['DFC',BLUE]];
    labs.forEach((a,i)=>{const x=M.x+9+i*52;rr(g,x,M.y+69,45,29,5);inkFill(g,'#f2efe6',1.1);text(g,a[0],x+22.5,M.y+86,9,a[1]);tickBadge(g,x+39,M.y+72,doneK-i*.12,5,'#d7eadf',GREEN);});
    const a=lerp(-1.15,.4,E.soft(leverK));ln(g,LEVER[0],LEVER[1],LEVER[0]+Math.cos(a)*23,LEVER[1]+Math.sin(a)*23,3,C.ink);rr(g,LEVER[0]-4,LEVER[1]-4,8,8,3);inkFill(g,C.paper,1);rr(g,LEVER[0]+Math.cos(a)*23-4,LEVER[1]+Math.sin(a)*23-4,8,8,3);inkFill(g,RED,1,C.ink);
  }
  SC['statements-splitter']={
    dur:6.7,width:430,label:'Uma empreendedora coloca uma venda a prazo em uma máquina que separa o mesmo fato em Balanço Patrimonial, DRE e DFC.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),leverK=0,doneK=0,cheer=0;
      if(T<0){pose=mix(pose,P({hF:[10,-95],head:[8,-115]}),pulse(t,5.9,2,2));}
      else{
        const fade=1-seg(T,6.1,6.7),reach=E.soft(seg(T,.4,.72))*(1-E.soft(seg(T,1.85,2.15)));
        pose=mix(pose,P({hF:lp([LEVER[0]+8,LEVER[1]+5],ME,0,1),hB:[-5,-54],head:[8,-115]}),reach);
        leverK=E.soft(seg(T,.8,1.45))*fade;doneK=seg(T,2.0,3.8)*fade;
        cheer=E.back(seg(T,4.05,4.45))*(1-E.soft(seg(T,5.15,5.55)));pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);
      }
      pose=legs(pose,0,0,{arms:false});splitter(g,leverK,doneK);
      const cols=[GREEN,RED,BLUE];for(let i=0;i<3;i++){const k=seg(T,1.6+i*.25,2.55+i*.25);if(k>0&&k<1){const p=arcPt([M.x+82,M.y+50],[M.x+31+i*52,M.y+68],9,E.soft(k));rr(g,p[0]-5,p[1]-4,10,8,2);inkFill(g,cols[i],.8,C.ink);}}
      fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});sparks(g,M.x+M.w/2,M.y+104,seg(T,3.6,4.25),17,7,GREEN);
    }
  };
})();
