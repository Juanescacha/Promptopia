"use client"

import { useState, useEffect } from "react"

import PromptCard from "@components/PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map(prompt => (
				<PromptCard
					key={prompt._id}
					post={prompt}
					handleTagClick={handleTagClick}
					handleEdit={() => {}}
					handleDelete={() => {}}
				/>
			))}
		</div>
	)
}

const Feed = () => {
	const [searchText, setSearchText] = useState("")
	const [posts, setPosts] = useState([])

	const handleSearchTextChange = e => {
		setSearchText(e.target.value)
	}

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt")
			const data = await response.json()

			setPosts(data)
		}

		fetchPosts()
	}, [])

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchTextChange}
					className="search_input"
					required
				/>
			</form>
			<PromptCardList
				data={posts}
				handleTagClick={() => {}}
			/>
		</section>
	)
}

export default Feed
