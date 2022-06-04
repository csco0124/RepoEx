import { createApp, ref, computed } from 'vue'

const app = createApp({})

app.component('item-main', {
  setup() {
    const items = ref([
      {
        name: 'CPU', price: 462984, quantity: 1
      }, 
      {
        name: '메인보드', price: 112053, quantity: 1
      }, 
      {
        name: '메모리', price: 79608, quantity: 2
      }
    ])

    return {
      items,
    }
  },
  template: 
    ` <ul>
        <li v-for="item in items" v-bind:key="item.name">
            {{ item.name }}의 가격: <input type="text" v-on:input="item.price = $event.target.value" v-bind:value="item.price">
        </li>
      </ul>
      <hr>
      <item-list v-bind:items="items"></item-list>
    `,
})

app.component('item-list', {
  props: {
    items: {
      type: Object,
      default: () => {
          return []
      }
    }
  },
  setup(props) {
    const totalPrice = computed(() => {
      return props.items.reduce(function (sum, item) {
        return sum + (item.price * item.quantity)
      }, 0)
    })

    return {
      totalPrice,
    }
  },
  template: 
    ` <div>
        <ul>
          <li v-for="item in items" v-bind:key="item.name">
            {{ item.name }}: {{ item.price }} x {{ item.quantity }} = {{ item.price * item.quantity }} 원
          </li>
        </ul>
        <p>합계: {{ totalPrice }} 원</p>
      </div>
    `,
})

app.mount('#app')
