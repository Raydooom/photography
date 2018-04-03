import axios from 'axios'

const HOST = 'https://api.raydom.wang'

const hot = new Promise((resolve, reject) => {
  axios.post(HOST + "/wechat/hot").then((data) => {
    if(data){
      resolve(data)
    }else{
      reject(error)
    }
  })
})

const a = async()=>{
  return await axios.post(HOST + "/wechat/hot")
}

export const hotList = a()



