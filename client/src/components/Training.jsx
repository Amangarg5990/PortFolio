import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Training = ({ data }) => {
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        if (selectedCert) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedCert]);

    if (!data || data.length === 0) return null;

    return (
        <section id="training" className="py-24 relative z-10 bg-[var(--bg-secondary)] border-y border-[var(--card-border)] transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary section-heading tracking-tight">
                        Professional <span className="text-emerald-400">Training</span>
                    </h2>
                    <p className="text-secondary mt-4 max-w-2xl mx-auto text-lg">
                        Intensive programs and specialized coursework I have completed.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-12">
                    {data.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="glass-card flex flex-col md:flex-row overflow-hidden rounded-2xl border border-[var(--card-border)] hover:border-emerald-500/40 transition-all shadow-lg group relative"
                        >
                            {/* Left Side: Image */}
                            <div 
                                className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden relative bg-[var(--bg-primary)] cursor-pointer group/img"
                                onClick={() => setSelectedCert(item)}
                            >
                                {item.image ? (
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover/img:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <i className="fas fa-certificate text-6xl text-emerald-400/20 group-hover/img:text-emerald-400/50 transition-colors"></i>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--bg-secondary)] via-transparent to-transparent opacity-80 pointer-events-none"></div>
                                
                                {/* Overlay icon on hover */}
                                <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                    <div className="w-16 h-16 rounded-full bg-black/60 text-emerald-400 border border-emerald-500/50 flex items-center justify-center transform scale-50 group-hover/img:scale-100 transition-transform duration-500 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                                        <i className="fas fa-search-plus text-2xl"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Content */}
                            <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-emerald-400">
                                    {item.title}
                                </h3>
                                <h4 className="text-lg text-emerald-600 dark:text-emerald-300 font-semibold mb-4">
                                    {item.provider}
                                </h4>
                                
                                <div className="text-secondary text-base leading-relaxed mb-6 space-y-2">
                                    {item.description.split('\n').map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>

                                {item.tech && item.tech.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {item.tech.map(t => (
                                            <span key={t} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-bold tracking-wide rounded-lg">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certificate Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
                        ></motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl max-h-[95vh] flex flex-col items-center bg-[var(--bg-primary)] border border-[var(--card-border)] md:border-emerald-500/30 rounded-2xl shadow-2xl z-10 overflow-hidden"
                        >
                            <div className="w-full flex justify-between items-center p-4 border-b border-[var(--card-border)] bg-[var(--bg-secondary)]">
                                <h3 className="text-xl font-bold text-emerald-400 truncate pr-4">
                                    {selectedCert.title} Certificate
                                </h3>
                                <button 
                                    onClick={() => setSelectedCert(null)}
                                    className="w-8 h-8 flex shrink-0 items-center justify-center rounded-full bg-black/50 text-white hover:bg-emerald-500 hover:text-black transition-colors"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <div className="w-full flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-black/20 relative">
                                <img 
                                    src={selectedCert.image} 
                                    alt={`${selectedCert.title} Certificate`} 
                                    className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded drop-shadow-2xl"
                                />
                            </div>

                            <div className="w-full p-4 md:p-6 border-t border-[var(--card-border)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row justify-center gap-4">
                                {selectedCert.image && (
                                    <>
                                        <a 
                                            href={selectedCert.image} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="px-6 py-3 bg-transparent border border-[var(--card-border)] hover:border-emerald-500 hover:text-emerald-400 text-primary rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                        >
                                            <i className="fas fa-external-link-alt"></i> View Full Size
                                        </a>
                                        <a 
                                            href={selectedCert.image} 
                                            download={`Certificate_${selectedCert.title.replace(/\s+/g, '_')}`}
                                            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white shadow-[0_0_15px_rgba(52,211,153,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                        >
                                            <i className="fas fa-download"></i> Download Certificate
                                        </a>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Training;
