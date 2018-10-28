const theme = {
  color:'#334',
  number: 1.2,
  multiInterval: function(m=1) { return `${this.number*m}vh`},
  get interval() {return `${this.number}vh`},
  main: '#0abbb5',
  red: '#ff3333',
  green: '#129866',
  dark: '#50639c',
  light: '#8a6bec',
  borderRadius: '5px'
}

export default theme
