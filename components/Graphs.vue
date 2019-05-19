<template>
  <div class="graphs">
    <div 
      :class="{ isComplete: isComplete }" 
      class="graphs__game">
      <div class="graphs__canvas-container">
        <div class="graphs__result">
          <div class="title">You are amazing :)</div>
          <app-button 
            @clickAction="$emit('reloadComponent')"
          >Start new game</app-button
          >
        </div>
        <canvas
          ref="canvas"
          class="canvas"
          width="750"
          height="750"
          @click="counter($event)"
        />
      </div>
      <div class="graphs__info">
        <div class="title">steps: {{ step }}</div>
        <app-button
          :class="{ isShown: step > 0 }"
          @clickAction="$emit('reloadComponent')"
        >Restart
        </app-button>
        <app-button
          :class="{ isShown: showPrevButton }"
          @clickAction="goToPrevStep"
        >Previous step
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/Button.vue';

export default {
  name: 'Graphs',
  components: {
    AppButton
  },
  data() {
    return {
      step: 0,
      isComplete: false,
      grid: {
        rows: 10,
        cols: 10
      },
      adjacency: [
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0]
      ],
      circles: [
        {
          x: 3,
          y: 0,
          value: 1,
          relation: []
        },
        {
          x: 1,
          y: 1,
          value: 2,
          relation: []
        },
        {
          x: 0,
          y: 2,
          value: -1,
          relation: []
        },
        {
          x: 6,
          y: 1,
          value: -1,
          relation: []
        },
        {
          x: 1,
          y: 4,
          value: -1,
          relation: []
        },
        {
          x: 2,
          y: 5,
          value: 2,
          relation: []
        },
        {
          x: 6,
          y: 3,
          value: 1,
          relation: []
        },
        {
          x: 5,
          y: 5,
          value: -3,
          relation: []
        },
        {
          x: 2,
          y: 7,
          value: 1,
          relation: []
        },
        {
          x: 8,
          y: 3,
          value: 1,
          relation: []
        }
      ],
      prevCircles: []
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
    this.prevCircles = this.circles.map(a => ({ ...a }));
    this.setCoords();
    this.showGrid();
    this.setAdj();
    this.drawAll();
  },

  methods: {
    goToPrevStep() {
      this.step--;
      this.circles = this.prevCircles.map(a => ({ ...a }));
      this.prevCircles = [];
      this.drawAll();
    },

    counter(e) {
      let x = e.pageX - this.canvas.getBoundingClientRect().x - pageXOffset;
      let y = e.pageY - this.canvas.getBoundingClientRect().y - pageYOffset;

      const radius = this.colWidth / 2.5;

      this.prevCircles = this.circles.map(a => ({ ...a }));

      this.circles.forEach(item => {
        if (
          y > item.y - radius &&
          y < item.y + radius &&
          x > item.x - radius &&
          x < item.x + radius
        ) {
          item.value -= item.relation.length;

          item.relation.forEach(i => {
            this.circles[i].value++;
          });

          this.step++;
          this.drawAll();
        }
      });
      if (this.circles.every(item => item.value >= 0)) {
        this.isComplete = true;
      }
    },

    drawAll() {
      this.circles.forEach(item => {
        this.drawCircle(item);
        this.drawText(item);
      });
    },

    setAdj() {
      this.adjacency.forEach((circleAdj, startCircleIndex) => {
        circleAdj.forEach((adj, endCircleIndex) => {
          if (adj) {
            this.circles[startCircleIndex].relation.push(endCircleIndex);
            this.drawLine(startCircleIndex, endCircleIndex);
          }
        });
      });
    },

    setCoords() {
      this.circles.forEach(item => {
        const x = item.x;
        const y = item.y;

        item.x = this.colWidth / 2 + x * this.colWidth;
        item.y = this.colWidth / 2 + y * this.rowHeight;
      });
    },

    drawText(item) {
      this.ctx.beginPath();
      this.ctx.font = `${this.colWidth / 25}rem sans-serif`;
      this.ctx.fillStyle = item.value >= 0 ? '#fff' : '#32467F';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(item.value, item.x, item.y);
      this.ctx.closePath();
    },

    // drawCircle(item) {
    //   const radius = this.colWidth / 2.5
    //   const circleBackground = item.value >= 0 ? '#32467F' : '#fff'
    //   const borderWidth = 5
    //   const borderColor = '#32467F'

    //   let animColor = (alpha = 1) => {
    //     return `rgba(50, 70, 127, ${alpha})`
    //   }
    //   let alpha = 0;

    //   const borderCircle = () => {
    //     this.ctx.beginPath()
    //     this.ctx.fillStyle = circleBackground
    //     this.ctx.arc(item.x, item.y, radius - borderWidth, 0, 2 * Math.PI)
    //     this.ctx.fill()
    //   }

    //   const animateCircle = () => {
    //     this.ctx.beginPath()
    //     this.ctx.fillStyle = animColor(alpha)
    //     this.ctx.arc(item.x, item.y, radius, 0, 2 * Math.PI)
    //     this.ctx.fill()
    //   }

    //   const loop = () => {
    //     alpha += 0.01
    //     animateCircle();
    //     borderCircle()
    //     requestAnimationFrame(loop);
    //   }
    //   requestAnimationFrame(loop);
    // },

    drawCircle(item) {
      const radius = this.colWidth / 2.5;
      const circleBackground = item.value >= 0 ? '#32467F' : '#fff';
      const borderWidth = 5;
      const borderColor = '#32467F';

      this.ctx.beginPath();
      this.ctx.fillStyle = borderColor;
      this.ctx.arc(item.x, item.y, radius, 0, 2 * Math.PI);
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.fillStyle = circleBackground;
      this.ctx.arc(item.x, item.y, radius - borderWidth, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    },

    drawLine(startCircle, endCircle) {
      const lineWidth = 5;
      const lineColor = '#32467F';

      this.ctx.beginPath();
      this.ctx.strokeStyle = lineColor;
      this.ctx.lineWidth = lineWidth;
      this.ctx.moveTo(this.circles[startCircle].x, this.circles[startCircle].y);
      this.ctx.lineTo(this.circles[endCircle].x, this.circles[endCircle].y);
      this.ctx.stroke();
      this.ctx.closePath();
    },

    showGrid() {
      this.ctx.beginPath();

      for (let rowIndex = 0; rowIndex < this.grid.rows; rowIndex++) {
        for (let colIndex = 0; colIndex < this.grid.cols; colIndex++) {
          this.ctx.strokeStyle = '#CACEDB';
          this.ctx.lineWidth = 1;
          this.ctx.rect(
            this.colWidth * colIndex,
            this.rowHeight * rowIndex,
            this.colWidth,
            this.rowHeight
          );
          this.ctx.stroke();
        }
      }

      this.ctx.closePath();
    }
  }
};
</script>
