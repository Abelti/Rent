function App() {
  const handleClick = () => {
    console.log('Button clicked');
    // Perform your desired action here

  }

  return (
    <div>
      <h1>Welcome to My Application</h1>
      <button onClick={() => handleClick()}>Click Me</button>
    </div>
  )
}

export default App