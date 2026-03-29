import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { register } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/store";
import type { RegisterPayload } from "../types/index";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = useCallback(
    (payload: RegisterPayload) => {
      dispatch(register(payload))
        .unwrap()
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          // allow retry, errors handled via toast
        });
    },
    [dispatch, navigate],
  );

  const switchToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900/90 to-black/80 px-4 py-12">
      <RegisterForm
        onSubmit={handleRegister}
        onSwitchToLogin={switchToLogin}
        className="max-w-xl"
      />
    </div>
  );
}
