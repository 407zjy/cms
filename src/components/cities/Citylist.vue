/* eslint-disable vue/valid-template-root */ /* eslint-disable
vue/valid-template-root */ /* eslint-disable vue/valid-template-root */
<template>
    <div id="catelist">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>城市管理</el-breadcrumb-item>
            <el-breadcrumb-item>城市列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
            <!-- 添加权限按钮 -->
            <el-button
                type="primary"
                style="float: right; margin-right: 17px; margin-bottom: 20px"
                @click="getCate"
                >添加城市/区域</el-button
            >
            <!-- 分类表格区域 -->
            <tree-table
                border
                :data="catelist"
                :columns="columns"
                :selection-type="false"
                :expand-type="false"
            >
                <!-- 排序列 -->
                <template slot="order" slot-scope="scope">
                    <!-- 如果order的值不是空的话 显示按钮 -->
                    <el-row v-if="scope.row.pid == 0">
                        <el-input
                            ref="orderInput"
                            v-model="scope.row.order"
                            @blur="
                                changeOrder(
                                    scope.row.id,
                                    scope.row.pid,
                                    scope.row.order
                                )
                            "
                        ></el-input>
                    </el-row>
                    <!-- <el-row v-if="scope.row.order == 0">
                        <el-input
                            ref="orderInput"
                            v-model="scope.row.children_order"
                            @blur="children_order(scope.row)"
                        ></el-input>
                    </el-row> -->
                </template>
                <template slot="children_order" slot-scope="scope">
                    <!-- 如果order的值不是空的话 显示按钮 -->
                    <!-- <el-row v-if="scope.row.pid !== 0">
                        <el-input
                            ref="orderInput"
                            v-model="scope.row.order"
                            @blur="children_order(scope.row)"
                        ></el-input>
                    </el-row> -->
                    <el-row v-if="scope.row.order == 0">
                        <el-input
                            ref="orderInput"
                            v-model="scope.row.children_order"
                            @blur="
                                changeOrder(
                                    scope.row.id,
                                    scope.row.pid,
                                    scope.row.children_order
                                )
                            "
                        ></el-input>
                    </el-row>
                </template>

                <!-- 模式 -->
                <template slot="city_model" slot-scope="scope">
                    <el-row v-if="scope.row.order !== 0">
                        图片模式&nbsp;&nbsp;
                        <el-switch
                            v-model="scope.row.city_model"
                            @change="cityModelChange(scope.row)"
                        ></el-switch>
                        &nbsp;&nbsp;视频模式
                    </el-row>
                </template>
                <!-- 操作列 -->
                <template slot="operate" slot-scope="scope">
                    <el-row>
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            @click="cateEdit(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="cateDelete(scope.row)"
                            >删除</el-button
                        >
                    </el-row>
                </template>
                <!-- 分页区域 暂无-->
            </tree-table>
        </el-card>
        <!-- 添加城市/区域 -->
        <el-dialog
            title="添加城市/区域"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
            width="700px"
            center
            @close="dialogClose"
        >
            <!-- 添加分类表单 -->
            <el-form
                ref="cateFormRef"
                :model="cateForm"
                :rules="cateFormRules"
                label-width="100px"
            >
                <!-- 添加分类名称 -->
                <el-form-item label="城市/区域" prop="city">
                    <el-input
                        v-model="cateForm.city"
                        class="cate_name"
                        placeholder="请填写城市名称获取区域名称"
                    ></el-input>
                </el-form-item>
                <!-- 选择分类 级联选择器 -->
                <el-form-item label="父级分类">
                    <div class="block">
                        <!-- 级联选择器 options为数据源  -->
                        <!-- 必须添加props配置项 -->
                        <!-- <el-cascader
                            ref="elcascader"
                            clearable
                            :props="rightProps"
                            v-model="PidArr"
                            :options="cityCate"
                            @change="handleChange"
                            @visible-change="elCascaderOnlick"
                            @expand-change="elCascaderOnlick"
                        ></el-cascader> -->
                        <el-select v-model="cateForm.pid" placeholder="请选择">
                            <el-option
                                v-for="item in cityCate"
                                :key="item.id"
                                :label="item.city"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <!-- <el-form-item
                    label="游戏封面"
                    prop="cate_gamelogo"
                    v-if="fengmian"
                >
                    <el-upload
                        :on-remove="handleRemove"
                        list-type="picture"
                        :action="uploadUrl"
                        :on-success="handleSuccess"
                        :limit="number"
                        ref="upload"
                    >
                        <el-button size="small" type="primary"
                            >点击上传</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且不超过500kb
                        </div>
                    </el-upload>
                </el-form-item> -->
            </el-form>
            <!-- 对话框底部确认区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑对话框 -->
        <el-dialog
            title="修改城市/区域名称"
            :close-on-click-modal="false"
            :visible.sync="editDialogVisible"
            width="700px"
            center
            @close="editDialogClose"
        >
            <!-- 添加分类表单 -->
            <el-form
                ref="editCateFormRef"
                :model="editCateForm"
                :rules="editCateFormRules"
                label-width="100px"
            >
                <!-- 添加分类名称 -->
                <el-form-item label="ID" prop="id">
                    <el-input
                        v-model="editCateForm.id"
                        class="cate_name"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="城市/区域" prop="city">
                    <el-input
                        v-model="editCateForm.city"
                        class="cate_name"
                    ></el-input>
                </el-form-item>
                <!-- <img :src="editCateForm.cate_gamelogo" alt="" class="imglogo" /> -->
                <!-- <el-form-item
                    label="更换封面"
                    prop="cate_gamelogo"
                    v-if="fengmian"
                >
                    <el-upload
                        :on-remove="handleRemove"
                        list-type="picture"
                        :action="uploadUrl"
                        :on-success="handleSuccess"
                        :limit="number"
                        ref="upload"
                    >
                        <el-button size="small" type="primary"
                            >点击上传</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且不超过500kb
                        </div>
                    </el-upload>
                </el-form-item> -->
            </el-form>
            <!-- 对话框底部确认区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCateName"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 限制上传1张图片
            number: 1,
            // 图片上传地址
            uploadUrl: 'http://106.14.211.218:3000/api/admin/v1/goods/upload/',
            // 游戏封面上传 显示隐藏变量
            fengmian: true,
            // 表格引用的数据源
            catelist: [],
            // 为table定义列
            columns: [
                {
                    label: '城市',
                    prop: 'city'
                    // width: '300px'
                },
                {
                    label: '城市排序',
                    type: 'template', // 当前列使用的模板
                    template: 'order' // 当前列使用模板的名称
                },
                {
                    label: '区域排序',
                    type: 'template', // 当前列使用的模板
                    template: 'children_order' // 当前列使用模板的名称
                },
                {
                    label: '操作',
                    type: 'template', // 当前列使用的模板
                    template: 'operate' // 当前列使用模板的名称
                },
                {
                    label: '模式',
                    type: 'template', // 当前列使用的模板
                    template: 'city_model' // 当前列使用模板的名称
                }
            ],
            // 控制添加按钮对话框显示隐藏的属性
            dialogVisible: false,
            // 对话框级联选择器引用的数据源
            cityCate: [],
            // 级联选择器的props配置对象
            rightProps: {
                checkStrictly: true,
                expandTrigger: 'hover',
                value: 'id',
                label: 'cate_name',
                children: 'children'
            },
            // 级联选择器绑定的pid数据
            PidArr: [],
            value: '',
            // 添加对话框表单需要引用的对象
            cateForm: {
                city: '',
                pid: '',
                order: ''
            },
            // 表单添加内容的验证规则对象
            cateFormRules: {
                city: [
                    {
                        required: true,
                        message: '请填写城市名称获取区域名称',
                        trigger: 'blur'
                    }
                ]
            },
            // 控制编辑按钮对话框显示隐藏的属性
            editDialogVisible: false,
            // 储存编辑按钮获取的分类名称
            editCateForm: {
                city: '',
                id: ''
            },
            // 编辑表单的验证规则
            editCateFormRules: {
                city: [
                    {
                        required: true,
                        message: '城市/区域名称不能为空',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    // 生命周期函数节点
    created() {
        this.getCateList()
    },

    // 方法节点
    methods: {
        // 获取游戏名称、区服列表
        async getCateList() {
            let { data: res } = await this.$http.get('city/getcities', {
                params: {
                    type: 2,
                    pagesize: 100,
                    pagenum: 1
                }
            })
            if (res.code === 200) {
                this.catelist = res.data
                // console.log(this.catelist)
                // this.catelist = [
                //     {
                //         city: '上海',
                //         children: [
                //             {
                //                 city: '序号自增1cate_浦东新区'
                //             },
                //             {
                //                 city: '滨海区'
                //             }
                //         ]
                //     }
                // ]
            }
        },
        // 改变游戏排序
        // async changeOrder(item, sta) {
        //     // 判断是上移
        //     if (sta === 1) {
        //         // 序号自增1
        //         item.order++
        //         // 循环判断自增后是否跟现有序号有重复的
        //         for (let i = 0; i < this.catelist.length; i++) {
        //             // 如果有重复的 原来的那个序号自减1
        //             if (item.order === this.catelist[i].order) {
        //                 this.catelist[i].order -= 1
        //                 // 把自减后的序号存到数据库
        //                 this.$http.put('city/order', {
        //                     id: this.catelist[i].id,
        //                     order: this.catelist[i].order
        //                 })
        //             }
        //         }
        //         // 如果自增超过数组长度 让序号等于长度数字
        //         if (item.order > this.catelist.length) {
        //             item.order = this.catelist.length
        //         }
        //     } else {
        //         item.order--
        //         for (let i = 0; i < this.catelist.length; i++) {
        //             // 如果有重复的 原来的那个序号自减1
        //             if (item.order === this.catelist[i].order) {
        //                 this.catelist[i].order += 1
        //                 // 把自减后的序号存到数据库
        //                 this.$http.put('city/order', {
        //                     id: this.catelist[i].id,
        //                     order: this.catelist[i].order
        //                 })
        //             }
        //         }
        //         if (item.order < 1) {
        //             item.order = 1
        //         }
        //     }
        //     let { data: res } = await this.$http.put('city/order', {
        //         id: item.id,
        //         order: item.order
        //     })
        //     if (res.code === 200) {
        //         this.getCateList()
        //     }
        // },
        // 获取添加按钮对话框所需分类数据
        async getCate() {
            let { data: res } = await this.$http.get('city/getcities', {
                params: {
                    pagenum: 1,
                    pagesize: 100,
                    type: 1
                }
            })
            if (res.code === 200) {
                this.cityCate = res.data
                this.dialogVisible = true
            }
        },
        selectorChange() {},
        // 级联选择器选项改变的函数
        handleChange() {
            this.cateForm.cate_gamelogo = ''
            // 级联选择器选择项发生改变， 就把改变后的pid存到form对象中
            if (this.PidArr.length === 0) {
                this.cateForm.pid = 0
                this.fengmian = true
            } else {
                this.cateForm.pid = this.PidArr[this.PidArr.length - 1]
                this.fengmian = false
            }
        },
        // 解决级联选择器任意级选择的bug
        elCascaderOnlick() {
            let that = this
            setTimeout(function () {
                document
                    .querySelectorAll('.el-cascader-node__label')
                    .forEach((el) => {
                        el.onclick = function () {
                            this.previousElementSibling.click()
                            that.$refs.elcascader.dropDownVisible = false
                        }
                    })
                document
                    .querySelectorAll('.el-cascader-panel .el-radio')
                    .forEach((el) => {
                        el.onclick = function () {
                            that.$refs.elcascader.dropDownVisible = false
                        }
                    })
            }, 100)
        },
        // 添加分类
        addCate() {
            // 先根据pidarr判断是否是顶级分类 如果是顶级分类 添加order属性
            if (this.cateForm.pid > 0) {
                this.cateForm.order = 0
            } else {
                this.cateForm.order = 1
            }
            // 请求数据添加
            this.$refs.cateFormRef.validate(async (valid) => {
                if (valid) {
                    let { data: res } = await this.$http.post(
                        'city/addcity',
                        this.cateForm
                    )
                    if (res.status === 200) {
                    }
                    this.dialogVisible = false
                    this.getCateList()
                }
            })
        },
        // 关闭添加分类对话框 重置表单函数
        dialogClose() {
            this.$refs.cateFormRef.resetFields()
            this.PidArr = []
            this.cateForm = {
                city: '',
                pid: '',
                order: ''
            }
            // 清空图片列表
            // this.clearList()
        },
        // 编辑按钮触发函数
        async cateEdit(row) {
            this.editDialogVisible = true
            this.editCateForm.id = row.id
            this.editCateForm.city = row.city
        },
        // 对话框确认按钮函数
        editCateName() {
            this.$refs.editCateFormRef.validate(async (valid) => {
                if (valid) {
                    let { data: res } = await this.$http.put(
                        'city/editcity',
                        this.editCateForm
                    )
                    if (res.code === 200) {
                        // 关闭对话框
                        this.editDialogVisible = false
                        // 刷新页面
                        this.getCateList()
                    }
                }
            })
        },
        // 编辑对话框关闭函数
        editDialogClose() {
            this.$refs.editCateFormRef.resetFields()
            this.editCateForm = {
                city: '',
                id: ''
            }
            // 清空图片列表
            // this.clearList()
        },
        // 删除按钮 删除函数
        async cateDelete(item) {
            let result = await this.$confirm(
                '此操作将永久删除该数据, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }
            ).catch((err) => err)
            if (result === 'confirm') {
                let { data: res } = await this.$http.delete('city/delcity', {
                    params: { id: item.id, pid: item.pid }
                })
                if (res.code === 200) {
                    this.getCateList() // 删除成功后请求获取列表函数 重新刷新列表
                }
            }
        },
        // 上传图片 移除图片函数
        handleRemove(file) {
            this.cateForm.cate_gamelogo = ''
        },
        // 图片上传成功后的钩子函数
        handleSuccess(response) {
            this.cateForm.cate_gamelogo = response.data.path
            this.editCateForm.cate_gamelogo = response.data.path
        },
        // 清空上传列表
        clearList() {
            this.$refs.upload.clearFiles()
        },
        // 修改城市模式
        async cityModelChange(e) {
            await this.$http.put('city/putmodel', {
                id: e.id,
                city_model: e.city_model
            })
        },
        // 修改区域排序
        async changeOrder(id, pid, order) {
            const { data: res } = await this.$http.put('city/putcitychild', {
                id: id,
                pid: pid,
                order: order
            })
            if (res.code === 200) {
                this.getCateList()
            }
        }
    }
}
</script>

<style lang="stylus">
#catelist
    i {
        font-size 12px
        margin-right 5px
    }
    .el-dialog
        .el-form
            padding-left 71px
            .cate_name
                width 400px
        .dialog-footer
            position absolute
            bottom 20px
            right 124px
.el-dialog__title
    position relative
    top -20px
    left -20px
    display block !important
    height 40px !important
    line-height 40px !important
    width 700px !important
    background rgba(217,217,217,0.5)
.el-icon-close:before
    position relative
    top -7px
.imglogo
    width 240px
    height 180px
</style>
