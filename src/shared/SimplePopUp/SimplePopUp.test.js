/* eslint-disable no-undef */

import React from 'react'

import { render } from '@testing-library/react'

import SimplePopUp from './SimplePopUp'

test('renders with a title', () => {
  const title = 'Any Title'
  const { queryByText } = render(<SimplePopUp openPopup={true} title={title}></SimplePopUp>)
  const linkElement = queryByText(title)

  expect(linkElement).toBeInTheDocument()
})

test('renders without title', () => {
  const title = 'Any Title'
  const { queryByText } = render(<SimplePopUp openPopup={true}></SimplePopUp>)
  const linkElement = queryByText(title)

  expect(linkElement).not.toBeInTheDocument()
})
