import { act, renderHook } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { useLocalStorage } from './useLocalStorage'

afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

test('falls back to the initial value when nothing is stored', () => {
  const { result } = renderHook(() => useLocalStorage('count', 0))
  expect(result.current[0]).toBe(0)
})

test('reads an existing stored value', () => {
  localStorage.setItem('count', '42')
  const { result } = renderHook(() => useLocalStorage('count', 0))
  expect(result.current[0]).toBe(42)
})

test('persists updates', () => {
  const { result } = renderHook(() => useLocalStorage('count', 0))
  act(() => result.current[1](7))
  expect(result.current[0]).toBe(7)
  expect(localStorage.getItem('count')).toBe('7')
})

test('remove clears storage and restores the initial value', () => {
  const { result } = renderHook(() => useLocalStorage('count', 0))
  act(() => result.current[1](7))
  act(() => result.current[2]())
  expect(result.current[0]).toBe(0)
  expect(localStorage.getItem('count')).toBeNull()
})

test('picks up a change from another tab', () => {
  const { result } = renderHook(() => useLocalStorage('count', 0))
  act(() => {
    window.dispatchEvent(new StorageEvent('storage', { key: 'count', newValue: '99' }))
  })
  expect(result.current[0]).toBe(99)
})

test('survives storage being unavailable', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('denied')
  })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('denied')
  })
  const { result } = renderHook(() => useLocalStorage('count', 0))
  expect(result.current[0]).toBe(0)
  act(() => result.current[1](3))
  expect(result.current[0]).toBe(3)
})
