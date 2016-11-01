'use strict';
var telegramBot = require('node-telegram-bot-api');
var request = require('request-json');
var moment = require('moment');
var client = request.createClient('http://localhost:5000/');

module.exports = function()
{
  var token = 'YOUR_API_KEY';
  var bot = new telegramBot(token, {polling: true});
  client.get('http://api.promasters.net.br/cotacao/v1/valores', function(err, res, body) {

    // if matchs /dolar return current price
    bot.onText(/\/dolar/, function(msg, match){
        var fromId = msg.from.id;
        var momentUSD = new Date(body.valores.USD.ultima_consulta * 1000);
        bot.sendMessage(fromId, "Dólar: \n" + "Valor: R$ " + body.valores.USD.valor + "\n" + "Última atualização: " + moment(momentUSD).fromNow() + "\n");
    });

    // if matchs /euro return current price
    bot.onText(/\/euro/, function(msg, match){
        var fromId = msg.from.id;
        var momentEUR = new Date(body.valores.EUR.ultima_consulta * 1000);
        bot.sendMessage(fromId, "Euro: \n" + "Valor: R$ " + body.valores.EUR.valor + "\n" + "Última atualização: " + moment(momentEUR).fromNow() + "\n");
    });

    // if matchs /bitcoin return current price
    bot.onText(/\/bitcoin/, function(msg, match){
        var fromId = msg.from.id;
        var momentBTC = new Date(body.valores.BTC.ultima_consulta * 1000);
        bot.sendMessage(fromId, "Bitcoin: \n" + "Valor: R$ " + body.valores.BTC.valor + "\n" + "Última atualização: " + moment(momentBTC).fromNow() + "\n");
    });

    // if matchs /peso return current price
    bot.onText(/\/peso/, function(msg, match){
        var fromId = msg.from.id;
        var momentARS = new Date(body.valores.ARS.ultima_consulta * 1000);
        bot.sendMessage(fromId, "Peso Argentino: \n" + "Valor: R$ " + body.valores.ARS.valor + "\n" + "Última atualização: " + moment(momentARS).fromNow() + "\n");
    });

    // if matchs /libra return current price
    bot.onText(/\/libra/, function(msg, match){
        var fromId = msg.from.id;
        var momentGBP = new Date(body.valores.GBP.ultima_consulta * 1000);
        bot.sendMessage(fromId, "Libra Esterlina: \n" + "Valor: R$ " + body.valores.GBP.valor + "\n" + "Última atualização: " + moment(momentGBP).fromNow() + "\n");
    });

    bot.onText(/\/help/, function(msg, match){
        var fromId = msg.from.id;
        var messageHelp = "Olá :)\nOs comandos disponiveis são:\n/dolar Cotação do Dólar\n/euro Cotação do Euro\n/libra Cotação da Libra Esterlina\n/peso Cotação do Peso Argentino\n/bitcoin Cotação do Bitcoin\n\nEm caso de dúvidas hello@rodrigoandrade.me";
        bot.sendMessage(fromId, messageHelp);
    });
  });
}
