import { useState } from "react";
import { useForm } from "react-hook-form";
import { pb } from "./api";
import { Collections } from "./book-types";

export function Login({ onLogin }: { onLogin: () => void }) {
  const [message, setMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ username, password }: any) => {
    setMessage("");
    try {
      await pb
        .collection(Collections.Users)
        .authWithPassword(username, password);
      onLogin();
    } catch (error) {
      setMessage("username or password is incorrect");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-cyan-500 to-blue-900 p-4">
      <form
        className="mx-auto flex w-96 flex-col gap-4 rounded-xl bg-sky-800 p-4 text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        {message && <p>{message}</p>}
        <p className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            placeholder=""
            type="text"
            className="px-2 h-8 rounded-xl leading-8 text-black"
            {...register("username", { required: true })}
          />
          {errors.username && <span>!</span>}
        </p>
        <p className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder=""
            className="px-2 h-8 rounded-xl leading-8 text-black"
            {...register("password", { required: true })}
          />
          {errors.password && <span>!</span>}
        </p>
        <p>
          <button className="bg-yellow-400 rounded-sm h-8 w-20 text-black" type="submit">Log in</button>
        </p>
      </form>
    </div>
  );
}
