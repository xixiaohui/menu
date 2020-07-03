// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

const SKIP_NUM = 20

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  const databasename = event.databasename
  const keyword = event.keyword
  const page = event.page

  var arr = []
  arr.push(keyword)
  return await db.collection(databasename).where(
    _.or([
      {
        title:keyword
      },
      {
        tags:_.in(arr)
      }
    ])).field({
    _id:false
  }).skip(page * SKIP_NUM).limit(SKIP_NUM).get()
}