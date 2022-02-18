import React, { useState } from 'react'
import styled from 'styled-components'

import { FilterIcon, Toggle } from 'components/atoms'
import { FilterOptions } from 'components/organisms'

interface Props {
	tab: 'Bikes' | 'Users'
	role: 'admin' | 'user'
}

export const HomeLists: React.FC<Props> = ({ role, tab, children }) => {

	const [filterOptions, setfilterOptions] = useState(false)
	const isAdmin = (role === 'admin')

	const toggleFilterOptions = () => setfilterOptions(state => !state)

	return (
		<Div>
			<div className="header">
				<div className="left">
					<h1 className="page_title">{isAdmin ? 'Admin' : 'Discover'}</h1>
					<h2 className="subtitle">{tab}</h2>
				</div>

				<div className="right">
					<button className='filter_button' onClick={toggleFilterOptions}>
						<FilterIcon />
					</button>
					{isAdmin && <Toggle />}
				</div>
			</div>
			{children}
			<FilterOptions isOpen={filterOptions} />
		</Div>
	)
}

const Div = styled.div`
	width: 100%;

	.header {
		width: 90%;
		margin: 1.5rem auto 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.page_title {
		text-align: center;
		font-size: 3rem;
		font-weight: bold;
		margin: 0;
		color: var(--primary-text);
	}

	.subtitle {
		font-size: 2.3rem;
		margin: 0;
		color: var(--secondary-text);
		line-height: 0rem;
	}

	.filter_button {
		background: transparent;
		border: none;
		cursor: pointer;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 2rem;
	}
`