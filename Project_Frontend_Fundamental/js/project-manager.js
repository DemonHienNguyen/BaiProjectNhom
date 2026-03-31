document.addEventListener('DOMContentLoaded', function() {
    // 1. Khai báo các thành phần giao diện
    const modal = document.getElementById('projectModal');
    const modalTitle = modal.querySelector('h4');
    const inputName = document.getElementById('projectName');
    const inputDesc = document.getElementById('projectDesc');
    const errorText = document.querySelector('.error-text'); // Dòng thông báo đỏ

    const btnAdd = document.querySelector('.btn-add');
    const btnsEdit = document.querySelectorAll('.btn-edit');
    const btnClose = document.getElementById('btnClose');
    const btnCancel = document.getElementById('btnCancel');

    // 2. Hàm dùng chung để dọn dẹp Modal (Reset)
    const resetModal = () => {
        inputName.value = "";
        inputDesc.value = "";
        // Ẩn dòng thông báo lỗi cũ nếu có
        if (errorText) errorText.style.display = 'none';
        // Trả lại màu viền bình thường cho input
        inputName.style.borderColor = "#dee2e6";
    };

    // 3. Xử lý sự kiện khi ấn nút "Thêm Dự Án"
    if (btnAdd) {
        btnAdd.onclick = function() {
            resetModal();
            modalTitle.innerText = "Thêm dự án mới";
            modal.classList.add('modal-open');
        };
    }

    // 4. Xử lý sự kiện khi ấn nút "Sửa" (Lặp qua tất cả các nút trong bảng)
    btnsEdit.forEach(btn => {
        btn.onclick = function() {
            resetModal();
            modalTitle.innerText = "Chỉnh sửa dự án";
            
            // Tìm đến dòng (tr) chứa nút vừa ấn
            const row = this.closest('tr');
            // Lấy tên dự án ở cột thứ 2
            const projectName = row.querySelector('td:nth-child(2)').innerText;
            
            // Đổ dữ liệu vào ô input trong Modal
            inputName.value = projectName;
            
            modal.classList.add('modal-open');
        };
    });

    // 5. Các sự kiện đóng Modal
    const closeModal = () => modal.classList.remove('modal-open');

    if (btnClose) btnClose.onclick = closeModal;
    if (btnCancel) btnCancel.onclick = closeModal;

    // ==========================================
    // PHẦN CODE THÊM MỚI CHO MODAL XÓA
    // ==========================================
    const deleteModal = document.getElementById('deleteModal');
    const btnsDelete = document.querySelectorAll('.btn-delete'); // Lấy tất cả nút Xóa trong bảng
    const btnCloseDelete = document.getElementById('btnCloseDelete');
    const btnCancelDelete = document.getElementById('btnCancelDelete');
    const btnConfirmDelete = document.querySelector('.btn-delete-confirm');

    // Mở modal xóa khi ấn nút Xóa trong bảng
    btnsDelete.forEach(btn => {
        btn.onclick = function() {
            deleteModal.classList.add('modal-open');
        };
    });

    // Hàm đóng modal xóa
    const closeDeleteModal = () => deleteModal.classList.remove('modal-open');

    // Gán sự kiện đóng modal xóa
    if (btnCloseDelete) btnCloseDelete.onclick = closeDeleteModal;
    if (btnCancelDelete) btnCancelDelete.onclick = closeDeleteModal;

    // Sự kiện khi ấn nút Xóa (màu đỏ) trong popup
    if (btnConfirmDelete) {
        btnConfirmDelete.onclick = function() {
            // Sau này bạn viết logic xóa hàng (remove) ở đây
            console.log("Đã xác nhận xóa!");
            closeDeleteModal();
        };
    }

    // Cập nhật lại sự kiện click ra ngoài màn hình để đóng được CẢ 2 Modal
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
        if (event.target == deleteModal) {
            closeDeleteModal();
        }
    };
});