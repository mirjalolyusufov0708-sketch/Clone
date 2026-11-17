import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Overview() {
  const [data, setData] = useState(null);
  const [popularRepos, setPopularRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const userRes = await axios.get("https://api.github.com/users/Muhammadamin201");
        const reposRes = await axios.get("https://api.github.com/users/Muhammadamin201/repos?sort=updated&per_page=6");
        setData(userRes.data);
        setPopularRepos(reposRes.data);
      } catch (err) {
        console.error("Overview API xatosi:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOverviewData();
  }, []);

  if (loading) return <p className="text-[#8b949e] animate-pulse">Yuklanmoqda...</p>;
  if (!data) return <p className="text-[#f85149]">Ma'lumot yuklashda xatolik (ehtimol limit).</p>;

  return (
    <div className="flex flex-col gap-8 text-[#c9d1d9]">
      <div className="border-b border-[#30363d] pb-6">
        <h1 className="text-2xl font-semibold text-white mb-2">Overview</h1>
        <div className="flex flex-col gap-2 text-sm text-[#8b949e]">
          {data.company && <p>🏢 <span className="text-[#c9d1d9]">{data.company}</span></p>}
          {data.location && <p>📍 <span className="text-[#c9d1d9]">{data.location}</span></p>}
          {data.blog && (
            <p>🔗 <a href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline">{data.blog}</a></p>
          )}

        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-white">Popular repositories</h2>
          <a href={`https://github.com/Muhammadamin201?tab=repositories`} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline text-sm font-medium">
            Customize your pins
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularRepos.map((repo) => (
            <div key={repo.id} className="border border-[#30363d] rounded-md p-4 flex flex-col justify-between hover:border-[#8b949e] transition-colors bg-[#0d1117]">
              <div className="flex justify-between items-start mb-4">
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[#58a6ff] font-semibold text-sm hover:underline break-all">
                  {repo.name}
                </a>
                <span className="text-xs text-[#8b949e] border border-[#30363d] rounded-full px-2 py-0.5 ml-2 whitespace-nowrap">
                  Public
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full ${repo.language === 'JavaScript' ? 'bg-[#f1e05a]' :
                      repo.language === 'HTML' ? 'bg-[#e34c26]' :
                        repo.language === 'CSS' ? 'bg-[#563d7c]' :
                          repo.language === 'Python' ? 'bg-[#3572A5]' : 'bg-[#8b949e]'
                      }`}></span>
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer transition-colors">
                  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                  </svg>
                  <span>{repo.stargazers_count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;