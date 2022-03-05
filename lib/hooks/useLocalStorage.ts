import { useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storeValue, setStoreValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (e) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore =
      value instanceof Function ? value(storeValue) : value

    setStoreValue(valueToStore)

    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [storeValue, setValue] as const
}
