export const getKeyboard = (chatId, messageId, keyboard) => {
  const answer = {
    parse_mode: 'HTML',
    disable_web_page_preview: false
  };

  if (chatId && messageId && keyboard) {
    answer.chat_id = chatId;
    answer.message_id = messageId;
    answer.reply_markup = JSON.stringify({
      inline_keyboard: keyboard
    });
  } else if (chatId && messageId) {
    answer.chat_id = chatId;
    answer.message_id = messageId;
  } else
    answer.reply_markup = JSON.stringify({
      inline_keyboard: keyboard
    });

  return answer;
};
