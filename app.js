// ---- SAMPLE DATA ----
saveCart();
updateCartUI();



function cartItemsDetailed(){
return Object.keys(cart).map(k => {
const prod = products.find(p=>p.id===Number(k));
return {product:prod, qty:cart[k]};
});
}


function updateCartUI(){
// count
const totalCount = Object.values(cart).reduce((s,v)=>s+v,0);
cartCount.textContent = totalCount;


// render list
cartList.innerHTML = '';
const items = cartItemsDetailed();
let total = 0;
items.forEach(it => {
const el = document.createElement('div'); el.className='cart-item';
el.innerHTML = `
<img src="${it.product.img}" alt="${it.product.title}"/>
<div style="flex:1">
<div style="font-weight:700">${it.product.title}</div>
<div style="font-size:13px;color:var(--muted)">$${it.product.price.toFixed(2)}</div>
</div>
<div class="qty-controls">
<button class="btn small" data-action="dec" data-id="${it.product.id}">-</button>
<div>${it.qty}</div>
<button class="btn small" data-action="inc" data-id="${it.product.id}">+</button>
<button class="btn" data-action="remove" data-id="${it.product.id}">x</button>
</div>
`;
cartList.appendChild(el);
total += it.product.price * it.qty;
});
cartTotal.textContent = 'Total: $' + total.toFixed(2);
}


// initial render
renderProducts(products);
updateCartUI();


// event delegation for add-to-cart
grid.addEventListener('click', (e)=>{
const btn = e.target.closest('button[data-id]');
if(!btn) return;
const id = Number(btn.dataset.id);
addToCart(id);
});


// cart toggle
cartBtn.addEventListener('click', ()=>{ cartModal.classList.toggle('open'); cartModal.setAttribute('aria-hidden', !cartModal.classList.contains('open')) });


// cart actions
cartList.addEventListener('click',(e)=>{
const a = e.target.closest('button[data-action]');
if(!a) return;
const id = Number(a.dataset.id);
const action = a.dataset.action;
if(action==='remove') removeFromCart(id);
if(action==='dec') changeQty(id, -1);
if(action==='inc') changeQty(id, +1);
});


// simple search
searchInput.addEventListener('input', (e)=>{
const q = e.target.value.trim().toLowerCase();
if(!q) return renderProducts(products);
const filtered = products.filter(p => p.title.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q));
renderProducts(filtered);
});


// checkout (placeholder)
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
alert('Checkout is a demo. Integrate with payment provider (Stripe/PayPal) for real purchases.');
});