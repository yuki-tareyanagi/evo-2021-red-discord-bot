const Discord = require('discord.js');
const client = new Discord.Client();

var notificationTargetChannelName = "vc参加通知";
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


});

client.on("voiceStateUpdate", (oldStatus, newStatus)=>{
    let actionName = "";
    if(oldStatus.channelID && newStatus.channelID) actionName = "移動";
    else if(oldStatus.channelID) actionName = "退出";
    else actionName = "参加";
    //参加以外は通知しない
    if(newStatus.channelID){
        //サーバー取得
        let guild = newStatus.guild;
        //ユーザ名取得
        let joinUserId = newStatus.id;
        let joinUser = guild.members.cache.get(joinUserId);
        let joinUserName = joinUser.nickname || joinUser.user.username
        //参加したボイスチャンネル取得
        let joinVoiceChannelId = newStatus.channelID;
        let joinVoiceChannel = guild.channels.cache.get(joinVoiceChannelId);
        //ボイスチャンネルの所属しているカテゴリを取得
        let joinCategory = guild.channels.cache.get(joinVoiceChannel.parentID);

        //送信メッセージの作成
        let joinSpaceName = joinCategory ? `${joinCategory.name}のボイスチャンネル` : joinVoiceChannel.name;
        let message = `${joinUserName}さんが${joinSpaceName}に${actionName}しました`;

        //送信先テキストチャンネルを取得
        let notificationTargetChannel = guild.channels.cache.find((c) =>{
            if (c.name === notificationTargetChannelName){
                console.log(c);
                return true;
            };
            return false;
        });
        
        notificationTargetChannel.send(message);
    }
});


client.login();

