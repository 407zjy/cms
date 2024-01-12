<template>
    <div id="welcome">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
            <div class="board">
                <div class="board_left">
                    <div class="board_line">
                        <i class="iconfont iconxitongshezhi"></i>
                        网站PID：
                        <span class="span_red">88664</span>
                    </div>
                    <div class="board_line">
                        <i class="iconfont iconxitongshezhi"></i>
                        网站名称：
                        <span class="span_red_b">测试分站测试</span>
                    </div>
                    <div class="board_line">
                        <i class="iconfont iconxitongshezhi"></i>
                        网站类型：
                        <span class="span_lv">分站</span>
                        <div class="fenzhan_left">升级至主站</div>
                    </div>
                    <div class="board_line">
                        <i class="iconfont iconxitongshezhi"></i>
                        后台余额：
                        <span class="span_red_b">0 </span>元
                        <div class="qian_right">
                            <div class="qian_right_item">充值</div>
                            <div class="qian_right_item">提现</div>
                            <div class="qian_right_item">通知</div>
                            <div class="qian_right_item">刷新</div>
                        </div>
                    </div>
                    <div class="board_line">
                        <i class="iconfont iconxitongshezhi"></i>
                        累计消费：
                        <span class="span_red_b">0 </span>元
                        <div class="fenzhan_left">更多信息</div>
                    </div>
                    <div class="board_line">
                        <i class="iconfont iconxitongshezhi"></i>
                        接口押金：
                        <span class="span_red_b">0 </span>元
                        <div class="qian_right">
                            <div class="qian_right_item">解押</div>
                            <div class="qian_right_item">说明</div>
                        </div>
                    </div>
                </div>
                <div class="board_right">
                    <div class="board_line">
                        <i class="iconfont iconxitongshezhi"></i>
                        开通时间：
                        <span class="span_lv">2022-12-21</span>
                    </div>
                    <div class="board_line">
                        <i class="iconfont iconxitongshezhi"></i>

                        到期时间：
                        <span class="span_lv">2023-12-31</span>
                    </div>
                    <div class="right_dizhi">
                        <i class="iconfont iconxitongshezhi"></i>
                        访问地址：
                        <div class="dizhi_cont">
                            <p>https://csfz.aadg.ren</p>
                            <p>https://csfz.aadg.ren</p>
                            <p class="span_red">
                                请牢记您的访问地址（可以截图此处在手机中保存）
                            </p>
                            <p class="ym_btn">域名管理</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tabs_box">
                <div
                    class="tab"
                    :class="tabIndex == 0 ? 'tab_active' : ''"
                    @click="tabChange(0)"
                >
                    <i class="iconfont iconxitongshezhi"></i>
                    后台公告
                    <div class="zhan"></div>
                </div>
                <div
                    class="tab"
                    :class="tabIndex == 1 ? 'tab_active' : ''"
                    @click="tabChange(1)"
                >
                    <i class="iconfont iconxitongshezhi"></i>
                    QQ记录查询
                </div>
                <div
                    class="tab"
                    :class="tabIndex == 2 ? 'tab_active' : ''"
                    @click="tabChange(2)"
                >
                    <i class="iconfont iconxitongshezhi"></i>
                    后台余额记录
                </div>
                <div
                    class="tab"
                    :class="tabIndex == 3 ? 'tab_active' : ''"
                    @click="tabChange(3)"
                >
                    <i class="iconfont iconxitongshezhi"></i>
                    卡密使用记录
                </div>
                <div
                    class="tab"
                    :class="tabIndex == 4 ? 'tab_active' : ''"
                    @click="tabChange(4)"
                >
                    <i class="iconfont iconxitongshezhi"></i>
                    拿货价格表
                </div>
                <div class="tab" :class="tabIndex == 5 ? 'tab_active' : ''">
                    <!-- 更多下拉菜单 -->
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class="iconfont iconxitongshezhi"> </i>
                            {{ moreValue
                            }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="moreItem(1)">
                                <i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                                后台建站</el-dropdown-item
                            >
                            <el-dropdown-item @click.native="moreItem(2)">
                                <i class="el-icon-arrow-down el-icon--right"></i
                                >补齐查询</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="panels_box">
                <div class="panel" :class="tabIndex == 0 ? 'panel_active' : ''">
                    <div class="note_list">
                        <div
                            class="note_list_line"
                            @click="noteDialogVisible = true"
                        >
                            <i class="iconfont iconxitongshezhi fl"></i>
                            <p class="line_title">安卓APP制作教程</p>
                            <p class="line_date">2022-22-22</p>
                        </div>
                        <div class="note_list_line">
                            <i class="iconfont iconxitongshezhi fl"></i>
                            <p class="line_title">安卓APP制作教程</p>
                            <p class="line_date">2022-22-22</p>
                        </div>
                        <div class="note_list_line">
                            <i class="iconfont iconxitongshezhi fl"></i>
                            <p class="line_title">安卓APP制作教程</p>
                            <p class="line_date">2022-22-22</p>
                        </div>
                        <div class="note_list_line">
                            <i class="iconfont iconxitongshezhi fl"></i>
                            <p class="line_title">安卓APP制作教程</p>
                            <p class="line_date">2022-22-22</p>
                        </div>
                        <div class="note_list_line">
                            <i class="iconfont iconxitongshezhi fl"></i>
                            <p class="line_title">安卓APP制作教程</p>
                            <p class="line_date">2022-22-22</p>
                        </div>
                        <div class="note_list_line">
                            <i class="iconfont iconxitongshezhi fl"></i>
                            <p class="line_title">安卓APP制作教程</p>
                            <p class="line_date">2022-22-22</p>
                        </div>
                        <div class="note_list_line">
                            <i class="iconfont iconxitongshezhi fl"></i>
                            <p class="line_title">安卓APP制作教程</p>
                            <p class="line_date">2022-22-22</p>
                        </div>
                        <div class="note_list_line">
                            <i class="iconfont iconxitongshezhi fl"></i>
                            <p class="line_title">安卓APP制作教程</p>
                            <p class="line_date">2022-22-22</p>
                        </div>
                    </div>
                </div>
                <div class="panel" :class="tabIndex == 1 ? 'panel_active' : ''">
                    <div class="jilubox">
                        <div class="jilu">
                            <el-select v-model="jlSelectorValue">
                                <el-option
                                    v-for="item in jlSelectorOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <el-input
                                v-model="input"
                                placeholder="请输入QQ号码进行查询"
                                style="width: 300px; margin-left: 20px"
                            ></el-input>
                            <el-button
                                icon="el-icon-search"
                                style="width: 120px; margin-left: 20px"
                                type="primary"
                                >查询</el-button
                            >
                        </div>
                        <div class="jilu_list">
                            <div class="list_head">
                                <div class="head_li">记录ID</div>
                                <div class="head_li">资金</div>
                                <div class="head_li">类型/时间</div>
                                <div class="head_li">备注</div>
                                <div class="head_li">操作</div>
                            </div>
                        </div>
                        <div class="pagination">
                            <el-pagination
                                @size-change="pageSizeChange"
                                @current-change="pageCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[20, 50, 100]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next"
                                :total="pageToal"
                                background
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="panel" :class="tabIndex == 2 ? 'panel_active' : ''">
                    <div class="jilubox">
                        <div class="jilu">
                            <!-- <el-select v-model="jlSelectorValue">
                                <el-option
                                    v-for="item in jlSelectorOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select> -->
                            <el-input
                                v-model="input"
                                placeholder="请输入QQ\卡密\订单号进行查询"
                                style="width: 400px; margin-left: 20px"
                            ></el-input>
                            <el-button
                                icon="el-icon-search"
                                style="width: 120px; margin-left: 20px"
                                type="primary"
                                >查询</el-button
                            >
                        </div>
                        <div class="jilu_list">
                            <div class="list_head">
                                <div class="head_li">记录ID</div>
                                <div class="head_li">资金</div>
                                <div class="head_li">类型/时间</div>
                                <div class="head_li">备注</div>
                                <div class="head_li">操作</div>
                            </div>
                        </div>
                        <div class="pagination">
                            <el-pagination
                                @size-change="pageSizeChange"
                                @current-change="pageCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[20, 50, 100]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next"
                                :total="pageToal"
                                background
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="panel" :class="tabIndex == 3 ? 'panel_active' : ''">
                    <div class="jilubox">
                        <div class="jilu">
                            <!-- <el-select v-model="jlSelectorValue">
                                <el-option
                                    v-for="item in jlSelectorOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select> -->
                            <el-input
                                v-model="input"
                                placeholder="请输入QQ\卡密\UID进行查询"
                                style="width: 400px; margin-left: 20px"
                            ></el-input>
                            <el-button
                                icon="el-icon-search"
                                style="width: 120px; margin-left: 20px"
                                type="primary"
                                >查询</el-button
                            >
                        </div>
                        <div class="jilu_list">
                            <div class="list_head">
                                <div class="head_li">记录ID</div>
                                <div class="head_li">资金</div>
                                <div class="head_li">类型/时间</div>
                                <div class="head_li">备注</div>
                                <div class="head_li">操作</div>
                            </div>
                        </div>
                        <div class="pagination">
                            <el-pagination
                                @size-change="pageSizeChange"
                                @current-change="pageCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[20, 50, 100]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next"
                                :total="pageToal"
                                background
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="panel" :class="tabIndex == 4 ? 'panel_active' : ''">
                    <div class="jilubox">
                        <div class="head_line">
                            <p class="t1">站长拿货价格表</p>
                            <p class="t2">
                                <i class="iconfont iconxitongshezhi"></i>
                                注意：禁止将拿货价格信息向用户展示，或公布到网上任何公开的地方
                            </p>
                            <p class="t2">
                                <i class="iconfont iconxitongshezhi"></i>
                                表示最低限制售价，请勿低于该价格销售，共同维护市场环境（举报邮箱：i@sba.cc）
                            </p>
                        </div>
                        <div class="line_tip">
                            <p class="t3">
                                上月消费: <span class="t3_span">0</span> 元
                            </p>
                            <p class="t3">
                                当前应用折扣等级：
                                <span class="t3_span">T1 </span>
                            </p>
                            <p class="t3_button">查看详情</p>
                        </div>
                        <div class="line_tip2">
                            <p class="t3">
                                搭建分站: <span class="t3_span">20</span> 元
                                <span class="t3_crossline">
                                    <i class="iconfont iconxitongshezhi"></i>
                                    20元
                                </span>
                            </p>
                            <p class="t3">
                                搭建分站: <span class="t3_span">20</span> 元
                                <span class="t3_crossline">
                                    <i class="iconfont iconxitongshezhi"></i>
                                    20元
                                </span>
                            </p>
                        </div>
                        <div class="price_list">
                            <div class="list_head">
                                <div class="head_li">图标/功能</div>
                                <div class="head_li">1天</div>
                                <div class="head_li">1月</div>
                                <div class="head_li">3月</div>
                                <div class="head_li">1年</div>
                                <div class="head_li">永久</div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/taocan.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/dt.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/tz.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/kz.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/zl.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/dx.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_3">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_3">原价：10元</div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="line_fenge">
                            以下为单地区代挂卡密价格 （仅为标准价格的40%）
                        </div>
                        <div class="price_list price_list2">
                            <div class="list_head">
                                <div class="head_li">图标/功能</div>
                                <div class="head_li">1月</div>
                                <div class="head_li">3月</div>
                                <div class="head_li">1年</div>
                                <div class="head_li">永久</div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/taocan.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/dt.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/tz.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/tz.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                            <div class="line_box">
                                <div class="line_box_icon">
                                    <img
                                        class="taocan_icon"
                                        src="../assets/images/kz.png"
                                        alt=""
                                    />
                                    豪华全套
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                                <div class="line_box_2">
                                    <div class="line_box_2_1">
                                        <span class="line_box_2_1_m">0.3</span>
                                        元
                                    </div>
                                    <div class="line_box_2_2">
                                        <i
                                            class="iconfont iconxitongshezhi"
                                        ></i>
                                        999元
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel" :class="tabIndex == 5 ? 'panel_active' : ''">
                    <div
                        class="panel_more_box"
                        :class="moreBoxIndex == 1 ? 'morebox_active' : ''"
                    >
                        <div class="cont_box">
                            <p class="cont_box_t">
                                您可以在这里为用户手动搭建网站（仅限主站可以操作）
                            </p>
                            <div class="cont_box_line">
                                <div class="line_label">网站名称：</div>
                                <el-input
                                    v-model="input"
                                    placeholder="请输入内容"
                                    class="borderNone"
                                ></el-input>
                            </div>
                            <div class="cont_box_line">
                                <div class="line_label">网站名称：</div>
                                <el-input
                                    v-model="input"
                                    placeholder="请输入内容"
                                    class="borderNone"
                                ></el-input>
                            </div>
                            <div class="cont_box_line">
                                <div class="line_label">网站名称：</div>
                                <el-input
                                    v-model="input"
                                    placeholder="请输入内容"
                                    class="borderNone"
                                ></el-input>
                            </div>
                            <p class="bottom_t">
                                *请仔细核对UID，输入错误无法修改。该参数指定网站的归属人，搭建后该UID的账号即为站长账号。
                            </p>
                            <div class="cont_box_line">
                                <div class="line_label line_pay_l">
                                    搭建网站类型：
                                </div>
                                <div class="pay_box pay_box_active">
                                    <img
                                        class="pay_box_1"
                                        src="../assets/images/dt.png"
                                        alt=""
                                    />
                                    <span class="pay_t">代挂主站</span>
                                    <div class="san_bg"></div>
                                    <img
                                        src="../assets/images/gou.png"
                                        alt=""
                                        class="pay_gou"
                                    />
                                </div>
                                <div class="pay_box">
                                    <img
                                        class="pay_box_1"
                                        src="../assets/images/tz.png"
                                        alt=""
                                    />
                                    <span class="pay_t">代挂主站</span>
                                    <div class="san_bg"></div>
                                    <img
                                        src="../assets/images/gou.png"
                                        alt=""
                                        class="pay_gou"
                                    />
                                </div>
                            </div>
                            <div class="pay_button">确定</div>
                        </div>
                    </div>
                    <!-- 更多  -查询 -->
                    <div
                        class="panel_jianzhan panel_more_box"
                        :class="moreBoxIndex == 2 ? 'morebox_active' : ''"
                    >
                        <div class="cont_box">
                            <p class="cont_box_t">QQ补齐套装费用查询</p>
                            <div class="cont_box_line">
                                <div class="line_label2">补齐QQ：</div>
                                <el-input
                                    v-model="input"
                                    placeholder="请输入内容"
                                    class="borderNone2"
                                ></el-input>
                            </div>
                            <div class="cont_box_line">
                                <div class="line_label3">
                                    <span class="line_label3_t"
                                        >补齐套装：
                                    </span>
                                    <span class="line_label3_t"
                                        >补齐时长：
                                    </span>
                                    <span class="line_label3_t"
                                        >时间单位：
                                    </span>
                                </div>
                                <div class="line_inputbox">
                                    <div class="line_inputbox_1">
                                        <!-- 套餐下拉菜单 -->
                                        <el-dropdown trigger="click">
                                            <span
                                                class="el-dropdown-link"
                                                style="
                                                    display: block;
                                                    height: 40px;
                                                    width: 100%;
                                                "
                                            >
                                                <img
                                                    src="../assets/images/tz.png"
                                                    alt=""
                                                    style="
                                                        width: 20px;
                                                        height: 20px;
                                                        position: relative;
                                                        top: 5px;
                                                        margin-right: 5px;
                                                    "
                                                />
                                                <span
                                                    style="
                                                        font-weight: 550;
                                                        color: #f65555;
                                                    "
                                                    >{{ moreValue }}</span
                                                >
                                                <i
                                                    class="el-icon-arrow-down el-icon--right"
                                                ></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item
                                                    @click.native="
                                                        taocanChange(1)
                                                    "
                                                >
                                                    <img
                                                        src="../assets/images/tz.png"
                                                        alt=""
                                                        style="
                                                            width: 20px;
                                                            height: 20px;
                                                            position: relative;
                                                            top: 5px;
                                                            margin-right: 5px;
                                                        "
                                                    />
                                                    后台建站</el-dropdown-item
                                                >
                                                <el-dropdown-item
                                                    @click.native="
                                                        taocanChange(2)
                                                    "
                                                >
                                                    <img
                                                        src="../assets/images/tz.png"
                                                        alt=""
                                                        style="
                                                            width: 20px;
                                                            height: 20px;
                                                            position: relative;
                                                            top: 5px;
                                                            margin-right: 5px;
                                                        "
                                                    />
                                                    补齐查询</el-dropdown-item
                                                >
                                                <el-dropdown-item
                                                    @click.native="
                                                        taocanChange(3)
                                                    "
                                                >
                                                    <img
                                                        src="../assets/images/tz.png"
                                                        alt=""
                                                        style="
                                                            width: 20px;
                                                            height: 20px;
                                                            position: relative;
                                                            top: 5px;
                                                            margin-right: 5px;
                                                        "
                                                    />
                                                    补齐查询</el-dropdown-item
                                                >
                                                <el-dropdown-item
                                                    @click.native="
                                                        taocanChange(4)
                                                    "
                                                >
                                                    <img
                                                        src="../assets/images/tz.png"
                                                        alt=""
                                                        style="
                                                            width: 20px;
                                                            height: 20px;
                                                            position: relative;
                                                            top: 5px;
                                                            margin-right: 5px;
                                                        "
                                                    />
                                                    补齐查询</el-dropdown-item
                                                >
                                                <el-dropdown-item
                                                    @click.native="
                                                        taocanChange(5)
                                                    "
                                                >
                                                    <img
                                                        src="../assets/images/tz.png"
                                                        alt=""
                                                        style="
                                                            width: 20px;
                                                            height: 20px;
                                                            position: relative;
                                                            top: 5px;
                                                            margin-right: 5px;
                                                        "
                                                    />
                                                    补齐查询</el-dropdown-item
                                                >
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                    <div class="line_inputbox_2">
                                        <el-input
                                            v-model="input"
                                            placeholder="请输入内容"
                                        ></el-input>
                                    </div>
                                    <div class="line_inputbox_3">
                                        <el-select
                                            v-model="dateValue"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in dateOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="pay_button">确定</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <!-- 弹窗区域 -->
        <!-- 公告弹窗 -->
        <el-dialog
            :visible.sync="noteDialogVisible"
            width="700px"
            @close="noteDialogClose"
            custom-class="dialog"
        >
            <p slot="title" class="dialog_title">公告</p>
            <span>这是一段信息</span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    // 获取父级传过来的用户信息
    props: ['userInfo'],
    data() {
        return {
            input: '',
            tabIndex: 0,
            moreBoxIndex: 1,
            noteDialogVisible: false,
            jlSelectorValue: 0,
            jlSelectorOptions: [
                {
                    value: 0,
                    label: '全部类型'
                },
                {
                    value: 1,
                    label: '下单记录'
                },
                {
                    value: 2,
                    label: '退单记录'
                },
                {
                    value: 3,
                    label: '更新密码'
                },
                {
                    value: 4,
                    label: '更新配置'
                },
                {
                    value: 5,
                    label: '删除记录'
                }
            ],
            currentPage: 1,
            pageSize: 20,
            pageToal: 100,
            moreValue: '更多内容',
            taocanValue: '豪华套餐',
            dateValue: 1,
            dateOptions: [
                {
                    value: 0,
                    label: '天'
                },
                {
                    value: 1,
                    label: '月'
                },
                {
                    value: 2,
                    label: '年'
                },
                {
                    value: 3,
                    label: '永久'
                }
            ]
        }
    },
    // 生命周期函数节点
    created() {},

    // 方法节点
    methods: {
        // 所有添加完成后 执行添加操作
        addPush() {
            // 验证完毕后发起请求
            this.$refs.addFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error({
                        message: '请填写完必要的选项后再发布',
                        offset: 350,
                        center: true
                    })
                }
                let { data: res } = await this.$http.post(
                    'codes/add ',
                    this.addForm
                )
                if (res.status !== 200) {
                    return this.$message.error({
                        message: '发布失败，请刷新页面重试',
                        offset: 350,
                        center: true
                    })
                }
                this.$message.success({
                    message: '发布成功',
                    offset: 350,
                    center: true
                })
                this.$router.push('/code/list')
            })
        },
        tabChange(e) {
            this.tabIndex = e
        },
        noteDialogClose() {},
        pageSizeChange(val) {
            this.pageSize = val
        },
        pageCurrentChange(val) {
            this.currentPage = val
        },
        // 更多内容 item事件
        moreItem(e) {
            this.tabIndex = 5
            this.moreBoxIndex = e
            if (e === 1) {
                this.moreValue = '后台建站'
            } else if (e === 2) {
                this.moreValue = '补齐查询'
            }
        },
        // 补齐查询  套餐
        taocanChange(e) {
            this.taocanValue = e
        }
    }
}
</script>

<style lang="stylus" scoped>
#welcome
    width 100%
    .box-card
        width 100%
        .board
            width 1200px
            display flex
            justify-content space-between
            font-size 14px
            .board_left,.board_right
                width 550px
                padding 10px
                box-sizing border-box
                float left
                .board_line
                    height 44px
                    line-height 44px
                    width 100%
                    // border-bottom 1px solid #eee
                    .span_lv
                        color green
                    .span_red
                        color red
                    .span_red_b
                        color red
                        font-weight 550
                    .fenzhan_left
                        float right
                        border 1px solid #409EFF
                        height 30px
                        line-height 30px
                        text-align center
                        border-radius 4px
                        width 150px
                        cursor pointer
                        margin-top 7px
                    .fenzhan_left:hover
                        background-color #409EFF
                        color #fff
                    .qian_right
                        height 30px
                        float right
                        line-height 30px
                        margin-top 7px
                        .qian_right_item
                            float left
                            width 80px
                            text-align center
                            border 1px solid #409EFF
                            border-radius 4px
                            height 30px
                            cursor pointer
                            margin-left 10px
                        .qian_right_item:hover
                            background-color #409EFF
                            color #fff
                .right_dizhi
                    width 100%
                    margin-top 15px
                    .dizhi_cont
                        float right
                        height 200px
                        width 430px
                        margin-top 0
                        overflow hidden
                        .span_red
                            color red
                            margin-top 15px
                        .ym_btn
                            width 90px
                            height 30px
                            text-align center
                            line-height 30px
                            border-radius 4px
                            border 1px solid #A349A4
                            color #A349A4
                            cursor pointer
                            margin-top 15px
                        .ym_btn:hover
                            color #fff
                            background-color #A349A4
        .tabs_box
            width 100%
            height 40px
            border-bottom  1px solid #eee
            font-size 14px
            .tab
                height 40px
                padding 0 20px
                line-height 40px
                margin-right 15px
                border-radius 4px 4px 0 0
                cursor pointer
                float left
                position relative
                /deep/ .el-dropdown-link
                    display inline-block
                    cursor: pointer;
                    margin-left 3px
                    margin-top -15px
                    height 40px
                    line-height 40px
                    // color: #409EFF;
                    .el-icon-arrow-down
                        font-size: 12px;
            .tab:hover
                background-color #eee
                border-bottom 3px solid rgba(blue,.2)
            .tab_active
                background-color #eee
                border-bottom 3px solid rgba(blue,.5)
                // pointer-events: none;
                // cursor: default;
            .tab_active:hover
                background-color #eee
                border-bottom 3px solid rgba(blue,.5)
        .panels_box
            width 100%
            .panel
                width 100%
                display none
                .note_list
                    width 900px
                    height 300px
                    border 1px solid #eee
                    border-radius 8px
                    margin-top 30px
                    font-size 14px
                    overflow hidden
                    .note_list_line
                        width 100%
                        height 40px
                        // background-color blue
                        line-height 40px
                        border-bottom 1px solid #eee
                        padding 0 10px
                        cursor pointer
                        .line_title
                            height 100%
                            line-height 40px
                            width 600px
                            margin 0
                            float left
                            padding-left 10px
                        .line_date
                            height 20px
                            line-height 20px
                            text-align center
                            width 100px
                            background-color rgba(blue,.5)
                            border-radius 3px
                            float right
                            margin-top 10px
                            color #fff
                    .note_list_line:hover
                        background-color #eee
                .jilubox
                    width 1000px
                    .jilu
                        height 60px
                        width 800px
                        // background-color #eee
                        margin 0 auto
                        margin-top 30px
                        text-align center
                    .jilu_list
                        width 800px
                        margin 0 auto
                        margin-top 30px
                        border 1px solid #eee
                        height 300px
                        border-radius 8px
                        .list_head
                            height 40px
                            border-bottom 1px solid #eee
                            padding-left 30px
                            .head_li
                                font-weight 550
                                font-size 14px
                                float left
                                margin-right 100px
                                line-height 40px
                                color #777
                            .head_li:last-child
                                margin-right 20px
                                float right
                    .pagination
                        width 800px
                        margin 0 auto
                        margin-top 30px
                        .el-pagination
                            text-align center
                .head_line
                    margin-top 30px
                    font-size 14px
                    .t1
                        font-weight 550
                        color #22A5F1
                        text-align center
                        line-height 26px
                    .t2
                        text-align center
                        line-height 26px
                .line_tip,.line_tip2
                    width 660px
                    height 50px
                    background-color #DBE6F0
                    margin 0 auto
                    margin-top 25px
                    border-radius 4px
                    display flex
                    justify-content center
                    .t3
                        color blue
                        font-size 14px
                        height 50px
                        line-height 50px
                        width 200px
                        float left
                        .t3_span
                            color red
                            font-weight 550
                        .t3_crossline
                            color #888
                            margin-left 10px
                    .t3_button
                        border 1px solid red
                        width 90px
                        height 30px
                        text-align center
                        line-height 30px
                        float left
                        border-radius 3px
                        margin-top 10px
                        cursor pointer
                        font-size 14px
                .line_tip2
                    width 1000px
                    height 70px
                    background-color #eee
                    justify-content space-between
                    .t3
                        text-align center
                        line-height 70px
                        width 350px
                .price_list
                    width 100%
                    margin-top 30px
                    border-radius 4px
                    border 1px solid #eee
                    .list_head
                        height 40px
                        border-bottom 1px solid #eee
                        display flex
                        justify-content space-between
                        padding 0 15px
                        .head_li
                            font-weight 550
                            font-size 14px
                            float left
                            line-height 40px
                            color #777
                            width 70px
                    .line_box
                        height 70px
                        width 100%
                        background-color #FAFBFC
                        font-size 14px
                        padding 0 10px
                        display flex
                        justify-content space-between
                        .line_box_icon
                            float left
                            height 70px
                            width 70px
                            text-align center
                            color red
                            .taocan_icon
                                height 30px
                                width 30px
                                display block
                                margin 10px auto 3px
                        .line_box_2,.line_box_3
                            width 70px
                            height 70px
                            float left
                            .line_box_2_1
                                .line_box_2_1_m
                                    font-weight 550
                                    font-size 16px
                            .line_box_2_2
                                color #999
                                font-size 14px
                            .line_box_2_3
                                color #aaa
                                font-size 12px
                                text-decoration line-through
                        .line_box_2
                            padding 15px 0
                            .line_box_2_1_m
                                color #477EEB
                        .line_box_3
                            padding-top 8px
                            .line_box_2_1
                                color #F48E1B
                    .line_box:nth-child(2n+1)
                        background-color #fff
                .line_fenge
                    width 100%
                    height 60px
                    line-height 60px
                    text-align center
                    color #24ACF2
                    font-weight 550
                    font-size 14px
                .price_list2
                    margin-top 0
                    .line_box
                        height 45px
                        .line_box_icon
                            line-height 45px
                            width 100px
                            .taocan_icon
                                float left
                                height 25px
                                width 25px
                        .line_box_2
                            width 120px
                            padding 0
                            color red
                            .line_box_2_1,.line_box_2_2
                                float left
                                width 60px
                                line-height 45px
                .panel_more_box
                    display none
                    width 1000px
                    .cont_box
                        width 600px
                        margin 0 auto
                        height 600px
                        .cont_box_t
                            color red
                            font-size 14px
                            text-align center
                            margin-top 20px
                        .cont_box_line
                            height 60px
                            width 100%
                            font-size 14px
                            margin-top 20px
                            .line_label
                                width 80px
                                height 60px
                                line-height 60px
                                float left
                                border-bottom 1px solid #ddd
                            .line_label2
                                width 80px
                                height 40px
                                line-height 40px
                                float left
                            .line_pay_l
                                width 100px
                                border none
                            .pay_box
                                height 40px
                                width 130px
                                border 1px solid #eee
                                border-radius 4px
                                line-height 40px
                                float left
                                position relative
                                top 10px
                                margin-right 30px
                                cursor pointer
                                overflow hidden
                                font-weight 550
                                .pay_box_1
                                    height 23px
                                    width 23px
                                    position absolute
                                    top 8px
                                    left 18px
                                .pay_t
                                    margin-left 45px
                                .san_bg
                                    height 50px
                                    width 50px
                                    background-color rgba(blue,.7)
                                    position absolute
                                    top 15px
                                    right -30px
                                    transform rotate(45deg)
                                    display none
                                .pay_gou
                                    width 10px
                                    height 10px
                                    position absolute
                                    top 24px
                                    right 3px
                                    display none
                            .pay_box_active
                                border 1px solid rgba(blue,.7)
                                .san_bg
                                    display block
                                .pay_gou
                                    display block
                            /deep/ .borderNone
                                width 500px
                                .el-input__inner
                                    border-top none
                                    border-left none
                                    border-right none
                                    border-radius 0
                                    height 60px
                                    line-height 60px
                            .line_label3
                                margin-top 50px
                                overflow hidden
                                .line_label3_t
                                    margin-right 120px
                                .line_label3_t:last-child
                                    margin-right 0
                                    margin-left 50px
                            .line_inputbox
                                height 50px
                                width 100%
                                margin-top 5px
                                .line_inputbox_1
                                    height 40px
                                    line-height 40px
                                    text-align center
                                    width 150px
                                    border 1px solid #eee
                                    border-radius 4px
                                    cursor pointer
                                    float left
                                .line_inputbox_2
                                    height 40px
                                    line-height 40px
                                    width 200px
                                    float left
                                    margin-left 45px
                                .line_inputbox_3
                                    height 40px
                                    width 110px
                                    float left
                                    margin-left 44px
                        .bottom_t
                            color #999
                            font-size 12px
                            margin-top 10px
                        .pay_button
                            color #fff
                            font-weight 550
                            height 40px
                            line-height 40px
                            text-align center
                            width 100%
                            margin 30px auto
                            border-radius 4px
                            background-color #4297D0
                            cursor pointer
                .morebox_active
                    display block
                .panel_jianzhan
                    .cont_box
                        width 550px
            .panel_active
                display block
    /deep/ .dialog
        .el-dialog__body
            padding-top 0
        .el-dialog__header
            margin 0
            padding 0
        .dialog_title
            font-size 16px
            font-weight 550
            color #444
            width 100%
            border-bottom 1px solid #eee
            height 50px
            line-height 50px
            margin 0
            padding-left 20px

        .notice-box
            width 100%
            padding 0 40px
            .notice_box_title
                width 100%
                height 80px
                border-bottom 1px solid  #eee
                .title_text
                    height 40px
                    line-height 40px
                    margin 0
                    color #000
                .notice_info
                    .info_user
                        margin-right 60px
            .notice_content
                margin-bottom 20px
                margin-top 20px
                line-height 2em
</style>
