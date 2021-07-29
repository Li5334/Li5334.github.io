import _ from 'lodash';
import './style.css';
import './1.webp'
function component() {
    const element = document.createElement('div');
  
    // lodash（目前通过一个 script 引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    element.classList.add('hello');
    return element;
  }
  
document.body.appendChild(component());