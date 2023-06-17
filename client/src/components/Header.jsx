import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import About from './About'
import './parallax.css'

function Header() {
  return (
    <div className="parallax">
      <Parallax pages={2} style={{ top: '0', left: '0' }} class="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div class="animation_layer parallax" id="stage"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.2}>
          <div class="animation_layer parallax" id="singer"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div class="animation_layer parallax" id="foreground"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div class="animation_layer parallax" id="midground"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div class="animation_layer parallax" id="background"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.25}>
          <About />
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}

export default Header