


function calculaQ0(){
    /* Pegar os inputs */
    let diametro = document.getElementById("diametroq0").value;
    let comprimento = document.getElementById("comprimentoq0").value;
    let vazao = document.getElementById("vazaoq0").value;
    let roAgua = 1000;  /* massa específica */
    let miAgua = 1/1000; /* viscosidade */
    //let rugosidadeMaterial = 0.046 /* mm */

    let rugosidadeMaterial = document.getElementById("selectmaterial").value
    console.log(rugosidadeMaterial)

    /* Transformar em Number */
    diametro = Number(diametro);
    comprimento = Number(comprimento);
    vazao = Number(vazao);
    rugosidadeMaterial = Number(rugosidadeMaterial);

    /* Passar para SI, se precisar */
    let vazao_SI = vazao * Math.pow(10,-3) * (1/60);
    let diametro_SI = diametro * Math.pow(10,-3); /* mm -> m */
    let rugosidade_SI = rugosidadeMaterial * Math.pow(10,-3)

    /* Aplicar regras e fórmulas */

    /* Q = V*A */
    let V = (vazao_SI * 4) / (math.pi * Math.pow(diametro_SI, 2))
    /* Colocando em duas casas decimais */
    V = V * 100;
    V = Math.trunc(V);
    V = V/100;


    /* Re = rô * V * D/ mi  */
    let reynolds = (roAgua * V * diametro_SI) / miAgua

    /* e/D  *********Rugosidade do aço comercial: 0,046 mm */ 
    let rugosidadeRelativa = rugosidade_SI / diametro_SI; 


    /* Aproximação de Moody para a relação de Colebrook (Cálculo do fator de atrito) */
    let f = 0.0055 * (1 + Math.pow((2*Math.pow(10,4) * rugosidadeRelativa + (Math.pow(10,6)/reynolds) ), 1/3 ) );

    /* Colocando em três casas decimais */
    f = f * 1000;
    f = Math.trunc(f);
    f = f/1000;


    
    /* Cálculo da queda da pressão */
    let n_Le_D = 4 * 30 /* 4 cotovelos de 90 graus */
    let quedaPressao = roAgua * f * (Math.pow(V, 2) / 2) * ((comprimento/diametro_SI) + n_Le_D)
    

    /* ************************************************************************ */
    //Renderizar resultados:
    const resolucao = document.getElementById('resolucaoq0')
    resolucao.innerHTML = '' //limpa
    resolucao.style.display = 'flex'

    const titulo = document.createElement('h1')
    titulo.classList.add("h1resolucao")
    titulo.innerHTML = `Resultados`

    /* ************************************************************************ */

    const hipoteses = document.createElement('ul')
    
    const hip1 = document.createElement('li')
    hip1.innerHTML = `Regime Permanente`

    const hip2 = document.createElement('li')
    hip2.innerHTML = `Plenamente desenvolvido`

    hipoteses.appendChild(hip1)
    hipoteses.appendChild(hip2)


    const divimagens = document.createElement('div');
    divimagens.classList.add("divimagens");

    const imagem1 = document.createElement('img');
    imagem1.src = '/src/bernoulliModificada.png'
    
    const imagem2 = document.createElement('img');
    imagem2.src = '/src/escoamentoTurbulento.png'

    const imagem3 = document.createElement('img');
    imagem3.src = '/src/formulageralex0.png'

    divimagens.appendChild(imagem1);
    divimagens.appendChild(imagem2);
    divimagens.appendChild(imagem3);



    /* ************************************************************************ */

    const lista = document.createElement('ul');

    const linha1 = document.createElement('li')
    linha1.innerHTML = `Fator de atrito, f = ${f}`

    const linha2 = document.createElement('li')
    linha2.innerHTML = `Queda de pressão, &#916;p = ${quedaPressao.toFixed(2)} Pa`

    lista.appendChild(linha1);
    lista.appendChild(linha2);
    
    resolucao.appendChild(titulo)
    resolucao.appendChild(hipoteses)
    resolucao.appendChild(divimagens)
    resolucao.appendChild(lista)
    
}


function calculaQ1(){
    let pressao1 = document.getElementById("pressaoq1").value;
    let n = document.getElementById("nq1").value;
    let volume1 = document.getElementById("volume1").value;
    let volume2 = document.getElementById("volume2").value;


    volume1 = Number(volume1);
    volume2 = Number(volume2);
    pressao1 = Number(pressao1)
    let pressao1_SI = pressao1 * Math.pow(10,5) //Pascal
    n = Number(n)
    

    //CALCULA PRESSÃO 2: p1V1^n = p2V2^n
    let pressao2_SI = pressao1_SI * (Math.pow((volume1/volume2), n))
    let pressao2_KPa = pressao2_SI / 1000
    let pressao2 = pressao2_SI / Math.pow(10,5) //pressão 2 em bar

    let W = 0;
    //Para n =1: 
    if(n==1){
        W = pressao1_SI * volume1 * Math.log(volume2/volume1)
        W = W/1000 //KJ
    }else{
        //Expressão Geral do Trabalho para n != 1:
        W = ((pressao2_SI * volume2) - (pressao1_SI * volume1))  / (1 -n)
        W = W/1000 //KJ
    }
    
    /* ************************************************************************ */
    //Renderizar resultados:
    const resolucao = document.getElementById('resolucaoq1')
    resolucao.innerHTML = '' //limpa
    resolucao.style.display = 'flex'

    const titulo = document.createElement('h1')
    titulo.classList.add("h1resolucao")
    titulo.innerHTML = `Resultados`


    /* ************************************************************************ */
    const divimagens = document.createElement('div');
    divimagens.classList.add("divimagens");

    const imagem1 = document.createElement('img');
    imagem1.src = '/src/Trabalho.png'

    const imagem2 = document.createElement("img")
    imagem2.src = '/src/p1v1p2v2.png'

    const imagem3 =document.createElement("img")
    imagem3.src = '/src/Wformulageral.png'

    divimagens.appendChild(imagem1);
    divimagens.appendChild(imagem2);
    divimagens.appendChild(imagem3);

    /* ************************************************************************ */

    const lista = document.createElement('ul');

    const linha1 = document.createElement('li')
    linha1.innerHTML = `W = ${W.toFixed(2)} KJ`

    const linha2 = document.createElement('li')
    linha2.innerHTML = `Pressão final = ${pressao2_KPa.toFixed(2)} KPa`

    lista.appendChild(linha1);
    lista.appendChild(linha2);
    
    resolucao.appendChild(titulo)
    resolucao.appendChild(divimagens)
    resolucao.appendChild(lista)
    
}


function calculaQ2(){
    /* Pegar os inputs */
    let espessura = document.getElementById("espessuraq2").value;
    let k = document.getElementById("condutividadeq2").value;
    let temperaturaInterna = document.getElementById("temperatura1q2").value;
    let temperaturaExterna = document.getElementById("temperatura2q2").value;
    let altura = document.getElementById("dimensao1q2").value;
    let largura = document.getElementById("dimensao2q2").value;

    /* Transformar em Number */
    espessura = Number(espessura);
    k = Number(k);
    temperaturaInterna = Number(temperaturaInterna);
    temperaturaExterna = Number(temperaturaExterna);
    altura = Number(altura);
    largura = Number(largura);

    /* Passar para SI, se precisar */


    /* Aplicar regras e fórmulas */
    let A = altura * largura;
    /* Condução - Lei de Fourier */
    let taxaCalor = - k * A * ((temperaturaExterna - temperaturaInterna)/espessura)
    let taxaCalorKW = taxaCalor/1000; /* em KW */
    

    /* ************************************************************************ */
    //Renderizar resultados:
    const resolucao = document.getElementById('resolucaoq2')
    resolucao.innerHTML = '' //limpa
    resolucao.style.display = 'flex'

    const titulo = document.createElement('h1')
    titulo.classList.add("h1resolucao")
    titulo.innerHTML = `Resultados`

    /* ************************************************************************ */
    const divimagens = document.createElement('div');
    divimagens.classList.add("divimagens");

    const imagem1 = document.createElement('img');
    imagem1.src = '/src/leiFourierConducao.png'

    divimagens.appendChild(imagem1);

    /* ************************************************************************ */

    const lista = document.createElement('ul');

    const linha1 = document.createElement('li')
    linha1.innerHTML = `Taxa de transferência de calor = ${taxaCalorKW.toFixed(2)} KW`

    lista.appendChild(linha1);

    
    resolucao.appendChild(titulo)
    resolucao.appendChild(divimagens)
    resolucao.appendChild(lista)
    
}





let tempmax = document.getElementById("temperaturaq3");
let temp2max = document.getElementById("temperatura2q3");

tempmax.addEventListener("change", ()=>{
    temp2max.value = tempmax.value;
    temp2max.innerText = tempmax.value;
})

temp2max.addEventListener("change", ()=>{
    tempmax.value = temp2max.value;
    tempmax.innerText = temp2max.value;
})


function calculaQ3(){
    /* Pegar os inputs */
    let temperatura = tempmax.value;
    let aresta = document.getElementById("arestaq3").value;
    let diametropino = document.getElementById("diametropq3").value;
    let comprimentopino = document.getElementById("comprimentopq3").value;
    let N = 16; /* numero Aletas */
    let he = 1000;
    let k = 400;
    let Rcont = Math.pow(10,-4)
    let Lb = document.getElementById("comprimentopcbq3").value;
    let kb = 1;
    let hi = 40;
    let T_ar = document.getElementById("temparq3").value;

    /* Transformar em Number */
    temperatura = Number(temperatura);
    aresta = Number(aresta);
    diametropino = Number(diametropino);
    comprimentopino = Number(comprimentopino);
    T_ar = Number(T_ar);
    Lb = Number(Lb);

    /* Passar para SI, se precisar */
    let temperatura_SI = temperatura + 273; // C -> k
    let Tar_SI = T_ar + 273; // C -> k
    let aresta_SI = aresta * Math.pow(10,-3); /* mm -> m */
    let diametropino_SI = diametropino * Math.pow(10,-3); /* mm -> m */
    let comprimentopino_SI = comprimentopino * Math.pow(10,-3); /* mm -> m */
    let Lb_SI = Lb * Math.pow(10,-3); /* mm -> m */

    /* Aplicar regras e fórmulas */
    let Atrans = Math.pow(aresta_SI, 2); /* área transversal do chip (w x w) */

    Rcont = Rcont / Atrans;

    let m = Math.sqrt(((he * math.pi * diametropino_SI )/(k * math.pi * Math.pow(diametropino_SI,2) * 0.25)))  /* regra simplificada para pinos com seção circular */

    let Lc = comprimentopino_SI + (diametropino_SI/4); /* regra simplificada para pinos com seção circular */

    let eficiencia = (Math.tanh(m * Lc)) / (m * Lc)

    let Aaleta = math.pi * diametropino_SI * Lc; 

    let Abasealetas = (N * math.pi * Math.pow(diametropino_SI, 2)) / 4

    let Abase = Atrans - Abasealetas;

    let Ra = 1 / (he * Aaleta * N * eficiencia); 

    let Rbase = 1 / (he * Abase);

    let Rcond = Lb_SI / (kb * Atrans)
    
    let Rconv = 1 / (hi * Atrans)

    let Ri = Rcont + Rcond + Rconv

    Reqparcial = 1/Ra + 1/Rbase + 1/Ri

    Req = 1/Reqparcial


    /* Calcula Q ponto */

    let Q_ponto = (temperatura_SI - Tar_SI) / Req;


    /* ************************************************************************ */
    //Renderizar resultados:
    const resolucao = document.getElementById('resolucaoq3')
    resolucao.innerHTML = '' //limpa
    resolucao.style.display = 'flex'

    const titulo = document.createElement('h1')
    titulo.classList.add("h1resolucao")
    titulo.innerHTML = `Resultados`

    /* ************************************************************************ */

    const divimagens = document.createElement('div');
    divimagens.classList.add("divimagens");

    const imagem1 = document.createElement('img');
    imagem1.src = '/src/circuitotermal.png'

    const imagem2 = document.createElement('img');
    imagem2.src = '/src/Rcond.png'

    const imagem3 = document.createElement('img');
    imagem3.src = '/src/Rconv.png'

    const imagem4 = document.createElement('img');
    imagem4.src = '/src/Raleta.png'

    const imagem5 = document.createElement('img');
    imagem5.src = '/src/Rnaoaletada.png'
    
    divimagens.appendChild(imagem1);
    divimagens.appendChild(imagem2);
    divimagens.appendChild(imagem3);
    divimagens.appendChild(imagem4);
    divimagens.appendChild(imagem5);



    /* ************************************************************************ */

    const lista = document.createElement('ul');

    const linha1 = document.createElement('li')
    linha1.innerHTML = `R_aleta = ${Ra.toFixed(2)} K/W`

    const linha2 = document.createElement('li')
    linha2.innerHTML = `R_base = ${Rbase.toFixed(2)} K/W`

    const linha3 = document.createElement('li')
    linha3.innerHTML = `R_condução = ${Rcond.toFixed(2)} K/W`

    const linha4 = document.createElement('li')
    linha4.innerHTML = `R_convecção = ${Rconv.toFixed(2)} K/W`

    const linha5 = document.createElement('li')
    linha5.innerHTML = `R_contato = ${Rcont.toFixed(2)} K/W`

    const linha6 = document.createElement('li')
    linha6.innerHTML = `Resistência Equivalente = ${Req.toFixed(2)} K/W`

    const linha7 = document.createElement('li')
    linha7.innerHTML =`Taxa de transferência de calor = ${Q_ponto.toFixed(2)} KW`

    lista.appendChild(linha1);
    lista.appendChild(linha2);
    lista.appendChild(linha3);
    lista.appendChild(linha4);
    lista.appendChild(linha5);
    lista.appendChild(linha6);
    lista.appendChild(linha7);


    
    resolucao.appendChild(titulo)
    resolucao.appendChild(divimagens)
    resolucao.appendChild(lista)
}

