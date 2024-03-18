window.addEventListener('load', function() {
  updateChart();
});

function addProduct() {
  var tableBody = document.querySelector('#inventory-table tbody');
  var newRow = tableBody.insertRow();

  var expirationCell = newRow.insertCell();
  var currentDate = new Date();
  expirationCell.innerHTML = '<input type="date" class="expiration-input">';

  var providerCell = newRow.insertCell();
  providerCell.innerHTML = '<input type="text" class="provider-input">';
  
  var identificationCell = newRow.insertCell();
  identificationCell.innerHTML = '<input type="text" class="identification-input">';
    
  var productCell = newRow.insertCell();
  productCell.innerHTML = '<input type="text" class="product-input">';

  var categoryCell = newRow.insertCell();
  categoryCell.innerHTML = '<input type="text" class="category-input">';

  var quantityCell = newRow.insertCell();
  quantityCell.innerHTML = '<input type="number" class="quantity-input">';

  var expirationCell = newRow.insertCell();
  var currentDate = new Date();
  expirationCell.innerHTML = '<input type="date" class="expiration-input" min="' + currentDate.toISOString().split('T')[0] + '">';

  var featuresCell = newRow.insertCell();
  featuresCell.innerHTML = '<input type="text" class="features-input">';

  var priceCell = newRow.insertCell();
  priceCell.innerHTML = '<input type="number" step="0.01" class="price-input">';

  var actionsCell = newRow.insertCell();
  actionsCell.innerHTML = '<button class="guardar-button" onclick="saveProduct(this.parentNode.parentNode)" style="background-color: #4CAF50;">Guardar</button> <button class="delete-button" onclick="deleteProduct(this.parentNode.parentNode)" style="background-color: #f44336;">Eliminar</button>';

  setupRowEvents(newRow);
}

function setupRowEvents(row) {
  var editBtns = row.querySelectorAll('.edit-button');
  var deleteBtn = row.querySelector('.delete-button');

  editBtns.forEach(function(editBtn) {
    editBtn.addEventListener('click', function() {
      editProduct(row);
    });
  });

  deleteBtn.addEventListener('click', function() {
    deleteProduct(row);
  });
}

function saveProduct(row) {
  var cells = row.cells;
  var productInput = cells[0].querySelector('.product-input');
  var categoryInput = cells[1].querySelector('.category-input');
  var quantityInput = cells[2].querySelector('.quantity-input');
  var expirationInput = cells[3].querySelector('.expiration-input');
  var featuresInput = cells[4].querySelector('.features-input');
  var priceInput = cells[5].querySelector('.price-input');

  var isEditing = row.classList.contains('editing');

  if (isEditing) {
    var product = productInput.value;
    var category = categoryInput.value;
    var quantity = quantityInput.value;
    var expiration = expirationInput.value;
    var features = featuresInput.value;
    var price = priceInput.value;

    cells[0].textContent = product;
    cells[1].textContent = category;
    cells[2].textContent = quantity;
    cells[3].textContent = expiration;
    cells[4].textContent = features;
    cells[5].textContent = price;

    row.classList.remove('editing');
  } else {
    productInput.value = cells[0].textContent;
    categoryInput.value = cells[1].textContent;
    quantityInput.value = cells[2].textContent;
    expirationInput.readOnly = true; // Desactivar la edición de la fecha
    featuresInput.value = cells[4].textContent;
    priceInput.value = cells[5].textContent;

    row.classList.add('editing');
  }

  // Cambiar el estilo del botón "Guardar" al igual que los botones "Editar" y "Eliminar"
  var saveButton = row.querySelector('.guardar-button');
  saveButton.style.backgroundColor = '#2196F3';
}

function deleteProduct(row) {
  var confirmationMessage = document.querySelector('.confirmation-message');
  var cancelBtn = confirmationMessage.querySelector('.cancel-button');
  var acceptBtn = confirmationMessage.querySelector('.accept-button');

  confirmationMessage.classList.add('active');

  cancelBtn.addEventListener('click', function() {
    confirmationMessage.classList.remove('active');
  });

  acceptBtn.addEventListener('click', function() {
    var tableBody = document.querySelector('#inventory-table tbody');
    tableBody.removeChild(row);
    confirmationMessage.classList.remove('active');
  });
}

function setupRowEvents(row) {
  var editBtns = row.querySelectorAll('.edit-button');
  var deleteBtn = row.querySelector('.delete-button');

  editBtns.forEach(function(editBtn) {
    editBtn.addEventListener('click', function() {
      editProduct(row);
    });
  });

  deleteBtn.addEventListener('click', function() {
    deleteProduct(row);
  });
}

function updateChart() {
  var tableBody = document.querySelector('#inventory-table tbody');
  var rowCount = tableBody.rows.length;
  var percentages = [];

  var categoryCounts = {};
  for (var i = 0; i < rowCount; i++) {
    var categoryCell = tableBody.rows[i].cells[1];
    var category = categoryCell.textContent.trim();

    if (!categoryCounts[category]) {
      categoryCounts[category] = 1;
    } else {
      categoryCounts[category]++;
    }
  }

  var totalProducts = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
  for (var category in categoryCounts) {
    var count = categoryCounts[category];
    var percentage = (count / totalProducts) * 100;
    percentages.push({
      category: category,
      percentage: percentage.toFixed(2),
    });
  }

  var chart = document.querySelector('#chart');
  var chartText = chart.querySelector('span');
  chartText.textContent = percentages[0] ? percentages[0].percentage + '%' : '0%';

  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '150');
  circle.setAttribute('cy', '150');
  circle.setAttribute('r', '120');
  circle.setAttribute('stroke-dasharray', percentages.map(p => 3.76 * p.percentage).join(' '));
  circle.setAttribute('transform', 'rotate(-90 150 150)');
  chart.appendChild(circle);
}

var addProductBtn = document.querySelector('#add-product-btn');
addProductBtn.addEventListener('click', function() {
  addProduct();
});

var saveProductBtn = document.querySelector('#save-product-btn');
saveProductBtn.style.backgroundColor = '#3a973a';
saveProductBtn.addEventListener('click', function() {
  saveProduct();
});


function saveProduct() {
  var productInput = document.querySelector('.product-input');
  var categoryInput = document.querySelector('.category-input');
  var quantityInput = document.querySelector('.quantity-input');
  var expirationInput = document.querySelector('.expiration-input');
  var featuresInput = document.querySelector('.features-input');
  var priceInput = document.querySelector('.price-input');
  var providerInput = document.querySelector('.provider-input');
  var identificationInput = document.querySelector('.identification-input');

  var product = productInput.value;
  var category = categoryInput.value;
  var quantity = quantityInput.value;
  var expiration = expirationInput.value;
  var features = featuresInput.value;
  var price = priceInput.value;
  var provider = providerInput.value;
  var identification = identificationInput.value;

  var tableBody = document.querySelector('#inventory-table tbody');
  var newRow = tableBody.insertRow();

  var expirationCell = newRow.insertCell();
  var currentDate = new Date();
  expirationCell.innerHTML = '<input type="date" class="expiration-input" min="' + currentDate.toISOString().split('T')[0] + '" value="' + expiration + '">';

  var providerCell = newRow.insertCell();
  providerCell.innerHTML = '<input type="text" class="provider-input" value="' + provider + '">';

  var identificationCell = newRow.insertCell();
  identificationCell.innerHTML = '<input type="text" class="identification-input" value="' + identification + '">';

  var productCell = newRow.insertCell();
  productCell.innerHTML = '<input type="text" class="product-input" value="' + product + '">';

  var categoryCell = newRow.insertCell();
  categoryCell.innerHTML = '<input type="text" class="category-input" value="' + category + '">';

  var quantityCell = newRow.insertCell();
  quantityCell.innerHTML = '<input type="number" class="quantity-input" value="' + quantity + '">';

  var expirationCell = newRow.insertCell();
  expirationCell.innerHTML = '<input type="date" class="expiration-input" min="' + currentDate.toISOString().split('T')[0] + '" value="' + expiration + '">';

  var featuresCell = newRow.insertCell();
  featuresCell.innerHTML = '<input type="text" class="features-input" value="' + features + '">';

  var priceCell = newRow.insertCell();
  priceCell.innerHTML = '<input type="number" step="0.01" class="price-input" value="' + price + '">';

  var actionsCell = newRow.insertCell();
  actionsCell.innerHTML = '<button class="edit-button" onclick="editarProducto(this.parentNode.parentNode)" style="background-color: #2196F3;">Editar</button> <button class="delete-button" onclick="deleteProduct(this.parentNode.parentNode)" style="background-color: #f44336;">Eliminar</button>';

  productInput.value = '';
  categoryInput.value = '';
  quantityInput.value = '';
  expirationInput.value = '';
  featuresInput.value = '';
  priceInput.value = '';
}

function editarProducto(row) {
      var url = 'http://127.0.0.1:5500/Proyecto/html/editar_producto.html';
      window.location.href = '../html/Producto.html'
}

window.addEventListener('load', function() {
  updateChart();
});
