"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	const { data: session } = useSession()
	const pathName = usePathname()

	const [copied, setCopied] = useState("")

	const handleCopy = () => {
		setCopied(post.prompt)
		navigator.clipboard.writeText(post.prompt)
		setTimeout(() => {
			setCopied("")
		}, 3000)
	}

	const route =
		post.creator._id === session?.user.id
			? "/profile"
			: `/profile/${post.creator._id}?name=${post.creator.username}`

	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<Link
					href={route}
					className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
					<Image
						src={post.creator.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>
					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{post.creator.username}
						</h3>
						<p className="font-inter text-gray-500 text-sm">
							{post.creator.email}
						</p>
					</div>
				</Link>
				<div
					className="copy_btn"
					onClick={handleCopy}>
					<Image
						src={
							copied === post.prompt
								? "/assets/icons/tick.svg"
								: "/assets/icons/copy.svg"
						}
						width={12}
						height={12}
						alt="copy_icon"
					/>
				</div>
			</div>
			<p className="my-4 font-satoshi text-sm text-gray-700">
				{post.prompt}
			</p>
			<p
				onClick={() => handleTagClick && handleTagClick(post.tag)}
				className="font-inter text-sm blue_gradient cursor-pointer">
				#{post.tag}
			</p>

			{session?.user.id === post.creator._id &&
				pathName === "/profile" && (
					<div className="flex gap-4 flex-center border-t border-gray-100 pt-3 mt-5">
						<p
							onClick={handleEdit}
							className="font-inter text-sm green_gradient cursor-pointer">
							Edit
						</p>
						<p
							onClick={handleDelete}
							className="font-inter text-sm orange_gradient cursor-pointer">
							Delete
						</p>
					</div>
				)}
		</div>
	)
}

export default PromptCard
