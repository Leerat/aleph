const normalize = array => array.reduce((acc, item) => {
  acc[item.id]=item
  return acc
}, {})
export default normalize
