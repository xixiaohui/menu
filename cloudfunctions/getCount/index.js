// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
 
  const databasename = event.databasename
  const keyword = event.keyword
  
  var arr = []
  arr.push(keyword)
  return await db.collection(databasename).where({
    tags:_.in(arr)
  }).count()
}