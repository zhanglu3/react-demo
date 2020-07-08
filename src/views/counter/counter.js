import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';

const Counter = () => {
  const [count, setCount] = useState(0)

  const handleAlertClick = () => {
    setTimeout(() => {
      alert(`Yout clicked me: ${count}`)
    }, 3000)
  }

  useEffect(() => {
    setTimeout(() => {
      console.log(`Yout clicked ${count} times`)
    }, 3000)
  })

  return (
    <div className="pg_counter">
      <p>Test exp2</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  )
}

export default Counter
// ReactDOM.render(
//   <Counter />,
//   document.getElementById('root')
// );