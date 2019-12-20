const axios = require('axios');

export async function runPipeline(bot: any, message: any){

  const result = message.text.split(" ")
  const pipeline = result[2]

  let api_base_url = 'https://ci-master1-int.prod-pod-us-east-1.immunet.com/go/api'
  let url = api_base_url + `/pipelines/${pipeline}/schedule`

  await bot.say(`Attempting to run ${pipeline}`)

  axios.post(url, {}, {
    headers:
    {
      "Authorization" : "bearer " + process.env.GO_ACCESS_TOKEN,
      "Accept" : 'application/vnd.go.cd.v1+json',
      "Content-Type" : 'application/json',
      "X-GoCD-Confirm" : true
    }
  })
    .then(async (response: any) => {
      await bot.changeContext(message.reference)
      await bot.say(response.data.message)
    })    
    .catch(async (error:any) => {
      const error_code = error.response.status

      await bot.changeContext(message.reference)

      if (error_code == 409){
        await bot.say('[Error] Conflict! Pipeline already scheduled to run.')
      } else {
        await bot.say('[Error] Unknown error occured. Code: ' + error_code.toString())
      }

      await bot.changeContext(message.reference)
    })
}

export async function statusPipeline(bot: any, message: any){
  const result = message.text.split(" ")
  const pipeline = result[2]

  let api_base_url = 'https://ci-master1-int.prod-pod-us-east-1.immunet.com/go/api'
  let url = api_base_url + `/pipelines/${pipeline}/status`

  await bot.reply(message, `Checking go status for ${pipeline}`)

  axios.get(url, {
    headers:
    {
      "Authorization" : `Bearer ${process.env.GO_ACCESS_TOKEN}`
    }
  })
    .then(async (response: any) => {
      const response_code = response.status
      await bot.changeContext(message.reference)

      if(response_code == 200){
        await bot.say('Pipeline is healthy!')
      }
    })
}