<template>
    <div id="setinfo">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>添加牲畜</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-form
                :model="settingForm"
                :rules="settingFormRules"
                ref="settingFormRef"
                label-width="150px"
            >
                <el-form-item label="牲畜编号：" prop="animalid">
                    <el-input
                        v-model="settingForm.animalid"
                        placeholder="请填写牲畜的编号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="牲畜品种：" prop="breed">
                    <el-input
                        v-model="settingForm.breed"
                        placeholder="请填写牲畜的品种"
                    ></el-input>
                </el-form-item>
                <el-form-item label="出生日期：" prop="birthday">
                    <el-input
                        v-model="settingForm.birthday"
                        placeholder="请填写牲畜的出生日期，格式如：2023-03-03"
                    ></el-input>
                </el-form-item>
                <el-form-item label="定位支持：" prop="hasgps">
                    <el-switch
                        v-model="settingForm.hasgps"
                        active-color="#13ce66"
                        inactive-color="#ccc"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="备注：" prop="remarks">
                    <el-input
                        v-model="settingForm.remarks"
                        placeholder="选填"
                    ></el-input>
                </el-form-item>
                <el-form-item label="牲畜照片：" prop="picurl">
                    <!-- <img
                        :src="host + settingForm.photourl"
                        alt=""
                        class="logo"
                    />
                    <el-upload
                        ref="upload"
                        :on-remove="handleRemove"
                        list-type="picture"
                        :action="uploadUrl"
                        :on-success="handleSuccess"
                        :auto-upload="false"
                        :limit="number"
                        accept="image/jpeg,image/gif,image/png"
                        :on-change="onUploadChange"
                    >
                        <el-button size="small" type="primary"
                            >更换二维码</el-button
                        >
                    </el-upload> -->
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture-card"
                        :auto-upload="false"
                        :limit="number"
                        :on-success="handleSuccess"
                        :on-change="onUploadChange"
                        ref="upload"
                    >
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{ file }">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url"
                                alt=""
                            />
                            <span class="el-upload-list__item-actions">
                                <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                                >
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <!-- <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleDownload(file)"
                                >
                                    <i class="el-icon-download"></i>
                                </span> -->
                                <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                                >
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                </el-form-item>
                <el-button type="primary" @click="editBtn" class="editBtn"
                    >添加牲畜</el-button
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
                animalid: '',
                breed: '',
                birthday: '',
                hasgps: false,
                remarks: '',
                picurl: ''
            },
            // 表单验证规则
            settingFormRules: {
                animalid: [
                    {
                        required: true,
                        message: '请填写牲畜的编号',
                        trigger: 'blur'
                    }
                ],
                breed: [
                    {
                        required: true,
                        message: '请填写牲畜的品种',
                        trigger: 'blur'
                    }
                ],
                birthday: [
                    {
                        required: true,
                        message: '请填写牲畜的出生日期，格式如：2023-03-03',
                        trigger: 'blur'
                    }
                ],
                picurl: [
                    {
                        required: true,
                        message: '请上传牲畜照片',
                        trigger: 'blur'
                    }
                ]
            },
            // 图片上传api接口地址
            uploadUrl: this.$http.defaults.baseURL + 'picture/upload',
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            number: 1
        }
    },
    //  生命周期函数
    created() {
        // this.getSetting()
    },
    // 方法节点
    methods: {
        // 对上传文件类型和大小进行限制
        onUploadChange(file) {
            const isIMAGE =
                file.raw.type === 'image/jpeg' ||
                file.raw.type === 'image/png' ||
                file.raw.type === 'image/gif'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isIMAGE) {
                this.$message.error({
                    message: '只能上传图片格式文件',
                    offset: 350,
                    center: true
                })
                // 清空上传文件列表
                this.$refs.upload.clearFiles()
                return false
            }
            if (!isLt2M) {
                this.$message.error({
                    message: '上传文件大小不能超过 1MB!',
                    offset: 350,
                    center: true
                })
                // 清空上传文件列表
                this.$refs.upload.clearFiles()
                return false
            }
            // 因为是手动上传模式 :auto-upload="false"  所以这里让函数自动调用上传   达到自动上传的效果
            this.$refs.upload.submit()
            // var reader = new FileReader()
            // reader.readAsDataURL(file.raw)
            // reader.onload = function(e) {
            //     console.log(this.result)// 图片的base64数据
            // }
        },
        // 编辑按钮函数
        editBtn() {
            this.$refs.settingFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error({
                        message: '请填写完再发布',
                        offset: 350,
                        center: true
                    })
                }
                const { data: res } = await this.$http.post(
                    '/cms/addanimal',
                    this.settingForm
                )
                if (res.code === 200) {
                    this.settingForm = {
                        animalid: '',
                        breed: '',
                        birthday: '',
                        hasgps: false,
                        remarks: '',
                        picurl: ''
                    }
                    // 清空图片
                    this.$refs.upload.uploadFiles = []
                    return this.$message.success({
                        message: '添加成功',
                        offset: 350
                    })
                }
            })
        },
        // 图片上传成功后的钩子函数
        handleSuccess(response) {
            // console.log(response.url)
            this.settingForm.picurl = response.url
        },
        // 上传图片 移除图片
        handleRemove(file) {
            const fileList = this.$refs.upload.uploadFiles
            const index = fileList.indexOf(file)
            fileList.splice(index, 1)
            this.picurl = ''
        },
        // 预览
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
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
