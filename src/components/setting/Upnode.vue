<template>
    <div id="setinfo">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>更新节点</el-breadcrumb-item> </el-breadcrumb
        >``
        <!-- 卡片区域 -->
        <el-card>
            <el-form
                :model="settingForm"
                :rules="settingFormRules"
                ref="settingFormRef"
                label-width="150px"
            >
                <el-form-item label="节点名称：" prop="nodename">
                    <el-select
                        v-model="settingForm.nodeid"
                        placeholder="请选择要更新的节点"
                        @change="nodeChange"
                    >
                        <el-option
                            v-for="item in nodeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="节点新名称：" prop="newname">
                    <el-input
                        v-model="settingForm.newname"
                        placeholder="请填写更新后的节点名称，如不填则原名称不变"
                    ></el-input>
                </el-form-item>
                <el-form-item label="节点ID：" prop="nodeid">
                    <el-input v-model="settingForm.nodeid" disabled></el-input>
                </el-form-item>
                <el-form-item label="父节点名称：" prop="nodepid">
                    <el-select
                        v-model="settingForm.nodepid"
                        placeholder="请选择，不选则为不变"
                        @change="parentChange"
                        ref="parentNode"
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
                </el-form-item>
                <el-form-item label="父节点ID：" prop="nodepid">
                    <el-input v-model="settingForm.nodepid" disabled></el-input>
                </el-form-item>
                <el-form-item label="节点经度：" prop="node_lng">
                    <el-input
                        v-model="settingForm.node_lng"
                        placeholder="请填写节点所在经度"
                    ></el-input>
                </el-form-item>
                <el-form-item label="节点纬度：" prop="node_lat">
                    <el-input
                        v-model="settingForm.node_lat"
                        placeholder="请填写节点所在纬度"
                    ></el-input>
                </el-form-item>
                <el-button type="primary" @click="editBtn" class="editBtn"
                    >更新节点</el-button
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
                nodename: '',
                nodeid: '',
                nodepname: '',
                nodepid: '',
                node_lng: '',
                node_lat: '',
                newname: ''
            },
            // 表单验证规则
            settingFormRules: {
                nodename: [
                    {
                        required: true,
                        message: '请填写节点名称',
                        trigger: 'blur'
                    }
                ]
            },
            nodeOptions: [],
            pidOptions: []
        }
    },
    //  生命周期函数
    created() {
        this.getParentNode()
        this.getNodes()
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
                let { data: res } = await this.$http.post(
                    'cms/upnode',
                    this.settingForm
                )
                if (res.code === 200) {
                    this.nodeOptions = []
                    this.getNodes()
                    this.settingForm = {
                        nodename: '',
                        nodeid: '',
                        nodepname: '',
                        nodepid: '',
                        node_lng: '',
                        node_lat: '',
                        newname: ''
                    }
                    return this.$message.success({
                        message: '更新配置成功',
                        offset: 350
                    })
                } else if (res.code === 204) {
                    return this.$message.error({
                        message: '更新节点发送了错误',
                        offset: 350,
                        center: true
                    })
                }
            })
        },
        // 获取父级节点
        async getParentNode() {
            const { data: res } = await this.$http.get('/cms/getparentnode')
            if (res.code === 200) {
                // console.log(res.data)
                if (res.data.length > 0) {
                    res.data.forEach((elem) => {
                        this.pidOptions.push({
                            label: elem.nodename,
                            value: elem.nodeid
                        })
                    })
                }
            }
        },
        // 获取所有节点
        async getNodes() {
            const { data: res } = await this.$http.get('/cms/getnodes')
            if (res.code === 200) {
                // console.log(res.data)
                if (res.data.length > 0) {
                    res.data.forEach((elem) => {
                        this.nodeOptions.push({
                            label: elem.nodename,
                            value: elem.nodeid,
                            nodepid: elem.nodepid,
                            nodepname: elem.nodepname,
                            node_lng: elem.node_lng,
                            node_lat: elem.node_lat
                        })
                    })
                }
            }
        },
        // 节点改变
        async nodeChange(e) {
            // 节点改变 清空父级节点
            this.settingForm.nodepid = ''
            this.settingForm.nodepname = ''
            // 将label放入form
            this.nodeOptions.find((elem) => {
                if (elem.value === e) {
                    this.settingForm.nodename = elem.label
                    // 同时把父级id name放入form
                    this.settingForm.nodepid = elem.nodepid
                    this.settingForm.nodepname = elem.nodepname
                    this.settingForm.node_lng = elem.node_lng
                    this.settingForm.node_lat = elem.node_lat
                }
            })
            // console.log(this.settingForm)
            // 把本节点从父节点中删除
            this.pidOptions = [] //  先清空数组
            await this.getParentNode() // 再重新获取
            this.pidOptions.forEach((elem, index) => {
                if (elem.value === e) {
                    this.pidOptions.splice(index, 1)
                }
            })
        },
        // 父节点改变
        parentChange(e) {
            this.pidOptions.find((elem) => {
                if (elem.value === e) {
                    this.settingForm.nodepname = elem.label
                }
                // e是空 即清空
                if (!e) {
                    this.settingForm.nodepname = ''
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
