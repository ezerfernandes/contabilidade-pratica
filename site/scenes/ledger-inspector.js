// Ledger inspector: a journal entry is posted, balances line up, and BP/DRE/DFC reports emerge.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,lerp}=R;
  const BOOK={x:-8,y:-148,w:96,h:96},ME=-35,GREEN='#1f6b55',BLUE='#3b6f8f',RED='#e65d3b';
  function ledger(g,writeK,doneK){
    rr(g,BOOK.x,BOOK.y,BOOK.w,BOOK.h,6);inkFill(g,C.paper,1.7);
    rr(g,BOOK.x+9,BOOK.y+11,BOOK.w-18,18,4);inkFill(g,C.butter,1.1);
    text(g,'LIVRO RAZÃO',BOOK.x+BOOK.w/2,BOOK.y+24,8.5,C.umber);
    ln(g,BOOK.x+BOOK.w/2,BOOK.y+36,BOOK.x+BOOK.w/2,BOOK.y+81,1,C.faint);
    text(g,'D',BOOK.x+25,BOOK.y+45,8,BLUE);
    text(g,'C',BOOK.x+71,BOOK.y+45,8,RED);
    for(let i=0;i<3;i++){
      const y=BOOK.y+55+i*11,k=Math.max(0,Math.min(1,writeK*3-i));
      if(k>0){ln(g,BOOK.x+14,y,lerp(BOOK.x+14,BOOK.x+39,k),y,2,BLUE);ln(g,BOOK.x+57,y,lerp(BOOK.x+57,BOOK.x+82,k),y,2,RED);}
    }
    tickBadge(g,BOOK.x+BOOK.w-2,BOOK.y+5,doneK,7,'#d7eadf',GREEN);
  }
  function reports(g,k){
    const labels=[['BP',GREEN],['DRE',RED],['DFC',BLUE]];
    for(let i=0;i<3;i++){
      const kk=Math.max(0,Math.min(1,k*3-i)),x=102+i*47,y=-132+i*8;
      if(kk<=0)continue;
      g.save();g.globalAlpha*=kk;g.translate(0,(1-E.out3(kk))*14);
      rr(g,x,y,40,54,5);inkFill(g,C.paper,1.4);
      text(g,labels[i][0],x+20,y+17,9,labels[i][1]);
      for(let j=0;j<3;j++)ln(g,x+8,y+28+j*7,x+32,y+28+j*7,1,C.muted);
      g.restore();
    }
  }
  SC['ledger-inspector']={
    dur:6.8,width:500,label:'Uma contadora registra um lançamento no livro razão e transforma os saldos em Balanço Patrimonial, DRE e DFC.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),writeK=0,doneK=0,reportK=0,cheer=0;
      if(T<0){pose=mix(pose,P({hF:[10,-96],head:[8,-115],hB:[-4,-54]}),pulse(t,5.8,2.0,2));}
      else{
        const fade=1-seg(T,6.25,6.8);
        const write=E.soft(seg(T,.45,.8))*(1-E.soft(seg(T,2.75,3.05)));
        const wiggle=Math.sin(T*26)*2*seg(T,.8,2.5)*(1-seg(T,2.35,2.55));
        pose=mix(pose,P({hF:lp([BOOK.x+7+wiggle,BOOK.y+68],ME,0,1),hB:[-4,-54],head:[9,-114],chest:[4,-89]}),write);
        writeK=seg(T,.85,2.55)*fade;doneK=seg(T,2.6,3.0)*fade;reportK=seg(T,3.0,4.25)*fade;
        cheer=E.back(seg(T,4.2,4.6))*(1-E.soft(seg(T,5.35,5.75)));
        pose=mix(pose,P({hF:[18,-131],hB:[-12,-128],head:[3,-118]}),cheer);
      }
      pose=legs(pose,0,0,{arms:false});
      ledger(g,writeK,doneK);reports(g,reportK);
      fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});
      if(doneK>0){g.save();g.globalAlpha*=doneK;text(g,'D = C',BOOK.x+BOOK.w/2,BOOK.y+108,10,GREEN);g.restore();}
      sparks(g,157,-145,seg(T,4.25,4.9),16,7,GREEN);
    }
  };
})();
