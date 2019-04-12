// Sử dụng package mongoose bằng hàm require của NodeJS.
// NodeJS sẽ tìm package bên trong thư mục node_modules
const mongoose = require('mongoose');

// Tạo schema cho model
const UserSchema = new mongoose.Schema({
    username: {
        type: String,       // Kiểu dữ liệu
        required: true,     // Bắt buộc có giá trị
        unique: true,       // Giá trị không trùng lặp
        trim: true          // Loại bỏ khoảng trắng ở 2 phía
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String
    },
    joinDate: {
        type: Date,
        default: Date.now   // Giá trị ban đầu
    },
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],  // Kiểu mảng các Object ID do MongoDB phát sinh tự động
        required: true,
        ref: 'Post'     // Tham chiếu đến model Post
    }
});

// Export model để có thể sử dụng trong các file khác
// Export model với tên là User, tham chiếu đến định nghĩa schema (đây là kiểu dữ liệu
// sẽ được return về từ hàm model).
// Ý nghĩa: Export đối tượng model với tên là User có kiểu được định nghĩa bởi UserSchema
module.exports = mongoose.model('User', UserSchema);