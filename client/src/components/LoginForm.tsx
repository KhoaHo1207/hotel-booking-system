import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { assets } from "../assets/assets.ts";

export type Credentials = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSubmit?: (credentials: Credentials) => void;
  className?: string;
  onSwitchToRegister?: () => void;
};

export default function LoginForm({
  onSubmit,
  className,
  onSwitchToRegister,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.({ email, password });
    },
    [email, password, onSubmit]
  );

  return (
    <div
      className={`relative w-full max-w-lg rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-black/10 lg:p-10 ${
        className ?? ""
      }`}
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.3rem] text-slate-400">
          QuickStay
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Chào mừng trở lại
        </h2>
        <p className="text-base text-slate-500">
          Đăng nhập để tiếp tục nhanh hơn, xem đặt phòng và nhận ưu đãi cá nhân
          hóa.
        </p>
      </div>

      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Email
          <input
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 transition focus:border-slate-400 focus:outline-none"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Mật khẩu
          <input
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 transition focus:border-slate-400 focus:outline-none"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </label>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-slate-700 focus:ring-slate-500"
            />
            Ghi nhớ tôi
          </label>
          <button type="button" className="font-semibold text-slate-700">
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
        >
          Đăng nhập
        </button>
      </form>

      <div className="mt-8 flex items-center justify-between text-sm text-slate-500">
        <span className="flex-1 border-t border-slate-200" />
        <span className="px-3">hoặc đăng nhập với</span>
        <span className="flex-1 border-t border-slate-200" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { name: "Facebook", icon: assets.facebookIcon },
          { name: "Instagram", icon: assets.instagramIcon },
          { name: "Twitter", icon: assets.twitterIcon },
          { name: "LinkedIn", icon: assets.linkendinIcon },
        ].map((provider) => (
          <button
            key={provider.name}
            type="button"
            className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            <img
              src={provider.icon}
              alt={`${provider.name} icon`}
              className="h-5 w-5"
            />
            {provider.name}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          className="font-semibold text-slate-900"
          onClick={onSwitchToRegister}
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
}
