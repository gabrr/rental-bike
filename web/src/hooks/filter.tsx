import React from 'react'
import { FilterContext } from 'contexts/filter'

export const useFilter = () => React.useContext(FilterContext)