import { Toggle } from 'components/atoms'
import { SideMenu } from 'components/organisms'
import { useSideMenu } from 'hooks/sideMenu'
import React from 'react'
import styled from 'styled-components'

interface Props {
	title: string
	role: string
}

export const CreateEdit: React.FC<Props> = ({ title, role, children }) => {
	const { toggle, isOpen } = useSideMenu()
	
	const isAdmin = (role === 'admin')

	return (
		<Div>
			<div className="header">
				<div className="left">
					<h1 className="page_title">{'Admin'}</h1>
					<h2 className="subtitle">{title}</h2>
				</div>

				<div className="right">
					{isAdmin && <button className='header_button' onClick={toggle}><Toggle isActive={isOpen} /></button>}
				</div>
			</div>

			<div className="container">
				{children}
			</div>

			<SideMenu />	
		</Div>
	)
}

const Div = styled.div`
	width: 100%;

	.container {
		max-width: 550px;
		margin: auto;
	}
	
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