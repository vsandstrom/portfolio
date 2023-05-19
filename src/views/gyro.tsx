import { get } from 'https';
import * as Tone from 'tone'
import { GrainPlayer, AMSynth, Volume, Reverb } from 'tone';

interface OriiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

interface MotiOS extends DeviceMotionEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

const normalizeVolume = (beta: number | undefined) => {

  if ( beta == undefined || beta < 0) {
    return 0;
  }
  if (beta > 90) {
    return 90;
  }
  return beta
}

const randint = (num: number) => {
  return Math.floor(Math.random()*num);
}

let i = 0, j = 0, k = 0;

const getNewAMSynth = () => {
  return new AMSynth({
    oscillator: {type: 'triangle'}, 
    envelope: { attack: 1.5, release: 1.5 }
  });
}

const setNewChord = (am: AMSynth[], freqs: number[]) => {
    am.map((synth, i) => synth.frequency.value = freqs[i]);
    return;
}

const Gyro = () => {
  // Setup of frequencies
  const freqF = [40, 66, 33, 80, 90, 66*3/2];
  const freq0 = freqF.map(freq => freq*2);
  const freq1 = freq0.map(freq => freq * 5/4 * 2);
  const freq2 = freq0.map(freq => freq * 9/4 * 2);

  const vol = new Volume();
  const verb = new Reverb(6);

  const amF = new Tone.AMSynth({
    oscillator: { type: 'sine1' },
    envelope: { attack: 1.5, release: 1.5 }
  });
  const am0 = getNewAMSynth();
  const am1 = getNewAMSynth();
  const am2 = getNewAMSynth();

  const am: AMSynth[] = [amF, am0, am1, am2];
  am[1].volume.value = -4
  am[2].volume.value = -6;
  am[3].volume.value = -6;

  const reqPermission = () => {
    const ori = DeviceOrientationEvent as unknown as OriiOS;

    if (typeof ori.requestPermission === 'function') {
      ori.requestPermission().then((permission => {
        if (permission === 'granted') {
          window.addEventListener('devicemotion', async (e) => {
            e.preventDefault();


            if (e.acceleration?.x != null && e.acceleration?.y != null && e.acceleration?.z != null) {
              const accX = e.acceleration.x;
              const accY = e.acceleration.y;
              const accZ = e.acceleration.z;

              const x = document.getElementById('x');
              if (x) {
                x.textContent = e.acceleration.x.toString();
              }
              const y = document.getElementById('y');
              if (y) {
                y.textContent = e.acceleration.y.toString();
              }
              const z = document.getElementById('z');
              if (z) {
                z.textContent = e.acceleration.z.toString();
              }

              const debounce = 15;
             
              if (accX > debounce && accY > debounce) {
                setNewChord(am, [
                  freq0[(4 + i) % freq0.length], 
                  freq0[(4 + i) % freq0.length],
                  freq1[(3 + k) % freq1.length], 
                  freq2[(1 + j) % freq0.length] 
                ]);
                i++;
              } else if (accX > debounce) {
                setNewChord(am, [
                  freq0[(0 + j) % freq0.length],
                  freq0[(0 + j) % freq0.length],
                  freq1[(1 + i) % freq0.length],
                  freq2[(0 + k) % freq0.length]
                ]);
                j++;

              } else if (accY > debounce) {
                setNewChord(am, [
                  freqF[(1 + k) % freq0.length],
                  freq0[(1 + k) % freq0.length],
                  freq1[(1 + j) % freq0.length],
                  freq2[(2 + i) % freq0.length]
                ]);
                k++;

              } else if (accZ > debounce) {
                setNewChord(am, [
                  freqF[(0 + j+k) % freq0.length],
                  freq0[(0 + j+k) % freq0.length],
                  freq1[(2 +j+i) % freq0.length],
                  freq2[(2 +i+k) % freq0.length]
                ]);
                j++;

              } else if (accY + accZ > debounce) {
                setNewChord(am, [
                  freqF[(2 +i+k) % freq0.length],
                  freq0[(2 +i+k) % freq0.length],
                  freq1[(1 +i+j) % freq0.length],
                  freq2[(0 +k+j) % freq0.length]
                ]);
                k++;

              }
              setTimeout(()=>{return 0}, 1000);

              // vol.volume.value = -15 - (0.2 * accX);
            }
          });

          window.addEventListener('deviceorientation', (e) => {
            e.preventDefault();
            if (e.alpha != null && e.beta != null && e.gamma != null) {
              const alpha = e.alpha;
              const beta = e.beta;
              const gamma = e.gamma;
              const a = document.getElementById('alpha')
              if (a) {
                a.textContent = (alpha).toString();
              }
              const b = document.getElementById('beta');
              if (b) {
                b.textContent = (beta).toString() ;
              }
              const g = document.getElementById('gamma');
              if (g) {
                g.textContent = (gamma).toString();
              }
              vol.volume.value = Tone.gainToDb(normalizeVolume(beta) * 0.01);
              verb.wet.value = Math.abs(gamma / 90);
              am.map(synth => synth.harmonicity.value = 1 + Math.abs(gamma/3600));
            }
          })
        }
        setTimeout(()=>{return 0}, 1000);
      })) 
    }
    // Creating synth-nodes
    vol.toDestination();
    verb.chain(vol);
    amF.chain(verb);
    am0.chain(verb);
    am1.chain(verb);
    am2.chain(verb);
    amF.triggerAttack(freq0[0], "0.5", 4);
    am0.triggerAttack(freq0[0], "0.5", 4);
    am1.triggerAttack(freq1[0], "0.5", 4);
    am2.triggerAttack(freq2[0], "0.5", 4);
    const p = document.getElementById('perm1');
    const s = document.getElementById('tonestop');
    if (s) { s.style.display = 'flex'; s.style.alignSelf = 'center' }
    if (p) { p.style.display = 'none' }
  }

  const reqAudio = async (e: any) => {
    e.preventDefault();
    const p = document.getElementById('perm1');
    const t = document.getElementById('tonestart');
    if (p) { p.style.display = 'flex'; p.style.alignSelf = 'center' }
    if (t) { t.style.display = 'none' }
    // Connect the patch:
    // Await new webAudio context:
    await Tone.start();
    // TEST
  }

  const stopAudio = async (e: any) => {
    e.preventDefault();
    am.map(synth => {synth.triggerRelease(1); setTimeout(()=> {return 0}, 1000); synth.disconnect()});
    verb.disconnect();
    vol.disconnect();
    const t = document.getElementById('tonestart');
    const s = document.getElementById('tonestop');
    if (t) { t.style.display = 'flex'; t.style.alignSelf = 'center' }
    if (s) { s.style.display = 'none' }

  }

  return (
    <>
    <div>
    <div id="gyro">
      <button id='tonestart' onClick={reqAudio} >{"Start"}</button>
      <button id='perm1' onClick={reqPermission} style={{display: 'none'}}>{"Acceleration"}</button>
      <button id='tonestop' onClick={stopAudio} style={{display: 'none'}}>{"Stop"}</button>
    </div>
      {/* <button id='perm2' onClick={reqOtherPermission}>{"Orientation"}</button> */}
      <p className='showValue'>GYRO</p>
      <h3 className='showValue'>Orientation</h3>
      <p key={0} className='showValue' id='alpha'></p>
      <p key={1} className='showValue' id='beta'></p>
      <p key={2} className='showValue' id='gamma'></p>
      <h3 className='showValue'>Acceleration</h3>
      <p key={3} className='showValue' id='x'></p>
      <p key={4} className='showValue' id='y'></p>
      <p key={5} className='showValue' id='z'></p>
    </div>
    </>
  )
}

export default Gyro;
