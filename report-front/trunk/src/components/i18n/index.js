import common from './common'
import test from './test'
import grower from './growerMessages'
import swine from './swineMessages'
import spi from './spiMessages'
var messages = {
  en: {
    ...common.en,
    ...test.en,
    ...grower.en,
    ...swine.en,
    ...spi.en
  },
  zh_CN: {
    ...common.zh_CN,
    ...test.zh_CN,
    ...grower.zh_CN,
    ...swine.zh_CN,
    ...spi.zh_CN
  }
}

export default messages
