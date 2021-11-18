export const selectAges = [
  { id: '10代', value: '10代' },
  { id: '20代', value: '20代' },
  { id: '30代', value: '30代' },
  { id: '40代', value: '40代' },
  { id: '50代', value: '50代' },
  { id: '60代以上', value: '60代以上' },
]

export const selectAnnualIncoms = [
  { id: '~199万', value: '~199万' },
  { id: '200~299万', value: '200~299万' },
  { id: '300~399万', value: '300~399万' },
  { id: '400~499万', value: '400~499万' },
  { id: '500~599万', value: '500~599万' },
  { id: '600万~', value: '600万~' },
]

export const selectFamilyMembers = [
  { id: '単身', value: '単身' },
  { id: '夫婦', value: '夫婦' },
  { id: '夫婦 + 子1人', value: '夫婦 + 子1人' },
  { id: '夫婦 + 子2人', value: '夫婦 + 子2人' },
  { id: '夫婦 + 子3人', value: '夫婦 + 子3人' },
  { id: '夫婦 + 子4人以上', value: '夫婦 + 子4人以上' },
]

export const getNow = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  if (month === 1) {
    return [
      {
        id: { year: year - 1, month: month + 11 },
        value: { year: year - 1, month: month + 11 },
      },
      { id: { year, month }, value: { year, month } },
      { id: { year, month: month + 1 }, value: { year, month: month + 1 } },
    ]
  } else if (month === 12) {
    return [
      { id: { year, month: month - 1 }, value: { year, month: month - 1 } },
      { id: { year, month }, value: { year, month } },
      {
        id: { year: year + 1, month: month - 11 },
        value: { year: year + 1, month: month - 11 },
      },
    ]
  } else {
    return [
      { id: { year, month: month - 1 }, value: { year, month: month - 1 } },
      { id: { year, month }, value: { year, month } },
      { id: { year, month: month + 1 }, value: { year, month: month + 1 } },
    ]
  }
}
