const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click',()=> {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click',()=>{
        nav.classList.remove('active')
    })
}

var showHhtml = "";
var output = document.getElementById("output");
var totalCart = document.getElementById("total_cart_show");
var shopCart = [];
var BikiniItem = [
    {
        id: 0,
        name: "Magnolia",
        cost: 125,
        image: "img/products/prueba.jpg"
      },
      {
        id: 1,
        name: "Aleli",
        cost: 950,
        image: "img/products/prueba2.jpg"
      },
      {
        id: 2,
        name: "Cocada",
        cost: 150,
        image: "img/products/prueba3.jpg"
      },
      {
        id: 3,
        name: "Jazmin",
        cost: 100,
        image: "img/products/prueba4.jpg"
      },
      {
        id: 4,
        name: "Savage",
        cost: 100,
        image: "img/products/prueba5.jpg"
      },
      {
        id: 5,
        name: "Ocre qua",
        cost: 10.0,
        image: "img/products/prueba6.jpg"
      },
      {
        id: 6,
        name: "Ambar",
        cost: 135,
        image: "img/products/prueba7.jpg"
      },
      {
        id: 7,
        name: "Golfo",
        cost: 700,
        image: "img/products/prueba8.jpg"
      },
      {
        id: 8,
        name: "Buzo melo",
        cost: 190,
        image: "img/products/prueba1.3.jpg"
      },
      {
        id: 9,
        name: "Legging A",
        cost: 150,
        image: "img/products/prueba1.1.jpg"
      },
      {
        id: 10,
        name: "Mantra",
        cost: 150,
        image: "img/products/prueba1.2.jpg"
      },
      {
        id: 11,
        name: "Fenix",
        cost: 135,
        image: "img/products/prueba1.4.jpg"
      },
];

window.onload = MainFunction;
function MainFunction() {
  itemListFun();
  var cartBtn = document.querySelectorAll(".add_to_cart_btn");

  for (var x = 0; x < cartBtn.length; x++) {
    cartBtn[x].addEventListener("click", function(e) {
      e.preventDefault();
      addItem();
    });
  }
  outputCart();
}

function addItem() {
  var iteminfo = event.target.dataset;
  iteminfo.qty = 1;
  var itemcartMin = false;

  shopCart.forEach(function(single) {
    if (single.id == iteminfo.id) {
      single.qty = parseInt(single.qty) + parseInt(iteminfo.qty);
      itemcartMin = true;
    }
  });

  if (!itemcartMin) {
    shopCart.push(iteminfo);
  }

  localStorage.setItem("scart", JSON.stringify(shopCart));
  outputCart();
}

function outputCart() {
  if (localStorage.getItem("scart") != null) {
    shopCart = JSON.parse(localStorage.getItem("scart"));
  }
  var cartOutout =
  '<table class="table table-bordered table-hover table-striped"><thead><th>C</th><th>Producto</th><th>$</th><th>T</th><th>X</th></thead>';
  var total = 0;
  shopCart.forEach(function(single) {
    var stotal = single.qty * single.price;
    total += stotal;
    cartOutout +=
      '<tr data-row="' +
      single.id +
      '"><td>' +
      single.qty +
      "</td><td>" +
      single.name +
      "</td><td>" +
      single.price +
      "</td><td>" +
      convertDoller(stotal) +
      '</td><td><span class=" btn btn-danger btn-sm removeItem"  onclick="removeitem(' +
      single.id +
      ')" ><i class="fa fa-remove"></i></span><span class=" btn btn-primary btn-sm updateItem" data-action="edit" onclick="updateitem(' +
      single.id +
      ')"><i class="fa  fa-edit"></i></span></td></tr>';
  });

  cartOutout +=
    '<tr><td class="totalPrice bg-secondary " colspan=6>Total Amount : ' +
    convertDoller(total) +
    "</td></tr></table>";
  totalCart.innerHTML = cartOutout;
}

function itemListFun() {
  var x = 0;
  BikiniItem.forEach(function(item) {
    showHhtml += `<div class="col-sm-6 col-md-4 col-lg-3">
        <div class="item_wrapper">
        <img src="${item.image}" alt="${item.name}" class="img-fluid"/>
            <div class="item_details">
                <h3>${item.name}</h3>
                <h4>${item.cost}$</h4>
                <h3>
                    <a href="#" class="add_to_cart_btn btn btn-primary btn-sm" data-price="${
            item.cost
          }" 
                        data-id="${x}" data-name="${item.name}" data-s="${item.details}">
                        Agregar al Carrito
                    </a>
                </h3>
            </div>
        </div>
    </div>`;
    x++;
  });
  output.innerHTML = showHhtml;
}


function convertDoller(money) {
  return "$" + (money / 1).toFixed(2);
}

function removeitem(id) {
  if (confirm("¿Quieres eliminar este artículo?")) {
    for (var i = 0; i < shopCart.length; i++) {
      if (shopCart[i].id == id) {
        var rem = shopCart.splice(i, 1);
      }
    }
    localStorage.setItem("scart", JSON.stringify(shopCart));
    outputCart();
  }
}

function updateitem(id) {
  var update = document.querySelectorAll('[data-action="edit"]');
  for (let i = 0; i < update.length; i++) {
    update[i].addEventListener("click", function(e) {
      var row = this.closest("[data-row]");
      var rid = row.getAttribute("data-row");
      row.style.backgroundColor = "orange";
      var td = row.firstElementChild;
      console.log(td);
      var input = document.createElement("input");
      input.type = "text";
      input.value = Number(td.innerText);
      td.innerHTML = "";
      td.appendChild(input);
      input.focus();

      input.onblur = function() {
        td.removeChild(input);
        td.innerHTML = input.value;
        row.style.backgroundColor = "transparent";
      };
    });
  }
}


var buyBtn = document.getElementById("buy_btn");
buyBtn.addEventListener("click", function() {
  if (shopCart.length === 0) {
    alert("El carro está vacío");
  } else {
    alert("Gracias por su compra");
    localStorage.removeItem("scart");
    shopCart = [];
    outputCart();
  }
});

