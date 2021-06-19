const Discord = require('discord.js');
const client = new Discord.Client();
let token;
client.on('ready', () => {
  console.log(`${client.user.tag} でログインしています。`);
})


client.on('message', async msg => {

    //user「!ping」 => bot「Pong!」
    if(msg.content === '!ping'){
        msg.channel.send('Pong!');
    }

    //「hello>」と入力があったら
    //「hello, 名前」を送信
    if(msg.content === 'hello>'){
        
        const username = msg.member.nickname;
        msg.channel.send(`hello, ${username}`);
        console.log(msg.member);

    }

    //「おみくじ」と入力があったら
    //「おみくじ結果, 名前」を送信
    if(msg.content === 'おみくじ'){
        const username = msg.member.nickname;
        const lots = ['大吉', '吉', '中吉', '末吉', '凶'];
        const lot = lots[Math.floor(Math.random() * lots.length)];
        msg.channel.send(`${lot}, ${username}`);
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);