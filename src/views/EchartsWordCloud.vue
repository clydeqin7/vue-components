<template>
  <div>
    <el-popover ref="popover" placement="top" style="padding: 0">
      <el-menu
        class="c_menu"
        :default-active="activeIndex"
        :mode="mode"
        @select="handleMenuSelect"
      >
        <!--菜单项-->
        <el-menu-item index="1">菜单1</el-menu-item>
        <el-menu-item index="2">菜单2</el-menu-item>
        <el-menu-item index="3">菜单3</el-menu-item>
      </el-menu>
    </el-popover>
    <div
      id="main"
      ref="chart"
      style="width: 100%; height: 600px; border: 1px solid red"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-wordcloud";
// NOTE: canvas 尺寸小的话可能画不出来
// import bgImage from "../assets/echarts-logo.png";
// import bgImage from "../assets/tx-fill-hexagonal.png";
import bgImage from "../assets/OIP-C.png";
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
  borderColor: 4812,
  markLine: 16578,
  line: 76970,
  radiusAxis: 6704,
  radar: 15964,
  data: 60679,
  dataZoom: 24347,
  tooltip: 43420,
  toolbox: 25222,
  geo: 16904,
  parallelAxis: 4029,
  parallel: 5319,
  max: 3393,
  bar: 43066,
  heatmap: 3110,
  map: 20285,
  animationDuration: 3425,
  animationDelay: 2431,
  splitNumber: 5175,
  axisLine: 12738,
  lineStyle: 19601,
  splitLine: 7133,
  axisTick: 8831,
  axisLabel: 17516,
  pointer: 590,
  color: 23426,
  title: 38497,
  formatter: 15214,
  slider: 7236,
  legend: 66514,
  grid: 28516,
  smooth: 1295,
  smoothMonotone: 696,
  sampling: 757,
  feature: 12815,
  saveAsImage: 2616,
  polar: 6279,
  calculable: 879,
  backgroundColor: 9419,
  excludeComponents: 130,
  show: 20620,
  text: 2592,
  icon: 2782,
  dimension: 478,
  inRange: 1060,
  animationEasing: 2983,
  animationDurationUpdate: 2259,
  animationDelayUpdate: 2236,
  animationEasingUpdate: 2213,
  xAxis: 89459,
  angleAxis: 5469,
  showTitle: 484,
  dataView: 2754,
  restore: 932,
  timeline: 10104,
  range: 477,
  value: 5732,
  precision: 878,
  target: 1433,
  zlevel: 5361,
  symbol: 8718,
  interval: 7964,
  symbolSize: 5300,
  showSymbol: 1247,
  inside: 8913,
  xAxisIndex: 3843,
  orient: 4205,
  boundaryGap: 5073,
  nameGap: 4896,
  zoomLock: 571,
  hoverAnimation: 2307,
  legendHoverLink: 3553,
  stack: 2907,
  throttle: 466,
  connectNulls: 897,
  clipOverflow: 826,
  startValue: 551,
  minInterval: 3292,
  opacity: 3097,
  splitArea: 4775,
  filterMode: 635,
  end: 409,
  left: 6475,
  funnel: 2238,
  lines: 6403,
  baseline: 431,
  align: 2608,
  coord: 897,
  nameTextStyle: 7477,
  width: 4338,
  shadowBlur: 4493,
  effect: 929,
  period: 225,
  areaColor: 631,
  borderWidth: 3654,
  nameLocation: 4418,
  position: 11723,
  containLabel: 1701,
  scatter: 10718,
  areaStyle: 5310,
  scale: 3859,
  pieces: 414,
  categories: 1000,
  selectedMode: 3825,
  itemSymbol: 273,
  effectScatter: 7147,
  fontStyle: 3376,
  fontSize: 3386,
  margin: 1034,
  iconStyle: 2257,
  link: 1366,
  axisPointer: 5245,
  showDelay: 896,
  graph: 22194,
  subtext: 1442,
  selected: 2881,
  barCategoryGap: 827,
  barGap: 1094,
  barWidth: 1521,
  coordinateSystem: 3622,
  barBorderRadius: 284,
  z: 4014,
  polarIndex: 1456,
  shadowOffsetX: 3046,
  shadowColor: 3771,
  shadowOffsetY: 2475,
  height: 1988,
  barMinHeight: 575,
  lang: 131,
  symbolRotate: 2752,
  symbolOffset: 2549,
  showAllSymbol: 942,
  transitionDuration: 993,
  bottom: 3724,
  fillerColor: 229,
  nameMap: 1249,
  barMaxWidth: 747,
  radius: 2103,
  center: 2425,
  magicType: 3276,
  labelPrecision: 248,
  option: 654,
  seriesIndex: 935,
  controlPosition: 121,
  itemGap: 3188,
  padding: 3481,
  shadowStyle: 347,
  boxplot: 1394,
  labelFormatter: 264,
  realtime: 631,
  dataBackgroundColor: 239,
  showDetail: 247,
  showDataShadow: 217,
  x: 684,
  valueDim: 499,
  onZero: 931,
  right: 3255,
  clockwise: 1035,
  itemWidth: 1732,
  trigger: 3840,
  axis: 379,
  selectedOffset: 670,
  startAngle: 1293,
  minAngle: 590,
  top: 4637,
  avoidLabelOverlap: 870,
  labelLine: 3785,
  sankey: 2933,
  endAngle: 213,
  start: 779,
  roam: 1738,
  fontWeight: 2828,
  fontFamily: 2490,
  subtextStyle: 2066,
  indicator: 853,
  sublink: 708,
  zoom: 1038,
  subtarget: 659,
  length: 1060,
  itemSize: 505,
  controlStyle: 452,
  yAxisIndex: 2529,
  edgeLabel: 1188,
  radiusAxisIndex: 354,
  scaleLimit: 1313,
  geoIndex: 535,
  regions: 1892,
  itemHeight: 1290,
  nodes: 644,
  candlestick: 3166,
  crossStyle: 466,
  edges: 369,
  links: 3277,
  layout: 846,
  barBorderColor: 721,
  barBorderWidth: 498,
  treemap: 3865,
  y: 367,
  valueIndex: 704,
  showLegendSymbol: 482,
  mapValueCalculation: 492,
  optionToContent: 264,
  handleColor: 187,
  handleSize: 271,
  showContent: 1853,
  angleAxisIndex: 406,
  endValue: 327,
  triggerOn: 1720,
  contentToOption: 169,
  buttonColor: 71,
  rotate: 1144,
  hoverLink: 335,
  outOfRange: 491,
  textareaColor: 58,
  textareaBorderColor: 58,
  textColor: 60,
  buttonTextColor: 66,
  category: 336,
  hideDelay: 786,
  alwaysShowContent: 1267,
  extraCssText: 901,
  effectType: 277,
  force: 1820,
  rippleEffect: 723,
  edgeSymbolSize: 329,
  showEffectOn: 271,
  gravity: 199,
  edgeLength: 193,
  layoutAnimation: 152,
  length2: 169,
  enterable: 957,
  dim: 83,
  readOnly: 143,
  levels: 444,
  textGap: 256,
  pixelRatio: 84,
  nodeScaleRatio: 232,
  draggable: 249,
  brushType: 158,
  radarIndex: 152,
  large: 182,
  edgeSymbol: 675,
  largeThreshold: 132,
  leafDepth: 73,
  childrenVisibleMin: 73,
  minSize: 35,
  maxSize: 35,
  sort: 90,
  funnelAlign: 61,
  source: 336,
  nodeClick: 200,
  curveness: 350,
  areaSelectStyle: 104,
  parallelIndex: 52,
  initLayout: 359,
  trailLength: 116,
  boxWidth: 20,
  back: 53,
  rewind: 110,
  zoomToNodeRatio: 80,
  squareRatio: 60,
  parallelAxisDefault: 358,
  checkpointStyle: 440,
  nodeWidth: 49,
  color0: 62,
  layoutIterations: 56,
  nodeGap: 54,
  "color(Array": 76,
  "<string>)": 76,
  repulsion: 276,
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
      activeIndex: "1",
      mode: "vertical",
      image: "",
      chart: null,
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleMenuSelect(params) {
      console.log("handleMenuSelect", params);
      this.$refs.popover.showPopper = false;
    },
    // TODO: 配置参数调整
    drawWordCloud() {
      this.chart = echarts.init(this.$refs.chart);
      const _thatChat = this.chart;
      const maskImage = new Image();

      let data = [];
      for (const name in keyWords) {
        data.push({
          name: name,
          value: Math.sqrt(keyWords[name]).toFixed(2),
        });
      }
      let option = {
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "wordCloud",
            sizeRange: [12, 60],
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
        console.log("== click params ==");
        console.log(params);
        console.log("== click params ==");
        // alert(`${params.name} 被点击了`);
        // 获取点击的元素信息
        const x = params.event.offsetX;
        const y = params.event.offsetY;

        this.$refs.popover.$el.style.position = "absolute";
        this.$refs.popover.$el.style.top = y + "px";
        this.$refs.popover.$el.style.left = x + "px";
        this.$refs.popover.showPopper = true;
        console.log("this.$refs", this.$refs);
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
<style lang="scss" scoped>
.c_menu {
  &.el-menu {
    border-right: none;
  }
}
</style>
