<template>
    <div class="login_container">
        <!-- 画布 -->
        <canvas id="Meteor" width="100%" height="100%"></canvas>
        <!-- 循环生成星星 -->
        <div class="star" v-for="(item, index) in starCount" :key="index"></div>
        <!-- 登陆窗口 -->
        <div class="login" style="height: 340px" v-if="isLogin">
            <el-form
                class="login_form"
                :model="loginForm"
                :rules="loginFormRules"
                ref="loginFormRef"
            >
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                    ></el-input>
                </el-form-item>
                <div
                    class="zhaohui"
                    v-if="isPasswordErr > 200"
                    @click="getBack"
                >
                    找回密码
                </div>
                <!-- 按钮 -->
                <el-form-item class="btn_login">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button @click="resetLogin" class="btn-re"
                        >重置</el-button
                    >
                </el-form-item>
                <img src="../assets/images/lock.png" alt="" class="lock" />
                <img src="../assets/images/user.png" alt="" class="user" />
            </el-form>
        </div>
        <!-- 找回密码窗口 -->
        <div class="login" style="height: 420px" v-if="!isLogin">
            <el-form
                class="login_form"
                :model="editForm"
                :rules="editFormRules"
                ref="editFormRef"
            >
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="editForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input
                        v-model="editForm.code"
                        style="width: 180px"
                    ></el-input>
                </el-form-item>
                <div class="sendcode" @click="sendCode" v-if="!isSend">
                    发送验证码
                </div>
                <div class="sendcode" v-if="isSend">{{ seconds }}</div>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input
                        v-model="editForm.password"
                        type="password"
                    ></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btn_login">
                    <el-button type="primary" @click="login">修改</el-button>
                    <el-button @click="goLogin" class="btn-re">登录</el-button>
                </el-form-item>
                <img src="../assets/images/lock.png" alt="" class="lock2" />
                <img src="../assets/images/code.png" alt="" class="code" />
                <img src="../assets/images/user.png" alt="" class="user" />
            </el-form>
        </div>
        <!-- logo -->
        <div class="logo">JPCMS</div>
    </div>
</template>

<script>
export default {
    data() {
        // 验证邮箱的规则
        // let checkEmail = (rule, value, cb) => {
        //     const regEmail =
        //         /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        //     if (regEmail.test(value)) {
        //         return cb()
        //     }
        //     cb(new Error('请输入正确邮箱地址'))
        // }
        return {
            // canvas初始化
            Meteor: {},
            context: {},
            bg: '',
            stars: [],
            starCount: 300,
            rainCount: 10,
            rains: [],
            isPasswordErr: 0,
            isLogin: true,
            isSend: true,
            seconds: '发送验证码',
            // // 登陆表单数据
            loginForm: {
                username: '',
                password: ''
            },
            loginFormRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                    // {
                    //     validator: checkEmail,
                    //     trigger: 'blur'
                    // }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        min: 8,
                        max: 16,
                        message: '长度在 8到 16 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            editForm: {
                username: '',
                password: '',
                code: ''
            },
            editFormRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名（邮箱）',
                        trigger: 'blur'
                    }
                    // {
                    //     validator: checkEmail,
                    //     trigger: 'blur'
                    // }
                ],
                code: [
                    {
                        required: true,
                        message: '请输入邮箱验证码',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        min: 8,
                        max: 16,
                        message: '长度在 8到 16 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        getBack() {
            this.isLogin = false
            this.$refs.loginFormRef.resetFields()
        },
        goLogin() {
            this.isLogin = true
            this.$refs.editFormRef.resetFields()
        },
        resetLogin() {
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            this.$refs.loginFormRef.validate(async (valid) => {
                if (!valid) return
                let { data: res } = await this.$http.post(
                    '/login',
                    this.loginForm
                )
                if (res.status === 204) {
                    this.isPasswordErr++
                    return this.$message.error({
                        message: '错误次数过多，明日再试',
                        offset: 201,
                        center: true
                    })
                }
                if (res.status !== 200) {
                    this.isPasswordErr++
                    return this.$message.error({
                        message: '登陆失败,用户名或密码错误',
                        offset: 201,
                        center: true
                    })
                }
                this.$message.success({
                    message: '登陆成功',
                    offset: 201,
                    center: true
                })
                // 把用户信息也存入session
                window.sessionStorage.setItem('token', res.token)
                window.sessionStorage.setItem(
                    'userInfo',
                    JSON.stringify(res.username)
                )
                this.$router.push('/home')
            })
        },
        // 发送验证码
        sendCode() {},
        // 星星的位置
        starPosition() {
            this.stars = document.querySelectorAll('.star')
            for (var i = 0; i < this.starCount; i++) {
                this.stars[i].style.left =
                    Math.random() * window.innerWidth + 'px'
                this.stars[i].style.top =
                    Math.random() * window.innerHeight + 'px'
                this.stars[i].style.animationDelay = Math.random() * 10 + 's'
            }
            // console.log(this.stars)
        },
        // 初始化canvas
        init() {
            this.Meteor = document.getElementById('Meteor')
            this.Meteor.width = window.innerWidth
            this.Meteor.height = window.innerHeight
            this.context = this.Meteor.getContext('2d')
        },
        // 生成流星 构造函数
        MeteorRain(cont) {
            this.x = Math.random() * window.innerWidth
            this.y = Math.random() * window.innerHeight
            this.length = Math.ceil(Math.random() * 80 + 150)
            this.angle = 30
            this.cos = Math.cos((this.angle * 3.14) / 180)
            this.sin = Math.sin((this.angle * 3.14) / 180)
            this.width = this.length * this.cos
            this.height = this.length * this.sin
            this.speed = Math.ceil(Math.random() + 0.5)
            this.shifting_x = this.speed * this.cos
            this.shifting_y = this.speed * this.sin

            this.countPos = () => {
                this.x = this.x - this.shifting_x
                this.y = this.y + this.shifting_y
            }
            this.draw = () => {
                cont.save()
                cont.beginPath()
                cont.lineWidth = 1
                cont.globalAlpha = this.alpha
                var line = cont.createLinearGradient(
                    this.x,
                    this.y,
                    this.x + this.width,
                    this.y - this.height
                )
                line.addColorStop(0, 'white')
                line.addColorStop(0.5, 'grey')
                line.addColorStop(1.0, 'black')
                cont.strokeStyle = line
                cont.moveTo(this.x, this.y)
                cont.lineTo(this.x + this.width, this.y - this.height)
                cont.closePath()
                cont.stroke()
                cont.restore()
            }
            this.move = () => {
                var x = this.x + this.width - this.shifting_x
                var y = this.y - this.height + this.shifting_y
                cont.clearRect(
                    x - 3,
                    y - 3,
                    this.shifting_x + 5,
                    this.shifting_y + 5
                )
                this.countPos()
                this.alpha -= 0.002
                this.draw()
            }
        },
        // 流星动态
        playRains() {
            // 把context对象传进去
            let cont = this.context
            for (var n = 0; n < this.rainCount; n++) {
                var rain = this.rains[n]
                rain.move()
                if (rain.y > window.innerHeight) {
                    this.context.clearRect(
                        rain.x,
                        rain.y - rain.height,
                        rain.width,
                        rain.height
                    )
                    this.rains[n] = new this.MeteorRain(cont)
                }
            }
            setTimeout(this.playRains, 2)
        }
    },
    created() {},
    mounted() {
        this.init()
        // 把context对象传进去
        let cont = this.context
        for (var i = 0; i < this.rainCount; i++) {
            var rain = new this.MeteorRain(cont)
            rain.draw()
            this.rains.push(rain)
        }
        this.playRains()
        // 生成星星
        // this.starInit()
        this.starPosition()
    }
}
</script>

<style lang="stylus" scoped>
// 定义动画
@keyframes flash
    20%
        opacity 0.2
    40%
        opacity 0.5
    60%
        opacity 1
    80%
        opacity 0.5
    100%
        opacity 0.2
@keyframes flash2
    20%
        opacity 0
    40%
        opacity 0.3
    60%
        opacity .7
    80%
        opacity 0.3
    100%
        opacity 0
.login_container
    background-color black
    width 100%
    height 100%
    overflow hidden
    position relative
    .star
        position absolute
        width 0
        height 0
        opacity 0.2
        border-right 2px solid transparent
        border-bottom 1.4px solid #fff
        border-left 2px solid transparent
        animation flash 2s infinite linear
        -moz-transform rotate(35deg)
        -webkit-transform rotate(35deg)
        -ms-transform rotate(35deg)
        -o-transform rotate(35deg)
    .star::before
        content ''
        position absolute
        left -1.3px
        top -1.2px
        border-bottom 1.6px solid #fff
        border-left 0.6px solid transparent
        border-right 0.6px solid transparent
        -webkit-transform rotate(-35deg)
        -moz-transform rotate(-35deg)
        -ms-transform rotate(-35deg)
        -o-transform rotate(-35deg)
    .star::after
        content ''
        position absolute
        /* display: block; */
        color white
        top 0px
        left -2px
        width 0px
        height 0px
        border-right 2px solid transparent
        border-bottom 1.4px solid #fff
        border-left 2px solid transparent
        -webkit-transform rotate(-70deg)
        -moz-transform rotate(-70deg)
        -ms-transform rotate(-70deg)
        -o-transform rotate(-70deg)
    .login
        width 500px
        background-color rgba(gray,.05)
        position absolute
        top 30%
        right 10%
        z-index 1000
        border-radius 8px
        // box-shadow 0px 10px 10px #000
        // padding 40px
        .login_form
            width 320px
            margin 60px auto
            /deep/.el-input__inner
                background-color rgba(#fff,.05)
                color #fff
                border 1px solid rgba(gray,.05)
            .el-input
                margin-bottom 20px
            /deep/.el-form-item__error
                margin-top -15px
            .btn_login
                text-align center
                // padding-right 100px
                // margin-right 10px
                // border 1px solid red
                .el-button
                    width 120px
                    opacity .7
                    margin 10px 20px
                    border none
                    box-shadow 0px 10px 10px #000
                .btn-re
                    background-color rgba(gray,.5)
                    color rgba(#fff,.5)
                .btn-re:hover
                    background-color rgba(gray,.6)
                    color rgba(#fff,1)
            .user
                width 28px
                height 28px
                position absolute
                top 65px
                left 42px
                opacity .3
            .lock,.lock2,.code
                width 30px
                height 30px
                position absolute
                top 146px
                left 40px
                opacity .3
            .lock2
                top 226px
            .zhaohui
                height 35px
                width 80px
                color red
                cursor: pointer
                position absolute
                bottom: 108px
                right 100px
            .sendcode
              height: 38px
              width 120px
              background-color #eee
              line-height 38px
              text-align center
              border-radius: 4px
              cursor pointer
              margin-left 10px
              position absolute
              top 143px
              right 90px
    .logo
        font-size 150px
        color #fff
        position absolute
        top 25%
        left 10%
        font-weight 700
        letter-spacing 20px
        animation flash2 4s infinite linear
</style>
