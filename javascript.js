function sendWhatsAppMessage() {
  const name = document.getElementById("name").value || "Customer";
  const phone = document.getElementById("phone").value || "";
  
  const productSelect = document.getElementById("product");
  const product = productSelect ? productSelect.options[productSelect.selectedIndex].text : "Not specified";

  const flavor = document.getElementById("flavor") ? document.getElementById("flavor").value : "";
  const type = document.getElementById("type") ? document.getElementById("type").value : "";
  const size = document.getElementById("size") ? document.getElementById("size").value : "";
  const quantity = document.getElementById("quantity").value || "1";
  const date = document.getElementById("date").value || "Not specified";
  const notes = document.getElementById("notes").value || "None";

  let message = `Hi! I'd like to place an order from Crave-in:\n\n`;
  message += `👤 Name: ${name}\n`;
  message += `📞 Phone: ${phone}\n`;
  message += `🍰 Product: ${product}\n`;

  if (flavor) message += `🎂 Flavor: ${flavor}\n`;
  if (type) message += `🍶 Type: ${type}\n`;
  if (size) message += `📏 Size: ${size}\n`;

  message += `🔢 Quantity: ${quantity}\n`;
  message += `📅 Date: ${date}\n`;
  message += `📝 Notes: ${notes}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/2349026738391?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  const modalClose = document.getElementById('modal-close');
  const modalProductName = document.getElementById('modal-product-name');
  const modalSizesList = document.getElementById('modal-sizes-list');

  // Add click listeners to all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      const sizes = JSON.parse(card.dataset.sizes);

      // Set modal content
      modalProductName.textContent = name;
      modalSizesList.innerHTML = ''; // Clear previous sizes

      sizes.forEach(({ size, price }) => {
        const li = document.createElement('li');
        li.textContent = `${size} - ${price}`;
        modalSizesList.appendChild(li);
      });

      const orderButton = document.getElementById('modal-order-button');
      orderButton.onclick = () => {
        const orderSelect = document.getElementById('item');
        orderSelect.value = name;

        modal.classList.remove('show');
        document.body.classList.remove('modal-open'); // 👈 remove scroll restriction

        document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
      };

      modal.classList.add('show');
      document.body.classList.add('modal-open'); // 👈 prevent scrolling
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open'); // 👈 allow scrolling again
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.classList.remove('modal-open'); // 👈 allow scrolling again
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // existing modal and WhatsApp code...

  // Hamburger menu toggle code:
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});
const form = document.getElementById('review-form');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const response = await fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    messageDiv.textContent = '✅ Thank you! Your message has been submitted.';
    setTimeout(() => {
      messageDiv.textContent = "";
    }, 3000);
    form.reset();  // ✅ clears the form
  } else {
    messageDiv.textContent = '❌ Oops! Something went wrong.';
    setTimeout(() => {
      messageDiv.textContent = "";
    }, 5000);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const productSelect = document.getElementById("product");
  const flavorContainer = document.getElementById("flavor-container");
  const flavorSelect = document.getElementById("flavor");
  const typeContainer = document.getElementById("type-container");
  const typeSelect = document.getElementById("type");
  const sizeContainer = document.getElementById("size-container");
  const sizeSelect = document.getElementById("size");
  const quantityContainer = document.getElementById("quantity-container");
  const quantitySelect = document.getElementById("quantity");
  const priceDisplay = document.getElementById("price");
  const formMessage = document.getElementById("form-message");
  const form = document.getElementById("order-form");
  // ✅ On page load: hide all optional sections
  flavorContainer.style.display = "none";
  typeContainer.style.display = "none";
  sizeContainer.style.display = "none";
  quantityContainer.style.display = "none";

  // ✅ Reset all selects to blank
  productSelect.value = "";
  flavorSelect.value = "";
  typeSelect.value = "";
  sizeSelect.value = "";
  quantitySelect.value = "";

  // ✅ Reset price display
  priceDisplay.textContent = "0";
  const productData = {
    doubleLayeredCake: {
      flavors: ["Vanilla", "Red Velvet", "Chocolate"],
      sizes: ["6\" Wide", "8\" Wide", "10\" Wide", "12\" Wide", "14\" Wide"],
      prices: {
        "Vanilla": { "6\" Wide": 17000, "8\" Wide": 24000, "10\" Wide": 34000, "12\" Wide": 44000, "14\" Wide": 60000 },
        "Red Velvet": { "6\" Wide": 19000, "8\" Wide": 26000, "10\" Wide": 36000, "12\" Wide": 46000, "14\" Wide": 62000 },
        "Chocolate": { "6\" Wide": 18000, "8\" Wide": 25000, "10\" Wide": 35000, "12\" Wide": 45000, "14\" Wide": 61000 }
      }
    },
    cupcakes: {
      types: ["Buttercream", "Whipped Cream"],
      quantities: ["Box of 4", "Half dozen", "Full dozen"],
      prices: {
        "Buttercream": { "Box of 4": 6000, "Half dozen": 8000, "Full dozen": 15000 },
        "Whipped Cream": { "Box of 4": 8000, "Half dozen": 12000, "Full dozen": 23000 }
      }
    },
    bentoCake: {
      types: ["Buttercream", "Whipped Cream"],
      sizes: ["4\" mini", "5\" mini"],
      prices: {
        "Buttercream": { "4\" mini": 6000, "5\" mini": 7000 },
        "Whipped Cream": { "4\" mini": 7500, "5\" mini": 8500 }
      }
    },
    brownies: {
      quantities: ["5 pieces", "10 pieces", "20 pieces"],
      prices: { "5 pieces": 6000, "10 pieces": 12000, "20 pieces": 24000 }
    },
    cinnamonRolls: {
      quantities: ["Box of 4", "Box of 6", "Box of 12"],
      prices: { "Box of 4": 7000, "Box of 6": 10000, "Box of 12": 20000 }
    },
    strawberryRolls: {
      quantities: ["Box of 4", "Box of 6", "Box of 12"],
      prices: { "Box of 4": 8500, "Box of 6": 12000, "Box of 12": 23500 }
    }
  };

  function clearAll() {
    flavorContainer.style.display = "none";
    typeContainer.style.display = "none";
    sizeContainer.style.display = "none";
    quantityContainer.style.display = "none";

    flavorSelect.innerHTML = "";
    typeSelect.innerHTML = "";
    sizeSelect.innerHTML = "";
    quantitySelect.innerHTML = "";
    priceDisplay.textContent = "0";
  }

  function populateSelect(selectElement, options) {
    selectElement.innerHTML = "";
    selectElement.appendChild(new Option("--Select--", ""));
    options.forEach(option => {
      selectElement.appendChild(new Option(option, option));
    });
  }

  function updatePrice() {
    const product = productSelect.value;
    if (!product) {
      priceDisplay.textContent = "0";
      return;
    }

    if (product === "doubleLayeredCake") {
      const flavor = flavorSelect.value;
      const size = sizeSelect.value;
      if (flavor && size) {
        priceDisplay.textContent = productData.doubleLayeredCake.prices[flavor][size];
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "cupcakes") {
      const type = typeSelect.value;
      const quantity = quantitySelect.value;
      if (type && quantity) {
        priceDisplay.textContent = productData.cupcakes.prices[type][quantity];
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "bentoCake") {
      const type = typeSelect.value;
      const size = sizeSelect.value;
      if (type && size) {
        priceDisplay.textContent = productData.bentoCake.prices[type][size];
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "brownies") {
      const quantity = quantitySelect.value;
      if (quantity) {
        priceDisplay.textContent = productData.brownies.prices[quantity];
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "cinnamonRolls") {
      const quantity = quantitySelect.value;
      if (quantity) {
        priceDisplay.textContent = productData.cinnamonRolls.prices[quantity];
      } else {
        priceDisplay.textContent = "0";
      }
    } else if (product === "strawberryRolls") {
      const quantity = quantitySelect.value;
      if (quantity) {
        priceDisplay.textContent = productData.strawberryRolls.prices[quantity];
      } else {
        priceDisplay.textContent = "0";
      }
    } else {
      priceDisplay.textContent = "0";
    }
  }

  // When product changes, show/hide inputs accordingly
  productSelect.addEventListener("change", () => {
    clearAll();
    const product = productSelect.value;

    if (!product) return;

    if (product === "doubleLayeredCake") {
      // show flavor and size
      flavorContainer.style.display = "block";
      sizeContainer.style.display = "block";
      populateSelect(flavorSelect, productData.doubleLayeredCake.flavors);
      populateSelect(sizeSelect, productData.doubleLayeredCake.sizes);
    } else if (product === "cupcakes") {
      // show type and quantity
      typeContainer.style.display = "block";
      quantityContainer.style.display = "block";
      populateSelect(typeSelect, productData.cupcakes.types);
      populateSelect(quantitySelect, productData.cupcakes.quantities);
    } else if (product === "bentoCake") {
      // show type and size
      typeContainer.style.display = "block";
      sizeContainer.style.display = "block";
      populateSelect(typeSelect, productData.bentoCake.types);
      populateSelect(sizeSelect, productData.bentoCake.sizes);
    } else if (product === "brownies") {
      // show quantity only
      quantityContainer.style.display = "block";
      populateSelect(quantitySelect, productData.brownies.quantities);
    } else if (product === "cinnamonRolls") {
      quantityContainer.style.display = "block";
      populateSelect(quantitySelect, productData.cinnamonRolls.quantities);
    } else if (product === "strawberryRolls") {
      quantityContainer.style.display = "block";
      populateSelect(quantitySelect, productData.strawberryRolls.quantities);
    }

    updatePrice();
  });

  // Update price on flavor/type/size/quantity change
  [flavorSelect, typeSelect, sizeSelect, quantitySelect].forEach(select => {
    select.addEventListener("change", updatePrice);
  });

  // Optional: Handle form submit with AJAX for better UX
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Disable the button to prevent multiple submits
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        formMessage.textContent = "Order submitted successfully!";
        formMessage.style.color = "green";
        form.reset();
        clearAll();
        priceDisplay.textContent = "0";
      } else {
        response.json().then(data => {
          formMessage.textContent = data.error || "Oops! There was a problem.";
          formMessage.style.color = "red";
        });
      }
    }).catch(() => {
      formMessage.textContent = "Oops! There was a problem submitting your order.";
      formMessage.style.color = "red";
    }).finally(() => {
      submitBtn.disabled = false;
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.textContent = "";
      }, 5000);
    });
  });
});

















