// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  const databasename = event.databasename
  //推荐的菜肴id
  const foodid = event.foodid

  return await db.collection(databasename).where({
    foodid:foodid
  }).get()
}