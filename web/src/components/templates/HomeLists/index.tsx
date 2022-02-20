import React, { useState } from 'react'
import styled from 'styled-components'

import { FilterIcon, Toggle } from 'components/atoms'
import { FilterOptions, SideMenu } from 'components/organisms'

interface Props {
	tab: 'Bikes' | 'Users'
	role: 'admin' | 'user'
	hideFilter?: boolean
}

export const HomeLists: React.FC<Props> = ({ role, tab, hideFilter, children }) => {

	const [filterOptions, setfilterOptions] = useState(false)
	const [sideMenu, setsideMenu] = useState(false)
	const isAdmin = (role === 'admin')

	const toggleFilterOptions = () => setfilterOptions(state => !state)

	const toggleSideMenu = () => setsideMenu(state => !state)

	return (
		<Div>
			<div className="header">
				<div className="left">
					<h1 className="page_title">{isAdmin ? 'Admin' : 'Discover'}</h1>
					<h2 className="subtitle">{tab}</h2>
				</div>

				<div className="right">
					{!hideFilter && <button className='header_button' onClick={toggleFilterOptions}>
						<FilterIcon />
					</button>}
					{isAdmin && <button className='header_button' onClick={toggleSideMenu}><Toggle isActive={sideMenu} /></button>}
				</div>
			</div>

			<div className="list">
				{children}
			</div>

			<FilterOptions isOpen={filterOptions} />
			<SideMenu isOpen={sideMenu} toggleSideMenu={toggleSideMenu} />

		</Div>
	)
}

const Div = styled.div`
	width: 100%;
	padding-bottom: 4rem;
	
	.header {
		width: 90%;
		min-height: 90px;
		margin: 1.5rem auto 0;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
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

	.header_button {
		background: transparent;
		border: none;
		cursor: pointer;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 1.7rem;
	}
`