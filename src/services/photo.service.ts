import { PhotoRepo } from "../repositories/photos.repo.ts"

export default class PhotoService {
	private photoRepo

	constructor() {
		this.photoRepo = PhotoRepo
	}

	async get() {
		try {
			return await this.photoRepo.get()
		} catch (e) {
			console.log(`Failed get all photos on service: ${e}`)
		}
	}

	async getById(id: string) {
		try {
			return await this.photoRepo.getById(id)
		} catch (e) {
			console.log(`Failed get one photo on service: ${e}`)
		}
	}

	async create(name: string, img: Buffer) {
		try {
			return await this.photoRepo.createPhoto(name, img)
		} catch (e) {
			console.log(`Failed create new photo on service: ${e}`)
		}
	}

	async update(id: string, name: string, img: Buffer) {
		try {
			return await this.photoRepo.updatePhoto(id, name, img)
		} catch (e) {
			console.log(`Failed update one photo on service: ${e}`)
		}
	}

	async deleteById(id: string) {
		try {
			return await this.photoRepo.deleteById(id)
		} catch (e) {
			console.log(`Failed delete one photo on service: ${e}`)
		}
	}
}
