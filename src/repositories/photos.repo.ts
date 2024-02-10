import { PhotoEntity } from "../db/entities/photo.entity.ts"
import dbConnector from "../db/db.connector.ts"

export const PhotoRepo = dbConnector.getRepository(PhotoEntity).extend({
	async get() {
		try {
			return await this.find()
		} catch (e) {
			console.log(`Failed get all photos on repo: ${e}`)
		}
	},
	async getById(id: string) {
		try {
			const photo = await this.findOneBy({ id })
			return photo
		} catch (e) {
			console.log(`Failed get one photo on repo: ${e}`)
		}
	},
	async createPhoto(name: string, img: Buffer) {
		try {
			const photo = this.create({ name, img })
			return await this.save(photo)
		} catch (e) {
			console.log(`Failed create new photo on repo: ${e}`)
		}
	},
	async updatePhoto(id: string, name: string, img: Buffer) {
		try {
			return await this.update(id, { name, img })
		} catch (e) {
			console.log(`Failed update one photo on repo: ${e}`)
		}
	},
	async deleteById(id: string) {
		try {
			return await this.delete({ id })
		} catch (e) {
			console.log(`Failed delete one photo on repo: ${e}`)
		}
	}
})
