import {bot} from './bot';
import {getKeyboard} from './keyboard';

import * as menu from './view/menu';
import * as back from './view/back';

// service;
import {runJenkinsJob} from './services/jenkinsJob';

// credential
import * as job from './credential/jenkinsJob';

bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, 'Привет, смотри что я умею', getKeyboard(null, null, menu.mainMenu));
});

bot.on('callback_query', msg => {
  const chatId = msg.message.chat.id;
  const messageId = msg.message.message_id;
  switch (msg.data) {
    case 'mainMenu':
      bot.editMessageText('Итак:', getKeyboard(chatId, messageId, menu.mainMenu));
      break;
    case 'jobs1':
      runJenkinsJob(msg, 'job1', job.job1.path, back);
      break;
    case 'jobs12':
      runJenkinsJob(msg, 'job2', job.job2.path, back);
      break;
    default:
  }
});
