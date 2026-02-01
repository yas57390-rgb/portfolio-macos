import React, { useState, useEffect } from 'react';
import { FaRss, FaNewspaper, FaExternalLinkAlt, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const RSSReader = () => {
    const [selectedFeedUrl, setSelectedFeedUrl] = useState('https://korben.info/feed');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const feedGroups = [
        {
            category: 'Actualités IT',
            items: [
                { name: 'Le Monde Informatique', url: 'https://www.lemondeinformatique.fr/rss/it_rss.xml' },
                { name: 'Numerama', url: 'https://www.numerama.com/feed/' },
                { name: 'Next INpact', url: 'https://www.nextinpact.com/rss/news.xml' },
                { name: 'ANSSI', url: 'https://www.ssi.gouv.fr/feed/' },
                { name: 'CERT-FR', url: 'https://www.cert.ssi.gouv.fr/feed/' }
            ]
        },
        {
            category: 'Techniques & Tutoriels',
            items: [
                { name: 'IT-Connect', url: 'https://www.it-connect.fr/feed/' },
                { name: 'Korben', url: 'https://korben.info/feed' },
                { name: 'LinuxFr', url: 'https://linuxfr.org/news.atom' },
                { name: 'Stack Overflow', url: 'https://stackoverflow.com/feeds' }
            ]
        },
        {
            category: 'Veille Internationale',
            items: [
                { name: 'Bleeping Computer', url: 'https://www.bleepingcomputer.com/feed/' },
                { name: 'The Hacker News', url: 'https://thehackernews.com/feeds/posts/default' },
                { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' }
            ]
        }
    ];

    // Flatten for easy searching/default
    const allFeeds = feedGroups.flatMap(g => g.items);

    useEffect(() => {
        const fetchRSS = async () => {
            setLoading(true);
            setError(null);
            setArticles([]);

            try {
                // Using rss2json API to parse RSS to JSON and avoid CORS
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(selectedFeedUrl)}`);
                const data = await response.json();

                if (data.status === 'ok') {
                    setArticles(data.items);
                } else {
                    setError('Failed to load feed.');
                }
            } catch (err) {
                setError('Network error.');
            } finally {
                setLoading(false);
            }
        };

        if (selectedFeedUrl) {
            fetchRSS();
        }
    }, [selectedFeedUrl]);

    return (
        <div className="flex h-full bg-transparent text-slate-200 font-sans">
            {/* Sidebar - Feed List */}
            <div className="w-64 bg-slate-900/40 backdrop-blur-md border-r border-white/5 flex flex-col">
                <div className="p-4 border-b border-white/5 bg-slate-900/20">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <FaRss /> Sources
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {feedGroups.map((group, idx) => (
                        <div key={idx} className="mb-4">
                            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">
                                {group.category}
                            </h3>
                            <ul className="space-y-1">
                                {group.items.map((feed) => (
                                    <li key={feed.url}>
                                        <button
                                            onClick={() => setSelectedFeedUrl(feed.url)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
                                                ${selectedFeedUrl === feed.url
                                                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-500/50'
                                                    : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'}`}
                                        >
                                            <FaNewspaper className={selectedFeedUrl === feed.url ? 'text-white' : 'text-slate-500'} />
                                            {feed.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="p-3 border-t border-white/5 text-xs text-center text-slate-600">
                    Powered by rss2json
                </div>
            </div>

            {/* Main Content - Articles */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
                <div className="p-4 border-b border-white/5 bg-transparent z-10">
                    <h1 className="text-xl font-bold flex items-center gap-2 text-white drop-shadow-sm">
                        {allFeeds.find(f => f.url === selectedFeedUrl)?.name || 'Flux RSS'}
                        {loading && <FaSpinner className="animate-spin text-blue-400 text-sm" />}
                    </h1>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-transparent">
                    {error && (
                        <div className="flex flex-col items-center justify-center h-full text-red-400 opacity-80">
                            <FaExclamationTriangle className="text-4xl mb-2" />
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && articles.length === 0 && (
                        <div className="flex items-center justify-center h-full text-slate-500">
                            No articles found.
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                        {articles.map((item, index) => (
                            <article key={index} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-lg">
                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-lg font-bold text-slate-100 mb-2 leading-tight hover:text-blue-400 transition-colors">
                                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                {item.title}
                                            </a>
                                        </h2>
                                        <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
                                            {new Date(item.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>

                                    <div className="text-slate-400 text-sm mb-4 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />

                                    <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                                        <span className="text-xs font-semibold text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/30">
                                            {item.categories?.[0] || 'Tech'}
                                        </span>
                                        <a href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                                        >
                                            Read More <FaExternalLinkAlt className="text-xs" />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RSSReader;
