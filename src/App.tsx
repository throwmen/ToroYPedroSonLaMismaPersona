import { ShowPair } from "./Components/ShowPair";

function App() {
  return (
    <>
      <hr />
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-semibold text-gray-800 relative">
          I am a title, and Pedro and Toro are the same person.
          <span className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 opacity-30 blur-md"></span>
          <span className="absolute inset-0 border border-gray-300 border-dashed rounded-full transform -rotate-6"></span>
        </h1>
      </div>
    <ShowPair />
    </>
  )
}

export default App
