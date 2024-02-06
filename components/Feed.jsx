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
	const [allPosts, setAllPosts] = useState([])

	const handleSearchTextChange = e => {
		setSearchText(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()
	}

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt")
			const data = await response.json()

			setPosts(data)
			setAllPosts(data)
		}

		fetchPosts()
	}, [])

	useEffect(() => {
		const filteredPosts = allPosts.filter(post => {
			if (searchText === "") return true
			const text = searchText.toLowerCase()
			const tag = post.tag.toLowerCase()
			const username = post.creator.username.toLowerCase()
			const prompt = post.prompt.toLowerCase()
			return (
				tag.includes(text) ||
				username.includes(text) ||
				prompt.includes(text)
			)
		})
		setPosts(filteredPosts)
	}, [searchText])

	return (
		<section className="feed">
			<form
				className="relative w-full flex-center"
				onSubmit={handleSubmit}>
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
