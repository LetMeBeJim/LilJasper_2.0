const { REST, Routes } = require('discord.js');
const {token} = require('./password.json')

var processedAll = [];

const commands = [
  {
    name: 'test2',
    description: 'Replies with Pong!',
    options: [
      {
        name: 'stuff',
        description: 'gets type of party',
        type: 3, 
        required: true,
      },
    ],
  },

  {
    name: 'get_all',
    description: 'gets list',
  },

  {
    name: 'delete_that',
    description: 'delete item from my todo list, input with item number of the get_all list',
    options: [
      {
        name: 'number',
        description: 'item to be deleted',
        type: 4,
        require: true,
      }
    ]
  },

  {
    name: 'get_from',
    description: 'get list from a chosen sector',
    options: [
      {
        name: 'sector',
        description: 'which sector',
        type: 3,
        required: true,
      },
    ],
  },

  {
    name: 'add_item',
    description: 'add item to my todo list',
    options: [
      {
        name: 'sector',
        description: 'which sector',
        type: 3,
        required: true,
      },
      {
        name: 'details',
        description: 'whatever u need to do',
        type: 3,
        required: true,
      },
    ],
  },

  {
    name: 'show_sectors',
    description: 'see all sectors',
  },

];

// include this for slash commands
const rest = new REST({ version: '10' }).setToken(token);

function ping() {
  fetch('https://jimstasks.ue.r.appspot.com/api')
  fetch('https://jimsiteserver.ue.r.appspot.com/api')
}
setInterval(ping, 540000);
ping();

// just making sure it works, not necessary
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("1047630869935968257"), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const { Client, GatewayIntentBits } = require('discord.js');

// this part definitely is login, since it indicates a new client/bot/app whatever u name it with default intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// functions here
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'test2') {
    await interaction.reply(interaction.options.getString('stuff') );
  }

  try {
  if (interaction.commandName === 'get_all') {
    const response = await fetch('https://jimstasks.ue.r.appspot.com/api')
    const data = await response.json();
    processedAll = [];
    const result = [];

    for (element of data){
      processedAll.push(element.detail);
      result.push(element.detail + "\n")
    }

    data ? await interaction.reply(result.toString().replaceAll(',', '')) : await interaction.reply("didn't work")
  }}catch (e) {
    console.log(e)
  }
  try {
  if (interaction.commandName === 'get_from') {
    const sector = interaction.options.getString('sector');

    async function funcName(s){
      const response = await fetch("https://jimstasks.ue.r.appspot.com/sector/"+s);
      var data = await response.json();
      return data
      }
    
    result = await funcName(sector)

    const processed = [];

    for (element of result){
      processed.push(element.detail + "\n");
    }

    await interaction.reply(processed.toString().replaceAll(',', ''));
  }}catch (e) {
    console.log(e)
  }
  try {
  if (interaction.commandName === 'add_item') {
    const sector = interaction.options.getString('sector');
    const detail = interaction.options.getString('details');
    const toAdd = {"detail": detail, "sector": sector}

    fetch("https://jimstasks.ue.r.appspot.com/ins/"+JSON.stringify(toAdd))

    await interaction.reply('added!');
  }}catch (e) {
    console.log(e)
  }
  try {
  if (interaction.commandName === 'show_sectors') {
    await interaction.reply('personal, school, home')


  }}catch (e) {
    console.log(e)
  }
  try {
  if (interaction.commandName === 'delete_that') {
    const itemNum = interaction.options.getInteger('number');
    const item = processedAll[itemNum-1];

    fetch("https://jimstasks.ue.r.appspot.com/del/"+item)

    await interaction.reply('deleted!');
  }}catch (e) {
    console.log(e)
  }

});


// logs in to bot with js
client.login(token);