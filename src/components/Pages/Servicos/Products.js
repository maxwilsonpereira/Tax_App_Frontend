import React from "react";

import Compra from "./Compra.js";

const parcelasNum = 4;
const totalProducts = 9;

const Products = [
  <Compra
    key={1}
    id={1}
    highlight={true}
    totalProducts={totalProducts}
    title="Declaração de IR"
    subTitle="1 Fonte"
    descriptionA="Pessoas que não tem despesas a deduzir"
    descriptionB="Apenas 1 Fonte de Renda"
    descriptionC="Suporte para Malha Fina"
    descriptionD="Imposto entregue de forma correta"
    discount={5} // 5%
    oldPrice={79.9}
    // price={(oldPrice * ((100 - discount) * 0.01)).toFixed(2)}
    price={(79.9 * ((100 - 5) * 0.01)).toFixed(2)}
    // parcela(((100 - props.discount) * 0.01 * props.oldPrice) / parcelas).toFixed(2)
    parcela={(((100 - 5) * 0.01 * 79.9) / parcelasNum).toFixed(2)}
    pathProps="/comprar#start"
    // NEXT INFOS WILL BE SHOWN ONLY WHEN USER CLICK TO BUY:
    titleMain="Declaração de Imposto de Renda de Pessoa Física (1 Fonte)"
    descriptionMainA="Esse produto é para você que possui uma fonte de renda recebida de um empregador, pro labore do seu próprio negócio ou ainda renda do MEI. Nós preparamos esse serviço para você que faz a declaração usando como documentação base o informe de rendimentos da empresa onde você trabalha e que não utiliza as despesas médicas e odontológicas, incorridas durante o ano, seja para você ou para os seus dependentes."
    descriptionMainB="Esse serviço de declaração de imposto de renda, ainda permite que você declare itens de patrimônio, tais como imóveis, veículos automotores, saldos bancários e dívidas bancárias. No caso dos saldos bancários, nós  recomendamos aos nossos clientes que sempre encaminhem essa informação para a Receita Federal, para que ela possa ter em suas bases de dados toda a sua evolução patrimonial. Esse é um item, em nossa opinião, importante, pois a cada período de tempo a Receita Federal evolui seus controles e cruzamentos de informações."
    descriptionMainC="Esse serviço também contempla todo suporte caso o cliente caia na malha fina, ou seja, nós daremos as orientações necessárias de quais as documentações necessárias que o cliente deverá apresentar ao fiscal do imposto de renda. Além disso, se o cliente estiver com as declarações dos anos anteriores pendentes de envio, nós temos esse serviço disponível para contratação na área de serviços. Bastando apenas que o cliente se dirija até lá e informe quais os anos que estão em atraso e adquira o produto."
  />,
  <Compra
    key={2}
    id={2}
    highlight={true}
    totalProducts={totalProducts}
    title="Declaração de IR"
    subTitle="2 Fontes"
    descriptionA="Pessoas que não tem despesas a deduzir"
    descriptionB="Apenas 2 Fontes de Renda"
    descriptionC="Suporte para Malha Fina"
    descriptionD="Imposto entregue de forma correta"
    discount={5} // 5%
    oldPrice={119}
    // price={(oldPrice * ((100 - discount) * 0.01)).toFixed(2)}
    price={(119 * ((100 - 5) * 0.01)).toFixed(2)}
    // parcela(((100 - props.discount) * 0.01 * props.oldPrice) / parcelas).toFixed(2)
    parcela={(((100 - 5) * 0.01 * 119) / parcelasNum).toFixed(2)}
    pathProps="/comprar#start"
    // NEXT INFOS WILL BE SHOWN ONLY WHEN USER CLICK TO BUY:
    titleMain="Declaração de Imposto de Renda de Pessoa Física (2 Fontes) - Sem Deduções"
    descriptionMainA="Esse produto é para você que possui duas fontes de renda, recebidas de mais de dois empregadores, empregador + pro labore do seu negócio ou ainda renda + renda do MEI. Nós preparamos esse serviço para você que faz a declaração usando como documentação base o informe de rendimentos da empresa onde você trabalha e que não utiliza as despesas médicas e odontológicas, incorridas durante o ano, seja para você ou para os seus dependentes."
    descriptionMainB="Esse serviço de declaração de imposto de renda, ainda permite que você declare itens de patrimônio, tais como imóveis, veículos automotores, saldos bancários e dívidas bancárias. No caso dos saldos bancários, nós  recomendamos aos nossos clientes que sempre encaminhem essa informação para a Receita Federal, para que ela possa ter em suas bases de dados toda a sua evolução patrimonial. Esse é um item, em nossa opinião, importante, pois a cada período de tempo a Receita Federal evolui seus controles e cruzamentos de informações."
    descriptionMainC="Esse serviço também contempla todo suporte caso o cliente caia na malha fina, ou seja, nós daremos as orientações necessárias de quais as documentações necessárias que o cliente deverá apresentar ao fiscal do imposto de renda. Além disso, se o cliente estiver com as declarações dos anos anteriores pendentes de envio, nós temos esse serviço disponível para contratação na área de serviços. Bastando apenas que o cliente se dirija até lá e informe quais os anos que estão em atraso e adquira o produto."
  />,
  <Compra
    key={3}
    id={3}
    highlight={true}
    totalProducts={totalProducts}
    title="Declaração de IR"
    subTitle="Completa"
    descriptionA="Uma ou mais fontes de renda"
    descriptionB="Apenas 2 Fontes de Renda"
    descriptionC="Suporte para Malha Fina"
    descriptionD="Imposto entregue de forma correta"
    discount={15.9}
    oldPrice={189}
    // price={(oldPrice * ((100 - discount) * 0.01)).toFixed(2)}
    price={(189 * ((100 - 15.9) * 0.01)).toFixed(2)}
    // parcela(((100 - props.discount) * 0.01 * props.oldPrice) / parcelas).toFixed(2)
    parcela={(((100 - 15.9) * 0.01 * 189) / parcelasNum).toFixed(2)}
    pathProps="/comprar#start"
    // NEXT INFOS WILL BE SHOWN ONLY WHEN USER CLICK TO BUY:
    titleMain="Declaração Completa de Imposto de Renda de Pessoa Física"
    descriptionMainA="Esse produto é para você que possui uma ou + fontes de renda recebidas de um ou + empregadores ou pro labore do seu próprio negócio. Nós preparamos esse serviço para você que faz a declaração usando como documentação base o informe de rendimentos das empresa onde você trabalha e que utiliza todas as despesas dedutíveis, tais como, despesas médicas e odontológicas, incorridas durante o ano, seja para você ou para os seus dependentes."
    descriptionMainB="Esse serviço de declaração de imposto de renda, ainda permite que você declare itens de patrimônio, tais como imóveis, veículos automotores, saldos bancários e dívidas bancárias. No caso dos saldos bancários, nós  recomendamos aos nossos clientes que sempre encaminhem essa informação para a Receita Federal, para que ela possa ter em suas bases de dados toda a sua evolução patrimonial. Esse é um item, em nossa opinião, importante, pois a cada período de tempo a Receita Federal evolui seus controles e cruzamentos de informações."
    descriptionMainC="Esse serviço também contempla todo suporte caso o cliente caia na malha fina, ou seja, nós daremos as orientações necessárias de quais as documentações necessárias que o cliente deverá apresentar ao fiscal do imposto de renda. Além disso, se o cliente estiver com as declarações dos anos anteriores pendentes de envio, nós temos esse serviço disponível para contratação na área de serviços. Bastando apenas que o cliente se dirija até lá e informe quais os anos que estão em atraso e adquira o produto."
  />,
  <Compra
    key={4}
    id={4}
    highlight={true}
    totalProducts={totalProducts}
    title="Declaração de IR"
    subTitle="1 Fonte + MEI"
    descriptionA="Pessoas que não tem despesas a deduzir"
    descriptionB="1 Fonte + Declaração PJ MEI"
    descriptionC="Suporte para Malha Fina"
    descriptionD="Imposto entregue de forma correta"
    discount={10.7}
    oldPrice={140}
    // price={(oldPrice * ((100 - discount) * 0.01)).toFixed(2)}
    price={(140 * ((100 - 10.7) * 0.01)).toFixed(2)}
    // parcela(((100 - props.discount) * 0.01 * props.oldPrice) / parcelas).toFixed(2)
    parcela={(((100 - 10.7) * 0.01 * 140) / parcelasNum).toFixed(2)}
    pathProps="/comprar#start"
    // NEXT INFOS WILL BE SHOWN ONLY WHEN USER CLICK TO BUY:
    titleMain="Declaração de Imposto de Renda de Pessoa Física 1 Renda + Declaração de Pessoa Jurídica MEI"
    descriptionMainA="Esse produto é para você que possui uma fonte de renda recebida do seu MEI. Além disso, preparamos a declaração anual do MEI. Nós preparamos esse serviço para você que faz a declaração usando como documentação base o informe de rendimentos da empresa onde você trabalha e que não utiliza as despesas médicas e odontológicas, incorridas durante o ano, seja para você ou para os seus dependentes."
    descriptionMainB="Esse serviço de declaração de imposto de renda, ainda permite que você declare itens de patrimônio, tais como imóveis, veículos automotores, saldos bancários e dívidas bancárias. No caso dos saldos bancários, nós  recomendamos aos nossos clientes que sempre encaminhem essa informação para a Receita Federal, para que ela possa ter em suas bases de dados toda a sua evolução patrimonial. Esse é um item, em nossa opinião, importante, pois a cada período de tempo a Receita Federal evolui seus controles e cruzamentos de informações."
    descriptionMainC="Esse serviço também contempla todo suporte caso o cliente caia na malha fina, ou seja, nós daremos as orientações necessárias de quais as documentações necessárias que o cliente deverá apresentar ao fiscal do imposto de renda. Além disso, se o cliente estiver com as declarações dos anos anteriores pendentes de envio, nós temos esse serviço disponível para contratação na área de serviços. Bastando apenas que o cliente se dirija até lá e informe quais os anos que estão em atraso e adquira o produto."
  />,
  <Compra
    key={5}
    id={5}
    highlight={false}
    totalProducts={totalProducts}
    title="Anos Anteriores"
    subTitle="1 Fonte"
    descriptionA="Pessoas que não entregaram imposto em anos anteriores"
    descriptionB="Apenas 1 Fonte de Renda"
    descriptionC="Suporte para Malha Fina"
    descriptionD="Imposto entregue de forma correta"
    discount={5}
    oldPrice={79.9}
    // price={(oldPrice * ((100 - discount) * 0.01)).toFixed(2)}
    price={(79.9 * ((100 - 5) * 0.01)).toFixed(2)}
    // parcela(((100 - props.discount) * 0.01 * props.oldPrice) / parcelas).toFixed(2)
    parcela={(((100 - 5) * 0.01 * 79.9) / parcelasNum).toFixed(2)}
    pathProps="/comprar#start"
    // NEXT INFOS WILL BE SHOWN ONLY WHEN USER CLICK TO BUY:
    titleMain="Declaração de Imposto de Renda de Pessoa Física (Anos Anteriores - 1 Fonte)"
    descriptionMainA="Esse produto é para você que possui uma ou duas fontes de renda recebida de um ou mais empregadores, pro labore do seu próprio negócio ou ainda renda do MEI, e que não tenha perdido o prazo de alguma declaração de imposto de renda de anos anteriores. Nós preparamos esse serviço para você selecionar uma ou mais declarações, de acordo com os prazos perdidos em anos anteriores. Para isso iremos precisar de todos os informes de rendimentos dos anos anteriores (referente aos anos, ou ao ano que contratar), bem como todas as informações a seguir. Para essa modalidade de declaração usamos a documentação base o informe de rendimentos da empresa onde você trabalha e não utilizamos as despesas médicas e odontológicas, incorridas durante o ano, como despesas dedutíveis, seja para você ou para os seus dependentes."
    descriptionMainB="Esse serviço de declaração de imposto de renda, ainda permite que você declare itens de patrimônio, tais como imóveis, veículos automotores, saldos bancários e dívidas bancárias. No caso dos saldos bancários, nós  recomendamos aos nossos clientes que sempre encaminhem essa informação para a Receita Federal, para que ela possa ter em suas bases de dados toda a sua evolução patrimonial. Esse é um item, em nossa opinião, importante, pois a cada período de tempo a Receita Federal evolui seus controles e cruzamentos de informações."
    descriptionMainC="Esse serviço também contempla todo suporte caso o cliente caia na malha fina, ou seja, nós daremos as orientações necessárias de quais as documentações necessárias que o cliente deverá apresentar ao fiscal do imposto de renda. Além disso, se o cliente estiver com as declarações dos anos anteriores pendentes de envio, nós temos esse serviço disponível para contratação na área de serviços. Bastando apenas que o cliente se dirija até lá e informe quais os anos que estão em atraso e adquira o produto."
  />,
  <Compra
    key={6}
    id={6}
    highlight={false}
    totalProducts={totalProducts}
    title="Declaração de IR"
    subTitle="Espólio Final"
    descriptionA="Declaração de Espólio e divisão de bens conforme Cartório / Decisão Judicial"
    descriptionB="Suporte a Malha Fina"
    descriptionC=""
    descriptionD=""
    discount={0}
    oldPrice={500}
    // price={(oldPrice * ((100 - discount) * 0.01)).toFixed(2)}
    price={(500 * ((100 - 0) * 0.01)).toFixed(2)}
    // parcela(((100 - props.discount) * 0.01 * props.oldPrice) / parcelas).toFixed(2)
    parcela={(((100 - 0) * 0.01 * 500) / parcelasNum).toFixed(2)}
    pathProps="/comprar#start"
    // NEXT INFOS WILL BE SHOWN ONLY WHEN USER CLICK TO BUY:
    titleMain="Declaração de IR - Declaração de Espólio Final"
    descriptionMainA=" Apesar do assunto tratar de uma situação delicada, a Declaração de Espólio é um procedimento fundamental após o falecimento de um contribuinte para a separação do patrimônio e encerramento da vida fiscal."
    descriptionMainB="É nessa hora que as dúvidas começam a aparecer, uma vez que, na maioria dos casos, os herdeiros e beneficiários desconhecem a forma de declarar esses bens a serem partilhados."
    descriptionMainC="Nós do Declaração de IR temos uma larga experiência nesse tipo de Declaração de Imposto de Renda, Declaração de Espólio Parcial e Final."
    descriptionMainD="Se um desses casos é o seu, fique à vontade para comprar online o produto e posteriormente nos encaminhar toda a documentação, para que possamos preencher de maneira adequada, a Declaração de Espólio (Parcial ou Final) e dentro do prazo estipulado pela Receita Federal, nós também fazermos a Declaração dos Herdeiros."
    descriptionMainE="Nesse valor não estão incluídos os valores referentes as Declarações dos Herdeiros. Se o seu Espólio tiver mais de 3 pessoas, entre em contato conosco para que possamos fazer um valor mais adequado e assim atendermos a todos."
  />,
  <Compra
    key={7}
    id={7}
    highlight={false}
    totalProducts={totalProducts}
    title="Declaração de IR"
    subTitle="Autônomo sem Livro Caixa"
    descriptionA="Declaração de autonomo que não possui Livro Caixa"
    descriptionB="Suporte a Malha Fina"
    descriptionC=""
    descriptionD=""
    discount={0}
    oldPrice={250}
    // price={(oldPrice * ((100 - discount) * 0.01)).toFixed(2)}
    price={(250 * ((100 - 0) * 0.01)).toFixed(2)}
    // parcela(((100 - props.discount) * 0.01 * props.oldPrice) / parcelas).toFixed(2)
    parcela={(((100 - 0) * 0.01 * 250) / parcelasNum).toFixed(2)}
    pathProps="/comprar#start"
    // NEXT INFOS WILL BE SHOWN ONLY WHEN USER CLICK TO BUY:
    titleMain="Declaração de IR - Autônomo sem Livro Caixa"
    descriptionMainA="Esse Declaração de Imposto de Renda é para o profissional autônomo que possui renda anual superior a R$28.559,70 e não tem controle de livro caixa para deduzir as despesas para que o seu negócio possa operar."
    descriptionMainB="Nós preparamos o seu livro caixa com as despesas essenciais para o funcionamento do seu negócio, bem como, as receitas recebidas ao longo do ano fiscal."
    descriptionMainC="A partir dessa Declaração de Imposto de Renda você terá um comprovante de renda que poderá ser entregue em qualquer instituição bancária e/ou financeira. Permitindo portanto que você possa melhorar a sua relação de crédito com bancos e financeiras e assim conseguir aquele empréstimo, ou financiamento que você está precisando."
    descriptionMainD="Esse serviço de declaração de imposto de renda, ainda permite que você declare itens de patrimônio, tais como imóveis, veículos automotores, saldos bancários e dívidas bancárias. No caso dos saldos bancários, nós recomendamos aos nossos clientes que sempre encaminhem essa informação para a Receita Federal, para que ela possa ter em suas bases de dados toda a sua evolução patrimonial. Esse é um item, em nossa opinião, importante, pois a cada período de tempo a Receita Federal evolui seus controles e cruzamentos de informações."
    descriptionMainE="Esse trabalho contempla ainda todo suporte necessário caso o cliente caia na malha fina, ou seja, nós daremos as orientações para envio de Declarações retificadoras, se for o caso, e quais as documentações necessárias que o cliente deverá apresentar ao fiscal do imposto de renda, online ou presencialmente."
    descriptionMainF="Além disso, se o cliente estiver com as declarações dos anos anteriores pendentes de envio, nós também poderemos prestar esse serviço, o mesmo está disponível para contratação na área de serviços. Bastando apenas que o cliente se dirija até lá e informe quais os anos que estão em atraso e adquira o produto."
  />,
  <Compra
    key={8}
    id={8}
    highlight={false}
    totalProducts={totalProducts}
    title="Declaração de IR"
    subTitle="Autônomo com Livro Caixa"
    descriptionA="Declaração de autonomo que já possui Livro Caixa"
    descriptionB="Suporte a Malha Fina"
    descriptionC=""
    descriptionD=""
    discount={0}
    oldPrice={160}
    // price={(oldPrice * ((100 - discount) * 0.01)).toFixed(2)}
    price={(160 * ((100 - 0) * 0.01)).toFixed(2)}
    // parcela(((100 - props.discount) * 0.01 * props.oldPrice) / parcelas).toFixed(2)
    parcela={(((100 - 0) * 0.01 * 160) / parcelasNum).toFixed(2)}
    pathProps="/comprar#start"
    // NEXT INFOS WILL BE SHOWN ONLY WHEN USER CLICK TO BUY:
    titleMain="Declaração de IR - Autônomo com Livro Caixa"
    descriptionMainA="Essa Declaração de Imposto de Renda é para o profissional autônomo que possui renda anual superior a R$28.559,70 e tem controle de livro caixa, em arquivo eletrônico, para deduzir as despesas para que o seu negócio possa operar."
    descriptionMainB="Nós preparamos o seu livro caixa com as despesas essenciais para o funcionamento do seu negócio, bem como, as receitas recebidas ao longo do ano fiscal."
    descriptionMainC="A partir dessa Declaração de Imposto de Renda você terá um comprovante de renda que poderá ser entregue em qualquer instituição bancária e/ou financeira. Permitindo portanto que você possa melhorar a sua relação de crédito com bancos e financeiras e assim conseguir aquele empréstimo, ou financiamento que você está precisando."
    descriptionMainD="Esse serviço de declaração de imposto de renda, ainda permite que você declare itens de patrimônio, tais como imóveis, veículos automotores, saldos bancários e dívidas bancárias. No caso dos saldos bancários, nós recomendamos aos nossos clientes que sempre encaminhem essa informação para a Receita Federal, para que ela possa ter em suas bases de dados toda a sua evolução patrimonial. Esse é um item, em nossa opinião, importante, pois a cada período de tempo a Receita Federal evolui seus controles e cruzamentos de informações."
    descriptionMainE="Esse trabalho contempla ainda todo suporte necessário caso o cliente caia na malha fina, ou seja, nós daremos as orientações para envio de Declarações retificadoras, se for o caso, e quais as documentações necessárias que o cliente deverá apresentar ao fiscal do imposto de renda, online ou presencialmente."
    descriptionMainF="Além disso, se o cliente estiver com as declarações dos anos anteriores pendentes de envio, nós também poderemos prestar esse serviço, o mesmo está disponível para contratação na área de serviços. Bastando apenas que o cliente se dirija até lá e informe quais os anos que estão em atraso e adquira o produto."
  />,
  <Compra
    key={9}
    id={9}
    highlight={false}
    totalProducts={totalProducts}
    title="Declaração de IR"
    subTitle="Ganhos de Capital"
    descriptionA="Apuração de Ganhos de Capital"
    descriptionB="Apuração de Ganho para 1 Bem"
    descriptionC="Suporte para Malha Fina"
    descriptionD=""
    discount={0}
    oldPrice={1500}
    // price={(oldPrice * ((100 - discount) * 0.01)).toFixed(2)}
    price={(1500 * ((100 - 0) * 0.01)).toFixed(2)}
    // parcela(((100 - props.discount) * 0.01 * props.oldPrice) / parcelas).toFixed(2)
    parcela={(((100 - 0) * 0.01 * 1500) / parcelasNum).toFixed(2)}
    pathProps="/comprar#start"
    // NEXT INFOS WILL BE SHOWN ONLY WHEN USER CLICK TO BUY:
    titleMain="Declaração de Ganhos de Capital"
    descriptionMainA="Essa Declaração é para você que nesse ano vendeu, doou ou transferiu um BEM (ou um conjunto de bens de mesma natureza) por valor superior ao seu custo."
    descriptionMainB="Nós preparamos a sua Declaração de Ganhos de Capital, ou GCAP, com base no preço de venda, menos os custos do BEM. Para entender quais são os valores que você deve considerar como agregadores de custo do bem vendido, entre em contato conosco para que possamos assessorá-lo a juntar documentação correta."
    descriptionMainC="Caso você tenha alienado uma posição societária numa companhia onde você era sócio, ou tenha alienado integralmente a sua participação societária na sua empresa, você também pode adquirir esse produto."
    descriptionMainD="A maioria das pessoas, muitas vezes por não saberem, acabam achando que essa Declaração só deverá ser feita junto com a Declaração de Ajuste anual que é informada no ano seguinte entre Março e Abril. Quando na realidade deverá ser declarado no mês subsequente a alienação (ou venda) do BEM."
  />,
];
export default Products;
