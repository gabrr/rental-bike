import { Toggle } from 'components/atoms'
import { SideMenu } from 'components/organisms'
import React, { useState } from 'react'
import styled from 'styled-components'

interface Props {
	title: string
	role: string
}

export const CreateEdit: React.FC<Props> = ({ title, role, children }) => {
	const [sideMenu, setsideMenu] = useState(false)
	
	const isAdmin = (role === 'admin')

	const toggleSideMenu = () => setsideMenu(state => !state)

	return (
		<Div>
			<div className="header">
				<div className="left">
					<h1 className="page_title">{'Admin'}</h1>
					<h2 className="subtitle">{title}</h2>
				</div>

				<div className="right">
					{isAdmin && <button className='header_button' onClick={toggleSideMenu}><Toggle isActive={sideMenu} /></button>}
				</div>
			</div>

			{children}

			<SideMenu isOpen={sideMenu} />	
		</Div>
	)
}

const Div = styled.div`
	width: 100%;
	
	.header {
		width: 90%;
		min-height: 90px;
		margin: 1.5rem auto 0;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.page_title {
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
`