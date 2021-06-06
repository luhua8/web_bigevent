// 注意:每次调用$.get()或$.post()或$.ajax()时会先调用ajaxPrefilter()函数
// 在这个函数中可以拿到给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求之前,统一拼接请求的根路径.
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    // 统一为有权限的接口设置headers请求头
    // 如果url中字符/my/的索引不等于-1说明url中含有字符/my/
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // 再complete回调函数中可以使用res.responseJSO拿到服务器相应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token');
            // 2.强制跳转到登录页面
            location.href = '/login.html';
        }
    }
})