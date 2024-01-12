<template>
    <div id="setinfo">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>基本配置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-form
                :model="settingForm"
                :rules="settingFormRules"
                ref="settingFormRef"
                label-width="150px"
            >
                <!-- <el-form-item label="链接名称：" prop="linkname">
                    <el-input
                        v-model="settingForm.linkname"
                        placeholder="请填写友情链接名称"
                    ></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="父节点名称：" prop="nodepname">
                    <el-select
                        v-model="selecValue"
                        placeholder="请选择要更新的节点"
                        @change="selectChange"
                        clearable
                    >
                        <el-option
                            v-for="item in pidOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="广告地址：" prop="linkurl">
                    <el-input
                        v-model="settingForm.linkurl"
                        placeholder="请填写广告引入地址"
                    ></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="网站标题：" prop="title">
                    <el-input
                        v-model="settingForm.title"
                        placeholder="请填写网站标题"
                    ></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="网站关键词：" prop="keywords">
                    <el-input
                        v-model="settingForm.keywords"
                        placeholder="请填写网站关键词"
                    ></el-input>
                </el-form-item> -->
                <el-form-item label="相册密码：" prop="album_code">
                    <el-input
                        type="number"
                        v-model="settingForm.album_code"
                        placeholder="通用相册密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="客服：" prop="qq">
                    <el-input
                        type="number"
                        v-model="settingForm.qq"
                        placeholder="请填写客服ID，如：6"
                    ></el-input>
                </el-form-item>
                <el-form-item label="域名：" prop="domain">
                    <el-input
                        type="text"
                        v-model="settingForm.domain"
                        placeholder="请填写分享链接的域名：如： jy123456.shop"
                    ></el-input>
                </el-form-item>
                <el-form-item label="飞机群：" prop="tgurl">
                    <el-input
                        type="text"
                        v-model="settingForm.tgurl"
                        placeholder="请填写飞机群连接：如： https://t.me/+yC6OqGf9vRthN2I1"
                    ></el-input>
                </el-form-item>
                <el-form-item label="APP下载：" prop="appdown">
                    <el-input
                        type="text"
                        v-model="settingForm.appdown"
                        placeholder="请填写APP下载地址"
                    ></el-input>
                </el-form-item>
                <!-- <el-form-item label="群号：" prop="email">
                    <el-input
                        type="number"
                        v-model="settingForm.email"
                        placeholder="请填写客服ID，如：6"
                    ></el-input>
                </el-form-item> -->
                <el-form-item label="通知：" prop="notice">
                    <el-input
                        style="width: 600px"
                        type="textarea"
                        :rows="5"
                        v-model="settingForm.notice"
                        placeholder="需要通知的内容"
                    ></el-input>
                </el-form-item>
                <el-form-item label="注册开关：" prop="notice">
                    <el-switch v-model="settingForm.isreg"> </el-switch>
                </el-form-item>

                <el-form-item prop="notice" v-if="!settingForm.isreg">
                    <el-input
                        style="width: 600px"
                        type="textarea"
                        :rows="5"
                        v-model="settingForm.email"
                        placeholder="关闭注册后的提示内容"
                    ></el-input>
                </el-form-item>

                <br />
                <el-button type="primary" @click="addBtn" class="editBtn"
                    >保存</el-button
                >
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selecValue: '',
            // 网站配置对象
            settingForm: {
                album_code: '',
                notice: '',
                qq: '',
                email: '',
                domain: '',
                isreg: false,
                appdown: '',
                tgurl: ''
            },
            // 表单验证规则
            settingFormRules: {
                // linkname: [
                //     {
                //         required: true,
                //         message: '请填写友情链接名称',
                //         trigger: 'blur'
                //     }
                // ],

                album_code: [
                    {
                        required: true,
                        message: '通用密码不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            pidOptions: []
        }
    },
    //  生命周期函数
    created() {
        // 获取父级节点
        this.getLink()
    },
    // 方法节点
    methods: {
        // 添加
        addBtn() {
            this.$refs.settingFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error({
                        message: '请填写完再发布',
                        offset: 350,
                        center: true
                    })
                }
                const { data: res } = await this.$http.put(
                    'picture/upsett',
                    this.settingForm
                )
                if (res.code === 200) {
                    // 清空列表
                    return this.$message.success({
                        message: '修改成功',
                        offset: 350
                    })
                } else if (res.code === 204) {
                    return this.$message.error({
                        message: '添加发生了错误',
                        offset: 350,
                        center: true
                    })
                }
            })
        },
        // 获取广告链接地址
        async getLink() {
            const { data: res } = await this.$http.get('picture/getsett')
            if (res.code === 200) {
                this.settingForm = res.data
            }
        }
        // select 选项改变
        // selectChange(e) {
        //     // 放入pid
        //     this.settingForm.nodepid = e
        //     this.pidOptions.find((elem) => {
        //         if (elem.value === e) {
        //             // 放入pname
        //             // console.log(elem)
        //             this.settingForm.nodepname = elem.label
        //         }
        //         // e是空 即清空
        //         if (!e) {
        //             this.settingForm.nodepname = ''
        //         }
        //     })
        // }
    }
}
</script>

<style lang="stylus" scoped>
#setinfo
    .el-card
        width 1050px
    .el-form
        margin-left 100px
    .el-input
        width 600px
    .texta
        width 600px
    .logo
        width 250px
        height: 250px
    .editBtn
        margin-left 30px
        width 720px
        margin-top 30px
</style>
