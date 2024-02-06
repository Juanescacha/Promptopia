"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const UserProfilePage = ({ params }) => {
	const searchParams = useSearchParams()
	const [posts, setPosts] = useState([])

	const userame = searchParams.get("name")

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params.id}/prompts`)
			const data = await response.json()
			setPosts(data)
		}
		fetchPosts()
	}, [])

	return (
		<Profile
			name={userame}
			desc={`Welcome to ${userame} personalized profile page`}
			data={posts}
		/>
	)
}

export default UserProfilePage
