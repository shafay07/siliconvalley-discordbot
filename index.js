//requirements for bot config
require('dotenv').config();
const Discord = require('discord.js');
//bot object for Discord
const bot = new Discord.Client();
const fs = require('fs')
const cheweyBotAnalyticsAPI = require("discord-bot-analytics")
const customAnalytics = new cheweyBotAnalyticsAPI(process.env.CHEWEY, bot)



//login with Token given
bot.login(process.env.TOKEN);
//prefix used in this bot
const prefix = ";";


//listen to ready event for bot, executes when bot is ready
bot.on('ready', () => {
  console.info(`logged in as ${bot.user.tag}!`);
  bot.user.setActivity(';actors', {
    type: 'LISTENING'
  });
});

//listen to msg sent in by user
bot.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return; //stop if msg doesnt start with prefix
  else if (msg.content === ';actors') {
    console.log(';actors called');
    // inside a command, event listener, etc.
    msg.channel.send({
      embed: {
        color: [255, 157, 115],
        title: "List of actors:",
        description: "everyone \n richard \n erlich \n dinesh \n gilfoyle \n jared \n bighead \n monica \n russ \n gavin \n peter \n jianyang \n laurie"
      }
    });

  } else {
    console.info(`${msg.content}`);
    const parsed = `${msg.content}`.split(';')[1]
    const quote = getQuote(parsed);
    console.log(quote);
    if (quote) {
      msg.channel.send(quote);
    } else {
      msg.channel.send('❗️ A typo probably, try ";actors"');
    }

  }
});


//gets the random quote from the defined actor
function getQuote(actor) {
  console.log(actor);
  const actor_json = './scraper/json_quotes/' + actor + '.json'
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
  } catch (err) {
    console.error(err)
  }
}