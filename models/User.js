// Sử dụng package mongoose bằng hàm require của NodeJS.
// NodeJS sẽ tìm package bên trong thư mục node_modules
const mongoose = require('mongoose')

// Sử dụng package md5 để tạo chuỗi ngẫu nhiên
const md5 = require('md5')

// Sử dụng package bcrypt cho việc hash password
const bcrypt = require('bcrypt')


// Tạo mongodb schema cho model
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
        // Kiểu mảng các Object ID do MongoDB phát sinh tự động
        type: [mongoose.Schema.Types.ObjectId],  
        required: true,
        ref: 'Post'     // Tham chiếu đến model Post
    }
})


// Trước khi truyền user schema cho hàm model của mongoose,
// sử dụng một life cycle hook có tên là pre kết hợp tên với 
// thao tác sẽ thực hiện đối với DB. Hook này sẽ được kích 
// hoạt trước khi thao tác được thực hiện.
// Thao tác: save một document (record) vào collection (table)
// Hook sẽ kích hoạt function trong tham số 2 trước khi save
UserSchema.pre('save', function(next) {
    // Sử dụng cú pháp template string. Dùng package md5
    // để tạo một chuỗi ngẫu nhiên dựa trên username (không trùng).
    // Dùng tool http:gravatar.com/ để tự động tạo một ảnh 
    // avatar cho user (với định danh avatar được md5 phát sinh
    // ngẫu nhiên dựa trên username)
    this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`
    // Chuyển control cho function kế tiếp trong life cycle
    next();
})


// Hash mật khẩu. Hook này được kích hoạt trước khi save document.
UserSchema.pre('save', function(next) {
    // Kiểm tra password có thay đổi không, chắc chắn rằng user
    // đang signup
    if (!this.isModified('password')) {     // Không thay đổi
        // Thoát khỏi function và chuyển điều khiển cho function kế tiếp
        return next()
    }

    // Dùng kỹ thuật hash mật khẩu có kèm salt.
    // Salt là một chuỗi ngẫu nhiên được bcrypt tạo ra và nối vào
    // password thô trước khi hash. Salt sẽ được bcypt lưu như 
    // một phần của hashed password.
    // Dùng package bcrypt để hash password bằng kỹ thuật tạo salt
    // và hash password trên hai function riêng biệt.
    // Tham số đầu tiên của genSalt là saltRound, tham số 2 là một
    // call-back function.
    // saltRound là chi phí hash, chi phí càng cao password càng khó
    // bị hack. Chi phí được tính bằng phép tính 2 lũy thừa saltRound,
    // đây là số lần mà password kèm salt sẽ được hash, hash càng nhiều
    // lần thì hashed password càng khó bị hack.
    // Nếu genSalt thành công, kết quả được đặt vào tham số 2 của 
    // call-back function. Ngược lại, lỗi được đặt vào tham số 1.
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {      // Có lỗi khi tạo salt
            // Kết thúc vào trao control kèm lỗi cho function
            // kế tiếp trong life-cycle hook
            return next(err)
        }

        // Tạo salt thành công, tiến hành hash password với salt
        // đã tạo.
        // Tham số thứ 3 là một callback. Nếu việc hash bị lỗi, err
        // sẽ chứa lỗi, ngược lại hashed password sẽ được đặt vào hash.

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {      // Có lỗi khi hash
                // Kết thúc vào trao control kèm lỗi cho function
                // kế tiếp trong life-cycle hook
                return next(err)
            }

            // Hash thành công, gán lại hashed password cho model
            this.password = hash
            // Chuyển control cho function kế tiếp trong life cycle hook
            next()
        })
    })

})


// Export model để có thể sử dụng trong các file khác
// Export model với tên là User, tham chiếu đến định nghĩa 
// schema (đây là kiểu dữ liệu sẽ được return về từ hàm model).
// Ý nghĩa: Export đối tượng model với tên là User có kiểu 
// được định nghĩa bởi UserSchema
module.exports = mongoose.model('User', UserSchema);