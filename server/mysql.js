let mysql = require('mysql2')
const db_config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: "3306",// 默认使用3306端口号
  database: 'TEST'// 使用你自己创建的数据库名称,我这里使用 node_app
}


// 进行数据库交互
function conMysql(sql) {
  // 返回一个Promise承诺对象
  return new Promise((resolve, reject) => {

    let connect = mysql.createConnection(db_config)
    // 开始链接数据库
    connect.connect(function (err) {
      /*
      if (err) {
        console.log(`mysql连接失败: ${err}!`)
      } else {
        console.log('mysql连接成功了!')
      }*/
      if (err) {
        console.log(`mysql连接失败: ${err}!`)
        return reject(err)
      }
      console.log('mysql连接成功了!')
      connect.query(sql, (err, result) => {
        if (err) {
            closeMysql(connect)
            return reject(err)
        } 
        else {
          // 此处需要将返回数据转为JSON再转回来,否则原数据不为任何数据类型
          let res = JSON.parse(JSON.stringify(result))
          closeMysql(connect)
          resolve(res)
        }
      });

    }) 
  })
}
// 查询成功后关闭mysql
function closeMysql(connect) {
  connect.end((err) => {
    if (err) {
      console.log(`mysql关闭失败:${err}!`)
    } else {
      console.log('mysql关闭成功!')
    }
  })
}
// 导出方法
exports.conMysql = conMysql
