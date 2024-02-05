"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

import Form from "@components/Form"

const EditPrompt = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const promptId = searchParams.get("id")

	const [post, setPost] = useState({
		prompt: "",
		tags: "",
	})
	const [submitting, setSubmitting] = useState(false)

	const updatePrompt = async e => {
		e.preventDefault()
		setSubmitting(true)

		if (!promptId) return alert("Prompt ID not found")

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify(post),
			})

			if (response.ok) {
				router.push("/")
			}
		} catch (error) {
			console.log(error)
		} finally {
			setSubmitting(false)
		}
	}

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`)
			const data = await response.json()

			setPost(data)
		}

		if (promptId) {
			getPromptDetails()
		}
	}, [promptId])

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	)
}

const EditPage = () => {
	return (
		<Suspense>
			<EditPrompt />
		</Suspense>
	)
}

export default EditPage
