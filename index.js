//requirements for bot config
require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs')
//bot object for Discord
const bot = new Discord.Client();
//gets the token from env defined
const TOKEN = process.env.TOKEN;
//login with Token given
bot.login(TOKEN);
//prefix used in this bot
const prefix = ";";


//listen to ready event for bot, executes when bot is ready
bot.on('ready', () => {
  console.info(`logged in as ${bot.user.tag}!`);
});

//listen to msg sent in by user
bot.on('message', msg =>{
  if(!msg.content.startsWith(prefix)) return; //stop if msg doesnt start with prefix
  else {
    console.info(`${msg.content}`);
    const parsed = `${msg.content}`.split(';')[1]
    const quote = getQuote(parsed);
    console.log(quote);
    if(quote){
      msg.channel.send(quote);
    }
    else{
      msg.channel.send('Cant even spell correactly you dumb fuck!');
    }

  }
});


//gets the random quote from the defined actor
function getQuote(actor){
  console.log(actor);
  const actor_json = './scraper/json_quotes/'+actor+'.json'
  console.log(actor_json);
  //check if the actor quotes exists and get quotes
  try {
    if (fs.existsSync(actor_json)) {
      const content = fs.readFileSync(actor_json);
      const quotes = JSON.parse(content);
      // console.log(quotes);
      const keys = Object.keys(quotes);
      const randIndex = Math.floor(Math.random() * keys.length);
      const randKey = keys[randIndex];
      const randQuote = quotes[randKey];
      return randQuote;
    }
  } catch(err) {
    console.error(err)
  }
}
