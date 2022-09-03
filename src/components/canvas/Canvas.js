import React, { useRef, useEffect } from 'react';
import Paper from 'paper';

import StepPathTwo from '../drawings/StepPathTwo';
import { StepDiamond } from '../drawings/StepDiamond';
import { ZigZagHorizontal } from '../drawings/ZigZagHoriz';
import { ZigZagVertical } from '../drawings/ZigZagVert';

const Canvas = props => {

  const canvasRef = useRef(null)

  useEffect(() => {

    const canvas = canvasRef.current;
    Paper.setup(canvas);
    console.log(props.questionvalues)
    /**
     * DRAW SOME X STITCHS
     */

    // for (let i = 1; i < 4; i++) {

    //   // let enter = new Paper.Point(i * 100, 120);
    //   // let exit = new Paper.Point(i * 100 + 100, 120);

    //   // if (i % 2 === 0) {
    //   //   exit.x = i * 100 + 60;
    //   //   exit.y = i + 180;
    //   // }


    //   // let stitches = new Stitches(15, enter, exit, props.stitch);
    //   // stitches.draw();

    //   // Add the second path of the v

    //   // if (i % 2 === 0) {
    //   //   enter = exit.clone();
    //   //   exit = new Paper.Point(i * 100 + 100, 120);

    //   //   exit.x = i * 100 + 120;
    //   //   exit.y = i + 120;
    //   // }

    //   // stitches = new Stitches(15, enter, exit, props.stitch);
    //   // stitches.draw();
    // }

     /**
     * END SOME X STITCHS
     */

    const radius = 13;
    const elementSize = 100;
    const stepCount = 11;
    const modifier = stepCount * radius * 2;
    // const origin = new Paper.Point(100, 100);
    const origin = new Paper.Point(50, 120);
    const colors = {
      circle: 'red',
      stitch: {
        red: 'red',
        pink: 'pink',
        yellow: '#fde37a',
        orange: 'orange',
        black: 'black',
        user: "#20e5e5",
        arr: ['black', '#20e5e5', 'black',],
      }
    }

    const angles = {
      x: 2, y: 2
    }

    const config = {
     thick: { radius: 12,
      steps: 12,
      thickness: 2,
      modifier: 16 * 5 * 2,
      angles,
        colors,
      },
      thin: { radius: 12,
        steps: 16,
        thickness: 3,
        modifier: 16 * 5 * 2,
        angles,
          colors,
        },

    }

    //vols
    // (window.innerWidth / (config.radius * config.steps))

 /* It's drawing the zig zag pattern. */
    // for (let col = 0; col < window.innerWidth  / (config.radius * config.steps * 2) - 2 ; col++) {
    //   for (let row = 0; row < config.thickness; row++) {
    //     let conf = {
    //       ...config,
    //     }

    //     const origin = new Paper.Point( modifier + col * conf.radius * conf.steps * 2, modifier + row * conf.radius  * conf.angles.y)
    //     const leftPath = new StepPath(
    //       origin,
    //       new Paper.Point(origin.x - modifier, origin.y - modifier),
    //       conf
    //     )

    //     leftPath.draw();

    //     const rightPath = new StepPath(
    //       origin,
    //       new Paper.Point(origin.x + modifier, origin.y - modifier),
    //       conf
    //     )

    //     rightPath.draw();


    //   }

    // }

    // const zigZag = new ZigZagHorizontal(origin, config.thick, config.thick.modifier).init();
    // zigZag.draw();

    // const zigZagV = new ZigZagVertical(origin, config.thin, config.thin.modifier).init();
    // zigZagV.draw();

    // const Stepstwo = new StepPathTwo(origin, 10, 22, { x: -1, y: 0 }, ['purple', 'orange'], 'x').init();

    // Stepstwo.draw();

    const diamonds = {
      origin: new Paper.Point(Paper.view.center.x - 22 * 16 / 2, Paper.view.center.y),
      radius: 12,
      colors: ['purple', 'purple'],
      steps: [
        18,
        12,
        7,
        3
      ]
    };

    let previousSteps = diamonds.steps[0];

   /* It's drawing the diamonds. */
    // for (let diamond of diamonds.steps) {
    //   const stepDiamond = new StepDiamond(new Paper.Point(origin.x, origin.y + diamonds.radius * previousSteps / 2), {
    //     radius: diamonds.radius,
    //     steps: diamond,
    //     colors: diamonds.colors
    //   }, { x: diamonds.radius * (previousSteps - diamond) / 2, y: 0 }).init();
    //   stepDiamond.draw();
    // }

    /* It's drawing the zig zag pattern. */
    for (let i = 0; i < 3; i++) {
      const line = new StepPathTwo(new Paper.Point(origin.x, origin.y + radius * i * 2), 70, diamonds.radius, { x: 1, y: 0 }, diamonds.colors, 'x').init();
      line.draw();
      // console.log(line.path);

      if (i === 2) {
        for (let offset = 0; offset < line.path.length; offset++) {
          const thePoint = line.path.getPointAt(offset);

          // if (offset % (diamonds.radius * 2) === 0) {
          //   const _line = new StepPathTwo(thePoint, 7, diamonds.radius, { x: 0, y: 1 }, diamonds.colors, 'x').init();
          //   _line.draw();
          // }

          // if (offset % (diamonds.radius * 3) === 0) {
          //   const _line = new StepPathTwo(thePoint, 5, diamonds.radius, { x: 0, y: 1 }, diamonds.colors, 'x').init();
          //   _line.draw();
          // }

          if (offset % (diamonds.radius * 3) === 0) {
            const _line = new Paper.Path();
            _line.add(thePoint);
            _line.add(new Paper.Point(thePoint.x, thePoint.y + radius * 9))
            // _line.draw();
            const diamondPoint = _line.getPointAt(_line.length);
            // console.log(diamondPoint);

            const stepDiamond = new StepDiamond(diamondPoint, {
                  radius: diamonds.radius,
                  steps: 14,
                  colors:['orange', 'green'],
                }, { x: -radius * 3, y: 0 }).init();
                stepDiamond.draw();

          }
        }
      }
    }


    // const stepsthree = new StepPathTwo(10, new Paper.Point(100, 100), { x: 1, y: 1 }, 15).init();
    // stepsthree.draw();

    // console.log(Stepstwo.path.segments[2]._point)





    // const loworigin = new Paper.Point(Paper.view.center.x, Paper.view.center.y + 2 * radius);

    // const steplower = new StepPath(
    //   radius,
    //   loworigin,
    //   new Paper.Point(loworigin.x - modifier, loworigin.y - modifier),
    //   stepCount,
    //   colors
    // );
    // steplower.draw();

    // const steplower2 = new StepPath(
    //   radius,
    //   loworigin,
    //   new Paper.Point(loworigin.x + modifier, loworigin.y - modifier),
    //   stepCount,
    //   colors
    // );
    // steplower2.draw();


    // const stepPath4 = new StepPath(
    //   radius,
    //   origin,
    //   new Paper.Point(origin.x - modifier, origin.y + modifier),
    //   stepCount,
    //   colors
    // );
    // stepPath4.draw();


    // const stepPath5 = new StepPath(
    //   radius,
    //   origin,
    //   new Paper.Point(origin.x + modifier, origin.y + modifier),
    //   stepCount,
    //   colors
    // );
    // stepPath5.draw();


    // for (let i = 0; i < 3; i++) {

    //   const origin = new Paper.Point(
    //     Math.cos(i * 90) * modifier + offset,
    //     Math.sin(i * 90) * modifier + offset
    //   );

    //   const destination = new Paper.Point(
    //     Math.cos((i+1) * 90) * modifier + offset,
    //     Math.sin((i+1) * 90) * modifier + offset
    //   );
    //   const stepPath = new StepPath(
    //     radius,
    //     origin,
    //     // new Paper.Point(origin.x + modifier, origin.y + modifier),
    //     destination,
    //     stepCount,
    //     colors
    //   );
    //   stepPath.draw();
    // }

    // for (let i = 0; i < 30; i++) {
    //   const origin = new Paper.Point(Paper.view.center.x + i*offset, Paper.view.center.y + i * offset)
    //   const stepsBack = new StepPath(
    //     radius,
    //     origin,
    //   origin.add(radius*stepCount));
    //   stepsBack.draw();
    // }

    // const stepsBack = new StepPath(20, new Paper.Point(300, 300), new Paper.Point(200, 400));
    // stepsBack.draw();

    Paper.view.draw();


  }, [props.questionvalues]);

  return <canvas className='' ref={canvasRef} {...props} id="canvas" resize="true" />
}

export default Canvas;