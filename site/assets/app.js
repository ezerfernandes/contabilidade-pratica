(function(){
  const defaults={receita:50000,cmv:18000,variaveis:5000,fixos:16000,caixa:30000,marketing:6000,leads:320,clientes:24,receitaMarketing:21000,ticket:900,meses:8};
  const ids=Object.keys(defaults);
  const el=Object.fromEntries(ids.map(id=>[id,document.getElementById(id)]));
  const out=id=>document.getElementById(id);
  const val=id=>Math.max(0,Number(el[id].value)||0);
  const money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(Number.isFinite(n)?n:0);
  const pct=n=>new Intl.NumberFormat('pt-BR',{style:'percent',minimumFractionDigits:1,maximumFractionDigits:1}).format(Number.isFinite(n)?n:0);
  const num=n=>new Intl.NumberFormat('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}).format(Number.isFinite(n)?n:0);
  function update(){
    const receita=val('receita'),cmv=val('cmv'),variaveis=val('variaveis'),fixos=val('fixos'),caixa=val('caixa'),marketing=val('marketing');
    const leads=val('leads'),clientes=val('clientes'),receitaMkt=val('receitaMarketing'),ticket=val('ticket'),meses=Math.max(1,val('meses'));
    const lucroBruto=receita-cmv;
    const margemBruta=receita?lucroBruto/receita:0;
    const contribuicao=receita-cmv-variaveis;
    const margemContribuicao=receita?contribuicao/receita:0;
    const resultado=contribuicao-fixos-marketing;
    const margemOperacional=receita?resultado/receita:0;
    const equilibrio=margemContribuicao>0?(fixos+marketing)/margemContribuicao:0;
    const cobertura=equilibrio?receita/equilibrio:0;
    const cac=clientes?marketing/clientes:0;
    const conversao=leads?clientes/leads:0;
    const roas=marketing?receitaMkt/marketing:0;
    const ltv=ticket*Math.max(0,margemBruta)*meses;
    const ltvCac=cac?ltv/cac:0;
    const margemTicket=ticket*Math.max(0,margemBruta);
    const payback=margemTicket?cac/margemTicket:0;
    const runway=resultado<0?caixa/Math.abs(resultado):Infinity;

    out('resultado').textContent=money(resultado);
    out('resultadoNota').textContent=pct(margemOperacional)+' da receita';
    out('equilibrio').textContent=margemContribuicao>0?money(equilibrio):'—';
    out('equilibrioNota').textContent=equilibrio?Math.round(equilibrio/Math.max(receita,1)*100)+'% da receita atual':'margem insuficiente';
    out('cobertura').textContent=equilibrio?Math.round(cobertura*100)+'%':'—';
    out('coberturaBar').style.width=Math.min(100,Math.max(0,cobertura/1.5*100))+'%';
    out('coberturaBar').style.background=cobertura>=1?'#1f6b55':'#e65d3b';
    out('margemBruta').textContent=pct(margemBruta);
    out('margemContribuicao').textContent=pct(margemContribuicao);
    out('cac').textContent=clientes?money(cac):'—';
    out('conversao').textContent=leads?pct(conversao):'—';
    out('roas').textContent=marketing?num(roas)+'×':'—';
    out('ltvCac').textContent=cac?num(ltvCac)+'×':'—';
    out('payback').textContent=margemTicket?num(payback)+' '+(payback===1?'mês':'meses'):'—';
    out('runway').textContent=resultado<0?(Number.isFinite(runway)?num(runway)+' meses':'—'):'gerando';

    let title,action,status='atenção',warning=true;
    if(margemContribuicao<=0){
      title='Cada nova venda aumenta a pressão sobre o caixa.';
      action='Revise preço, custo direto, taxas e mix de produtos. Escalar aquisição com margem de contribuição negativa amplifica a perda.';
    }else if(resultado<0){
      title='A margem existe, mas ainda não cobre a estrutura.';
      action='Use o ponto de equilíbrio como meta operacional. Corte desperdícios, renegocie fixos e proteja o caixa até a receita cobrir a estrutura.';
    }else if(ltvCac>0&&ltvCac<1){
      title='A operação dá resultado, mas a aquisição não se paga.';
      action='Reduza CAC, melhore retenção ou aumente a margem antes de elevar investimento. Separe os dados por canal e por coorte.';
    }else if(roas>0&&roas<1){
      title='Há lucro operacional, mas a mídia retorna menos receita do que consome.';
      action='Revise atribuição, campanhas e oferta. Pause o que não gera receita incremental e preserve os canais que trazem clientes de melhor valor.';
    }else{
      title='A operação cobre a estrutura e o crescimento tem base econômica.';
      action='Escale em pequenos passos. Acompanhe caixa, margem e payback por coorte para garantir que o ganho de volume não degrade a qualidade.';
      status='base saudável';warning=false;
    }
    out('diagnostico').textContent=title;
    out('acao').textContent=action;
    out('statusGeral').textContent=status;
    out('statusGeral').classList.toggle('warning',warning);
  }
  ids.forEach(id=>el[id].addEventListener('input',update));
  document.getElementById('resetar').addEventListener('click',()=>{ids.forEach(id=>el[id].value=defaults[id]);update()});
  document.querySelectorAll('[data-replay]').forEach(button=>button.addEventListener('click',()=>{
    const scene=document.querySelector('stick-scene[scene="'+button.dataset.replay+'"]');
    if(scene&&typeof scene.play==='function')scene.play();else if(scene)scene.click();
  }));
  update();
})();
