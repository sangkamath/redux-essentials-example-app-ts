import { useAppDispatch } from "@/app/hook";

import type { Post, ReactionName } from "./postsSlice"
import { reactionAdded } from "./postsSlice";

const reactionEmoji: Record<ReactionName, string> = {
    thumbsUp: '👍',
    tada: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

interface ReactionButtonProps {
    post: Post
}

export const ReactionButtons = ({post}: ReactionButtonProps) => {
    const dispatch = useAppDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(
        ([stringName, emoji]) => {
            const reaction = stringName as ReactionName
            return (
                <button
                    key={reaction}
                    type="button"
                    className="muted-button reaction-button"
                    onClick={() => dispatch(reactionAdded({postId: post.id, reaction}))}
                >
                    {emoji} {post.reactions[reaction]}
                </button>
            )
        }
    )

    return <div>{reactionButtons}</div>
}