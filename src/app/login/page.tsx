'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {UserService} from "@/services/user.service";

export default function Login()
{
  const {
    register,
    handleSubmit,
    formState: {errors},
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
        <input placeholder="username" {...register("username", {required: true})} />
        {errors.username && <span>This field is required</span>}
        <input placeholder="password" {...register("password", {required: true})} />
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </main>
  );
}