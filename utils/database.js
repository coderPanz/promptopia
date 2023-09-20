import mongoose from "mongoose";

// 跟踪连接
let isConnected = false; 

export const connectToDB = async () => {
  // 设置mongoose的严格模式
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB 已经连接!')
    return;
  }
  
  try {
    console.log('正在连接!')
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName:'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log('MongoDB 已经连接!')
  } catch (error) {
    console.log(error)
  }
}