import { createSignal, createEffect, type Component } from 'solid-js';
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
  const [sliderValues, setSliderValues] = createSignal<number[]>([]);
  const [playing, setPlaying] = createSignal(false);

  // get stems from the back-end
  createEffect(async () => {
    setStems(await getStems(config['song-path']));
    setCurrentStems(stems()![song()]);
    setSliderValues(new Array(stems()![song()].length).fill(50));

    // extract name and stems from return
    currentStems()!.map((stem, idx) => {
      !stem.includes("mp3") && setTitle(stem);
      !stem.includes(".mp3") && setCurrentStems(prevStems => prevStems.filter((_, index) => index !== idx));
    })
  }, [song()])

  return (
    <MetaProvider>
      <Title>Stem Player</Title>
      {currentStems() && currentStems().length > 0 ? (
        <div class="flex w-192 h-16 rounded-xl bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {currentStems().map((stem, idx) => (
            <>
              <Slider index={idx} step={1} min={0} max={100} values={sliderValues()} updateValue={setSliderValues} name={stem} />
              {sliderValues()[idx] !== undefined && (
                <AudioPlayer index={idx} name={stem} playing={playing} volume={sliderValues} />
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