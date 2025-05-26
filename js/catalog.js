let products = [];
fetch('../data/product.json')
    .then(r=>r.json())
    .then(json=>{ products=json; draw(); });

const grid=document.getElementById('productsGrid');
const catSel=document.getElementById('catSelect');
const priceRange=document.getElementById('priceRange');
const priceMax=document.getElementById('priceMax');
const stockChk=document.getElementById('inStockChk');
const discChk=document.getElementById('discountChk');
const applyBtn=document.getElementById('applyBtn');


function renderCard(p){return `
  <article class="product-card fade-in" data-id="${p.id}">
    <img src="${p.image}" alt="${p.title}" loading="lazy" />
    <h3 class="product-card__title">${p.title}</h3>
    <span class="product-card__price">${p.price.toLocaleString('ru-RU')} ₽</span>
    <button class="btn btn--primary">В корзину</button>
  </article>`;}

function draw(){
    priceMax.textContent = (+priceRange.value).toLocaleString('ru-RU');
    const list = products.filter(p=>
        (!catSel.value||p.category===catSel.value)&&
        (!stockChk.checked||p.stock)&&
        (!discChk.checked||p.discount)&&
        (p.price<=+priceRange.value)
    );
    grid.innerHTML=list.map(renderCard).join('');
}
[catSel, priceRange, stockChk, discChk].forEach(el =>
    el.addEventListener('input', draw)
);
applyBtn.addEventListener('click', draw);


/* ===== modal logic ===== */
const modal   = document.getElementById('filterModal');
const toggle  = document.getElementById('filterToggle');
const close   = modal.querySelector('.modal__close');
const apply   = document.getElementById('applyBtn');

function openModal(){
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
}
function closeModal(){
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
    draw();                     // применяем фильтр
}

toggle .addEventListener('click', openModal);
close  .addEventListener('click', closeModal);
apply  .addEventListener('click', closeModal);
modal.querySelector('.modal__backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && modal.classList.contains('modal--open')) closeModal(); });