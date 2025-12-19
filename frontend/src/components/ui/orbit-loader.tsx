"use client"
import { useEffect } from 'react'

export default function OrbitLoader() {
  useEffect(() => {
    async function getLoader() {
      const { orbit } = await import('ldrs')
      orbit.register()
    }
    getLoader()
  }, [])

  return (
      // @ts-ignore
      <l-orbit size="35" speed="1.5" color="white" ></l-orbit>
  )
}
