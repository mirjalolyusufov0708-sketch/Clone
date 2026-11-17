import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://api.github.com/users/Muhammadamin201");
        setProfile(res.data);
      } catch (err) {
        console.error("Profile API xatosi:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="animate-pulse flex space-x-4"><div className="rounded-full bg-[#30363d] h-48 w-48"></div></div>;
  if (!profile) return <p className="text-[#f85149] text-sm">Ma'lumot olinmadi (Limit).</p>;

  return (
    <div className="flex flex-col items-center md:items-start">
      <img
        src={profile.avatar_url}
        alt="Avatar"
        className="w-48 h-48 rounded-full border-2 border-[#30363d] shadow-lg mb-4 object-cover"
      />
      <h2 className="text-2xl font-bold text-white">{profile.name || profile.login}</h2>
      <h4 className="text-xl text-[#8b949e] font-light mb-4">@{profile.login}</h4>

      <p className="text-[#c9d1d9] text-sm mb-4 text-center md:text-left">
        {profile.bio || "Foydalanuvchi o'zi haqida ma'lumot yozmagan."}
      </p>

      <div className="flex items-center gap-2 text-sm text-[#8b949e] mb-4">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 3.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0ZM2 13.5a5 5 0 0 1 10 0v.5H2v-.5Z" /></svg>
        <span><b className="text-[#c9d1d9]">{profile.followers}</b> followers</span>
        <span className="mx-1">•</span>
        <span><b className="text-[#c9d1d9]">{profile.following}</b> following</span>
      </div>

      <a
        href={profile.html_url}
        target="_blank"
        rel="noreferrer"
        className="w-full text-center bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] font-semibold py-1.5 px-4 rounded-md transition duration-200 text-sm"
      >
        GitHub profil
      </a>
    </div>
  );
}

export default Profile;