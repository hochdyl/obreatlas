'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import {UserService} from "@/services/user.service";
import {useRouter} from "next/navigation";

export default function Register()
{
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors, isValid}
  } = useForm<RegisterForm>()

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    UserService.RegisterUser(data).then(res => {
      localStorage.setItem('apiToken', res.apiToken)
      router.push('/')
    }).catch(e => {
      console.log('submit fail', e)
    })
  }

  return (
    <main>
      <h1>Register</h1>
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

        <input
            placeholder="confirm password"
            type="password"
            {...register("passwordConfirm", {
              required: true,
              validate: value => value === getValues().password
            })}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" disabled={!isValid}/>
      </form>
    </main>
  );
}