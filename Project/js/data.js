// USERS
let users = [
    {
        id: 1,
        fullName: "Hoàng An",
        email: "hoangan@gmail.com",
        password: "12345678",
    },
    {
        id: 2,
        fullName: "Minh Trần",
        email: "minhtran@gmail.com",
        password: "12345678",
    },
    {
        id: 3,
        fullName: "Lan Phạm",
        email: "lanpham@gmail.com",
        password: "12345678",
    },
    {
        id: 4,
        fullName: "Hoàng Lê",
        email: "hoangle@gmail.com",
        password: "12345678",
    },
    {
        id: 5,
        fullName: "Xuân Bách",
        email: "xuanbach@gmail.com",
        password: "12345678",
    }
];


// PROJECTS
let projects = [
    {
        id: 1,
        projectName: "Xây dựng website thương mại điện tử",
        projectDesc: "Website bán hàng online gồm giỏ hàng, thanh toán và quản lý sản phẩm",
        members: [
            {
                userId: 1,
                role: "Project owner",
            },
            {
                userId: 2,
                role: "Frontend developer",
            },
            {
                userId: 3,
                role: "Backend developer",
            }
        ]
    },
    {
        id: 2,
        projectName: "Ứng dụng quản lý công việc",
        projectDesc: "Ứng dụng quản lý task cho nhóm làm việc",
        members: [
            {
                userId: 2,
                role: "Project owner",
            },
            {
                userId: 3,
                role: "UI/UX designer",
            },
            {
                userId: 4,
                role: "Frontend developer",
            }
        ]
    },
    {
        id: 3,
        projectName: "Website blog cá nhân",
        projectDesc: "Trang blog chia sẻ kiến thức lập trình",
        members: [
            {
                userId: 3,
                role: "Project owner",
            },
            {
                userId: 1,
                role: "Content writer",
            }
        ]
    }
];


// TASKS
let tasks = [
    {
        id: 1,
        taskName: "Soạn thảo đề cương dự án",
        assigneeId: 1,
        projectId: 1,
        asignDate: "2026-05-24",
        dueDate: "2026-05-26",
        priority: "Thấp",
        progress: "Đúng tiến độ",
        status: "To Do",
    },
    {
        id: 2,
        taskName: "Thiết kế giao diện trang chủ",
        assigneeId: 2,
        projectId: 1,
        asignDate: "2026-05-25",
        dueDate: "2026-05-30",
        priority: "Cao",
        progress: "Đúng tiến độ",
        status: "In Progress",
    },
    {
        id: 3,
        taskName: "Xây dựng API sản phẩm",
        assigneeId: 3,
        projectId: 1,
        asignDate: "2026-05-26",
        dueDate: "2027-04-02",
        priority: "Cao",
        progress: "Chậm tiến độ",
        status: "In Progress",
    },
    {
        id: 4,
        taskName: "Thiết kế UI trang dashboard",
        assigneeId: 4,
        projectId: 2,
        asignDate: "2026-05-27",
        dueDate: "2027-04-01",
        priority: "Trung bình",
        progress: "Đúng tiến độ",
        status: "To Do",
    },
    {
        id: 5,
        taskName: "Tạo chức năng thêm task",
        assigneeId: 2,
        projectId: 2,
        asignDate: "2026-05-28",
        dueDate: "2027-04-03",
        priority: "Cao",
        progress: "Đúng tiến độ",
        status: "In Progress",
    },
    {
        id: 6,
        taskName: "Viết bài giới thiệu blog",
        assigneeId: 1,
        projectId: 3,
        asignDate: "2026-05-29",
        dueDate: "2027-03-31",
        priority: "Thấp",
        progress: "Có rủi ro",
        status: "Done",
    }
];


localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("projects", JSON.stringify(projects));
localStorage.setItem("tasks", JSON.stringify(tasks));