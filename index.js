const Discord = require("discord.js");
const TOKEN = "Your token here"
const PREFIX = "p!"
const YTDL = require("ytdl-core")

var bot = new Discord.Client();

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
        
    });
}

var yn = [
    "Yes",
    "No"
];
var fortunes = [
    "Yes",
    "No",
    "May be"
];

var servers = {}

//conection
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});
    bot.on("ready", function(){
    console.log("Ready");
    });
        bot.on("guildMemberAdd", function(member) {
            member.guild.channels.find("name", "chat").sendMessage("Привет " + member.toString("") +"!" + " Добро пожаловать на марс!"); 
        })

bot.on("message", function(message){
    if(message.author.equals(bot.user)) return;


    // random word
    if(message.content == "I wanna eat"){
       message.channel.sendMessage("Me too"); 
    }
    if(message.content == "Hi bot"){
        message.channel.sendMessage("Hello ^_^")
    }
    if(message.content == "Hello bot"){
        message.channel.sendMessage("Hello!")
    }

    if(message.content == "Bye bot"){
       message.channel.sendMessage("Bye!"); 
    }
    if(message.content == "Bot bye"){
       message.channel.sendMessage("Bye!"); 
    }

    // if(message.content == "Хлебушек пидар?"){
    //    message.channel.sendMessage("ДА ДА ДА"); 
    // }
    // if(message.content == "Бот ты пидар"){
    //    message.channel.sendMessage("Omg retard..."); 
    // }

// prefix settings
    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

// comands with prefix

    switch (args[0].toLowerCase()){
        case "ping":
            message.channel.sendMessage("Pong!");
            break; 
        case "info":
            message.channel.sendMessage("Teseting")
            break;
        
        case "embed":
            var embed = new Discord.RichEmbed()
                .addField("Mute", "III040lad", )
                .addField("Test title2", "2test description", true)
                .addField("Test title3", "3test description", true)
                .addField("Test title3", "3test descripti34on4", )
                .addField("Test title3", "3test descriptio6n6")
                .setColor("5a0ff2")
                .setFooter("Pekaby the best")
            message.channel.sendMessage(embed)
            break;
            //case "profile":
            //var profile = new Discord.RichEmbed()
             //   .setField(message.author.title(""))
            //    .setThumbnail(message.author.avatarURL)
            //message.channel.sendMessage(profile)
           // break;
           // -- - - - - -- - - - - - - - - - - -

           // music YDL - core 
           // case "mute":
           //  var embed = new Discord.RichEmbed()
           //      .addField("MUTE", "III040lad Was muted by Pekaby", )
           //      .setColor("5a0ff2")
           //      .setFooter("For 1 day")
           //      .setThumbnail(message.author.avatarURL)
           //  message.channel.sendMessage(embed)
           //  break;
        case "play":

            if (!args[1]) {
                message.channel.sendMessage("I dont see your link. Try again")
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.sendMessage("You need to join any voiceChannel")
                return;
            }
                

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id]
            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;

            case "skip":
                var server = servers[message.guild.id];

                if (server.dispatcher) server.dispatcher.end()
            break;
            case "stop":
                var server = servers[message.guild.id];

                if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect()
                if (message.guild.voiceConnection)
        {
            for (var i = server.queue.length - 1; i >= 0; i--) 
            {
                server.queue.splice(i, 1);
         }
            server.dispatcher.end();
            console.log("[" + new Date().toLocaleString() + "] Stopped the queue.");
        }﻿
        //games 

            break;
        case "8ball":
            if(args[1]){
                message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            }else{
                message.channel.sendMessage("Do you understand what did you write? ")
            }
            break;

        case "yesno":
            if(args[1]){
            message.channel.sendMessage(yn[Math.floor(Math.random() * yn.length)]);
        }else{
            message.channel.sendMessage("ТDo you understand what did you write?");
        }
            break;
        
        






            // testing for cpmmand 
            default:
            message.channel.sendMessage("Неверная команда")
    }
});

bot.login(TOKEN)