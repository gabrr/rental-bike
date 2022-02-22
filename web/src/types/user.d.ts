export interface IUSer {
	name: string
	email: string
	role: string
	password: string
}

export interface IUserResponse {
	"_id": string
	"name": string
	"email": string
	"role": string
	"createdAt": string
	"updatedAt": string
}