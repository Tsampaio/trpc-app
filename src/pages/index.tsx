import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'


const Home: NextPage = () => {
  const [firstNumber, setFirstNumber] = useState(0)
  const [secondNumber, setSecondNumber] = useState(0)

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: firstNumber }])
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: secondNumber }])

  console.log(firstPokemon)

  useEffect(() => {
    const [first, second] = getOptionsForVote()
    setFirstNumber(first)
    setSecondNumber(second)
  }, [])

  if (!firstPokemon || firstPokemon.isLoading || secondPokemon.isLoading) return null

  // if (loaded) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is rounder</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-64 flex flex-col">
          {firstPokemon.data?.sprites.front_default &&
            <Image src={firstPokemon.data?.sprites.front_default}
              width={256}
              height={256}
              layout="fixed" alt={firstPokemon.data?.name} />
          }
          <div className="text-xl text-center capitalize mt-[-rem]">{firstPokemon.data?.name}</div>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          {secondPokemon.data?.sprites.front_default &&
            <Image src={secondPokemon.data?.sprites.front_default} width={256}
              height={256}
              layout="fixed"
              alt={secondPokemon.data?.name} />
          }
          <div className="text-xl text-center capitalize mt-[-rem]">
            {secondPokemon.data?.name}
          </div>
        </div>
      </div>
    </div>
  )
  // }

  // return <div>Loading...</div>
}

export default Home