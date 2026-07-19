import { createRouter, createWebHashHistory } from 'vue-router'

import VueCounter2 from './components/day1/unit02-mental-model/vue-counter-2.vue'
import VueCounter2Source from './components/day1/unit02-mental-model/vue-counter-2.vue?raw'
import Demo1VBindWrong from './components/day1/unit03-template-syntax/demo1-v-bind-wrong.vue'
import Demo1VBindWrongSource from './components/day1/unit03-template-syntax/demo1-v-bind-wrong.vue?raw'
import Demo1VBind from './components/day1/unit03-template-syntax/demo1-v-bind.vue'
import Demo1VBindSource from './components/day1/unit03-template-syntax/demo1-v-bind.vue?raw'
import Demo2VIf from './components/day1/unit03-template-syntax/demo2-v-if.vue'
import Demo2VIfSource from './components/day1/unit03-template-syntax/demo2-v-if.vue?raw'
import Demo2VShow from './components/day1/unit03-template-syntax/demo2-v-show.vue'
import Demo2VShowSource from './components/day1/unit03-template-syntax/demo2-v-show.vue?raw'
import Demo3VForWithoutKey from './components/day1/unit03-template-syntax/demo3-v-for-without-key.vue'
import Demo3VForWithoutKeySource from './components/day1/unit03-template-syntax/demo3-v-for-without-key.vue?raw'
import Demo3VFor from './components/day1/unit03-template-syntax/demo3-v-for.vue'
import Demo3VForSource from './components/day1/unit03-template-syntax/demo3-v-for.vue?raw'
import DemoVModel from './components/day1/unit04-v-model/demo-v-model.vue'
import DemoVModelSource from './components/day1/unit04-v-model/demo-v-model.vue?raw'
import DemoVModelExplained from './components/day1/unit04-v-model/demo-v-model-explained.vue'
import DemoVModelExplainedSource from './components/day1/unit04-v-model/demo-v-model-explained.vue?raw'
import DemoVModelKeyup from './components/day1/unit04-v-model/demo-v-model-keyup.vue'
import DemoVModelKeyupSource from './components/day1/unit04-v-model/demo-v-model-keyup.vue?raw'
import DemoComputedVsMethod from './components/day1/unit06-computed/demo-computed-vs-method.vue'
import DemoComputedVsMethodSource from './components/day1/unit06-computed/demo-computed-vs-method.vue?raw'
import DemoWatch from './components/day1/unit08-onMounted-watch/demo-watch.vue'
import DemoWatchSource from './components/day1/unit08-onMounted-watch/demo-watch.vue?raw'
import DemoWatchEffect from './components/day1/unit08-onMounted-watch/demo-watchEffect.vue'
import DemoWatchEffectSource from './components/day1/unit08-onMounted-watch/demo-watchEffect.vue?raw'

const d1 = 'src/components/day1'

export const units = [
  {
    title: 'Unit 02 – Mental Model',
    demos: [
      {
        path: 'unit02-counter',
        title: 'vue-counter-2.vue',
        file: `${d1}/unit02-mental-model/vue-counter-2.vue`,
        component: VueCounter2,
        source: VueCounter2Source
      }
    ]
  },
  {
    title: 'Unit 03 – Template Syntax',
    demos: [
      {
        path: 'unit03-v-bind-wrong',
        title: 'demo1-v-bind-wrong.vue',
        file: `${d1}/unit03-template-syntax/demo1-v-bind-wrong.vue`,
        component: Demo1VBindWrong,
        source: Demo1VBindWrongSource
      },
      {
        path: 'unit03-v-bind',
        title: 'demo1-v-bind.vue',
        file: `${d1}/unit03-template-syntax/demo1-v-bind.vue`,
        component: Demo1VBind,
        source: Demo1VBindSource
      },
      {
        path: 'unit03-v-if',
        title: 'demo2-v-if.vue',
        file: `${d1}/unit03-template-syntax/demo2-v-if.vue`,
        component: Demo2VIf,
        source: Demo2VIfSource
      },
      {
        path: 'unit03-v-show',
        title: 'demo2-v-show.vue',
        file: `${d1}/unit03-template-syntax/demo2-v-show.vue`,
        component: Demo2VShow,
        source: Demo2VShowSource
      },
      {
        path: 'unit03-v-for-no-key',
        title: 'demo3-v-for-without-key.vue',
        file: `${d1}/unit03-template-syntax/demo3-v-for-without-key.vue`,
        component: Demo3VForWithoutKey,
        source: Demo3VForWithoutKeySource
      },
      {
        path: 'unit03-v-for',
        title: 'demo3-v-for.vue',
        file: `${d1}/unit03-template-syntax/demo3-v-for.vue`,
        component: Demo3VFor,
        source: Demo3VForSource
      }
    ]
  },
  {
    title: 'Unit 04 – v-model',
    demos: [
      {
        path: 'unit04-v-model',
        title: 'demo-v-model.vue',
        file: `${d1}/unit04-v-model/demo-v-model.vue`,
        component: DemoVModel,
        source: DemoVModelSource
      },
      {
        path: 'unit04-v-model-explained',
        title: 'demo-v-model-explained.vue',
        file: `${d1}/unit04-v-model/demo-v-model-explained.vue`,
        component: DemoVModelExplained,
        source: DemoVModelExplainedSource
      },
      {
        path: 'unit04-v-model-keyup',
        title: 'demo-v-model-keyup.vue',
        file: `${d1}/unit04-v-model/demo-v-model-keyup.vue`,
        component: DemoVModelKeyup,
        source: DemoVModelKeyupSource
      }
    ]
  },
  {
    title: 'Unit 06 – Computed',
    demos: [
      {
        path: 'unit06-computed',
        title: 'demo-computed-vs-method.vue',
        file: `${d1}/unit06-computed/demo-computed-vs-method.vue`,
        component: DemoComputedVsMethod,
        source: DemoComputedVsMethodSource
      }
    ]
  },
  {
    title: 'Unit 08 – onMounted & Watch',
    demos: [
      {
        path: 'unit08-watch',
        title: 'demo-watch.vue',
        file: `${d1}/unit08-onMounted-watch/demo-watch.vue`,
        component: DemoWatch,
        source: DemoWatchSource
      },
      {
        path: 'unit08-watcheffect',
        title: 'demo-watchEffect.vue',
        file: `${d1}/unit08-onMounted-watch/demo-watchEffect.vue`,
        component: DemoWatchEffect,
        source: DemoWatchEffectSource
      }
    ]
  }
]

const routes = units.flatMap((unit) =>
  unit.demos.map((demo) => ({
    path: '/' + demo.path,
    component: demo.component
  }))
)

export default createRouter({
  history: createWebHashHistory(),
  routes
})
