import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "../components/LoginForm";
import { login, getProfile } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/store";
import type { LoginPayload } from "../types";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    (payload: LoginPayload) => {
      dispatch(login(payload))
        .unwrap()
        .then(() => {
          dispatch(getProfile());
          navigate("/");
        })
        .catch(() => {
          // keep on page for retry; errors shown via toast from thunk
        });
    },
    [dispatch, navigate]
  );

  const switchToRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900/90 to-black/80 px-4 py-12">
      <LoginForm onSubmit={handleLogin} onSwitchToRegister={switchToRegister} />
    </div>
  );
}
