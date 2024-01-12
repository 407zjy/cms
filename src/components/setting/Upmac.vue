<template>
    <div id="setinfo">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>更新设备</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-form
                :model="settingForm"
                :rules="settingFormRules"
                ref="settingFormRef"
                label-width="150px"
            >
                <el-form-item label="设备名称：" prop="devicename">
                    <el-select
                        v-model="settingForm.deviceid"
                        placeholder="请选择要更新的设备"
                        style="width: 250px"
                        @change="deviceChange"
                    >
                        <el-option
                            v-for="item in deviceList"
                            :key="item.value"
                            :label="item.devicename"
                            :value="item.deviceid"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备新名称：" prop="newname">
                    <el-input
                        v-model="settingForm.newname"
                        placeholder="请填写设备新名称，不填即为不修改名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="设备ID：" prop="deviceid">
                    <el-input
                        v-model="settingForm.deviceid"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="归属节点名称：" prop="nodeid">
                    <el-select
                        v-model="settingForm.nodeid"
                        placeholder="请选择节点"
                        style="width: 250px"
                    >
                        <el-option
                            v-for="item in nodeOptions"
                            :key="item.value"
                            :label="item.nodename"
                            :value="item.nodeid"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="归属节点ID：" prop="nodeid">
                    <el-input v-model="settingForm.nodeid" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备类型：" prop="devicetype">
                    <el-select
                        v-model="settingForm.devicetype"
                        placeholder="请选择设备类型,不选则不修改本项"
                        style="width: 250px"
                    >
                        <el-option
                            v-for="item in deviceOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="节点经度：" prop="mac_lng">
                    <el-input
                        v-model="settingForm.mac_lng"
                        placeholder="请填写设备经度"
                    ></el-input>
                </el-form-item>
                <el-form-item label="节点纬度：" prop="mac_lat">
                    <el-input
                        v-model="settingForm.mac_lat"
                        placeholder="请填写设备纬度"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="remarks">
                    <el-input
                        v-model="settingForm.remarks"
                        placeholder="选填"
                    ></el-input>
                </el-form-item>
                <el-button type="primary" @click="editBtn" class="editBtn"
                    >更新设备</el-button
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
                deviceid: '',
                nodeid: '',
                devicetype: '',
                mac_lng: '',
                mac_lat: '',
                remarks: '',
                newname: ''
            },
            // 表单验证规则
            settingFormRules: {
                devicename: [
                    {
                        required: true,
                        message: '请填写设备名称',
                        trigger: 'blur'
                    }
                ],
                mac_lng: [
                    {
                        required: true,
                        message: '请填写节点所在经度',
                        trigger: 'blur'
                    }
                ],
                mac_lat: [
                    {
                        required: true,
                        message: '请填写节点所在纬度',
                        trigger: 'blur'
                    }
                ]
            },
            deviceOptions: [
                {
                    label: 'camera （摄像头）',
                    value: 'camera'
                },
                {
                    label: '360Camera （半球鱼眼摄像头）',
                    value: '360Camera'
                },
                {
                    label: '720Camera （全景摄像头）',
                    value: '720Camera'
                },
                {
                    label: 'envDevice （环境监测设备）',
                    value: 'envDevice'
                },
                {
                    label: 'rfidDevice （Rfid 接收设备）',
                    value: 'rfidDevice'
                },
                {
                    label: 'other （其他设备）',
                    value: 'other'
                }
            ],
            deviceList: [],
            nodeOptions: []
        }
    },
    //  生命周期函数
    created() {
        // this.getSetting()
        this.getDevices()
        this.getNodes()
    },
    // 方法节点
    methods: {
        // 编辑按钮函数
        async editBtn() {
            console.log(this.settingForm)
            this.$refs.settingFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error({
                        message: '请填写完再发布',
                        offset: 350,
                        center: true
                    })
                }
                const { data: res } = await this.$http.post(
                    '/cms/updevice',
                    this.settingForm
                )
                if (res.code === 200) {
                    this.settingForm = {
                        devicename: '',
                        deviceid: '',
                        nodeid: '',
                        devicetype: '',
                        mac_lng: '',
                        mac_lat: '',
                        remarks: '',
                        newname: ''
                    }
                    this.getDevices()
                    return this.$message.success({
                        message: '更新成功',
                        offset: 350
                    })
                } else if (res.code === 204) {
                    return this.$message.error({
                        message: '更新设备发送了错误',
                        offset: 350,
                        center: true
                    })
                }
            })
        },
        // 获取设备列表
        async getDevices() {
            const { data: res } = await this.$http.get('/cms/getdevices')
            if (res.code === 200) {
                this.deviceList = res.data
            }
        },
        // 获取所有节点
        async getNodes() {
            const { data: res } = await this.$http.get('/cms/getnodes')
            if (res.code === 200) {
                this.nodeOptions = res.data
            }
        },
        // 设备选择改变
        deviceChange(e) {
            this.deviceList.find((elem) => {
                if (elem.deviceid === e) {
                    this.settingForm.devicename = elem.devicename
                    this.settingForm.nodeid = elem.nodepid
                    this.settingForm.devicetype = elem.devicetype
                    this.settingForm.mac_lng = elem.mac_lng
                    this.settingForm.mac_lat = elem.mac_lat
                    this.settingForm.remarks = elem.remarks
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
