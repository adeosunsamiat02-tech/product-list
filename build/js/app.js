let cart = [];

fetch('./data/data.json')
  .then(res => res.json())
  .then(data => {

    const productsEl = document.getElementById('products');

    data.forEach(item => {

      const div = document.createElement('div');
      div.className = "flex flex-col";

      div.innerHTML = `
        <div class="relative">

          <picture>
            <source media="(min-width: 1024px)" srcset="${item.image.desktop}">
            <source media="(min-width: 640px)" srcset="${item.image.tablet}">
            <img src="${item.image.mobile}" alt="${item.name}" class="product-img rounded-lg w-full block">
          </picture>

          <div class="absolute left-1/2 bottom-0 flex justify-center" style="transform: translate(-50%, 50%); width: 100%;">

            <button data-name="${item.name}" class="add-btn bg-white border text-Rose900 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold shadow-sm transition" style="width: 160px; border-color: hsl(14, 25%, 72%);">
              <img src="./img/icon-add-to-cart.svg" alt=""> Add to Cart
            </button>

            <div data-qty="${item.name}" class="qty hidden text-white items-center justify-between px-3 py-3 rounded-full" style="width: 160px; background: hsl(14, 86%, 42%);">

              <button class="dec rounded-full border border-white flex items-center justify-center" style="width: 20px; height: 20px;">
                <img src="./img/icon-decrement-quantity.svg" alt="-" style="width: 10px;">
              </button>

              <span class="num text-sm font-semibold text-center" style="width: 24px;">1</span>

              <button class="inc rounded-full border border-white flex items-center justify-center" style="width: 20px; height: 20px;">
                <img src="./img/icon-increment-quantity.svg" alt="+" style="width: 10px;">
              </button>

            </div>

          </div>

        </div>

        <div style="margin-top: 40px;">
          <p class="text-sm text-Rose400">${item.category}</p>
          <p class="font-semibold text-Rose900 mt-1">${item.name}</p>
          <p class="font-semibold mt-1" style="color: hsl(14, 86%, 42%);">$${item.price.toFixed(2)}</p>
        </div>
      `;

      productsEl.appendChild(div);
    });

    productsEl.addEventListener('click', (e) => {

      const addBtn = e.target.closest('.add-btn');

      if (addBtn) {

        const item = data.find(d => d.name === addBtn.dataset.name);
        const exist = cart.find(c => c.name === item.name);

        if (!exist) {
          cart.push({ ...item, qty: 1 });
        } else {
          exist.qty++;
        }

        toggle(addBtn.dataset.name, true);
        update();
        return;
      }

      const qtyBox = e.target.closest('.qty');
      if (!qtyBox) return;

      const name = qtyBox.dataset.qty;
      const it = cart.find(c => c.name === name);

      if (e.target.closest('.inc')) {
        it.qty++;
        update();
      }

      if (e.target.closest('.dec')) {

        it.qty--;

        if (it.qty === 0) {
          cart = cart.filter(c => c.name !== name);
          toggle(name, false);
        }

        update();
      }
    });
  });

function toggle(name, inCart) {

  const add = document.querySelector(`.add-btn[data-name="${name}"]`);
  const qty = document.querySelector(`.qty[data-qty="${name}"]`);
  const img = add.closest('.relative').querySelector('.product-img');

  if (inCart) {

    add.classList.add('hidden');

    qty.classList.remove('hidden');
    qty.classList.add('flex');

    img.classList.add('product-active');

  } else {

    add.classList.remove('hidden');

    qty.classList.add('hidden');
    qty.classList.remove('flex');

    img.classList.remove('product-active');
  }
}

function update() {

  document.getElementById('cart-count').textContent = cart.reduce((a, c) => a + c.qty, 0);

  const empty = document.getElementById('cart-empty');
  const filled = document.getElementById('cart-filled');
  const items = document.getElementById('cart-items');

  if (cart.length === 0) {

    empty.classList.remove('hidden');
    filled.classList.add('hidden');
    items.innerHTML = '';

  } else {

    empty.classList.add('hidden');
    filled.classList.remove('hidden');

    items.innerHTML = cart.map(i => `

      <div class="flex justify-between items-center py-4 border-b" style="border-color: hsl(13, 31%, 94%);">

        <div>
          <p class="text-sm font-semibold text-Rose900">${i.name}</p>
          <p class="text-sm mt-1">
            <span class="font-bold" style="color: hsl(14, 86%, 42%);">${i.qty}x</span>
            <span class="text-Rose400 ml-2">@ $${i.price.toFixed(2)}</span>
            <span class="font-semibold text-Rose500 ml-2">$${(i.price * i.qty).toFixed(2)}</span>
          </p>
        </div>

       <button onclick="removeItem('${i.name.replace(/'/g, "\\'")}')" 
      class="w-5 h-5 rounded-full border border-Rose300 flex items-center justify-center hover:border-Rose900 hover:text-Rose900 transition group">
      <img src="./img/icon-remove-item.svg" alt="x" class="w-2.5 h-2.5 group-hover:brightness-0">
    </button>
      </div>
    `).join('');

    document.getElementById('order-total').textContent = `$${cart.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}`;

    cart.forEach(c => {
      const box = document.querySelector(`.qty[data-qty="${c.name}"] .num`);
      if (box) box.textContent = c.qty;
    });
  }
}

window.removeItem = (name) => {
  cart = cart.filter(c => c.name !== name);
  toggle(name, false);
  update();
};

document.getElementById('confirm-btn').addEventListener('click', () => {

  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  modal.classList.add('grid');

  document.getElementById('modal-items').innerHTML = cart.map(i => `

    <div class="flex gap-3 py-3 border-b last:border-0" style="border-color: hsl(13, 31%, 94%);">
      <img src="${i.image.thumbnail}" class="w-12 h-12 rounded">
      <div class="flex-1">
        <p class="text-sm font-semibold text-Rose900">${i.name}</p>
        <p class="text-sm mt-1">
          <span class="font-bold" style="color: hsl(14, 86%, 42%);">${i.qty}x</span>
          <span class="text-Rose400 ml-2">@ $${i.price.toFixed(2)}</span>
        </p>
      </div>
      <p class="font-semibold text-Rose900">$${(i.price * i.qty).toFixed(2)}</p>
    </div>

  `).join('');

  document.getElementById('modal-total').textContent = `$${cart.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}`;
});

document.getElementById('new-order').addEventListener('click', () => {

  cart = [];

  document.querySelectorAll('.add-btn').forEach(b => toggle(b.dataset.name, false));

  update();

  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  modal.classList.remove('grid');
});