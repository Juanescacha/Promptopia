import { connectToDatabase } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async req => {
	const { userId, prompt, tag } = await req.json()

	try {
		// connect to db
		await connectToDatabase()

		// create new prompt
		const newPrompt = await Prompt.create({
			creator: userId,
			prompt,
			tag,
		})

		// return response with status
		return new Response(JSON.stringify(newPrompt), { status: 201 })
	} catch (error) {
		return new Response(
			JSON.stringify("Failed to create a new prompt", { status: 500 })
		)
	}
}
