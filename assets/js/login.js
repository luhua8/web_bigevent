$(function() {
    // 点击"立即注册"的连接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击"去登陆"的连接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过from.verify()函数自动逸校验规则
    form.verify({
        // 自定义了一个叫做pwd的校验规则
        // \S表示非空格的字符
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        rpwd: function(value, item) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框的内容
            // 最后在进行判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            // console.log(pwd);
            if (value != pwd) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1.阻止默认的提交行为
        e.preventDefault();
        // 2.发起ajax的post请求
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功!请登录');
                // 提示请登录后直接跳转到登录页面
                // 即需要模拟人的点击行为
                $('#link_login').click();
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止默认事件
        e.preventDefault();
        // 发起请求
        // serialize()快速获取表单中的数据
        var data = $(this).serialize();
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('登陆成功!');
            // 将登录成功后得到的token字符串,保存到localStorage中
            // 因为后续获取文章分类需要用
            localStorage.setItem('token', res.token);
            location.href = '/index.html';
        });
    })
})