<template>
  <div ref="chart" style="width: 600px; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-wordcloud";
// const bgImage = require("../assets/echarts-logo.png");
import bgImage from "../assets/echarts-logo.png";
const keyWords = {
  visualMap: 22199,
  continuous: 10288,
  contoller: 620,
  series: 274470,
  gauge: 12311,
  detail: 1206,
  piecewise: 4885,
  textStyle: 32294,
  markPoint: 18574,
  pie: 38929,
  roseType: 969,
  label: 37517,
  emphasis: 12053,
  yAxis: 57299,
  name: 15418,
  type: 22905,
  gridIndex: 5146,
  normal: 49487,
  itemStyle: 33837,
  min: 4500,
  silent: 5744,
  animation: 4840,
  offsetCenter: 232,
  inverse: 3706,
  tiled: 105,
  currentIndex: 145,
  axisType: 227,
  loop: 97,
  playInterval: 112,
  borderColor0: 23,
  gap: 43,
  autoPlay: 123,
  showPlayBtn: 25,
  breadcrumb: 119,
  colorMappingBy: 85,
  id: 18,
  blurSize: 85,
  minOpacity: 50,
  maxOpacity: 54,
  prevIcon: 12,
  children: 21,
  shape: 98,
  nextIcon: 12,
  showNextBtn: 17,
  stopIcon: 21,
  visibleMin: 83,
  visualDimension: 97,
  colorSaturation: 56,
  colorAlpha: 66,
  emptyItemWidth: 10,
  inactiveOpacity: 4,
  activeOpacity: 4,
  showPrevBtn: 19,
  playIcon: 26,
  ellipsis: 19,
  gapWidth: 19,
  borderColorSaturation: 10,
  handleIcon: 2,
  handleStyle: 6,
  borderType: 1,
  constantSpeed: 1,
  polyline: 2,
  blendMode: 1,
  dataBackground: 1,
  textAlign: 1,
  textBaseline: 1,
  brush: 3,
};
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    drawWordCloud() {
      const chart = echarts.init(this.$refs.chart);
      const maskImage = new Image();

      let data = [];
      for (const name in keyWords) {
        data.push({
          name: name,
          value: Math.sqrt(keyWords[name]),
        });
      }
      let option = {
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "wordCloud",
            shape: "ellipse",
            size: ["100%", "100%"],
            rotationRange: [0, 0],
            rotationStep: 45,
            gridSize: 2,
            // maskImage: maskImage,
            keepAspect: true,
            textStyle: {
              fontWeight: "bold",
              color: function () {
                return (
                  "rgb(" +
                  [
                    Math.round(Math.random() * 200) + 50,
                    Math.round(Math.random() * 50),
                    Math.round(Math.random() * 50) + 50,
                  ].join(",") +
                  ")"
                );
              },
            },
            emphasis: {
              textStyle: {
                color: "#528",
              },
            },
            data: data.sort(function (a, b) {
              return b.value - a.value;
            }),
          },
        ],
      };

      maskImage.onload = function () {
        console.log("xxx");
        chart.setOption(option);
      };

      maskImage.src = bgImage;

      chart.setOption(option);

      chart.on("click", (params) => {
        alert(`${params.name} 被点击了`);
      });
    },
  },
  created() {},
  mounted() {
    this.drawWordCloud();
  },
};
</script>
<style lang="scss" scoped></style>
