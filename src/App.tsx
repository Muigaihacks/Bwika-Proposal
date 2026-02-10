import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

// Gallery order: video2, image3, image1, video1, image2 (5 items – no HEIC, image1 in 3rd slot to avoid overlap)
const GALLERY_ITEMS: { type: 'video' | 'image'; src: string }[] = [
  { type: 'video', src: '/media/1.mov' },
  { type: 'image', src: '/media/2.jpg' },
  { type: 'image', src: '/media/6.jpg' },
  { type: 'video', src: '/media/4.mp4' },
  { type: 'image', src: '/media/5.jpg' },
];

function App() {
  const [showLetter2, setShowLetter2] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const letter2Ref = useRef<HTMLElement>(null);

  const runConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#ff6b9d', '#c44569', '#f8b4c4', '#ffa8c5', '#fff0f5'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors,
      });
    }, 200);
  };

  const runTulipConfetti = () => {
    const scalar = 1.2;
    const tulip = confetti.shapeFromText({ text: '🌷', scalar });
    const count = 80;
    const opts = { origin: { y: 0.65 }, spread: 100, shapes: [tulip], scalar, particleCount: count };
    confetti(opts);
    confetti({ ...opts, particleCount: count / 2, spread: 60, origin: { x: 0.3, y: 0.6 } });
    confetti({ ...opts, particleCount: count / 2, spread: 60, origin: { x: 0.7, y: 0.6 } });
  };

  const handleEnvelopeClick = () => {
    setShowLetter2(true);
    setTimeout(() => {
      letter2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleYes = () => {
    setAnswered(true);
    runConfetti();
    runTulipConfetti();
  };

  const noMessages = [
    'Wrong button 😊',
    'Try again!',
    'Really? 👀',
    'The other one!',
    'Of course is this way ←',
  ];
  const noMessage = noMessages[Math.min(noHoverCount, noMessages.length - 1)];

  const handleNoMouseEnter = () => {
    setNoHoverCount((c) => c + 1);
    const move = 36 + noHoverCount * 8;
    const angle = (noHoverCount * 73) % 360;
    const rad = (angle * Math.PI) / 180;
    setNoOffset({
      x: Math.round(Math.cos(rad) * move),
      y: Math.round(Math.sin(rad) * move) - (noHoverCount % 2 === 0 ? 10 : -10),
    });
  };

  return (
    <div className="app">
      <div className="hearts-bg" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="heart-float" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <main className="main">
        {!answered ? (
          <>
            <section className="hero">
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="title">
                    <span className="title-line">Will you be</span>
                    <span className="title-line accent">my Valentine?</span>
                  </h1>
                  <p className="subtitle">You make every day brighter 💕</p>
                </div>
                <div className="hero-tulips" aria-hidden="true">
                  <img src="/letter-assets/tulips.jpg" alt="" className="hero-tulips-img" />
                </div>
              </div>
            </section>

            {/* Letter 1: rose top-left (tilted), kiss bottom-centre, seal + Click here bottom-right */}
            <section className="letter letter-1">
              <div className="parchment parchment-letter">
                <div className="letter-rose" aria-hidden="true">
                  <img
                    src="/letter-assets/rose.jpg"
                    alt=""
                    className="letter-rose-img"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="parchment-text">
                  <p>To my favorite person,</p>
                  <p>I don&apos;t say it enough, but you are the best part of my every day. Thank you for being my peace, my laughter and my greatest adventure.</p>
                  <p>Here&apos;s to us and all the memories we haven&apos;t made yet.</p>
                  <p>Happy Valentine&apos;s Day 💕</p>
                </div>
                <div className="letter-kiss" aria-hidden="true">
                  <img src="/letter-assets/kiss.jpg" alt="" className="letter-kiss-img" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <button
                  type="button"
                  className="envelope-cta"
                  onClick={handleEnvelopeClick}
                  aria-label="Open letter – click here"
                >
                  <img src="/letter-assets/letter-seal.jpg" alt="" className="seal-only-img" />
                  <span className="click-here-box">
                    <span className="click-here-arrow">↳</span>
                    <span className="click-here">Click here</span>
                  </span>
                </button>
              </div>
            </section>

            {/* Letter 2: appreciation */}
            {showLetter2 && (
              <section className="letter letter-2" ref={letter2Ref}>
                <div className="parchment parchment-letter parchment-second">
                  <div className="parchment-text">
                    <p>I hope all your wishes come true, because mine already came true when I met you.</p>
                    <p>Happy Valentine&apos;s Day. My Love 💕</p>
                  </div>
                </div>
              </section>
            )}

            {/* Vine gallery: 5 items along path */}
            {showLetter2 && (
              <section className="gallery-section">
                <h2 className="gallery-title">Us 💕</h2>
                <div className="vine-gallery">
                  <div className="vine" aria-hidden="true" />
                  {GALLERY_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className={`vine-item vine-item-${i + 1}`}
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      {item.type === 'video' ? (
                        <video
                          src={item.src}
                          className="gallery-media"
                          playsInline
                          loop
                          muted
                          autoPlay
                          poster=""
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={`Us ${i + 1}`}
                          className="gallery-media"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const next = (e.target as HTMLImageElement).nextElementSibling;
                            if (next) (next as HTMLElement).classList.remove('hidden');
                          }}
                        />
                      )}
                      <div className="gallery-placeholder hidden">Photo {i + 1}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {showLetter2 && (
              <section className="ask">
                <p className="ask-text">So… what do you say?</p>
                <div className="buttons">
                  <button type="button" className="btn btn-yes" onClick={handleYes}>
                    Of course! 💖
                  </button>
                  <button
                    type="button"
                    className="btn btn-no"
                    onMouseEnter={handleNoMouseEnter}
                    style={{
                      transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                    }}
                  >
                    {noMessage}
                  </button>
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="success">
            <div className="success-inner">
              <span className="success-emoji">💕</span>
              <h2 className="success-title">I knew it!</h2>
              <p className="success-text">Can&apos;t wait to spend the getaway with you. Now let&apos;s count down the days till Saturday the 14th — you can send your donations to my cellular 😂. Happy Valentine&apos;s, My Love!</p>
              <div className="tulips-row">
                {['🌷', '🌷', '🌷', '🌷', '🌷'].map((t, i) => (
                  <span key={i} className="tulip-emoji" style={{ '--i': i } as React.CSSProperties}>{t}</span>
                ))}
              </div>
              <div className="hearts-mini">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="heart-mini" style={{ '--i': i } as React.CSSProperties}>❤️</span>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
