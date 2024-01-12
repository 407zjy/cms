<template>
    <div id="setinfo">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>直播地址</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-form
                :model="settingForm"
                :rules="settingFormRules"
                ref="settingFormRef"
                label-width="150px"
            >
                <el-form-item label="选择设备：" prop="devicename">
                    <el-select
                        v-model="settingForm.devicename"
                        placeholder="请选择摄像头"
                        style="width: 250px"
                        @change="cameraChange"
                    >
                        <el-option
                            v-for="item in camerasOptions"
                            :key="item.value"
                            :label="item.devicename"
                            :value="item.devicename"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备类型：" prop="devicetype">
                    <el-input
                        v-model="settingForm.devicetype"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="归属节点" prop="nodeid">
                    <el-input v-model="settingForm.nodeid" disabled></el-input>
                </el-form-item>
                <!-- <el-form-item label="直播通道:" prop="liveurl">
                    <el-input
                        v-model="settingForm.liveurl"
                        placeholder="请填写萤石云上的直播通道，如：1"
                    ></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="AccessToken:" prop="accesstoken">
                    <el-input
                        v-model="settingForm.accesstoken"
                        placeholder="在萤石云账户中心-我的应用中获取"
                    ></el-input>
                </el-form-item> -->
                <el-button type="primary" @click="editBtn" class="editBtn"
                    >自动添加直播地址</el-button
                >
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 网站配置对象
            settingForm: {
                devicename: '',
                nodeid: '',
                deviceid: '',
                devicetype: ''
                // accesstoken: ''
            },
            // 表单验证规则
            settingFormRules: {
                devicename: [
                    {
                        required: true,
                        message: '请选择摄像头',
                        trigger: 'blur'
                    }
                ]
                // token: [
                //     {
                //         required: true,
                //         message: '在萤石云账户中心-我的应用中获取',
                //         trigger: 'blur'
                //     }
                // ]
            },
            camerasOptions: []
        }
    },
    //  生命周期函数
    created() {
        this.getCameras()
    },
    // 方法节点
    methods: {
        // 编辑按钮函数
        async editBtn() {
            this.$refs.settingFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error({
                        message: '请填写完再发布',
                        offset: 350,
                        center: true
                    })
                }
                const { data: res } = await this.$http.post(
                    '/cms/upliveurl',
                    this.settingForm
                )
                if (res.code === 200) {
                    this.settingForm = {
                        devicename: '',
                        nodeid: '',
                        deviceid: '',
                        devicetype: '',
                        liveurl: '',
                        accesstoken: ''
                    }
                    return this.$message.success({
                        message: '上传成功',
                        offset: 350,
                        center: true
                    })
                } else if (res.code === 204) {
                    return this.$message.error({
                        message: '上传发送了错误',
                        offset: 350,
                        center: true
                    })
                }
            })
        },
        // 获取所有节点
        // async getNodes() {
        //     const { data: res } = await this.$http.get('/cms/getnodes')
        //     if (res.code === 200) {
        //         if (res.data.length > 0) {
        //             res.data.forEach((elem) => {
        //                 this.nodeOptions.push({
        //                     label: elem.nodename,
        //                     value: elem.nodeid
        //                 })
        //             })
        //         }
        //     }
        // }
        // 获取直播设备
        async getCameras() {
            const { data: res } = await this.$http.get('/cms/getcamera')
            if (res.code === 200) {
                this.camerasOptions = res.data
            }
        },
        // 选择改变
        cameraChange(e) {
            this.camerasOptions.find((elem) => {
                if (elem.devicename === e) {
                    this.settingForm.nodeid = elem.nodepid
                    this.settingForm.devicetype = elem.devicetype
                    this.settingForm.deviceid = elem.deviceid
                }
            })
        }
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
