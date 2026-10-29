import React, { useState, useEffect, useRef, useId } from 'react';
import { Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';

export const PressureCookerLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('entering'); // entering -> heating -> building -> full -> whistling -> opening -> done
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const audioCtxRef = useRef(null);
  const whistleNodesRef = useRef([]);
  const hasFinishedRef = useRef(false);
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;
  const uniqueId = useId().replace(/:/g, '');

  // Sound synthesis via Web Audio API (zero external assets needed)
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSteamChuff = () => {
    if (!soundEnabledRef.current || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio context error fallback
    }
  };

  const playWhistleBlast = () => {
    if (!soundEnabledRef.current || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      // Dual oscillator for rich harmonic pressure cooker whistle sound
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(2280, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(2420, ctx.currentTime + 0.25);
      osc1.frequency.linearRampToValueAtTime(2360, ctx.currentTime + 0.7);

      osc2.frequency.setValueAtTime(4560, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(4840, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.75);
      osc2.stop(ctx.currentTime + 0.75);

      whistleNodesRef.current = [osc1, osc2, gain];
    } catch {
      // Audio fallback
    }
  };

  const toggleSound = () => {
    initAudio();
    setSoundEnabled((prev) => !prev);
  };

  const finishLoader = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 600);
  };

  // Main animation orchestrator
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(100);
      const timer = setTimeout(() => {
        finishLoader();
      }, 1000);
      return () => clearTimeout(timer);
    }

    let start = performance.now();
    let animFrame;
    const TOTAL_DURATION = 4200; // 4.2 seconds build

    const step = (now) => {
      const elapsed = now - start;
      const rawProgress = Math.min(100, Math.floor((elapsed / TOTAL_DURATION) * 100));
      setProgress(rawProgress);

      if (elapsed < 600) {
        setPhase('entering');
      } else if (elapsed < 1600) {
        setPhase('heating');
        if (Math.random() < 0.04) playSteamChuff();
      } else if (elapsed < 3600) {
        setPhase('building');
        if (Math.random() < 0.08) playSteamChuff();
      } else if (elapsed < TOTAL_DURATION) {
        setPhase('full');
      } else {
        // Reached 100%!
        setProgress(100);
        setPhase('whistling');
        playWhistleBlast();

        // Sequence after reaching 100%
        setTimeout(() => {
          setPhase('opening');
        }, 650);

        setTimeout(() => {
          setPhase('done');
          finishLoader();
        }, 1150);

        return;
      }

      animFrame = requestAnimationFrame(step);
    };

    animFrame = requestAnimationFrame(step);

    // Guaranteed fallback timer (max 5.5s) to prevent any lock
    const safetyTimer = setTimeout(() => {
      finishLoader();
    }, 5500);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(safetyTimer);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  const isWhistling = phase === 'whistling';
  const isOpening = phase === 'opening' || phase === 'done';

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading campus kitchen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'var(--bg-cream, #F7F8F0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.03)' : 'scale(1)',
        pointerEvents: isExiting ? 'none' : 'auto'
      }}
    >
      {/* Background Soft Glow & Radial Lighting */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.95) 0%, rgba(247, 248, 240, 0.7) 45%, rgba(221, 235, 207, 0.35) 100%)
          `,
          pointerEvents: 'none'
        }}
      />

      {/* Decorative Kitchen Food Motifs around corners */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          opacity: 0.25,
          pointerEvents: 'none',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.85rem',
          color: 'var(--forest-green)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontWeight: 700
        }}
      >
        <span>♨ KITCHEN DISPATCH</span>
      </div>

      {/* Controls: Sound Toggle & Quick Skip */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 10
        }}
      >
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Cooker Sound' : 'Enable Cooker Sound'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.85rem',
            borderRadius: '999px',
            backgroundColor: soundEnabled ? 'var(--forest-green, #164A35)' : 'rgba(255,255,255,0.85)',
            color: soundEnabled ? '#ffffff' : 'var(--text-main, #171A16)',
            border: '1px solid var(--border-light, #E2E6EC)',
            fontSize: '0.78rem',
            fontWeight: 650,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            transition: 'all 0.2s ease'
          }}
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>{soundEnabled ? 'Sound: On' : 'Sound: Off'}</span>
        </button>

        <button
          onClick={finishLoader}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.2rem',
            padding: '0.45rem 0.85rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(255,255,255,0.85)',
            color: 'var(--text-secondary, #686C65)',
            border: '1px solid var(--border-light, #E2E6EC)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease'
          }}
        >
          <span>Skip</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Top Brand Identity */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '1rem',
          zIndex: 2,
          animation: 'bitebox-fade-down 0.6s ease-out forwards'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            backgroundColor: '#ffffff',
            padding: '0.45rem 1.1rem',
            borderRadius: '999px',
            boxShadow: '0 2px 12px rgba(22, 74, 53, 0.08)',
            border: '1px solid var(--soft-sage, #A9C49A)',
            marginBottom: '0.65rem'
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '6px',
              backgroundColor: 'var(--forest-green, #164A35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Sparkles size={12} color="#DDEBCF" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1rem',
              color: 'var(--forest-green, #164A35)',
              letterSpacing: '-0.01em'
            }}
          >
            BiteBox <span style={{ color: 'var(--text-secondary, #686C65)', fontWeight: 600, fontSize: '0.85rem' }}>Studio</span>
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: 800,
            color: 'var(--text-main, #171A16)',
            margin: 0
          }}
        >
          Cooking up something delicious…
        </h2>
      </div>

      {/* Centerpiece: Cartoon Aluminium Pressure Cooker Illustration */}
      <div
        style={{
          position: 'relative',
          width: 'min(420px, 86vw)',
          height: 'min(310px, 46vh)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          animation: isWhistling
            ? 'cooker-whistle-shake 0.12s infinite'
            : phase === 'building'
            ? 'cooker-simmer-shake 0.35s infinite ease-in-out'
            : phase === 'heating'
            ? 'cooker-gentle-breathe 2s infinite ease-in-out'
            : 'cooker-arrive 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Subtle Warm Stove Glow Underneath Cooker */}
        <div
          style={{
            position: 'absolute',
            bottom: '22px',
            width: '68%',
            height: '28px',
            background: 'radial-gradient(ellipse at center, rgba(243, 199, 121, 0.75) 0%, rgba(230, 110, 30, 0.2) 60%, transparent 80%)',
            filter: 'blur(8px)',
            opacity: progress > 15 ? (progress / 100) * 0.9 : 0,
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* Dynamic Oval Ground Shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            width: '78%',
            height: '22px',
            backgroundColor: 'rgba(30, 40, 35, 0.18)',
            borderRadius: '50%',
            filter: 'blur(6px)',
            transform: isOpening ? 'scale(0.85)' : isWhistling ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.2s ease'
          }}
        />

        {/* Master SVG Cartoon Cooker matching reference image */}
        <svg
          viewBox="0 0 540 400"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'visible'
          }}
        >
          <defs>
            {/* Aluminium brushed body gradient (highlights on left, core mid-grey, shadow on right) */}
            <linearGradient id={`alumBody-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C8CED6" />
              <stop offset="12%" stopColor="#E8ECF2" />
              <stop offset="26%" stopColor="#FFFFFF" />
              <stop offset="42%" stopColor="#D5DAE2" />
              <stop offset="78%" stopColor="#BFC5CE" />
              <stop offset="100%" stopColor="#8C939F" />
            </linearGradient>

            {/* Lid top bevel gradient */}
            <linearGradient id={`alumLidTop-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E4E8EE" />
              <stop offset="70%" stopColor="#C2C8D2" />
              <stop offset="100%" stopColor="#9CA3AF" />
            </linearGradient>

            {/* Lid rim silver gradient */}
            <linearGradient id={`alumLidRim-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B2B8C2" />
              <stop offset="25%" stopColor="#E2E6EC" />
              <stop offset="55%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#C4CAD3" />
              <stop offset="100%" stopColor="#7E8592" />
            </linearGradient>

            {/* Black Bakelite Handle Gradient */}
            <linearGradient id={`handleGrad-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3C414C" />
              <stop offset="40%" stopColor="#252830" />
              <stop offset="100%" stopColor="#14161B" />
            </linearGradient>

            {/* Steam Glow Filter */}
            <filter id={`steamGlow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* RIGHT EXTENDED HANDLE SHADOW & BODY (Behind Cooker Right Wall) */}
          <g id="right-handle">
            {/* Long black handle grip extending to the right with ergonomic curve */}
            <path
              d="M 330 162 
                 C 370 148, 430 140, 480 142 
                 C 498 143, 506 156, 504 172 
                 C 502 186, 488 196, 460 198 
                 C 400 202, 360 216, 335 244 
                 C 328 234, 328 178, 330 162 Z"
              fill="url(#handleGrad)"
              stroke="#212429"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Handle top soft specular highlight */}
            <path
              d="M 370 152 
                 C 410 146, 455 146, 485 150 
                 C 496 152, 498 160, 492 165 
                 C 455 157, 405 160, 365 170 Z"
              fill="#525A69"
              opacity="0.8"
            />
            {/* Right Pot Mounting Bracket Under Handle */}
            <path
              d="M 320 188 C 342 208, 342 238, 320 252 Z"
              fill="#181A1F"
            />
          </g>

          {/* MAIN ALUMINIUM COOKER POT BODY */}
          <g id="cooker-body" style={{ transformOrigin: '240px 320px' }}>
            {/* Dark cast shadow on lower-right edge */}
            <path
              d="M 315 190 
                 L 322 300 
                 C 322 342, 280 376, 220 378 
                 C 290 376, 336 338, 336 295 
                 L 336 190 Z"
              fill="#4A505C"
              opacity="0.75"
            />

            {/* Pot Outer Shell */}
            <path
              d="M 125 188 
                 L 125 292 
                 C 125 342, 172 378, 245 378 
                 C 318 378, 328 340, 328 292 
                 L 328 188 
                 C 305 198, 275 204, 235 204 
                 C 185 204, 150 196, 125 188 Z"
              fill={`url(#alumBody-${uniqueId})`}
              stroke="#22252B"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Specular vertical highlight streak on left-centre aluminium face */}
            <path
              d="M 160 194 
                 L 165 296 
                 C 165 330, 182 355, 205 365 
                 C 192 355, 185 330, 185 296 
                 L 180 196 Z"
              fill="#FFFFFF"
              opacity="0.75"
            />

            {/* Subtle Brushed Aluminium Texture Lines */}
            <line x1="140" y1="210" x2="140" y2="280" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
            <line x1="215" y1="205" x2="215" y2="340" stroke="#E5E9F0" strokeWidth="2" opacity="0.4" />
            <line x1="290" y1="202" x2="290" y2="300" stroke="#8E96A4" strokeWidth="2" opacity="0.35" />

            {/* Pot Rim Collar Ring */}
            <path
              d="M 125 188 
                 C 150 196, 185 202, 232 202 
                 C 275 202, 308 196, 328 188 
                 L 332 176 
                 C 310 185, 275 190, 232 190 
                 C 185 190, 150 185, 122 176 Z"
              fill="#B0B6C0"
              stroke="#22252B"
              strokeWidth="3.5"
            />
          </g>

          {/* LEFT HELPER HANDLE (Attached to cooker left shoulder) */}
          <g id="left-handle">
            {/* Chunky black loop handle */}
            <path
              d="M 128 192 
                 C 105 190, 68 198, 48 206 
                 C 38 210, 36 224, 44 232 
                 C 54 240, 95 244, 126 230 
                 C 134 220, 134 200, 128 192 Z"
              fill="url(#handleGrad)"
              stroke="#212429"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Inner Handle Cutout / Grip Hole */}
            <path
              d="M 64 212 
                 C 80 208, 102 212, 114 218 
                 C 105 224, 82 226, 68 222 
                 C 62 220, 60 214, 64 212 Z"
              fill="var(--bg-cream, #F7F8F0)"
              stroke="#212429"
              strokeWidth="2.5"
            />
            {/* Left handle top specular highlight */}
            <path
              d="M 52 208 C 70 202, 100 202, 120 204"
              stroke="#586170"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* LID & PRESSURE REGULATOR (WHISTLE) GROUP */}
          <g
            id="lid-group"
            style={{
              transformOrigin: '230px 180px',
              transform: isOpening
                ? 'translateY(-34px) rotate(-6deg)'
                : isWhistling
                ? 'translateY(-3px)'
                : 'none',
              transition: isOpening ? 'transform 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28)' : 'transform 0.08s ease'
            }}
          >
            {/* Lid Rim Stepped Flange */}
            <path
              d="M 108 172 
                 C 108 152, 140 134, 230 134 
                 C 320 134, 350 152, 350 172 
                 C 350 188, 318 202, 230 202 
                 C 142 202, 108 188, 108 172 Z"
              fill={`url(#alumLidRim-${uniqueId})`}
              stroke="#22252B"
              strokeWidth="4"
            />

            {/* Lid Domed Top Surface */}
            <path
              d="M 124 162 
                 C 124 140, 155 124, 230 124 
                 C 305 124, 336 140, 336 162 
                 C 336 178, 305 190, 230 190 
                 C 155 190, 124 178, 124 162 Z"
              fill={`url(#alumLidTop-${uniqueId})`}
              stroke="#22252B"
              strokeWidth="3"
            />

            {/* Lid Inner Oval Plate Highlight */}
            <ellipse
              cx="230"
              cy="154"
              rx="90"
              ry="24"
              fill="#FFFFFF"
              opacity="0.65"
            />

            {/* Central Vertical Pressure Vent Pipe / Stem */}
            <rect
              x="224"
              y="106"
              width="12"
              height="24"
              rx="2"
              fill="#DDE1E8"
              stroke="#22252B"
              strokeWidth="3"
            />
            <rect x="222" y="122" width="16" height="4" rx="1" fill="#7D8592" stroke="#22252B" strokeWidth="2" />

            {/* WHISTLE / REGULATOR WEIGHT */}
            <g
              id="whistle-weight"
              style={{
                transformOrigin: '230px 108px',
                transform: isWhistling
                  ? 'translateY(-6px) rotate(4deg)'
                  : phase === 'building'
                  ? 'rotate(1deg)'
                  : 'none',
                transition: 'transform 0.08s ease'
              }}
            >
              {/* Whistle base collar (brass / dark metal) */}
              <rect
                x="221"
                y="98"
                width="18"
                height="10"
                rx="2"
                fill="#8A929F"
                stroke="#22252B"
                strokeWidth="3"
              />

              {/* Main Whistle Weight Body (Black Bakelite) */}
              <path
                d="M 216 68 
                   C 216 62, 244 62, 244 68 
                   L 242 98 
                   L 218 98 Z"
                fill="url(#handleGrad)"
                stroke="#22252B"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Top Knurled Whistle Knob */}
              <ellipse
                cx="230"
                cy="66"
                rx="14"
                ry="7"
                fill="#3A404C"
                stroke="#22252B"
                strokeWidth="3"
              />
              <ellipse cx="230" cy="65" rx="8" ry="3.5" fill="#586171" opacity="0.8" />

              {/* Whistle vent holes */}
              <circle cx="225" cy="84" r="1.5" fill="#0D0E11" />
              <circle cx="235" cy="84" r="1.5" fill="#0D0E11" />

              {/* Whistle Blast Motion Lines when full / whistling */}
              {isWhistling && (
                <g stroke="#F3C779" strokeWidth="2.5" strokeLinecap="round" opacity="0.95">
                  <path d="M 206 72 Q 198 64 200 54" fill="none" />
                  <path d="M 254 72 Q 262 64 260 54" fill="none" />
                  <path d="M 204 88 Q 192 86 190 78" fill="none" />
                  <path d="M 256 88 Q 268 86 270 78" fill="none" />
                </g>
              )}
            </g>

            {/* DYNAMIC STEAM PUFFS (Shoot upward during whistling & building) */}
            {(isWhistling || phase === 'building' || isOpening) && (
              <g id="steam-blasts" filter={`url(#steamGlow-${uniqueId})`}>
                {/* Central High Pressure Jet */}
                <ellipse
                  cx="230"
                  cy={isWhistling ? "32" : "52"}
                  rx={isWhistling ? "22" : "12"}
                  ry={isWhistling ? "34" : "18"}
                  fill="#FFFFFF"
                  opacity={isWhistling ? "0.9" : "0.55"}
                  style={{
                    animation: isWhistling ? 'steam-burst 0.4s infinite alternate' : 'steam-float 1s infinite'
                  }}
                />

                {/* Left Billowing Steam Cloud */}
                <circle
                  cx={isWhistling ? "198" : "212"}
                  cy={isWhistling ? "18" : "42"}
                  r={isWhistling ? "24" : "12"}
                  fill="#FFFFFF"
                  opacity={isWhistling ? "0.85" : "0.45"}
                />

                {/* Right Billowing Steam Cloud */}
                <circle
                  cx={isWhistling ? "264" : "246"}
                  cy={isWhistling ? "16" : "40"}
                  r={isWhistling ? "26" : "13"}
                  fill="#FFFFFF"
                  opacity={isWhistling ? "0.85" : "0.45"}
                />

                {/* Top Floating Steam Puffs */}
                {isWhistling && (
                  <>
                    <circle cx="218" cy="-6" r="28" fill="#FFFFFF" opacity="0.8" />
                    <circle cx="250" cy="-12" r="32" fill="#FFFFFF" opacity="0.75" />
                    <circle cx="282" cy="4" r="22" fill="#FFFFFF" opacity="0.6" />
                    <circle cx="178" cy="8" r="20" fill="#FFFFFF" opacity="0.6" />
                  </>
                )}

                {/* Golden Aroma Sparkles */}
                <circle cx="204" cy="48" r="3" fill="#F3C779" opacity="0.9" />
                <circle cx="258" cy="54" r="3.5" fill="#F3C779" opacity="0.9" />
                <circle cx="230" cy="-28" r="4" fill="#F3C779" opacity="0.8" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Black numbers loading from 0 to 100 alone */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '1rem',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading, "Inter", sans-serif)',
            fontSize: 'clamp(2.8rem, 6.5vw, 4.2rem)',
            fontWeight: 900,
            color: '#000000',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {progress}%
        </span>
      </div>

      {/* Embedded Keyframe Animations */}
      <style>{`
        @keyframes bitebox-fade-down {
          0% { opacity: 0; transform: translateY(-16px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes cooker-arrive {
          0% { opacity: 0; transform: translateY(40px) scale(0.92); }
          70% { transform: translateY(-6px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes cooker-gentle-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.012) translateY(-2px); }
        }

        @keyframes cooker-simmer-shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-1.5px, 0.5px) rotate(-0.4deg); }
          75% { transform: translate(1.5px, -0.5px) rotate(0.4deg); }
        }

        @keyframes cooker-whistle-shake {
          0% { transform: translate(0, 0) scale(1.02); }
          20% { transform: translate(-3px, -2px) rotate(-1deg) scale(1.03); }
          40% { transform: translate(3px, 1px) rotate(1deg) scale(1.02); }
          60% { transform: translate(-2px, 2px) rotate(-0.8deg) scale(1.03); }
          80% { transform: translate(2px, -1px) rotate(0.8deg) scale(1.02); }
          100% { transform: translate(0, 0) scale(1.02); }
        }

        @keyframes steam-burst {
          0% { transform: translateY(0) scale(0.9); opacity: 0.7; }
          100% { transform: translateY(-10px) scale(1.15); opacity: 1; }
        }

        @keyframes steam-float {
          0%, 100% { transform: translateY(0); opacity: 0.45; }
          50% { transform: translateY(-5px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};
