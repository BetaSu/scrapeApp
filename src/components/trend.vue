<template>
  <div class="chart-container" v-loading="loading">
    <e-charts :options="chartOptions" :initOptions="initOptions"></e-charts>
    筛选条件
    <el-select v-model="quota" placeholder="请选择">
        <el-option
          v-for="item in quotaType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageData.page"
      :page-sizes="[20, 50, 80, 100, 200]"
      :page-size="pageData.pageSize"
      layout="sizes, prev, pager, next"
      :total="pageData.total">
    </el-pagination>
  </div>
</template>

<script>
import utils from "@/utils";
import provider from '@/providers'
export default {
  name: "chart",
  data() {
    return {
      initOptions: {
        width: "auto",
        height: "auto"
      },
      pageData: {},
      loading: true,
      options: [],
      quota: "answerCount",
      echarts: null,
      quotaType: [
        {
          label: '回答数',
          value: "answerCount"
        },
        {
          label: '关注数',
          value: "follow"
        },
        {
          label: '浏览量',
          value: "view"
        },
        {
          label: '关注／浏览',
          value: "follow/view"
        },
        {
          label: '回答／浏览',
          value: "answerCount/view"
        }
      ]
    };
  },
  computed: {
    chartOptions() {
      let quota = this.quota
      let template = {
        title: {
          text: this.quota
				},
        xAxis: {
					name: "时间",
					type: "time",
					axisLine: {
						onZero: false
					},
          axisLabel: {
            interval: 10
          }
        },
        tooltip: {
          formatter (params) {
            return `标题：${params.seriesName}</br>时间：${utils.formatDate(params.data[0])}</br>${quota}：${params.data[1]}`
          }
        },
        yAxis: {
          type: "value",
          name: "排序",
          splitNumber: 20,
          data: []
				},
        series: []
      };
      this.options.forEach(item => {
        let curData = {
          name: item.title,
          type: 'line',
          data: []
        }
        for (let i = 0; i < item.timeStamps.length; i++) {
          curData.data.push([item.timeStamps[i], this.setQuota(this.quota, item, i)]);
        }
        template.series.push(curData)
      });
      return template;
    }
  },
  methods: {
    handleSizeChange (size) {
      this.pageData.pageSize = size
      this.fetch(this.pageData.page, size)
    },
    handleCurrentChange (cur) {
      this.pageData.page = cur
      this.fetch(cur, this.pageData.pageSize)
    },
    setQuota(quota, item, index) {
      switch (quota) {
        case "follow":
          return item.follow[index];
        case "view":
          return item.view[index];
        case "answerCount":
          return item.answerCount[index];
        case "follow/view":
          return item.follow[index] / item.view[index];
        case "answerCount/view":
          return item.answerCount[index] / item.view[index];
      }
    },
    fetch (page = 1, pageSize = 20) {
      return provider.getTotal({
        page,
        pageSize
      }).then(res => {
        this.loading = false
        this.pageData = res.data
        this.options = res.data.data || []
      }).catch(e => {
        this.loading = false
        this.$message.error('数据加载失败')
      })
    }
  },
  mounted () {
    this.fetch()
  }
};
</script>

<style>
.chart-container {
  
}
.echarts {
  width: 100% !important;
}
</style>
