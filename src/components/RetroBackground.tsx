import React from 'react'
import '../index.css'

interface RetroGridProps {
  angle?: number
  cellSize?: number
  opacity?: number
  darkLineColor?: string
}

const RetroGrid: React.FC<RetroGridProps> = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  darkLineColor = "rgba(156, 163, 175, 0.3)", // Gray color matching the user snippet
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div className="retro-grid-container" style={gridStyles}>
      <div className="retro-grid-plane">
        <div className="animate-grid" />
      </div>
      <div className="retro-grid-fade" />
    </div>
  )
}

export const RetroBackground: React.FC = () => {
  return (
    <div className="retro-bg-wrapper">
      {/* Radial soft purple overlay from the user's snippet */}
      <div className="retro-radial-overlay" />
      <RetroGrid />
    </div>
  )
}
