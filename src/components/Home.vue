<template>
    <el-container class="home-container">
        <!-- 顶部导航 -->
        <el-header style="height: 80px">
            <div>
                <!-- <img src="../assets/images/home_logo.png"  class="logopic"/> -->
                <span class="cmstitle">后台管理系统</span>
            </div>
            <div class="username">
                当前用户：<i
                    class="iconfont iconmorentouxiang"
                    style="font-size: 40px"
                    @click="mycenter"
                ></i>
                <span @click="mycenter">{{ userInfo.username }}</span>
            </div>
            <el-button size="mini" type="info" @click="longout">退出</el-button>
            <!-- 个人中心对话框 -->
            <el-dialog
                title="个人中心"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="700px"
                top="-300px"
                center
                @close="dialogClose"
            >
                <!-- 个人中心 -->
                <el-form
                    :model="myForm"
                    :rules="myFormRules"
                    ref="myFormRef"
                    label-width="126px"
                >
                    <el-form-item label="名称" prop="username">
                        <el-input
                            v-model="myForm.username"
                            disabled=""
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="gaipassword">
                        <el-input
                            v-model="myForm.gaipassword"
                            type="password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入新密码" prop="gaipassword2">
                        <el-input
                            v-model="myForm.gaipassword2"
                            type="password"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <!-- 对话框底部确认区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateUser"
                        >修改</el-button
                    >
                </span>
            </el-dialog>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="iscollapse ? '64px' : '200px'">
                <!-- 切换展开收起按钮 -->
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 菜单 -->
                <el-menu
                    :default-active="this.$route.path"
                    class="el-menu-vertical-demo"
                    background-color="#313743"
                    text-color="#fff"
                    active-text-color="#3299FF"
                    :unique-opened="true"
                    :collapse="iscollapse"
                    :collapse-transition="false"
                    router
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="iconfont iconyonghuguanli1"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="/users">
                            <template slot="title">
                                <i class="iconfont iconlist"></i>
                                <span>用户列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/usersapply">
                            <template slot="title">
                                <i class="iconfont iconlist"></i>
                                <span>注册审核</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="iconfont iconshouyelunbotu"></i>
                            <span>相册管理</span>
                        </template>
                        <!-- <el-menu-item index="/addlink">
                            <template slot="title">
                                <i class="iconfont iconxitongshezhi"></i>
                                <span>添加链接</span>
                            </template>
                        </el-menu-item> -->
                        <el-menu-item index="/girls">
                            <template slot="title">
                                <i class="iconfont iconai-img-list"></i>
                                <span>相册列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/rzapplay">
                            <template slot="title">
                                <i class="iconfont iconlist"></i>
                                <span>审核列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/girltips">
                            <template slot="title">
                                <i class="iconfont iconyaoqingma"></i>
                                <span>标签列表</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/girlcate">
                            <template slot="title">
                                <i class="iconfont iconyaoqingma"></i>
                                <span>分类列表</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="iconfont iconxitongshezhi"></i>
                            <span>城市管理</span>
                        </template>
                        <!-- <el-menu-item index="/addlink">
                            <template slot="title">
                                <i class="iconfont iconxitongshezhi"></i>
                                <span>添加链接</span>
                            </template>
                        </el-menu-item> -->
                        <el-menu-item index="/cities">
                            <template slot="title">
                                <i class="iconfont iconxitongshezhi"></i>
                                <span>城市列表</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="iconfont iconxitongshezhi"></i>
                            <span>广播管理</span>
                        </template>
                        <!-- <el-menu-item index="/addlink">
                            <template slot="title">
                                <i class="iconfont iconxitongshezhi"></i>
                                <span>添加链接</span>
                            </template>
                        </el-menu-item> -->
                        <el-menu-item index="/bclist">
                            <template slot="title">
                                <i class="iconfont iconxitongshezhi"></i>
                                <span>广播列表</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="10">
                        <template slot="title">
                            <i class="iconfont iconxitongshezhi"></i>
                            <span>网站设置</span>
                        </template>
                        <el-menu-item index="/setgg">
                            <template slot="title">
                                <i class="iconfont iconxitongshezhi"></i>
                                <span>基本配置</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主体区域 -->
            <el-main>
                <router-view :userInfo="userInfo"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            // togglecollapse默认不折叠
            iscollapse: false,
            userInfo: {},
            // 个人对话框关闭熟悉
            dialogVisible: false,
            isemail: '',
            ismobile: '',
            myFormRules: {
                gaipassword: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur'
                    },
                    {
                        min: 8,
                        max: 20,
                        message: '长度在 8 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                gaipassword2: [
                    {
                        required: true,
                        message: '请再次输入新密码',
                        trigger: 'blur'
                    },
                    {
                        min: 8,
                        max: 20,
                        message: '请再次输入新密码',
                        trigger: 'blur'
                    }
                ]
            },
            // myform
            myForm: {
                username: '',
                id: '',
                gaipassword: '',
                gaipassword2: ''
            }
        }
    },
    created() {
        this.userInfo.username = JSON.parse(
            window.sessionStorage.getItem('userInfo')
        )
    },
    methods: {
        // 退出
        // eslint-disable-next-line space-before-function-paren
        longout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        // 点击按钮切换展开收起
        toggleCollapse() {
            this.iscollapse = !this.iscollapse
        },
        // 个人中心
        mycenter() {
            this.dialogVisible = true
            this.myForm = this.userInfo
        },
        dialogClose() {
            this.myForm = {}
        },
        // 修改用户信息函数
        updateUser() {
            if (this.myForm.gaipassword !== this.myForm.gaipassword2) {
                this.$message.error({
                    message: '两次输入的密码不一致',
                    offset: 201,
                    center: true
                })
                return
            }
            this.$refs.myFormRef.validate(async (valid) => {
                if (valid) {
                    let { data: res } = await this.$http.put(
                        '/cms/upadminkw',
                        this.myForm
                    )
                    if (res.status === 200) {
                        this.dialogVisible = false // 更新成功关闭对话框
                        this.$message.success({
                            message: '修改信息成功',
                            offset: 201,
                            center: true
                        })
                    } else {
                        this.$message.error({
                            message: '修改信息失败',
                            offset: 201,

                            center: true
                        })
                    }
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.home-container
    i
        color #fff
    height 100%
    .logopic
        box-shadow 0 5px 10px #000
    .toggle-button
        text-align center
        color #eeeeee
        background-color #414339
        height 30px
        line-height 30px
        letter-spacing 0.2em
        cursor pointer

    .el-header
        background-color #363D40
        display flex
        justify-content space-between
        padding 5px 20px
        align-items center
        color #eeeeee
        font-size 25px
        div
            display flex
            align-items center
    .el-aside
        background-color #313743
        .el-menu
            border-right none
        .cmstitle
            margin-left 10px
    .el-main
        background-color #E9EDF1
    .username
        position absolute
        right 120px
        font-size 14px
        cursor pointer
        span
            cursor pointer
        span:hover
            color #fff
    .iconfont
        margin-right 5px
    .el-dialog
        .el-form
            padding 0 68px
            .el-input
                margin-left -100px
                width 366px
        .dialog-footer
            position absolute
            bottom 20px
            right 90px
</style>
