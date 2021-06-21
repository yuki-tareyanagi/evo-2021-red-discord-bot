const Discord = require('discord.js');
const client = new Discord.Client();

//接続時にログイン情報を表示
client.on('ready', () => {
  console.log(`${client.user.tag} でログインしています。`);
});

//メッセージが来たら
client.on('message', msg => {

    //user「!ping」 => bot「Pong!」
    //msg.contentはチャットの中身の文字列
    //!pingというメッセージが来たら
    if(msg.content === '!ping'){
        //そのチャンネルにPong！と送信
        msg.channel.send('Pong!');
    }

    //「hello>」と入力があったら
    //「hello, 名前」を送信
    if(msg.content === 'hello>'){
        //usernameにはニックネームが入る。
        //ニックネームが未設定の人はmsg.member.nicknameがnullになるのでユーザ名が入る。
        const username = msg.member.nickname || msg.author.username;
        msg.channel.send(`hello, ${username}`);
        //console.log(msg.member);

    }

    //「おみくじ」と入力があったら
    //「おみくじ結果, 名前」を送信
    if(msg.content === 'おみくじ'){
        const username = msg.member.nickname || msg.author.username;
        //lotにlotsの中からランダムに１つ選んで格納
        const lots = ['大吉', '吉', '中吉', '末吉', '凶'];
        const lot = lots[Math.floor(Math.random() * lots.length)];
        msg.channel.send(`${lot}, ${username}`);
    }

    /*
    if(msg.content.match(/System.out.println(\".*\");/)){
      const output = msg.content.splice(20, -3);
      console.log(output);
      console.log("ok");
    }*/

});

client.login();