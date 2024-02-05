import { connectToDatabase } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async () => {
	try {
		// connect to db
		await connectToDatabase()

		// get all prompts
		const prompts = await Prompt.find({}).populate("creator")

		// return prompts
		return new Response(JSON.stringify(prompts), { status: 200 })
	} catch (error) {
		return new Response(
			JSON.stringify("Failed to fetch all prompts", { status: 500 })
		)
	}
}
