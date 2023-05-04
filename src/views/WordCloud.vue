<!-- 模板中的canvas元素 -->
<template>
  <canvas ref="wordCloudCanvas"></canvas>
</template>

<script>
import WordCloud from "wordcloud";
export default {
  name: "WordCloudComponent",
  data() {
    return {
      words: [
        ["JavaScript", 34],
        ["JS", 12],
        ["HTML", 14],
        ["CSS", 10],
        ["Vue", 30],
        ["React", 22],
        ["Angular", 20],
        ["ES6", 26],
      ],
    };
  },
  methods: {
    renderWordCloud() {
      const canvas = this.$refs.wordCloudCanvas;
      const options = {
        list: this.words,
        // gridSize: 8,
        // weightFactor: 4,
        // fontFamily: "Times, serif",
        // color: "#333333",
        gridSize: 10,
        fontFamily: "Times, serif",
        color: "random-light",
        rotateRatio: 0.5,
        rotationSteps: 2,
        rotationRange: [0, 90],
        shape: "square",
      };
      WordCloud(canvas, options);
    },
  },
  watch: {
    words(newWords) {
      if (newWords.length > 0) {
        this.renderWordCloud(); // 监视单词列表变化，并重新渲染词云
      }
    },
  },
  mounted() {
    this.renderWordCloud();
  },
};
</script>
