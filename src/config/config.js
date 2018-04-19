/**
 * Created by gd on 2018/1/12/012.
 */

let build = 1 // 0生产  1王伟本地测试  2 映射公网测试
let advertMap = {
  0: 'http://47.104.136.67/pgb/',
  1: 'http://172.31.61.85:8182/pgb/',
  2: 'http://wangwei.viphk.ngrok.org/pg/'
}
let urlMap = {
  0: 'http://47.104.136.67/pg/',
  1: 'http://172.31.61.40:8181/pg/',
  2: 'http://wangwei.viphk.ngrok.org/pg/'
}
let fileMap = {
  0: 'http://47.104.136.67/ftp/',
  1: 'http://172.31.61.40:80/ftp/file/',
  2: 'http://gdweixin.viphk.ngrok.org/'
}
let urlPre = urlMap[build]
let filePre = fileMap[build]
let advertPre = advertMap[build]
let uploadUrl = { // 上传地址
  objectMultipartUploadImg: `${urlPre}sourceObject/multipartUploadImg`, //项目图片上传
  multipartUploadIcon: `${urlPre}source/multipartUploadIcon`, //图标上传
  multipartUploadImg: `${urlPre}source/multipartUploadImg`,// 图片上传
  multipartUploadSound: `${urlPre}source/multipartUploadSound`,// 声音上传
  multipartUploadVideo: `${urlPre}source/multipartUploadVideo`,//视频上传
  multipartUploadSource: `${urlPre}source/multipartUploadSource`,//资源上传
}
let code = {
  SUCCESS: '000000',
  NO_AUTHORITY: '000003' // 无访问权限
}
export {uploadUrl, code, urlPre, filePre, build,advertPre}



