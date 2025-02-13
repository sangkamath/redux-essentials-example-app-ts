import React from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hook"
import { selectAllUsers } from "../users/usersSlice"

import { userLoggedIn } from "./authSlice"

interface LoginPageFormFields extends HTMLFormControlsCollection {
    username: HTMLSelectElement
}

interface LoginPageFormElements extends HTMLFormElement {
    readonly elements: LoginPageFormFields
}

export const LoginPage = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectAllUsers)
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<LoginPageFormElements>) => {
        e.preventDefault()

        const username = e.currentTarget.elements.username.value
        console.log(username)
        dispatch(userLoggedIn(username))
        navigate('/posts')
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.name}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Welcome to Tweeter!</h2>
            <h3>Please log in:</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">User:</label>
                <select id="username" name="username" required>
                    <option value="">
                    </option>
                    {userOptions}
                </select>
                <button>Log In</button>
            </form>
        </section>
    )
}