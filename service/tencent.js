import axios from 'axios';
import { config } from 'dotenv';
config();
import { translateConfig } from '../config.js';

const client_key = process.env.TENCENT_KEY;

export default async function tencent(query) {
  if (!client_key) {
    console.log('请先配置环境变量 TENCENT_KEY');
    throw new Error('请先配置环境变量 TENCENT_KEY');
  }

  const data = {
    "header": {
      "fn": "auto_translation",
      "session": "",
      "client_key": client_key,
      "user": ""
    },
    "type": "plain",
    "model_category": "normal",
    "text_domain": "general",
    "source": {
      "lang": translateConfig.sourceLanguage,
      "text_list": [
        query
      ]
    },
    "target": {
      "lang": translateConfig.targetLanguage
    }
  };

  const res = await axios.post('https://transmart.qq.com/api/imt', data, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    },
  });

  return res?.data?.auto_translation?.[0] || '<ERROR>';
}
