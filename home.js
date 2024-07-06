document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form'); 
    const quantityInput = document.getElementById('quantity');
    const remainingAvailableSpan = document.getElementById('remaining-available'); 
    const totalOrderedSpan = document.getElementById('total-ordered');
    const orderedItemsTable = document.getElementById('ordered-items');

    let availableQuantity = parseInt(remainingAvailableSpan.textContent); 
    let totalOrdered = 0;
    let orderId = 1;
    let orderedData = []; 

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const quantity = parseInt(quantityInput.value);
        
        if (quantity > 0 && quantity <= availableQuantity) {
            totalOrdered += quantity;
            availableQuantity -= quantity;

            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();

            const order = {
                id: orderId,
                quantity,
                date,
                time
            };

            orderedData.push(order);
            orderId++;

            renderOrderedItems();
            updateOrderSummary();

            remainingAvailableSpan.textContent = availableQuantity;
            quantityInput.value = '';

        } else {
            alert('Invalid quantity or not enough stock available.');
        }
    });

    function renderOrderedItems() {
        orderedItemsTable.innerHTML = '';
        orderedData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.quantity}</td>
                <td>${item.date}</td>
                <td>${item.time}</td>
            `;
            orderedItemsTable.appendChild(row);
        });
    }

    function updateOrderSummary() {
        totalOrderedSpan.textContent = totalOrdered;
    }
});

const products = [
    { id: 1, image: "img/cycle-1.png", price: "$1199" },
    { id: 2, image: "img/cycle-2.png", price: "$1499" },
    { id: 3, image: "img/cycle-3.png", price: "$1799" },
    { id: 4, image: "img/cycle-4.png", price: "$2999" },
    { id: 5, image: "img/cycle-5.png", price: "$1899" },
    { id: 6, image: "img/cycle-6.png", price: "$4999" },
];

function showProductList() {
    const tbody = document.querySelector('#productTable tbody');

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="Product ${product.id}" style="max-width: 100px;"></td>
            <td>${product.price}</td>
        `;
        tbody.appendChild(row);
    });

  
    document.getElementById('productList').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    showProductList();   
});

