/* 
1.danh sách danh mục: dùng mảng
2.từng danh mục     : dùng object
3.các thuộc tính có trong danh mục
    + id: mã danh mục (kh dc trùng)
    + name: tên danh mục (k dc trùng)

*/

let categories = JSON.parse(localStorage.getItem("categories")) || [];
// tạo hàm thêm danh mục spham
function addCategory() {
    let categoriyName = document.getElementById("category").value.trim();
    // for (let i = 0; i < categories.length; i++) {
    //     if (categories[i].name == categoriyName) {

    //         return;
    //     }
        
    // }
    let result = categories.find((item)=>item.name==categoriyName);
    if (result) {
        document.querySelector(".error-category").style.display="block";
        document.querySelector(".error-category").innerHTML="tên danh mục đã tồn tại"
        return;
    }
    document.querySelector(".error-category").style.display="none";

    let category ={
        id: Math.floor(Math.random()*99999) + new Date().getMilliseconds(),
        name: categoriyName,
    }
    categories.push(category);
    localStorage.setItem("categories",JSON.stringify(categories));
    renderCategory();
}


// tạo hàm hiện thị danh mục sản phẩm
function renderCategory() {
    let html ="";
    for (let i = 0; i < categories.length; i++) {
        html +=`<li>${categories[i].name}  <button class="edit">Sửa</button> <button class="delete">Xóa</button></li>
        `
        
    }
    document.getElementById("list").innerHTML=html;

}
renderCategory();

