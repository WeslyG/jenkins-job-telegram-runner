import axios from 'axios';
import {bot} from '../bot';
import {time} from '../endpoint/time';
import {getKeyboard} from '../keyboard';
import {logger} from '../endpoint/logger';
import {cred} from '../credential/config';
import {checkJenkins} from '../endpoint/checkJenkinsBuild';

export const runJenkinsJob = (msg, name, jenkinsPath, menu) => {
  const chatId = msg.message.chat.id;
  const messageId = msg.message.message_id;
  // TODO: Права доступа на обовления стенда
  logger(`${time} - Обновление ${name} запросил ${msg.from.first_name} ${msg.from.last_name} с id = ${msg.from.id} \n`, './updateServer.log');
  bot.editMessageText(`Отправил запрос на обновление ${name}`, getKeyboard(chatId, messageId, menu.Back));

  axios.get(`${cred.jenkins.protocol}://${cred.jenkinsAuth.username}:${cred.jenkinsAuth.token}@${cred.jenkins.fqdn}/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)`)
    .then(response => {
      const head = response.data.split(':');
      axios({
        method: 'POST',
        url: `${cred.jenkins.protocol}://${cred.jenkinsAuth.username}:${cred.jenkinsAuth.token}@${cred.jenkins.fqdn}/${jenkinsPath}/build?delay=0`,
        headers: {
          'Jenkins-Crumb': `${head[1]}`
        }
      })
        .then(resp => {
          bot.editMessageText(`Обновляем ${name}`, getKeyboard(chatId, messageId, menu.Back));
          bot.sendChatAction(chatId, 'typing');
          const x = async () => {
            const TEST = await checkJenkins(msg, jenkinsPath);
            if (TEST == 'wait') {
              x();
              bot.sendChatAction(chatId, 'typing');
            } else if (TEST == 'true') bot.editMessageText(`Успешно обновил ${name}`, getKeyboard(chatId, messageId, menu.Back));
            else if (TEST == 'false') bot.editMessageText(`Какие то проблемы с обновлением ${name}`, getKeyboard(chatId, messageId, menu.Back));
          };
          setTimeout(x, 9000);
        })
        .catch(error => {
          console.log(error);
          logger(`${time} - Не смог обновить ${name} ... ошибка на стороне jenkins \n`, './updateServer.log');
          bot.editMessageText('Похоже jenkins недоступен, попросите моего создателя @WeslyG разобраться!', getKeyboard(chatId, messageId, menu.Errorx));
        });
    });
};
