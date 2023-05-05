<template>
  <div
    id="main"
    ref="chart"
    style="width: 100%; height: 600px; border: 1px solid red"
  ></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-wordcloud";
// NOTE: canvas 尺寸小的话可能画不出来
// import bgImage from "../assets/echarts-logo.png";
import bgImage from "../assets/tx-fill-hexagonal.png";
// const testBase64Img =
// "data:image/png;base64,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";
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
    return {
      image: "",
      chart: null,
    };
  },
  watch: {},
  computed: {},
  methods: {
    // TODO: 配置参数调整
    drawWordCloud() {
      this.chart = echarts.init(this.$refs.chart);
      const _thatChat = this.chart;
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
            sizeRange: [4, 150],
            rotationRange: [0, 0],
            gridSize: 0,
            shape: "ellipse",
            maskImage: maskImage,
            drawOutOfBound: false,
            // layoutAnimation: true,
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
        _thatChat.setOption(option);
      };
      maskImage.src = bgImage;

      _thatChat.setOption(option);

      _thatChat.on("click", (params) => {
        alert(`${params.name} 被点击了`);
      });
    },
  },
  created() {},
  beforeDestroy() {
    window.removeEventListener("resize");
  },
  mounted() {
    this.drawWordCloud();
    window.addEventListener("resize", () => {
      this.chart && this.chart.resize();
    });
  },
};
</script>
<style lang="scss" scoped></style>
