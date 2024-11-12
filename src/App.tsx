import { createSignal, createEffect, type Component, Accessor, Setter } from 'solid-js';
import { MetaProvider, Title } from "@solidjs/meta";
import config from './json/config.json';
import Slider from './components/Slider';
import AudioPlayer from './components/AudioPlayer';
import getStems from './utils';
import './global.css';

const App: Component = () => {
  const [song, setSong] = createSignal(0);
  const [title, setTitle] = createSignal("");
  const [stems, setStems] = createSignal<any[] | undefined>([]);

  const [currentStems, setCurrentStems] = createSignal<string[]>([]);
  const [sliderSignals, setSliderSignals] = createSignal<[Accessor<number>, Setter<number>][]>([]);
  const [playing, setPlaying] = createSignal(false);

  // get stems from the back-end
  createEffect(async () => {
    setStems(await getStems(config['song-path']));
    setCurrentStems(stems()![song()]);
    setSliderSignals(stems()![song()].map(() => createSignal(50)));

    // extract name and stems from return
    currentStems()!.map((stem, idx) => {
      !stem.includes("mp3") && setTitle(stem);
      !stem.includes(".mp3") && setCurrentStems(prevStems => prevStems.filter((_, index) => index !== idx));
    })
  }, [song(), stems()])


  // a creative solution to my problems
  const setter = (idx: number) => {
    return sliderSignals()[idx][0]
  }

  const getter = (idx: number) => {
    return sliderSignals()[idx][1]
  }

  const setValue = (idx: number, value: number) => {
    const signalSetter = getter(idx);
    signalSetter(value);
  }

  return (
    <MetaProvider>
      <Title>Stem Player</Title>
      {currentStems() && currentStems().length > 0 && sliderSignals().length > 0 ? (
        <div class="flex w-192 h-16 rounded-xl bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {currentStems().map((stem, idx) => (
            <>
              <Slider idx={idx} step={1} min={0} max={100} name={stem} value={setter(idx)} setValue={setValue} />
              {setter(idx) !== undefined && (
                <AudioPlayer idx={idx} name={stem} playing={playing} volume={setter(idx)} />
              )}
            </>
          ))}
          <div onclick={() => setPlaying(!playing())}>{">"}</div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </MetaProvider>
  );
};

export default App;