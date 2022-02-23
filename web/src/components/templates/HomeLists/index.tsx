import React from 'react'
import styled from 'styled-components'

import { FilterIcon, Toggle } from 'components/atoms'
import { useSideMenu } from 'hooks/sideMenu'
import { useFilter } from 'hooks/filter'

interface Props {
	tab: 'Bikes' | 'Users'
	role: string
	hideFilter?: boolean
}

export const HomeLists: React.FC<Props> = ({ role, tab, hideFilter, children }) => {

	const { isOpen: isMenuOpen, toggle: toggleMenu } = useSideMenu()
	const { toggle: toggleFilter } = useFilter()

	const isAdmin = (role === 'admin')

	return (
		<Div>
			<div className="header">
				<div className="left">
					<h1 className="page_title">{isAdmin ? 'Admin' : 'Discover'}</h1>
					<h2 className="subtitle">{tab}</h2>
				</div>

				<div className="right">
					{!hideFilter && <button className='header_button' onClick={toggleFilter}>
						<FilterIcon />
					</button>}
					<button className='header_button' onClick={toggleMenu}><Toggle isActive={isMenuOpen} /></button>
				</div>
			</div>

			<div className="home_list">
				{children}
			</div>

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

	.home_list {
		display: flex;
		flex-direction: column;
		gap: 1.7rem;

		@media screen and (min-width: 850px) {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr;
    	margin: auto;
		}
	}
`