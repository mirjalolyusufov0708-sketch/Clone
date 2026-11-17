import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Repositories() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get("https://api.github.com/users/Muhammadamin201/repos?sort=updated");
        setRepos(res.data);
      } catch (err) {
        console.error("Repos API xatosi:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (loading) return <p className="text-[#8b949e]">Yuklanmoqda...</p>;
  if (repos.length === 0) return <p className="text-[#f85149]">Repozitoriyalar topilmadi yoki limit tugagan.</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white border-b border-[#30363d] pb-3 mb-4">Repositories</h1>
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Find a repository..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-[#c9d1d9] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors"
        />
        <div className="flex gap-2">
          <button className="flex items-center gap-1 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-sm px-3 py-1.5 rounded-md transition-colors">
            Type <svg className="w-3 h-3 mt-0.5" fill="currentColor" viewBox="0 0 16 16"><path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path></svg>
          </button>
          <button className="flex items-center gap-1 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-sm px-3 py-1.5 rounded-md transition-colors">
            Language <svg className="w-3 h-3 mt-0.5" fill="currentColor" viewBox="0 0 16 16"><path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path></svg>
          </button>
          <button className="flex items-center gap-1 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-sm px-3 py-1.5 rounded-md transition-colors">
            Sort <svg className="w-3 h-3 mt-0.5" fill="currentColor" viewBox="0 0 16 16"><path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path></svg>
          </button>
          <button className="flex items-center gap-1.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold px-3 py-1.5 rounded-md transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
            New
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {repos.map(repo => (
          <div key={repo.id} className="bg-[#0d1117] p-5 rounded-md border border-[#30363d] hover:border-[#8b949e] transition duration-200">
            <h3 className="text-base font-semibold mb-2">
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline">
                {repo.name}
              </a>
            </h3>
            <p className="text-[#8b949e] text-xs mb-4 line-clamp-2">{repo.description || "Tavsif yo'q"}</p>
            <div className="flex items-center gap-4 text-xs text-[#8b949e]">
              <span className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full ${repo.language === 'JavaScript' ? 'bg-[#f1e05a]' :
                  repo.language === 'HTML' ? 'bg-[#e34c26]' :
                    repo.language === 'CSS' ? 'bg-[#563d7c]' :
                      repo.language === 'Python' ? 'bg-[#3572A5]' : 'bg-[#8b949e]'
                  }`}></span>
                {repo.language || "Noma'lum"}
              </span>
              <span className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer transition-colors">
                <svg aria-hidden="true" height="14" viewBox="0 0 16 16" version="1.1" width="14" fill="currentColor">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                </svg>
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer transition-colors">
                <svg aria-hidden="true" height="14" viewBox="0 0 16 16" version="1.1" width="14" fill="currentColor">
                  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                </svg>
                {repo.forks_count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Repositories;