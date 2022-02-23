import React, { ChangeEvent, DragEvent, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { callInLine } from 'utils'
import * as upload from './helper'

interface Props {
	form: React.RefObject<HTMLFormElement>
	container: React.RefObject<HTMLDivElement>
	onFormSubmit?: (props?: any) => any
	bikeId: string | undefined
	defaultValue?: string
}

export const ImageUploader: React.FC<Props> = ({ form, container, onFormSubmit, bikeId, defaultValue }) => {

	const input = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (defaultValue) {
			fetch(defaultValue)
				.then(r => r.blob())
				.then(imageBlob => {
					upload.updateThumbnail(container.current as HTMLElement, new File([imageBlob], 'bike.png', { type: 'image/' }))
				})	
		}
	}, [defaultValue])

	useEffect(() => {
		//As soon as we get the Bike ID, we should force the onSubmit to be updated.
		upload.savingImage(
			input.current as HTMLElement,
			{ target: input.current } as unknown as ChangeEvent<HTMLInputElement>,
			container.current,
			form.current,
			bikeId,
			onFormSubmit
		)
	}, [bikeId])

	const onClick = () => input.current?.click()
	const onChange = (e: ChangeEvent<HTMLInputElement>) => upload.savingImage(input.current as HTMLElement, e, container.current, form.current, bikeId, onFormSubmit)
	const onDrop = (e: DragEvent) => upload.savingImage(input.current as HTMLElement, e, container.current, form.current, bikeId, onFormSubmit)
	const onDragOver = (e: DragEvent) => callInLine(e.preventDefault, () => e.currentTarget.classList.add('active'))
	const onDragLeave = (e: DragEvent) => e?.currentTarget?.classList.remove('active')
	const onDragEnd = (e: DragEvent) => e.currentTarget.classList.remove('active')

	return (
		<Div {...{ onDrop, onDragOver, onDragLeave, onDragEnd }}>
			<h1>File Upload</h1>
			<form ref={form} id="form">
				<div className="file_holder" onClick={onClick} ref={container}>Click or Drop here</div>
				<input
					ref={input}
					onChange={onChange}
					type="file"
					name="myFile"
					id="file_uploader"
					multiple
					title="Upload a file clicking or dropping here."
					accept="image/x-png,image/jpeg"
				/>
			</form>
		</Div>
	)
}

const Div = styled.div`
	width: 100%;
	height: 100%;
	form {
			width: 100%;
			height: 300px;
			display: flex;
			margin-top: 10px;
			flex-direction: column;
			justify-content: center;
			position: relative;
	}
	#file_uploader {
			width: 50%;
			height: 70%;
			left: 50%;
			top: 40px;
			transform: translateX(-50%);
			position: absolute;
			opacity: 0;
			background-color: rgba(200, 0, 0, 0.1);
	}
	.file_holder {
			width: 100%;
			height: 100%;
			margin: 40px auto;
			outline: none;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgba(0, 0, 0, 0.1);
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
			border-radius: 10px;
			appearance: none;
			font-family: sans-serif;
			z-index: 2;
	}

	.file_holder.active {
			border: 2px solid red;
	}
	.file_holder.done {
			border: 2px solid green;
	}

	.submit_button {
			width: 100%;
			max-width: 200px;
			margin: 30px auto;
			appearance: none;
			padding: 10px 20px;
			-webkit-appearance: none;
			background-color: #efefef;
			color: #444;
			border-radius: 5px;
			border: none;
	}
	.submit_button:hover {
			cursor: pointer;
	}
`