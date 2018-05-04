<template>
    <div class="chart-container">
        <e-charts :options="chartOptions" :initOptions="initOptions"></e-charts>
				<div>
				<select v-model="quota">
					<option disabled value="">请选择</option>
					<option :key="q" v-for="q in quotaType">{{q}}</option>
				</select>
				<span>纵轴显示: {{ quota }}</span>
</div>
    </div>
</template>

<script>
import utils from "@/utils";
export default {
  name: "chart",
  data() {
    return {
      initOptions: {
        width: "auto",
        height: "auto"
      },
      quota: "answerCount",
      echarts: null,
      quotaType: [
        "answerCount",
        "follow",
        "view",
        "follow/view",
        "answerCount/view"
      ]
    };
  },
  props: {
    options: {
      type: Array,
      default: []
    }
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
    }
  }
};
</script>

<style>
.chart-container {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 70%;
  border: 2px solid #ccc;
  border-radius: 10px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
