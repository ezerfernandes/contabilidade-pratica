// Break-even stamp: contribution blocks climb until fixed costs are covered, then the entrepreneur stamps the board.
(function(){
  const SC=(window.SCENES=window.SCENES||{}),R=window.RIG;
  const {C,E,P,mix,legs,fig,inkFill,rr,ln,text,seg,breathe,pulse,lp,sparks,tickBadge,lerp}=R;
  const BOARD={x:4,y:-158,w:154,h:115},ME=-92,INK='#1f6b55',RED='#e65d3b';
  function board(g,fill,done){
    ln(g,BOARD.x+20,BOARD.y+BOARD.h,BOARD.x+15,0,2.2);
    ln(g,BOARD.x+BOARD.w-20,BOARD.y+BOARD.h,BOARD.x+BOARD.w-15,0,2.2);
    rr(g,BOARD.x,BOARD.y,BOARD.w,BOARD.h,7);inkFill(g,C.paper,1.7);
    text(g,'PONTO DE EQUILÍBRIO',BOARD.x+BOARD.w/2,BOARD.y+17,8.2,C.umber);
    const chart={x:BOARD.x+14,y:BOARD.y+31,w:BOARD.w-28,h:61};
    rr(g,chart.x,chart.y,chart.w,chart.h,4);inkFill(g,'#f2efe6',1.1,C.faint);
    const targetY=chart.y+22;
    ln(g,chart.x+4,targetY,chart.x+chart.w-4,targetY,1.2,RED);
    text(g,'custos fixos',chart.x+chart.w-4,targetY-4,7,RED,'right');
    const bw=14,gap=4,n=Math.floor(fill*7);
    for(let i=0;i<7;i++){
      const bh=lerp(12,48,i/6),x=chart.x+7+i*(bw+gap),k=Math.max(0,Math.min(1,fill*7-i));
      if(k>0){rr(g,x,chart.y+chart.h-bh*k,bw,bh*k,3);inkFill(g,i>=4?'#a9d2be':C.butter,1,C.ink);}
    }
    tickBadge(g,BOARD.x+BOARD.w-7,BOARD.y+5,done,8,'#d7eadf',INK);
  }
  function stamp(g,x,y,k){
    if(k<=0)return;
    const z=lerp(1.7,1,E.out3(k));
    g.save();g.translate(x,y);g.rotate(-.08);g.scale(z,z);
    rr(g,-30,-11,60,22,4);inkFill(g,'#d7eadf',1.7,INK);
    text(g,'COBRIU!',0,4,9,INK);g.restore();
  }
  SC['breakeven-stamp']={
    dur:6.4,width:390,label:'Uma empreendedora vê as vendas cobrirem os custos fixos e carimba o ponto de equilíbrio alcançado.',
    draw(g,S){
      const T=S.on?S.u*this.dur:-1,t=S.t;
      let pose=breathe(P({hF:[12,-60],hB:[-4,-52]}),t),fill=.18,done=0,stampK=0,cheer=0;
      if(T<0){
        pose=mix(pose,P({hF:[10,-96],head:[7,-116],hB:[-4,-54]}),pulse(t,5.9,2,2));
      }else{
        const fade=1-seg(T,5.9,6.4);
        fill=lerp(.18,1,E.soft(seg(T,.45,3.05)))*fade+.18*(1-fade);
        const point=E.soft(seg(T,.4,.8))*(1-E.soft(seg(T,2.55,2.85)));
        pose=mix(pose,P({hF:lp([BOARD.x+55,BOARD.y+63],ME,0,1),hB:[-4,-54],head:[9,-115]}),point);
        const slam=E.soft(seg(T,3.05,3.35))*(1-E.soft(seg(T,3.75,4.05)));
        pose=mix(pose,P({hF:[23,-126],hB:[-4,-55],head:[6,-117]}),slam);
        stampK=seg(T,3.35,3.62)*fade;done=seg(T,3.52,3.92)*fade;
        cheer=E.back(seg(T,3.9,4.25))*(1-E.soft(seg(T,5.0,5.35)));
        pose=mix(pose,P({hF:[18,-132],hB:[-12,-129],head:[3,-118]}),cheer);
      }
      pose=legs(pose,0,0,{arms:false});
      board(g,fill,done);
      fig(g,pose,ME,0,{wave:S.wave,wt:S.wt});
      stamp(g,BOARD.x+BOARD.w/2,BOARD.y+101,stampK);
      sparks(g,BOARD.x+BOARD.w/2,BOARD.y+93,seg(T,3.55,4.15),17,7,INK);
    }
  };
})();
