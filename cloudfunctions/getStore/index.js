// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const databasename = event.databasename

  const mystore = event.mystore
  if (mystore == 1) {
    return await db.collection(databasename).where({
      _openid: wxContext.OPENID
    }).orderBy('time', 'desc').get()
  } else {
    return await db.collection(databasename).orderBy('time', 'desc').get()
  }


}