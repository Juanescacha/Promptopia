import { connectToDatabase } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, { params }) => {
	try {
		await connectToDatabase()

		const prompt = await Prompt.findById(params.id).populate("creator")

		if (!prompt) {
			return new Response(JSON.stringify("Prompt not found"), {
				status: 404,
			})
		}

		return new Response(JSON.stringify(prompt), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify("Failed to fetch prompt"), {
			status: 500,
		})
	}
}

export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json()
	try {
		await connectToDatabase()

		const existingPrompt = await Prompt.findById(params.id)

		if (!existingPrompt) {
			return new Response(JSON.stringify("Prompt not found"), {
				status: 404,
			})
		}
		existingPrompt.prompt = prompt
		existingPrompt.tag = tag

		await existingPrompt.save()

		return new Response(JSON.stringify("Successfully updated the Prompt"), {
			status: 200,
		})
	} catch (error) {
		return new Response(JSON.stringify("Failed to update prompt"), {
			status: 500,
		})
	}
}

export const DELETE = async (req, { params }) => {
	try {
		await connectToDatabase()

		const deletedPrompt = await Prompt.findByIdAndDelete(params.id)

		if (!deletedPrompt) {
			return new Response(JSON.stringify("Prompt not found"), {
				status: 404,
			})
		}

		return new Response(JSON.stringify(deletedPrompt), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify("Failed to delete prompt"), {
			status: 500,
		})
	}
}
