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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {message && <p>{message}</p>}
        <p>
          <label>Username</label>
          <input type="text" {...register("username", { required: true })} />
          {errors.username && <span>!</span>}
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>!</span>}
        </p>
        <p>
          <button type="submit">Log in</button>
        </p>
      </form>
    </div>
  );
}
