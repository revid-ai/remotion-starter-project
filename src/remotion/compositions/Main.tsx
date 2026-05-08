import { AbsoluteFill, Artifact, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceMono";
import { CameraDrift, SpringLayer } from "../launch";

const LoaderDots = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dot = (index: number) => {
    const phase = (frame / fps) * 2 * Math.PI + index * 0.8;
    return 0.35 + Math.max(0, Math.sin(phase)) * 0.65;
  };

  return (
    <span className="loader-dots">
      {[0, 1, 2].map((i) => (
        <span key={i} className="loader-dot" style={{ opacity: dot(i) }}>
          .
        </span>
      ))}
    </span>
  );
};

export const Main: React.FC = () => {
  const { fontFamily } = loadFont();
  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill className="motionabl-loading-scene">
        <CameraDrift durationInFrames={350} fromScale={1.04} toScale={1.01}>
          <div className="loading-orb-backdrop" />
          <div className="loading-grid" />
        </CameraDrift>
        <SpringLayer delay={4} y={22}>
          <div
            className="loading-copy"
            style={{ fontFamily, fontWeight: 700, letterSpacing: "0.01em" }}
          >
            <div className="loading-title">
              <span className="loading-brand">Motionabl</span> is building your
              video
              <LoaderDots />
            </div>
            <div className="loading-subtitle">
              Rendering scenes, timing transitions, and polishing frames.
            </div>
          </div>
        </SpringLayer>
      </AbsoluteFill>
    </>
  );
};
