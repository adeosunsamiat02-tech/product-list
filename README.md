# Frontend Mentor - Product List with Cart solution

This is a solution to the [Product List with Cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d).

## Table of contents

- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [https://www.frontendmentor.io/solutions/product-list-with-cart-built-with-tailwind-css-and-javascript-...](https://www.frontendmentor.io/profile/adeosunsamiat02-tech)
- Live Site URL: [https://product-list-a2ev.onrender.com](https://product-list-a2ev.onrender.com)

## My process

### Built with

- Semantic HTML5 markup
- Tailwind CSS
- Flexbox & CSS Grid
- Mobile-first workflow
- Vanilla JavaScript (ES6) - DOM manipulation & Fetch API for `data.json`

### What I learned

This project helped me understand how to manage cart state without a framework. I learned how to:

- Dynamically render products from `data.json` using `fetch()`
- Handle add to cart, increment/decrement, and remove item logic
- Implement active states: 
    - Red ring on product image when in cart
    - Red border on Add to Cart button on hover
    - Black border on remove icon on hover
- Fix Tailwind purge issues by adding JS files to `content: ["./build/**/*.{html,js}"]` in `tailwind.config.js`
- Create a responsive order confirmation modal

## Author

- **Name:** Adeosun Samiat
- **GitHub:** [@adeosunsamiat02-tech](https://github.com/adeosunsamiat02-tech)
- **Frontend Mentor:** [@adeosunsamiat02-tech](https://www.frontendmentor.io/profile/adeosunsamiat02-tech)
- **Live Project:** [product-list-a2ev.onrender.com](https://product-list-a2ev.onrender.com)
