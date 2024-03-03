import { Request, Response } from "express"
import PhotoService from "../services/photo.service.js"
import { Readable } from "readable-stream"

class PhotoController {
	private photoService

	constructor() {
		this.photoService = new PhotoService()
	}

	get = async (req: Request, res: Response) => {
		try {
			const photo = await this.photoService.get()
			if (!photo) throw Error("No find photo by select id")
			const encoded = (await this.photoService.get())?.map((image) => image.img.toString("base64"))
			res.status(200).json({ success: true, data: { imgs: encoded } })
		} catch (e) {
			res.status(404).json({ success: false, message: `${e}` })
			console.log(`Failed get all photos on controller: ${e}`)
		}
	}

	getById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const photo = await this.photoService.getById(id)
			if (!photo) throw Error("No find photo by select id")
			const readable = new Readable({
				read() {
					this.push(photo.img)
					this.push(null)
				}
			})
			res.set("Content-disposition", `attachment; filename=${photo.name}`)
			res.set("Content-Type", `image/${photo.name.split(".").pop()}`)
			readable.pipe(res)
		} catch (e) {
			res.status(404).json({ success: false, message: `${e}` })
			console.log(`Failed get one photo on controller: ${e}`)
		}
	}

	create = async (req: Request, res: Response) => {
		try {
			const file = req.file
			if (!file) throw Error("No find photo by select id")
			await this.photoService.create(file.originalname, file.buffer)
			res.status(201).json({ success: true, message: "Photo is upload" })
		} catch (e) {
			res.status(404).json({ success: false, message: `${e}` })
			console.log(`Failed create new photo on controller: ${e}`)
		}
	}

	update = async (req: Request, res: Response) => {
		try {
			const {
				params: { id },
				file
			} = req
			if (!file) throw Error("No find photo by select id")
			await this.photoService.update(id, file.originalname, file.buffer)
			res.status(204).json({ success: true, message: "Photo is update" })
		} catch (e) {
			res.status(404).json({ success: false, message: `${e}` })
			console.log(`Failed update one photo on controller: ${e}`)
		}
	}

	deleteById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			res.status(204).json(await this.photoService.deleteById(id))
		} catch (e) {
			res.status(404).json({ success: false, message: `${e}` })
			console.log(`Failed delete one photo on controller: ${e}`)
		}
	}
}

export default new PhotoController()
