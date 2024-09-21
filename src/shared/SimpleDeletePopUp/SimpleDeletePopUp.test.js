/* eslint-disable no-undef */

import React from 'react'

import { render } from '@testing-library/react'

import SimpleDeletePopUp from './SimpleDeletePopUp'

test('renders with actions column', () => {
  const model = "Delete"
  const text = "Confirmation"
const { getByText } = render(<SimpleDeletePopUp openDeletePopup={true} model={model} />)
const linkElement = getByText(text)

expect(linkElement).toBeInTheDocument()
})
