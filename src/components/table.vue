<template>
    <el-table
        :data="tableList"
        class="table-g"
        ref="tableForm"
        style="width: 100%"
        :height="height"
        stripe
        :header-cell-style="{ background: '#ecf1f5' }"
        @selection-change="handleSelectionChange"
    >
        <template v-slot:empty>
            <img v-if="!simpleEmpty" class="empty-pic" src="@/assets/empty.png" alt="" />
            <div class="empty-text">暂无数据</div>
        </template>
        <el-table-column v-if="hasSel" type="selection" width="55">
        </el-table-column>
        <el-table-column
            v-if="hasIndex"
            type="index"
            label="序号"
            align="center"
            width="60"
        >
        </el-table-column>
        <el-table-column
            v-for="item in tableConfigData"
            :key="item.id"
            :label="item.name"
            :min-width="item.width"
            :align="item.align || 'center'"
            :show-overflow-tooltip="item.overflow"
        >
            <template #default="scope">
                <span
                    v-if="item.html"
                    @click="itemClickFn(tableList[scope.$index])"
                    v-html="item.func(scope.row, item.prop)"
                ></span>
                <component
                    v-else-if="item.component"
                    :is="item.component"
                    :info="item.func(scope.row, item.prop)"
                    @change="onChange"
                ></component>
                <span v-else-if="item.func">{{
                    item.func(scope.row, item.prop, {
                        index: scope.$index,
                        currentPageNum,
                        currentPageSize,
                    })
                }}</span>
                <span v-else-if="item.isImg" class="img">
                    <img :src="scope.row[item.prop]" />
                </span>
            </template>
        </el-table-column>
        <slot></slot>
    </el-table>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        tableList: Array,
        tableConfigData: Array,
        hasSel: Boolean,
        hasIndex: Boolean,
        height: String,
        simpleEmpty: Boolean
    },
    setup(prop, {emit}) {
        const handleSelectionChange = (el)=> {
            $emit("chooseTable", el);
        }
        const itemClickFn = (el)=> {
            $emit("cellClick", el);
        }
        const onChange = v=> {
            $emit("onChange", el);
        }
        return {
            handleSelectionChange,
            itemClickFn,
            onChange
        }
    }
})
</script>
<style lang="scss" scoped>
.table-g {
   font-size: $smallFontSize!important;
    &:deep .el-table__header-wrapper {
        .el-table__cell
        {
            padding: 11px 0 !important;
        }
    }
    &:deep .el-table__body-wrapper {
        &::-webkit-scrollbar {
            width: 2px;
        }
        td,
        th {
            padding: .6vw 0 !important;
        }
        tr:hover {
           background-color: #effdf6!important;
        }
    }
    .empty-pic {
        margin-top: 20px;
        width: 10vw;
        height: 10vw;
    }
    .empty-text {
        color: #454958;
        font-size: 16px;
    }
}
</style>