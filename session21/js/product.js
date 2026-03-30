function search() {
    /*
    b1: lấy giá trị người dùng nhập
    b2: lọc lấy kết quả
    b3: hiển thị
    */
    let keyword = document.getElementById("search").value.trim();
    let result = products.filter((item) => item.name.includes(keyword));
    console.log(result);
    renderProduct(result);
}
/*
1. danh sách sản phẩm dùng mảng
2. từng sản phẩm dùng object
3. một sản phẩm có các thông tin sau:
    + id: mã sp
    + name: tên sp
    + price: giá sp
    + image: ảnh sp
    + stock: số lượng sp

*/

// tạo hàm hiển thị danh mục 
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

function renderCategories() {
    let str = `<option value="">Chọn danh mục</option>`;
    for (let i = 0; i < categories.length; i++) {
        str += `
        <option value="${categories[i].id}">${categories[i].name}</option>
        `
    }
    document.getElementById("option").innerHTML=str;
}

renderCategories();

// tạo hàm 
function addProduct() {
    let productName = document.getElementById("name").value.trim();
    let productImage = document.getElementById("image").value.trim();
    let categoryId = handleChange();
    let productPrice = document.getElementById("price").value.trim();
    let productStock = document.getElementById("stock").value.trim();
    let product={
        id: Math.floor(Math.random()*99999)+ new Date().getMilliseconds(),
        name: productName,
        image: productImage,
        categoryId:categoryId,
        price: productPrice,
        stock: productStock,
    }
    console.log(product);
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products))
    renderProduct(products);
}

// hàm handleChange
function handleChange() {
    let value = document.getElementById("option").value;
    return value;

}
// Hàm hiển thị danh sách sản phẩm

function renderProduct(products) {
    let str="";
    for (let i = 0; i < products.length; i++) {
        str += `
        <tr>
            <td>${i+1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].image}</td>
            <td>${Number(products[i].price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>${products[i].stock}</td>
            <td><button class="edit" onclick="updateMode(${i})">Sửa</button>
        <button class="delete" onclick="deleteProduct(${i})">Xóa</button></td>
        </tr>
        `
    }
    document.getElementById("list").innerHTML = str;
}
renderProduct(products);

function search() {
    /*
    b1: lấy giá trị người dùng nhập
    b2: lọc lấy kết quả
    b3: hiển thị
    */
    let keyword = document.getElementById("search").value.trim();
    let result = products.filter((item) => item.name.includes(keyword));
    renderProduct(result);
}

function tangdan() {
    let tangdan = products.sort((a,b)=>a.price-b.price);
    renderProduct(tangdan);
}
function giamdan() {
    let giamdan = products.sort((a,b)=>b.price-a.price);
    renderProduct(giamdan);
}
function deleteProduct(i) {
    let ok = confirm("bạn có chắc muốn xóa k?");
    if (ok) {
        products.splice(i,1);
        localStorage.setItem("products",JSON.stringify(products));
        renderProduct(products);
    }else{
        alert("Đã hủy thao tác");
    }
}
function updateMode(i) {
    document.getElementById("addbtn").innerHTML= "sửa sản phẩm";
    document.getElementById("addbtn").onclick=function () { updateProduct(i) };
    document.getElementById("name").value = products[i].name;
    document.getElementById("image").value = products[i].image;
    document.getElementById("price").value = products[i].price;
    document.getElementById("stock").value = products[i].stock;
    document.getElementById("option").value = products[i].categoryId;
}

function updateProduct(i) {
    let productName = document.getElementById("name").value.trim();
    let productImage = document.getElementById("image").value.trim();
    let categoryId = handleChange();
    let productPrice = document.getElementById("price").value.trim();
    let productStock = document.getElementById("stock").value.trim();

    products[i]={
        name:productName,
        image:productImage,
        categoryId:categoryId,
        price:productPrice,
        stock:productStock,
    };
    document.getElementById("addbtn").innerHTML= "thêm sản phẩm";
    document.getElementById("addbtn").onclick=function () { addProduct() };
    localStorage.setItem("products",JSON.stringify(products));
    document.getElementById("name").value = "";
    document.getElementById("image").value ="";
    document.getElementById("price").value = "";
    document.getElementById("stock").value ="";
    document.getElementById("option").value = "";

    renderProduct(products);
}

