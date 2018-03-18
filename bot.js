import TelegramBot from 'node-telegram-bot-api';
import {cred} from './credential/config';

export const token = cred.telegramBotToken;
export const bot = new TelegramBot(token, {polling: true});
