export type Pizza = { name: string; description: string };
export type Item = { name: string; description?: string; price: number | { label: string; value: number }[] };

export type BorderOption = { name: string; price: number };

export type PizzaCategory = {
  id: string;
  title: string;
  subtitle: string;
  prices: { slices: string; flavors: string; price: number }[];
  pizzas: Pizza[];
  borderNote?: string;
  borders?: BorderOption[];
};

const BORDAS_SALGADAS: BorderOption[] = [
  { name: "Catupiry", price: 14 },
  { name: "Cheddar", price: 14 },
];

const BORDAS_DOCES: BorderOption[] = [
  { name: "Chocolate preto", price: 15 },
  { name: "Chocolate branco", price: 15 },
];

export const pizzaCategories: PizzaCategory[] = [
  {
    id: "tradicionais",
    title: "Pizzas Tradicionais",
    subtitle: "Salgadas",
    prices: [
      { slices: "04 Pedaços", flavors: "01 sabor",  price: 47.9 },
      { slices: "06 Pedaços", flavors: "02 sabores", price: 57.9 },
      { slices: "08 Pedaços", flavors: "03 sabores", price: 67.9 },
      { slices: "12 Pedaços", flavors: "04 sabores", price: 77.9 },
    ],
    borderNote: "Bordas: catupiry ou cheddar — R$ 14,00",
    pizzas: [
      { name: "Alho", description: "Muçarela e alho." },
      { name: "Alho II", description: "Muçarela e alho frito." },
      { name: "Atum", description: "Muçarela, atum e cebola." },
      { name: "Atum Caipira", description: "Muçarela, atum, bacon e milho." },
      { name: "Baiana", description: "Muçarela, calabresa, tomate, ovo, toque de pimenta calabresa e cebola." },
      { name: "Bacon", description: "Muçarela e bacon." },
      { name: "Bacon e Milho", description: "Muçarela, bacon e milho." },
      { name: "Crocante", description: "Muçarela, bacon e batata palha." },
      { name: "Calabresa", description: "Muçarela, calabresa e cebola." },
      { name: "Catupiresa", description: "Muçarela, calabresa e catupiry." },
      { name: "Palmito com Bacon", description: "Muçarela, palmito e bacon." },
      { name: "Frango com Catupiry", description: "Muçarela, frango desfiado, milho e catupiry." },
      { name: "Lombo", description: "Muçarela, lombo e cebola." },
      { name: "Marguerita", description: "Muçarela, tomate e manjericão." },
      { name: "Mexicana", description: "Muçarela, calabresa, tomate, pimentão, milho, cebola e pimenta calabresa." },
      { name: "Milho", description: "Muçarela e milho." },
      { name: "Rúcula com Tomate Seco", description: "Muçarela, tomate seco e rúcula." },
    ],
  },
  {
    id: "especiais",
    title: "Pizzas Especiais",
    subtitle: "Salgadas",
    prices: [
      { slices: "04 Pedaços", flavors: "01 sabor",  price: 49 },
      { slices: "06 Pedaços", flavors: "02 sabores", price: 59 },
      { slices: "08 Pedaços", flavors: "03 sabores", price: 69 },
      { slices: "12 Pedaços", flavors: "04 sabores", price: 79 },
    ],
    borderNote: "Bordas: catupiry ou cheddar — R$ 14,00",
    pizzas: [
      { name: "Calabacon", description: "Muçarela, calabresa, bacon e cebola." },
      { name: "4 Queijos", description: "Muçarela, catupiry, provolone, parmesão e cheddar." },
      { name: "Fricassé de Frango", description: "Frango desfiado cremoso, catupiry, muçarela e batata palha." },
      { name: "Frango com Bacon", description: "Muçarela, frango desfiado, bacon, catupiry e milho." },
      { name: "Pizza da Casa", description: "Muçarela, presunto, calabresa, bacon, milho, frango e catupiry." },
      { name: "Lombo a Califórnia", description: "Muçarela, lombo defumado, abacaxi e catupiry." },
      { name: "Lombo Canadense", description: "Muçarela, lombo defumado e catupiry." },
      { name: "Lombo com Cheddar", description: "Muçarela, lombo defumado e cheddar." },
      { name: "Tropical", description: "Muçarela, calabresa, azeitonas, milho, abacaxi, catupiry e bacon." },
      { name: "Frango Mexicano", description: "Muçarela, frango desfiado, catupiry, pimentão, tomate e pimenta calabresa." },
      { name: "Batata Frita com Cheddar", description: "Muçarela, batata frita e cheddar." },
      { name: "Batata Frita com Catupiry", description: "Muçarela, batata frita e catupiry." },
      { name: "Calabresa com Cream Cheese", description: "Muçarela, calabresa e cream cheese." },
      { name: "Cubana", description: "Molho de tomate, muçarela, calabresa e alho frito." },
      { name: "Frango com Cream Cheese", description: "Frango desfiado, muçarela e cream cheese." },
      { name: "Bacon com Banana", description: "Muçarela, bacon, catupiry e banana." },
      { name: "Forneiro", description: "Muçarela, frango, milho e palmito." },
      { name: "Portuguesa", description: "Muçarela, calabresa, tomate, milho, azeitonas, ervilha, ovo, palmito e cebola." },
      { name: "Strogonoff", description: "Muçarela, strogonoff de carne e batata palha." },
    ],
  },
  {
    id: "premium",
    title: "Pizzas Premium",
    subtitle: "Salgadas",
    prices: [
      { slices: "04 Pedaços", flavors: "01 sabor",  price: 57.9 },
      { slices: "06 Pedaços", flavors: "02 sabores", price: 67.9 },
      { slices: "08 Pedaços", flavors: "03 sabores", price: 77.9 },
      { slices: "12 Pedaços", flavors: "04 sabores", price: 87.9 },
    ],
    borderNote: "Bordas: catupiry ou cheddar — R$ 14,00",
    pizzas: [
      { name: "Filé Mignon", description: "Muçarela, filé mignon, catupiry e cebola." },
      { name: "Filé Mignon com Catupiry", description: "Muçarela, filé mignon e catupiry." },
      { name: "Filé Mignon com Cheddar", description: "Muçarela, filé mignon e cheddar." },
      { name: "Filé Mignon com Cream Cheese", description: "Muçarela, filé mignon e cream cheese." },
      { name: "5 Queijos", description: "Muçarela, parmesão, gorgonzola, catupiry e provolone." },
      { name: "Costela", description: "Muçarela, costela desfiada e cebola." },
      { name: "Costela com Barbecue", description: "Muçarela, costela desfiada, catupiry e barbecue." },
      { name: "Costela com Cream Cheese", description: "Muçarela, costela desfiada e cream cheese." },
      { name: "Catuperoni", description: "Muçarela, pepperoni e catupiry cremoso." },
      { name: "Pepperoni", description: "Muçarela e pepperoni." },
      { name: "Pepperoni a Califórnia", description: "Muçarela, gorgonzola, pepperoni, catupiry e abacaxi." },
    ],
  },
  {
    id: "doces-especiais",
    title: "Pizzas Especiais",
    subtitle: "Doces",
    prices: [
      { slices: "04 Pedaços", flavors: "01 sabor",  price: 53.9 },
      { slices: "06 Pedaços", flavors: "02 sabores", price: 63.9 },
      { slices: "08 Pedaços", flavors: "03 sabores", price: 73.9 },
      { slices: "12 Pedaços", flavors: "04 sabores", price: 83.9 },
    ],
    borderNote: "Bordas: chocolate preto ou branco — R$ 15,00",
    pizzas: [
      { name: "Dois Amores", description: "Creme de leite, muçarela, chocolate branco e chocolate preto." },
      { name: "Leite Ninho com Morangos", description: "Creme de leite, muçarela, creme de ninho, morangos e leite ninho peneirado." },
      { name: "Nutella com Morangos", description: "Creme de leite, muçarela, Nutella e morangos." },
      { name: "Rafaello", description: "Creme de leite, muçarela, chocolate branco, rafaello, coco e morangos." },
      { name: "Banoffe", description: "Creme de leite, muçarela, banana, doce de leite e canela." },
      { name: "Banana Nevada", description: "Creme de leite, muçarela, banana, doce de leite, canela e chocolate branco." },
      { name: "Morango Nevado", description: "Creme de leite, chocolate branco e morangos." },
      { name: "Nutella Nevada", description: "Creme de leite, Nutella e chocolate branco." },
      { name: "Bom Bom de Uva", description: "Chocolate branco, uvas verdes sem semente, finalizada com leite em pó e Nutella." },
      { name: "Kinder Bueno", description: "Chocolate preto ao leite, chocolate branco e Kinder Bueno." },
    ],
  },
  {
    id: "doces-tradicionais",
    title: "Pizzas Tradicionais",
    subtitle: "Doces",
    prices: [
      { slices: "04 Pedaços", flavors: "01 sabor",  price: 49 },
      { slices: "06 Pedaços", flavors: "02 sabores", price: 59 },
      { slices: "08 Pedaços", flavors: "03 sabores", price: 69 },
      { slices: "12 Pedaços", flavors: "04 sabores", price: 79 },
    ],
    borderNote: "Bordas: chocolate preto ou branco — R$ 15,00",
    pizzas: [
      { name: "Brigadeiro", description: "Creme de leite, muçarela, chocolate e granulado." },
      { name: "Confete", description: "Creme de leite, muçarela, chocolate e confete." },
      { name: "Sensação", description: "Creme de leite, muçarela, chocolate e morangos." },
    ],
  },
];

export type SimpleCategory = {
  id: string;
  title: string;
  subtitle?: string;
  items: Item[];
  note?: string;
};

export const otherCategories: SimpleCategory[] = [
  {
    id: "porcoes",
    title: "Porções",
    items: [
      { name: "Anéis de Cebola 180g", price: 12.0 },
      { name: "Batata Palito 180g", price: 11.99 },
      { name: "Batata Palito 400g", price: 25.0 },
      { name: "Batata com Cheddar e Bacon", price: 38.0 },
      { name: "Batata com Muçarela e Bacon", price: 38.0 },
      { name: "Calabresa Acebolada", price: 33.9 },
      { name: "Filé de Tilápia — Inteira", price: 57.9 },
      { name: "Filé de Tilápia — Meia", price: 35.0 },
      { name: "Coxa da Asa Dessosada — Inteira", price: 49.9 },
      { name: "Coxa da Asa Dessosada — Meia", price: 35.0 },
      { name: "Mandioca 180g", price: 12.0 },
      { name: "Mandioca 500g", price: 25.0 },
      { name: "Arroz", price: [
        { label: "Pequena", value: 12.0 },
        { label: "Média", value: 14.0 },
        { label: "Grande", value: 16.0 },
      ]},
      { name: "Torresmo Trufado", description: "Cubos de torresmo dourados e crocantes, finalizados com mel trufado e raspas de limão.", price: 39.9 },
      { name: "Bolinho de Costela 10un", price: 45.9 },
    ],
  },
  {
    id: "porcoes-especiais",
    title: "Porções Especiais",
    subtitle: "Na Chapa",
    items: [
      { name: "Alcatra com Mandioca", description: "400g de alcatra em tiras, cebola e mandioca. Acompanha batata frita.", price: 79.9 },
      { name: "Alcatra com Batata", description: "400g de alcatra em tiras e cebola. Acompanha mandioca.", price: 83.9 },
      { name: "Alcatra Completa", description: "400g de alcatra em tiras e cebola. Acompanha calabresa acebolada, mandioca e batata frita.", price: 89.9 },
      { name: "Contra Filé", description: "500g de filé. Acompanha calabresa e batata frita.", price: 110.0 },
      { name: "Filé Mignon na Chapa", description: "500g de filé mignon. Acompanha arroz, fritas, saladas e queijo.", price: 119.9 },
      { name: "Picanha na Chapa", description: "500g de picanha, calabresa e mandioca. Acompanha saladas, arroz, fritas e queijo.", price: 139.9 },
    ],
  },
  {
    id: "dogs",
    title: "Dogs Prensado",
    items: [
      { name: "Dog Simples", description: "Pão de leite, salsicha, milho, tomate, ketchup, mostarda e batata palha.", price: 16.0 },
      { name: "Dog Duplo", description: "Pão de leite, 2 salsichas, milho, tomate, muçarela, ketchup, maionese e batata palha.", price: 19.9 },
      { name: "Dog Bacon", description: "Pão de leite, salsicha, ketchup, mostarda, milho, tomate, bacon, muçarela, maionese e batata palha.", price: 24.0 },
      { name: "Dog Calabresa", description: "Pão de leite, salsicha, ketchup, mostarda, milho, tomate, calabresa, muçarela, maionese e batata palha.", price: 24.0 },
      { name: "Dog Calabacon", description: "Pão de leite, maionese, ketchup, salsicha, milho, tomate, calabresa, muçarela, bacon e batata palha.", price: 30.0 },
      { name: "Dog Frango Cremoso", description: "Pão de leite, ketchup, maionese, tomate, frango desfiado, catupiry, salsicha, muçarela, batata palha e alface.", price: 25.0 },
      { name: "Dog Alcatra", description: "Pão de leite, tomate, maionese, ketchup, alcatra, muçarela, salsicha, batata palha e alface.", price: 33.9 },
      { name: "Dog Costela", description: "Pão de leite, tomate, maionese, ketchup, costela, muçarela, salsicha, batata palha e alface.", price: 33.9 },
    ],
  },
  {
    id: "smash",
    title: "Hambúrgueres Artesanais",
    items: [
      { name: "Smash Simples", description: "Pão de gergelim, hambúrguer 90g, duplo cheddar, picles, cebola, ketchup e mostarda.", price: 17.0 },
      { name: "Smash Bacon Caramelizado", description: "Pão de gergelim, hambúrguer 90g, queijo cheddar, bacon crocante e cebola caramelizada.", price: 26.0 },
      { name: "Smash Duplo", description: "Pão de gergelim, duplo hambúrguer de 90g, duplo queijo cheddar, bacon crocante, picles, cebola, ketchup e mostarda.", price: 25.0 },
      { name: "Smash Triplo", description: "Pão de gergelim, 3 hambúrgueres de 90g, triplo queijo cheddar, triplo bacon.", price: 32.9 },
      { name: "Chester Burger", description: "200g de frango desfiado, requeijão cremoso, bacon crocante, queijo muçarela e rúcula.", price: 0, },
    ],
    note: "Chester Burger: consultar valor.",
  },
  {
    id: "cheese",
    title: "Artesanais Cheese",
    items: [
      { name: "Cheese Burguer", description: "Pão de brioche, hambúrguer 160g e duplo queijo cheddar.", price: 18.0 },
      { name: "Cheese Salada", description: "Pão de brioche, hambúrguer 160g, queijo muçarela, alface e tomate.", price: 22.0 },
      { name: "Cheese Bacon", description: "Pão de brioche, hambúrguer 160g, queijo muçarela, bacon crocante, alface e tomate.", price: 27.0 },
      { name: "Cheese Frango", description: "Pão de brioche, hambúrguer 160g, queijo muçarela, frango desfiado e catupiry.", price: 27.0 },
      { name: "Cheese Calabresa", description: "Pão de brioche, hambúrguer 160g, queijo muçarela, calabresa, maionese branca, alface e tomate.", price: 27.0 },
      { name: "Cheese Bacon Cebola", description: "Pão de brioche, hambúrguer 160g, queijo cheddar, tomate e cebola caramelizada.", price: 27.0 },
      { name: "Cheese Dallas", description: "Pão de brioche, 2 hambúrgueres de 160g, duplo cheddar, muçarela, bacon crocante, alface, tomate e maionese branca.", price: 39.0 },
    ],
  },
  {
    id: "lanches-x",
    title: "Lanches X",
    items: [
      { name: "X-Salada", description: "Pão, alface, tomate, milho, hambúrguer, apresuntado e muçarela.", price: 21.0 },
      { name: "X-Burguer", description: "Pão, tomate, milho, hambúrguer, apresuntado e muçarela.", price: 21.0 },
      { name: "X-Egg", description: "Pão, alface, tomate, milho, ovo, hambúrguer, apresuntado e muçarela.", price: 23.0 },
      { name: "X-Bacon", description: "Pão, alface, tomate, milho, bacon, hambúrguer, apresuntado e muçarela.", price: 27.0 },
      { name: "X-Calabacon", description: "Pão, alface, tomate, hambúrguer, bacon, calabresa, apresuntado e muçarela.", price: 30.0 },
      { name: "X-Calabresa", description: "Pão, alface, tomate, milho, hambúrguer, calabresa, apresuntado e muçarela.", price: 27.0 },
      { name: "X-Frango", description: "Pão, alface, tomate, milho, frango, catupiry, apresuntado e muçarela.", price: 27.0 },
      { name: "X-Americano", description: "Pão, alface, tomate, milho, bacon, ovo, hambúrguer, apresuntado e muçarela.", price: 29.0 },
      { name: "X-Alcatra", description: "Pão, alface, tomate, 200g de alcatra, catupiry, apresuntado e muçarela.", price: 37.9 },
      { name: "X-Costela", description: "Pão, alface, tomate, 200g de costela, catupiry, apresuntado e muçarela.", price: 36.0 },
      { name: "X-Tudo", description: "Pão, alface, tomate, milho, bacon, calabresa, frango, ovo, catupiry, salsicha, hambúrguer, batata palha, apresuntado e muçarela.", price: 37.9 },
      { name: "X-Farofa", description: "Pão, alface, maionese, tomate, milho, bacon, calabresa, frango, ovo, cebola na chapa, apresuntado, muçarela e farofa temperada.", price: 42.0 },
      { name: "X-Picanha", description: "Pão, tomate, picanha 200g, catupiry, muçarela e alface.", price: 47.9 },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    items: [
      { name: "Água sem gás", price: 4.0 },
      { name: "Água com gás", price: 4.0 },
      { name: "Refrigerante Lata 350ml", description: "Coca-Cola, Coca Zero, Fanta laranja/uva/guaraná, Sprite, Schweppes citrus/tônica.", price: 6.0 },
      { name: "Coca-Cola Café", price: 4.0 },
      { name: "Coca-Cola 600ml", price: 8.0 },
      { name: "Coca-Cola Zero 600ml", price: 8.5 },
      { name: "Guaraná Antártica 600ml", price: 8.0 },
      { name: "Coca-Cola 1L", price: 10.0 },
      { name: "Coca-Cola Zero 1L", price: 10.0 },
      { name: "Guaraná Antártica 1L", price: 10.0 },
      { name: "Coca-Cola 2L", price: 15.0 },
      { name: "Coca-Cola Zero 2L", price: 15.0 },
      { name: "Sprite 2L", price: 12.0 },
      { name: "Monster Energy Tradicional", price: 12.0 },
      { name: "Monster Energy Zero", price: 12.0 },
      { name: "Red Bull", price: 15.0 },
      { name: "H2OH (Limoneto)", price: 6.5 },
      { name: "Suco Del Valle Maracujá", price: 6.5 },
      { name: "Suco Del Valle Uva", price: 6.5 },
      { name: "Suco Life 300ml", price: 8.5 },
      { name: "Suco Life 900ml", price: 16.0 },
      { name: "Suco Laranja Copo", price: 10.0 },
      { name: "Suco Polpas (com água)", description: "Sabores: abacaxi, abacaxi c/ hortelã, acerola, maracujá ou morango.", price: 10.0 },
      { name: "Suco Polpas (com leite)", description: "Sabores: abacaxi, abacaxi c/ hortelã, acerola, maracujá ou morango.", price: 12.0 },
      { name: "Suco de Laranja com Morango Copo", price: 14.5 },
      { name: "Suco Jarra", price: 17.0 },
      { name: "Suco Jarra com Leite", price: 20.0 },
    ],
  },
];

export const adicionais = [
  { name: "Batata palha", price: 2.5 }, { name: "Alface", price: 2.5 },
  { name: "Tomate", price: 2.5 }, { name: "Milho", price: 2.5 },
  { name: "Catupiry", price: 5.0 }, { name: "Ovo", price: 2.5 },
  { name: "Salsicha", price: 2.5 }, { name: "Alcatra", price: 12.5 },
  { name: "Muçarela", price: 5.0 }, { name: "Bacon", price: 6.0 },
  { name: "Frango", price: 6.0 }, { name: "Calabresa", price: 6.0 },
  { name: "Hambúrguer 90g", price: 6.0 }, { name: "Apresuntado", price: 4.0 },
  { name: "Cheddar", price: 6.0 },
];

export const WHATSAPP_NUMBER = "5544997002675"; // formato internacional
export const WHATSAPP_DISPLAY = "(44) 99700-2675";
export const DELIVERY_FEE = 5.0;
