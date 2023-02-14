const { REST, Routes } = require('discord.js');
const {token} = require('./config.json')

const items = [];

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
    description: 'delete item from my todo list',
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

  if (interaction.commandName === 'get_all') {
    const response = await fetch('https://jimstasks.ue.r.appspot.com/api')
    const data = await response.json();
    const processed = [];

    for (element of data){
      processed.push(element.detail + "\n")
    }

    data ? await interaction.reply(processed.toString().replaceAll(',', '')) : await interaction.reply("didn't work")
  }

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
  }

  if (interaction.commandName === 'add_item') {
    const sector = interaction.options.getString('sector');
    const detail = interaction.options.getString('details');
    const toAdd = {"detail": detail, "sector": sector}

    fetch("https://jimstasks.ue.r.appspot.com/ins/"+JSON.stringify(toAdd))

    await interaction.reply('added!');
  }

  if (interaction.commandName === 'show_sectors') {
    await interaction.reply('personal, school, home')


  }


});


// logs in to bot with js
client.login(token);