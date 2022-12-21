const form = document.querySelector('.add_product');
const product_container = document.querySelector('.products');

let data = [
    {
        id: 1,
        title: 'Bike',
        price: 1500,
        count: 1
    },
    {
        id: 2,
        title: 'Rollers',
        price: 300,
        count: 1
    },
    {
        id: 3,
        title: 'Scooter',
        price: 600,
        count: 1
    }
];


form.addEventListener('submit', event => {
    event.preventDefault();
    const title = event.target.title.value;
    const price = event.target.price.value;

    const id = Date.now();
    const count = 1;

    const product = { id, title, price, count };
    data.push(product);

    console.log(title, price);

    event.target.title.value = '';
    event.target.price.value = '';

    rerender()
});


function incr_count(id_incr){
    const incr = data.find(({id}) => id === id_incr);
    incr.count++;
    rerender()
}


function decr_count(id_decr){
    const incr = data.find(({id}) => id === id_decr);
    if(incr.count === 1){
        deleteProduct(id_decr);
    } 
    incr.count--;
    rerender()
}


function deleteProduct(id_del){
   data = data.filter(({id}) => id != id_del);
   rerender()
}


function createCard(id, title, price, count) {
    const cardDiv = document.createElement('div');
    const titleP = document.createElement('p');
    const priceP = document.createElement('p');
    const quantity = document.createElement('p');

    const buttonDiv = document.createElement('div');
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');

    button1.innerText = 'Plus';
    button2.innerText = 'Minus';

    button1.addEventListener('click', () => {
        incr_count(id)
    });
    button2.addEventListener('click', () => {
        decr_count(id)
    });

    buttonDiv.append(button1, button2);
    buttonDiv.classList.add('buttons');

    cardDiv.classList.add('item');

    titleP.innerText = title;
    priceP.innerText = price;
    quantity.innerText = count;
    cardDiv.append(titleP, priceP, quantity, buttonDiv);

    return cardDiv
}


function rerender() {
    product_container.innerText = '';
    data.forEach(({ id, title, price, count }) => {
        const container = createCard(id, title, price, count);
        product_container.append(container);
    });

    if(data.length === 0){
        const noItem = document.createElement('p');
        noItem.classList.add('noItemp')
        noItem.innerText = 'No products';
        product_container.append(noItem);
    }
}
rerender();