import { get, post, uploadFile } from './http'

/**
 * @desc 获取素材分类信息
 */
export function getTemplateCategory() {
  return get('/Material/getTemplateCategory', {})
}

/**
 * @desc 获取素材详情列表
 * @param params {Object} {csid: 二级分类id}
 */
export function getTemplate(params) {
  return get('/Material/getTemplate', params)
}

/**
 * @desc 上传图片
 * @param file {File}
 */
export function uploadImg(file) {
  return uploadFile('/upload/uploadImg?action=uploadimage', file)
  // return uploadFile('Material/uploadImg', file)
}

/**
 * @desc 发布文章
 * @param params {Object} {mid: 用户id, cover: 封面地址, s_img: 封面缩略图地址, title: 标题, desc: 副标题, content: 内容}
 */
// export function publishArticle(params) {
//   return post('/editor/publishArticle', params)
// }
export function pushNewsData(params) {
  return post('/Articles/pushNewsData', params)
}
/**
 * @description 获取文章分类
 * @param {*} params 
 */
export function getCategory(params) {
  return post("/Articles/getCategory", params)
}

/**
 * @desc 发送短信获取验证码
 * @param params {Object} {tel: 手机号}
 */
export function sendSMS(params) {
  return get('/yidun/sendSMS', params)
}

/**
 * @desc 登录
 * @param params {Object} {tel: 手机号, code: 短信验证码}
 */
export function login(params) {
  return post('/login/execLogin', params)
}

/**
 * @desc 登录二维码
 */
export function qrCode() {
  return get('/WeixinLogin/qrCode', {})
}
/**
 * @desc 
 */
export function loginInfo(params) {
  return get('/WeixinLogin/loginInfo', params)
}

/**
 * @desc 记录当前登录账号
 * @param params {Object} {mid}
 */
export function recordCurrentAccounts(params) {
  return post('/login/saveBaseInfo', params)
}

/**
 * @desc 获取关联账号
 * @param params {Object} {mid}
 */
export function switchAccount(params) {
  return post('/login/switchAccount', params)
}

/**
 * @desc 获取模板分类
 */
export function getFrameworkCategory() {
  return get('/editor/getFrameworkCategory', {})
}

/**
 * @desc 获取模板
 * @param params {Object} {csid} {page} {pagesize}
 */
export function getFrameWork(params) {
  return get('/editor/getFrameWork', params)
}

/**
 * @desc 获取图片分类
 */
export function getPictureCategory() {
  return get('/editor/getPictureCategory', {})
}

/**
 * @desc 获取图片
 * @param params {Object} {csid} {page} {pagesize}
 */
export function getPicture(params) {
  return get('/editor/getPicture', params)
}

/**
 * @desc 获取我的图片
 * @param params {Object} {csid} {page} {pagesize}
 */
export function getUserPicture(params) {
  return get('/editor/getMyPicture', params)
}

/**
 * @desc 获取我的草稿
 * @param params {Object} {mid} {page} {pagesize}
 */
export function getDraftList(params) {
  return get('/editor/getMyDraft', params)
}

/**
 * @desc 保存草稿
 * @param params {Object}
 */
export function saveDraft(params) {
  return post('/editor/saveDraft', params)
}

/**
 * @desc 更新草稿
 * @param params {Object}{id}{content}
 */
export function updateDraft(params) {
  return post('/editor/updateDraft', params)
}

/**
 * @desc 删除草稿
 * @param params {Object} {id}
 */
export function deleteDraft(params) {
  return post('/editor/deleteDraft', params)
}

/**
 * @desc 清空草稿
 * @param params
 */
export function clearDraft(params) {
  return post('/editor/clearDraft', params)
}

/**
 * @desc 获取我的文章
 * @param params {Object} {mid} {page} {pagesize}
 */
export function getArticleList(params) {
  return post('/editor/getMyArticle', params)
}

/**
 * @desc 获取某篇文章
 * @param params {Object} {id}
 */
export function getArticle(params) {
  return post('/editor/getArticle', params)
}

/**
 * @desc 删除文章
 * @param params {Object} {id}
 */
export function deleteArticle(params) {
  return post('/editor/deleteArticle', params)
}

/**
 * @desc 导入文章
 * @param params {Object} {id}
 */
export function importArticle(params) {
  return post('/wx/sync', params)
}


/**
 * @desc 获取我的模板
 * @param params {Object}
 */
export function getUserFramework(params) {
  return get('/editor/getMyFramework', params)
}


/**
 * @desc 保存我的模板
 * @param params {Object}
 */
export function saveFramework(params) {
  return post('/editor/saveFramework', params)
}
