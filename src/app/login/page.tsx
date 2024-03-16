'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {UserService} from "@/services/userService";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginForm>()

  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    await UserService.registerUser(data)
  }

  return (
    <main>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="username" {...register("username", {required: true})} />
        {errors.username && <span>This field is required</span>}
        <input placeholder="password" {...register("password", {required: true})} />
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </main>
  );
}