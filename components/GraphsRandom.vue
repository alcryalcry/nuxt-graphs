<template>
  <div class="graphs">
    <div 
      :class="{ isComplete: isComplete }" 
      class="graphs__game">
      <div class="graphs__canvas-container">
        <div class="graphs__result">
          <div class="title">You are amazing :)</div>
          <app-button 
            class="isCyan" 
            @clickAction="$emit('reloadComponent')"
          >Start new game</app-button
          >
        </div>
        <canvas
          ref="canvas"
          class="canvas"
          width="750"
          height="750"
          @click="changeValues"
        />
      </div>
      <div class="graphs__info">
        <div class="title">steps: {{ step }}</div>
        <app-button 
          class="isShown" 
          @clickAction="$emit('reloadComponent')"
        >Restart</app-button
        >
        <app-button
          :class="{ isShown: showPrevButton }"
          @clickAction="goToPrevStep"
        >Previous step</app-button
        >
        <!-- https://www.youtube.com/watch?v=U33dsEcKgeQ
        <h2>GraphsGenus:</h2>
        <code>lines - circles + 1</code>
        <h2>true:</h2>
        <code>Money >= GraphsGenus</code> -->
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/Button.vue';
import { drawLine, drawCircle, drawText, showGrid } from '~/plugins/drawTools';

export default {
  name: 'Graphs',
  components: {
    AppButton
  },
  data() {
    return {
      step: 0,
      isComplete: false,
      requestIdList: [],
      grid: {
        rows: 0,
        cols: 0
      },
      adjacency: [],
      circles: [],
      prevCircles: [],
      linesCount: 0,
      settings: {
        coefRelation: 0.9, // 0 - max (all circles has relations with all circles), 1 - only one relation for every circles
        circlesCount: 5,
        minGrid: 10,
        maxGrid: 10
      }
    };
  },

  computed: {
    canvas() {
      return this.$refs.canvas;
    },
    ctx() {
      return this.canvas.getContext('2d');
    },
    colWidth() {
      return +this.canvas.getAttribute('width') / this.grid.cols;
    },
    rowHeight() {
      return +this.canvas.getAttribute('height') / this.grid.rows;
    },
    showPrevButton() {
      return this.prevCircles.length > 0 && this.step !== 0 && !this.isComplete;
    }
  },

  mounted() {
    this.generateGraph();
    this.prevCircles = this.circles.map(a => ({ ...a }));
    this.generateCoords();
    showGrid(this.ctx, this.grid, this.rowHeight, this.colWidth);
    this.generateAdj(true);
    this.generateValues();
    this.drawAll();
  },

  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    goToPrevStep() {
      this.step--;
      this.circles = this.prevCircles.map(a => ({ ...a }));
      this.prevCircles = [];
      this.drawAll();
    },

    changeValues(e) {
      let x = e.pageX - this.canvas.getBoundingClientRect().x - pageXOffset;
      let y = e.pageY - this.canvas.getBoundingClientRect().y - pageYOffset;

      const radius = this.colWidth / 2.5;

      this.prevCircles = this.circles.map(a => ({ ...a }));

      this.circles.forEach((item, indexCircle) => {
        if (
          y > item.y - radius &&
          y < item.y + radius &&
          x > item.x - radius &&
          x < item.x + radius
        ) {
          item.value -= item.relation.length;

          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          showGrid(this.ctx, this.grid, this.rowHeight, this.colWidth);

          this.requestIdList.forEach((item, i) => {
            cancelAnimationFrame(item);
            if (i === this.requestIdList.length - 1) {
              this.requestIdList = [];
            }
          });

          item.relation.forEach(indexRelation => {
            this.circles[indexRelation].value++;
            this.drawAllAnimate(indexCircle, indexRelation);
            this.drawAll();
          });

          this.step++;
        }
      });

      if (this.circles.every(item => item.value >= 0)) {
        this.isComplete = true;
      }
    },

    drawAllAnimate(startCircleIndex, endCircleIndex) {
      let i = 0;
      let ii = 0;

      // const endCircle = {
      //   x: this.circles[endCircleIndex].x,
      //   y: this.circles[endCircleIndex].y
      // };
      let newEndCircle1 = {
        x: this.circles[startCircleIndex].x,
        y: this.circles[startCircleIndex].y
      };
      let newEndCircle2 = {
        x: this.circles[startCircleIndex].x,
        y: this.circles[startCircleIndex].y
      };

      this.adjacency.forEach((circleAdj, startCircleI) => {
        circleAdj.forEach((adj, endCircleI) => {
          if (
            adj &&
            startCircleI !== startCircleIndex &&
            endCircleI !== endCircleIndex
          ) {
            drawLine(
              this.ctx,
              this.circles[startCircleI],
              this.circles[endCircleI],
              this
            );
          }
        });
      });

      const animate = () => {
        if (i <= 1) {
          i += 0.05;

          this.ctx.beginPath();
          this.ctx.strokeStyle = '#df4576';
          this.ctx.lineWidth = 3;
          this.ctx.moveTo(newEndCircle1.x, newEndCircle1.y);
          this.ctx.lineTo(
            this.circles[startCircleIndex].x +
              (this.circles[endCircleIndex].x -
                this.circles[startCircleIndex].x) *
                i,
            this.circles[startCircleIndex].y +
              (this.circles[endCircleIndex].y -
                this.circles[startCircleIndex].y) *
                i
          );
          this.ctx.stroke();
        }

        if (ii <= 1) {
          ii += 0.025;
          this.ctx.beginPath();
          this.ctx.strokeStyle = '#27e8a7';
          this.ctx.lineWidth = 3;
          this.ctx.moveTo(newEndCircle2.x, newEndCircle2.y);
          this.ctx.lineTo(
            this.circles[startCircleIndex].x +
              (this.circles[endCircleIndex].x -
                this.circles[startCircleIndex].x) *
                ii,
            this.circles[startCircleIndex].y +
              (this.circles[endCircleIndex].y -
                this.circles[startCircleIndex].y) *
                ii
          );
          this.ctx.stroke();
        }

        newEndCircle1 = {
          x:
            this.circles[startCircleIndex].x +
            (this.circles[endCircleIndex].x -
              this.circles[startCircleIndex].x) *
              i,
          y:
            this.circles[startCircleIndex].y +
            (this.circles[endCircleIndex].y -
              this.circles[startCircleIndex].y) *
              i
        };

        newEndCircle2 = {
          x:
            this.circles[startCircleIndex].x +
            (this.circles[endCircleIndex].x -
              this.circles[startCircleIndex].x) *
              ii,
          y:
            this.circles[startCircleIndex].y +
            (this.circles[endCircleIndex].y -
              this.circles[startCircleIndex].y) *
              ii
        };

        this.drawAll();
        const requestId = requestAnimationFrame(animate);
        this.requestIdList.push(requestId);
      };
      animate();
    },

    drawAll() {
      this.circles.forEach(item => {
        drawCircle(this.ctx, this.colWidth, item);
        drawText(this.ctx, this.colWidth, item);
      });
    },

    generateValues() {
      const genus = this.linesCount - this.settings.circlesCount + 1;
      const maxValue = 5;
      const minValue = -5;
      let values = genus;

      this.circles.forEach((circle, i) => {
        if (i === this.circles.length - 1) {
          circle.value = values;
          return;
        }

        let value = 0;
        if (i % 2 !== 0) {
          value = this.random(minValue, 0);
        } else {
          value = this.random(0, maxValue);
        }
        circle.value = value;
        values -= value;
      });

      // lines = this.linesCount
      // circlesCount
      // GraphsGenus = lines - circles + 1
      // Money >= GraphsGenus - главное условие
    },

    generateGraph() {
      const randomGridValue = this.random(
        this.settings.minGrid,
        this.settings.maxGrid
      );

      // generate square grid
      this.grid.rows = randomGridValue;
      this.grid.cols = randomGridValue;

      // generate empty adjacency
      let tmplRow = [];
      for (let i = 0; i < this.settings.circlesCount; i++) {
        tmplRow.push(0);
      }
      for (let i = 0; i < this.settings.circlesCount; i++) {
        this.adjacency.push(tmplRow.slice(0));
      }

      // generate circles position
      for (let i = 0; i < this.settings.circlesCount; i++) {
        let tmplCircle = {
          x: this.random(0, randomGridValue),
          y: this.random(0, randomGridValue),
          value: 0,
          relation: []
        };

        // check same circles position and set unique position
        let indexForUnique = 0;
        while (indexForUnique !== this.circles.length) {
          if (
            tmplCircle.x === this.circles[indexForUnique].x ||
            tmplCircle.y === this.circles[indexForUnique].y
          ) {
            tmplCircle.x = this.random(0, randomGridValue);
            tmplCircle.y = this.random(0, randomGridValue);
            indexForUnique = 0;
          }
          indexForUnique++;
        }

        this.circles.push(tmplCircle);
      }

      // generate adjacency
      this.adjacency.forEach((row, rowIndex) => {
        row.forEach((item, itemIndex) => {
          // default relations
          switch (itemIndex) {
            case rowIndex + 1:
            case rowIndex - 1:
              row[itemIndex] = 1;
              return;
              // break;
            case rowIndex:
              return;
              // break;
            default:
              if (item !== 0) return;
              break;
          }

          // additional relations
          row[itemIndex] = Math.random() > this.settings.coefRelation ? 1 : 0;
          this.adjacency[itemIndex][rowIndex] = row[itemIndex];
        });
      });
    },

    generateAdj() {
      this.adjacency.forEach((circleAdj, startCircleIndex) => {
        circleAdj.forEach((adj, endCircleIndex) => {
          if (adj) {
            this.circles[startCircleIndex].relation.push(endCircleIndex);
            drawLine(
              this.ctx,
              this.circles[startCircleIndex],
              this.circles[endCircleIndex],
              this
            );
          }
        });
      });
    },

    generateCoords() {
      this.circles.forEach(item => {
        const x = item.x;
        const y = item.y;

        item.x = this.colWidth / 2 + x * this.colWidth;
        item.y = this.colWidth / 2 + y * this.rowHeight;
      });
    }
  }
};
</script>
