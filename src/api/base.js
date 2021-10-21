/**
 * 接口域名的管理
 */
const api = {
    debug: {
        host: 'https://plat.inkcool.com/api'
    },
    development: {
        host: 'http://10.10.10.170:8083/api'
    },
    production: {
        host: 'http://fjjf.laozicloud.com/api/api'
    }
}
const base = api['debug']

export default base;