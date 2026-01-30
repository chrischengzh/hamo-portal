import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Hamo Portal</h1>
        <p className="text-gray-600 mb-6">
          欢迎来到 Hamo AI 心理治疗平台门户
        </p>
        <div className="space-y-4">
          <a
            href="https://pro.hamo.ai"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition duration-200"
          >
            治疗师平台
          </a>
          <a
            href="https://client.hamo.ai"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition duration-200"
          >
            患者应用
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
