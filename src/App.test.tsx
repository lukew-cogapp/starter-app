import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App'

test('renders the heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Starter App' })).toBeInTheDocument()
})

test('footer links to the repo', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: 'View on GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/lukew-cogapp/starter-app',
  )
})
