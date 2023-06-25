// 在没有使用 css scope 技术之下实现不同页面间的样式隔离
export function createCssElement(url) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  return document.head.appendChild(link)
}
