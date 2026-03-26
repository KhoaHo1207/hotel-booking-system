export const generateAvatar = (fullName = "User") => {
  if (!fullName || typeof fullName !== "string") {
    return "https://ui-avatars.com/api/?name=User&length=1";
  }

  const trimmed = fullName.trim();

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    trimmed
  )}&length=1&rounded=true&background=random&color=fff`;
};
