import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, '邮件已存在!'],
    required: [true, '邮件是必须的!']
  },
  username: {
    type: String,
    required: [true, '用户名是必须的!']
  },
  image: {
    type: String
  }
})

//  models的作用: 如果某个模型已经存在, 将阻止我们重新定义该模型并确保现有的模型被重用
const User = models.User || model("User", UserSchema);

export default User;