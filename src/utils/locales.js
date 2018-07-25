import antd_en_US from 'antd/lib/locale-provider/en_US';
import appLocaleData_en_US from 'react-intl/locale-data/en';
import messages_en_US from '../assets/locales/en_US.json';

import antd_zh_CN from 'antd/lib/locale-provider/zh_CN';
import appLocaleData_zh_CN from 'react-intl/locale-data/zh';
import messages_zh_CN from '../assets/locales/zh_CN.json';

const en_US = {
  messages: {
    ...messages_en_US,
  },
  antd: antd_en_US,
  locale: 'en-US',
  data: appLocaleData_en_US,
};

const zh_CN = {
  messages: {
    ...messages_zh_CN,
  },
  antd: antd_zh_CN,
  locale: 'zh-CN',
  data: appLocaleData_zh_CN,
};

export default {en_US, zh_CN};
