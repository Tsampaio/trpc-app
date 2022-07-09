import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'


const Home: NextPage = () => {
  const [loaded, setLoaded] = useState(false)
  const [first, second] = getOptionsForVote()

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (loaded) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center">Which Pokemon is rounder</div>
        <div className="p-2"></div>
        <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
          <div className="w-16 h-16 bg-red-800">{first ?? 1}</div>
          <div className="p-8">Vs</div>
          <div className="w-16 h-16 bg-red-800">{second ?? 2}</div>
        </div>
      </div>
    )
  }

  // return <div>Loading...</div>
}

export default Home