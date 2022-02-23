import { Api } from "api"

/**
 * 
 * @param {HTMLElement} dropArea
 * @param {ChangeEvent<any>} e 
 */

export const savingImage = (dropArea, e, imageHolder, form, bikeId, onFormSubmit) => {
    const files = e.target.files || e.dataTransfer.files

    e?.preventDefault?.()
    sendFiles(form, files, bikeId, onFormSubmit)
    
    if (files.length) {
        const isImageFiles = checkIsImageFiles(files)
        
        imageHolder.classList.replace('highlighted', 'done')

        if (isImageFiles) return (dropArea.files = files) && updateThumbnail(imageHolder, files[0])
    }

    imageHolder.style.backgroundImage = `none`
    imageHolder.innerHTML = 'Click or Drop an image here'
}

/**
 * Updates the thumbnails with the image file.
 * 
 * @param {HTMLElement} dropArea 
 * @param {File} file 
 */

export const updateThumbnail = (dropArea, file) => {

    if (file.type.startsWith('image/')) {

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            dropArea.style.backgroundImage = `url("${reader.result}")`
            dropArea.innerHTML = ''
        }
    }
}

/**
 * Return boolean if the filelist has only images
 * @param {FileList} files
 */

export const checkIsImageFiles = (files) => {
    let result = true
    for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith('image/')) return alert('Only images are accepted!') || false
    }
    return result
}


// uploading files

/**
 * 
 * @param {HTMLFormElement} form 
 * @param {FileList} files 
 * @returns {Promise<HttpResponse>}
 */

export const sendFiles = (form, files, bikeId, onFormSubmit = () => {}) => {
    form.onsubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('image', files[0], 'image.png')

				try {

					if (!bikeId) throw Error('Error to upload image.')

					const response = await Api.post(`bike/image/${bikeId}`, data)
					onFormSubmit(response.data.image)
					return response
				} catch (error) {
					throw Error('Error to upload image.')
				}
    }
}


