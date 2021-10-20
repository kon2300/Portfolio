import Chart from 'chart.js/auto'
import store from '@/store'

export const renderChartDougnut = (ctx, data) => {
  const newCtx = document.getElementById(ctx).getContext('2d')
  console.log(data)
  store.commit(
    'SET_CHART',
    new Chart(newCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(data[0]),
        datasets: [
          {
            label: '支出',
            data: Object.values(data[0]),
            backgroundColor: [
              'rgba(252, 165, 165 ,0.8)',
              'rgba(252, 211, 77,0.8)',
              'rgba(110, 231, 183,0.8)',
              'rgba(147, 197, 253,0.8)',
              'rgba(190, 24, 93,0.8)',
              'rgba(209, 250, 229,0.8)',
              'rgba(220, 38, 38,0.8)',
              'rgba(196, 181, 253,0.8)',
              'rgba(55, 48, 163,0.8)',
            ],
            borderColor: [
              'rgba(252, 165, 165)',
              'rgba(252, 211, 77)',
              'rgba(110, 231, 183)',
              'rgba(147, 197, 253)',
              'rgba(190, 24, 93)',
              'rgba(209, 250, 229)',
              'rgba(220, 38, 38)',
              'rgba(196, 181, 253)',
              'rgba(55, 48, 163)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          animateScale: true,
        },
      },
    })
  )
}

export const renderTotalSpending = (ctx, data) => {
  const newCtx = document.getElementById(ctx).getContext('2d')
  console.log(data)
  store.commit(
    'SET_CHART',
    new Chart(newCtx, {
      type: 'bar',
      data: {
        labels: ['総支出'],
        datasets: [
          {
            label: ['総支出'],
            data: [data],
            backgroundColor: ['rgba(252, 231, 243, 0.8)'],
            borderColor: ['rgba(252, 165, 165)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              callback: (value, index, values) => {
                return `${value}円`
              },
            },
          },
        },
        animation: {
          duration: 2000,
          animateScale: true,
        },
        indexAxis: 'y',
      },
    })
  )
}

export const renderMonthlySpending = (ctx, data, label) => {
  const newCtx = document.getElementById(ctx).getContext('2d')
  console.log(label)
  store.commit(
    'SET_CHART',
    new Chart(newCtx, {
      type: 'bar',
      data: {
        labels: label.reverse(),
        datasets: [
          {
            label: '過去の支出',
            data: data.reverse(),
            backgroundColor: ['rgba(110, 231, 183,0.8)'],
            borderColor: ['rgba(110, 231, 183)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          duration: 2000,
          animateScale: true,
        },
        plugins: {
          title: {
            display: true,
            text: '毎月の支出',
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value, index, values) => {
                return `${value}円`
              },
            },
          },
        },
      },
    })
  )
}
