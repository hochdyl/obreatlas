'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {UserService} from "@/services/user.service";
import Link from "next/link";

type LoginForm = {
  username: string
  password: string
}

export default function Login()
{
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<LoginForm>()

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    UserService.RegisterUser(data).then(res => {
      console.log('submit finish', res.apiToken)}
    ).catch(e => {
      console.log('submit fail', e)
    })
  }

  return (
    <main>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
            placeholder="username"
            {...register("username", {
              required: true
            })}
        />
        {errors.username && <span>This field is required</span>}

        <input
            placeholder="password"
            type="password"
            {...register("password", {
              required: true
            })}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" disabled={!isValid}/>
      </form>
      <Link href={'/register'}>Register</Link>
    </main>
  );
}