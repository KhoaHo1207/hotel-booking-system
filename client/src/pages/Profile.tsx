import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.ts";
import type { RootState } from "../store/store.ts";

export default function ProfilePage() {
  const { user, isUserLoading } = useSelector((state: RootState) => state.user);

  const welcomeMessage = useMemo(() => {
    if (!user) return "Xin chào khách!";
    const name = user.username.split(" ").slice(0, 3);
    console.log(name);

    return `Xin chào ${name || user.username}!`;
  }, [user]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900/90 to-black/80 px-4 py-12 text-white pt-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-2 rounded-3xl border border-white/20 bg-linear-to-br from-white/15 to-white/5 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.4rem] text-white/60">
            QuickStay Profile
          </p>
          <h1 className="text-3xl font-semibold text-white">
            {welcomeMessage}
          </h1>
          <p className="max-w-2xl text-base text-white/80">
            Quản lý thông tin cá nhân, đặt phòng và truy cập nhanh đến bảng điều
            khiển chủ khách sạn.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-white">
              Thông tin tài khoản
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-20 w-20 rounded-3xl border border-white/20 bg-white/30 p-3">
                <img
                  src={user?.image || assets.userIcon}
                  alt="avatar"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">
                  {user?.username ?? "Đang tải..."}
                </p>
                <p className="text-sm text-white/70">
                  {user?.email ?? "Email chưa có"}
                </p>
                <p className="text-xs uppercase text-white/50">
                  {user?.role ?? "Khách"}
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Đã tham gia</p>
                <p className="text-lg font-semibold text-white">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Cập nhật cuối</p>
                <p className="text-lg font-semibold text-white">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(user?.recentSearchedCities ?? []).map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white/80"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg">
            <h2 className="text-xl font-semibold text-white">
              Hành động nhanh
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                to="/my-bookings"
                className="flex items-center justify-between rounded-2xl border border-white/20 bg-slate-900/40 px-4 py-3 text-sm font-semibold transition hover:border-white/40"
              >
                <span>Đơn đặt phòng gần đây</span>
                <span className="text-xs uppercase text-white/60">Xem</span>
              </Link>
              <Link
                to="/owner"
                className="flex items-center justify-between rounded-2xl border border-white/20 bg-slate-900/40 px-4 py-3 text-sm font-semibold transition hover:border-white/40"
              >
                <span>Quản lý Dashboard</span>
                <span className="text-xs uppercase text-white/60">Mở</span>
              </Link>
              <Link
                to="/rooms"
                className="flex items-center justify-between rounded-2xl border border-white/20 bg-slate-900/40 px-4 py-3 text-sm font-semibold transition hover:border-white/40"
              >
                <span>Khám phá khách sạn</span>
                <span className="text-xs uppercase text-white/60">Tìm</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg">
          <h2 className="text-xl font-semibold text-white">
            Hoạt động gần đây
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Đang chờ xác nhận", "Trả phí tại chỗ", "Ưu đãi thành viên"].map(
              (label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200/20 bg-white/10 p-4 text-center text-sm font-semibold text-white/80 transition hover:border-slate-400/60"
                >
                  {label}
                </div>
              )
            )}
          </div>
        </section>

        {isUserLoading && (
          <p className="text-sm italic text-white/60">
            Đang tải dữ liệu hồ sơ...
          </p>
        )}
      </div>
    </div>
  );
}
